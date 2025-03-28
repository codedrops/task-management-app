import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Node.js Express App!');
});


export default app;