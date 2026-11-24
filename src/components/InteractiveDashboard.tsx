import { useMemo, useState } from 'react';
import {
  LayoutGrid,
  Building2,
  Users,
  FileText,
  Receipt,
  Wrench,
  BarChart3,
  Settings,
  Search,
  Plus,
  Bell,
  Bookmark,
  Check,
  X,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  CASHFLOW_MONTHS,
  INITIAL_DASHBOARD_INVOICES,
  INITIAL_DASHBOARD_TICKETS,
} from '../data/tenantyContent';

interface InvoiceItem {
  id: number;
  tenant: string;
  unit: string;
  amount: number;
  status: 'overdue' | 'due';
  days: number;
}

interface TicketItem {
  id: number;
  title: string;
  unit: string;
  priority: 'High' | 'Medium' | 'Low';
}

type ActionModalType = null | 'invoice' | 'tenant' | 'expense' | 'ticket' | 'boardpack';

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Properties', icon: Building2 },
  { label: 'Tenants', icon: Users },
  { label: 'Leases', icon: FileText },
  { label: 'Invoices', icon: Receipt },
  { label: 'Maintenance', icon: Wrench },
  { label: 'Reports', icon: BarChart3 },
];

export function InteractiveDashboard({
  variant = 'option2',
}: {
  variant?: 'option1' | 'option2' | 'option3';
}) {
  const isOpt1 = variant === 'option1';
  const isOpt3 = variant === 'option3';
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [collected, setCollected] = useState(4200);
  const [expenses, setExpenses] = useState(780);
  const [occupiedUnits, setOccupiedUnits] = useState(8);
  const [totalUnits, setTotalUnits] = useState(11);
  const [resolvedTickets, setResolvedTickets] = useState(12);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_DASHBOARD_INVOICES);
  const [tickets, setTickets] = useState<TicketItem[]>(INITIAL_DASHBOARD_TICKETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionModal, setActionModal] = useState<ActionModalType>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Modal form fields
  const [formTenant, setFormTenant] = useState('');
  const [formUnit, setFormUnit] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formPriority, setFormPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [formError, setFormError] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const pendingTotal = useMemo(
    () => invoices.filter((i) => i.status === 'due').reduce((s, i) => s + i.amount, 0),
    [invoices]
  );

  const overdueTotal = useMemo(
    () => invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
    [invoices]
  );

  const stillToCollect = pendingTotal + overdueTotal;
  const totalInvoiced = collected + stillToCollect;
  const collectionPct = totalInvoiced > 0 ? Math.round((collected / totalInvoiced) * 100) : 100;
  const occupancyPct = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  const vacantUnits = Math.max(0, totalUnits - occupiedUnits);
  const totalTicketsCount = resolvedTickets + tickets.length;

  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return invoices;
    return invoices.filter(
      (i) => i.tenant.toLowerCase().includes(q) || i.unit.toLowerCase().includes(q)
    );
  }, [invoices, searchQuery]);

  const filteredTickets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tickets;
    return tickets.filter(
      (t) => t.title.toLowerCase().includes(q) || t.unit.toLowerCase().includes(q)
    );
  }, [tickets, searchQuery]);

  const chartData = useMemo(() => {
    return CASHFLOW_MONTHS.map((m, idx) =>
      idx === CASHFLOW_MONTHS.length - 1
        ? { ...m, invoiced: totalInvoiced, collected, expenses }
        : m
    );
  }, [totalInvoiced, collected, expenses]);

  const maxChartVal = useMemo(() => {
    const peak = Math.max(
      ...chartData.flatMap((d) => [d.invoiced, d.collected, d.expenses]),
      5000
    );
    return Math.ceil(peak / 1000) * 1000;
  }, [chartData]);

  const handleMarkPaid = (id: number) => {
    const target = invoices.find((i) => i.id === id);
    if (!target) return;
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    setCollected((prev) => prev + target.amount);
    showToast(`Marked ${target.tenant} (BHD ${target.amount.toFixed(2)}) as paid`);
  };

  const handleResolveTicket = (id: number) => {
    const target = tickets.find((t) => t.id === id);
    if (!target) return;
    setTickets((prev) => prev.filter((t) => t.id !== id));
    setResolvedTickets((prev) => prev + 1);
    showToast(`Resolved: ${target.title}`);
  };

  const handleResetDemo = () => {
    setCollected(4200);
    setExpenses(780);
    setOccupiedUnits(8);
    setTotalUnits(11);
    setResolvedTickets(12);
    setInvoices(INITIAL_DASHBOARD_INVOICES);
    setTickets(INITIAL_DASHBOARD_TICKETS);
    setSearchQuery('');
    showToast('Sample data restored');
  };

  const openAddModal = (type: Exclude<ActionModalType, null | 'boardpack'>) => {
    setMenuOpen(false);
    setFormTenant('');
    setFormUnit('');
    setFormAmount('');
    setFormPriority('Medium');
    setFormError('');
    setActionModal(type);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actionModal === 'invoice') {
      const amt = Number(formAmount);
      if (!formTenant.trim() || !formUnit.trim() || !amt || amt <= 0) {
        setFormError('Enter tenant name, unit, and a valid BHD amount.');
        return;
      }
      setInvoices((prev) => [
        {
          id: Date.now(),
          tenant: formTenant.trim(),
          unit: formUnit.trim(),
          amount: amt,
          status: 'due',
          days: 7,
        },
        ...prev,
      ]);
      showToast(`Invoice created for ${formTenant.trim()}`);
    } else if (actionModal === 'tenant') {
      if (!formTenant.trim() || !formUnit.trim()) {
        setFormError('Enter tenant name and assigned unit.');
        return;
      }
      setOccupiedUnits((prev) => prev + 1);
      setTotalUnits((prev) => Math.max(prev, occupiedUnits + 1));
      showToast(`Added tenant ${formTenant.trim()} to ${formUnit.trim()}`);
    } else if (actionModal === 'expense') {
      const amt = Number(formAmount);
      if (!formTenant.trim() || !amt || amt <= 0) {
        setFormError('Enter expense description and a valid BHD amount.');
        return;
      }
      setExpenses((prev) => prev + amt);
      showToast(`Logged expense: BHD ${amt.toFixed(2)}`);
    } else if (actionModal === 'ticket') {
      if (!formTenant.trim() || !formUnit.trim()) {
        setFormError('Enter issue summary and unit.');
        return;
      }
      setTickets((prev) => [
        {
          id: Date.now(),
          title: formTenant.trim(),
          unit: formUnit.trim(),
          priority: formPriority,
        },
        ...prev,
      ]);
      showToast(`Created ticket: ${formTenant.trim()}`);
    }
    setActionModal(null);
  };

  return (
    <section
      id="dashboard"
      className={
        isOpt3
          ? 'bg-[#09090D] py-16 sm:py-24 border-b border-[#222130]'
          : 'bg-white py-16 sm:py-24 border-b border-[#EAE6F3]'
      }
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[660px] mx-auto mb-10 sm:mb-12">
          <p
            className={`text-xs font-semibold tracking-[0.14em] uppercase ${
              isOpt3 ? 'text-[#9B8CC4]' : 'text-[#7A6B9C]'
            }`}
          >
            DASHBOARD
          </p>
          <h2
            className={`mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-balance ${
              isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
            }`}
          >
            Your whole portfolio, live on one screen
          </h2>
          <p className={`mt-3.5 text-base ${isOpt3 ? 'text-[#B8B3CA]' : 'text-[#57526B]'}`}>
            Collections, occupancy, cash flow and maintenance, all in one dashboard. The figures
            below are sample data.
          </p>
        </div>

        {/* Browser Frame around Live Portal Window */}
        <div
          className={
            isOpt3
              ? 'rounded-3xl bg-[#111119] border border-[#272538] p-2.5 sm:p-5 shadow-[0_28px_70px_rgba(0,0,0,0.6)]'
              : isOpt1
                ? 'rounded-2xl bg-[#0B0A10] p-2 sm:p-4 shadow-[0_24px_60px_rgba(11,10,16,0.18)]'
                : 'rounded-3xl bg-[#F6F5FA] border border-[#EAE6F3] p-3 sm:p-6'
          }
        >
          <div
            className={`relative rounded-xl border overflow-hidden ${
              isOpt3
                ? 'rounded-2xl border-[#28263A] bg-[#0F0F17]'
                : isOpt1
                  ? 'border-[#251F3A] bg-white'
                  : 'rounded-2xl border-[#E4DFF1] bg-white shadow-[0_16px_50px_rgba(45,31,78,0.08)]'
            }`}
          >
            {/* Toast Notification */}
            {toast && (
              <div
                role="status"
                aria-live="polite"
                className="absolute top-14 right-4 z-30 flex items-center gap-2 bg-[#5D488F] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg"
              >
                <Check className="w-4 h-4 text-[#EFEBF8]" />
                <span>{toast}</span>
              </div>
            )}

            {/* Browser Chrome Top Bar */}
            <div
              className={`px-4 py-3 flex items-center justify-between gap-4 border-b ${
                isOpt3
                  ? 'bg-[#151520] border-[#262535]'
                  : isOpt1
                    ? 'bg-[#14111D] border-[#251F3A]'
                    : 'bg-[#FAF9FD] border-[#EAE6F3]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpt1 || isOpt3 ? 'bg-[#3C3456]' : 'bg-[#DCD6EB]'
                  }`}
                />
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpt1 || isOpt3 ? 'bg-[#3C3456]' : 'bg-[#DCD6EB]'
                  }`}
                />
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpt1 || isOpt3 ? 'bg-[#3C3456]' : 'bg-[#DCD6EB]'
                  }`}
                />
              </div>
              <div
                className={`px-4 py-1 rounded-lg text-xs font-mono truncate max-w-[260px] sm:max-w-none border ${
                  isOpt1 || isOpt3
                    ? 'bg-[#0B0A10] border-[#2C2542] text-[#C9BEE6]'
                    : 'bg-white border-[#E6E1F0] text-[#57526B]'
                }`}
              >
                panel.manzil.app/dashboard
              </div>
              <button
                type="button"
                onClick={handleResetDemo}
                aria-label="Reset sample data"
                title="Reset sample data"
                className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors cursor-pointer ${
                  isOpt1 || isOpt3
                    ? 'text-[#A89CC8] hover:text-white hover:bg-[#251F3A]'
                    : 'text-[#7A6B9C] hover:text-[#2D1F4E] hover:bg-[#EFEBF8]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Portal Layout */}
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Portal Sidebar */}
              <aside
                className={`lg:w-56 p-4 flex lg:flex-col justify-between gap-2 border-b lg:border-b-0 lg:border-r overflow-x-auto ${
                  isOpt3
                    ? 'bg-[#12121B] border-[#262535]'
                    : isOpt1
                      ? 'bg-[#110F18] border-[#251F3A]'
                      : 'bg-[#FAF9FD] border-[#EAE6F3]'
                }`}
              >
                <div className="flex lg:flex-col gap-1.5 min-w-max lg:min-w-0">
                  <div
                    className={`hidden lg:flex items-center gap-2.5 px-3 py-2 mb-3 rounded-lg ${
                      isOpt1 || isOpt3 ? 'bg-white' : ''
                    }`}
                  >
                    <img
                      src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
                      alt="Manzil"
                      referrerPolicy="no-referrer"
                      className="h-7 w-auto object-contain"
                    />
                  </div>

                  {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const active = activeNav === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setActiveNav(item.label);
                          showToast(`${item.label}`);
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                          active
                            ? isOpt3
                              ? 'bg-[#5D488F] text-white'
                              : isOpt1
                                ? 'bg-[#44326B] text-white'
                                : 'bg-[#2D1F4E] text-white'
                            : isOpt1 || isOpt3
                              ? 'text-[#B9AED6] hover:text-white hover:bg-[#1D192B]'
                              : 'text-[#57526B] hover:text-[#2D1F4E] hover:bg-[#EFEBF8]'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('Settings');
                    showToast('Settings');
                  }}
                  className={`hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeNav === 'Settings'
                      ? isOpt3
                        ? 'bg-[#5D488F] text-white'
                        : isOpt1
                          ? 'bg-[#44326B] text-white'
                          : 'bg-[#2D1F4E] text-white'
                      : isOpt1 || isOpt3
                        ? 'text-[#B9AED6] hover:text-white hover:bg-[#1D192B]'
                        : 'text-[#57526B] hover:text-[#2D1F4E] hover:bg-[#EFEBF8]'
                  }`}
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Settings</span>
                </button>
              </aside>

              {/* Portal Main Workspace */}
              <div
                className={`flex-1 min-w-0 p-4 sm:p-6 space-y-5 ${
                  isOpt3 ? 'bg-[#0F0F17] text-[#F5F4F8]' : 'bg-[#F8F7FB]'
                }`}
              >
                {/* Top Utility Bar */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-2.5 border ${
                    isOpt3
                      ? 'bg-[#171722] border-[#28263A]'
                      : 'bg-white border-[#E6E1F0]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg text-white flex items-center justify-center text-xs font-bold shrink-0 ${
                        isOpt3 ? 'bg-[#5D488F]' : 'bg-[#2D1F4E]'
                      }`}
                    >
                      SR
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-[10px] font-semibold tracking-wider uppercase ${
                          isOpt3 ? 'text-[#9B8CC4]' : 'text-[#7A6B9C]'
                        }`}
                      >
                        ORGANIZATION
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isOpt3 ? 'text-[#F5F4F8]' : 'text-[#171226]'
                        }`}
                      >
                        Sample Realty W.L.L
                      </div>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative flex-1 min-w-[180px] max-w-xs">
                    <Search className="w-3.5 h-3.5 text-[#7A6B9C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search properties, units, tenants, invoices…"
                      aria-label="Search invoices and tenants"
                      className={`w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none ${
                        isOpt3
                          ? 'bg-[#101018] border-[#2C2A3F] text-[#F5F4F8] placeholder:text-[#8A83A3] focus:border-[#7A6B9C]'
                          : 'bg-[#F8F7FB] border-[#E6E1F0] text-[#171226] placeholder:text-[#7A6B9C] focus:border-[#44326B]'
                      }`}
                    />
                  </div>

                  {/* + New & Icons */}
                  <div className="flex items-center gap-2 relative">
                    <button
                      type="button"
                      onClick={() => setMenuOpen((prev) => !prev)}
                      aria-haspopup="menu"
                      aria-expanded={menuOpen}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        isOpt3
                          ? 'bg-[#5D488F] hover:bg-[#6F58A8]'
                          : 'bg-[#2D1F4E] hover:bg-[#44326B]'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New</span>
                    </button>

                    {menuOpen && (
                      <div
                        role="menu"
                        className={`absolute right-12 top-10 z-20 w-44 border rounded-xl shadow-lg py-1.5 text-xs font-semibold ${
                          isOpt3
                            ? 'bg-[#171722] border-[#2E2C42] text-[#F5F4F8]'
                            : 'bg-white border-[#DCD6EB] text-[#171226]'
                        }`}
                      >
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => openAddModal('invoice')}
                          className={`w-full text-left px-3.5 py-2 cursor-pointer ${
                            isOpt3
                              ? 'hover:bg-[#242038] hover:text-white'
                              : 'hover:bg-[#F4F1FA] hover:text-[#2D1F4E]'
                          }`}
                        >
                          New invoice
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => openAddModal('tenant')}
                          className={`w-full text-left px-3.5 py-2 cursor-pointer ${
                            isOpt3
                              ? 'hover:bg-[#242038] hover:text-white'
                              : 'hover:bg-[#F4F1FA] hover:text-[#2D1F4E]'
                          }`}
                        >
                          Add tenant
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => openAddModal('expense')}
                          className={`w-full text-left px-3.5 py-2 cursor-pointer ${
                            isOpt3
                              ? 'hover:bg-[#242038] hover:text-white'
                              : 'hover:bg-[#F4F1FA] hover:text-[#2D1F4E]'
                          }`}
                        >
                          Add expense
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => openAddModal('ticket')}
                          className={`w-full text-left px-3.5 py-2 cursor-pointer ${
                            isOpt3
                              ? 'hover:bg-[#242038] hover:text-white'
                              : 'hover:bg-[#F4F1FA] hover:text-[#2D1F4E]'
                          }`}
                        >
                          New ticket
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => showToast('Saved views')}
                      aria-label="Saved views"
                      className={`hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg border cursor-pointer ${
                        isOpt3
                          ? 'border-[#2C2A3F] text-[#B8B3CA] hover:text-white hover:border-[#7A6B9C]'
                          : 'border-[#E6E1F0] text-[#57526B] hover:text-[#2D1F4E]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast(`${tickets.length} open maintenance tickets`)}
                      aria-label="Notifications"
                      className={`relative inline-flex items-center justify-center w-8 h-8 rounded-lg border cursor-pointer ${
                        isOpt3
                          ? 'border-[#2C2A3F] text-[#B8B3CA] hover:text-white hover:border-[#7A6B9C]'
                          : 'border-[#E6E1F0] text-[#57526B] hover:text-[#2D1F4E]'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5D488F] text-white text-[10px] font-bold flex items-center justify-center">
                        {tickets.length}
                      </span>
                    </button>
                    <div
                      className={`w-8 h-8 rounded-lg border text-xs font-bold flex items-center justify-center ${
                        isOpt3
                          ? 'bg-[#221A3B] border-[#44326B] text-[#E4DCF7]'
                          : 'bg-[#F4F1FA] border-[#DCD6EB] text-[#2D1F4E]'
                      }`}
                    >
                      J
                    </div>
                  </div>
                </div>

                {/* Greeting Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h3
                      className={`text-lg font-bold ${isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'}`}
                    >
                      Hello, James Carter
                    </h3>
                    <span
                      className={`text-xs font-semibold ${
                        isOpt3 ? 'text-[#6CE9A6]' : 'text-[#157F4D]'
                      }`}
                    >
                      Live
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActionModal('boardpack')}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-lg cursor-pointer whitespace-nowrap ${
                        isOpt3
                          ? 'text-[#E8E5F2] bg-[#171722] border-[#2C2A3F] hover:border-[#7A6B9C]'
                          : 'text-[#2D1F4E] bg-white border-[#DCD6EB] hover:border-[#44326B]'
                      }`}
                    >
                      Export board pack
                    </button>
                    <button
                      type="button"
                      onClick={() => setActionModal('boardpack')}
                      className={`px-3 py-1.5 text-xs font-semibold border rounded-lg cursor-pointer whitespace-nowrap ${
                        isOpt3
                          ? 'text-white bg-[#5D488F] border-[#7A6B9C] hover:bg-[#6F58A8]'
                          : 'text-[#2D1F4E] bg-[#EFEBF8] border-[#DCD6EB] hover:bg-[#E4DFF1]'
                      }`}
                    >
                      View board pack
                    </button>
                  </div>
                </div>

                {/* 3 KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* KPI 1 */}
                  <div
                    className={`border rounded-xl p-4 flex flex-col justify-between ${
                      isOpt3 ? 'bg-[#171722] border-[#28263A]' : 'bg-white border-[#E6E1F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-semibold tracking-wider uppercase ${
                          isOpt3 ? 'text-[#9B8CC4]' : 'text-[#7A6B9C]'
                        }`}
                      >
                        TOTAL COLLECTIONS
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          isOpt3 ? 'text-[#6CE9A6]' : 'text-[#157F4D]'
                        }`}
                      >
                        {collectionPct}% collected
                      </span>
                    </div>
                    <div
                      className={`mt-2 text-2xl font-bold font-mono tabular-nums ${
                        isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                      }`}
                    >
                      BHD {collected.toLocaleString('en-US', { minimumFractionDigits: 3 })}
                    </div>
                    <div
                      className={`mt-3 h-2 w-full rounded-full overflow-hidden flex ${
                        isOpt3 ? 'bg-[#252336]' : 'bg-[#EFEBF8]'
                      }`}
                    >
                      <div
                        className={isOpt3 ? 'h-full bg-[#7A6B9C]' : 'h-full bg-[#2D1F4E]'}
                        style={{ width: `${collectionPct}%` }}
                      />
                      <div
                        className="h-full bg-[#D97706]"
                        style={{
                          width: `${totalInvoiced > 0 ? (pendingTotal / totalInvoiced) * 100 : 0}%`,
                        }}
                      />
                      <div
                        className="h-full bg-[#B42318]"
                        style={{
                          width: `${totalInvoiced > 0 ? (overdueTotal / totalInvoiced) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-mono tabular-nums">
                      <span className={isOpt3 ? 'text-[#B8B3CA]' : 'text-[#57526B]'}>
                        Pending: BHD {pendingTotal.toFixed(3)}
                      </span>
                      <span className="text-[#FDA29B] font-semibold">
                        Overdue: BHD {overdueTotal.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div
                    className={`border rounded-xl p-4 flex flex-col justify-between ${
                      isOpt3 ? 'bg-[#171722] border-[#28263A]' : 'bg-white border-[#E6E1F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-semibold tracking-wider uppercase ${
                          isOpt3 ? 'text-[#9B8CC4]' : 'text-[#7A6B9C]'
                        }`}
                      >
                        OCCUPANCY HEALTH
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          isOpt3 ? 'text-[#FDBA74]' : 'text-[#A15C07]'
                        }`}
                      >
                        {occupancyPct}% occupied
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div
                        className={`text-2xl font-bold font-mono tabular-nums ${
                          isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                        }`}
                      >
                        {occupiedUnits}{' '}
                        <span
                          className={`text-sm font-medium ${
                            isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'
                          }`}
                        >
                          / {totalUnits} units
                        </span>
                      </div>
                      <svg className="w-11 h-11 -rotate-90" viewBox="0 0 46 46" aria-hidden="true">
                        <circle
                          cx="23"
                          cy="23"
                          r="18"
                          fill="none"
                          stroke={isOpt3 ? '#252336' : '#EFEBF8'}
                          strokeWidth="5"
                        />
                        <circle
                          cx="23"
                          cy="23"
                          r="18"
                          fill="none"
                          stroke={isOpt3 ? '#9B8CC4' : '#44326B'}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 18}
                          strokeDashoffset={2 * Math.PI * 18 * (1 - occupancyPct / 100)}
                        />
                      </svg>
                    </div>
                    <div
                      className={`mt-3 flex items-center justify-between text-xs ${
                        isOpt3 ? 'text-[#B8B3CA]' : 'text-[#57526B]'
                      }`}
                    >
                      <span>{vacantUnits} vacant units available</span>
                      <span>4 buildings</span>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div
                    className={`border rounded-xl p-4 flex flex-col justify-between ${
                      isOpt3 ? 'bg-[#171722] border-[#28263A]' : 'bg-white border-[#E6E1F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-semibold tracking-wider uppercase ${
                          isOpt3 ? 'text-[#9B8CC4]' : 'text-[#7A6B9C]'
                        }`}
                      >
                        SUPPORT & TICKETS
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          isOpt3 ? 'text-[#6CE9A6]' : 'text-[#157F4D]'
                        }`}
                      >
                        SLA optimal
                      </span>
                    </div>
                    <div
                      className={`mt-2 text-2xl font-bold font-mono tabular-nums ${
                        isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                      }`}
                    >
                      {tickets.length}
                    </div>
                    <div
                      className={`mt-2 flex items-center justify-between text-xs font-mono tabular-nums ${
                        isOpt3 ? 'text-[#B8B3CA]' : 'text-[#57526B]'
                      }`}
                    >
                      <span>Resolved: {resolvedTickets}</span>
                      <span>Total: {totalTicketsCount}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAddModal('ticket')}
                      className={`mt-2 text-left text-xs font-semibold hover:underline cursor-pointer ${
                        isOpt3 ? 'text-[#C4B9E3]' : 'text-[#2D1F4E]'
                      }`}
                    >
                      View dispatch desk →
                    </button>
                  </div>
                </div>

                {/* Cash Flow Card */}
                <div
                  className={`border rounded-xl p-4 sm:p-5 ${
                    isOpt3 ? 'bg-[#171722] border-[#28263A]' : 'bg-white border-[#E6E1F0]'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                        }`}
                      >
                        Financial Cash Flow & Invoiced Trend
                      </h4>
                      <p className={`text-xs ${isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'}`}>
                        Rent invoiced, collected and property expenses, in BHD
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isOpt3 ? 'text-[#C4B9E3]' : 'text-[#2D1F4E]'
                      }`}
                    >
                      {collectionPct}% collected
                    </span>
                  </div>

                  <div
                    className={`mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-3.5 border rounded-lg ${
                      isOpt3
                        ? 'bg-[#111119] border-[#252336]'
                        : 'bg-[#FAF9FD] border-[#EAE6F3]'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-semibold text-[#9B8CC4] uppercase">
                        INVOICED
                      </div>
                      <div
                        className={`text-sm font-bold font-mono tabular-nums ${
                          isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                        }`}
                      >
                        BHD {totalInvoiced.toLocaleString('en-US')}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-[#9B8CC4] uppercase">
                        COLLECTED
                      </div>
                      <div
                        className={`text-sm font-bold font-mono tabular-nums ${
                          isOpt3 ? 'text-[#C4B9E3]' : 'text-[#2D1F4E]'
                        }`}
                      >
                        BHD {collected.toLocaleString('en-US')}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-[#9B8CC4] uppercase">
                        STILL TO COLLECT
                      </div>
                      <div
                        className={`text-sm font-bold font-mono tabular-nums ${
                          isOpt3 ? 'text-[#FDA29B]' : 'text-[#B42318]'
                        }`}
                      >
                        BHD {stillToCollect.toLocaleString('en-US')}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-[#9B8CC4] uppercase">
                        EXPENSES
                      </div>
                      <div
                        className={`text-sm font-bold font-mono tabular-nums ${
                          isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                        }`}
                      >
                        BHD {expenses.toLocaleString('en-US')}
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="mt-5">
                    <div
                      className={`h-44 flex items-end justify-between gap-2 sm:gap-4 border-b pb-2 pt-4 relative ${
                        isOpt3 ? 'border-[#252336]' : 'border-[#EAE6F3]'
                      }`}
                    >
                      {chartData.map((d, idx) => (
                        <div
                          key={d.month}
                          onMouseEnter={() => setHoveredMonth(idx)}
                          onMouseLeave={() => setHoveredMonth(null)}
                          className="flex-1 h-full flex flex-col items-center justify-end relative"
                        >
                          {hoveredMonth === idx && (
                            <div className="absolute -top-2 z-10 bg-[#5D488F] text-white text-[10px] font-mono rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                              Invoiced {d.invoiced} · Collected {d.collected} · Expenses {d.expenses}
                            </div>
                          )}
                          <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-32">
                            <div
                              className={`w-2.5 sm:w-3.5 rounded-t transition-all ${
                                isOpt3 ? 'bg-[#6F58A8]' : 'bg-[#9586B8]'
                              }`}
                              style={{ height: `${Math.min(100, (d.invoiced / maxChartVal) * 100)}%` }}
                              title={`Invoiced ${d.invoiced}`}
                            />
                            <div
                              className={`w-2.5 sm:w-3.5 rounded-t transition-all ${
                                isOpt3 ? 'bg-[#C4B9E3]' : 'bg-[#2D1F4E]'
                              }`}
                              style={{
                                height: `${Math.min(100, (d.collected / maxChartVal) * 100)}%`,
                              }}
                              title={`Collected ${d.collected}`}
                            />
                            <div
                              className="w-2.5 sm:w-3.5 rounded-t bg-[#D97706] transition-all"
                              style={{ height: `${Math.min(100, (d.expenses / maxChartVal) * 100)}%` }}
                              title={`Expenses ${d.expenses}`}
                            />
                          </div>
                          <span
                            className={`mt-2 text-[11px] font-medium ${
                              isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'
                            }`}
                          >
                            {d.month}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`mt-3 flex flex-wrap items-center gap-5 text-xs ${
                        isOpt3 ? 'text-[#B8B3CA]' : 'text-[#57526B]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-sm ${
                            isOpt3 ? 'bg-[#6F58A8]' : 'bg-[#9586B8]'
                          }`}
                        />{' '}
                        Invoiced
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-sm ${
                            isOpt3 ? 'bg-[#C4B9E3]' : 'bg-[#2D1F4E]'
                          }`}
                        />{' '}
                        Collected
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D97706]" /> Expenses
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Upcoming & Pending Rent Invoices */}
                  <div
                    className={`lg:col-span-7 border rounded-xl p-4 sm:p-5 flex flex-col ${
                      isOpt3 ? 'bg-[#171722] border-[#28263A]' : 'bg-white border-[#E6E1F0]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4
                          className={`text-sm font-bold ${
                            isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                          }`}
                        >
                          Upcoming & Pending Rent Invoices
                        </h4>
                        <p className={`text-xs ${isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'}`}>
                          Revenue due for settlement
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openAddModal('invoice')}
                        className={`text-xs font-semibold hover:underline cursor-pointer whitespace-nowrap ${
                          isOpt3 ? 'text-[#C4B9E3]' : 'text-[#2D1F4E]'
                        }`}
                      >
                        View all →
                      </button>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span
                        className={`text-2xl font-bold font-mono tabular-nums ${
                          isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                        }`}
                      >
                        {stillToCollect.toFixed(2)}
                      </span>
                      <span className={`text-xs ${isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'}`}>
                        due across {invoices.length} invoices, BHD {overdueTotal.toFixed(2)} already
                        overdue
                      </span>
                    </div>

                    <div className={`mt-3 divide-y ${isOpt3 ? 'divide-[#232133]' : 'divide-[#EFEBF7]'}`}>
                      {filteredInvoices.length === 0 ? (
                        <div className="py-6 text-center text-xs text-[#9A94B0]">
                          All invoices settled.
                        </div>
                      ) : (
                        filteredInvoices.map((inv) => (
                          <div
                            key={inv.id}
                            className="py-2.5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0">
                              <div
                                className={`font-semibold truncate ${
                                  isOpt3 ? 'text-[#F5F4F8]' : 'text-[#171226]'
                                }`}
                              >
                                {inv.tenant}
                              </div>
                              <div
                                className={`truncate ${
                                  isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'
                                }`}
                              >
                                {inv.unit}
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 shrink-0">
                              <span
                                className={`text-[11px] font-medium ${
                                  inv.status === 'overdue'
                                    ? isOpt3
                                      ? 'text-[#FDA29B]'
                                      : 'text-[#B42318]'
                                    : isOpt3
                                      ? 'text-[#C4B9E3]'
                                      : 'text-[#44326B]'
                                }`}
                              >
                                {inv.status === 'overdue'
                                  ? `Overdue ${inv.days} days`
                                  : `Due in ${inv.days} days`}
                              </span>
                              <span
                                className={`font-mono font-bold tabular-nums ${
                                  isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                                }`}
                              >
                                BHD {inv.amount}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleMarkPaid(inv.id)}
                                aria-label={`Confirm payment for ${inv.tenant}`}
                                title="Confirm payment"
                                className={`w-7 h-7 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
                                  isOpt3
                                    ? 'border-[#322F46] text-[#C4B9E3] hover:bg-[#5D488F] hover:text-white'
                                    : 'border-[#DCD6EB] text-[#2D1F4E] hover:bg-[#2D1F4E] hover:text-white'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Operations Dispatch Desk */}
                  <div
                    className={`lg:col-span-5 border rounded-xl p-4 sm:p-5 flex flex-col justify-between ${
                      isOpt3 ? 'bg-[#171722] border-[#28263A]' : 'bg-white border-[#E6E1F0]'
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          isOpt3 ? 'text-[#F7F6FA]' : 'text-[#171226]'
                        }`}
                      >
                        Operations Dispatch Desk
                      </h4>
                      <p className={`text-xs ${isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'}`}>
                        Maintenance and lease watch
                      </p>

                      <div
                        className={`mt-3 flex items-center justify-between px-3 py-2 border rounded-lg text-xs ${
                          isOpt3
                            ? 'bg-[#111119] border-[#252336]'
                            : 'bg-[#FAF9FD] border-[#EAE6F3]'
                        }`}
                      >
                        <span
                          className={`font-medium ${isOpt3 ? 'text-[#C4B9E3]' : 'text-[#2D1F4E]'}`}
                        >
                          Open maintenance tickets
                        </span>
                        <span
                          className={`font-mono font-bold tabular-nums ${
                            isOpt3 ? 'text-[#FDA29B]' : 'text-[#B42318]'
                          }`}
                        >
                          {tickets.length}
                        </span>
                      </div>

                      <div
                        className={`mt-3 divide-y ${isOpt3 ? 'divide-[#232133]' : 'divide-[#EFEBF7]'}`}
                      >
                        {filteredTickets.length === 0 ? (
                          <div className="py-6 text-center text-xs text-[#9A94B0]">0</div>
                        ) : (
                          filteredTickets.map((tk) => (
                            <div
                              key={tk.id}
                              className="py-2.5 flex items-center justify-between gap-2 text-xs"
                            >
                              <div className="min-w-0">
                                <div
                                  className={`font-semibold truncate ${
                                    isOpt3 ? 'text-[#F5F4F8]' : 'text-[#171226]'
                                  }`}
                                >
                                  {tk.title}
                                </div>
                                <div
                                  className={`truncate ${
                                    isOpt3 ? 'text-[#9A94B0]' : 'text-[#6B6480]'
                                  }`}
                                >
                                  {tk.unit}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`text-[11px] font-semibold ${
                                    tk.priority === 'High'
                                      ? isOpt3
                                        ? 'text-[#FDA29B]'
                                        : 'text-[#B42318]'
                                      : tk.priority === 'Medium'
                                        ? isOpt3
                                          ? 'text-[#FDBA74]'
                                          : 'text-[#A15C07]'
                                        : isOpt3
                                          ? 'text-[#B8B3CA]'
                                          : 'text-[#57526B]'
                                  }`}
                                >
                                  {tk.priority}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleResolveTicket(tk.id)}
                                  aria-label={`Complete ticket ${tk.title}`}
                                  title="Complete ticket"
                                  className={`w-7 h-7 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
                                    isOpt3
                                      ? 'border-[#322F46] text-[#C4B9E3] hover:bg-[#5D488F] hover:text-white'
                                      : 'border-[#DCD6EB] text-[#2D1F4E] hover:bg-[#2D1F4E] hover:text-white'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openAddModal('ticket')}
                      className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold hover:underline cursor-pointer self-start ${
                        isOpt3 ? 'text-[#C4B9E3]' : 'text-[#2D1F4E]'
                      }`}
                    >
                      <span>Create a ticket</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Action Modal */}
            {actionModal && (
              <div
                role="dialog"
                aria-modal="true"
                className="absolute inset-0 z-30 bg-[#171226]/45 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <div className="bg-white border border-[#DCD6EB] rounded-2xl w-full max-w-md p-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EFEBF7]">
                    <h4 className="text-base font-bold text-[#171226]">
                      {actionModal === 'invoice' && 'New invoice'}
                      {actionModal === 'tenant' && 'Add tenant'}
                      {actionModal === 'expense' && 'Add expense'}
                      {actionModal === 'ticket' && 'New ticket'}
                      {actionModal === 'boardpack' && 'Export board pack'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActionModal(null)}
                      aria-label="Close modal"
                      className="p-1 text-[#6B6480] hover:text-[#171226] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {actionModal === 'boardpack' ? (
                    <div className="mt-4 space-y-3 text-sm text-[#57526B]">
                      <p>
                        <strong className="text-[#171226]">Sample Realty W.L.L</strong>
                      </p>
                      <div className="bg-[#FAF9FD] border border-[#EAE6F3] rounded-lg p-3.5 space-y-1.5 font-mono text-xs tabular-nums">
                        <div className="flex justify-between">
                          <span>INVOICED</span>
                          <span className="font-bold text-[#171226]">
                            BHD {totalInvoiced.toLocaleString('en-US')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>COLLECTED</span>
                          <span className="font-bold text-[#2D1F4E]">
                            BHD {collected.toLocaleString('en-US')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>STILL TO COLLECT</span>
                          <span className="font-bold text-[#B42318]">
                            BHD {stillToCollect.toLocaleString('en-US')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>EXPENSES</span>
                          <span className="font-bold text-[#171226]">
                            BHD {expenses.toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setActionModal(null);
                            showToast('Board pack ready');
                          }}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleModalSubmit} className="mt-4 space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#57526B] mb-1">
                          {actionModal === 'expense'
                            ? 'Expenses'
                            : actionModal === 'ticket'
                              ? 'Maintenance'
                              : 'Tenants'}
                        </label>
                        <input
                          type="text"
                          value={formTenant}
                          onChange={(e) => setFormTenant(e.target.value)}
                          placeholder={
                            actionModal === 'expense'
                              ? 'Elevator servicing'
                              : actionModal === 'ticket'
                                ? 'AC not cooling'
                                : 'Oliver Grant'
                          }
                          className="w-full px-3 py-2 text-sm border border-[#DCD6EB] rounded-lg focus:outline-none focus:border-[#44326B]"
                        />
                      </div>

                      {actionModal !== 'expense' && (
                        <div>
                          <label className="block text-xs font-semibold text-[#57526B] mb-1">
                            Properties
                          </label>
                          <input
                            type="text"
                            value={formUnit}
                            onChange={(e) => setFormUnit(e.target.value)}
                            placeholder="Building A, Unit 12"
                            className="w-full px-3 py-2 text-sm border border-[#DCD6EB] rounded-lg focus:outline-none focus:border-[#44326B]"
                          />
                        </div>
                      )}

                      {(actionModal === 'invoice' || actionModal === 'expense') && (
                        <div>
                          <label className="block text-xs font-semibold text-[#57526B] mb-1">
                            BHD
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="0.5"
                            value={formAmount}
                            onChange={(e) => setFormAmount(e.target.value)}
                            placeholder="150"
                            className="w-full px-3 py-2 text-sm border border-[#DCD6EB] rounded-lg font-mono focus:outline-none focus:border-[#44326B]"
                          />
                        </div>
                      )}

                      {actionModal === 'ticket' && (
                        <div>
                          <label className="block text-xs font-semibold text-[#57526B] mb-1">
                            Priority
                          </label>
                          <select
                            value={formPriority}
                            onChange={(e) =>
                              setFormPriority(e.target.value as 'High' | 'Medium' | 'Low')
                            }
                            className="w-full px-3 py-2 text-sm border border-[#DCD6EB] rounded-lg bg-white focus:outline-none focus:border-[#44326B]"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                      )}

                      {formError && (
                        <p className="text-xs font-semibold text-[#B42318]">{formError}</p>
                      )}

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setActionModal(null)}
                          className="px-4 py-2 text-xs font-semibold text-[#2D1F4E] border border-[#DCD6EB] rounded-lg hover:bg-[#F8F7FB] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
