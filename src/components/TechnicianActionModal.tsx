import React, { useState } from 'react';
import { HelpdeskTicket, TicketStatus } from '../types/helpdesk';
import { 
  Wrench, 
  X, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  Clock
} from 'lucide-react';

interface TechnicianActionModalProps {
  ticket: HelpdeskTicket;
  onClose: () => void;
  onUpdateTicket: (
    ticketId: string,
    newStatus: TicketStatus,
    rootCause: string,
    resolution: string,
    technicianName: string,
    tier: 'Tier 1 (Helpdesk Frontline)' | 'Tier 2 (Sokongan Teknikal DVS)' | 'Tier 3 (Penyebutharga Vendor Sistem)',
    logComment: string
  ) => void;
}

export const TechnicianActionModal: React.FC<TechnicianActionModalProps> = ({
  ticket,
  onClose,
  onUpdateTicket
}) => {
  const [newStatus, setNewStatus] = useState<TicketStatus>(
    ticket.status === 'BARU' ? 'SEDANG_TINDAKAN' : 'MENUNGGU_PENGESAHAN'
  );
  const [rootCause, setRootCause] = useState<string>(
    ticket.rootCauseAnalysis || 'Konfigurasi pelayan / pautan peranti terganggu akibat pemotongan bekalan kuasa sementara.'
  );
  const [resolution, setResolution] = useState<string>(
    ticket.resolutionSummary || 'Pemeriksaan kabel sambungan dan penetapan semula perisian telah selesai. Ujian fungsian menunjukkan status kembali normal.'
  );
  const [technicianName, setTechnicianName] = useState<string>(
    ticket.assignedTo?.name || 'Ir. Ahmad Zulkifli (Juruteknik Kanan Sistem)'
  );
  const [tier, setTier] = useState<'Tier 1 (Helpdesk Frontline)' | 'Tier 2 (Sokongan Teknikal DVS)' | 'Tier 3 (Penyebutharga Vendor Sistem)'>(
    ticket.assignedTo?.tier || 'Tier 2 (Sokongan Teknikal DVS)'
  );
  const [logComment, setLogComment] = useState<string>(
    'Kerja pembaikan teknikal selesai dan kini diserahkan untuk pengesahan pegawai DVS.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTicket(
      ticket.id,
      newStatus,
      rootCause,
      resolution,
      technicianName,
      tier,
      logComment
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        <div className="p-4 border-b border-slate-200 bg-blue-900 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <Wrench className="w-5 h-5 text-blue-300" />
            <div>
              <h3 className="text-sm font-bold">
                Kemas Kini Tindakan Teknikal & Saringan Meja Bantuan
              </h3>
              <p className="text-[11px] text-blue-200">
                Penyebutharga / Pasukan Sokongan ICT DVS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded hover:bg-blue-800 flex items-center justify-center text-blue-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Ticket Header */}
          <div className="bg-slate-50 p-3 rounded border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold text-slate-900">{ticket.id}</span>
              <p className="font-semibold text-slate-800 mt-0.5">{ticket.title}</p>
            </div>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded font-semibold text-slate-700">
              {ticket.priority}
            </span>
          </div>

          {/* Status Choice */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Status Aliran Seterusnya <span className="text-rose-500">*</span>
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as TicketStatus)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="SEDANG_TINDAKAN">Sedang Diambil Tindakan (Diagnostik Berjalan)</option>
              <option value="MENUNGGU_ALAT_GANTI">Menunggu Alat Ganti / Pihak Ketiga</option>
              <option value="MENUNGGU_PENGESAHAN">
                ★ Selesai Di Pihak Teknikal - Mohon PENGESAHAN Pengadu (DVS)
              </option>
              <option value="DISAHKAN_SELESAI">Disahkan Selesai (Tutup Rasmi)</option>
              <option value="DITOLAK">Ditolak / Batal</option>
            </select>
          </div>

          {/* Technician Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Nama Juruteknik Bertugas
              </label>
              <input
                type="text"
                required
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Peringkat Sokongan (Tier)
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded"
              >
                <option value="Tier 1 (Helpdesk Frontline)">Tier 1 (Helpdesk Frontline)</option>
                <option value="Tier 2 (Sokongan Teknikal DVS)">Tier 2 (Sokongan Teknikal DVS)</option>
                <option value="Tier 3 (Penyebutharga Vendor Sistem)">Tier 3 (Penyebutharga Vendor Sistem)</option>
              </select>
            </div>
          </div>

          {/* RCA (Root Cause Analysis) */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Punca Sebenar Masalah (Root Cause Analysis - RCA) <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              placeholder="Huraikan punca kegagalan atau ralat teknikal yang dikesan semasa diagnostik..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Resolution Summary */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Tindakan Pembetulan / Penyelesaian Yang Telah Dilakukan <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Catatkan langkah-langkah pembaikan, naik taraf atau penggantian komponen..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Work Log Note */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Catatan Garis Masa (Audit Trail Comment)
            </label>
            <input
              type="text"
              value={logComment}
              onChange={(e) => setLogComment(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded"
            />
          </div>

          {newStatus === 'MENUNGGU_PENGESAHAN' && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded text-amber-900 text-[11px] space-y-1">
              <strong>Nota Prosedur Pengesahan:</strong> Tiket akan dialihkan kepada status "MENUNGGU PENGESAHAN PENGADU". Pegawai pelapor Dr. / En. / Pn. {ticket.reportedBy.name} akan dihubungi bagi menguji keberkesanan penyelesaian sebelum tiket ditutup secara rasmi.
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-blue-700 hover:bg-blue-800 rounded shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simpan & Kemas Kini Tiket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
