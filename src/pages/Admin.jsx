import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Plus, Trash2, Calendar, Key, Newspaper, Edit2, X, Check, AlertTriangle, Lock } from 'lucide-react';
import { db } from '../firebase';
import {
  doc, getDoc, setDoc, deleteDoc,
  collection, onSnapshot
} from 'firebase/firestore';

const FALLBACK = {
  calendar: [],
  driverStandings: [],
  teamStandings: [],
  news: [],
  sponsors: [],
};

const inputStyle = {
  background: '#0a0a0c',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '10px 14px',
  width: '100%',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  color: 'rgba(255,255,255,0.5)',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  marginBottom: '6px',
};

const tabBtnStyle = (active) => ({
  background: active ? '#CC0000' : '#121216',
  color: '#fff',
  padding: '13px 18px',
  border: 'none',
  width: '100%',
  textAlign: 'left',
  fontFamily: 'Barlow Condensed, sans-serif',
  fontWeight: 700,
  fontSize: '0.85rem',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '4px',
  transition: 'background 0.15s',
});

const actionBtn = (color = '#CC0000') => ({
  background: color,
  color: '#fff',
  border: 'none',
  padding: '7px 14px',
  fontSize: '0.78rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'Barlow Condensed, sans-serif',
  letterSpacing: '1px',
});

const iconBtn = (color = '#CC0000') => ({
  background: 'none',
  border: 'none',
  color,
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
});

const Field = ({ label, children, span }) => (
  <div style={{ gridColumn: span ? `span ${span}` : 'span 1' }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text', required }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} style={inputStyle} />
);

const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} style={{ ...inputStyle }}>{children}</select>
);

const Textarea = ({ value, onChange, placeholder }) => (
  <textarea value={value} onChange={onChange} placeholder={placeholder} rows="3" style={{ ...inputStyle, resize: 'none' }} />
);

const SectionHead = ({ title, sub }) => (
  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', marginBottom: '24px' }}>
    <h3 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, letterSpacing: '1px', margin: 0 }}>{title}</h3>
    {sub && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '4px 0 0' }}>{sub}</p>}
  </div>
);

const AddForm = ({ onSubmit, children, cols = 2, submitLabel = 'ADD ENTRY' }) => (
  <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '16px', background: '#0a0a0c', padding: '24px', border: '1px solid rgba(255,255,255,0.06)', marginTop: '24px' }}>
    {children}
    <div style={{ gridColumn: `span ${cols}` }}>
      <button type="submit" style={{ ...actionBtn('#CC0000'), width: '100%', padding: '13px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Plus size={16} /> {submitLabel}
      </button>
    </div>
  </form>
);

// ── Inline edit panel ──────────────────────────────────────────────────────────
function EditDriverPanel({ driver, onSave, onCancel, onDelete }) {
  const [d, setD] = useState({ ...driver });
  const f = (k) => (e) => setD(prev => ({ ...prev, [k]: e.target.value }));
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      style={{ background: '#0f0f14', border: '1px solid #CC0000', padding: '24px', marginBottom: '4px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px', color: '#CC0000' }}>EDITING: {driver.name}</span>
        <button onClick={onCancel} style={iconBtn('rgba(255,255,255,0.4)')}><X size={18} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        <Field label="Driver Name"><input style={inputStyle} value={d.name} onChange={f('name')} /></Field>
        <Field label="Flag Emoji"><input style={inputStyle} value={d.nationality} onChange={f('nationality')} /></Field>
        <Field label="Team"><input style={inputStyle} value={d.team} onChange={f('team')} /></Field>
        <Field label="Car"><input style={inputStyle} value={d.car} onChange={f('car')} /></Field>
        <Field label="Points"><input type="number" style={inputStyle} value={d.pts} onChange={f('pts')} /></Field>
        <Field label="Wins"><input type="number" style={inputStyle} value={d.wins} onChange={f('wins')} /></Field>
        <Field label="Podiums"><input type="number" style={inputStyle} value={d.podiums} onChange={f('podiums')} /></Field>
        <Field label="Poles"><input type="number" style={inputStyle} value={d.poles} onChange={f('poles')} /></Field>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button onClick={() => onSave(d)} style={{ ...actionBtn('#059669'), flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Check size={14} /> SAVE CHANGES</button>
        <button onClick={() => onDelete(driver.name)} style={{ ...actionBtn('#CC0000'), padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}><Trash2 size={14} /> DELETE</button>
        <button onClick={onCancel} style={{ ...actionBtn('#2a2a30'), padding: '10px 20px' }}>CANCEL</button>
      </div>
    </motion.div>
  );
}

function EditTeamPanel({ team, onSave, onCancel, onDelete }) {
  const [t, setT] = useState({ ...team });
  const f = (k) => (e) => setT(prev => ({ ...prev, [k]: e.target.value }));
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      style={{ background: '#0f0f14', border: '1px solid #CC0000', padding: '24px', marginBottom: '4px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '1rem', letterSpacing: '1px', color: '#CC0000' }}>EDITING: {team.name}</span>
        <button onClick={onCancel} style={iconBtn('rgba(255,255,255,0.4)')}><X size={18} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        <Field label="Constructor Name"><input style={inputStyle} value={t.name} onChange={f('name')} /></Field>
        <Field label="Flag Emoji"><input style={inputStyle} value={t.nationality} onChange={f('nationality')} /></Field>
        <Field label="Car"><input style={inputStyle} value={t.car} onChange={f('car')} /></Field>
        <Field label="Points"><input type="number" style={inputStyle} value={t.pts} onChange={f('pts')} /></Field>
        <Field label="Wins"><input type="number" style={inputStyle} value={t.wins} onChange={f('wins')} /></Field>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button onClick={() => onSave(t)} style={{ ...actionBtn('#059669'), flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Check size={14} /> SAVE CHANGES</button>
        <button onClick={() => onDelete(team.name)} style={{ ...actionBtn('#CC0000'), padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}><Trash2 size={14} /> DELETE</button>
        <button onClick={onCancel} style={{ ...actionBtn('#2a2a30'), padding: '10px 20px' }}>CANCEL</button>
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed]     = useState(false);
  const [password, setPassword] = useState('');
  const [authErr, setAuthErr]   = useState(false);
  const [tab, setTab]           = useState('CALENDAR');
  const [inquiries, setInquiries]         = useState([]);
  const [dbData, setDbData]               = useState(null);

  const [newRace,    setNewRace]    = useState({ track:'', country:'', championship:'TEAM', date:'', time:'20:00 UTC', imageUrl:'' });
  const [raceImagePreview, setRaceImagePreview] = useState('');
  const [newNews,    setNewNews]    = useState({ title:'', date:'', tag:'REGULATIONS', summary:'' });
  const [newSponsor, setNewSponsor] = useState({ name:'', logo:'💿', type:'', tier:'PLATINUM', desc:'' });
  const [newDriver,  setNewDriver]  = useState({ name:'', nationality:'🇬🇧', team:'', car:'', pts:'', wins:'', podiums:'', poles:'' });
  const [newTeam,    setNewTeam]    = useState({ name:'', nationality:'🇬🇧', car:'', pts:'', wins:'' });

  // edit states
  const [editingDriver, setEditingDriver] = useState(null); // driver name being edited
  const [editingTeam,   setEditingTeam]   = useState(null); // team name being edited

  // ── auth ─────────────────────────────────────────────────────────────────────
  const hashPwd = async (pwd) => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pwd));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const entered = await hashPwd(password);
      const snap = await getDoc(doc(db, 'aspl', 'adminConfig'));
      if (!snap.exists()) {
        await setDoc(doc(db, 'aspl', 'adminConfig'), { hash: entered });
        setAuthed(true); setAuthErr(false);
      } else {
        if (entered === snap.data().hash) { setAuthed(true); setAuthErr(false); }
        else setAuthErr(true);
      }
    } catch {
      if (password === 'aspl2026') { setAuthed(true); setAuthErr(false); }
      else setAuthErr(true);
    }
  };

  // ── load data ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authed) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'aspl', 'database'));
        setDbData(snap.exists() ? snap.data() : FALLBACK);
      } catch { setDbData(FALLBACK); }
    })();

    const inqUnsub = onSnapshot(collection(db, 'enquiries'),
      (s) => setInquiries(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => setInquiries([])
    );
    return () => { inqUnsub(); };
  }, [authed]);

  // ── helpers ───────────────────────────────────────────────────────────────────
  const saveField = async (key, value) => {
    const next = { ...(dbData || FALLBACK), [key]: value };
    setDbData(next);
    try { await setDoc(doc(db, 'aspl', 'database'), next); }
    catch (e) { console.error('Firestore write error:', e); }
  };

  // ── CALENDAR ──────────────────────────────────────────────────────────────────
  const handleAddRace = async (e) => {
    e.preventDefault();
    if (!newRace.track || !newRace.date) return;
    await saveField('calendar', [...(dbData?.calendar || []), { id: Date.now(), ...newRace }]);
    setNewRace({ track:'', country:'', championship:'TEAM', date:'', time:'20:00 UTC', imageUrl:'' });
    setRaceImagePreview('');
  };
  const deleteRace = (id) => saveField('calendar', (dbData?.calendar || []).filter(r => r.id !== id));

  // ── NEWS ──────────────────────────────────────────────────────────────────────
  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.summary) return;
    await saveField('news', [{ id: Date.now(), date: newNews.date || new Date().toLocaleDateString(), ...newNews }, ...(dbData?.news || [])]);
    setNewNews({ title:'', date:'', tag:'REGULATIONS', summary:'' });
  };
  const deleteNews = (id) => saveField('news', (dbData?.news || []).filter(n => n.id !== id));

  // ── SPONSORS ──────────────────────────────────────────────────────────────────
  const handleAddSponsor = async (e) => {
    e.preventDefault();
    if (!newSponsor.name || !newSponsor.type) return;
    await saveField('sponsors', [...(dbData?.sponsors || []), { id: Date.now(), ...newSponsor }]);
    setNewSponsor({ name:'', logo:'💿', type:'', tier:'PLATINUM', desc:'' });
  };
  const deleteSponsor = (name) => saveField('sponsors', (dbData?.sponsors || []).filter(s => s.name !== name));

  // ── DRIVER STANDINGS ─────────────────────────────────────────────────────────
  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (!newDriver.name || !newDriver.pts) return;
    const item = { ...newDriver, pts: +newDriver.pts, wins: +newDriver.wins||0, podiums: +newDriver.podiums||0, poles: +newDriver.poles||0 };
    const sorted = [...(dbData?.driverStandings || []), item]
      .sort((a,b) => b.pts - a.pts).map((d,i) => ({ ...d, pos: i+1 }));
    await saveField('driverStandings', sorted);
    setNewDriver({ name:'', nationality:'🇬🇧', team:'', car:'', pts:'', wins:'', podiums:'', poles:'' });
  };

  const handleSaveDriver = async (updated) => {
    const existing = dbData?.driverStandings || [];
    const replaced = existing.map(d => d.name === editingDriver ? { ...d, ...updated, pts: +updated.pts, wins: +updated.wins||0, podiums: +updated.podiums||0, poles: +updated.poles||0 } : d);
    const sorted = replaced.sort((a,b) => b.pts - a.pts).map((d,i) => ({ ...d, pos: i+1 }));
    await saveField('driverStandings', sorted);
    setEditingDriver(null);
  };

  const handleDeleteDriver = async (name) => {
    const sorted = (dbData?.driverStandings || []).filter(d => d.name !== name).map((d,i) => ({...d, pos:i+1}));
    await saveField('driverStandings', sorted);
    setEditingDriver(null);
  };

  // ── TEAM STANDINGS ────────────────────────────────────────────────────────────
  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.pts) return;
    const item = { ...newTeam, pts: +newTeam.pts, wins: +newTeam.wins||0 };
    const sorted = [...(dbData?.teamStandings || []), item]
      .sort((a,b) => b.pts - a.pts).map((t,i) => ({ ...t, pos: i+1 }));
    await saveField('teamStandings', sorted);
    setNewTeam({ name:'', nationality:'🇬🇧', car:'', pts:'', wins:'' });
  };

  const handleSaveTeam = async (updated) => {
    const existing = dbData?.teamStandings || [];
    const replaced = existing.map(t => t.name === editingTeam ? { ...t, ...updated, pts: +updated.pts, wins: +updated.wins||0 } : t);
    const sorted = replaced.sort((a,b) => b.pts - a.pts).map((t,i) => ({ ...t, pos: i+1 }));
    await saveField('teamStandings', sorted);
    setEditingTeam(null);
  };

  const handleDeleteTeam = async (name) => {
    const sorted = (dbData?.teamStandings || []).filter(t => t.name !== name).map((t,i) => ({...t, pos:i+1}));
    await saveField('teamStandings', sorted);
    setEditingTeam(null);
  };

  // ── INQUIRIES ─────────────────────────────────────────────────────────────────
  const deleteInquiry = async (id) => {
    try { await deleteDoc(doc(db, 'enquiries', id)); }
    catch (e) { console.error(e); }
  };

  // ── PASSWORD RESET ────────────────────────────────────────────────────────────
  const [changingPwd, setChangingPwd]   = useState(false);
  const [pwdForm, setPwdForm]           = useState({ current: '', next: '', confirm: '' });
  const [pwdMsg, setPwdMsg]             = useState(null); // { ok, text }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg(null);
    if (pwdForm.next !== pwdForm.confirm) { setPwdMsg({ ok: false, text: 'New passwords do not match.' }); return; }
    if (pwdForm.next.length < 6) { setPwdMsg({ ok: false, text: 'Password must be at least 6 characters.' }); return; }
    try {
      const currentHash = await hashPwd(pwdForm.current);
      const snap = await getDoc(doc(db, 'aspl', 'adminConfig'));
      if (snap.exists() && snap.data().hash !== currentHash) { setPwdMsg({ ok: false, text: 'Current password is incorrect.' }); return; }
      const newHash = await hashPwd(pwdForm.next);
      await setDoc(doc(db, 'aspl', 'adminConfig'), { hash: newHash });
      setPwdMsg({ ok: true, text: 'Password updated successfully.' });
      setTimeout(() => { setChangingPwd(false); setPwdForm({ current: '', next: '', confirm: '' }); setPwdMsg(null); }, 2000);
    } catch { setPwdMsg({ ok: false, text: 'Firestore error — try again.' }); }
  };

  // ── DANGER ZONE ───────────────────────────────────────────────────────────────
  const [confirmWipe, setConfirmWipe] = useState(null); // key to wipe

  const wipeField = async (key) => {
    await saveField(key, []);
    setConfirmWipe(null);
  };

  const EMPTY_DB = { calendar: [], driverStandings: [], teamStandings: [], news: [], sponsors: [] };
  const wipeAll = async () => {
    const next = { ...(dbData || {}), ...EMPTY_DB };
    setDbData(next);
    try { await setDoc(doc(db, 'aspl', 'database'), next); }
    catch (e) { console.error(e); }
    setConfirmWipe(null);
  };

  const tabs = [
    { key: 'CALENDAR',      label: 'Race Calendar',        icon: <Calendar size={15} />,    badge: dbData?.calendar?.length },
    { key: 'DRIVERS',       label: 'Driver Standings',     icon: <ShieldCheck size={15} />, badge: dbData?.driverStandings?.length },
    { key: 'TEAMS',         label: 'Team Standings',       icon: <ShieldCheck size={15} />, badge: dbData?.teamStandings?.length },
    { key: 'NEWS',          label: 'News & Bulletins',     icon: <Newspaper size={15} />,   badge: dbData?.news?.length },
    { key: 'SPONSORS',      label: 'Sponsors',             icon: <ShieldCheck size={15} />, badge: dbData?.sponsors?.length },
    { key: 'INQUIRIES',     label: 'Partner Inquiries',    icon: <Newspaper size={15} />,   badge: inquiries.length },
    { key: 'SETTINGS',      label: 'Settings',             icon: <Lock size={15} /> },
  ];

  return (
    <div style={{ background: '#080808', minHeight: '100vh', padding: '120px 24px 80px', color: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {!authed ? (
          <div style={{ maxWidth: '420px', margin: '60px auto 0', background: 'rgba(18,18,22,0.9)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', padding: '40px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(204,0,0,0.1)', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#CC0000' }}>
              <Key size={32} />
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '8px' }}>ADMINISTRATIVE ACCESS</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '28px' }}>Enter your stewards staff credentials to access the control panel.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}>PASS KEY</label>
                <input type="password" placeholder="Staff password" value={password} onChange={e => setPassword(e.target.value)} required style={{ ...inputStyle, letterSpacing: '3px' }} />
                {authErr && <p style={{ color: '#CC0000', fontSize: '0.78rem', marginTop: '6px', fontWeight: 700 }}>❌ INVALID KEY — TRY AGAIN</p>}
              </div>
              <button type="submit" style={{ ...actionBtn(), padding: '14px', fontSize: '0.9rem', width: '100%', fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '2px' }}>
                VERIFY STAFF ACCESS
              </button>
            </form>
          </div>

        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '24px' }}>
              <div>
                <div style={{ color: '#CC0000', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <ShieldCheck size={14} /> STEWARDS VERIFIED
                </div>
                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '2.2rem', fontWeight: 900, letterSpacing: '1px', margin: 0 }}>ASPL CONTROL PANEL</h2>
              </div>
              <button onClick={() => setAuthed(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '10px 20px', cursor: 'pointer', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>
                SIGN OUT
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>

              {/* Sidebar */}
              <div style={{ position: 'sticky', top: '100px' }}>
                {tabs.map(t => (
                  <button key={t.key} onClick={() => { setTab(t.key); setEditingDriver(null); setEditingTeam(null); }} style={tabBtnStyle(tab === t.key)}>
                    {t.icon}
                    <span style={{ flex: 1 }}>{t.label}</span>
                    {!!t.badge && (
                      <span style={{ background: tab === t.key ? '#fff' : '#CC0000', color: tab === t.key ? '#000' : '#fff', fontSize: '0.68rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>{t.badge}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div style={{ background: 'rgba(18,18,22,0.7)', border: '1px solid rgba(255,255,255,0.07)', padding: '32px' }}>

                {/* ── CALENDAR ── */}
                {tab === 'CALENDAR' && (
                  <div>
                    <SectionHead title="RACE CALENDAR" sub="Add or remove scheduled race events" />
                    {(dbData?.calendar || []).length === 0 && <p style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: '16px' }}>No events scheduled yet.</p>}
                    {(dbData?.calendar || []).map(race => (
                      <div key={race.id} style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem' }}>{race.track}</strong>{race.country ? ` — ${race.country}` : ''}
                          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                            {race.date} @ {race.time} · <span style={{ color: '#CC0000', fontWeight: 700 }}>{race.championship}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteRace(race.id)} style={iconBtn()}><Trash2 size={18} /></button>
                      </div>
                    ))}
                    <AddForm onSubmit={handleAddRace} cols={2}>
                      <Field label="Circuit Name"><Input value={newRace.track} onChange={e => setNewRace({...newRace, track: e.target.value})} placeholder="e.g. Suzuka" required /></Field>
                      <Field label="Country"><Input value={newRace.country} onChange={e => setNewRace({...newRace, country: e.target.value})} placeholder="e.g. Japan" /></Field>
                      <Field label="Date"><Input value={newRace.date} onChange={e => setNewRace({...newRace, date: e.target.value})} placeholder="e.g. Saturday, July 12, 2026" required /></Field>
                      <Field label="Time (UTC)"><Input value={newRace.time} onChange={e => setNewRace({...newRace, time: e.target.value})} placeholder="e.g. 19:30 UTC" /></Field>
                      <Field label="Championship">
                        <Select value={newRace.championship} onChange={e => setNewRace({...newRace, championship: e.target.value})}>
                          <option value="TEAM">TEAM SERIES</option>
                          <option value="SOLO">SOLO SPRINT</option>
                          <option value="ENDURANCE">ENDURANCE</option>
                        </Select>
                      </Field>
                      <Field label="Banner Image (optional)" span={2}>
                        <div>
                          <input type="file" accept="image/*" style={{ display: 'none' }} id="race-img-upload"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = ev => {
                                const b64 = ev.target.result;
                                setRaceImagePreview(b64);
                                setNewRace(r => ({ ...r, imageUrl: b64 }));
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                          <label htmlFor="race-img-upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '10px 18px', fontSize: '0.82rem', fontFamily: 'var(--font-display)', letterSpacing: '1px', transition: 'border-color 0.2s' }}>
                            📁 CHOOSE IMAGE FILE
                          </label>
                          {raceImagePreview && (
                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={raceImagePreview} alt="preview" style={{ height: '60px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
                              <button type="button" onClick={() => { setRaceImagePreview(''); setNewRace(r => ({ ...r, imageUrl: '' })); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.75rem' }}>✕ Remove</button>
                            </div>
                          )}
                        </div>
                      </Field>
                    </AddForm>
                  </div>
                )}

                {/* ── DRIVER STANDINGS ── */}
                {tab === 'DRIVERS' && (
                  <div>
                    <SectionHead title="DRIVER STANDINGS" sub="Click the edit icon on any row to modify or delete a driver" />

                    {(dbData?.driverStandings || []).length === 0 ? (
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: '16px' }}>No drivers added yet.</p>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                              {['POS','DRIVER','TEAM','CAR','PTS','W','POD','POL',''].map(h => (
                                <th key={h} style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 700, letterSpacing: '1px', fontSize: '0.75rem' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(dbData?.driverStandings || []).map((d, i) => (
                              <React.Fragment key={d.name}>
                                <tr
                                  style={{ borderBottom: editingDriver === d.name ? 'none' : '1px solid rgba(255,255,255,0.05)', height: '44px', background: editingDriver === d.name ? '#0f0f14' : 'transparent', transition: 'background 0.15s' }}
                                >
                                  <td style={{ padding: '8px', color: '#CC0000', fontWeight: 700 }}>{d.pos}</td>
                                  <td style={{ fontWeight: 700 }}>{d.nationality} {d.name}</td>
                                  <td style={{ color: 'rgba(255,255,255,0.5)' }}>{d.team}</td>
                                  <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{d.car}</td>
                                  <td style={{ fontWeight: 700 }}>{d.pts}</td>
                                  <td>{d.wins}</td>
                                  <td>{d.podiums}</td>
                                  <td>{d.poles}</td>
                                  <td>
                                    <button
                                      onClick={() => setEditingDriver(editingDriver === d.name ? null : d.name)}
                                      title="Edit driver"
                                      style={{ ...iconBtn(editingDriver === d.name ? '#CC0000' : 'rgba(255,255,255,0.35)') }}
                                    >
                                      {editingDriver === d.name ? <X size={15} /> : <Edit2 size={15} />}
                                    </button>
                                  </td>
                                </tr>
                                <AnimatePresence>
                                  {editingDriver === d.name && (
                                    <tr>
                                      <td colSpan={9} style={{ padding: '0 0 2px 0' }}>
                                        <EditDriverPanel
                                          driver={d}
                                          onSave={handleSaveDriver}
                                          onCancel={() => setEditingDriver(null)}
                                          onDelete={handleDeleteDriver}
                                        />
                                      </td>
                                    </tr>
                                  )}
                                </AnimatePresence>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <AddForm onSubmit={handleAddDriver} cols={2}>
                      <Field label="Driver Name"><Input value={newDriver.name} onChange={e => setNewDriver({...newDriver, name: e.target.value})} placeholder="e.g. Lucas Rossi" required /></Field>
                      <Field label="Flag Emoji"><Input value={newDriver.nationality} onChange={e => setNewDriver({...newDriver, nationality: e.target.value})} placeholder="🇮🇹" /></Field>
                      <Field label="Team"><Input value={newDriver.team} onChange={e => setNewDriver({...newDriver, team: e.target.value})} placeholder="e.g. Scuderia Veloce" /></Field>
                      <Field label="Car"><Input value={newDriver.car} onChange={e => setNewDriver({...newDriver, car: e.target.value})} placeholder="e.g. Ferrari 296 GT3" /></Field>
                      <Field label="Points"><Input type="number" value={newDriver.pts} onChange={e => setNewDriver({...newDriver, pts: e.target.value})} placeholder="e.g. 142" required /></Field>
                      <Field label="Wins"><Input type="number" value={newDriver.wins} onChange={e => setNewDriver({...newDriver, wins: e.target.value})} placeholder="e.g. 3" /></Field>
                      <Field label="Podiums"><Input type="number" value={newDriver.podiums} onChange={e => setNewDriver({...newDriver, podiums: e.target.value})} placeholder="e.g. 5" /></Field>
                      <Field label="Pole Positions"><Input type="number" value={newDriver.poles} onChange={e => setNewDriver({...newDriver, poles: e.target.value})} placeholder="e.g. 2" /></Field>
                    </AddForm>
                  </div>
                )}

                {/* ── TEAM STANDINGS ── */}
                {tab === 'TEAMS' && (
                  <div>
                    <SectionHead title="TEAM STANDINGS" sub="Click the edit icon on any row to modify or delete a constructor" />

                    {(dbData?.teamStandings || []).length === 0 ? (
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: '16px' }}>No teams added yet.</p>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                              {['POS','CONSTRUCTOR','CAR','WINS','PTS',''].map(h => (
                                <th key={h} style={{ padding: '10px 8px', textAlign: 'left', fontWeight: 700, letterSpacing: '1px', fontSize: '0.75rem' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(dbData?.teamStandings || []).map((t, i) => (
                              <React.Fragment key={t.name}>
                                <tr style={{ borderBottom: editingTeam === t.name ? 'none' : '1px solid rgba(255,255,255,0.05)', height: '44px', background: editingTeam === t.name ? '#0f0f14' : 'transparent' }}>
                                  <td style={{ padding: '8px', color: '#CC0000', fontWeight: 700 }}>{t.pos}</td>
                                  <td style={{ fontWeight: 700 }}>{t.nationality} {t.name}</td>
                                  <td style={{ color: 'rgba(255,255,255,0.5)' }}>{t.car}</td>
                                  <td>{t.wins}</td>
                                  <td style={{ fontWeight: 700, color: '#CC0000' }}>{t.pts}</td>
                                  <td>
                                    <button
                                      onClick={() => setEditingTeam(editingTeam === t.name ? null : t.name)}
                                      title="Edit team"
                                      style={{ ...iconBtn(editingTeam === t.name ? '#CC0000' : 'rgba(255,255,255,0.35)') }}
                                    >
                                      {editingTeam === t.name ? <X size={15} /> : <Edit2 size={15} />}
                                    </button>
                                  </td>
                                </tr>
                                <AnimatePresence>
                                  {editingTeam === t.name && (
                                    <tr>
                                      <td colSpan={6} style={{ padding: '0 0 2px 0' }}>
                                        <EditTeamPanel
                                          team={t}
                                          onSave={handleSaveTeam}
                                          onCancel={() => setEditingTeam(null)}
                                          onDelete={handleDeleteTeam}
                                        />
                                      </td>
                                    </tr>
                                  )}
                                </AnimatePresence>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <AddForm onSubmit={handleAddTeam} cols={2}>
                      <Field label="Constructor Name"><Input value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} placeholder="e.g. Scuderia Veloce" required /></Field>
                      <Field label="Flag Emoji"><Input value={newTeam.nationality} onChange={e => setNewTeam({...newTeam, nationality: e.target.value})} placeholder="🇮🇹" /></Field>
                      <Field label="Car"><Input value={newTeam.car} onChange={e => setNewTeam({...newTeam, car: e.target.value})} placeholder="e.g. Ferrari 296 GT3" /></Field>
                      <Field label="Points"><Input type="number" value={newTeam.pts} onChange={e => setNewTeam({...newTeam, pts: e.target.value})} placeholder="e.g. 215" required /></Field>
                      <Field label="Wins"><Input type="number" value={newTeam.wins} onChange={e => setNewTeam({...newTeam, wins: e.target.value})} placeholder="e.g. 3" /></Field>
                    </AddForm>
                  </div>
                )}

                {/* ── NEWS ── */}
                {tab === 'NEWS' && (
                  <div>
                    <SectionHead title="NEWS & BULLETINS" sub="Publish league announcements visible on the home page" />
                    {(dbData?.news || []).length === 0 && <p style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: '16px' }}>No bulletins published yet.</p>}
                    {(dbData?.news || []).map(n => (
                      <div key={n.id} style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ background: '#CC0000', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', fontWeight: 700 }}>{n.tag}</span>
                            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>{n.date}</span>
                          </div>
                          <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '4px' }}>{n.title}</strong>
                          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0 }}>{n.summary}</p>
                        </div>
                        <button onClick={() => deleteNews(n.id)} style={iconBtn()}><Trash2 size={18} /></button>
                      </div>
                    ))}
                    <AddForm onSubmit={handleAddNews} cols={2}>
                      <Field label="Headline Title" span={2}><Input value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} placeholder="e.g. BOP UPDATE FOR SPA" required /></Field>
                      <Field label="Category Tag">
                        <Select value={newNews.tag} onChange={e => setNewNews({...newNews, tag: e.target.value})}>
                          <option value="REGULATIONS">REGULATIONS</option>
                          <option value="EVENTS">EVENTS</option>
                          <option value="COMMUNITY">COMMUNITY</option>
                        </Select>
                      </Field>
                      <Field label="Date"><Input value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} placeholder="e.g. May 28, 2026" /></Field>
                      <Field label="Summary Text" span={2}><Textarea value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} placeholder="Brief description of the announcement..." /></Field>
                    </AddForm>
                  </div>
                )}

                {/* ── SPONSORS ── */}
                {tab === 'SPONSORS' && (
                  <div>
                    <SectionHead title="OFFICIAL PARTNERS" sub="Manage sponsor brands shown on the Sponsors page" />
                    {(dbData?.sponsors || []).length === 0 && <p style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', marginBottom: '16px' }}>No sponsors added yet.</p>}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                      {(dbData?.sponsors || []).map((s, i) => (
                        <div key={i} style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.65rem', color: '#CC0000', fontWeight: 700 }}>{s.tier}</span>
                          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.logo}</div>
                          <strong style={{ fontSize: '1.05rem' }}>{s.name}</strong>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', margin: '4px 0 12px' }}>{s.type}</p>
                          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 14px' }}>{s.desc}</p>
                          <button onClick={() => deleteSponsor(s.name)} style={{ background: 'none', border: 'none', color: '#CC0000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                            <Trash2 size={14} /> REMOVE
                          </button>
                        </div>
                      ))}
                    </div>
                    <AddForm onSubmit={handleAddSponsor} cols={2}>
                      <Field label="Brand Name"><Input value={newSponsor.name} onChange={e => setNewSponsor({...newSponsor, name: e.target.value})} placeholder="e.g. Fanatec Racing" required /></Field>
                      <Field label="Partnership Type"><Input value={newSponsor.type} onChange={e => setNewSponsor({...newSponsor, type: e.target.value})} placeholder="e.g. Official Sim Rig Partner" required /></Field>
                      <Field label="Tier">
                        <Select value={newSponsor.tier} onChange={e => setNewSponsor({...newSponsor, tier: e.target.value})}>
                          <option value="PLATINUM">PLATINUM</option>
                          <option value="GOLD">GOLD</option>
                          <option value="SILVER">SILVER</option>
                          <option value="HARDWARE">HARDWARE</option>
                        </Select>
                      </Field>
                      <Field label="Logo Emoji"><Input value={newSponsor.logo} onChange={e => setNewSponsor({...newSponsor, logo: e.target.value})} placeholder="e.g. 💿" /></Field>
                      <Field label="Description" span={2}><Textarea value={newSponsor.desc} onChange={e => setNewSponsor({...newSponsor, desc: e.target.value})} placeholder="Brand value & contribution to the paddock..." /></Field>
                    </AddForm>
                  </div>
                )}

                {/* ── INQUIRIES ── */}
                {tab === 'INQUIRIES' && (
                  <div>
                    <SectionHead title="PARTNER PROPOSALS" sub="Business synergy inquiries submitted via the Sponsors page" />
                    {inquiries.length === 0 ? (
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>No proposals received yet.</p>
                    ) : inquiries.map(inq => (
                      <div key={inq.id} style={{ background: '#0a0a0c', borderLeft: '4px solid #CC0000', border: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '1.2rem' }}>{inq.company}</strong>
                            <span style={{ background: 'rgba(255,255,255,0.06)', color: '#CC0000', fontSize: '0.65rem', padding: '2px 8px', fontWeight: 700 }}>{inq.tier}</span>
                          </div>
                          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', margin: '0 0 10px' }}>
                            Contact: <strong style={{ color: '#fff' }}>{inq.contactName}</strong> · <a href={`mailto:${inq.email}`} style={{ color: '#CC0000' }}>{inq.email}</a>
                          </p>
                          {inq.message && (
                            <p style={{ background: '#050508', border: '1px solid rgba(255,255,255,0.06)', padding: '12px', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{inq.message}</p>
                          )}
                        </div>
                        <button onClick={() => deleteInquiry(inq.id)} style={iconBtn()}><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── SETTINGS ── */}
                {tab === 'SETTINGS' && (
                  <div>
                    <SectionHead title="SETTINGS" sub="Password management and database tools" />

                    {/* Change Password */}
                    <div style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', padding: '28px', marginBottom: '32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                          <h4 style={{ color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.1rem', letterSpacing: '1px', margin: 0 }}>CHANGE ADMIN PASSWORD</h4>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '4px 0 0' }}>Update the stewards panel access key</p>
                        </div>
                        <button onClick={() => { setChangingPwd(v => !v); setPwdMsg(null); setPwdForm({ current: '', next: '', confirm: '' }); }}
                          style={{ ...actionBtn(changingPwd ? '#2a2a30' : '#CC0000'), display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Lock size={14} /> {changingPwd ? 'CANCEL' : 'CHANGE PASSWORD'}
                        </button>
                      </div>

                      <AnimatePresence>
                        {changingPwd && (
                          <motion.form
                            key="pwd-form"
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleChangePassword}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', overflow: 'hidden' }}
                          >
                            <Field label="Current Password" span={2}>
                              <input type="password" style={inputStyle} placeholder="Enter current password" value={pwdForm.current} onChange={e => setPwdForm(p => ({ ...p, current: e.target.value }))} required />
                            </Field>
                            <Field label="New Password">
                              <input type="password" style={inputStyle} placeholder="Min. 6 characters" value={pwdForm.next} onChange={e => setPwdForm(p => ({ ...p, next: e.target.value }))} required />
                            </Field>
                            <Field label="Confirm New Password">
                              <input type="password" style={inputStyle} placeholder="Repeat new password" value={pwdForm.confirm} onChange={e => setPwdForm(p => ({ ...p, confirm: e.target.value }))} required />
                            </Field>
                            {pwdMsg && (
                              <div style={{ gridColumn: 'span 2', padding: '10px 14px', background: pwdMsg.ok ? 'rgba(5,150,105,0.15)' : 'rgba(204,0,0,0.15)', border: `1px solid ${pwdMsg.ok ? '#059669' : '#CC0000'}`, color: pwdMsg.ok ? '#6ee7b7' : '#fca5a5', fontSize: '0.85rem', fontWeight: 700 }}>
                                {pwdMsg.ok ? '✅' : '❌'} {pwdMsg.text}
                              </div>
                            )}
                            <div style={{ gridColumn: 'span 2' }}>
                              <button type="submit" style={{ ...actionBtn('#059669'), width: '100%', padding: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Check size={15} /> SAVE NEW PASSWORD
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Danger Zone */}
                    <div style={{ background: '#0a0a0c', border: '1px solid rgba(204,0,0,0.3)', padding: '28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <AlertTriangle size={18} style={{ color: '#CC0000' }} />
                        <h4 style={{ color: '#CC0000', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.1rem', letterSpacing: '1px', margin: 0 }}>DANGER ZONE</h4>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '24px', lineHeight: 1.6 }}>
                        Use these to clear stale or placeholder data from Firestore. These actions are <strong style={{ color: '#fff' }}>permanent</strong> — all entries in that section will be deleted.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        {[
                          { key: 'driverStandings', label: 'Driver Standings',  count: dbData?.driverStandings?.length },
                          { key: 'teamStandings',   label: 'Team Standings',    count: dbData?.teamStandings?.length },
                          { key: 'calendar',        label: 'Race Calendar',     count: dbData?.calendar?.length },
                          { key: 'news',            label: 'News & Bulletins',  count: dbData?.news?.length },
                          { key: 'sponsors',        label: 'Sponsors',          count: dbData?.sponsors?.length },
                        ].map(({ key, label, count }) => (
                          <div key={key} style={{ background: '#060609', border: '1px solid rgba(255,255,255,0.06)', padding: '14px' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{label}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>{count || 0} entries</div>
                            {confirmWipe === key ? (
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button onClick={() => wipeField(key)} style={{ ...actionBtn('#CC0000'), flex: 1, padding: '6px 8px', fontSize: '0.72rem' }}>CONFIRM</button>
                                <button onClick={() => setConfirmWipe(null)} style={{ ...actionBtn('#2a2a30'), padding: '6px 8px', fontSize: '0.72rem' }}>NO</button>
                              </div>
                            ) : (
                              <button onClick={() => setConfirmWipe(key)} style={{ ...actionBtn('#1a0a0a'), border: '1px solid rgba(204,0,0,0.3)', color: '#CC0000', width: '100%', padding: '6px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                <Trash2 size={11} /> CLEAR ALL
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(204,0,0,0.2)' }}>
                        {confirmWipe === 'ALL' ? (
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{ color: '#fca5a5', fontSize: '0.85rem', flex: 1 }}>⚠️ This will wipe ALL data. Are you sure?</span>
                            <button onClick={wipeAll} style={{ ...actionBtn('#CC0000'), padding: '10px 20px' }}>YES, WIPE EVERYTHING</button>
                            <button onClick={() => setConfirmWipe(null)} style={{ ...actionBtn('#2a2a30'), padding: '10px 20px' }}>CANCEL</button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmWipe('ALL')} style={{ ...actionBtn('#1a0a0a'), border: '1px solid rgba(204,0,0,0.4)', color: '#CC0000', width: '100%', padding: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <AlertTriangle size={14} /> WIPE ENTIRE DATABASE
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
