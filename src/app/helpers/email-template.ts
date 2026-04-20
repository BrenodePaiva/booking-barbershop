import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const emailTemplate = (
  message: string,
  data: string,
  hora: string,
  link: string,
): string => {
  return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0; padding:0; background-color:#f9fafb; font-family:Inter, Arial, sans-serif;">
      <table width="100%" style="max-width:600px; margin:auto; background:#fff; border-radius:8px;">
        <tr>
          <td style="background:#1f2937; color:#fff; text-align:center; padding:20px;">
            <h1 style="margin:0;">Barbershop System</h1>
          </td>
        </tr>

         <!-- Body -->
        <tr>
          <td style="padding:24px; color:#374151;">
            <p style="font-size:16px; margin-bottom:16px;">
              ${message}
            </p>
            <p style="font-size:14px; margin-bottom:16px;">
              Data: <strong>${data}</strong><br/>
              Hora: <strong>${format(hora, "HH:mm", { locale: ptBR })}</strong>
            </p>
            <p style="font-size:14px; margin-bottom:24px;">
              Clique no botão abaixo para acessar sua lista de agendamentos:
            </p>
            <p style="text-align:center;">
              <a href=${link}
                 style="display:inline-block; background-color:#2563eb; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:600; font-size:14px;">
                Ver Agendamento
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f3f4f6; text-align:center; padding:16px; font-size:12px; color:#6b7280;">
            © 2026 Barbershop System
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
