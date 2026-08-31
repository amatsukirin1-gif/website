"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, ExternalLink, Copy, Check, Upload, Send, AlertCircle, FileText } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useApplyModal } from "./ApplyProvider";
import { RECRUITMENT_EMAIL, buildApplicationSubject, buildApplicationBody, getWebmailUrls } from "../lib/apply-helpers";

type Tab = "form" | "email";

export function ApplyModal() {
  const { isOpen, close, position } = useApplyModal();
  const [tab, setTab] = useState<Tab>("form");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Form state
  const [fields, setFields] = useState({ name: "", phone: "", email: "", position, message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- sync selected position into form
  useEffect(() => setFields((f) => ({ ...f, position })), [position]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // reset status when reopening
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset modal state on open
    setStatus("idle"); setServerError(null); setErrors({});
    // focus first input after animation
    const t = setTimeout(() => dialogRef.current?.querySelector<HTMLInputElement>("#apply-name")?.focus(), 100);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; clearTimeout(t); };
  }, [isOpen, close]);

  const subject = buildApplicationSubject(fields.position || "IT Support", fields.name);
  const body = buildApplicationBody({
    position: fields.position || "IT Support",
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    message: fields.message,
  });
  const webmail = getWebmailUrls({ to: RECRUITMENT_EMAIL, subject, body });

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(RECRUITMENT_EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* fallback */ }
  };

  const copyBody = async () => {
    try { await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (fields.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email";
    if (fields.phone && !/^[\d+\-()\s]{7,20}$/.test(fields.phone)) e.phone = "Check phone number";
    if (!fields.position.trim()) e.position = "Select a position";
    if (resume && resume.size > 5 * 1024 * 1024) e.resume = "File must be under 5MB";
    if (resume && resume.type && !["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(resume.type) && !resume.name.match(/\.(pdf|doc|docx)$/i)) e.resume = "PDF, DOC or DOCX only";
    return e;
  };

  async function handleSubmit(e: React.FormEvent) {
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
      setServerError(err instanceof Error ? err.message : "Something went wrong. Try email options below.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          aria-hidden={!isOpen}
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.97, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-title"
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="shrink-0 px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-start justify-between gap-4">
              <div>
                <h2 id="apply-title" className="text-xl sm:text-2xl font-bold">Apply Now</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No email app needed — apply right in your browser</p>
              </div>
              <button onClick={close} aria-label="Close apply dialog" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Tabs */}
            <div className="shrink-0 px-6 pt-4 flex gap-2 border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setTab("form")}
                aria-selected={tab === "form"}
                role="tab"
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${tab === "form" ? "border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
              >
                Quick Apply (Recommended)
              </button>
              <button
                onClick={() => setTab("email")}
                aria-selected={tab === "email"}
                role="tab"
                className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${tab === "email" ? "border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
              >
                Use Your Email
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {tab === "form" ? (
                <div className="p-6">
                  {status === "success" ? (
                    <div role="status" aria-live="polite" className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"><Check className="w-8 h-8" /></div>
                      <h3 className="text-xl font-bold">Application sent!</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto">Thank you, {fields.name || "there"}! We received your application for <span className="font-semibold">{fields.position}</span> and will reply within 1–2 business days to {fields.email}.</p>
                      <button onClick={close} className="mt-6 px-6 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full font-medium hover:opacity-90 transition-opacity">Close</button>
                      <p className="text-xs text-gray-500 mt-4">Need to send an extra file later? Email us at <a href={`mailto:${RECRUITMENT_EMAIL}`} className="underline">{RECRUITMENT_EMAIL}</a></p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2.5 flex gap-2 text-amber-800 dark:text-amber-300 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <p>Works on any device — no mail app required. Your resume is sent securely to <span className="font-mono font-medium">{RECRUITMENT_EMAIL}</span>.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="apply-name" className="block text-sm font-medium mb-1.5">Full Name <span className="text-red-500" aria-hidden="true">*</span></label>
                          <input id="apply-name" value={fields.name} onChange={(e) => setFields(s => ({ ...s, name: e.target.value }))} autoComplete="name" required placeholder="Jane Doe" className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} />
                          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="apply-phone" className="block text-sm font-medium mb-1.5">Phone</label>
                          <input id="apply-phone" value={fields.phone} onChange={(e) => setFields(s => ({ ...s, phone: e.target.value }))} autoComplete="tel" inputMode="tel" placeholder="+1 (555) 000-0000" className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm ${errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} />
                          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="apply-email" className="block text-sm font-medium mb-1.5">Email <span className="text-red-500" aria-hidden="true">*</span></label>
                        <input id="apply-email" type="email" value={fields.email} onChange={(e) => setFields(s => ({ ...s, email: e.target.value }))} autoComplete="email" inputMode="email" required placeholder="jane@example.com" className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} />
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="apply-position" className="block text-sm font-medium mb-1.5">Position <span className="text-red-500" aria-hidden="true">*</span></label>
                        <select id="apply-position" value={fields.position} onChange={(e) => setFields(s => ({ ...s, position: e.target.value }))} className={`w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm ${errors.position ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}>
                          <option>IT Support</option>
                          <option>Frontend Developer</option>
                          <option>Backend Developer</option>
                          <option>UI/UX Designer</option>
                          <option>Project Manager</option>
                          <option>Other</option>
                        </select>
                        {errors.position && <p className="text-xs text-red-600 mt-1">{errors.position}</p>}
                      </div>

                      <div>
                        <label htmlFor="apply-message" className="block text-sm font-medium mb-1.5">Cover letter / Message <span className="text-gray-400 text-xs">(optional)</span></label>
                        <textarea id="apply-message" rows={4} value={fields.message} onChange={(e) => setFields(s => ({ ...s, message: e.target.value }))} placeholder="I would like to apply for the IT Support position. I have attached my resume..." className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none" />
                      </div>

                      <div>
                        <label htmlFor="apply-resume" className="block text-sm font-medium mb-1.5">Resume / Requirements <span className="text-gray-400 text-xs">(PDF, DOC, DOCX — max 5MB)</span></label>
                        <label htmlFor="apply-resume" className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${resume ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                          {resume ? <FileText className="w-5 h-5 text-blue-600 shrink-0" /> : <Upload className="w-5 h-5 text-gray-500 shrink-0" />}
                          <span className="text-sm truncate flex-1 text-left">{resume ? `${resume.name} (${(resume.size/1024).toFixed(0)} KB)` : "Click to upload or drag and drop"}</span>
                          {resume && <button type="button" onClick={(e) => { e.preventDefault(); setResume(null); }} className="text-xs text-red-600 hover:underline shrink-0">Remove</button>}
                        </label>
                        <input id="apply-resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setResume(e.target.files?.[0] || null)} className="sr-only" />
                        {errors.resume && <p className="text-xs text-red-600 mt-1">{errors.resume}</p>}
                      </div>

                      {serverError && <p role="alert" className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">{serverError}</p>}
                      {status === "error" && !serverError && <p role="alert" className="text-sm text-red-600">Submission failed. Try the “Use Your Email” tab or email directly.</p>}

                      <button type="submit" disabled={status === "loading"} aria-busy={status === "loading"} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md">
                        {status === "loading" ? "Sending..." : <><Send className="w-4 h-4" /> Send Application</>}
                      </button>
                      <p className="text-xs text-center text-gray-500">By sending, you agree we may contact you about this role. No mail app needed.</p>
                      <p className="text-xs text-center"><button type="button" onClick={() => setTab("email")} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4">Prefer to use Gmail / Outlook instead? →</button></p>
                    </form>
                  )}
                </div>
              ) : (
                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold">Why mailto: fails</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">The old flow <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">mailto:recruitment@company.com</span> tries to open Gmail / Outlook / Apple Mail on the computer. If nothing is configured, nothing happens and the applicant is stuck. The fix below works for everyone.</p>
                  </div>

                  {/* Live preview */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h4 className="font-medium text-sm">Email preview (auto-filled from form)</h4>
                      <button onClick={copyBody} className="text-xs inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />} {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">To:</span> <span className="font-mono font-medium">{RECRUITMENT_EMAIL}</span> <button onClick={copyEmail} className="ml-2 text-xs px-2 py-1 bg-white dark:bg-gray-900 border rounded-full inline-flex items-center gap-1">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy email</button></p>
                      <p><span className="text-gray-500">Subject:</span> <span className="font-medium">{subject}</span></p>
                      <pre className="mt-2 whitespace-pre-wrap bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed font-sans">{body}</pre>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Fields update live — fill them in the “Quick Apply” tab or type directly here then choose a webmail below.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-3">Open directly in your webmail (no app needed)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a href={webmail.gmail} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                        <Mail className="w-4 h-4 text-red-500" /> Open in Gmail <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </a>
                      <a href={webmail.outlookLive} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        <Mail className="w-4 h-4 text-blue-600" /> Open in Outlook.com <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </a>
                      <a href={webmail.outlook365} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        <Mail className="w-4 h-4 text-blue-500" /> Open in Office 365 <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </a>
                      <a href={webmail.yahoo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        <Mail className="w-4 h-4 text-purple-600" /> Open in Yahoo Mail <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </a>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={webmail.mailto} className="text-xs px-3 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full inline-flex items-center gap-1.5 hover:opacity-90">Try mailto: (if you have an app) <ExternalLink className="w-3 h-3" /></a>
                      <button onClick={copyEmail} className="text-xs px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full inline-flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-700">{copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />} {copied ? "Copied!" : "Copy email to clipboard"}</button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Attachments: after the webmail opens, click <em>Attach</em> and add your resume. The browser form above attaches automatically — that’s why it’s recommended.</p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <button onClick={() => setTab("form")} className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">Back to Quick Apply</button>
                    <button onClick={close} className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">Close</button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer note */}
            <div className="shrink-0 px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 text-center">
              Direct email: <a href={`mailto:${RECRUITMENT_EMAIL}`} className="font-mono font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300">{RECRUITMENT_EMAIL}</a> · Subject convention: <span className="font-mono">Job Application - [Position]</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
