import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Viaje } from '../../viajes/entities/viaje.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Entity()
export class Pasajero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fono: string;

  @Column()
  domicilio: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.viejos)
  empresa: Empresa;

  @ManyToMany(() => Viaje, (viaje) => viaje.pasajeros)
  viajes: Viaje[];
}
