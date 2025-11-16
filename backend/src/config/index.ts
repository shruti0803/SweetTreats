// src/config/index.ts

import 'dotenv/config';

const config = {
    // This safely pulls the URI from the .env file
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/sweetshop',
    jwtSecret: process.env.JWT_SECRET || 'fallbacksecret-shouldbechanged'
};

export default config;