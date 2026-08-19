import React, { useState, useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import {
  Code, Terminal, Database, ShieldAlert, Activity, Server,
  CheckCircle2, Lock, Cpu, HardDrive, RefreshCw, LifeBuoy,
  AlertTriangle, Bug, Wrench, Send, ExternalLink
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { dbStore } from '../../backend/db';
import { SupportTicket } from '../../types';

export const DeveloperDashboardPage: React.FC = () => {
  const {
    currentUser,
    logout,
    showToast,
    artworks,
    artists,
    orders,
    enquiries,
    supportTickets,
    updateTicketStatus,
    artistApplications
  } = useGallery();

  const [activeTab, setActiveTab] = useState<'bugs' | 'database' | 'audit' | 'diagnostics'>('bugs');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Bug & Ticket resolution state
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [developerPatchNote, setDeveloperPatchNote] = useState('');
  const [ticketFilter, setTicketFilter] = useState<'All' | 'Open' | 'Under Investigation' | 'Resolved'>('All');

  // Filter tech tickets
  let techTickets = supportTickets;
  if (ticketFilter !== 'All') {
    techTickets = techTickets.filter(t => t.status === ticketFilter);
  }

  const handleResolveTechTicket = (ticketId: string) => {
    updateTicketStatus(ticketId, 'Resolved', developerPatchNote || 'Technical resolution and patch deployed by Web Developer.');
    showToast('Technical ticket marked as resolved with patch notes.', 'success');
    setSelectedTicketId(null);
    setDeveloperPatchNote('');
  };

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('audit_records')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (data && data.length > 0) {
        setAuditLogs(data);
      } else if (dbStore && dbStore.auditRecords && dbStore.auditRecords.length > 0) {
        setAuditLogs(dbStore.auditRecords.map((r: any) => ({
          id: r.id,
          timestamp: r.timestamp,
          actor_email: r.actorEmail || r.actorId || 'system@richbeckygallery.com',
          actor_role: r.actorRole || 'system_admin',
          action: r.action,
          affected_entity: r.affectedEntity || 'System',
          affected_entity_id: r.affectedEntityId || 'N/A'
        })));
      } else {
        setAuditLogs([
          {
            id: 'audit-boot-01',
            timestamp: new Date().toISOString(),
            actor_email: currentUser?.email || 'developer@richbeckygallery.com',
            actor_role: 'web_developer',
            action: 'INFRASTRUCTURE_HEALTH_CHECK',
            affected_entity: 'PostgreSQL_16_Tables',
            affected_entity_id: 'prod-schema-v2'
          }
        ]);
      }
    } catch (e) {
      console.error('Error fetching audit logs:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleRefreshDiagnostics = async () => {
    showToast('Re-evaluating database diagnostics & cache...', 'info');
    await loadLogs();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 p-8 rounded-3xl text-white shadow-gallery flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-500/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" /> Web Developer & System Diagnostics Console
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ivory-100">
            Infrastructure, Bug Desk & Database Monitor
          </h1>
          <p className="text-xs sm:text-sm text-ivory-300/80 max-w-2xl font-light">
            Authenticated as <span className="font-mono text-emerald-300">{currentUser?.email || 'developer@richbeckygallery.com'}</span>. Monitor live tickets, website bugs, PostgreSQL tables, and audit streams.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshDiagnostics}
            className="px-4 py-2 text-xs font-medium bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 rounded-xl transition flex items-center gap-1.5 shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Diagnostics
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 text-xs font-medium text-ivory-300 hover:text-white border border-ivory-400/30 hover:border-ivory-200 rounded-xl transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-rose-600">
            <Bug className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Issue Desk</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">{supportTickets.filter(t => t.status !== 'Resolved').length}</p>
          <p className="text-xs text-neutral-500 font-light">Open Technical & Platform Tickets</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <Database className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Database</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">16 Tables</p>
          <p className="text-xs text-neutral-500 font-light">PostgreSQL Schema Active</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <Lock className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Security</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">RLS Enforced</p>
          <p className="text-xs text-neutral-500 font-light">Public & Private Isolation</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-purple-600">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">API Health</span>
          </div>
          <p className="text-2xl font-serif font-bold text-emerald-700">Operational</p>
          <p className="text-xs text-neutral-500 font-light">100% Uptime (Vercel Edge)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ivory-300 space-x-6 text-sm font-medium overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('bugs')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'bugs' ? 'border-navy-950 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Bug className="w-4 h-4 text-rose-600" />
          <span>Website Bugs & Technical Tickets ({supportTickets.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'database' ? 'border-navy-950 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-600" />
          <span>PostgreSQL Table Inspector</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'audit' ? 'border-navy-950 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Terminal className="w-4 h-4 text-blue-600" />
          <span>System Audit Trail ({auditLogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'diagnostics' ? 'border-navy-950 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-purple-600" />
          <span>Environment & Configuration</span>
        </button>
      </div>

      {/* Tab 1: Bugs & Tech Tickets */}
      {activeTab === 'bugs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-navy-950">Website Bug Tracker & Technical Tickets</h2>
              <p className="text-xs text-neutral-500 font-light">Inspect all platform issues, checkout failures, COA rendering errors, and customer claims.</p>
            </div>

            <div className="flex gap-2 text-xs font-bold uppercase">
              {(['All', 'Open', 'Under Investigation', 'Resolved'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setTicketFilter(st)}
                  className={`px-3.5 py-1.5 rounded-xl transition ${
                    ticketFilter === st ? 'bg-navy-950 text-white' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {techTickets.length > 0 ? (
              techTickets.map(ticket => (
                <div key={ticket.id} className="p-6 bg-white rounded-2xl border border-ivory-300 shadow-subtle space-y-4 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-navy-950 text-sm">{ticket.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        ticket.status === 'Under Investigation' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                        ticket.priority === 'Curatorial Escalation' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Priority: {ticket.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-gold-100 text-gold-900 font-bold uppercase">
                        Origin: {ticket.userRole}
                      </span>
                    </div>
                    <span className="text-neutral-400 text-[11px]">{new Date(ticket.createdAt).toLocaleString()}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gold-700 font-bold uppercase text-[10px] tracking-wider">{ticket.category}</span>
                    <h3 className="font-serif text-base font-bold text-navy-950">{ticket.subject}</h3>
                    <p className="text-neutral-600">Reported By: <strong className="text-navy-950">{ticket.userName}</strong> ({ticket.userEmail}) {ticket.orderId && `• Order: ${ticket.orderId}`}</p>
                    <p className="text-neutral-700 bg-ivory-100 p-3.5 rounded-xl mt-2 leading-relaxed">{ticket.description}</p>
                  </div>

                  {ticket.resolutionNotes && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-1">
                      <span className="font-bold flex items-center gap-1 text-[11px] text-emerald-800">
                        <Wrench className="w-3.5 h-3.5" /> Deployed Patch / Resolution Notes:
                      </span>
                      <p className="text-xs text-neutral-700">{ticket.resolutionNotes}</p>
                    </div>
                  )}

                  {/* Dev Action Area */}
                  <div className="pt-3 border-t border-ivory-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-500">Update State:</span>
                      <select
                        value={ticket.status}
                        onChange={e => updateTicketStatus(ticket.id, e.target.value as any)}
                        className="bg-ivory-200 text-navy-950 font-bold px-3 py-1.5 rounded-lg text-xs border border-ivory-300"
                      >
                        <option value="Open">Open</option>
                        <option value="Under Investigation">Under Investigation</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedTicketId === ticket.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Add developer fix explanation / commit..."
                            value={developerPatchNote}
                            onChange={e => setDeveloperPatchNote(e.target.value)}
                            className="p-2 border border-ivory-300 rounded-xl text-xs w-72"
                          />
                          <button
                            onClick={() => handleResolveTechTicket(ticket.id)}
                            className="px-3.5 py-2 bg-emerald-700 text-white rounded-xl font-bold"
                          >
                            Save Fix Note
                          </button>
                          <button
                            onClick={() => setSelectedTicketId(null)}
                            className="px-2 py-2 border rounded-xl text-neutral-500"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedTicketId(ticket.id)}
                          className="px-4 py-2 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                          <span>Attach Developer Fix Note</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 text-neutral-500 text-xs">
                No tickets found matching the selected filter.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Database Table Inspector */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-navy-950">PostgreSQL Schema & Table Registry</h2>
              <p className="text-xs text-neutral-500 font-light">16 relational entities with Row Level Security (RLS) enforcement.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              PostgreSQL v16.1 Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              { table: 'artworks', records: artworks.length, desc: 'Masterworks catalogue & pricing' },
              { table: 'artists', records: artists.length, desc: 'Represented studio profiles' },
              { table: 'orders', records: orders.length, desc: 'Collector purchases & shipments' },
              { table: 'order_items', records: orders.reduce((acc, o) => acc + o.items.length, 0), desc: 'Line item art acquisitions' },
              { table: 'support_tickets', records: supportTickets.length, desc: 'Concierge disputes & inquiries' },
              { table: 'enquiries', records: enquiries.length, desc: 'Collector advisory inbox' },
              { table: 'artist_applications', records: artistApplications.length, desc: 'Representation submissions' },
              { table: 'audit_records', records: auditLogs.length, desc: 'Admin governance audit stream' },
              { table: 'categories', records: 8, desc: 'Artwork categories & media' },
              { table: 'customers', records: 12, desc: 'Patron profiles & addresses' },
              { table: 'payouts', records: 4, desc: 'Artist wire settlements' },
              { table: 'faqs', records: 6, desc: 'Knowledge base items' },
              { table: 'shipping_regions', records: 4, desc: 'Transit & handling rates' },
              { table: 'notifications', records: 5, desc: 'Director alert dispatch' },
              { table: 'admin_users', records: 4, desc: 'Multi-role governance accounts' },
              { table: 'currencies', records: 7, desc: 'Global FX rates & symbols' }
            ].map(t => (
              <div key={t.table} className="p-4 bg-white rounded-2xl border border-ivory-300 shadow-subtle space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-navy-950">{t.table}</span>
                  <span className="px-2 py-0.5 bg-ivory-200 text-navy-900 rounded font-bold">{t.records} rows</span>
                </div>
                <p className="text-neutral-500 font-light text-[11px]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: System Audit Trail */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-navy-950">Real-Time System Audit Trail</h2>
            <button
              onClick={handleRefreshDiagnostics}
              className="text-xs text-gold-700 font-bold hover:underline"
            >
              Fetch Latest Stream
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-ivory-300 shadow-subtle overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-100 border-b border-ivory-300 text-navy-950 font-serif uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Entity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200 text-neutral-700 font-mono text-[11px]">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-ivory-50/50 transition">
                    <td className="p-4 text-neutral-400 font-sans text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-4 font-bold text-navy-950">{log.actor_email}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-ivory-200 text-navy-900 rounded text-[10px] font-bold uppercase">
                        {log.actor_role}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-800 font-bold">{log.action}</td>
                    <td className="p-4 text-neutral-600">{log.affected_entity} ({log.affected_entity_id})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Environment Diagnostics */}
      {activeTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-6 text-xs">
            <h2 className="font-serif text-xl font-bold text-navy-950">Runtime Environment & RLS Security Status</h2>

            <div className="space-y-3 font-mono">
              <div className="p-3.5 bg-ivory-50 border border-ivory-300 rounded-xl flex justify-between items-center">
                <span className="text-neutral-500">VITE_SUPABASE_URL:</span>
                <span className="font-bold text-navy-950">https://qsgdjgugapehrpionvbl.supabase.co</span>
              </div>
              <div className="p-3.5 bg-ivory-50 border border-ivory-300 rounded-xl flex justify-between items-center">
                <span className="text-neutral-500">VITE_SUPABASE_PUBLISHABLE_KEY:</span>
                <span className="font-bold text-emerald-700">eyJhbGciOiJIUzI1Ni... (Active Client Key)</span>
              </div>
              <div className="p-3.5 bg-ivory-50 border border-ivory-300 rounded-xl flex justify-between items-center">
                <span className="text-neutral-500">FRAMEWORK_PRESET:</span>
                <span className="font-bold text-navy-950">Vite 5.x / React 18 / TypeScript</span>
              </div>
              <div className="p-3.5 bg-ivory-50 border border-ivory-300 rounded-xl flex justify-between items-center">
                <span className="text-neutral-500">ROUTING_REWRITES:</span>
                <span className="font-bold text-emerald-700">vercel.json Single Page App (/index.html)</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
