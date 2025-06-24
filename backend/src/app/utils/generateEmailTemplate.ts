export const generateEmailTemplate = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  note,
}: {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
  note?: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${title}</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #333333; margin: 0;">${title}</h2>
                ${
                  subtitle
                    ? `<p style="color: #666; font-size: 14px;">${subtitle}</p>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <a href="${buttonLink}" style="background-color: #0d6efd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  ${buttonText}
                </a>
              </td>
            </tr>
            ${
              note
                ? `<tr><td align="center"><p style="font-size: 13px; color: #888888;">${note}</p></td></tr>`
                : ""
            }
            <tr>
              <td style="padding-top: 30px; text-align: center; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} Hotel Management. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
