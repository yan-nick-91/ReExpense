import type { ResetPasswordRequestDTO } from '../../dto/in/ResetPasswordRequestDTO.js';
import nodemailer from 'nodemailer';


export class MailCommandService {
  private transporter?: nodemailer.Transporter;

  constructor() {
    if (process.env.NODE_ENV !== 'development') {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  private async initTestTransporter() {
    if (this.transporter) return;

    const testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      }
    })

    console.log('Ethereal test account created:');
    console.log('User:', testAccount.user);
    console.log('Pass:', testAccount.pass);
  }

  async forgotPassword(dto: ResetPasswordRequestDTO, resetUrl: string) {
    const { email } = dto;

    if (!this.transporter) {
      await this.initTestTransporter();
    }

    const info = await this.transporter!.sendMail({
      from: '"Support" <no-reply@example.com>',
      to: email,
      subject: 'Resetting password',
      html: `
        <h1>Resetting Password</h1>
        <p>Click on the link below to reset your password</p>
        <a href="${resetUrl}">Reset Password</a>
        <p><strong>Note: </strong>this link is available for 1 hour</p>`,
    });
    console.log(`Mail sent to ${email}`);
    if (process.env.NODE_ENV === 'development') {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info))
    }
  }
}
