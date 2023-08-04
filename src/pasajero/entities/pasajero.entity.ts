import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Viaje } from '../../viajes/entities/viaje.entity';

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

  @ManyToOne(() => Viaje, (viaje) => viaje.pasajeros)
  viaje: Viaje;
}
