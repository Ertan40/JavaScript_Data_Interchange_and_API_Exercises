// Let's extend our code and move the data to PostgreSQL DB

import dotenv from 'dotenv';  // Load environment variables from .env
import pkg from 'pg';  // For PostgreSQL connection

const { Client } = pkg;  // Destructure Client from pg package

// Load environment variables
dotenv.config();


async function fetchData() {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        const  response = await fetch(url)
        if (!response.ok) {
            throw new Error (`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()

        const processedData = processApiData(data)
        await storeDataToPostgres(processedData) // Store data in PostgreSQL

    } catch (error) {
        console.error("Error fetching data:", error)
    }}

function processApiData(data) {
    // console.log("Data:", data)
    // Use map to transform the data into a new array
    const cryptoArray = data.map(element => ({
        'name': element['name'],
        'symbol': element['symbol'],
        'current_price': element['current_price'],
        'market_cap': element['market_cap'],
        'total_volume': element['total_volume'],
        'high_24h': element['high_24h'],
        'low_24h': element['low_24h'],
        'price_change_24h': element['price_change_24h'],
    }));
    console.log(cryptoArray);
    return cryptoArray;
}

async function storeDataToPostgres (processedData) {
    // Configure your PostgreSQL connection
     const client = new Client ({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    })
    // or with your data without environment variables 
    // const client = new Client({
    //     user: 'your-info',
    //     host: 'localhost',
    //     database: 'your-info', 
    //     password: 'your-info',
    //     port: 5432,
    // });
    try {
        await client.connect()
        console.log("Connection to PostgresSQL DB is successfull!")

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS crypto_data (
                 id SERIAL PRIMARY KEY, 
                 name VARCHAR(250),
                 symbol VARCHAR(50),
                 current_price NUMERIC,
                 market_cap BIGINT,
                 total_volume BIGINT,
                 high_24h NUMERIC,
                 low_24h NUMERIC,
                 price_change_24h NUMERIC
            )
        `
        await client.query(createTableQuery)
        console.log("Table 'crypto_data' is ready.");

        const insertQuery = `
            INSERT INTO crypto_data (name, symbol, current_price, market_cap, total_volume, high_24h, low_24h, price_change_24h)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        for (const item of processedData) {
            await client.query(insertQuery, [
                item.name,
                item.symbol,
                item.current_price,
                item.market_cap,
                item.total_volume,
                item.high_24h,
                item.low_24h,
                item.price_change_24h
            ])
        }
        console.log("Data has been inserted successfully.")
    } catch (error) {
        console.error("Error inserting data into PostgreSQL:", error)
    } finally {
        await client.end()
        console.log("PostgreSQL connection closed.")
    }
}

fetchData()