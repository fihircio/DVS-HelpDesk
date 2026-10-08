import React, { useState, useMemo } from 'react';
import { 
  HelpdeskTicket, 
  TicketStatus, 
  TicketPriority, 
  SystemCategory 
} from '../types/helpdesk';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileCheck2, 
  Printer, 
  Wrench, 
  Eye, 
  X,
  HelpCircle,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Inbox,
  UserCheck,
  Flame,
  Info,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface TicketListProps {
  tickets: HelpdeskTicket[];
  activeRole: 'pengadu' | 'juruteknik' | 'pentadbir';
  onSelectTicket: (ticket: HelpdeskTicket) => void;
  onVerifyTicket: (ticket: HelpdeskTicket) => void;
  onTechnicianAction: (ticket: HelpdeskTicket) => void;
  onPrintSlip: (ticket: HelpdeskTicket) => void;
  onBulkUpdateStatus?: (ticketIds: string[], newStatus: TicketStatus) => void;
  onBulkUpdatePriority?: (ticketIds: string[], newPriority: TicketPriority) => void;
}

// Filter key options including consolidated technician statuses
type FilterStatusOption = 
  | 'ALL' 
  | 'PENDING_ALL' 
  | 'BARU' 
  | 'SEDANG_TINDAKAN' 
  | 'MENUNGGU_ALAT_GANTI' 
  | 'MENUNGGU_PENGESAHAN' 
  | 'RESOLVED';

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  activeRole,
  onSelectTicket,
  onVerifyTicket,
  onTechnicianAction,
  onPrintSlip,
  onBulkUpdateStatus,
  onBulkUpdatePriority,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FilterStatusOption>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [technicianFilterOnly, setTechnicianFilterOnly] = useState<boolean>(false);

  // Checkbox selection state for bulk actions
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [bulkStatusToApply, setBulkStatusToApply] = useState<string>('');
  const [bulkPriorityToApply, setBulkPriorityToApply] = useState<string>('');

  // Statistics & counts for status filters
  const stats = useMemo(() => {
    const total = tickets.length;
    const baruCount = tickets.filter(t => t.status === 'BARU').length;
    const inProgressCount = tickets.filter(t => t.status === 'SEDANG_TINDAKAN').length;
    const waitingPartsCount = tickets.filter(t => t.status === 'MENUNGGU_ALAT_GANTI').length;
    const pendingVerificationCount = tickets.filter(t => t.status === 'MENUNGGU_PENGESAHAN').length;
    const resolvedCount = tickets.filter(t => t.status === 'DISAHKAN_SELESAI').length;
    const criticalCount = tickets.filter(t => t.priority === 'KRITIKAL').length;
    
    // Overall pending (all unclosed tickets needing attention)
    const pendingAllCount = tickets.filter(
      t => t.status !== 'DISAHKAN_SELESAI' && t.status !== 'DITOLAK'
    ).length;

    return { 
      total, 
      baruCount, 
      inProgressCount, 
      waitingPartsCount, 
      pendingVerificationCount, 
      resolvedCount, 
      criticalCount,
      pendingAllCount
    };
  }, [tickets]);

  // Filtered tickets based on search, status, priority, category and quick toggles
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Search matching across ID, title, description, reporter, branch, category, technician name
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        t.id.toLowerCase().includes(query) ||
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.reportedBy.name.toLowerCase().includes(query) ||
        t.reportedBy.staffId.toLowerCase().includes(query) ||
        t.reportedBy.branch.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        (t.assignedTo && t.assignedTo.name.toLowerCase().includes(query));

      // Status filtering logic (supporting aggregated 'PENDING_ALL' and 'RESOLVED')
      let matchesStatus = true;
      if (selectedStatus === 'ALL') {
        matchesStatus = true;
      } else if (selectedStatus === 'PENDING_ALL') {
        matchesStatus = t.status !== 'DISAHKAN_SELESAI' && t.status !== 'DITOLAK';
      } else if (selectedStatus === 'RESOLVED') {
        matchesStatus = t.status === 'DISAHKAN_SELESAI';
      } else {
        matchesStatus = t.status === selectedStatus;
      }

      // Priority filter
      const matchesPriority = selectedPriority === 'ALL' || t.priority === selectedPriority;

      // Category filter
      const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;

      // Quick toggle for tickets assigned to technician
      const matchesTechOnly = !technicianFilterOnly || (t.assignedTo !== undefined);

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesTechOnly;
    });
  }, [tickets, searchQuery, selectedStatus, selectedPriority, selectedCategory, technicianFilterOnly]);

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedStatus !== 'ALL' || 
    selectedPriority !== 'ALL' || 
    selectedCategory !== 'ALL' ||
    technicianFilterOnly;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedStatus('ALL');
    setSelectedPriority('ALL');
    setSelectedCategory('ALL');
    setTechnicianFilterOnly(false);
  };

  // Export to CSV for administrators and technicians
  const handleExportCSV = () => {
    if (filteredTickets.length === 0) {
      alert('Tiada rekod tiket untuk dieksport.');
      return;
    }

    const headers = [
      'No. Tiket',
      'Tajuk Aduan',
      'Kategori Sistem',
      'Tahap Keutamaan',
      'Status Semasa',
      'Tarikh Didaftarkan',
      'SLA Respons Pertama',
      'SLA Sasaran Resolusi',
      'Nama Pengadu',
      'ID Staf Pengadu',
      'Emel Pengadu',
      'Telefon Pengadu',
      'Cawangan DVS',
      'Bahagian',
      'Saluran Pendaftaran',
      'Juruteknik Bertugas',
      'Peringkat Sokongan (Tier)',
      'Punca Masalah (RCA)',
      'Ringkasan Penyelesaian',
      'Tarikh Selesai',
      'Status Pengesahan Pengadu',
      'Skor Penilaian CSAT',
      'Disahkan Oleh',
      'Tarikh Pengesahan',
      'Ulasan Pengesahan'
    ];

    const escapeCSV = (val: string | number | undefined | null) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = filteredTickets.map((t) => [
      escapeCSV(t.id),
      escapeCSV(t.title),
      escapeCSV(t.category),
      escapeCSV(t.priority),
      escapeCSV(t.status.replace('_', ' ')),
      escapeCSV(t.createdAt),
      escapeCSV(t.slaDeadline),
      escapeCSV(t.slaResolutionDeadline),
      escapeCSV(t.reportedBy.name),
      escapeCSV(t.reportedBy.staffId),
      escapeCSV(t.reportedBy.email),
      escapeCSV(t.reportedBy.phone),
      escapeCSV(t.reportedBy.branch),
      escapeCSV(t.reportedBy.department),
      escapeCSV(t.channelOrigin),
      escapeCSV(t.assignedTo?.name || 'Belum Ditugaskan'),
      escapeCSV(t.assignedTo?.tier || '-'),
      escapeCSV(t.rootCauseAnalysis || '-'),
      escapeCSV(t.resolutionSummary || '-'),
      escapeCSV(t.resolvedAt || '-'),
      escapeCSV(t.verification?.isIssueResolved ? 'Disahkan Selesai' : t.status === 'MENUNGGU_PENGESAHAN' ? 'Menunggu Pengesahan' : 'Belum Disahkan'),
      escapeCSV(t.verification?.rating ? `${t.verification.rating} Bintang` : '-'),
      escapeCSV(t.verification?.verifiedBy || '-'),
      escapeCSV(t.verification?.verifiedAt || '-'),
      escapeCSV(t.verification?.userComments || '-')
    ].join(','));

    // UTF-8 BOM (\uFEFF) for Microsoft Excel compatibility with Malay text
    const csvContent = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestampStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Tiket_HelpDesk_DVS_${timestampStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Selection helpers for bulk operations
  const allFilteredIds = useMemo(() => filteredTickets.map(t => t.id), [filteredTickets]);
  const isAllSelected = allFilteredIds.length > 0 && allFilteredIds.every(id => selectedTicketIds.includes(id));
  const isSomeSelected = selectedTicketIds.some(id => allFilteredIds.includes(id)) && !isAllSelected;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedTicketIds(prev => prev.filter(id => !allFilteredIds.includes(id)));
    } else {
      setSelectedTicketIds(prev => Array.from(new Set([...prev, ...allFilteredIds])));
    }
  };

  const toggleSelectOne = (ticketId: string) => {
    setSelectedTicketIds(prev => 
      prev.includes(ticketId) ? prev.filter(id => id !== ticketId) : [...prev, ticketId]
    );
  };

  const handleBulkMarkResolved = () => {
    if (selectedTicketIds.length === 0) return;
    if (onBulkUpdateStatus) {
      onBulkUpdateStatus(selectedTicketIds, 'DISAHKAN_SELESAI');
      setSelectedTicketIds([]);
    }
  };

  const handleBulkChangeStatus = (status: TicketStatus) => {
    if (selectedTicketIds.length === 0) return;
    if (onBulkUpdateStatus) {
      onBulkUpdateStatus(selectedTicketIds, status);
      setSelectedTicketIds([]);
      setBulkStatusToApply('');
    }
  };

  const handleBulkChangePriority = (priority: TicketPriority) => {
    if (selectedTicketIds.length === 0) return;
    if (onBulkUpdatePriority) {
      onBulkUpdatePriority(selectedTicketIds, priority);
      setSelectedTicketIds([]);
      setBulkPriorityToApply('');
    }
  };

  const getPriorityLabel = (p: TicketPriority) => {
    switch (p) {
      case 'KRITIKAL':
        return { label: 'Tahap 1: Kritikal (Critical)', color: 'text-rose-700 font-bold' };
      case 'TINGGI':
        return { label: 'Tahap 2: Tinggi (High)', color: 'text-amber-700 font-semibold' };
      case 'SEDERHANA':
        return { label: 'Tahap 3: Sederhana (Medium)', color: 'text-blue-700 font-medium' };
      case 'RENDAH':
        return { label: 'Tahap 4: Rendah (Low)', color: 'text-slate-600' };
    }
  };

  const getPriorityBadge = (p: TicketPriority) => {
    switch (p) {
      case 'KRITIKAL':
        return {
          label: 'Kritikal (Critical)',
          slaText: 'SLA < 2j',
          bg: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
          borderLeft: 'border-l-4 border-l-rose-600',
          icon: <Flame className="w-3.5 h-3.5 text-rose-600 shrink-0" />
        };
      case 'TINGGI':
        return {
          label: 'Tinggi (High)',
          slaText: 'SLA < 4j',
          bg: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold',
          borderLeft: 'border-l-4 border-l-amber-500',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        };
      case 'SEDERHANA':
        return {
          label: 'Sederhana (Medium)',
          slaText: 'SLA < 8j',
          bg: 'bg-blue-100 text-blue-800 border-blue-200 font-medium',
          borderLeft: 'border-l-4 border-l-blue-400',
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        };
      case 'RENDAH':
        return {
          label: 'Rendah (Low)',
          slaText: 'SLA < 24j',
          bg: 'bg-slate-100 text-slate-700 border-slate-200 font-normal',
          borderLeft: 'border-l-4 border-l-slate-300',
          icon: <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        };
    }
  };

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'BARU':
        return { text: 'Aduan Baru (New)', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'DISARING':
        return { text: 'Sedang Disaring', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'SEDANG_TINDAKAN':
        return { text: 'Sedang Tindakan (In Progress)', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'MENUNGGU_ALAT_GANTI':
        return { text: 'Menunggu Alat Ganti', bg: 'bg-orange-50 text-orange-800 border-orange-200' };
      case 'MENUNGGU_PENGESAHAN':
        return { text: 'Menunggu Pengesahan Pengadu (Pending Verification)', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold animate-pulse' };
      case 'DISAHKAN_SELESAI':
        return { text: 'Disahkan Selesai (Resolved)', bg: 'bg-slate-100 text-slate-700 border-slate-300' };
      case 'DITOLAK':
        return { text: 'Ditolak / Batal', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div 
          onClick={() => setSelectedStatus('ALL')}
          className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
            selectedStatus === 'ALL'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <span className={`text-xs block ${selectedStatus === 'ALL' ? 'text-slate-300' : 'text-slate-500'}`}>
            Jumlah Semua Tiket
          </span>
          <div className="text-2xl font-bold font-mono tabular-nums mt-0.5">
            {stats.total}
          </div>
          <span className={`text-[11px] block ${selectedStatus === 'ALL' ? 'text-slate-300' : 'text-slate-400'}`}>
            Pangkalan Aduan DVS
          </span>
        </div>

        <div 
          onClick={() => setSelectedStatus('PENDING_ALL')}
          className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
            selectedStatus === 'PENDING_ALL'
              ? 'bg-blue-800 text-white border-blue-800 shadow-xs'
              : 'bg-white text-slate-900 border-blue-200 hover:border-blue-300 bg-blue-50/20 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${selectedStatus === 'PENDING_ALL' ? 'text-blue-100' : 'text-blue-800'}`}>
              Pending (Semua Belum Selesai)
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums mt-0.5 ${selectedStatus === 'PENDING_ALL' ? 'text-white' : 'text-blue-700'}`}>
            {stats.pendingAllCount}
          </div>
          <span className={`text-[11px] block ${selectedStatus === 'PENDING_ALL' ? 'text-blue-200' : 'text-blue-600'}`}>
            Perlukan Tindakan Teknikal
          </span>
        </div>

        <div 
          onClick={() => setSelectedStatus('MENUNGGU_PENGESAHAN')}
          className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
            selectedStatus === 'MENUNGGU_PENGESAHAN'
              ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
              : 'bg-white text-slate-900 border-amber-200 hover:border-amber-300 bg-amber-50/30 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${selectedStatus === 'MENUNGGU_PENGESAHAN' ? 'text-amber-100' : 'text-amber-800'}`}>
              Menunggu Pengesahan DVS
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums mt-0.5 ${selectedStatus === 'MENUNGGU_PENGESAHAN' ? 'text-white' : 'text-amber-700'}`}>
            {stats.pendingVerificationCount}
          </div>
          <span className={`text-[11px] block ${selectedStatus === 'MENUNGGU_PENGESAHAN' ? 'text-amber-200' : 'text-amber-600'}`}>
            Pending User Verification
          </span>
        </div>

        <div 
          onClick={() => setSelectedStatus('RESOLVED')}
          className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
            selectedStatus === 'RESOLVED'
              ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
              : 'bg-white text-slate-900 border-emerald-200 hover:border-emerald-300 bg-emerald-50/20 shadow-2xs'
          }`}
        >
          <span className={`text-xs block ${selectedStatus === 'RESOLVED' ? 'text-emerald-100' : 'text-emerald-800 font-semibold'}`}>
            Resolved (Disahkan Selesai)
          </span>
          <div className={`text-2xl font-bold font-mono tabular-nums mt-0.5 ${selectedStatus === 'RESOLVED' ? 'text-white' : 'text-emerald-700'}`}>
            {stats.resolvedCount}
          </div>
          <span className={`text-[11px] block ${selectedStatus === 'RESOLVED' ? 'text-emerald-200' : 'text-emerald-600'}`}>
            Tiket Ditutup Rasmi
          </span>
        </div>

        <div 
          onClick={() => {
            setSelectedPriority(selectedPriority === 'KRITIKAL' ? 'ALL' : 'KRITIKAL');
          }}
          className={`p-3.5 rounded-lg border transition-all cursor-pointer col-span-2 md:col-span-1 ${
            selectedPriority === 'KRITIKAL'
              ? 'bg-rose-800 text-white border-rose-800 shadow-xs'
              : 'bg-white text-slate-900 border-rose-200 hover:border-rose-300 shadow-2xs'
          }`}
        >
          <span className={`text-xs font-semibold block ${selectedPriority === 'KRITIKAL' ? 'text-rose-100' : 'text-rose-700'}`}>
            Insiden Kritikal (Tahap 1)
          </span>
          <div className={`text-2xl font-bold font-mono tabular-nums mt-0.5 ${selectedPriority === 'KRITIKAL' ? 'text-white' : 'text-rose-700'}`}>
            {stats.criticalCount}
          </div>
          <span className={`text-[11px] block ${selectedPriority === 'KRITIKAL' ? 'text-rose-200' : 'text-rose-600'}`}>
            SLA Ketat (&lt; 2 Jam)
          </span>
        </div>
      </div>

      {/* Tender Context Notice Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-start sm:items-center gap-2.5">
          <FileCheck2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <span className="font-bold text-emerald-900">
              Modul Pengesahan Masalah (Syarat Perkhidmatan HelpDesk DVS):
            </span>{' '}
            Setiap aduan yang telah diselesaikan oleh juruteknik wajib disahkan oleh pengadu/pegawai DVS melalui borang pengesahan masalah dan penilaian CSAT sebelum tiket ditutup rasmi.
          </div>
        </div>

        {activeRole === 'pengadu' && stats.pendingVerificationCount > 0 && (
          <button
            onClick={() => {
              const pendingTicket = tickets.find(t => t.status === 'MENUNGGU_PENGESAHAN');
              if (pendingTicket) onVerifyTicket(pendingTicket);
            }}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sahkan Aduan Sekarang</span>
          </button>
        )}
      </div>

      {/* Comprehensive Search & Status Filter Panel */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-4">
        {/* Top Search Bar & Secondary Dropdowns */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Enhanced Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari No. Tiket (cth: DVS-HD-2026-0842), Kata Kunci Masalah, Pengadu, Cawangan DVS, atau Juruteknik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Kosongkan carian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Selects */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="ALL">Semua Tahap Kritikal</option>
              <option value="KRITIKAL">Tahap 1: Kritikal</option>
              <option value="TINGGI">Tahap 2: Tinggi</option>
              <option value="SEDERHANA">Tahap 3: Sederhana</option>
              <option value="RENDAH">Tahap 4: Rendah</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 max-w-[210px] truncate"
            >
              <option value="ALL">Semua Kategori Sistem</option>
              <option value="Sistem e-Permit DVS">Sistem e-Permit DVS</option>
              <option value="Sistem i-Veterinar">Sistem i-Veterinar</option>
              <option value="Sistem eVet & e-Diagnosis">Sistem eVet & e-Diagnosis</option>
              <option value="Sistem Pengurusan Makmal (VRI / MKA)">Sistem Pengurusan Makmal</option>
              <option value="Rangkaian, Internet & VPN MyGovUC">Rangkaian MyGovUC & VPN</option>
              <option value="Perkakasan Komputer & Pencetak">Perkakasan & Komputer</option>
              <option value="Sistem Biometrik & Kehadiran">Sistem Biometrik</option>
              <option value="Akaun Pengguna & Keselamatan Siber">Akaun & Keselamatan Siber</option>
            </select>

            {/* Export to CSV Button in Filter Bar */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
              title="Muat turun rekod aduan semasa ke fail CSV (Excel)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export to CSV ({filteredTickets.length})</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
                title="Set semula semua tapisan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Set Semula</span>
              </button>
            )}
          </div>
        </div>

        {/* Status-Based Filtering Bar (Dedicated segmented buttons for technicians) */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-emerald-600" />
              <span>Tapisan Status Tiket (Status-Based Filters):</span>
            </span>

            {/* Technician View Toggle */}
            <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={technicianFilterOnly}
                onChange={(e) => setTechnicianFilterOnly(e.target.checked)}
                className="text-emerald-600 rounded"
              />
              <span>Hanya tiket telah ditugaskan kepada juruteknik</span>
            </label>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { 
                id: 'ALL' as FilterStatusOption, 
                label: 'Semua Tiket (All)', 
                count: stats.total,
                highlightColor: 'bg-slate-900 text-white'
              },
              { 
                id: 'PENDING_ALL' as FilterStatusOption, 
                label: 'Pending (Belum Selesai)', 
                count: stats.pendingAllCount,
                highlightColor: 'bg-blue-700 text-white'
              },
              { 
                id: 'MENUNGGU_PENGESAHAN' as FilterStatusOption, 
                label: 'Menunggu Pengesahan (Pending Verification)', 
                count: stats.pendingVerificationCount,
                highlightColor: 'bg-amber-600 text-white'
              },
              { 
                id: 'SEDANG_TINDAKAN' as FilterStatusOption, 
                label: 'Sedang Tindakan (In Progress)', 
                count: stats.inProgressCount,
                highlightColor: 'bg-amber-700 text-white'
              },
              { 
                id: 'BARU' as FilterStatusOption, 
                label: 'Tiket Baru (New)', 
                count: stats.baruCount,
                highlightColor: 'bg-indigo-700 text-white'
              },
              { 
                id: 'RESOLVED' as FilterStatusOption, 
                label: 'Resolved (Disahkan Selesai)', 
                count: stats.resolvedCount,
                highlightColor: 'bg-emerald-700 text-white'
              },
              { 
                id: 'MENUNGGU_ALAT_GANTI' as FilterStatusOption, 
                label: 'Menunggu Alat Ganti', 
                count: stats.waitingPartsCount,
                highlightColor: 'bg-orange-700 text-white'
              },
            ].map((item) => {
              const isActive = selectedStatus === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedStatus(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? `${item.highlightColor} shadow-2xs`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.id === 'MENUNGGU_PENGESAHAN' && item.count > 0
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Summary Strip */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400">Tapisan aktif:</span>
              {searchQuery && (
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-medium">
                  Carian: "{searchQuery}"
                </span>
              )}
              {selectedStatus !== 'ALL' && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                  Status: {selectedStatus === 'PENDING_ALL' ? 'Pending (Semua Belum Selesai)' : selectedStatus === 'RESOLVED' ? 'Resolved (Selesai)' : selectedStatus.replace('_', ' ')}
                </span>
              )}
              {selectedPriority !== 'ALL' && (
                <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-medium">
                  Keutamaan: {selectedPriority}
                </span>
              )}
              {selectedCategory !== 'ALL' && (
                <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-medium">
                  Kategori: {selectedCategory}
                </span>
              )}
              {technicianFilterOnly && (
                <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-medium">
                  Ditugaskan Sahaja
                </span>
              )}
            </div>

            <span className="font-mono text-emerald-800 font-bold tabular-nums">
              {filteredTickets.length} rekod dipadankan
            </span>
          </div>
        )}
      </div>

      {/* Floating / Sticky Bulk Actions Toolbar for Technicians & Admins */}
      {selectedTicketIds.length > 0 && (
        <div className="sticky top-20 z-30 bg-slate-900 text-white p-3 md:p-3.5 rounded-lg shadow-xl border border-slate-700 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-md font-mono tabular-nums shadow-xs">
              {selectedTicketIds.length} tiket dipilih
            </span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline">
              Tindakan Berkelompok (Bulk Actions):
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Button: Mark as Resolved */}
            <button
              type="button"
              onClick={handleBulkMarkResolved}
              className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
              title="Tandakan semua tiket yang dipilih sebagai Selesai (Mark as Resolved)"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tandakan Selesai (Mark as Resolved)</span>
            </button>

            {/* Quick Dropdown: Update Status */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700">
              <span className="text-[11px] text-slate-400 pl-1 hidden lg:inline">Tukar Status:</span>
              <select
                value={bulkStatusToApply}
                onChange={(e) => {
                  const val = e.target.value as TicketStatus;
                  if (val) {
                    setBulkStatusToApply(val);
                    handleBulkChangeStatus(val);
                  }
                }}
                className="text-xs bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="">Pilih Status...</option>
                <option value="DISAHKAN_SELESAI">Selesai (Resolved)</option>
                <option value="SEDANG_TINDAKAN">Sedang Tindakan (In Progress)</option>
                <option value="MENUNGGU_PENGESAHAN">Mohon Pengesahan Pengadu</option>
                <option value="MENUNGGU_ALAT_GANTI">Menunggu Alat Ganti</option>
                <option value="BARU">Aduan Baru (New)</option>
                <option value="DITOLAK">Ditolak / Batal</option>
              </select>
            </div>

            {/* Quick Dropdown: Update Priority */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700">
              <span className="text-[11px] text-slate-400 pl-1 hidden lg:inline">Tukar Keutamaan:</span>
              <select
                value={bulkPriorityToApply}
                onChange={(e) => {
                  const val = e.target.value as TicketPriority;
                  if (val) {
                    setBulkPriorityToApply(val);
                    handleBulkChangePriority(val);
                  }
                }}
                className="text-xs bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="">Pilih Keutamaan...</option>
                <option value="KRITIKAL">Tahap 1: Kritikal (Critical)</option>
                <option value="TINGGI">Tahap 2: Tinggi (High)</option>
                <option value="SEDERHANA">Tahap 3: Sederhana (Medium)</option>
                <option value="RENDAH">Tahap 4: Rendah (Low)</option>
              </select>
            </div>

            {/* Deselect All */}
            <button
              type="button"
              onClick={() => setSelectedTicketIds([])}
              className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            >
              Batal Pilihan
            </button>
          </div>
        </div>
      )}

      {/* Tickets Table / List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            {/* Master Select-All Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800 select-none">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isSomeSelected;
                }}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <span>Pilih Semua</span>
            </label>

            <span className="text-slate-300 hidden sm:inline">|</span>

            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Senarai Rekod Aduan & Status Pengesahan DVS
            </h2>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              ({filteredTickets.length} daripada {tickets.length} rekod)
            </span>
            <button
              onClick={handleExportCSV}
              className="ml-1 px-2 py-0.5 text-[11px] font-medium text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-100 border border-slate-200 rounded transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer"
              title="Eksport rekod semasa ke fail CSV"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Visual Priority Legend for Quick Scanning */}
          <div className="flex items-center gap-2.5 text-[11px] text-slate-600 overflow-x-auto">
            <span className="text-slate-400 font-medium">Petunjuk:</span>
            <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              Kritikal (&lt;2j)
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Tinggi (&lt;4j)
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Sederhana (&lt;8j)
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              Rendah (&lt;24j)
            </span>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Tiada Tiket Memenuhi Kriteria
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {searchQuery || selectedStatus !== 'ALL' || selectedPriority !== 'ALL'
                  ? 'Tiada aduan sepadan dengan carian atau penapis status yang dipilih. Sila kosongkan penapis untuk melihat semua tiket.'
                  : 'Tiada aduan dalam sistem pada masa ini.'}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
              >
                Kosongkan Semua Tapisan
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTickets.map((ticket) => {
              const priorityInfo = getPriorityLabel(ticket.priority);
              const priorityBadge = getPriorityBadge(ticket.priority);
              const statusBadge = getStatusBadge(ticket.status);
              const isPendingVerification = ticket.status === 'MENUNGGU_PENGESAHAN';
              const isSelected = selectedTicketIds.includes(ticket.id);

              return (
                <div
                  key={ticket.id}
                  className={`p-4 transition-colors hover:bg-slate-50/80 ${priorityBadge.borderLeft} ${
                    isSelected 
                      ? 'bg-emerald-50/30 ring-1 ring-emerald-500/50' 
                      : isPendingVerification 
                      ? 'bg-amber-50/20' 
                      : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    {/* Main Ticket Info with Selection Checkbox */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Card Checkbox */}
                      <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(ticket.id)}
                          className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer transition-transform hover:scale-105"
                          title={`Pilih tiket ${ticket.id}`}
                        />
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Priority Badge & Metadata Strip */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          {/* Visual Priority Badge */}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border shrink-0 ${priorityBadge.bg}`}>
                            {priorityBadge.icon}
                            <span>{priorityBadge.label}</span>
                            <span className="font-mono text-[10px] opacity-80 tabular-nums">({priorityBadge.slaText})</span>
                          </span>

                          <span className="font-mono font-bold text-slate-900 tabular-nums">
                            {ticket.id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-slate-700">
                            {ticket.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500">
                            Saluran: {ticket.channelOrigin}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums text-slate-400">
                            {ticket.createdAt}
                          </span>
                        </div>

                      {/* Ticket Title */}
                      <h3 className="text-sm font-bold text-slate-900 hover:text-emerald-800 cursor-pointer transition-colors"
                          onClick={() => onSelectTicket(ticket)}>
                        {ticket.title}
                      </h3>

                      {/* Description preview */}
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {ticket.description}
                      </p>

                      {/* Reporter & SLA row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                        <div>
                          <span className="text-slate-400">Pengadu:</span>{' '}
                          <span className="font-medium text-slate-700">{ticket.reportedBy.name}</span>{' '}
                          <span className="text-slate-400">({ticket.reportedBy.branch})</span>
                        </div>

                        {ticket.assignedTo && (
                          <div>
                            <span className="text-slate-400">Ditugaskan Kepada:</span>{' '}
                            <span className="font-medium text-slate-700">{ticket.assignedTo.name}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>SLA Resolusi:</span>
                          <span className="font-mono font-medium text-slate-700 tabular-nums">
                            {ticket.slaResolutionDeadline}
                          </span>
                        </div>
                      </div>

                      {/* Verification Status Banner if already verified */}
                      {ticket.verification?.isIssueResolved && (
                        <div className="mt-2 text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 rounded p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>
                              <strong>Pengesahan Berjaya:</strong> Disahkan selesai oleh {ticket.verification.verifiedBy} pada {ticket.verification.verifiedAt}
                            </span>
                          </div>
                          {ticket.verification.rating && (
                            <div className="flex items-center gap-1 text-amber-700 font-semibold font-mono">
                              <span>Skor CSAT: {ticket.verification.rating}/5 ★</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                    {/* Actions and Status Column */}
                    <div className="flex flex-row lg:flex-col items-end justify-between lg:justify-center gap-2 shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0">
                      {/* Status indicator */}
                      <div className={`px-2.5 py-1 text-xs font-medium rounded border ${statusBadge.bg}`}>
                        {statusBadge.text}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        {/* Verification Button (Special priority for pending verification) */}
                        {isPendingVerification && (
                          <button
                            onClick={() => onVerifyTicket(ticket)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded transition-colors flex items-center gap-1.5 shadow-2xs"
                            title="Buka borang pengesahan masalah DVS"
                          >
                            <FileCheck2 className="w-3.5 h-3.5" />
                            <span>Sahkan Masalah</span>
                          </button>
                        )}

                        {/* Technician Action Button */}
                        {(activeRole === 'juruteknik' || activeRole === 'pentadbir') && (
                          <button
                            onClick={() => onTechnicianAction(ticket)}
                            className="px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors flex items-center gap-1"
                            title="Kemas kini tindakan teknikal & saringan"
                          >
                            <Wrench className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Tindakan</span>
                          </button>
                        )}

                        {/* Print Official Slip */}
                        <button
                          onClick={() => onPrintSlip(ticket)}
                          className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1"
                          title="Cetak Slip Rasmi Aduan & Pengesahan DVS"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-600" />
                          <span className="hidden sm:inline">Slip</span>
                        </button>

                        {/* View Audit / Details */}
                        <button
                          onClick={() => onSelectTicket(ticket)}
                          className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded border border-slate-200 transition-colors flex items-center gap-1"
                          title="Lihat Butiran Penuh & Log Kronologi"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Butiran</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
