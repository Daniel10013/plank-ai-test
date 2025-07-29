import dotenv from 'dotenv';

dotenv.config({quiet: true});

const PORT = process.env.PORT;
const CSV_PATH: string = process.env.CSV_PATH || '';

export {
    PORT,
    CSV_PATH
};

