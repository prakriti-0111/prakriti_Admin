import React from 'react';
import { Chip, Tooltip } from '@mui/material';

/* how far a stock request hop has got - explicit colours, each state its own
   (the theme's warning/info chips are too pale to tell apart) */
const STATE = {
  requested: { label: 'Waiting', fg: '#b45309', bg: '#fff4e5', border: '#f5c38b' },
  forwarded: { label: 'Forwarded', fg: '#1565c0', bg: '#e3f2fd', border: '#90caf9' },
  ready: { label: 'Ready', fg: '#0e7490', bg: '#ecfeff', border: '#67e8f9' },
  in_cart: { label: 'In Cart', fg: '#5e35b1', bg: '#ede7f6', border: '#b39ddb' },
  transferred: { label: 'Transferred', fg: '#00695c', bg: '#e0f2f1', border: '#80cbc4' },
  received: { label: 'Received', fg: '#1b5e20', bg: '#e8f5e9', border: '#a5d6a7' },
};

const muted = { color: '#8a94a6', fontSize: 12 };

/* the piece's holders, oldest first, shortened to first → +N → last; hover for all */
export const StockPath = ({ tracking }) => {
  const path = (tracking && tracking.path) || [];
  if (!path.length) return <span style={muted}>No movement</span>;
  const full = path.map((p) => p.name).join(' → ');
  const shown = path.length > 3 ? [path[0], { more: path.length - 2 }, path[path.length - 1]] : path;
  return (
    <Tooltip title={full} arrow>
      <span style={{ fontSize: 13, whiteSpace: 'nowrap', cursor: 'default' }}>
        {shown.map((p, i) => (
          <span key={i}>
            {i ? <span style={{ ...muted, margin: '0 4px' }}>→</span> : null}
            {p.more ? (
              <Chip label={`+${p.more}`} size="small" variant="outlined" sx={{ height: 18, fontSize: 11 }} />
            ) : i === shown.length - 1 ? (
              <b>{p.name}</b>
            ) : (
              <span style={{ color: '#5b6474' }}>{p.name}</span>
            )}
          </span>
        ))}
      </span>
    </Tooltip>
  );
};

/* each stock request hop for the item, in order: step, state chip, who asked whom */
export const RequestSteps = ({ tracking }) => {
  const steps = (tracking && tracking.steps) || [];
  if (!steps.length) return <span style={muted}>Not requested</span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
          {steps.length > 1 ? <span style={{ ...muted, width: 14 }}>{i + 1}.</span> : null}
          <Chip
            label={(STATE[s.state] || {}).label || s.state}
            size="small"
            sx={{
              height: 20,
              fontSize: 11,
              fontWeight: 600,
              minWidth: 84,
              color: (STATE[s.state] || {}).fg,
              background: (STATE[s.state] || {}).bg,
              border: '1px solid ' + ((STATE[s.state] || {}).border || '#ddd'),
            }}
          />
          <span style={{ fontSize: 12, color: '#5b6474' }}>
            <b style={{ fontWeight: 600 }}>{s.from}</b> <span style={muted}>asked</span> <b style={{ fontWeight: 600 }}>{s.to}</b>
          </span>
        </div>
      ))}
    </div>
  );
};

/* a small state chip, same colours as the request steps */
export const StateChip = ({ label, fg, bg, border }) => (
  <Chip
    label={label}
    size="small"
    sx={{ height: 20, fontSize: 11, fontWeight: 600, color: fg, background: bg, border: '1px solid ' + border }}
  />
);

/* one-line view for a crowded table: the item's stock chip, who has the piece
   now and the latest request step; hover shows the whole trail */
export const CompactTracking = ({ tracking, chip }) => {
  const steps = (tracking && tracking.steps) || [];
  const last = steps[steps.length - 1];
  const st = last ? STATE[last.state] || {} : null;
  return (
    <Tooltip
      arrow
      placement="right"
      componentsProps={{ tooltip: { sx: { bgcolor: '#fff', color: '#1e2746', boxShadow: 3, p: 1.5, maxWidth: 460 } } }}
      title={tracking ? <StockTracking tracking={tracking} /> : ''}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, cursor: 'default', minWidth: 120 }}>
        <div>{chip}</div>
        {tracking && tracking.now_with ? (
          <span style={{ ...muted, whiteSpace: 'nowrap' }}>With {tracking.now_with}</span>
        ) : null}
        {last ? (
          <span style={{ fontSize: 11, color: st.fg, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {st.label || last.state} · {last.to}
          </span>
        ) : null}
      </div>
    </Tooltip>
  );
};

/* both, stacked - for a single table cell */
const StockTracking = ({ tracking }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200 }}>
    <StockPath tracking={tracking} />
    <RequestSteps tracking={tracking} />
  </div>
);

export default StockTracking;
