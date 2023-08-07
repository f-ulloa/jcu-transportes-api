import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_APP_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, viajeInfo: Viaje) {
    const { id, url_firma, empresa, ...cleanedData } = viajeInfo;

    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #F0F4F8; padding: 20px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); max-width: 500px; margin: 20px auto;">
      <h2 style="text-align: center; color: #1E76D8; font-size: 28px; border-bottom: 2px solid #D1D9E1; padding-bottom: 8px;">Viaje</h2>
      <div style="background-color: #fff; border: 1px solid #D1D9E1; border-radius: 8px; padding: 15px;">
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Correo Remitente:</strong> ${
          cleanedData.correo_remitente
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Fecha:</strong> ${
          cleanedData.fecha
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">${
          cleanedData.esRetiro
            ? 'Hora de recoger a pasajeros:'
            : 'Hora de llegada a destino:'
        }:</strong> ${cleanedData.hora_llegada}</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Dirección de Inicio:</strong> ${
          cleanedData.dir_inicio
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Dirección de Destino:</strong> ${
          cleanedData.dir_destino
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Estado del Viaje:</strong> ${
          cleanedData.estado_viaje
        }</p>      <h3 style="text-align: center; color: #1E76D8; font-size: 24px; border-bottom: 2px solid #D1D9E1; padding-bottom: 8px;">Pasajeros</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #F0F4F8;">
            <th style="padding: 8px; border: 1px solid #D1D9E1;">Nombre</th>
            <th style="padding: 8px; border: 1px solid #D1D9E1;">Teléfono</th>
            <th style="padding: 8px; border: 1px solid #D1D9E1;">Domicilio</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #D1D9E1;">${
              cleanedData.pasajeros[0].nombre
            }</td>
            <td style="padding: 8px; border: 1px solid #D1D9E1;">${
              cleanedData.pasajeros[0].fono
            }</td>
            <td style="padding: 8px; border: 1px solid #D1D9E1;">${
              cleanedData.pasajeros[0].domicilio
            }</td>
          </tr>
        </table>
        <h3 style="text-align: center; color: #1E76D8; font-size: 24px; border-bottom: 2px solid #D1D9E1; padding-bottom: 8px;">Conductor</h3>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Nombre:</strong> ${
          cleanedData.conductor.nombre
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Teléfono:</strong> ${
          cleanedData.conductor.fono
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Patente:</strong> ${
          cleanedData.conductor.patente
        }</p>
        <p style="font-size: 16px; color: #4A4A4A; margin: 8px 0;"><strong style="color: #0077B6;">Modelo de Auto:</strong> ${
          cleanedData.conductor.modelo_auto
        }</p>
      </div>
    </div>
  `;

    try {
      return await this.transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
