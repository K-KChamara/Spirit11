// Import the required modules
import express from 'express';
import cors from 'cors'; // Importing CORS
import dbConnect from './DataBase/db.js';
import dotenv from 'dotenv';
import PlayerRouter from './Routes/playerRoutes.js';
import { teamRouter } from './Routes/teamRoutes.js';
import ChatBotRouter from './Routes/chatBotRoutes.js';
const app = express();
// Load environment variables
dotenv.config();
const port = process.env.PORT || 3000;

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());
dbConnect()

// Example route for the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example route for handling a POST request
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.status(201).json({ message: 'Data received', data });
});
app.use('/api/player', PlayerRouter);
app.use('/api/team' ,teamRouter)
app.use('/api/chatBot',ChatBotRouter);
// Add more routes as needed
// app.get('/example', (req, res) => { ... });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
