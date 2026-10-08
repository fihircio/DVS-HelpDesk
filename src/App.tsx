import React, { useState, useEffect } from 'react';
import { HelpdeskTicket, TicketStatus, TicketPriority } from './types/helpdesk';
import { INITIAL_TICKETS } from './data/mockTickets';
import { Header } from './components/Header';
import { TicketList } from './components/TicketList';
import { ReportProblemForm } from './components/ReportProblemForm';
import { ChannelDirectory } from './components/ChannelDirectory';
import { WorkflowAndSlaGuide } from './components/WorkflowAndSlaGuide';
import { TicketDetailModal } from './components/TicketDetailModal';
import { VerificationModal } from './components/VerificationModal';
import { TechnicianActionModal } from './components/TechnicianActionModal';
import { OfficialPrintSlip } from './components/OfficialPrintSlip';

import heroBanner from './assets/images/dvs_helpdesk_hero_1791390207620.jpg';
import { 
  Headphones, 
  FileCheck2, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  PlusCircle, 
  Globe, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

const STORAGE_KEY = 'dvs_helpdesk_tickets_v1';

export default function App() {
  // Load tickets from localStorage or fallback to INITIAL_TICKETS
  const [tickets, setTickets] = useState<HelpdeskTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved tickets:', e);
    }
    return INITIAL_TICKETS;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'papan-pemuka' | 'lapor-masalah' | 'saluran-operasi' | 'aliran-sla'>('papan-pemuka');

  // Active user simulation role: Pengadu, Juruteknik, Pentadbir
  const [activeRole, setActiveRole] = useState<'pengadu' | 'juruteknik' | 'pentadbir'>('pengadu');

  // Modals state
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<HelpdeskTicket | null>(null);
  const [ticketToVerify, setTicketToVerify] = useState<HelpdeskTicket | null>(null);
  const [ticketForTechAction, setTicketForTechAction] = useState<HelpdeskTicket | null>(null);
  const [ticketToPrint, setTicketToPrint] = useState<HelpdeskTicket | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync tickets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.warn('Failed to save tickets:', e);
    }
  }, [tickets]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Add new ticket
  const handleAddNewTicket = (newTicket: HelpdeskTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Tiket aduan ${newTicket.id} berjaya didaftarkan.`);
  };

  // Confirm verification (User / Pengadu flow)
  const handleConfirmVerification = (
    ticketId: string,
    isResolved: boolean,
    comments: string,
    rating: number,
    officerName: string
  ) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestampStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;

        const newStatus: TicketStatus = isResolved ? 'DISAHKAN_SELESAI' : 'SEDANG_TINDAKAN';
        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: timestampStr,
          author: officerName,
          role: 'Pegawai Pengesah DVS',
          action: isResolved 
            ? `Pengesahan Masalah Selesai Sepenuhnya (CSAT: ${rating}/5 ★)` 
            : 'Pertikaian: Masalah Masih Berlaku (Tiket Dibuka Semula)',
          comment: comments
        };

        return {
          ...t,
          status: newStatus,
          verification: {
            verifiedAt: timestampStr,
            verifiedBy: officerName,
            verifiedRole: 'Pegawai Veterinar DVS',
            isIssueResolved: isResolved,
            userComments: comments,
            rating: isResolved ? rating : undefined,
            digitalSignature: `DVS-DIGISIGN-${ticketId}-${Date.now().toString(36).toUpperCase()}`
          },
          logs: [...t.logs, newLog]
        };
      })
    );

    if (isResolved) {
      showToast(`Aduan ${ticketId} telah disahkan selesai dan tiket kini ditutup secara rasmi.`);
    } else {
      showToast(`Pertikaian bagi ${ticketId} telah direkodkan. Tiket dibuka semula kepada juruteknik.`);
    }
  };

  // Technician / Admin update action
  const handleTechnicianUpdate = (
    ticketId: string,
    newStatus: TicketStatus,
    rootCause: string,
    resolution: string,
    technicianName: string,
    tier: 'Tier 1 (Helpdesk Frontline)' | 'Tier 2 (Sokongan Teknikal DVS)' | 'Tier 3 (Penyebutharga Vendor Sistem)',
    logComment: string
  ) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestampStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;

        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: timestampStr,
          author: technicianName,
          role: tier,
          action: `Kemas Kini Status Teknikal -> ${newStatus.replace('_', ' ')}`,
          comment: logComment
        };

        return {
          ...t,
          status: newStatus,
          rootCauseAnalysis: rootCause,
          resolutionSummary: resolution,
          resolvedAt: newStatus === 'MENUNGGU_PENGESAHAN' || newStatus === 'DISAHKAN_SELESAI' ? timestampStr : t.resolvedAt,
          assignedTo: {
            name: technicianName,
            tier,
            phone: '03-8870 2500'
          },
          logs: [...t.logs, newLog]
        };
      })
    );

    showToast(`Tiket ${ticketId} telah dikemas kini ke status "${newStatus.replace('_', ' ')}".`);
  };

  // Bulk Status Update (Technicians & Admins)
  const handleBulkUpdateStatus = (
    ticketIds: string[],
    newStatus: TicketStatus
  ) => {
    if (ticketIds.length === 0) return;

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestampStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    setTickets((prev) =>
      prev.map((t) => {
        if (!ticketIds.includes(t.id)) return t;

        const isResolved = newStatus === 'DISAHKAN_SELESAI';
        const newLog = {
          id: `log-${Date.now()}-${t.id}`,
          timestamp: timestampStr,
          author: activeRole === 'juruteknik' ? 'Juruteknik Bertugas' : 'Pentadbir Sistem DVS',
          role: activeRole === 'juruteknik' ? 'Tier 2 (Sokongan DVS)' : 'Pentadbir DVS',
          action: `Tindakan Berkelompok (Bulk): Status Dikemas Kini -> ${newStatus.replace('_', ' ')}`,
          comment: `Status ${ticketIds.length} tiket diselaraskan serentak melalui tindakan berkelompok.`
        };

        return {
          ...t,
          status: newStatus,
          resolvedAt: isResolved ? timestampStr : t.resolvedAt,
          verification: isResolved ? {
            verifiedAt: timestampStr,
            verifiedBy: 'Pentadbir / Juruteknik DVS (Tindakan Berkelompok)',
            verifiedRole: 'Meja Bantuan ICT DVS',
            isIssueResolved: true,
            userComments: 'Tiket ditutup melalui tindakan berkelompok juruteknik.',
            rating: t.verification?.rating || 5,
            digitalSignature: `DVS-BULK-VERIFIED-${t.id}`
          } : t.verification,
          logs: [...t.logs, newLog]
        };
      })
    );

    showToast(`${ticketIds.length} tiket berjaya dikemas kini kepada status "${newStatus.replace('_', ' ')}".`);
  };

  // Bulk Priority Update (Technicians & Admins)
  const handleBulkUpdatePriority = (
    ticketIds: string[],
    newPriority: TicketPriority
  ) => {
    if (ticketIds.length === 0) return;

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestampStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const slaMap: Record<TicketPriority, string> = {
      KRITIKAL: '< 2 Jam',
      TINGGI: '< 4 Jam',
      SEDERHANA: '< 8 Jam',
      RENDAH: '< 24 Jam'
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (!ticketIds.includes(t.id)) return t;

        const newLog = {
          id: `log-${Date.now()}-${t.id}`,
          timestamp: timestampStr,
          author: activeRole === 'juruteknik' ? 'Juruteknik Bertugas' : 'Pentadbir Sistem DVS',
          role: activeRole === 'juruteknik' ? 'Tier 2 (Sokongan DVS)' : 'Pentadbir DVS',
          action: `Tindakan Berkelompok (Bulk): Keutamaan Ditukar -> ${newPriority}`,
          comment: `Pelarasan tahap keutamaan bagi ${ticketIds.length} tiket.`
        };

        return {
          ...t,
          priority: newPriority,
          slaResolutionDeadline: `${t.createdAt} (${slaMap[newPriority]} - Sasaran Baharu)`,
          logs: [...t.logs, newLog]
        };
      })
    );

    showToast(`Keutamaan ${ticketIds.length} tiket berjaya ditukar kepada "${newPriority}".`);
  };

  // Reset demo tickets
  const handleResetData = () => {
    if (confirm('Tetapkan semula data contoh HelpDesk DVS kepada asal?')) {
      setTickets(INITIAL_TICKETS);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Data tiket telah dikembalikan ke status piawai.');
    }
  };

  const pendingVerificationCount = tickets.filter(t => t.status === 'MENUNGGU_PENGESAHAN').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        pendingVerificationCount={pendingVerificationCount}
      />

      {/* Hero / Context Banner for DVS Helpdesk Service */}
      <section className="bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
          <img
            src={heroBanner}
            alt="Pusat Operasi HelpDesk Jabatan Perkhidmatan Veterinar Malaysia"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dokumen Sebut Harga & Spesifikasi Perkhidmatan HelpDesk DVS</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Pusat Khidmat Sokongan & Meja Bantuan ICT Veterinar
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Platform berpusat bagi pelaporan masalah, diagnostik teknikal, dan pengesahan penyelesaian masalah secara digital. Dilengkapi pelbagai saluran komunikasi rasmi DVS beserta jadual waktu operasi 24/7 mengikut piawaian SLA perolehan.
            </p>

            {/* Quick KPI Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-400">Pematuhan SLA:</span>
                <span className="font-bold text-white">99.2%</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Purata Masa Tindak Balas:</span>
                <span className="font-bold text-white">&lt; 8 Minit</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Skor CSAT Warga DVS:</span>
                <span className="font-bold text-amber-400">4.9 / 5.0 ★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="mb-4 bg-emerald-900 text-white p-3 rounded-lg shadow-md border border-emerald-700 flex items-center justify-between text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-emerald-200 hover:text-white text-xs underline ml-4"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Tab 1: Papan Pengurusan & Pengesahan Tiket */}
        {activeTab === 'papan-pemuka' && (
          <TicketList
            tickets={tickets}
            activeRole={activeRole}
            onSelectTicket={(ticket) => setSelectedTicketForDetail(ticket)}
            onVerifyTicket={(ticket) => setTicketToVerify(ticket)}
            onTechnicianAction={(ticket) => setTicketForTechAction(ticket)}
            onPrintSlip={(ticket) => setTicketToPrint(ticket)}
            onBulkUpdateStatus={handleBulkUpdateStatus}
            onBulkUpdatePriority={handleBulkUpdatePriority}
          />
        )}

        {/* Tab 2: Sistem Pelaporan Masalah */}
        {activeTab === 'lapor-masalah' && (
          <ReportProblemForm
            onSubmitTicket={(newTicket) => {
              handleAddNewTicket(newTicket);
            }}
            onCancel={() => setActiveTab('papan-pemuka')}
          />
        )}

        {/* Tab 3: Saluran Perhubungan DVS & Waktu Operasi */}
        {activeTab === 'saluran-operasi' && <ChannelDirectory />}

        {/* Tab 4: Aliran Kerja & Matriks SLA */}
        {activeTab === 'aliran-sla' && <WorkflowAndSlaGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-slate-800">
              Sistem Perkhidmatan HelpDesk Jabatan Perkhidmatan Veterinar (DVS) Malaysia
            </div>
            <p className="text-[11px] text-slate-500">
              Dibangunkan bagi memenuhi keperluan perkhidmatan Meja Bantuan, pengurusan dan pengesahan masalah, serta direktori saluran perhubungan DVS.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="text-[11px] text-slate-500 hover:text-slate-800 underline transition-colors"
            >
              Reset Data Contoh DVS
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-[11px] text-slate-400">
              Hak Cipta Terpelihara DVS 2026
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedTicketForDetail && (
        <TicketDetailModal
          ticket={selectedTicketForDetail}
          onClose={() => setSelectedTicketForDetail(null)}
          onOpenVerification={() => {
            setTicketToVerify(selectedTicketForDetail);
          }}
          onOpenTechnicianAction={() => {
            setTicketForTechAction(selectedTicketForDetail);
          }}
          onPrintSlip={() => {
            setTicketToPrint(selectedTicketForDetail);
          }}
          activeRole={activeRole}
        />
      )}

      {ticketToVerify && (
        <VerificationModal
          ticket={ticketToVerify}
          onClose={() => setTicketToVerify(null)}
          onConfirmVerification={handleConfirmVerification}
        />
      )}

      {ticketForTechAction && (
        <TechnicianActionModal
          ticket={ticketForTechAction}
          onClose={() => setTicketForTechAction(null)}
          onUpdateTicket={handleTechnicianUpdate}
        />
      )}

      {ticketToPrint && (
        <OfficialPrintSlip
          ticket={ticketToPrint}
          onClose={() => setTicketToPrint(null)}
        />
      )}
    </div>
  );
}
