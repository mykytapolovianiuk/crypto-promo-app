import nodemailer from "nodemailer";
import { mail } from "./constants";

export const transporter = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  secure: false, // true, если 465 порт
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});
