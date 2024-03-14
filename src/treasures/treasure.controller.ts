import { Request } from 'express';
// import { validate } from 'class-validator';
import { Treasure } from './entities/treasure.entity';
import { TreasureService } from './treasure.service';

export class TreasureController {
  constructor(private readonly treasureService: TreasureService) {}

  async findTreasures(req: Request): Promise<Treasure[]> {
    const treasures = this.treasureService.findTreasures();

    return treasures;
  }
}
