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
        Subject: 'Thank you for your AMPD demo request',
        HtmlBody: `
          <h2>Thank you, ${firstName}!</h2>
          <p>We've received your demo request for <strong>${organization}</strong>.</p>
          <p>Our team will review your information and reach out within 24 hours to schedule your walkthrough.</p>
          <p>Best regards,<br>The AMPD Team</p>
        `,
        TextBody: `Thank you, ${firstName}!

We've received your demo request for ${organization}.

Our team will review your information and reach out within 24 hours to schedule your walkthrough.

Best regards,
The AMPD Team`,
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