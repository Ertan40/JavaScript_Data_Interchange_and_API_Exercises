import { createConnection } from "mysql2/promise";

const DB_CONFIG = {
  database: "your_db_name",
  user: "your_user",
  password: "ypur_password",
  host: "your_host",
  port: 3306,
};

const createTableQuery = `
     CREATE TABLE IF NOT EXISTS users_data (
        user_id INT AUTO_INCREMENT PRIMARY KEY, 
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
     );
`;

const insertQuery = `
     INSERT INTO users_data(gender, title, first_name, last_name, street_name, street_number, city, postcode, 
            state, email, dob, age, cell_phone, updated_at)
            VALUES ?
            ON DUPLICATE KEY UPDATE email = VALUES(email);
`;

async function fetchStoreToMysql(count) {
  const url = `https://randomuser.me/api/?results=${count}`;

  try {
    const response = await fetch(url, { timeout: 10000 });
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    const data = await response.json();
    // console.log(data.results[0]);
    const transformedUsers = transformUsers(data);
    // console.log(transformedUsers);
    await storeToDatabase(transformedUsers);
  } catch (error) {
    console.error(`HTTP error! Due to an error: ${error}`);
  }
}

function transformUsers(userData) {
  const users = userData.results;

  return users.map((user) => ({
    gender: user.gender,
    title: user.name.title,
    first_name: user.name.first,
    last_name: user.name.last,
    street_name: user.location.street.name,
    street_number: user.location.street.number,
    city: user.location.city,
    postcode: user.location.postcode,
    state: user.location.state,
    email: user.email,
    dob: new Date(user.dob.date).toISOString().split("T")[0],
    age: user.dob.age,
    cell_phone: user.cell,
    updated_at: new Date(),
  }));
}

async function storeToDatabase(transformedUsers) {
  const connection = await createConnection(DB_CONFIG); // Create connection

  try {
    await connection.execute(createTableQuery);
    console.log("Table 'users_data' created or already exists.");

    const values = transformedUsers.map((user) => [
      user.gender,
      user.title,
      user.first_name,
      user.last_name,
      user.street_name,
      user.street_number,
      user.city,
      user.postcode,
      user.state,
      user.email,
      user.dob,
      user.age,
      user.cell_phone,
      user.updated_at,
    ]);

    await connection.query(insertQuery, [values]);

    console.log(`${transformedUsers.length} users inserted.`);
  } catch (error) {
    console.error("DB Error:", error.message);
  } finally {
    await connection.end(); //  Close connection
    console.log("DB connection was closed successfully!");
  }
}

fetchStoreToMysql(5);
