import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';



const PORT = 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to database before starting the server
try {
  await db();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error('Failed to connect to database', err);
}
