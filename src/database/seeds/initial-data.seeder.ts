import { Seeder } from 'typeorm-extension';
import { ObjectLiteral, Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import { users } from '../seed-data';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';

export default class InitialDataSeeder implements Seeder {
  public async run(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log(`Successfully connected with MySQL`);

      await this.seedEntities(AppDataSource.getRepository(User), users);

      console.log('Seeding complete');
    } catch (error) {
      console.error('Error in seeding the database:', error);
    }
  }

  private async seedEntities<T extends ObjectLiteral>(
    repository: Repository<T>,
    data: T[],
  ): Promise<void> {
    await Promise.all(
      data.map(async (entity) => {
        if ('password' in entity && entity.password) {
          const user = User.create(entity);
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
          Object.assign(entity, user);
        }
      }),
    );

    await repository.save(data);
  }
}
