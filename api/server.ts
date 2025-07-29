import express from 'express';
import cors from 'cors';
import { PORT } from './src/Config/config';
import activityRoutes from './src/Routes/ActivityRoutes';

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/v1', activityRoutes);

if(!PORT){
    console.log('Missing Port to start server!');
    process.exit(1);
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} !`);
})