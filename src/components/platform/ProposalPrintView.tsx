import { forwardRef } from "react";

interface ProposalItem {
  id: string;
  product_name: string;
  room: string;
  qty: number;
  unit_price: number;
}

interface ProposalData {
  title: string;
  status: string;
  labor_hours: number;
  labor_rate: number;
  notes: string;
  created_at: string;
  clients?: { name: string } | null;
  proposal_items?: ProposalItem[];
}

interface Props {
  proposal: ProposalData;
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

const ProposalPrintView = forwardRef<HTMLDivElement, Props>(({ proposal }, ref) => {
  const items = proposal.proposal_items || [];
  const productsTotal = items.reduce((s, i) => s + i.qty * Number(i.unit_price), 0);
  const laborTotal = Number(proposal.labor_hours) * Number(proposal.labor_rate);
  const grandTotal = productsTotal + laborTotal;

  return (
    <div ref={ref} className="proposal-print-view">
      <style>{`
        .proposal-print-view {
          display: none;
        }
        @media print {
          body * { visibility: hidden !important; }
          .proposal-print-view, .proposal-print-view * { visibility: visible !important; }
          .proposal-print-view {
            display: block !important;
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            padding: 40px;
            background: white;
            color: #111;
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            z-index: 99999;
          }
          .print-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #0f172a; padding-bottom: 20px; margin-bottom: 24px; }
          .print-company { font-size: 22px; font-weight: 700; color: #0f172a; }
          .print-subtitle { font-size: 11px; color: #64748b; margin-top: 4px; }
          .print-title { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
          .print-meta { display: flex; gap: 32px; margin-bottom: 24px; font-size: 12px; }
          .print-meta-label { color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
          .print-meta-value { font-weight: 600; margin-top: 2px; }
          .print-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .print-table th { background: #f1f5f9; padding: 8px 12px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; border-bottom: 2px solid #e2e8f0; }
          .print-table td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
          .print-table .text-right { text-align: right; }
          .print-summary { display: flex; justify-content: flex-end; }
          .print-summary-box { width: 280px; border: 2px solid #0f172a; border-radius: 6px; overflow: hidden; }
          .print-summary-row { display: flex; justify-content: space-between; padding: 8px 16px; font-size: 13px; }
          .print-summary-row.total { background: #0f172a; color: white; font-weight: 700; font-size: 15px; }
          .print-notes { margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; }
          .print-notes-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px; }
          .print-footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 10px; color: #94a3b8; }
        }
      `}</style>

      <div className="print-header">
        <div>
          <div className="print-company">TCL Tech Solutions</div>
          <div className="print-subtitle">Smart Home & Low-Voltage Systems Integration</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="print-title">PROPOSAL</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>
            {new Date(proposal.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      <div className="print-meta">
        <div>
          <div className="print-meta-label">Proposal Title</div>
          <div className="print-meta-value">{proposal.title}</div>
        </div>
        <div>
          <div className="print-meta-label">Client</div>
          <div className="print-meta-value">{proposal.clients?.name || "—"}</div>
        </div>
        <div>
          <div className="print-meta-label">Status</div>
          <div className="print-meta-value">{proposal.status}</div>
        </div>
      </div>

      {items.length > 0 && (
        <table className="print-table">
          <thead>
            <tr>
              <th>Product / Service</th>
              <th>Room / Location</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Unit Price</th>
              <th className="text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.room || "—"}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">{fmt(Number(item.unit_price))}</td>
                <td className="text-right" style={{ fontWeight: 600 }}>{fmt(item.qty * Number(item.unit_price))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {items.length === 0 && (
        <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", border: "1px dashed #e2e8f0", borderRadius: 6, marginBottom: 24 }}>
          No line items added to this proposal yet.
        </div>
      )}

      <div className="print-summary">
        <div className="print-summary-box">
          <div className="print-summary-row">
            <span>Products & Equipment</span>
            <span>{fmt(productsTotal)}</span>
          </div>
          <div className="print-summary-row">
            <span>Labor ({proposal.labor_hours}h × {fmt(Number(proposal.labor_rate))}/h)</span>
            <span>{fmt(laborTotal)}</span>
          </div>
          <div className="print-summary-row total">
            <span>Grand Total</span>
            <span>{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>

      {proposal.notes && (
        <div className="print-notes">
          <div className="print-notes-label">Notes & Terms</div>
          <div>{proposal.notes}</div>
        </div>
      )}

      <div className="print-footer">
        TCL Tech Solutions &bull; Proposal generated on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </div>
    </div>
  );
});

ProposalPrintView.displayName = "ProposalPrintView";
export default ProposalPrintView;
