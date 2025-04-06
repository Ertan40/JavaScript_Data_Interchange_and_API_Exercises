import pkg from "pg";
const { Client } = pkg;

async function main() {
  const url = "https://randomuser.me/api/";
  try {
    const response = await fetch(url, { timeout: 10000 });
    const data = await response.json();

    const currentData = transformData(data);
    await storeToDatabase(currentData);
    // console.log(data);
    console.log(currentData);
  } catch (error) {
    console.error(`An error occured: ${error}`);
  }
}

function transformData(data) {
  const user = data.results[0];

  return {
    gender: user.gender,
    // name: user.name,
    title: user.name.title,
    firstName: user.name.first,
    lastName: user.name.last,
    // fullName: `${user.name.first} ${user.name.last}`,
    streetName: user.location.street.name,
    streetNumber: user.location.street.number,
    city: user.location.city,
    postcode: user.location.postcode,
    state: user.location.state,
    email: user.email,
    // dob: user.dob,
    dob: new Date(user.dob.date).toISOString().split("T")[0],
    age: user.dob.age,
    cell: user.cell,
  };
}

async function storeToDatabase(user) {
  const client = new Client({
    database: "users_db",
    user: "postgres-user",
    password: "password",
    host: "localhost",
    port: 5432,
  });
  try {
    await client.connect();
    console.log("Connection to PostgreSQL is successful!");

    const createTableQuery = `
       CREATE TABLE IF NOT EXISTS users_data (
       user_id SERIAL PRIMARY KEY, 
       gender VARCHAR(6), 
       title VARCHAR(10), 
       first_name VARCHAR(30), 
       last_name VARCHAR(30), 
       street_name VARCHAR(100), 
       street_number VARCHAR(20), 
       city VARCHAR(50), 
       postcode VARCHAR(20), 
       state VARCHAR(50), 
       email VARCHAR(200) UNIQUE, 
       dob DATE, 
       age INT, 
       cell_phone VARCHAR(60),
       updated_at TIMESTAMP DEFAULT NOW()
       )
    `;
    await client.query(createTableQuery);
    console.log(`Table 'users_data' created or already exists.`);

    const insertTableQuery = `
        INSERT INTO users_data (gender, title, first_name, last_name, street_name, street_number, city, postcode, 
        state, email, dob, age, cell_phone, updated_at)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
        ON CONFLICT (email) DO UPDATE 
        SET updated_at = NOW();
    `;

    await client.query(insertTableQuery, [
      user.gender,
      user.title,
      user.firstName,
      user.lastName,
      user.streetName,
      user.streetNumber,
      user.city,
      user.postcode,
      user.state,
      user.email,
      user.dob,
      user.age,
      user.cell,
    ]);

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error(`Error inserting data into PostgreSQL: ${error}`);
  } finally {
    client.end();
    console.log("DB connection was closed successfully!");
  }
}

main();

// {
//     gender: 'female',
//     name: { title: 'Miss', first: 'Jenisha', last: 'Mendonsa' },
//     location: {
//       street: { number: 8984, name: 'Tank Bund Rd' },
//       city: 'Durgapur',
//       state: 'Daman and Diu',
//       country: 'India',
//       postcode: 68393,
//       coordinates: { latitude: '4.5030', longitude: '72.4800' },
//       timezone: {
//         offset: '+5:30',
//         description: 'Bombay, Calcutta, Madras, New Delhi'
//       }
//     },
//     email: 'jenisha.mendonsa@example.com',
//     dob: { date: '1959-04-02T11:20:46.619Z', age: 66 },
//     cell: '8529150840'
//   }
//
