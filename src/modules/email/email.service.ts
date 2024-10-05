import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDTO } from './solicitud.dto';
import { SentMessageInfo, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: true,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string): Promise<SentMessageInfo> {
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendEmailToFixedRecipient(data: any): Promise<SentMessageInfo> {
    const emailContent = this.generateEmailContent(data);
    return await this.sendEmail(
      process.env.EMAIL_RECEIVER,
      'Nueva Solicitud de Certificado de Nacimiento',
      'Nueva solicitud recibida',
      emailContent,
    );
  }

  async sendContactMessage(dto: ContactDTO): Promise<SentMessageInfo> {
    const { email, name, message } = dto;

    const htmlMessage = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            background-color: #d52b1e;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
          }
          .content h2 {
            font-size: 20px;
            color: #d52b1e;
            margin-bottom: 10px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo mensaje de contacto</h1>
          </div>
          <div class="content">
            <h2>Detalles del remitente</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h2>Mensaje</h2>
            <p>${message}</p>
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const subject = `Nuevo mensaje de [${name}] - Contacto desde el sitio web`;

    return await this.sendEmail(email, subject, message, htmlMessage);
  }

  async sendConfirmationEmail(to: string): Promise<SentMessageInfo> {
    const subject = 'Confirmación de Solicitud de Certificado de Nacimiento';
    const htmlContent = this.generateConfirmationEmailContent();

    return await this.sendEmail(
      to,
      subject,
      'Su solicitud está siendo procesada.',
      htmlContent
    );
  }

  private generateEmailContent(data: any): string {
    const recipientText = '<h1>Solicitud de Certificado de Nacimiento</h1>';
    const datosSolicitanteTable = data.datosSolicitante
      ? this.generateTable(data.datosSolicitante)
      : '<p>Datos del solicitante no disponibles.</p>';

    const datosNotificacionTable = data.datosNotificacion
      ? this.generateTable(data.datosNotificacion)
      : '<p>Datos de notificación no disponibles.</p>';

    return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .header {
            background-color: #d52b1e;
            padding: 10px;
            text-align: center;
            color: #fff;
          }
          .header img {
            width: 50px;
            height: auto;
            vertical-align: middle;
          }
          .header h1 {
            display: inline;
            margin: 0;
            padding-left: 10px;
            font-size: 24px;
            vertical-align: middle;
          }
          .container {
            padding: 20px;
          }
          h2 {
            color: #d52b1e;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1920px-Bandera_de_Espa%C3%B1a.svg.png" alt="Spain Flag">
          <h1>Gobierno de España</h1>
        </div>
        <div class="container">
          ${recipientText}
          <h2>Datos del Solicitante</h2>
          ${datosSolicitanteTable}
          <h2>Datos de Notificación</h2>
          ${datosNotificacionTable}
        </div>
      </body>
      </html>
    `;
  }

  private generateConfirmationEmailContent(): string {
    return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .header {
            background-color: #d52b1e;
            padding: 10px;
            text-align: center;
            color: #fff;
          }
          .header img {
            width: 50px;
            height: auto;
            vertical-align: middle;
          }
          .header h1 {
            display: inline;
            margin: 0;
            padding-left: 10px;
            font-size: 24px;
            vertical-align: middle;
          }
          .container {
            padding: 20px;
          }
          h2 {
            color: #d52b1e;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1920px-Bandera_de_Espa%C3%B1a.svg.png" alt="Spain Flag">
          <h1>Gobierno de España</h1>
        </div>
        <div class="container">
          <h2>Solicitud en Proceso</h2>
          <p>Estimado/a solicitante,</p>
          <p>Su solicitud de Certificado de Nacimiento ha sido recibida con éxito y está siendo procesada. Recibirá una notificación por correo electrónico una vez que su solicitud haya sido completada.</p>
          <p>Gracias por utilizar nuestros servicios.</p>
        </div>
        <div class="footer">
          <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
        </div>
      </body>
      </html>
    `;
  }

  private generateTable(data: Record<string, any>): string {
    if (!data || Object.keys(data).length === 0) {
      return '<p>Datos no disponibles.</p>';
    }

    const rows = Object.entries(data)
      .map(([key, value]) =>
        `<tr>
          <td>${this.formatKey(key)}</td>
          <td>${typeof value === 'object' && value !== null ? value.label : value}</td>
        </tr>`
      )
      .join('');
    return `<table>${rows}</table>`;
  }

  private formatKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}
