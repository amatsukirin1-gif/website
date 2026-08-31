export const RECRUITMENT_EMAIL = "recruitment@company.com";

export function buildApplicationSubject(position: string, applicantName?: string) {
  const base = `Job Application - ${position}`;
  return applicantName?.trim() ? `${base} - ${applicantName.trim()}` : base;
}

export function buildApplicationBody(opts: {
  position: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
}) {
  const { position, name, phone, email, message } = opts;
  const lines = [
    "Dear Recruitment Team,",
    "",
    `I would like to apply for the ${position} position.`,
    "",
    `Name: ${name || "[Your Name]"}`,
    `Phone: ${phone || "[Your Phone]"}`,
    `Email: ${email || "[Your Email]"}`,
    "",
    message?.trim() ? message.trim() : "I have attached my resume and other requirements.",
    "",
    "Thank you.",
    "",
    "--",
    "Sent via Company Website Apply Form",
  ];
  return lines.join("\n");
}

export function getWebmailUrls(opts: {
  to: string;
  subject: string;
  body: string;
}) {
  const enc = {
    to: encodeURIComponent(opts.to),
    subject: encodeURIComponent(opts.subject),
    body: encodeURIComponent(opts.body),
  };
  // Gmail: https://mail.google.com/mail/?view=cm&fs=1&to=...&su=...&body=...
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc.to}&su=${enc.subject}&body=${enc.body}`;
  // Outlook Live / Outlook.com
  const outlookLive = `https://outlook.live.com/mail/0/deeplink/compose?to=${enc.to}&subject=${enc.subject}&body=${enc.body}`;
  // Office 365
  const outlook365 = `https://outlook.office.com/mail/deeplink/compose?to=${enc.to}&subject=${enc.subject}&body=${enc.body}`;
  // Yahoo
  const yahoo = `https://compose.mail.yahoo.com/?to=${enc.to}&subject=${enc.subject}&body=${enc.body}`;
  // mailto fallback
  const mailto = `mailto:${opts.to}?subject=${enc.subject}&body=${enc.body}`;

  return { gmail, outlookLive, outlook365, yahoo, mailto };
}
