import { HelpdeskTicket } from '../types/helpdesk';

export const INITIAL_TICKETS: HelpdeskTicket[] = [
  {
    id: 'DVS-HD-2026-0842',
    title: 'Kegagalan Kelulusan Permit Import Daging Beku (Sistem e-Permit DVS)',
    description: 'Pegawai pemeriksa di Pintu Masuk MAQIS KLIA tidak dapat meluluskan permit e-Permit No: DVS/IMP/2026/8904. Sistem mengeluarkan kod ralat "ERR-502 Bad Gateway: DB Connection Timeout ke Pengkalan Data e-Permit". Hal ini menyebabkan kelewatan pelepasan konsainan kargo di zon sejuk beku.',
    category: 'Sistem e-Permit DVS',
    priority: 'KRITIKAL',
    status: 'MENUNGGU_PENGESAHAN',
    createdAt: '2026-10-07 07:45:00',
    slaDeadline: '2026-10-07 08:00:00 (15 minit - Respons)',
    slaResolutionDeadline: '2026-10-07 09:45:00 (2 jam - Resolusi)',
    reportedBy: {
      name: 'Dr. Nurul Huda binti Ahmad Razali',
      staffId: 'DVS-HQ-4421',
      email: 'huda.razali@dvs.gov.my',
      phone: '012-3849102',
      branch: 'Stesen Kuarantin Haiwan KLIA (Sepang)',
      department: 'Bahagian Biosekuriti dan Kuarantin Veterinar'
    },
    assignedTo: {
      name: 'Ir. Ahmad Zulkifli (Juruteknik Kanan Sistem)',
      tier: 'Tier 3 (Penyebutharga Vendor Sistem)',
      phone: '019-2234901'
    },
    rootCauseAnalysis: 'Kesesakan kelompok pangkalan data (connection pool exhaustion) pada pelayan e-Permit kluster B berpunca daripada lonjakan transaksi integrasi Dagang Net jam 07:30 pagi.',
    resolutionSummary: 'Penyelenggaraan kluster telah selesai. Parameter max_connections telah dinaikkan daripada 300 kepada 1000 serta perkhidmatan e-Permit Gateway dimulakan semula. Ujian transaksi dummy DVS/IMP/TEST-01 berjaya lulus tanpa ralat.',
    resolvedAt: '2026-10-07 09:10:00',
    channelOrigin: 'Talian Hotline',
    logs: [
      {
        id: 'log-1',
        timestamp: '2026-10-07 07:45:00',
        author: 'Dr. Nurul Huda binti Ahmad Razali',
        role: 'Pengadu (DVS)',
        action: 'Aduan Didaftarkan Melalui Talian Hotline Meja Bantuan',
        comment: 'Panggilan hotline diterima oleh Meja Bantuan Frontline Pn. Salmah.'
      },
      {
        id: 'log-2',
        timestamp: '2026-10-07 07:52:00',
        author: 'Tier 1 Helpdesk Frontline',
        role: 'Helpdesk DVS',
        action: 'Saringan & Eskalasi ke Tier 3 Vendor',
        comment: 'Disahkan sebagai insiden Tahap 1 (Kritikal) kerana menjejaskan kelulusan kontena di pelabuhan/lapangan terbang.'
      },
      {
        id: 'log-3',
        timestamp: '2026-10-07 09:12:00',
        author: 'Ir. Ahmad Zulkifli',
        role: 'Penyebutharga Vendor',
        action: 'Tindakan Selesai & Menunggu Pengesahan Pengadu',
        comment: 'Konfigurasi telah dikemas kini dan diuji. Menunggu pengesahan rasmi Dr. Nurul Huda sama ada permit import telah boleh diluluskan seperti biasa.'
      }
    ]
  },
  {
    id: 'DVS-HD-2026-0845',
    title: 'Ralat Pendaftaran Tag RFID Ternakan Lembu Pedaging (i-Veterinar)',
    description: 'Aplikasi mudah alih dan portal web i-Veterinar memaparkan mesej ralat "Duplikasi ID Tag Tidak Sah" semasa mengimbas cip RFID ternakan baharu di Ladang Ruminan Johor. Data tag tidak dapat disegerakkan dengan pelayan pusat DVS Putrajaya.',
    category: 'Sistem i-Veterinar',
    priority: 'TINGGI',
    status: 'SEDANG_TINDAKAN',
    createdAt: '2026-10-07 08:30:00',
    slaDeadline: '2026-10-07 09:00:00 (30 minit - Respons)',
    slaResolutionDeadline: '2026-10-07 12:30:00 (4 jam - Resolusi)',
    reportedBy: {
      name: 'En. Mohamad Faizal bin Kassim',
      staffId: 'DVS-JHR-1892',
      email: 'mfaizal@dvs.gov.my',
      phone: '013-7721839',
      branch: 'DVS Negeri Johor (Kempas)',
      department: 'Seksyen Pembangunan Komoditi Ruminan'
    },
    assignedTo: {
      name: 'Pn. Siti Mariam',
      tier: 'Tier 2 (Sokongan Teknikal DVS)',
      phone: '03-8870 2501'
    },
    channelOrigin: 'WhatsApp DVS',
    logs: [
      {
        id: 'log-10',
        timestamp: '2026-10-07 08:30:00',
        author: 'En. Mohamad Faizal bin Kassim',
        role: 'Pengadu (DVS)',
        action: 'Tiket Didaftarkan Melalui WhatsApp HelpDesk',
        comment: 'Tangkapan skrin mesej ralat telefon pintar dihantar melalui WhatsApp DVS.'
      },
      {
        id: 'log-11',
        timestamp: '2026-10-07 08:42:00',
        author: 'Pn. Siti Mariam',
        role: 'Pegawai Teknikal DVS',
        action: 'Penyelidikan Skrip Sinkronisasi',
        comment: 'Mengenal pasti skrip pangkalan data mempunyai konflik kekunci unik bagi kod siri JHR-2026.'
      }
    ]
  },
  {
    id: 'DVS-HD-2026-0840',
    title: 'Gangguan Rangkaian MyGovUC & VPN di Makmal VRI Ipoh',
    description: 'Kakitangan makmal tidak dapat mengakses pangkalan data makmal pusat dan emel rasmi kerajaan sejak 8:00 pagi. Pautan gentian optik di bilik pelayan menunjukkan lampu amaran merah.',
    category: 'Rangkaian, Internet & VPN MyGovUC',
    priority: 'TINGGI',
    status: 'SEDANG_TINDAKAN',
    createdAt: '2026-10-07 08:10:00',
    slaDeadline: '2026-10-07 08:40:00 (30 minit - Respons)',
    slaResolutionDeadline: '2026-10-07 12:10:00 (4 jam - Resolusi)',
    reportedBy: {
      name: 'Dr. Noraini binti Salleh',
      staffId: 'DVS-VRI-3310',
      email: 'noraini.salleh@dvs.gov.my',
      phone: '017-5502931',
      branch: 'Institut Penyelidikan Veterinar (VRI) Ipoh',
      department: 'Makmal Virologi & Penyelidikan Penyakit'
    },
    assignedTo: {
      name: 'En. Azman Shah',
      tier: 'Tier 2 (Sokongan Teknikal DVS)',
      phone: '012-9988112'
    },
    channelOrigin: 'Portal Web',
    logs: [
      {
        id: 'log-20',
        timestamp: '2026-10-07 08:10:00',
        author: 'Dr. Noraini binti Salleh',
        role: 'Pengadu (DVS)',
        action: 'Aduan Melalui Portal HelpDesk DVS',
        comment: 'Tiket dibuka menggunakan sambungan talian mudah alih persendirian.'
      }
    ]
  },
  {
    id: 'DVS-HD-2026-0835',
    title: 'Mesin Pengimbas Cap Jari Biometrik Gagal Berfungsi di Aras 2 Wisma Tani',
    description: 'Pengimbas biometrik kehadiran staf DVS Putrajaya terputus sambungan rangkaian dan memaparkan skrin hitam. Kakitangan terpaksa menggunakan buku log manual.',
    category: 'Sistem Biometrik & Kehadiran',
    priority: 'SEDERHANA',
    status: 'MENUNGGU_ALAT_GANTI',
    createdAt: '2026-10-06 14:15:00',
    slaDeadline: '2026-10-06 16:15:00',
    slaResolutionDeadline: '2026-10-07 14:15:00',
    reportedBy: {
      name: 'Cik Farah Nadia binti Rosli',
      staffId: 'DVS-HQ-6601',
      email: 'farah.nadia@dvs.gov.my',
      phone: '011-23098192',
      branch: 'Ibu Pejabat DVS Putrajaya (Wisma Tani)',
      department: 'Bahagian Pengurusan Sumber Manusia'
    },
    assignedTo: {
      name: 'En. Rosli Mat',
      tier: 'Tier 1 (Helpdesk Frontline)',
      phone: '03-8870 2500'
    },
    channelOrigin: 'Kaunter Walk-In',
    logs: [
      {
        id: 'log-30',
        timestamp: '2026-10-06 14:15:00',
        author: 'Cik Farah Nadia binti Rosli',
        role: 'Pengadu (DVS)',
        action: 'Laporan Diterima di Kaunter Walk-In BPM ICT Wisma Tani',
        comment: 'Pegawai hadir ke kaunter melaporkan peranti mati.'
      },
      {
        id: 'log-31',
        timestamp: '2026-10-06 15:30:00',
        author: 'En. Rosli Mat',
        role: 'Juruteknik DVS',
        action: 'Diagnosis & Permohonan Unit Bekalan Kuasa (Power Supply)',
        comment: 'Penyesuai kuasa (power adapter 12V 5A) peranti terbakar. Menunggu alat ganti gantian dari stor stor inventori.'
      }
    ]
  },
  {
    id: 'DVS-HD-2026-0820',
    title: 'Peti Masuk Emel Pegawai Bahagian Kesihatan Awam Veterinar Penuh (Quota 100%)',
    description: 'Pegawai tidak dapat menerima dokumen lampiran sijil kesihatan veterinar antarabangsa kerana kuota peti mel rasmi telah mencapai had 50GB.',
    category: 'Akaun Pengguna & Keselamatan Siber',
    priority: 'RENDAH',
    status: 'DISAHKAN_SELESAI',
    createdAt: '2026-10-05 10:20:00',
    slaDeadline: '2026-10-05 14:20:00',
    slaResolutionDeadline: '2026-10-06 10:20:00',
    reportedBy: {
      name: 'Dr. Shamsul Bahari bin Ismail',
      staffId: 'DVS-HQ-2291',
      email: 'shamsul.bahari@dvs.gov.my',
      phone: '019-3321876',
      branch: 'Ibu Pejabat DVS Putrajaya (Wisma Tani)',
      department: 'Bahagian Kesihatan Awam Veterinar'
    },
    assignedTo: {
      name: 'Pn. Rozita Zainal',
      tier: 'Tier 1 (Helpdesk Frontline)',
      phone: '03-8870 2500'
    },
    rootCauseAnalysis: 'Storan arkib MyGovUC tidak diaktifkan pada akaun pengguna menyebabkan fail lampiran lama memenuhi peti masuk utama.',
    resolutionSummary: 'Fungsi pengarkiban dalam talian (Online Archiving 100GB) telah diaktifkan dan panduan pengalihan emel lama telah dibantu melalui sesi bantuan jarak jauh.',
    resolvedAt: '2026-10-05 15:10:00',
    channelOrigin: 'Emel Rasmi',
    verification: {
      verifiedAt: '2026-10-05 16:00:00',
      verifiedBy: 'Dr. Shamsul Bahari bin Ismail',
      verifiedRole: 'Pengarah Kanan Kesihatan Awam Veterinar',
      isIssueResolved: true,
      userComments: 'Peti masuk telah lancar dan lampiran dokumen masuk tanpa sebarang ralat. Terima kasih atas tindakan pantas Meja Bantuan DVS.',
      rating: 5,
      digitalSignature: 'DVS-DIGISIGN-VERIFIED-2026-SHAMSUL'
    },
    logs: [
      {
        id: 'log-40',
        timestamp: '2026-10-05 10:20:00',
        author: 'Dr. Shamsul Bahari bin Ismail',
        role: 'Pengadu (DVS)',
        action: 'Emel Aduan Diterima di helpdesk.ict@dvs.gov.my'
      },
      {
        id: 'log-41',
        timestamp: '2026-10-05 15:10:00',
        author: 'Pn. Rozita Zainal',
        role: 'Helpdesk Frontline',
        action: 'Selesai Konfigurasi Arkib'
      },
      {
        id: 'log-42',
        timestamp: '2026-10-05 16:00:00',
        author: 'Dr. Shamsul Bahari bin Ismail',
        role: 'Pengadu (DVS)',
        action: 'Pengesahan Rasmi Masalah Selesai (5 Bintang)',
        comment: 'Pengadu mengesahkan isu telah diselesaikan sepenuhnya.'
      }
    ]
  }
];
