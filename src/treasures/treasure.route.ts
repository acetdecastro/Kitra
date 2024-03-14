import express from 'express';
import { TreasureController } from './treasure.controller';
import { TreasureService } from './treasure.service';
import { TreasureRepository } from '../database/data-source';

const router = express.Router();
const treasureService = new TreasureService(TreasureRepository);
const treasureController = new TreasureController(treasureService);

router.get('/', async (req, res) => {
  try {
    const treasures = await treasureController.findTreasures(req);
    res.json(treasures);
  } catch (error) {
    console.error('Error finding treasures:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as treasureRouter };
