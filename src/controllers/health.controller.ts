import { ENCODING_UTF8 } from '../utils/constants';
import { Request, Response } from 'express';
import { connection } from '../enums';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';

const pjson = JSON.parse(readFileSync('./package.json', ENCODING_UTF8));

export const HealthStatus = (req: Request, res: Response) => {
  res.status(200).send({
    name: pjson.name,
    version: pjson.version,
    mongodb: {
      status: connection[mongoose.connection.readyState]
    }
  });
};
