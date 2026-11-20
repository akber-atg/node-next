import { Router, Request, Response } from 'express';
import { pool } from '../../lib/db';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

router.get('/data', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from the Express API layer!' });
});

router.post('/login', (_req: Request, res: Response) => {
  res.json({ message: 'invalid credentials' });
});

router.get('/get-page-data', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pages');
    res.status(200).json(rows);
  } catch (error: any) {
    console.error('--- EXACT DATABASE ERROR ---');
    console.error(error);
    console.error('----------------------------');

    res.status(500).json({
      message: 'Error fetching data from the database',
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      details: error.message,
    });
  }
});

// The zod example below is a simple demonstration of how to use Zod for input validation in an Express route. 
import { z } from 'zod';
import { BookingSchema } from '../../lib/validations/booking.schema';
import { createBookingService } from '../../lib/Services/bookingService';

router.post('/book-appointment', async (req: Request, res: Response) => {

  
    const outcome = await createBookingService(req.body);
      
      if (!outcome.success) {
      return res.status(400).json({ message: 'Invalid input data', errors: outcome.errors });
    }

    // Process the validated data (e.g., save to database)
    res.status(201).json({ message: 'Appointment booked successfully', data: outcome.data });
});

export default router;