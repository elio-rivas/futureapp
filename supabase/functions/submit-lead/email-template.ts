export type EmailLanguage = "en" | "es";

export interface ConfirmationEmailData {
  parentName: string;
  language: EmailLanguage;
  logoUrl: string;
}

export interface ConfirmationEmail {
  subject: string;
  html: string;
  text: string;
}

// Parent acknowledgment design synchronized from the deployed Bolt template.
// Keep the local handler contract and plain-text alternative.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildConfirmationEmail(data: ConfirmationEmailData): ConfirmationEmail {
  const isSpanish = data.language === "es";
  const logoUrl = escapeHtml(data.logoUrl || "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png");
  const name = data.parentName.trim().replace(/\s+/g, " ");
  const parentName = escapeHtml(name);

  const qualityLine = isSpanish
    ? "Educación de calidad para un mañana brillante"
    : "Quality Education for a Brighter Tomorrow";
  const greeting = isSpanish
    ? `Hola ${parentName},`
    : `Hello ${parentName},`;
  const heading = isSpanish
    ? "¡Gracias por contactarnos!"
    : "Thank you for contacting us!";
  const messageLead = isSpanish
    ? "Hemos recibido su consulta y agradecemos su interés en Future Foundations Education."
    : "We have received your inquiry and appreciate your interest in Future Foundations Education.";
  const messageAction = isSpanish
    ? "Nuestro equipo revisará su mensaje y se pondrá en contacto con usted lo antes posible para hablar sobre cómo podemos apoyar el camino de aprendizaje de su hijo/a."
    : "Our team will review your message and contact you as soon as possible to discuss how we can support your child’s learning journey.";
  const messageClosing = isSpanish
    ? "¡Esperamos comunicarnos con usted!"
    : "We look forward to connecting with you!";
  const signOff = isSpanish ? "Atentamente," : "Warm regards,";
  const title = isSpanish ? "Directora" : "Director";
  const privacyNotice = isSpanish
    ? "Este es un acuse de recibo automático de su consulta. No envíe información confidencial del estudiante ni información médica por correo electrónico."
    : "This is an automatic acknowledgment of your inquiry. Please do not send sensitive student or medical information by email.";
  const footerFeatures = isSpanish
    ? ["Aprendizaje\npersonalizado", "Excelencia\nacadémica", "Comunidad\nde apoyo"]
    : ["Personalized\nLearning", "Academic\nExcellence", "Supportive\nCommunity"];

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:24px 0;">
    <tr><td align="center">
      <table width="680" cellpadding="0" cellspacing="0" style="background:#ffffff;overflow:hidden;">
        <tr>
          <td style="background:#102f5b;padding:32px 42px 28px;border-bottom:4px solid #c9922e;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="145" valign="middle" style="padding-right:20px;">
                  <img src="${logoUrl}" alt="Future Foundations Education" width="126" height="126" style="display:block;width:126px;height:126px;border:0;">
                </td>
                <td valign="middle" style="text-align:right;">
                  <p style="margin:0;color:#ffffff;font-size:20px;line-height:1.35;font-weight:600;">Future Foundations<br>Education</p>
                  <p style="margin:12px 0 0;color:#e2b242;font-size:17px;line-height:1.35;font-style:italic;">${qualityLine}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:42px 54px 34px;color:#132d59;">
            <p style="margin:0 0 22px;font-size:23px;line-height:1.35;font-weight:700;">${greeting}</p>
            <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:39px;line-height:1.15;font-weight:700;color:#102f5b;">${heading}</h1>
            <p style="margin:0 0 22px;font-size:19px;line-height:1.75;color:#17366a;">${messageLead}</p>
            <p style="margin:0 0 22px;font-size:19px;line-height:1.75;color:#17366a;">${messageAction}</p>
            <p style="margin:0 0 30px;font-size:19px;line-height:1.7;color:#17366a;">${messageClosing}</p>
            <p style="margin:0 0 22px;font-size:17px;line-height:1.6;color:#17366a;">${signOff}</p>
            <table cellpadding="0" cellspacing="0" style="margin:0 0 34px;">
              <tr>
                <td style="border-left:4px solid #c9922e;padding:0 0 0 20px;">
                  <p style="margin:0 0 4px;font-family:cursive;font-size:31px;line-height:1.1;font-style:italic;color:#102f5b;">Marinette Rodr&iacute;guez</p>
                  <p style="margin:0 0 3px;font-size:18px;line-height:1.4;font-weight:700;color:#c27f15;">${title}</p>
                  <p style="margin:0 0 9px;font-size:17px;line-height:1.4;font-weight:700;color:#102f5b;">Future Foundations Education</p>
                  <p style="margin:0 0 4px;font-size:16px;color:#17366a;">(407) 301-9979</p>
                  <p style="margin:0 0 4px;font-size:16px;color:#17366a;">futurefoundations.edu@gmail.com</p>
                  <p style="margin:0;font-size:16px;color:#17366a;">futurefoundationsedu.com</p>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#e8f3fc;border-radius:13px;">
              <tr>
                <td width="70" valign="middle" style="padding:18px 14px 18px 22px;text-align:center;">
                  <span style="display:inline-block;width:34px;height:34px;border:3px solid #17366a;border-radius:50%;font-family:Georgia,serif;font-size:25px;line-height:34px;font-weight:700;color:#17366a;">i</span>
                </td>
                <td valign="middle" style="padding:18px 24px 18px 0;font-size:15px;line-height:1.6;color:#17366a;">${privacyNotice}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#102f5b;padding:24px 40px 20px;border-top:3px solid #c9922e;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                ${footerFeatures.map((feature: string, index: number) => `
                <td width="33%" valign="top" style="padding:0 10px;text-align:center;${index > 0 ? "border-left:1px solid #557093;" : ""}">
                  <p style="margin:0 0 8px;color:#e2b242;font-size:25px;line-height:1;">${["◫", "★", "♡"][index]}</p>
                  <p style="margin:0;white-space:pre-line;color:#ffffff;font-size:14px;line-height:1.45;">${feature}</p>
                </td>`).join("")}
              </tr>
            </table>
            <div style="height:2px;background:#c9922e;margin:22px 0 14px;"></div>
            <p style="margin:0;text-align:center;color:#e2b242;font-size:14px;line-height:1.7;letter-spacing:.18em;font-weight:700;">FUTURE FOUNDATIONS EDUCATION</p>
            <p style="margin:4px 0 0;text-align:center;color:#ffffff;font-size:11px;letter-spacing:.3em;">BUILDING BRIGHTER FUTURES</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    isSpanish ? `Hola ${name},` : `Hello ${name},`,
    "", heading, "", messageLead, "", messageAction, "", messageClosing,
    "", signOff, "", "Marinette Rodríguez", title, "Future Foundations Education",
    "", "(407) 301-9979", "futurefoundations.edu@gmail.com", "https://futurefoundationsedu.com",
    "", privacyNotice, "", ...footerFeatures.map((feature) => feature.replace(/\n/g, " ")),
    "", "FUTURE FOUNDATIONS EDUCATION", "BUILDING BRIGHTER FUTURES",
  ].join("\n");

  return {
    subject: isSpanish
      ? "Hemos recibido su consulta | Future Foundations Education"
      : "We've received your inquiry | Future Foundations Education",
    html,
    text,
  };
}
