import React, { useState } from 'react';
import { 
  SystemCategory, 
  TicketPriority, 
  DVSBranch, 
  HelpdeskTicket 
} from '../types/helpdesk';
import { 
  Send, 
  AlertCircle, 
  FileText, 
  Upload, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Building2, 
  Phone, 
  Mail,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ReportProblemFormProps {
  onSubmitTicket: (newTicket: HelpdeskTicket) => void;
  onCancel: () => void;
}

const CATEGORIES: SystemCategory[] = [
  'Sistem e-Permit DVS',
  'Sistem i-Veterinar',
  'Sistem eVet & e-Diagnosis',
  'Sistem Pengurusan Makmal (VRI / MKA)',
  'Rangkaian, Internet & VPN MyGovUC',
  'Perkakasan Komputer & Pencetak',
  'Sistem Biometrik & Kehadiran',
  'Akaun Pengguna & Keselamatan Siber'
];

const BRANCHES: DVSBranch[] = [
  'Ibu Pejabat DVS Putrajaya (Wisma Tani)',
  'DVS Negeri Selangor (Shah Alam)',
  'DVS Negeri Johor (Kempas)',
  'DVS Negeri Perak (Ipoh)',
  'DVS Negeri Pulau Pinang (Bukit Tengah)',
  'DVS Negeri Pahang (Kuantan)',
  'DVS Negeri Terengganu (Kuala Terengganu)',
  'DVS Negeri Kelantan (Kota Bharu)',
  'DVS Negeri Kedah (Alor Setar)',
  'DVS Negeri Melaka (Ayer Keroh)',
  'DVS Negeri Sembilan (Seremban)',
  'DVS Negeri Perlis (Kangar)',
  'Institut Penyelidikan Veterinar (VRI) Ipoh',
  'Stesen Kuarantin Haiwan KLIA (Sepang)',
  'Pusat Inseminasi Buatan Jerantut'
];

export const ReportProblemForm: React.FC<ReportProblemFormProps> = ({
  onSubmitTicket,
  onCancel
}) => {
  const [category, setCategory] = useState<SystemCategory>('Sistem e-Permit DVS');
  const [priority, setPriority] = useState<TicketPriority>('SEDERHANA');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [channelOrigin, setChannelOrigin] = useState<'Portal Web' | 'Talian Hotline' | 'WhatsApp DVS' | 'Emel Rasmi' | 'Kaunter Walk-In'>('Portal Web');

  // Reporter info
  const [reporterName, setReporterName] = useState('Dr. Ahmad Syukri bin Hashim');
  const [staffId, setStaffId] = useState('DVS-HQ-7740');
  const [email, setEmail] = useState('syukri.hashim@dvs.gov.my');
  const [phone, setPhone] = useState('019-3829104');
  const [branch, setBranch] = useState<DVSBranch>('Ibu Pejabat DVS Putrajaya (Wisma Tani)');
  const [department, setDepartment] = useState('Bahagian Biosekuriti dan Kuarantin Veterinar');

  // Mock attachment
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  // Success state
  const [submittedTicket, setSubmittedTicket] = useState<HelpdeskTicket | null>(null);

  const getSlaInfo = (p: TicketPriority) => {
    switch (p) {
      case 'KRITIKAL':
        return {
          response: '15 Minit',
          resolution: '2 Jam',
          desc: 'Kerosakan sistem teras nasional atau pintu masuk sempadan negara.'
        };
      case 'TINGGI':
        return {
          response: '30 Minit',
          resolution: '4 Jam',
          desc: 'Operasi utama tergendala, tiada fungsi alternatif.'
        };
      case 'SEDERHANA':
        return {
          response: '2 Jam',
          resolution: '8 Jam (1 Hari Bekerja)',
          desc: 'Fungsi terjejas tetapi masih boleh menggunakan laluan alternatif.'
        };
      case 'RENDAH':
        return {
          response: '4 Jam',
          resolution: '24 Jam (Hari Bekerja)',
          desc: 'Pertanyaan teknikal, permohonan akses baharu atau ralat kosmetik.'
        };
    }
  };

  const sla = getSlaInfo(priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Sila lengkapkan tajuk dan huraian masalah.');
      return;
    }

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestampStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    // Generate ticket number
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const newId = `DVS-HD-2026-${randomSeq}`;

    const newTicket: HelpdeskTicket = {
      id: newId,
      title: title.trim(),
      description: stepsToReproduce.trim() 
        ? `${description.trim()}\n\n[Langkah Pengulangan Masalah]:\n${stepsToReproduce.trim()}`
        : description.trim(),
      category,
      priority,
      status: 'BARU',
      createdAt: timestampStr,
      slaDeadline: `${timestampStr} (${sla.response} - Respons Awal)`,
      slaResolutionDeadline: `${timestampStr} (${sla.resolution} - Sasaran Selesai)`,
      reportedBy: {
        name: reporterName.trim(),
        staffId: staffId.trim(),
        email: email.trim(),
        phone: phone.trim(),
        branch,
        department: department.trim()
      },
      assignedTo: {
        name: 'Meja Bantuan Barisan Hadapan (Frontline Tier-1)',
        tier: 'Tier 1 (Helpdesk Frontline)',
        phone: '03-8870 2500'
      },
      channelOrigin,
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: timestampStr,
          author: reporterName.trim(),
          role: 'Pengadu (DVS)',
          action: `Aduan Baharu Didaftarkan Melalui ${channelOrigin}`,
          comment: `Aduan diterima dalam sistem dengan tahap keutamaan ${priority}. Sasaran SLA: ${sla.resolution}.`
        }
      ]
    };

    setSubmittedTicket(newTicket);
    onSubmitTicket(newTicket);
  };

  if (submittedTicket) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg border border-slate-200 shadow-xs space-y-6">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            Aduan Berjaya Didaftarkan ke HelpDesk DVS
          </h2>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Sistem telah mengeluarkan No. Rujukan Aduan rasmi. Saringan Tier-1 sedang diproses mengikut Perjanjian Tahap Perkhidmatan (SLA).
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs text-slate-500 font-medium">No. Rujukan Tiket DVS:</span>
            <span className="font-mono text-base font-bold text-emerald-800">
              {submittedTicket.id}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Kategori Sistem:</span>
              <span className="font-medium text-slate-800">{submittedTicket.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Tahap Kritikaliti:</span>
              <span className="font-semibold text-rose-700">{submittedTicket.priority}</span>
            </div>
            <div>
              <span className="text-slate-400 block">SLA Masa Respons Pertama:</span>
              <span className="font-mono text-slate-800">{sla.response}</span>
            </div>
            <div>
              <span className="text-slate-400 block">SLA Sasaran Resolusi:</span>
              <span className="font-mono text-slate-800">{sla.resolution}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Nama Pengadu:</span>
              <span className="text-slate-800">{submittedTicket.reportedBy.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Cawangan DVS:</span>
              <span className="text-slate-800">{submittedTicket.reportedBy.branch}</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Peringatan Prosedur Pengesahan Masalah:</span>
          </div>
          <p>
            Apabila pihak teknikal HelpDesk selesai melaksanakan tindakan pembaikan, tiket ini akan beralih ke status <strong>"MENUNGGU PENGESAHAN PENGADU"</strong>. Anda akan diminta untuk menguji dan mengesahkan keberkesanan penyelesaian tersebut sebelum tiket ditutup secara rasmi.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setSubmittedTicket(null);
              setTitle('');
              setDescription('');
              setStepsToReproduce('');
            }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded shadow-xs transition-colors"
          >
            Lapor Masalah Lain
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded transition-colors"
          >
            Kembali ke Papan Pemuka
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title & Intro */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Sistem Pelaporan Masalah & Aduan ICT DVS
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Borang rasmi pendaftaran insiden kerosakan perkakasan, perisian sistem atau rangkaian bagi kegunaan kakitangan dan pentadbir DVS.
            </p>
          </div>
          <div className="text-xs bg-slate-100 px-3 py-1.5 rounded text-slate-600 font-mono">
            Borang Kod: DVS-HD-FRM-01
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Maklumat Pengadu */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Butiran Pegawai Pelapor / Cawangan DVS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Nama Penuh Pegawai Pelapor <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                No. ID Kakitangan DVS / MyKad <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Emel Rasmi Kerajaan (@dvs.gov.my) <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                No. Telefon / WhatsApp Hubungan <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Lokasi / Cawangan DVS <span className="text-rose-500">*</span>
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value as DVSBranch)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Bahagian / Unit <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="cth: Bahagian Kesihatan Awam / Seksyen ICT"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Butiran Sistem & Tahap Kritikaliti */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <AlertCircle className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              2. Klasifikasi Sistem & Pengiraan SLA
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Kategori Sistem / Modul Terjejas <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SystemCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium text-slate-800"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Saluran Pelaporan Asal <span className="text-rose-500">*</span>
              </label>
              <select
                value={channelOrigin}
                onChange={(e) => setChannelOrigin(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="Portal Web">Portal Web Rasmi DVS</option>
                <option value="Talian Hotline">Talian Hotline 1-800-88-DVSHD</option>
                <option value="WhatsApp DVS">WhatsApp Rasmi DVS (+6019-388 2000)</option>
                <option value="Emel Rasmi">Emel Rasmi (helpdesk.ict@dvs.gov.my)</option>
                <option value="Kaunter Walk-In">Kaunter Walk-In Wisma Tani</option>
              </select>
            </div>
          </div>

          {/* Priority selector with clear SLA details */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-medium text-slate-700">
              Tahap Kritikaliti Masalah (Berdasarkan Impak Operasi DVS) <span className="text-rose-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                {
                  id: 'KRITIKAL' as TicketPriority,
                  title: 'Tahap 1: Kritikal',
                  time: 'Resolusi: < 2 Jam',
                  resp: 'Respons: < 15 Min',
                  note: 'Operasi kuarantin/e-Permit terhenti sepenuhnya'
                },
                {
                  id: 'TINGGI' as TicketPriority,
                  title: 'Tahap 2: Tinggi',
                  time: 'Resolusi: < 4 Jam',
                  resp: 'Respons: < 30 Min',
                  note: 'Fungsi utama makmal/sistem terjejas'
                },
                {
                  id: 'SEDERHANA' as TicketPriority,
                  title: 'Tahap 3: Sederhana',
                  time: 'Resolusi: < 8 Jam',
                  resp: 'Respons: < 2 Jam',
                  note: 'Masih boleh proses guna alternatif'
                },
                {
                  id: 'RENDAH' as TicketPriority,
                  title: 'Tahap 4: Rendah',
                  time: 'Resolusi: < 24 Jam',
                  resp: 'Respons: < 4 Jam',
                  note: 'Pertanyaan teknikal & bantuan am'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPriority(item.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    priority === item.id
                      ? item.id === 'KRITIKAL'
                        ? 'border-rose-600 bg-rose-50/70 shadow-xs'
                        : item.id === 'TINGGI'
                        ? 'border-amber-600 bg-amber-50/70 shadow-xs'
                        : 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{item.title}</span>
                    <input
                      type="radio"
                      name="priority"
                      checked={priority === item.id}
                      onChange={() => setPriority(item.id)}
                      className="text-emerald-700"
                    />
                  </div>
                  <div className="text-[11px] font-mono font-medium text-slate-800 mt-1">
                    {item.time}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.resp}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-1">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Huraian Masalah */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Keterangan Terperinci Insiden / Masalah
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Tajuk Aduan Masalah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="cth: Ralat Kegagalan Cetakan Permit e-Permit di MAQIS KLIA"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Huraian Lengkap Masalah & Mesej Ralat (Error Code) <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Sila nyatakan kronologi masalah, mesej ralat yang dipaparkan di skrin komputer, dan nombor dokumen berkaitan (cth: No. Permit / ID Ternakan / Kod Sampel Makmal)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Langkah-langkah Mengulang Masalah (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="cth: 1. Log masuk ke e-Permit -> 2. Klik Kelulusan Kuarantin -> 3. Tekan Cetak -> Ralat 500 tertera"
                value={stepsToReproduce}
                onChange={(e) => setStepsToReproduce(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
              />
            </div>

            {/* Simulated file upload */}
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Lampiran Tangkapan Skrin / Log Ralat (PDF, PNG, JPG - Maks 10MB)
              </label>
              <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center text-center">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                {attachmentName ? (
                  <div className="text-xs text-emerald-800 font-medium flex items-center gap-2">
                    <span>Lampiran: {attachmentName}</span>
                    <button
                      type="button"
                      onClick={() => setAttachmentName(null)}
                      className="text-rose-600 hover:underline text-[11px]"
                    >
                      Padam
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setAttachmentName('screenshot_ralat_dvs_2026.png')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs hover:bg-slate-100"
                    >
                      Pilih Fail Tangkapan Skrin (Simulasi)
                    </button>
                    <p className="text-[11px] text-slate-400">
                      Seret & lepas fail tangkapan skrin atau klik untuk memuat naik
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded transition-colors flex items-center gap-2 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hantar Aduan & Jana No. Tiket DVS</span>
          </button>
        </div>
      </form>
    </div>
  );
};
