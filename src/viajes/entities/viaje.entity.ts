import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pasajero } from '../../pasajero/entities/pasajero.entity';
import { Conductor } from 'src/conductor/entities/conductor.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  esRetiro: boolean;

  @Column()
  correo_remitente: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora_llegada: Date;

  @Column()
  dir_inicio: string;

  @Column()
  dir_destino: string;

  @Column({ nullable: true })
  url_firma?: string;

  @Column()
  estado_viaje: string;

  @JoinTable()
  @ManyToMany(() => Pasajero, (pasajero) => pasajero.viajes, {
    cascade: ['insert'],
  })
  pasajeros: Pasajero[];

  @JoinColumn()
  @ManyToOne(() => Conductor)
  conductor: Conductor;

  @JoinColumn()
  @ManyToOne(() => Empresa)
  empresa: Empresa;
}
