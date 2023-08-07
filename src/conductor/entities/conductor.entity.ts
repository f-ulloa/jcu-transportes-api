import { Viaje } from 'src/viajes/entities/viaje.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conductor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fono: string;

  @Column({ nullable: true })
  patente: string;

  @Column({ nullable: true })
  modelo_auto: string;

  @OneToMany(() => Viaje, (viaje) => viaje.conductor)
  viajes_realizados: Viaje[];
}
