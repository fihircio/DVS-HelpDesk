import React from 'react';
import { 
  Headphones, 
  ShieldCheck, 
  PlusCircle, 
  Globe, 
  Layers, 
  HelpCircle,
  FileCheck2,
  Clock
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'papan-pemuka' | 'lapor-masalah' | 'saluran-operasi' | 'aliran-sla';
  setActiveTab: (tab: 'papan-pemuka' | 'lapor-masalah' | 'saluran-operasi' | 'aliran-sla') => void;
  activeRole: 'pengadu' | 'juruteknik' | 'pentadbir';
  setActiveRole: (role: 'pengadu' | 'juruteknik' | 'pentadbir') => void;
  pendingVerificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  pendingVerificationCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner - Government & DVS Identity */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide">JABATAN PERKHIDMATAN VETERINAR (DVS)</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Kementerian Pertanian dan Keterjaminan Makanan Malaysia</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono tabular-nums">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-sans">Meja Bantuan Beroperasi:</span>
            <span className="font-semibold text-emerald-300">Hotline 1-800-88-DVSHD & WhatsApp Aktif</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Waktu Rasmi: 8:00 PG – 5:30 PTG</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-xs shrink-0 border border-emerald-700">
            <Headphones className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                Sistem Perkhidmatan HelpDesk DVS
              </h1>
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Sebut Harga ICT
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pelaporan, Pengurusan & Pengesahan Masalah Bersepadu
            </p>
          </div>
        </div>

        {/* Center / Navigation Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('papan-pemuka')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'papan-pemuka'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Papan Pengurusan & Pengesahan</span>
            {pendingVerificationCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300">
                {pendingVerificationCount} Pengesahan
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('lapor-masalah')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'lapor-masalah'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-200 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lapor Masalah Baharu</span>
          </button>

          <button
            onClick={() => setActiveTab('saluran-operasi')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'saluran-operasi'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Saluran & Waktu Operasi</span>
          </button>

          <button
            onClick={() => setActiveTab('aliran-sla')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'aliran-sla'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Aliran Kerja & Matriks SLA</span>
          </button>
        </div>

        {/* Right - Role Switcher (Simulation for Tender Evaluator) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden xl:block">
            <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Peranan Semasa
            </span>
            <span className="text-xs font-medium text-slate-700">
              {activeRole === 'pengadu' && 'Pegawai / Pengadu DVS'}
              {activeRole === 'juruteknik' && 'Juruteknik Helpdesk (Tier 1/2)'}
              {activeRole === 'pentadbir' && 'Penyelaras DVS (Admin)'}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md border border-slate-200">
            <button
              onClick={() => setActiveRole('pengadu')}
              title="Peranan Pengadu: Boleh lapor masalah dan buat pengesahan masalah yang diselesaikan"
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeRole === 'pengadu'
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pengadu
            </button>
            <button
              onClick={() => setActiveRole('juruteknik')}
              title="Peranan Juruteknik: Boleh diagnosis, selesaikan masalah dan kemukakan untuk pengesahan"
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeRole === 'juruteknik'
                  ? 'bg-blue-700 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Juruteknik
            </button>
            <button
              onClick={() => setActiveRole('pentadbir')}
              title="Peranan Pentadbir: Pantau prestasi SLA dan tadbir sistem"
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeRole === 'pentadbir'
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pentadbir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
