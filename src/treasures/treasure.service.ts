import { Repository } from 'typeorm';
import { Treasure } from './entities/treasure.entity';

export class TreasureService {
  constructor(private readonly treasureRepository: Repository<Treasure>) {}

  async findTreasures(): Promise<Treasure[]> {
    return this.treasureRepository.find();
  }
}
