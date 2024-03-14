import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Treasure } from './treasure.entity';

@Entity()
export class MoneyValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  amt!: number;

  @Column()
  @JoinColumn({ name: 'treasure_id' })
  treasure_id!: number;

  @ManyToOne(() => Treasure, (treasure) => treasure.moneyValues)
  @JoinColumn({ name: 'treasure_id' })
  treasure!: Treasure;
}
