import { NextFunction, Request, Response } from 'express';

// Error handling middleware for handling not found errors (404)
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error handling middleware for handling all other errors (500)
export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
};

export default { notFound, errorHandler };
