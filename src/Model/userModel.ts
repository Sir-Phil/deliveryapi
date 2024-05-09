import { Client } from "pg";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from "../interface/d_interface";



class User  {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async createUser(user: IUser): Promise<void>{
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = 'INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())';
        await this.client.query(query, [user.username, user.email, hashedPassword]);
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await this.client.query(query, [email]);
        return result.rows.length ? result.rows[0] : null;
    }

    async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    generateAuthToken(user: IUser) : string {
        return jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: '1d'}
        )
    }
}

export default User;