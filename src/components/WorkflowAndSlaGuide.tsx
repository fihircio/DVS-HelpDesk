import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  FileCheck2, 
  Clock, 
  Users, 
  RefreshCw, 
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';

export const WorkflowAndSlaGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Aliran Kerja Pengurusan & Pengesahan Masalah HelpDesk DVS
              </h2>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                SOP Sebut Harga
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Garis panduan standard operasi bagi memastikan setiap aduan disaring dengan teliti, diselesaikan mengikut punca sebenar (RCA), dan disahkan keberkesanannya oleh pegawai pelapor sebelum penutupan rasmi tiket.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stage Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stage 1 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400">PERINGKAT 01</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Penerimaan & Saringan
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">
            Sistem Pelaporan & Triaj Awal
          </h3>

          <p className="text-xs text-slate-600">
            Aduan diterima daripada 6 saluran (Portal, Hotline, WhatsApp, Emel, Kaunter, Jarak Jauh). Meja Bantuan Tier-1 menyaring maklumat, menetapkan tahap kritikaliti, dan mengeluarkan No. Rujukan Aduan rasmi.
          </p>

          <div className="text-[11px] bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800 block">Sasaran SLA:</span>
            <span>Akuan terima segera (&lt; 1 minit untuk portal / &lt; 15 minit untuk semakan saringan).</span>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400">PERINGKAT 02</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Diagnostik & Tindakan
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">
            Penyiasatan & Eskalasi Teknikal
          </h3>

          <p className="text-xs text-slate-600">
            Aduan disalurkan kepada Juruteknik DVS Tier-2 atau Vendor Penyebutharga Tier-3. Melakukan Root Cause Analysis (RCA), baik pulih pangkalan data, penggantian peranti, atau konfigurasi rangkaian MyGovUC.
          </p>

          <div className="text-[11px] bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800 block">Tindakan:</span>
            <span>Ujian fungsian dalaman dijalankan bagi mengesahkan perisian beroperasi normal.</span>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400">PERINGKAT 03</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              Ujian & Penyerahan
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">
            Penyerahan Untuk Pengesahan
          </h3>

          <p className="text-xs text-slate-600">
            Juruteknik merekodkan ringkasan penyelesaian dan punca masalah ke dalam sistem. Tiket dialihkan ke status <strong>"MENUNGGU PENGESAHAN PENGADU"</strong> dan notifikasi dihantar kepada pegawai pelapor.
          </p>

          <div className="text-[11px] bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800 block">Status Sistem:</span>
            <span>Tiket TIDAK BOLEH ditutup secara sepihak oleh juruteknik tanpa pengesahan pengadu.</span>
          </div>
        </div>

        {/* Stage 4 - Verification */}
        <div className="bg-white p-4 rounded-lg border border-emerald-300 shadow-2xs space-y-3 relative bg-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-emerald-700">PERINGKAT 04 (WAJIB)</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Pengesahan Masalah
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-700" />
            <span>Pengesahan Pegawai DVS</span>
          </h3>

          <p className="text-xs text-slate-600">
            Pegawai DVS menguji semula sistem dan menandatangani pengesahan digital sama ada isu benar-benar selesai. Menilai tahap kepuasan (CSAT 1-5 Bintang). Jika isu masih berulang, tiket dibuka semula serta-merta.
          </p>

          <div className="text-[11px] bg-emerald-50 p-2.5 rounded border border-emerald-200 text-emerald-950 space-y-1">
            <span className="font-semibold block">Hasil Akhir:</span>
            <span>Slip Pengesahan Rasmi dijana & tiket ditutup dengan status "DISAHKAN SELESAI".</span>
          </div>
        </div>
      </div>

      {/* SLA Matrix Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Jadual Perjanjian Tahap Perkhidmatan (SLA) HelpDesk DVS
            </h3>
            <p className="text-[11px] text-slate-500">
              Ketetapan had masa respons dan penyelesaian mengikut impak operasi Jabatan Perkhidmatan Veterinar
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Sasaran Pematuhan: &ge; 98.0%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-3">Tahap Kritikaliti</th>
                <th className="p-3">Takrifan & Contoh Masalah di DVS</th>
                <th className="p-3">Masa Respons Pertama</th>
                <th className="p-3">Masa Resolusi Masalah</th>
                <th className="p-3">Laluan Eskalasi</th>
                <th className="p-3">Prosedur Pengesahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-rose-700 whitespace-nowrap">
                  Tahap 1: Kritikal
                </td>
                <td className="p-3">
                  Sistem e-Permit import/eksport di pintu sempadan MAQIS lumpuh, kegagalan pangkalan data pelayan pusat DVS Putrajaya yang menjejaskan operasi veterinar nasional.
                </td>
                <td className="p-3 font-mono font-bold text-slate-900">&le; 15 Minit</td>
                <td className="p-3 font-mono font-bold text-rose-700">&le; 2 Jam</td>
                <td className="p-3">Tier-3 Vendor & Pegawai Bertugas Atas Panggilan 24/7</td>
                <td className="p-3 text-emerald-800 font-medium">Ujian langsung & Pengesahan Segera Pegawai Kuarantin</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-amber-700 whitespace-nowrap">
                  Tahap 2: Tinggi
                </td>
                <td className="p-3">
                  Sistem i-Veterinar ralat imbasan tag RFID di ladang ruminan, pautan rangkaian gentian optik di Makmal VRI terputus, atau sistem pengeluaran sijil kesihatan veterinar terhenti tanpa alternatif.
                </td>
                <td className="p-3 font-mono font-semibold text-slate-900">&le; 30 Minit</td>
                <td className="p-3 font-mono font-semibold text-amber-700">&le; 4 Jam</td>
                <td className="p-3">Tier-2 Pegawai Teknikal DVS</td>
                <td className="p-3 text-emerald-800 font-medium">Pengesahan melalui portal / WhatsApp dalam 2 jam</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-800 whitespace-nowrap">
                  Tahap 3: Sederhana
                </td>
                <td className="p-3">
                  Mesin biometrik cap jari pejabat tidak berfungsi, masalah sambungan pencetak laser label, atau modul carian laporan statistik lambat (terdapat kaedah manual alternatif).
                </td>
                <td className="p-3 font-mono text-slate-900">&le; 2 Jam</td>
                <td className="p-3 font-mono text-slate-900">&le; 8 Jam (1 Hari Bekerja)</td>
                <td className="p-3">Tier-1 & Juruteknik Cawangan</td>
                <td className="p-3">Pengesahan pegawai sebelum tamat waktu pejabat</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-600 whitespace-nowrap">
                  Tahap 4: Rendah
                </td>
                <td className="p-3">
                  Pertanyaan am cara guna sistem, permohonan pendaftaran ID kakitangan baharu, atau masalah kuota storan emel MyGovUC.
                </td>
                <td className="p-3 font-mono text-slate-900">&le; 4 Jam</td>
                <td className="p-3 font-mono text-slate-900">&le; 24 Jam (Hari Bekerja)</td>
                <td className="p-3">Meja Bantuan Barisan Hadapan</td>
                <td className="p-3">Borang maklum balas kepuasan digital</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Protocol Explainer */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Protokol Pengesahan Masalah (Quality Assurance & User Sign-Off)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block">1. Semakan Bukti Pembaikan</span>
            <p className="text-slate-600">
              Pegawai DVS dipaparkan laporan Punca Masalah (RCA) dan nota pembaikan teknikal yang dikemukakan oleh juruteknik sebelum membuat keputusan.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block">2. Pilihan Pengesahan Dwiarah</span>
            <p className="text-slate-600">
              Jika masalah berjaya diselesaikan, pegawai klik "Sahkan Selesai" dan menandatangani akuan. Jika masalah masih wujud, pegawai boleh klik "Pertikai & Buka Semula" bersama ulasan.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded border border-slate-100 space-y-1.5">
            <span className="font-bold text-slate-900 block">3. Indeks Kepuasan CSAT</span>
            <p className="text-slate-600">
              Setiap pengesahan disertakan skala penilaian 1 hingga 5 bintang bagi memantau kepuasan warga DVS terhadap mutu perkhidmatan Meja Bantuan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
