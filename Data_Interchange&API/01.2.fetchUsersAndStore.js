import express from "express";
import cron from "node-cron";
import fs from "fs/promises";
import fsSync from "fs"; // for streaming files
import pkg from "pg";
const { Client } = pkg;

const app = express();
const PORT = 3002;
const BACKUP_FILE = "data_backup.json";
const LOG_FILE = "log.txt";

const DB_CONFIG = {
  database: "users_db",
  user: "postgres-user",
  password: "password",
  host: "localhost",
  port: 5432,
};

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
           created_at TIMESTAMP DEFAULT NOW(),
           updated_at TIMESTAMP DEFAULT NOW()
           )
        `;

const insertQuery = `
        INSERT INTO users_data (gender, title, first_name, last_name, street_name, street_number, city, postcode, 
        state, email, dob, age, cell_phone, created_at, updated_at)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
        ON CONFLICT (email) DO UPDATE SET
        gender = EXCLUDED.gender, 
        title = EXCLUDED.title, 
        first_name = EXCLUDED.first_name, 
        last_name = EXCLUDED.last_name, 
        street_name = EXCLUDED.street_name, 
        street_number = EXCLUDED.street_number, 
        city = EXCLUDED.city, 
        postcode = EXCLUDED.postcode, 
        state = EXCLUDED.state, 
        email = EXCLUDED.email, 
        dob = EXCLUDED.dob, 
        age = EXCLUDED.age, 
        cell_phone = EXCLUDED.cell_phone, 
        updated_at = NOW();
    `;

async function fetchUsersAndStore(count) {
  const url = `https://randomuser.me/api/?results=${count}`;
  const timestamp = new Date().toISOString();
  try {
    const response = await fetch(url, { timeout: 10000 });
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    const data = await response.json();

    // save raw data as back-up
    await fs.writeFile(BACKUP_FILE, JSON.stringify(data, null, 2));
    // await fs.writeFile("data_backup.json", JSON.stringify(data, null, 2));
    console.log("Backup saved to", BACKUP_FILE);

    const transformedUsers = transformUsers(data);
    const insertedCount = await storeToDatabase(transformedUsers);

    // Write log
    const logEntry = `[${timestamp}] ${insertedCount} users fetched and inserted/updated.\n`;
    await fs.appendFile(LOG_FILE, logEntry);
  } catch (error) {
    const logEntry = `[${timestamp}] Error: ${error.message}\n`;
    await fs.appendFile(LOG_FILE, logEntry);
    console.error("Fetch or insert failed:", error);
    throw error; // Rethrow for Express to catch
  }
}

function transformUsers(usersData) {
  const users = usersData.results;

  return users.map((user) => ({
    gender: user.gender,
    title: user.name.title,
    firstName: user.name.first,
    lastName: user.name.last,
    streetName: user.location.street.name,
    streetNumber: user.location.street.number,
    city: user.location.city,
    postcode: user.location.postcode,
    state: user.location.state,
    email: user.email,
    dob: new Date(user.dob.date).toISOString().split("T")[0],
    age: user.dob.age,
    cell: user.cell,
  }));
}

async function storeToDatabase(users) {
  const client = new Client(DB_CONFIG);
  let inserted = 0;

  try {
    await client.connect();
    console.log("Connection to PostgreSQL is successful!");

    await client.query(createTableQuery);
    console.log(`Table 'users_data' created or already exists.`);

    for (const user of users) {
      await client.query(insertQuery, [
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
      inserted++;
    }
    console.log(`${inserted} users inserted or updated.`);
  } catch (error) {
    console.error(`Error inserting data into PostgreSQL: ${error}`);
  } finally {
    await client.end();
    console.log("DB connection was closed successfully!");
  }
}

// Schedule task to run every hour
cron.schedule("0 * * * *", () => {
  console.log("Scheduled fetch triggered");
  fetchUsersAndStore(10).catch(() => {
    console.log("Cron job failed");
  });
});

// API endpoint to manually trigger fetch
app.get("/fetch_users", async (req, res) => {
  try {
    await fetchUsersAndStore(10);
    res.status(200).send("Manual fetch completed and logged.");
  } catch (error) {
    res.status(500).send(`Fetch failed: ${error.message}`);
  }
});

// GET /backup → Download the last backup file
app.get("/backup", (req, res) => {
  if (fsSync.existsSync(BACKUP_FILE)) {
    res.download(BACKUP_FILE);
  } else {
    res.status(404).send("Backup file not found.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`API endpoints:
    - GET /fetch_users → manually fetch users
    - GET /backup → download latest backup`);
});
