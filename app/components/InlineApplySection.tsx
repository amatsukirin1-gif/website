"use client";

import { useState } from "react";
import { Send, Copy, Check, Mail, ExternalLink, FileText, Upload } from "lucide-react";
import { RECRUITMENT_EMAIL, buildApplicationSubject, buildApplicationBody, getWebmailUrls } from "../lib/apply-helpers";

export function InlineApplySection() {
  const [fields, setFields] = useState({ name: "", phone: "", email: "", position: "IT Support", message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subject = buildApplicationSubject(fields.position || "IT Support", fields.name);
  const body = buildApplicationBody({ position: fields.position || "IT Support", name: fields.name, phone: fields.phone, email: fields.email, message: fields.message });
  const webmail = getWebmailUrls({ to: RECRUITMENT_EMAIL, subject, body });

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(RECRUITMENT_EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (fields.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email";
    if (fields.phone && !/^[\d+\-()\s]{7,20}$/.test(fields.phone)) e.phone = "Check phone number";
    if (!fields.position) e.position = "Select position";
    if (resume && resume.size > 5*1024*1024) e.resume = "Max 5MB";
    return e;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus("loading"); setServerError(null);
    try {
      const fd = new FormData();
      fd.append("name", fields.name);
      fd.append("phone", fields.phone);
      fd.append("email", fields.email);
      fd.append("position", fields.position);
      fd.append("message", fields.message || `I would like to apply for the ${fields.position} position. I have attached my resume and other requirements.`);
      if (resume) fd.append("resume", resume);
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Submission failed");
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Error — try email options on the right.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"><Check className="w-8 h-8" /></div>
        <h3 className="text-xl font-bold">Application received!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Thanks {fields.name || "there"} — we’ll reply to <span className="font-medium">{fields.email}</span> within 1–2 business days.</p>
        <button onClick={() => { setStatus("idle"); setFields({ name:"", phone:"", email:"", position:"IT Support", message:""}); setResume(null); }} className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">Send another</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Browser Form */}
      <form onSubmit={onSubmit} noValidate className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-7 border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full">RECOMMENDED</span>
          <h3 className="font-bold text-lg">Quick Apply — Browser Only</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">Works without Gmail/Outlook app. Attachments send automatically.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inline-name" className="block text-sm font-medium mb-1.5">Name <span className="text-red-500">*</span></label>
            <input id="inline-name" value={fields.name} onChange={e=>setFields(s=>({...s,name:e.target.value}))} placeholder="Jane Doe" autoComplete="name" className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm ${errors.name?"border-red-500":"border-gray-300 dark:border-gray-600"}`} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="inline-phone" className="block text-sm font-medium mb-1.5">Phone</label>
            <input id="inline-phone" value={fields.phone} onChange={e=>setFields(s=>({...s,phone:e.target.value}))} placeholder="+1 555..." autoComplete="tel" className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm ${errors.phone?"border-red-500":"border-gray-300 dark:border-gray-600"}`} />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="inline-email" className="block text-sm font-medium mb-1.5">Email <span className="text-red-500">*</span></label>
          <input id="inline-email" type="email" value={fields.email} onChange={e=>setFields(s=>({...s,email:e.target.value}))} placeholder="jane@example.com" autoComplete="email" className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm ${errors.email?"border-red-500":"border-gray-300 dark:border-gray-600"}`} />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="inline-position" className="block text-sm font-medium mb-1.5">Position</label>
          <select id="inline-position" value={fields.position} onChange={e=>setFields(s=>({...s,position:e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm">
            <option>IT Support</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>UI/UX Designer</option>
            <option>Project Manager</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="inline-message" className="block text-sm font-medium mb-1.5">Message</label>
          <textarea id="inline-message" rows={3} value={fields.message} onChange={e=>setFields(s=>({...s,message:e.target.value}))} placeholder="I would like to apply for the IT Support position..." className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" />
        </div>
        <div>
          <label htmlFor="inline-resume" className="block text-sm font-medium mb-1.5">Resume (PDF/DOC/DOCX, 5MB)</label>
          <label htmlFor="inline-resume" className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer ${resume?"border-blue-400 bg-blue-50 dark:bg-blue-900/20":"border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
            {resume ? <FileText className="w-5 h-5 text-blue-600 shrink-0" /> : <Upload className="w-5 h-5 text-gray-500 shrink-0" />}
            <span className="text-sm truncate flex-1">{resume? `${resume.name} (${(resume.size/1024).toFixed(0)}KB)` : "Click to upload"}</span>
            {resume && <button type="button" onClick={e=>{e.preventDefault(); setResume(null);}} className="text-xs text-red-600 hover:underline">Remove</button>}
          </label>
          <input id="inline-resume" type="file" accept=".pdf,.doc,.docx" onChange={e=>setResume(e.target.files?.[0]||null)} className="sr-only" />
          {errors.resume && <p className="text-xs text-red-600 mt-1">{errors.resume}</p>}
        </div>
        {serverError && <p role="alert" className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">{serverError}</p>}
        <button type="submit" disabled={status==="loading"} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 flex items-center justify-center gap-2 shadow-md">
          {status==="loading"? "Sending..." : <><Send className="w-4 h-4"/> Send Application</>}
        </button>
        <p className="text-xs text-center text-gray-500">Secure · No email app needed · Reply within 1–2 days</p>
      </form>

      {/* Webmail Alternatives */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold flex items-center gap-2"><Mail className="w-5 h-5" /> Prefer your own email?</h3>
          <p className="text-sm text-gray-300 mt-2">We also support one-click webmail. Subject & body are pre-filled — just attach your resume.</p>
          <div className="mt-4 space-y-2.5">
            <a href={webmail.gmail} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium">
              <span className="flex items-center gap-2"><span className="w-7 h-7 bg-red-500 text-white rounded-full grid place-items-center text-xs font-bold">G</span> Open in Gmail</span><ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
            <a href={webmail.outlookLive} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-[#0078d4] text-white rounded-xl hover:bg-[#106ebe] transition-colors text-sm font-medium">
              <span className="flex items-center gap-2"><span className="w-7 h-7 bg-white text-[#0078d4] rounded-full grid place-items-center text-xs font-bold">O</span> Open in Outlook.com</span><ExternalLink className="w-4 h-4 text-white/70" />
            </a>
            <a href={webmail.yahoo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-[#6001d2] text-white rounded-xl hover:bg-[#4d01a8] transition-colors text-sm font-medium">
              <span className="flex items-center gap-2"><span className="w-7 h-7 bg-white text-[#6001d2] rounded-full grid place-items-center text-xs font-bold">Y!</span> Open in Yahoo Mail</span><ExternalLink className="w-4 h-4 text-white/70" />
            </a>
            <a href={webmail.mailto} className="flex items-center justify-between px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/15 transition-colors text-sm font-medium">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4"/> Try desktop mail app (mailto:)</span><ExternalLink className="w-4 h-4 text-white/70" />
            </a>
          </div>
          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono break-all">{RECRUITMENT_EMAIL}</span>
              <button onClick={copyEmail} className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-white text-gray-900 rounded-full text-xs font-medium hover:bg-gray-100">
                {copied ? <Check className="w-3.5 h-3.5 text-green-600"/> : <Copy className="w-3.5 h-3.5"/>} {copied? "Copied":"Copy"}
              </button>
            </div>
            <p className="text-xs text-gray-300 mt-2">Subject: <span className="text-white font-medium">{subject}</span></p>
          </div>
          <p className="text-xs text-gray-400 mt-3">After webmail opens, attach resume via the paperclip icon. The browser form above attaches automatically — that’s why it’s better.</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <h4 className="font-semibold text-sm text-amber-800 dark:text-amber-300">Why not just mailto: ?</h4>
          <div className="mt-3 flex items-start gap-3 text-sm">
            <div className="flex-1">
              <p className="font-mono text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded px-2 py-1.5">Apply Now → mailto:recruitment@company.com → Gmail/Outlook/Mail app → SEND</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">✕ Fails if no app is configured — applicant stuck.</p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-3 text-sm">
            <div className="flex-1">
              <p className="font-mono text-xs bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded px-2 py-1.5">Apply Now → Browser form / Gmail web / Outlook web → SEND</p>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">✓ Works for everyone — browser only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
