import React from 'react';
import { HelpdeskTicket } from '../types/helpdesk';
import { 
  X, 
  Clock, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  Printer, 
  Wrench,
  Calendar,
  Layers
} from 'lucide-react';

interface TicketDetailModalProps {
  ticket: HelpdeskTicket;
  onClose: () => void;
  onOpenVerification: () => void;
  onOpenTechnicianAction: () => void;
  onPrintSlip: () => void;
  activeRole: 'pengadu' | 'juruteknik' | 'pentadbir';
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  onClose,
  onOpenVerification,
  onOpenTechnicianAction,
  onPrintSlip,
  activeRole
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm bg-slate-800 text-emerald-400 px-2.5 py-1 rounded border border-slate-700">
              {ticket.id}
            </span>
            <div>
              <h3 className="text-xs font-bold text-slate-100">
                Kronologi & Maklumat Terperinci Tiket Aduan DVS
              </h3>
              <p className="text-[11px] text-slate-400">
                Saluran Asal: {ticket.channelOrigin} • Didaftarkan: {ticket.createdAt}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6 text-xs">
          {/* Main Title & Status bar */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-xs px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {ticket.category}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-rose-700">
                  {ticket.priority}
                </span>
                <span className="text-slate-300">|</span>
                <span className="font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Status: {ticket.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <h2 className="text-base font-bold text-slate-900">
              {ticket.title}
            </h2>
          </div>

          {/* Description */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1.5">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] block">
              Huraian Aduan & Mesej Ralat:
            </span>
            <p className="text-slate-800 whitespace-pre-line leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Reporter & Technical Assignment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reporter Box */}
            <div className="border border-slate-200 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                <User className="w-4 h-4 text-emerald-700" />
                <span>Maklumat Pegawai Pelapor</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>
                  <span className="text-slate-400">Nama:</span> <strong className="text-slate-800">{ticket.reportedBy.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400">ID / Staf:</span> {ticket.reportedBy.staffId}
                </div>
                <div>
                  <span className="text-slate-400">Cawangan:</span> {ticket.reportedBy.branch}
                </div>
                <div>
                  <span className="text-slate-400">Bahagian:</span> {ticket.reportedBy.department}
                </div>
                <div>
                  <span className="text-slate-400">Emel:</span> {ticket.reportedBy.email}
                </div>
                <div>
                  <span className="text-slate-400">Telefon:</span> {ticket.reportedBy.phone}
                </div>
              </div>
            </div>

            {/* SLA & Assignment Box */}
            <div className="border border-slate-200 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>Tugasan & Perjanjian SLA</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>
                  <span className="text-slate-400">Juruteknik:</span>{' '}
                  <strong className="text-slate-800">{ticket.assignedTo?.name || 'Menunggu Penugasan'}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Peringkat:</span> {ticket.assignedTo?.tier || 'Tier 1'}
                </div>
                <div>
                  <span className="text-slate-400">Hubungan Teknikal:</span> {ticket.assignedTo?.phone || '03-8870 2500'}
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <span className="text-slate-400">SLA Respons:</span>{' '}
                  <span className="font-mono text-slate-800">{ticket.slaDeadline}</span>
                </div>
                <div>
                  <span className="text-slate-400">SLA Resolusi:</span>{' '}
                  <span className="font-mono font-semibold text-rose-700">{ticket.slaResolutionDeadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Root Cause & Resolution if available */}
          {(ticket.rootCauseAnalysis || ticket.resolutionSummary) && (
            <div className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Analisis & Tindakan Pembaikan Juruteknik</span>
              </div>

              {ticket.rootCauseAnalysis && (
                <div>
                  <span className="text-slate-500 font-semibold block text-[11px]">
                    Punca Sebenar Masalah (Root Cause Analysis - RCA):
                  </span>
                  <p className="text-slate-800 bg-white p-2.5 rounded border border-emerald-100 mt-1">
                    {ticket.rootCauseAnalysis}
                  </p>
                </div>
              )}

              {ticket.resolutionSummary && (
                <div>
                  <span className="text-slate-500 font-semibold block text-[11px]">
                    Tindakan Pembetulan Dilaksanakan:
                  </span>
                  <p className="text-slate-800 bg-white p-2.5 rounded border border-emerald-100 mt-1">
                    {ticket.resolutionSummary}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Verification sign-off details if verified */}
          {ticket.verification?.isIssueResolved && (
            <div className="border border-emerald-300 bg-emerald-50 p-4 rounded-lg space-y-2 text-emerald-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Pengesahan Selesai Rasmi oleh Pegawai DVS</span>
                </div>
                {ticket.verification.rating && (
                  <span className="font-bold text-amber-700 font-mono">
                    Penilaian CSAT: {ticket.verification.rating} / 5 Bintang
                  </span>
                )}
              </div>
              <p className="text-slate-700 italic bg-white/80 p-2.5 rounded border border-emerald-200">
                "{ticket.verification.userComments}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-emerald-900 pt-1 font-mono">
                <span>Disahkan oleh: {ticket.verification.verifiedBy} ({ticket.verification.verifiedRole})</span>
                <span>Tarikh & Masa: {ticket.verification.verifiedAt}</span>
              </div>
            </div>
          )}

          {/* Chronological Audit Log */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Garis Masa & Rekod Jejak Audit (Audit Trail Log)</span>
            </h4>

            <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 bg-slate-50/50">
              {ticket.logs.map((log) => (
                <div key={log.id} className="p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-800">{log.author}</strong>
                      <span className="text-slate-400">({log.role})</span>
                    </div>
                    <span className="font-mono tabular-nums">{log.timestamp}</span>
                  </div>
                  <div className="font-semibold text-slate-900">
                    {log.action}
                  </div>
                  {log.comment && (
                    <p className="text-slate-600 bg-white p-2 rounded border border-slate-100 mt-1">
                      {log.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons in Modal */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrintSlip}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Cetak Slip Aduan Rasmi</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {ticket.status === 'MENUNGGU_PENGESAHAN' && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenVerification();
                  }}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Sahkan Masalah Ini</span>
                </button>
              )}

              {(activeRole === 'juruteknik' || activeRole === 'pentadbir') && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTechnicianAction();
                  }}
                  className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Kemas Kini Tindakan Teknikal</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
