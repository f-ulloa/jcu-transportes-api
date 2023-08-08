import { Injectable } from '@nestjs/common';
import { Viaje } from 'src/viajes/entities/viaje.entity';
import * as Twilio from 'twilio';

@Injectable()
export class WhatsappService {
  private client: any;

  constructor() {
    this.client = Twilio(
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
      },
    );
  }

  async sendMessage(to: string, viajeInfo: Viaje): Promise<void> {
    const { id, url_firma, empresa, ...cleanedData } = viajeInfo;

    const whatsappMessage = `
*Viaje confirmado !*
Correo Remitente: ${cleanedData.correo_remitente}
Fecha: ${cleanedData.fecha}
${
  cleanedData.esRetiro
    ? 'Hora de recoger a pasajeros:'
    : 'Hora de llegada a destino:'
}: ${cleanedData.hora_llegada}
Dirección de Inicio: ${cleanedData.dir_inicio}
Dirección de Destino: ${cleanedData.dir_destino}
Estado del Viaje: ${cleanedData.estado_viaje}

*Pasajeros*
${cleanedData.pasajeros.map((pasajero) => {
  return `Nombre: ${pasajero.nombre}\nTeléfono: ${pasajero.fono}\nDomicilio: ${pasajero.domicilio}\n`;
})}

*Conductor*
Nombre: ${cleanedData.conductor.nombre}
Teléfono: ${cleanedData.conductor.fono}
Patente: ${cleanedData.conductor.patente}
Modelo de Auto: ${cleanedData.conductor.modelo_auto}
`;
    console.log({ whatsappMessage });
    await this.client.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${to}`,
      body: whatsappMessage,
    });
  }
}
