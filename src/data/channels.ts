import { ChannelInfo } from '../types/helpdesk';

export const DVS_CHANNELS: ChannelInfo[] = [
  {
    id: 'ch-portal',
    name: 'Portal Sistem HelpDesk Digital DVS',
    iconName: 'Globe',
    description: 'Sistem web rasmi bagi pendaftaran tiket, semakan status aduan masa nyata, semakan SLA, dan pengesahan penyelesaian masalah secara digital.',
    channelAddress: 'https://helpdesk.dvs.gov.my',
    operatingHoursText: '24 Jam Sehari / 7 Hari Seminggu (24/7/365)',
    operatingDaysText: 'Setiap Hari (Termasuk Cuti Umum & Hujung Minggu)',
    slaResponse: 'Segera (< 1 Minit untuk no. tiket automatik)',
    specialConditions: 'Sokongan juruteknik langsung (Live Engineer) aktif pada 8:00 PG – 6:00 PTG (Isnin – Jumaat). Di luar waktu ini disokong oleh sistem tiket automatik & pasukan On-Call.',
    status: '24/7 Tersedia',
    supportType: 'Automasi & Manusia'
  },
  {
    id: 'ch-hotline',
    name: 'Talian Hotline & Telefon Meja Bantuan',
    iconName: 'PhoneCall',
    description: 'Talian telefon khusus bebas tol dan talian terus ke Meja Bantuan ICT Ibu Pejabat DVS Putrajaya dengan sokongan Automated Call Distribution (ACD).',
    channelAddress: '1-800-88-DVSHD (3874) / 03-8870 2000 (Samb. 2500 / 2501)',
    operatingHoursText: '8:00 Pagi – 5:30 Petang (Isnin – Jumaat)',
    operatingDaysText: 'Hari Bekerja Rasmi Kerajaan (Isnin – Jumaat)',
    slaResponse: 'Dijawab dalam tempoh < 3 deringan (< 15 saat)',
    specialConditions: 'Waktu Rehat Solat Jumaat (12:15 TGH – 2:45 PTG): Panggilan dialihkan ke Pegawai Bertugas Atas Panggilan (On-Call Duty). Talian kecemasan 24/7 disediakan bagi kerosakan kritikal sistem sempadan MAQIS/e-Permit.',
    status: 'Waktu Operasi Sahaja',
    supportType: 'Panggilan Suara'
  },
  {
    id: 'ch-whatsapp',
    name: 'WhatsApp Rasmi HelpDesk DVS',
    iconName: 'MessageSquare',
    description: 'Saluran mesej pantas rasmi bertanda perniagaan sah (Verified Business) untuk pelaporan masalah, perkongsian tangkapan skrin ralat, dan notifikasi status tiket.',
    channelAddress: '+60 19-388 2000 (DVS Smart Helpdesk)',
    operatingHoursText: '8:00 Pagi – 10:00 Malam (Agen Manusia) | 24 Jam (Bot Pintar DVS)',
    operatingDaysText: 'Setiap Hari (Termasuk Sabtu, Ahad & Cuti Kelepasan Am)',
    slaResponse: '< 5 Minit (Agen Bertugas) / < 5 Saat (Bot Rujukan)',
    specialConditions: 'Membolehkan pengguna menghantar rakaman video ralat aplikasi atau gambar perkakasan rosak secara langsung untuk memudahkan pengesahan punca masalah.',
    status: 'Aktif',
    supportType: 'Pesej Interaktif'
  },
  {
    id: 'ch-email',
    name: 'Emel Rasmi Sokongan Teknikal (Gateway)',
    iconName: 'Mail',
    description: 'Peti masuk emel berpusat yang diintegrasikan secara automatik dengan enjin tiket sistem Helpdesk untuk merekodkan sebarang aduan rasmi kakitangan DVS.',
    channelAddress: 'helpdesk.ict@dvs.gov.my / aduan.sistem@dvs.gov.my',
    operatingHoursText: '24 Jam (Penerimaan Emel) | 8:00 PG – 6:00 PTG (Pemprosesan Teknikal)',
    operatingDaysText: 'Isnin – Jumaat (Hari Bekerja)',
    slaResponse: 'Akuan Penerimaan: < 5 Minit | Maklum Balas Teknikal: < 30 Minit',
    specialConditions: 'Sebarang emel yang dihantar akan dijana No. Rujukan Aduan (e.g., [DVS-HD-2026-XXXX]) secara automatik ke dalam peti masuk pengirim.',
    status: '24/7 Tersedia',
    supportType: 'Automasi & Manusia'
  },
  {
    id: 'ch-walkin',
    name: 'Kaunter Walk-In Meja Bantuan ICT Putrajaya',
    iconName: 'Building2',
    description: 'Kaunter perkhidmatan bersemuka di Ibu Pejabat DVS bagi penyelenggaraan perkakasan komputer riba, penggantian token keselamatan, dan sokongan fizikal.',
    channelAddress: 'Bahagian Pengurusan Maklumat ICT, Aras 2, Blok Podium 1A, Wisma Tani, Presint 4, 62630 Putrajaya',
    operatingHoursText: 'Isnin – Khamis: 8:30 PG – 1:00 PTG, 2:00 PTG – 4:30 PTG | Jumaat: 8:30 PG – 12:15 TGH, 2:45 PTG – 4:30 PTG',
    operatingDaysText: 'Hari Bekerja Rasmi (Isnin – Jumaat)',
    slaResponse: 'Layanan Terus di Kaunter (< 10 Minit Menunggu)',
    specialConditions: 'Ditutup pada waktu rehat tengah hari, Sabtu, Ahad dan Hari Cuti Am Persekutuan. Disediakan ruang ujian peranti & kiosk layan diri.',
    status: 'Waktu Operasi Sahaja',
    supportType: 'Fizikal Bersemuka'
  },
  {
    id: 'ch-remote',
    name: 'Sokongan Jarak Jauh (Remote Assistance)',
    iconName: 'Laptop',
    description: 'Sesi kawalan desktop jarak jauh secara selamat melalui MyGovUC VPN / DVS Secure AnyDesk bagi membantu penyelesaian masalah perisian dan konfigurasi.',
    channelAddress: 'DVS Remote Assistance Client (Diluluskan oleh ICT DVS)',
    operatingHoursText: '8:30 Pagi – 5:00 Petang (Isnin – Jumaat) atau Atas Permintaan Kecemasan',
    operatingDaysText: 'Isnin – Jumaat (Kecuali Panggilan On-Call)',
    slaResponse: 'Sesi dijadualkan dalam tempoh 15–30 Minit selepas saringan',
    specialConditions: 'Hanya boleh diaktifkan selepas persetujuan eksplisit (One-Time Password) diberikan oleh pegawai pelapor demi mematuhi Dasar Keselamatan ICT DVS.',
    status: 'Waktu Operasi Sahaja',
    supportType: 'Pesej Interaktif'
  }
];
