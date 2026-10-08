import React from 'react';
import { HelpdeskTicket } from '../types/helpdesk';
import { Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface OfficialPrintSlipProps {
  ticket: HelpdeskTicket;
  onClose: () => void;
}

export const OfficialPrintSlip: React.FC<OfficialPrintSlipProps> = ({
  ticket,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        {/* Screen Toolbar (Hidden during print) */}
        <div className="p-3 bg-slate-900 text-white flex items-center justify-between no-print sticky top-0 z-10">
          <span className="text-xs font-semibold">
            Pratonton Cetakan Dokumen Rasmi DVS
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Printable Official Document */}
        <div className="p-8 space-y-6 text-slate-900 bg-white" id="official-slip-content">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
              KERAJAAN MALAYSIA
            </div>
            <h1 className="text-base font-extrabold text-slate-900 uppercase">
              JABATAN PERKHIDMATAN VETERINAR (DVS)
            </h1>
            <div className="text-xs font-semibold text-slate-700">
              BAHAGIAN PENGURUSAN MAKLUMAT (ICT) • MEJA BANTUAN BERSEPADU
            </div>
            <p className="text-[11px] text-slate-500">
              Wisma Tani, Blok 4G1, Presint 4, Pusat Pentadbiran Kerajaan Persekutuan, 62630 Putrajaya
            </p>
          </div>

          {/* Form Title & Barcode Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-tight text-slate-900">
                SLIP RASMI ADUAN & PENGESAHAN PENYELESAIAN MASALAH
              </h2>
              <span className="text-[11px] text-slate-500">
                Borang Rujukan Piawai Sebut Harga Perkhidmatan HelpDesk DVS
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">
                No. Rujukan Aduan
              </span>
              <span className="font-mono text-base font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                {ticket.id}
              </span>
            </div>
          </div>

          {/* Table 1: Reporter & Classification */}
          <div className="space-y-1 text-xs">
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-700 bg-slate-100 p-1.5 border border-slate-200">
              BAHAGIAN A: MAKLUMAT PENGADU & KLASIFIKASI ADUAN
            </div>
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold w-1/4">Nama Pengadu:</td>
                  <td className="p-2 border border-slate-300 w-1/4">{ticket.reportedBy.name}</td>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold w-1/4">ID Kakitangan:</td>
                  <td className="p-2 border border-slate-300 font-mono w-1/4">{ticket.reportedBy.staffId}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">Cawangan / Bahagian:</td>
                  <td className="p-2 border border-slate-300">{ticket.reportedBy.branch} - {ticket.reportedBy.department}</td>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">No. Telefon / Emel:</td>
                  <td className="p-2 border border-slate-300">{ticket.reportedBy.phone} ({ticket.reportedBy.email})</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">Kategori Sistem:</td>
                  <td className="p-2 border border-slate-300 font-semibold">{ticket.category}</td>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">Tahap Kritikaliti:</td>
                  <td className="p-2 border border-slate-300 font-bold font-mono">{ticket.priority}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">Tarikh & Masa Laporan:</td>
                  <td className="p-2 border border-slate-300 font-mono">{ticket.createdAt}</td>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold">Saluran Pendaftaran:</td>
                  <td className="p-2 border border-slate-300">{ticket.channelOrigin}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Problem Description */}
          <div className="space-y-1 text-xs">
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-700 bg-slate-100 p-1.5 border border-slate-200">
              BAHAGIAN B: KETERANGAN MASALAH
            </div>
            <div className="p-3 border border-slate-300 rounded space-y-1">
              <div className="font-bold text-slate-900">{ticket.title}</div>
              <p className="text-slate-700 whitespace-pre-line text-[11px] leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Table 3: Technical RCA & Resolution */}
          <div className="space-y-1 text-xs">
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-700 bg-slate-100 p-1.5 border border-slate-200">
              BAHAGIAN C: TINDAKAN TEKNIKAL & PUNCA MASALAH (RCA)
            </div>
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold w-1/4">Juruteknik Bertugas:</td>
                  <td className="p-2 border border-slate-300 w-1/4">{ticket.assignedTo?.name || 'Pasukan Sokongan DVS'}</td>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold w-1/4">Peringkat Khidmat (Tier):</td>
                  <td className="p-2 border border-slate-300 w-1/4">{ticket.assignedTo?.tier || 'Tier 2'}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold align-top">Punca Masalah (RCA):</td>
                  <td colSpan={3} className="p-2 border border-slate-300 text-slate-800">
                    {ticket.rootCauseAnalysis || 'Penyiasatan teknikal terhadap fail log dan konfigurasi pangkalan data.'}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 bg-slate-50 font-semibold align-top">Tindakan Pembetulan:</td>
                  <td colSpan={3} className="p-2 border border-slate-300 text-slate-800">
                    {ticket.resolutionSummary || 'Kerja-kerja penyelenggaraan dan ujian fungsian telah berjaya disempurnakan.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 4: Officer Verification Sign-Off */}
          <div className="space-y-1 text-xs">
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-700 bg-slate-100 p-1.5 border border-slate-200">
              BAHAGIAN D: PENGESAHAN MASALAH OLEH PEGAWAI DVS (PENGADU)
            </div>
            <div className="p-4 border border-slate-300 rounded space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700">Status Pengesahan Penyelesaian: </span>
                  <span className="font-bold text-emerald-800">
                    {ticket.verification?.isIssueResolved ? 'MASALAH TELAH DISELESAIKAN DENGAN SEMPURNA' : 'MENUNGGU PENGESAHAN UJIAN RASMI'}
                  </span>
                </div>
                {ticket.verification?.rating && (
                  <div className="font-mono font-bold text-amber-700">
                    Penilaian Mutu: {ticket.verification.rating} / 5 Bintang
                  </div>
                )}
              </div>

              {ticket.verification?.userComments && (
                <div className="text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200 italic">
                  "{ticket.verification.userComments}"
                </div>
              )}

              {/* Signature Blocks */}
              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-center">
                <div className="space-y-8">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">
                    Disediakan Oleh Juruteknik Bertugas:
                  </div>
                  <div className="border-b border-slate-400 mx-auto w-48"></div>
                  <div className="text-[11px]">
                    <div className="font-bold">{ticket.assignedTo?.name || 'Ir. Ahmad Zulkifli'}</div>
                    <div className="text-slate-500">Meja Bantuan ICT DVS</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">
                    Disahkan Oleh Pegawai / Pengadu DVS:
                  </div>
                  <div className="border-b border-slate-400 mx-auto w-48"></div>
                  <div className="text-[11px]">
                    <div className="font-bold">
                      {ticket.verification?.verifiedBy || ticket.reportedBy.name}
                    </div>
                    <div className="text-slate-500">
                      {ticket.verification?.verifiedRole || 'Pegawai Pengesah DVS'}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-700">
                      {ticket.verification?.verifiedAt || 'Tarikh Disahkan'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-200 font-mono">
            Dokumen ini dijana secara automatik oleh Sistem HelpDesk DVS. Sebarang pengubahsuaian tanpa kebenaran adalah dilarang.
          </div>
        </div>
      </div>
    </div>
  );
};
