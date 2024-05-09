import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Connection configuration
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'), // Default PostgreSQL port
});

// Connect to the database
async function connect() {
    try {
        await client.connect();
        console.log('Connected to the database');
        return client; // Return the client instance
    } catch (err) {
        console.error('Connection error:', err);
        throw err; // Throw error if connection fails
    }
}

export { connect };
