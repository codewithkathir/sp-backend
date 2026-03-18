import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';

export class AnalyticsController {
  static async summary(_req: Request, res: Response) {
    const data = await AnalyticsService.summary();
    res.json(data);
  }
}
