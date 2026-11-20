import dotenv from 'dotenv';


import express, { Request, Response } from 'express';
import next from 'next';
import apiRouter from './routes/api';

const envFile =
    process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.local';

 dotenv.config({ path: envFile });
        
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

// Initialize Next.js app instance
const app = next({ dev });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();
    const server = express();

    // Standard Express middleware
    // server.use(express.json());
    // server.use(express.urlencoded({ extended: true }));

    // Mount API routes
    server.use('/api', apiRouter);

    // Delegate remaining routes to Next.js page handlers
server.use((req: Request, res: Response) => {
  return handle(req, res);
});
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port} [${dev ? 'development' : 'production'}]`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();