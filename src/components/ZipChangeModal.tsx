import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, CheckCircle2, X } from 'lucide-react';

export const ZipChangeModal: React.FC = () => {
  const { isZipModalOpen, setIsZipModalOpen, zipCode, setZipCode } = useApp();
  const [zipInput, setZipInput] = useState(zipCode);

  if (!isZipModalOpen) return null;

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length === 5) {
      setZipCode(zipInput.trim());
      setIsZipModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl max-w-[360px] w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setIsZipModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
          <MapPin className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">Change Your ZIP Code</h3>
        <p className="text-xs text-slate-500 mt-1">
          Medicare plan availability, premiums, and network providers depend directly on your home ZIP code and county.
        </p>

        <form onSubmit={handleZipSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              5-Digit ZIP Code
            </label>
            <input
              type="text"
              maxLength={5}
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 75080"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base font-semibold text-slate-800"
              autoFocus
            />
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 w-full">Popular sample ZIP codes:</span>
            {['75080 (Dallas)', '90001 (LA)', '33101 (Miami)', '10001 (NYC)', '60601 (Chicago)'].map((item) => {
              const z = item.split(' ')[0];
              return (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZipInput(z)}
                  className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                    zipInput === z 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsZipModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={zipInput.length !== 5}
              className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 disabled:opacity-50 shadow-md flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Update Area</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

