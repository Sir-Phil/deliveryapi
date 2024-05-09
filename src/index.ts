import * as dotenv from "dotenv";
import app from "./app";
import http from "http"
import { connect } from "./db/db_config";

dotenv.config();

//Handle uncaught errors globally
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception', err);
    process.exit(1);
});

const httpServer = http.createServer(app);

// Connect to the database
connect()
    .then(() => {
        console.log('Connected to the database');
        // Start the express app
        httpServer.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
        process.exit(1);
    });



// handle the promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   
        process.exit(1)
});