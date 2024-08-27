import 'reflect-metadata';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class System {
  @PrimaryColumn({ type: 'text' })
  symbol!: string;

  @Column({ type: 'text' })
  type!: string;

  @Column({ type: 'integer' })
  x!: number;

  @Column({ type: 'integer' })
  y!: number;
}
