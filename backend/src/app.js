import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes/index.routes';

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({ message: 'Surge Server Up and Running' }));

app.use('/api', routes);

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Surge server successfully started on port ${port}`)
})
