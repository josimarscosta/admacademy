import { StringValue } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email: string;
      };
    }
  }
}

declare module 'jsonwebtoken' {
  export interface SignOptions {
    expiresIn?: string | number | StringValue;
  }
}
