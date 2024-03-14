import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { MoneyValue } from './money-value.entity';

@Entity()
export class Treasure extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude!: number;

  @Column()
  name!: string;

  @OneToMany(() => MoneyValue, (moneyValue) => moneyValue.treasure, {
    cascade: true,
  })
  moneyValues!: MoneyValue[];
}
