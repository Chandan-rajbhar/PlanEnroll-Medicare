import React from 'react';
import { useApp } from '../context/AppContext';
import { MEDICARE_DISCLAIMERS } from '../data/learningCenterData';
import { ShieldCheck, AlertCircle, FileText, ExternalLink, Phone } from 'lucide-react';

export const MedicareDisclaimersScreen: React.FC = () => {
  return (
    <div className="pb-10 p-4 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Compliance & Regulatory Notices
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-2">
          Medicare Disclaimers
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Required Third-Party Marketing Organization (TPMO) and CMS regulatory statements.
        </p>
      </div>

      {/* Disclaimers Cards */}
      <div className="space-y-3 text-xs leading-relaxed">
        {/* TPMO Disclaimer */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>CMS TPMO Required Disclaimer (42 CFR § 422.2267)</span>
          </div>
          <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            "{MEDICARE_DISCLAIMERS.cmsTPMO}"
          </p>
        </div>

        {/* Non-Government Disclosure */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Non-Government Affiliation Statement</span>
          </div>
          <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            {MEDICARE_DISCLAIMERS.nonGovernmentAffiliation}
          </p>
        </div>

        {/* Estimates & Accuracy Disclaimer */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Pricing & Benefit Estimates Notice</span>
          </div>
          <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            {MEDICARE_DISCLAIMERS.estimatesNotice}
          </p>
        </div>

        {/* Official Resources Contact Box */}
        <div className="bg-blue-50/70 rounded-3xl p-4 border border-blue-200 space-y-2 text-blue-950">
          <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900">
            Official Federal Medicare Inquiries
          </h4>
          <p className="text-[11px] text-blue-900">
            For official government information regarding all plans in your service area, please contact:
          </p>
          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-blue-100">
              <span className="font-semibold">Official Website:</span>
              <a href="https://www.medicare.gov" target="_blank" rel="noreferrer" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
                <span>Medicare.gov</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-blue-100">
              <span className="font-semibold">Telephone Hotline:</span>
              <a href="tel:18006334227" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>1-800-MEDICARE (TTY: 1-877-486-2048)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

