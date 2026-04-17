export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, organization, role, sportsCount, teamSize, phone, message, timeline } = req.body;

    if (!firstName || !lastName || !email || !organization || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const name = `${firstName} ${lastName}`.trim();

    const emailHtml = `
      <h2>New Demo Request</h2>
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
        <li><strong>Role:</strong> ${role}</li>
      </ul>
      <h3>Program Details</h3>
      <ul>
        <li><strong>School:</strong> ${organization}</li>
        ${sportsCount ? `<li><strong>Number of Sports:</strong> ${sportsCount}</li>` : ''}
        ${teamSize ? `<li><strong>Total Athletes:</strong> ${teamSize}</li>` : ''}
        ${timeline ? `<li><strong>Timeline:</strong> ${timeline}</li>` : ''}
      </ul>
      ${message ? `<h3>Message</h3><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><small>Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</small></p>
    `;

    const emailText = `
New Demo Request

Contact Information:
- Name: ${name}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}
- Role: ${role}

Program Details:
- School: ${organization}
${sportsCount ? `- Number of Sports: ${sportsCount}` : ''}
${teamSize ? `- Total Athletes: ${teamSize}` : ''}
${timeline ? `- Timeline: ${timeline}` : ''}

${message ? `Message:\n${message}` : ''}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
    `;

    // Send notification email to you
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY
      },
      body: JSON.stringify({
        From: process.env.POSTMARK_FROM_EMAIL,
        To: process.env.POSTMARK_TO_EMAIL,
        Subject: `New Demo Request - ${organization}`,
        HtmlBody: emailHtml,
        TextBody: emailText,
        MessageStream: 'outbound',
        ReplyTo: email
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Postmark error:', error);
      throw new Error('Failed to send email');
    }

    const result = await response.json();

    // Send confirmation email to user
    await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY
      },
      body: JSON.stringify({
        From: process.env.POSTMARK_FROM_EMAIL,
        To: email,
        Subject: `Your AMPD walkthrough, ${firstName}`,
        HtmlBody: `
          <p>Hi ${firstName},</p>
          <p>Thanks for your interest in AMPD for <strong>${organization}</strong>.</p>
          <p>If you haven't already grabbed a time, book your 30 minute walkthrough here:</p>
          <p><a href="https://cal.com/get-ampd-up/30min" style="display:inline-block; padding:12px 24px; background:#0f172a; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600;">Book Your Walkthrough</a></p>
          <p>On the call we'll show you AMPD configured for a program like yours. No generic slide decks.</p>
          <p>Talk soon,<br>John Swiderek<br>Founder &amp; CEO, AMPD</p>
        `,
        TextBody: `Hi ${firstName},

Thanks for your interest in AMPD for ${organization}.

If you haven't already grabbed a time, book your 30 minute walkthrough here:
https://cal.com/get-ampd-up/30min

On the call we'll show you AMPD configured for a program like yours. No generic slide decks.

Talk soon,
John Swiderek
Founder & CEO, AMPD`,
        MessageStream: 'outbound'
      })
    });

    if (process.env.OUTREACH_WEBHOOK_URL && process.env.INBOUND_DEMO_SECRET) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        await fetch(process.env.OUTREACH_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.INBOUND_DEMO_SECRET
          },
          body: JSON.stringify({ firstName, lastName, email, organization, role, sportsCount, teamSize, phone }),
          signal: controller.signal
        });
        clearTimeout(timeout);
      } catch (e) {
        console.error('Outreach webhook failed (non-fatal):', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      messageId: result.MessageID
    });

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({ 
      error: 'Failed to process form submission',
      message: error.message 
    });
  }
}