import { Resend } from "resend";
import { emailTemplate } from "./email-template";

type EmailData = {
  message: string;
  data: string;
  hora: string;
  link: string;
  email: string;
  subject: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingEmail = async ({
  message,
  data,
  hora,
  link,
  email,
  subject,
}: EmailData) => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "delivered@resend.dev",
      subject,
      html: emailTemplate(message, data, hora, link),
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar e-mails:", error);
    return { success: false, error: String(error) };
  }
};
