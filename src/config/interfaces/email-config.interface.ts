interface IEmailAuth {
  user: string;
  pass: string;
}

export interface IEmailConfig {
  auth: IEmailAuth;
  host: string;
  port: number;
  secure: boolean;
}
