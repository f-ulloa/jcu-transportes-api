import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pasajero } from '../../pasajero/entities/pasajero.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora_llegada: Date;

  @Column()
  dir_inicio: string;

  @Column()
  dir_destino: string;

  @JoinTable()
  @OneToMany(() => Pasajero, (pasajero) => pasajero.viaje, {
    cascade: true, // 👈 or optionally just insert or update ['insert']
  })
  pasajeros: Pasajero[];
}
