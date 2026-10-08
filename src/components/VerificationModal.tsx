import React, { useState } from 'react';
import { HelpdeskTicket } from '../types/helpdesk';
import { 
  FileCheck2, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  ShieldCheck, 
  Send,
  Building2,
  Clock
} from 'lucide-react';

interface VerificationModalProps {
  ticket: HelpdeskTicket;
  onClose: () => void;
  onConfirmVerification: (
    ticketId: string, 
    isResolved: boolean, 
    comments: string, 
    rating: number,
    officerName: string
  ) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  ticket,
  onClose,
  onConfirmVerification
}) => {
  const [isResolved, setIsResolved] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>(
    'Sistem telah diuji semula dan permit import dapat diluluskan tanpa ralat. Terima kasih atas tindakan segera.'
  );
  const [officerName, setOfficerName] = useState<string>(ticket.reportedBy.name);
  const [officerRole, setOfficerRole] = useState<string>('Pegawai Veterinar Pemeriksa');
  const [acknowledged, setAcknowledged] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledged) {
      alert('Sila tandakan pengakuan pengesahan.');
      return;
    }
    onConfirmVerification(ticket.id, isResolved, comments, rating, officerName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 bg-emerald-900 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <FileCheck2 className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-sm font-bold">
                Borang Pengesahan Masalah & Penutupan Tiket DVS
              </h3>
              <p className="text-[11px] text-emerald-200">
                Pengesahan Rasmi oleh Pegawai / Pengadu Jabatan Perkhidmatan Veterinar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded hover:bg-emerald-800 flex items-center justify-center text-emerald-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5 text-xs">
          {/* Ticket Reference Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-900 text-sm">
                {ticket.id}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[11px] border border-amber-300">
                Menunggu Pengesahan Pengadu
              </span>
            </div>

            <h4 className="font-bold text-slate-800 text-xs">
              {ticket.title}
            </h4>

            <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px] pt-1 border-t border-slate-200">
              <div>
                <span className="text-slate-400">Kategori:</span> {ticket.category}
              </div>
              <div>
                <span className="text-slate-400">Cawangan:</span> {ticket.reportedBy.branch}
              </div>
            </div>
          </div>

          {/* Root Cause & Resolution Provided by Tech Team */}
          <div className="space-y-3 bg-emerald-50/50 border border-emerald-200 rounded-lg p-3.5">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Tindakan Pembaikan Oleh Meja Bantuan / Juruteknik:</span>
            </div>

            {ticket.rootCauseAnalysis && (
              <div>
                <span className="text-slate-500 font-semibold block text-[11px]">
                  Punca Sebenar Masalah (Root Cause Analysis - RCA):
                </span>
                <p className="text-slate-800 mt-0.5 bg-white p-2 rounded border border-emerald-100">
                  {ticket.rootCauseAnalysis}
                </p>
              </div>
            )}

            {ticket.resolutionSummary && (
              <div>
                <span className="text-slate-500 font-semibold block text-[11px]">
                  Ringkasan Tindakan Pembetulan / Pemulihan:
                </span>
                <p className="text-slate-800 mt-0.5 bg-white p-2 rounded border border-emerald-100">
                  {ticket.resolutionSummary}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ditugaskan kepada: {ticket.assignedTo?.name || 'Pasukan Teknikal DVS'}</span>
            </div>
          </div>

          {/* Verification Decision */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-800">
              Keputusan Pengesahan Pengadu / Pegawai DVS <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setIsResolved(true)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isResolved
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="decision"
                    checked={isResolved}
                    onChange={() => setIsResolved(true)}
                    className="text-emerald-600"
                  />
                  <span className="font-bold text-xs">
                    Masalah Selesai Sepenuhnya
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 pl-5">
                  Sistem telah diuji dan berfungsi normal. Bersetuju untuk menutup tiket secara rasmi.
                </p>
              </div>

              <div
                onClick={() => setIsResolved(false)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  !isResolved
                    ? 'border-rose-600 bg-rose-50 text-rose-950 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="decision"
                    checked={!isResolved}
                    onChange={() => setIsResolved(false)}
                    className="text-rose-600"
                  />
                  <span className="font-bold text-xs">
                    Pertikai (Masalah Masih Berlaku)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 pl-5">
                  Ralat masih timbul. Buka semula tiket kepada juruteknik untuk tindakan susulan.
                </p>
              </div>
            </div>
          </div>

          {/* CSAT Rating */}
          {isResolved && (
            <div className="space-y-1.5 bg-slate-50 p-3 rounded border border-slate-200">
              <label className="block font-bold text-slate-800">
                Penilaian Kepuasan Perkhidmatan Meja Bantuan (CSAT 1-5 Bintang)
              </label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 transition-transform hover:scale-110 ${
                      rating >= star ? 'text-amber-500' : 'text-slate-300'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
                <span className="text-xs font-semibold text-slate-700 ml-2">
                  {rating === 5 && 'Sangat Memuaskan (5/5)'}
                  {rating === 4 && 'Memuaskan (4/5)'}
                  {rating === 3 && 'Sederhana (3/5)'}
                  {rating === 2 && 'Kurang Memuaskan (2/5)'}
                  {rating === 1 && 'Tidak Memuaskan (1/5)'}
                </span>
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              {isResolved ? 'Ulasan / Catatan Pengesahan' : 'Penerangan Masalah Yang Masih Berlaku'} <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Officer Details & Sign-off */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Nama Pegawai Pengesah
              </label>
              <input
                type="text"
                required
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Jawatan Pegawai
              </label>
              <input
                type="text"
                required
                value={officerRole}
                onChange={(e) => setOfficerRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded"
              />
            </div>
          </div>

          {/* Acknowledgement Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer bg-emerald-50/40 p-2.5 rounded border border-emerald-100">
            <input
              type="checkbox"
              required
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-0.5 text-emerald-600 rounded"
            />
            <span className="text-[11px] text-slate-700">
              Saya dengan ini mengesahkan bahawa ujian fungsian telah dijalankan secara bebas dan maklumat pengesahan ini adalah benar mengikut SOP HelpDesk DVS.
            </span>
          </label>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-5 py-2 font-bold text-white rounded shadow-xs flex items-center gap-1.5 transition-colors ${
                isResolved
                  ? 'bg-emerald-700 hover:bg-emerald-800'
                  : 'bg-rose-700 hover:bg-rose-800'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isResolved ? 'Sahkan & Tutup Tiket Rasmi' : 'Kemukakan Pertikaian (Buka Semula)'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
