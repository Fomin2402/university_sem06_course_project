import { createTransport, SentMessageInfo } from 'nodemailer';

import * as config from '../../../global/env.json';
import Mail from 'nodemailer/lib/mailer';

interface ISendEmailParams {
    subject: string;
    template: string;
    to: string;
}

const nodemailerOptions: any = config.backend.nodemailer;
const user: string = config.backend.nodemailer.auth.user;

console.log('nodemailerOptions:');
console.log(nodemailerOptions);

const transporter: Mail = createTransport(nodemailerOptions);

export const sendMail: (
    params: ISendEmailParams
) => Promise<SentMessageInfo> = ({ subject, template, to }: ISendEmailParams) =>
    transporter.sendMail({
        to,
        from: user,
        subject: subject,
        html: template,
    });
