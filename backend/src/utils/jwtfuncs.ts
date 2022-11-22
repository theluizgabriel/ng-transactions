import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { ILogin } from '../entities/Interfaces';

dotenv.config();

const secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
export function tokenGenerate (data: ILogin) { return jwt.sign(data, secret, { expiresIn: '1d' }); }
