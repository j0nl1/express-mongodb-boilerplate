import 'dotenv/config';

import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';

const app = express();
const { DOMAIN, PORT } = process.env;

app.use(cors({ origin: DOMAIN }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

http.createServer(app).listen(PORT, () => logger.info(`Server running and listening in port: ${PORT}`));
