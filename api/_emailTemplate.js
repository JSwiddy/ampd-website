// Shared branded email template for all AMPD emails.
// Mirrors ampd-backend/utils/emailTemplate.js — keep in sync when design changes.
// Underscore prefix keeps Vercel from routing this as an endpoint.

const AMPD_LOGO_URL = "https://res.cloudinary.com/dhzjg43qc/image/upload/v1759867289/branding/swiderekfamily/logo/pjrvw86bdrcji4lhyoiq.png";

export function buildAMPDEmail({
  orgName,
  orgLogo,
  accentColor = "#00D4FF",
  roleLabel,
  headline,
  subtext,
  features = [],
  ctaText = "Accept Invite",
  ctaUrl,
  expiryText = "This invite expires in 7 days.",
  ampdLogoUrl = AMPD_LOGO_URL,
}) {
  const featureRows = features.map(f => `
              <tr>
                <td style="padding:8px 0;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:24px;vertical-align:top;padding-top:2px;">
                        <span style="color:${accentColor};font-size:16px;font-weight:700;">&#10003;</span>
                      </td>
                      <td style="font-size:15px;color:#1a1a1a;line-height:1.4;">${f}</td>
                    </tr>
                  </table>
                </td>
              </tr>`).join("");

  const logoBlock = orgLogo
    ? `<img src="${orgLogo}" height="160" style="border-radius:8px;display:block;margin:0 auto 16px;" />`
    : `<div style="width:80px;height:80px;border-radius:12px;background:${accentColor};display:inline-block;line-height:80px;text-align:center;font-size:36px;font-weight:800;color:#000;margin-bottom:16px;">${(orgName || "A")[0].toUpperCase()}</div>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${headline}</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="padding:40px 32px 24px;text-align:center;border-bottom:1px solid #f0f0f0;">
              ${logoBlock}
              <div style="font-size:20px;font-weight:700;color:#1a1a1a;">${orgName || "AMPD"}</div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 32px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:${accentColor};text-transform:uppercase;letter-spacing:0.1em;text-align:center;">${roleLabel}</p>
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#1a1a1a;line-height:1.2;text-align:center;">${headline}</h1>
              <p style="margin:0 0 32px;font-size:15px;color:#666666;line-height:1.6;text-align:center;">${subtext}</p>
${features.length > 0 ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border:1px solid #eeeeee;border-radius:12px;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">${featureRows}
                    </table>
                  </td>
                </tr>
              </table>` : ""}
              <div style="text-align:center;margin-bottom:16px;">
                <a href="${ctaUrl}" style="display:inline-block;padding:16px 40px;background:${accentColor};color:#000000;font-size:16px;font-weight:700;text-decoration:none;border-radius:12px;min-width:240px;text-align:center;">${ctaText}</a>
              </div>
${expiryText ? `
              <p style="margin:0;font-size:13px;color:#999999;text-align:center;">${expiryText}</p>` : ""}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 32px;text-align:center;border-top:1px solid #f0f0f0;background:#fafafa;">
              <img src="${ampdLogoUrl}" height="28" style="display:block;margin:0 auto 12px;" />
              <p style="margin:0;font-size:12px;color:#bbbbbb;">
                <a href="https://liveampd.com/privacy-policy.html" style="color:#bbbbbb;text-decoration:none;">Privacy Policy</a>
                &nbsp;|&nbsp;
                <a href="https://liveampd.com/terms.html" style="color:#bbbbbb;text-decoration:none;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
