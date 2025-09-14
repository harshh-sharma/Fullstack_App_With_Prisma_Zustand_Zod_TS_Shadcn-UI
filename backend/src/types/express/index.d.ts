// src/types/express/index.d.ts
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string; // or number if your Prisma user IDs are integers
  }
}
