import React, { useState } from 'react';
import { DVS_CHANNELS } from '../data/channels';
import { 
  Globe, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Building2, 
  Laptop, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Send, 
  PhoneForwarded, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ExternalLink,
  Bot
} from 'lucide-react';

export const ChannelDirectory: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<'none' | 'whatsapp' | 'hotline' | 'remote'>('whatsapp');

  // WhatsApp simulation state
  const [whatsappChat, setWhatsappChat] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Selamat sejahtera! Terima kasih kerana menghubungi WhatsApp Rasmi Meja Bantuan Jabatan Perkhidmatan Veterinar (DVS). Bagaimana kami boleh membantu operasi veterinar anda hari ini?',
      time: '09:00'
    },
    {
      sender: 'bot',
      text: 'Pilihan pantas:\n1. Semak status tiket aduan (cth: DVS-HD-2026-0842)\n2. Lapor masalah sistem e-Permit / i-Veterinar\n3. Bantuan masalah capaian VPN MyGovUC',
      time: '09:00'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Hotline simulator state
  const [ivrStep, setIvrStep] = useState<number>(0);
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newChat = [...whatsappChat, { sender: 'user' as const, text: userMsg, time: timeStr }];
    setWhatsappChat(newChat);
    setChatInput('');

    // Automated smart response
    setTimeout(() => {
      let botReply = 'Mesej anda telah direkodkan. Pegawai Khidmat Pelanggan DVS (En. Hafiz) sedang meneliti maklumat ini. No. Tiket sokongan sementara: DVS-WA-2026-9912.';
      if (userMsg.toLowerCase().includes('0842') || userMsg.toLowerCase().includes('status')) {
        botReply = 'Status Tiket [DVS-HD-2026-0842]:\nTindakan pembaikan pangkalan data e-Permit telah selesai oleh Juruteknik Kanan Ir. Ahmad Zulkifli. Sila sahkan penyelesaian di Portal HelpDesk DVS agar tiket dapat ditutup rasmi.';
      } else if (userMsg.toLowerCase().includes('e-permit') || userMsg.toLowerCase().includes('permit')) {
        botReply = 'Bagi masalah Sistem e-Permit DVS, pasukan sokongan kritikal sedang memantau pintu masuk sempadan KLIA & Pelabuhan Klang. Sila nyatakan No. Permit atau ralat untuk triaj segera.';
      }

      setWhatsappChat((prev) => [
        ...prev,
        {
          sender: 'bot' as const,
          text: botReply,
          time: timeStr
        }
      ]);
    }, 600);
  };

  const getChannelIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-emerald-700" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-blue-700" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'Mail':
        return <Mail className="w-5 h-5 text-amber-700" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-purple-700" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-indigo-700" />;
      default:
        return <HelpCircle className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Kemudahan Menghubungi DVS & Saluran Perkhidmatan HelpDesk
              </h2>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                Pematuhan Spesifikasi Sebut Harga
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-3xl">
              Penyebutharga menyediakan ekosistem HelpDesk pelbagai saluran (Omnichannel) komprehensif bagi memudahkan warga DVS serta pentadbir sistem melaporkan, mengenal pasti, dan mengesahkan penyelesaian masalah mengikut jadual waktu operasi yang ditetapkan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">6 Saluran Komunikasi Bersepadu</span>
          </div>
        </div>
      </div>

      {/* Grid of 6 Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DVS_CHANNELS.map((ch) => (
          <div
            key={ch.id}
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-2.5">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {getChannelIcon(ch.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {ch.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {ch.supportType}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                  {ch.status}
                </span>
              </div>

              {/* Address / Contact point */}
              <div className="bg-slate-50 p-2 rounded border border-slate-100 font-mono text-xs text-slate-900 break-all select-all font-semibold">
                {ch.channelAddress}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600">
                {ch.description}
              </p>

              {/* Operating Hours Block */}
              <div className="border-t border-slate-100 pt-2 space-y-1.5 text-xs">
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Waktu Operasi:</span>
                    <span className="font-semibold text-slate-800">{ch.operatingHoursText}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Hari Operasi:</span>
                    <span className="text-slate-700">{ch.operatingDaysText}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Komitmen SLA Respons:</span>
                    <span className="font-mono text-emerald-800 font-medium">{ch.slaResponse}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Conditions / Notes */}
            <div className="bg-slate-50/70 p-2 rounded text-[11px] text-slate-500 border border-slate-100">
              <span className="font-semibold text-slate-700">Syarat Operasi: </span>
              {ch.specialConditions}
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Operating Hours & SLA Comparison Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Jadual Matriks Waktu Operasi Perkhidmatan HelpDesk DVS Mengikut Saluran
            </h3>
            <p className="text-[11px] text-slate-500">
              Rujukan rasmi waktu perkhidmatan bagi kakitangan, makmal veterinar dan pintu masuk kuarantin
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">Format Standard Perolehan ICT</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-3">Saluran Perkhidmatan</th>
                <th className="p-3">Alamat / No. Hubungan</th>
                <th className="p-3">Hari Beroperasi</th>
                <th className="p-3">Waktu Operasi Biasa</th>
                <th className="p-3">Waktu Rehat / Solat</th>
                <th className="p-3">Kecemasan / Luar Waktu (On-Call)</th>
                <th className="p-3">Sasaran SLA Pertama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">1. Portal Sistem Web</td>
                <td className="p-3 font-mono">helpdesk.dvs.gov.my</td>
                <td className="p-3">Setiap Hari (365 Hari)</td>
                <td className="p-3 font-mono font-medium text-emerald-800">24 Jam Sehari</td>
                <td className="p-3 text-slate-400">Tiada Rehat (Automasi)</td>
                <td className="p-3 text-emerald-700">Tersedia 24/7</td>
                <td className="p-3 font-mono">&lt; 1 Minit (No. Tiket)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">2. Hotline Bebas Tol</td>
                <td className="p-3 font-mono">1-800-88-DVSHD / Ext 2500</td>
                <td className="p-3">Isnin – Jumaat</td>
                <td className="p-3 font-mono">8:00 PG – 5:30 PTG</td>
                <td className="p-3 text-slate-600">Jumaat (12:15–2:45 PTG)</td>
                <td className="p-3 text-slate-700">Talian On-Call 24/7 (Kritikal)</td>
                <td className="p-3 font-mono">&lt; 3 Deringan (&lt; 15s)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">3. WhatsApp DVS</td>
                <td className="p-3 font-mono">+60 19-388 2000</td>
                <td className="p-3">Setiap Hari (Termasuk Cuti)</td>
                <td className="p-3 font-mono">8:00 PG – 10:00 MLM</td>
                <td className="p-3 text-slate-400">Tiada (Pusingan Syif)</td>
                <td className="p-3 text-emerald-700">Bot AI Aktif 24 Jam</td>
                <td className="p-3 font-mono">&lt; 5 Minit (Agen)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">4. Emel Meja Bantuan</td>
                <td className="p-3 font-mono">helpdesk.ict@dvs.gov.my</td>
                <td className="p-3">Isnin – Jumaat</td>
                <td className="p-3 font-mono">8:00 PG – 6:00 PTG</td>
                <td className="p-3 text-slate-400">Auto-penerimaan 24 Jam</td>
                <td className="p-3 text-slate-700">Saringan Tiket Berterusan</td>
                <td className="p-3 font-mono">&lt; 30 Minit (Respons)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">5. Kaunter Walk-In</td>
                <td className="p-3">Aras 2, Wisma Tani Putrajaya</td>
                <td className="p-3">Isnin – Jumaat</td>
                <td className="p-3 font-mono">8:30 PG – 4:30 PTG</td>
                <td className="p-3 text-slate-600">1:00–2:00 PTG (Jum 12:15–2:45)</td>
                <td className="p-3 text-slate-400">Tertakluk Janji Temu Krisis</td>
                <td className="p-3 font-mono">&lt; 10 Minit (Giliran)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900">6. Bantuan Jarak Jauh</td>
                <td className="p-3">DVS Secure Client</td>
                <td className="p-3">Isnin – Jumaat</td>
                <td className="p-3 font-mono">8:30 PG – 5:00 PTG</td>
                <td className="p-3 text-slate-600">Ikut Waktu Pejabat</td>
                <td className="p-3 text-slate-700">Atas Kelulusan CIO DVS</td>
                <td className="p-3 font-mono">15–30 Minit Selepas Triaj</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Channel Simulator Section */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Simulasi Interaktif Saluran HelpDesk (Ujian Langsung Penilai Tender)</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Uji pengalaman pengguna bagi saluran komunikasi WhatsApp, Hotline IVR dan Bantuan Jarak Jauh secara langsung di sini.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveSimulator('whatsapp')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeSimulator === 'whatsapp'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Simulasi WhatsApp
            </button>
            <button
              onClick={() => setActiveSimulator('hotline')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeSimulator === 'hotline'
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Simulasi Hotline IVR
            </button>
            <button
              onClick={() => setActiveSimulator('remote')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeSimulator === 'remote'
                  ? 'bg-purple-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Simulasi Bantuan Jarak Jauh
            </button>
          </div>
        </div>

        {/* WhatsApp Simulator Content */}
        {activeSimulator === 'whatsapp' && (
          <div className="max-w-2xl mx-auto border border-slate-300 rounded-lg overflow-hidden shadow-xs bg-slate-100">
            {/* WhatsApp Top Bar */}
            <div className="bg-emerald-800 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">
                  DVS
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span>HelpDesk Rasmi Jabatan Perkhidmatan Veterinar</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-white text-emerald-800 text-[10px] flex items-center justify-center font-bold">✓</span>
                  </h4>
                  <span className="text-[10px] text-emerald-200">
                    Dalam Talian • Waktu Sokongan Agen: 8:00 PG – 10:00 MLM
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-200">+6019-388 2000</span>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 h-64 overflow-y-auto bg-[#efeae2]">
              {whatsappChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-lg text-xs space-y-1 shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                        : 'bg-white text-slate-900 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right font-mono">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Taip mesej atau semakan tiket (cth: Semak status DVS-HD-2026-0842)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Hotline Simulator Content */}
        {activeSimulator === 'hotline' && (
          <div className="max-w-xl mx-auto p-5 border border-slate-200 rounded-lg bg-slate-50 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Simulasi Panggilan Talian Hotline DVS (1-800-88-DVSHD)
              </h4>
              <p className="text-xs text-slate-500">
                Sistem Pengagihan Panggilan Automatik (Interactive Voice Response - IVR)
              </p>
            </div>

            {!isCalling ? (
              <div className="text-center py-4">
                <button
                  onClick={() => {
                    setIsCalling(true);
                    setIvrStep(1);
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-xs inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Dail 1-800-88-DVSHD (Uji Panggilan)</span>
                </button>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    Panggilan Tersambung: 1-800-88-3874
                  </span>
                  <button
                    onClick={() => {
                      setIsCalling(false);
                      setIvrStep(0);
                    }}
                    className="text-rose-600 hover:underline font-semibold"
                  >
                    Tamatkan Panggilan
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded text-xs space-y-2 text-slate-800">
                  <p className="font-medium text-slate-900">
                    🔊 <em>"Selamat datang ke Pusat Meja Bantuan Jabatan Perkhidmatan Veterinar Malaysia. Sila buat pilihan anda:"</em>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <button
                      onClick={() => setIvrStep(2)}
                      className="p-2 border border-slate-200 rounded text-left hover:bg-emerald-50 transition-colors"
                    >
                      <strong className="text-emerald-700">Tekan 1:</strong> Bantuan Sistem e-Permit & Kuarantin MAQIS
                    </button>
                    <button
                      onClick={() => setIvrStep(3)}
                      className="p-2 border border-slate-200 rounded text-left hover:bg-emerald-50 transition-colors"
                    >
                      <strong className="text-emerald-700">Tekan 2:</strong> Sistem i-Veterinar & Tagging Ruminan
                    </button>
                    <button
                      onClick={() => setIvrStep(4)}
                      className="p-2 border border-slate-200 rounded text-left hover:bg-emerald-50 transition-colors"
                    >
                      <strong className="text-emerald-700">Tekan 3:</strong> Rangkaian MyGovUC & Perkakasan Pejabat
                    </button>
                    <button
                      onClick={() => setIvrStep(5)}
                      className="p-2 border border-slate-200 rounded text-left hover:bg-emerald-50 transition-colors"
                    >
                      <strong className="text-emerald-700">Tekan 0:</strong> Bercakap Terus dengan Pegawai Bertugas
                    </button>
                  </div>
                </div>

                {ivrStep > 1 && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-xs text-emerald-950 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Panggilan Berjaya Diteruskan:</strong> Panggilan anda telah disalurkan ke Antrian Khusus Bahagian dengan anggaran masa menunggu &lt; 15 saat. Pegawai Meja Bantuan sedang bersedia.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Remote Simulator Content */}
        {activeSimulator === 'remote' && (
          <div className="max-w-xl mx-auto p-5 border border-slate-200 rounded-lg bg-slate-50 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Simulasi Sesi Bantuan Jarak Jauh (DVS Secure Remote Desktop)
              </h4>
              <p className="text-xs text-slate-500">
                Penyelesaian pantas bagi masalah perisian dan sijil digital terus ke komputer pengguna
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Kod Keselamatan Sesi Semasa:</span>
                <span className="font-mono text-base font-bold text-purple-800 tracking-widest bg-purple-50 px-3 py-1 rounded border border-purple-200">
                  DVS-849-210
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Sesi jarak jauh disulitkan dengan penyulitan 256-bit AES. Pegawai pelapor wajib meluluskan tetingkap pengesahan (pop-up permission) sebelum skrin komputer boleh dipaparkan kepada juruteknik DVS.
              </p>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-700">Status Gateway MyGovUC:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Pautan Selamat Tersedia
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
