import { Seeder } from 'typeorm-extension';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import { Treasure } from '../../treasures/treasure.entity';
import { MoneyValue } from '../../treasures/money-value.entity';
import {
  users,
  treasures,
  moneyValues,
  IUser,
  ITreasure,
  IMoneyValue,
} from '../seed-data';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';

export default class InitialDataSeeder implements Seeder {
  public async run(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log(`Successfully connected with MySQL`);

      await this.seedUsers(AppDataSource.getRepository(User), users);
      await this.seedTreasures(
        AppDataSource.getRepository(Treasure),
        treasures,
      );
      await this.seedMoneyValues(
        AppDataSource.getRepository(MoneyValue),
        moneyValues,
      );

      console.log('Seeding complete');
    } catch (error) {
      console.error('Error in seeding the database:', error);
    }
  }

  private async seedUsers(
    repository: Repository<User>,
    userData: IUser[],
  ): Promise<void> {
    await Promise.all(
      userData.map(async (user) => {
        const newUser = User.create(user as DeepPartial<User>);
        const salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await repository.save(newUser);
      }),
    );
  }

  private async seedTreasures(
    repository: Repository<Treasure>,
    treasureData: ITreasure[],
  ): Promise<void> {
    await Promise.all(
      treasureData.map(async (treasure) => {
        const newTreasure = Treasure.create(treasure as DeepPartial<User>);
        await repository.save(newTreasure);
      }),
    );
  }

  private async seedMoneyValues(
    repository: Repository<MoneyValue>,
    moneyValuesData: IMoneyValue[],
  ): Promise<void> {
    await Promise.all(
      moneyValuesData.map(async (moneyValueData) => {
        const treasureId = moneyValueData.treasure_id;
        const treasure = await repository.manager.findOne(Treasure, {
          where: { id: treasureId },
        });
        if (treasure) {
          const moneyValue = new MoneyValue();
          moneyValue.amt = moneyValueData.amt;
          moneyValue.treasure = treasure;
          await repository.save(moneyValue);
        }
      }),
    );
  }
}
