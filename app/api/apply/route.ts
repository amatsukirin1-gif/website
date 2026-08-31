import { NextResponse } from "next/server";

// In production, connect to Resend / Nodemailer / S3 / DB here.
// For now we validate and return success so the UI works without an email client.

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const position = String(formData.get("position") || "IT Support").trim();
    const message = String(formData.get("message") || "").trim();
    const file = formData.get("resume") as File | null;

    // Validation
    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Valid email required";
    if (phone && !/^[\d+\-()\s]{7,20}$/.test(phone)) errors.phone = "Invalid phone number";
    if (!position) errors.position = "Position required";
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) errors.resume = "Resume must be under 5MB";
      if (file.type && !ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
        errors.resume = "Resume must be PDF, DOC, or DOCX";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 400));

    // Log for dev (in prod, send email via Resend/Nodemailer and/or save to DB)
    console.log("[APPLY] New application:", {
      name,
      phone,
      email,
      position,
      message: message.slice(0, 200),
      resume: file ? `${file.name} (${file.size} bytes, ${file.type})` : "no file",
      timestamp: new Date().toISOString(),
    });

    // Example real integration (commented):
    // await resend.emails.send({
    //   from: "careers@company.com",
    //   to: "recruitment@company.com",
    //   subject: `Job Application - ${position} - ${name}`,
    //   text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`,
    //   attachments: file ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }] : [],
    // });

    return NextResponse.json({ ok: true, message: "Application received" });
  } catch (err) {
    console.error("[APPLY] error", err);
    return NextResponse.json({ ok: false, error: "Server error. Please try again or use email." }, { status: 500 });
  }
}
