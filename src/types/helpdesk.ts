/**
 * Struktur Data & Jenis bagi Sistem HelpDesk Jabatan Perkhidmatan Veterinar (DVS)
 */

export type TicketPriority = 'KRITIKAL' | 'TINGGI' | 'SEDERHANA' | 'RENDAH';

export type TicketStatus = 
  | 'BARU'
  | 'DISARING'
  | 'SEDANG_TINDAKAN'
  | 'MENUNGGU_ALAT_GANTI'
  | 'MENUNGGU_PENGESAHAN'
  | 'DISAHKAN_SELESAI'
  | 'DITOLAK';

export type SystemCategory =
  | 'Sistem e-Permit DVS'
  | 'Sistem i-Veterinar'
  | 'Sistem eVet & e-Diagnosis'
  | 'Sistem Pengurusan Makmal (VRI / MKA)'
  | 'Rangkaian, Internet & VPN MyGovUC'
  | 'Perkakasan Komputer & Pencetak'
  | 'Sistem Biometrik & Kehadiran'
  | 'Akaun Pengguna & Keselamatan Siber';

export type DVSBranch =
  | 'Ibu Pejabat DVS Putrajaya (Wisma Tani)'
  | 'DVS Negeri Selangor (Shah Alam)'
  | 'DVS Negeri Johor (Kempas)'
  | 'DVS Negeri Perak (Ipoh)'
  | 'DVS Negeri Pulau Pinang (Bukit Tengah)'
  | 'DVS Negeri Pahang (Kuantan)'
  | 'DVS Negeri Terengganu (Kuala Terengganu)'
  | 'DVS Negeri Kelantan (Kota Bharu)'
  | 'DVS Negeri Kedah (Alor Setar)'
  | 'DVS Negeri Melaka (Ayer Keroh)'
  | 'DVS Negeri Sembilan (Seremban)'
  | 'DVS Negeri Perlis (Kangar)'
  | 'Institut Penyelidikan Veterinar (VRI) Ipoh'
  | 'Stesen Kuarantin Haiwan KLIA (Sepang)'
  | 'Pusat Inseminasi Buatan Jerantut';

export interface TicketLog {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  action: string;
  comment?: string;
}

export interface VerificationDetails {
  verifiedAt?: string;
  verifiedBy?: string;
  verifiedRole?: string;
  isIssueResolved: boolean;
  userComments?: string;
  rating?: number; // 1 to 5 stars
  digitalSignature?: string;
}

export interface HelpdeskTicket {
  id: string; // e.g. DVS-HD-2026-1042
  title: string;
  description: string;
  category: SystemCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  slaDeadline: string;
  slaResolutionDeadline: string;
  reportedBy: {
    name: string;
    staffId: string;
    email: string;
    phone: string;
    branch: DVSBranch;
    department: string;
  };
  assignedTo?: {
    name: string;
    tier: 'Tier 1 (Helpdesk Frontline)' | 'Tier 2 (Sokongan Teknikal DVS)' | 'Tier 3 (Penyebutharga Vendor Sistem)';
    phone: string;
  };
  rootCauseAnalysis?: string;
  resolutionSummary?: string;
  resolvedAt?: string;
  verification?: VerificationDetails;
  channelOrigin: 'Portal Web' | 'Talian Hotline' | 'WhatsApp DVS' | 'Emel Rasmi' | 'Kaunter Walk-In';
  logs: TicketLog[];
}

export interface ChannelInfo {
  id: string;
  name: string;
  iconName: string;
  description: string;
  channelAddress: string;
  operatingHoursText: string;
  operatingDaysText: string;
  slaResponse: string;
  specialConditions: string;
  status: 'Aktif' | 'Waktu Operasi Sahaja' | '24/7 Tersedia';
  supportType: 'Automasi & Manusia' | 'Panggilan Suara' | 'Pesej Interaktif' | 'Fizikal Bersemuka';
}
