import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';
import { IEmailConfig } from 'src/config/interfaces/email-config.interface';
import { IUser } from 'src/users/interfaces/user.interface';
import { ITemplatedData } from './interfaces/template-data.interface';
import { ITemplates } from './interfaces/template.interface';

@Injectable()
export class MailerService {
  private readonly loggerService: LoggerService;
  private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly email: string;
  private readonly domain: string;
  private readonly templates: ITemplates;

  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get<IEmailConfig>('emailService');
    this.transport = createTransport(emailConfig);
    this.email = `"My App" <${emailConfig.auth.user}>`;
    this.domain = this.configService.get<string>('domain');
    this.loggerService = new Logger(MailerService.name);

    this.templates = {
      confirmation: MailerService.parseTemplate('confirmation.hbs'),
      resetPassword: MailerService.parseTemplate('reset-password.hbs'),
    };
  }

  private static parseTemplate(
    templateName: string,
  ): Handlebars.TemplateDelegate<ITemplatedData> {
    const templateText = readFileSync(
      join(__dirname, 'templates', templateName),
      'utf-8',
    );
    return Handlebars.compile<ITemplatedData>(templateText, { strict: true });
  }

  public sendEmail(
    to: string,
    subject: string,
    html: string,
    log?: string,
  ): void {
    this.transport
      .sendMail({
        from: this.email,
        to,
        subject,
        html,
      })
      .then(() => this.loggerService.log(log ?? 'A new email was sent.'))
      .catch((error) => this.loggerService.error(error));
  }

  public sendConfirmationEmail(user: IUser, token: string): void {
    const { email, firstName, lastName, username } = user;
    const subject = 'Confirm your email';
    const html = this.templates.confirmation({
      firstName: this.capitalizeFirstLetter(firstName),
      lastName: lastName.toUpperCase(),
      username,
      link: `http://${this.domain}/auth/confirm/${btoa(token)}`,
    });
    this.sendEmail(email, subject, html, 'A new confirmation email was sent.');
  }

  public sendResetPasswordEmail(user: IUser, token: string): void {
    const { email, firstName, lastName, username } = user;
    const subject = 'Reset your password';
    const html = this.templates.resetPassword({
      firstName: this.capitalizeFirstLetter(firstName),
      lastName: lastName.toUpperCase(),
      username,
      link: `http://${this.domain}/auth/reset-password/${btoa(token)}`,
    });
    this.sendEmail(
      email,
      subject,
      html,
      'A new reset password email was sent.',
    );
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }
}
