"use client";
import { Clock, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useApplyModal } from "./ApplyProvider";

export function JobCard({ title, location, type, featured }: { title: string; location: string; type: string; featured?: boolean }) {
  const { open } = useApplyModal();
  return (
    <div className={`relative p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${featured ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent shadow-lg" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"}`}>
      {featured && <span className="absolute -top-3 left-6 bg-amber-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">FEATURED</span>}
      <h3 className={`text-lg font-bold ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>{title}</h3>
      <div className={`mt-2 flex flex-wrap gap-3 text-xs ${featured ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{location}</span>
        <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{type}</span>
        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Full-time</span>
      </div>
      <p className={`mt-3 text-sm leading-relaxed ${featured ? "text-blue-100" : "text-gray-600 dark:text-gray-300"}`}>{title === "IT Support" ? "Help our team and clients stay productive. Troubleshoot hardware/software, manage accounts, and keep systems secure." : "Join a collaborative team building products used by thousands."}</p>
      <button onClick={() => open(title)} className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${featured ? "bg-white text-blue-600 hover:bg-gray-100 focus-visible:ring-white focus-visible:ring-offset-blue-600" : "bg-gray-900 dark:bg-white dark:text-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-100 focus-visible:ring-blue-600"}`}>
        Apply Now <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
