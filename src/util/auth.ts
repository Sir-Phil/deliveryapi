import asyncHandler from "express-async-handler";
import { IUserRequest } from "../interface/d_interface";
import jwt from "jsonwebtoken";
import { Client } from 'pg';
import { Response, NextFunction } from "express";


export const isAuthenticated = asyncHandler(async (req: IUserRequest, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

            const client = new Client();
            await client.connect();
            const result = await client.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
            await client.end();

            const user = result.rows[0];

            if(!user){
                res.status(401).json({error: "User not found"});
            }

            // attache the user data to request user
            req.user = user;
            console.log("User data:", req.user);

            next();


        } catch (error: any) {
            console.error(error.message);
            res.status(401).json({error: "Invalid token"});
        }
    }

    if(!token){
       res.status(401).json({ error: "No token provider"});
    }
})