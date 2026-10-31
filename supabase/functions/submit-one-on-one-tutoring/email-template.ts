
import { buildConfirmationEmail } from '../submit-lead/email-template.ts';

export type Language = 'es' | 'en';

export const FFE_LOGO =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    c =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[c] ?? c,
  );
}

export function parentEmailHtml(
  parent: string,
  language: Language,
): string {
  const original = buildConfirmationEmail({
    parentName: parent,
    language,
    logoUrl: FFE_LOGO,
  });

  const spanish = language === 'es';

  const replacements: Array<[string, string]> = spanish
    ? [
        [
          '¡Gracias por contactarnos!',
          '¡Recibimos su solicitud de tutorías!',
        ],
        [
          'Hemos recibido su consulta y agradecemos su interés en Future Foundations Education.',
          'Hemos recibido su solicitud de tutorías individuales de lectura y matemáticas. Gracias por considerar Future Foundations Education.',
        ],
        [
          'Nuestro equipo revisará su mensaje y se pondrá en contacto con usted lo antes posible para hablar sobre cómo podemos apoyar el camino de aprendizaje de su hijo/a.',
          'Nuestro equipo revisará la información enviada y se comunicará con usted para conversar sobre las necesidades académicas de su hijo/a y los próximos pasos.',
        ],
        [
          '¡Esperamos comunicarnos con usted!',
          'La solicitud está sujeta a disponibilidad y revisión. No garantiza matrícula ni elegibilidad para fondos de beca.',
        ],
      ]
    : [
        [
          'Thank you for contacting us!',
          'We received your tutoring inquiry!',
        ],
        [
          'We have received your inquiry and appreciate your interest in Future Foundations Education.',
          'We received your inquiry about individualized reading and math tutoring. Thank you for considering Future Foundations Education.',
        ],
        [
          'Our team will review your message and contact you as soon as possible to discuss how we can support your child’s learning journey.',
          'Our team will review the information submitted and contact you to discuss your child’s academic needs and possible next steps.',
        ],
        [
          'We look forward to connecting with you!',
          'Your inquiry is subject to review and availability. It does not guarantee enrollment or scholarship eligibility.',
        ],
      ];

  let result = original.html;

  for (const [before, after] of replacements) {
    if (!result.includes(before)) {
      throw new Error(
        'Confirmation template changed; review branding replacements',
      );
    }

    result = result.replace(before, after);
  }

  return result;
}

export interface StaffField {
  label: string;
  value: string;
}

export interface StaffSection {
  title: string;
  fields: StaffField[];
}

export function staffEmailHtml(
  parent: string,
  sections: StaffSection[],
  email: string,
): string {
  const rows = sections
    .map(
      section => `
    <tr>
      <td style="padding:23px 30px 9px;color:#657086;font-size:11px;letter-spacing:1.2px;font-weight:bold;text-transform:uppercase;">
        ${escapeHtml(section.title)}
      </td>
    </tr>
    <tr>
      <td style="padding:0 30px 12px">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5eaf0">
          ${section.fields
            .map(
              field => `
            <tr>
              <td valign="top" width="38%" style="padding:10px 5px 10px 0;color:#68748a;font-size:13px;border-bottom:1px solid #edf0f4">
                ${escapeHtml(field.label)}
              </td>
              <td valign="top" style="padding:10px 0;color:#172c4e;font-size:13px;font-weight:600;border-bottom:1px solid #edf0f4;overflow-wrap:anywhere">
                ${escapeHtml(field.value || '—')}
              </td>
            </tr>`,
            )
            .join('')}
        </table>
      </td>
    </tr>`,
    )
    .join('');

  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    'Re: One-on-One Tutoring Inquiry — Future Foundations Education',
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="utf-8">
</head>
<body style="margin:0;padding:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;color:#172c4e">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7">
    <tr>
      <td align="center" style="padding:24px 12px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff">
          <tr>
            <td style="background:#102f5b;border-bottom:4px solid #c9922e;padding:24px 30px">
              <table width="100%">
                <tr>
                  <td width="90">
                    <img src="${FFE_LOGO}" alt="FFE logo" width="80" height="80" style="display:block;border:0">
                  </td>
                  <td style="color:#fff;font-size:19px;font-weight:bold;line-height:1.4;text-align:right">
                    Future Foundations<br>Education
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 30px 12px">
              <div style="font-size:11px;color:#c27f15;font-weight:bold;letter-spacing:1px">
                NEW ONE-ON-ONE TUTORING INQUIRY
              </div>
              <h1 style="font-size:24px;line-height:1.3;margin:12px 0 0;color:#102f5b">
                ${escapeHtml(parent)}
              </h1>
            </td>
          </tr>

          ${rows}

          <tr>
            <td style="padding:22px 30px 34px">
              <a href="${escapeHtml(mailto)}" style="display:inline-block;background:#c27f15;color:#fff;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 20px;border-radius:5px">
                Reply to ${escapeHtml(parent)}
              </a>
              <p style="font-size:11px;color:#7a8595">
                Replying opens an email addressed to the parent or guardian.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#102f5b;color:#fff;text-align:center;border-top:3px solid #c9922e;padding:19px;font-size:12px">
              FUTURE FOUNDATIONS EDUCATION · KISSIMMEE, FLORIDA
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
