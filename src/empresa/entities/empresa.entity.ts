import { Pasajero } from 'src/pasajero/entities/pasajero.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fono: string;

  @Column()
  direccion: string;

  @JoinColumn()
  @OneToMany(() => Pasajero, (pasajero) => pasajero.empresa)
  viejos: Pasajero[];
}
