import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Calendar, 
  Award, 
  Users, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  Play, 
  Send, 
  Flag, 
  Tv, 
  UserCheck, 
  Disc, 
  BookOpen, 
  Search, 
  Info,
  CheckCircle
} from 'lucide-react';

function Home() {
  // Navigation tabs, active states, calendar filters
  const [calendarFilter, setCalendarFilter] = useState('ALL');
  const [standingsTab, setStandingsTab] = useState('DRIVERS');
  const [signupTab, setSignupTab] = useState('DRIVER');
  
  // Incident submission simulation state
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const [incidentData, setIncidentData] = useState({
    session: 'RACE',
    lap: '',
    driverA: '',
    driverB: '',
    description: ''
  });

  // Driver Registration simulation state
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [regData, setRegData] = useState({
    name: '',
    discordName: '',
    platform: 'PS5',
    car: 'Porsche 911 GT3 R (992)',
    number: '',
    team: '',
    role: 'FULLTIME'
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Data
  const calendarEvents = [
    {
      id: 1,
      track: 'Spa-Francorchamps',
      country: 'Belgium',
      championship: 'TEAM',
      date: 'Saturday, June 6, 2026',
      time: '20:00 UTC',
      layout: 'M 10,70 L 20,40 L 40,20 L 70,10 L 95,25 L 85,55 L 70,60 L 50,75 L 35,90 L 10,70 Z', // custom circuit SVG path
      length: '7.004 km',
      turns: 20
    },
    {
      id: 2,
      track: 'Monza Circuit',
      country: 'Italy',
      championship: 'SOLO',
      date: 'Wednesday, June 10, 2026',
      time: '19:30 UTC',
      layout: 'M 10,30 L 90,30 L 95,50 L 70,55 L 65,45 L 35,45 L 30,55 L 10,55 Z',
      length: '5.793 km',
      turns: 11
    },
    {
      id: 3,
      track: 'Mount Panorama (Bathurst)',
      country: 'Australia',
      championship: 'ENDURANCE',
      date: 'Saturday, June 20, 2026',
      time: '18:00 UTC',
      layout: 'M 15,80 L 30,30 L 50,20 L 80,30 L 90,45 L 85,60 L 70,70 L 40,65 L 25,85 Z',
      length: '6.213 km',
      turns: 23
    },
    {
      id: 4,
      track: 'Silverstone Circuit',
      country: 'United Kingdom',
      championship: 'TEAM',
      date: 'Saturday, June 27, 2026',
      time: '20:00 UTC',
      layout: 'M 10,50 L 30,20 L 60,15 L 85,35 L 90,65 L 70,80 L 45,75 L 25,90 Z',
      length: '5.891 km',
      turns: 18
    }
  ];

  const driverStandings = [
    { pos: 1, name: 'Lucas Rossi', nationality: '🇮🇹', team: 'Scuderia Veloce', car: 'Ferrari 296 GT3', pts: 142, wins: 3, podiums: 5, poles: 2 },
    { pos: 2, name: 'Niklas Weber', nationality: '🇩🇪', team: 'APEX Engineering', car: 'Porsche 911 GT3 R (992)', pts: 128, wins: 2, podiums: 4, poles: 4 },
    { pos: 3, name: 'Alexander Smith', nationality: '🇬🇧', team: 'Blackwood Racing', car: 'Aston Martin Vantage GT3', pts: 115, wins: 1, podiums: 3, poles: 0 },
    { pos: 4, name: 'Mateo Dupont', nationality: '🇫🇷', team: 'Team Alpine Blue', car: 'Alpine A110 GT4', pts: 96, wins: 0, podiums: 2, poles: 1 },
    { pos: 5, name: 'Marcus Lindqvist', nationality: '🇸🇪', team: 'Nordic Sim Racing', car: 'Volvo S60 ACC', pts: 88, wins: 1, podiums: 1, poles: 0 },
    { pos: 6, name: 'Jack Miller', nationality: '🇺🇸', team: 'Rebel Racing', car: 'Ford Mustang GT3', pts: 74, wins: 0, podiums: 1, poles: 0 }
  ];

  const teamStandings = [
    { pos: 1, name: 'Scuderia Veloce', nationality: '🇮🇹', car: 'Ferrari 296 GT3', pts: 215, wins: 3 },
    { pos: 2, name: 'APEX Engineering', nationality: '🇩🇪', car: 'Porsche 911 GT3 R (992)', pts: 198, wins: 2 },
    { pos: 3, name: 'Blackwood Racing', nationality: '🇬🇧', car: 'Aston Martin Vantage GT3', pts: 164, wins: 1 },
    { pos: 4, name: 'Nordic Sim Racing', nationality: '🇸🇪', car: 'Volvo S60 ACC', pts: 120, wins: 1 }
  ];

  const newsFeed = [
    {
      id: 1,
      title: 'SEASON 4 REGULATIONS ANNOUNCED',
      date: 'May 25, 2026',
      tag: 'REGULATIONS',
      summary: 'New Balance of Performance updates and stewarding response changes detailed ahead of the season launch.'
    },
    {
      id: 2,
      title: 'ASPL ENDURANCE SHAKEDOWN SCHEDULE',
      date: 'May 18, 2026',
      tag: 'EVENTS',
      summary: 'Get ready for 6 Hours of Bathurst! Team registrations are limited. Grid spots assigned by qualifiers.'
    },
    {
      id: 3,
      title: 'FIA-STYLE STEWARDING OVERHAUL',
      date: 'May 10, 2026',
      tag: 'STEWARDING',
      summary: 'Introducing professional racing consultants to lead the incident reviews, promising cleaner lobbies.'
    }
  ];

  const handleIncidentSubmit = (e) => {
    e.preventDefault();
    if (!incidentData.driverA || !incidentData.driverB) return;
    setIncidentSubmitted(true);
    setTimeout(() => {
      setIncidentSubmitted(false);
      setIncidentData({ session: 'RACE', lap: '', driverA: '', driverB: '', description: '' });
    }, 5000);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (!regData.name || !regData.number) return;
    setRegistrationSubmitted(true);
    setTimeout(() => {
      setRegistrationSubmitted(false);
      setRegData({ name: '', discordName: '', platform: 'PS5', car: 'Porsche 911 GT3 R (992)', number: '', team: '', role: 'FULLTIME' });
    }, 6000);
  };

  const filteredCalendar = calendarFilter === 'ALL' 
    ? calendarEvents 
    : calendarEvents.filter(e => e.championship === calendarFilter);

  return (
    <div className="carbon-bg" style={{ minHeight: '100vh' }}>
      
      {/* ==========================================
         HERO SECTION
         ========================================== */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
        background: 'url("/Article-1.jpg") center/cover no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        {/* Optional: Keep a dark overlay for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(5, 5, 8, 0.6)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr', gap: '50px', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'center' }}>
            {/* Platform Badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '24px' }}>
              <span style={{ background: '#003087', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '6px 16px', letterSpacing: '2px', border: '1px solid #0043c0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎮 PLAYSTATION 5
              </span>
              <span style={{ background: '#107c10', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '6px 16px', letterSpacing: '2px', border: '1px solid #139d13', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎮 XBOX SERIES X|S
              </span>
            </div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-1px', marginBottom: '24px', textTransform: 'uppercase' }}
            >
              CRAFTING THE FUTURE OF <br />
              <span style={{ color: 'var(--accent-red)', textShadow: '0 0 30px var(--accent-red-glow)' }}>ACC CONSOLE ESPORTS</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 40px', lineHeight: 1.6 }}
            >
              ASPL is a competitive, professional Assetto Corsa Competizione console league. Focusing on ultra-clean racing, championship stewarding standards, and team-driven driver development.
            </motion.p>

            {/* Quick Action Button Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '60px' }}>
              <a href="#registration" className="btn-aspl btn-aspl-primary" style={{ minWidth: '200px' }}>
                <UserCheck size={18} /> REGISTER NOW
              </a>
              <a href="https://discord.gg/your-link" target="_blank" rel="noopener noreferrer" className="btn-aspl btn-aspl-secondary" style={{ minWidth: '200px' }}>
                <Disc size={18} /> DISCORD PADDOCK
              </a>
              <a href="#calendar" className="btn-aspl btn-aspl-accent" style={{ minWidth: '200px' }}>
                <Calendar size={18} /> RACE SCHEDULE
              </a>
            </div>

            {/* Interactive Next Race Countdown Panel */}
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px', background: 'rgba(18, 18, 22, 0.75)', border: '1px solid var(--border-color)', backdropFilter: 'blur(10px)', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '1.5px', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} /> NEXT OFFICIATED RACE EVENT
                </span>
                <span style={{ background: 'var(--accent-gray)', fontSize: '0.7rem', padding: '3px 8px', fontWeight: 'bold' }}>SPA-FRANCORCHAMPS</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{timeLeft.days}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>DAYS</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-muted)', opacity: 0.5, lineHeight: 1 }}>:</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{timeLeft.hours}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>HRS</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-muted)', opacity: 0.5, lineHeight: 1 }}>:</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{timeLeft.minutes}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>MINS</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-muted)', opacity: 0.5, lineHeight: 1 }}>:</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-red)', lineHeight: 1 }}>{timeLeft.seconds}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>SECS</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Diagonal Cut separator at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40px', background: 'var(--bg-darker)', clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* ==========================================
         ABOUT ASPL
         ========================================== */}
      <section id="about" className="content-section">
        <div className="section-header">
          <div className="sub">ABOUT THE LEAGUE</div>
          <h2>THE PROFESSIONAL STANDARD</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
          
          <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '16px', fontFamily: 'var(--font-display)', letterSpacing: '1.2px' }}>VISION & PADDOCK ETHOS</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Established to provide console racing enthusiasts with an unrivaled competitive landscape, ASPL sets aside childish 'arcade' habits in favor of professional endurance standards. We operate on a foundation of clean driving discipline, making the league a home both for elite sim racers and aspiring rookies.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              By prioritizing driver development and cultivating team coaching frameworks, we guarantee that no racer remains stagnant on the grid. Everyone progresses together.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--accent-red)' }}><Trophy size={32} /></div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>SERIOUS MOTORSPORT</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Authentic weekend formatting with free practice, qualifying grid setup, and real weather coefficients.
              </p>
            </div>
            
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--accent-red)' }}><Users size={32} /></div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>TEAM COACHING</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Veteran drivers mentor newcomers, sharing telemetry analysis, setup secrets, and track guides.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--accent-red)' }}><ShieldAlert size={32} /></div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>STEWARDING STANDARDS</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Post-race incidents undergo examination by an independent stewarding panel enforcing real sporting codes.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--accent-red)' }}><Tv size={32} /></div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>FULL BROADCASTS</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Major division events are fully casted on Twitch and uploaded with commentary and overlays.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
         LEAGUE STRUCTURE
         ========================================== */}
      <section id="series" style={{ background: '#08080b', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="content-section">
          <div className="section-header">
            <div className="sub">CHAMPIONSHIPS</div>
            <h2>LEAGUE STRUCTURE</h2>
          </div>

          <div className="aspl-grid-3" style={{ marginBottom: '40px' }}>
            
            {/* Team Series */}
            <div className="glass-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '6rem', color: 'var(--border-color)', opacity: 0.15, fontWeight: 900, fontFamily: 'var(--font-display)' }}>01</div>
              <span style={{ background: 'var(--accent-red)', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>SATURDAYS</span>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>ACC TEAM SERIES</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                The crown jewel of ASPL. Teams of 2 to 4 drivers compete in multi-class environments to accumulate constructor points. High-intensity team strategy and qualifying weight play crucial roles.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>60-Minute Sprint Races</li>
                <li>Mandatory Pitstop Windows</li>
                <li>Driver-swap and solo entry support</li>
              </ul>
            </div>

            {/* Solo Series */}
            <div className="glass-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '6rem', color: 'var(--border-color)', opacity: 0.15, fontWeight: 900, fontFamily: 'var(--font-display)' }}>02</div>
              <span style={{ background: 'var(--accent-gray)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>WEDNESDAYS</span>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>ACC SOLO SPRINT SERIES</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Pure driver versus driver action. No team standings, no manufacturer restrictions. Perfect for testing individual raw pace, tyre saving tactics, and racecraft across multiple divisions.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Short Quali + Twin 25-Min Sprint Format</li>
                <li>Promotion and Relegation tiers</li>
                <li>Balanced grid positions</li>
              </ul>
            </div>

            {/* Endurance Events */}
            <div className="glass-card" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '6rem', color: 'var(--border-color)', opacity: 0.15, fontWeight: 900, fontFamily: 'var(--font-display)' }}>03</div>
              <span style={{ background: '#d97706', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>SPECIAL EVENTS</span>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>ENDURANCE CUP</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Ultimate tests of concentration, fuel mapping, and night stints. Held once a month, these endurance showcases draw top teams from multiple console leagues across the globe.
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>3 to 6 Hour Race Durations</li>
                <li>Dynamic Day-to-Night transitions</li>
                <li>Enhanced championship points value</li>
              </ul>
            </div>

          </div>

          {/* Teams Note & Relegation explain */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid var(--accent-red)' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>DIVISION PROMOTION & RELEGATION SYSTEM</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                ASPL operates a multi-tiered hierarchy (Pro, Pro-Am, and Am). Top finishers climb up each season, while bottom grid spots are relegated, guaranteeing fiercely competitive lobby matches.
              </p>
            </div>
            <a href="#registration" className="btn-aspl btn-aspl-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>SIGNUP FOR SEEDING</a>
          </div>
        </div>
      </section>

      {/* ==========================================
         RACE CALENDAR
         ========================================== */}
      <section id="calendar" className="content-section">
        <div className="section-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
          <div>
            <div className="sub">THE CALENDAR</div>
            <h2>RACE SCHEDULE</h2>
          </div>
          
          {/* Calendar filtering controls */}
          <div style={{ display: 'flex', gap: '6px', background: '#0a0a0c', border: '1px solid var(--border-color)', padding: '4px' }}>
            {['ALL', 'TEAM', 'SOLO', 'ENDURANCE'].map(f => (
              <button 
                key={f}
                onClick={() => setCalendarFilter(f)}
                style={{ 
                  background: calendarFilter === f ? 'var(--accent-red)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '8px 16px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Season 2 Race Calendar Banners */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
          >
            <img
              src="/src/assets/solo-calendar.png"
              alt="ASPL Solo Series Season 2 Race Calendar"
              style={{ width: '100%', display: 'block', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent, rgba(5,5,8,0.92))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', color: '#fff' }}>SOLO SERIES</span>
              <span style={{ background: 'var(--accent-gray)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 8px', letterSpacing: '1px' }}>WEDNESDAYS · 20:30</span>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
          >
            <img
              src="/src/assets/team-calendar.png"
              alt="ASPL Team Series Season 2 Race Calendar"
              style={{ width: '100%', display: 'block', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: 'linear-gradient(transparent, rgba(5,5,8,0.92))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '2px', color: '#fff' }}>TEAM SERIES</span>
              <span style={{ background: 'var(--accent-red)', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 8px', letterSpacing: '1px' }}>SATURDAYS · 19:00</span>
            </div>
          </div>
        </div>

        <div className="aspl-grid-4">
          {filteredCalendar.map(event => (
            <div key={event.id} className="glass-card card-calendar" style={{ padding: '20px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* SVG circuit layout preview */}
              <div style={{ background: '#050508', border: '1px solid var(--border-color)', padding: '15px', borderRadius: '4px', marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg viewBox="0 0 100 100" className="track-map-svg">
                  <path d={event.layout} />
                </svg>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.65rem', background: event.championship === 'TEAM' ? 'var(--accent-red)' : event.championship === 'SOLO' ? 'var(--accent-gray)' : '#d97706', color: '#fff', padding: '2px 8px', fontWeight: 'bold' }}>
                  {event.championship}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.length}</span>
              </div>

              <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '4px' }}>{event.track}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>📍 {event.country}</p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span>📅 {event.date}</span>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
         STANDINGS & RESULTS
         ========================================== */}
      <section id="standings" style={{ background: '#08080b', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="content-section">
          <div className="section-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <div className="sub">CHAMPIONSHIP TABLES</div>
              <h2>STANDINGS & RESULTS</h2>
            </div>

            <div style={{ display: 'flex', gap: '6px', background: '#0a0a0c', border: '1px solid var(--border-color)', padding: '4px' }}>
              {['DRIVERS', 'CONSTRUCTORS', 'STATISTICS'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setStandingsTab(tab)}
                  style={{ 
                    background: standingsTab === tab ? 'var(--accent-red)' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '8px 16px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
            
            {standingsTab === 'DRIVERS' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '12px 8px' }}>POS</th>
                    <th>DRIVER</th>
                    <th>CAR CHOICE</th>
                    <th>TEAM</th>
                    <th>POLES</th>
                    <th>PODIUMS</th>
                    <th>WINS</th>
                    <th style={{ textAlign: 'right', paddingRight: '12px' }}>POINTS</th>
                  </tr>
                </thead>
                <tbody>
                  {driverStandings.map((driver, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', height: '52px' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>
                        <span style={{ 
                          display: 'inline-block', 
                          width: '24px', 
                          textAlign: 'center', 
                          color: driver.pos === 1 ? '#ffd700' : driver.pos === 2 ? '#c0c0c0' : driver.pos === 3 ? '#cd7f32' : 'var(--text-secondary)',
                          fontSize: driver.pos <= 3 ? '1.1rem' : '0.9rem'
                        }}>
                          {driver.pos}
                        </span>
                      </td>
                      <td>
                        <span style={{ marginRight: '8px' }}>{driver.nationality}</span>
                        <span style={{ fontWeight: 'bold', color: '#fff' }}>{driver.name}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{driver.car}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{driver.team}</td>
                      <td>{driver.poles}</td>
                      <td>{driver.podiums}</td>
                      <td>{driver.wins}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--accent-red)', paddingRight: '12px' }}>{driver.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {standingsTab === 'CONSTRUCTORS' && (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '12px 8px' }}>POS</th>
                    <th>TEAM NAME</th>
                    <th>MANUFACTURER</th>
                    <th>WINS RECORDED</th>
                    <th style={{ textAlign: 'right', paddingRight: '12px' }}>CONSTRUCTOR POINTS</th>
                  </tr>
                </thead>
                <tbody>
                  {teamStandings.map((team, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', height: '52px' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>
                        <span style={{ 
                          display: 'inline-block', 
                          width: '24px', 
                          textAlign: 'center',
                          color: team.pos === 1 ? '#ffd700' : team.pos === 2 ? '#c0c0c0' : team.pos === 3 ? '#cd7f32' : 'var(--text-secondary)'
                        }}>
                          {team.pos}
                        </span>
                      </td>
                      <td style={{ fontWeight: 'bold', color: '#fff' }}>{team.name}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{team.car}</td>
                      <td>{team.wins}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--accent-red)', paddingRight: '12px' }}>{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {standingsTab === 'STATISTICS' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', padding: '10px' }}>
                <div style={{ background: '#050508', border: '1px solid var(--border-color)', padding: '20px', textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '8px' }}>POLE POSITION KING</h4>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>NIKLAS WEBER</div>
                  <p style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.9rem' }}>4 POLES (SEASON 3)</p>
                </div>

                <div style={{ background: '#050508', border: '1px solid var(--border-color)', padding: '20px', textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '8px' }}>FASTEST LAPS RECORDED</h4>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>LUCAS ROSSI</div>
                  <p style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.9rem' }}>5 FAST LAPS</p>
                </div>

                <div style={{ background: '#050508', border: '1px solid var(--border-color)', padding: '20px', textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '8px' }}>PODIUM ACCUMULATOR</h4>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-display)' }}>LUCAS ROSSI</div>
                  <p style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.9rem' }}>5 PODIUMS (100% RATIO)</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ==========================================
         STREAMING & MEDIA
         ========================================== */}
      <section id="media" className="content-section">
        <div className="section-header">
          <div className="sub">COMMUNITY BROADCASTS</div>
          <h2>STREAMING & MEDIA HUB</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          
          {/* Twitch Live Stream simulation panel */}
          <div className="glass-card" style={{ padding: '24px', gridColumn: 'span 1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tv size={18} style={{ color: 'var(--accent-red)' }} /> STREAM BROADCAST
              </h3>
              <span style={{ background: '#6441a5', color: '#fff', fontSize: '0.65rem', padding: '3px 8px', fontWeight: 'bold' }}>TWITCH SIMULATOR</span>
            </div>
            
            {/* Live broadcast container */}
            <div style={{ background: '#000', height: '240px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--accent-red)', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 8px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#fff', animation: 'pulse 1.2s infinite' }}></span> LIVE
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #fff' }}>
                <Play size={20} fill="#fff" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click to tune into ASPL Officiated Stream</p>
            </div>

            <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <p style={{ fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>Upcoming Live Cast: ACC Team Series (Spa-Francorchamps)</p>
              <p>Host: ASPL TV | Commentators: Jake Smith, Brandon Vance</p>
            </div>
          </div>

          {/* YouTube Highlights list */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>📹 RECENT HIGHLIGHT REELS</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ width: '100px', height: '60px', background: '#121216', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Play size={12} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>Season 3 Finale Highlights - Suzuka</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1,420 views • 2 weeks ago</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ width: '100px', height: '60px', background: '#121216', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Play size={12} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>ASPL Top 10 Overtakes & Collisions</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3,180 views • 1 month ago</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '100px', height: '60px', background: '#121216', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Play size={12} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>Driver Coaching Masterclass: Monza chicane guides</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>850 views • 3 weeks ago</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
         RULEBOOK & STEWARDING
         ========================================== */}
      <section id="stewarding" style={{ background: '#08080b', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="content-section">
          <div className="section-header">
            <div className="sub">FIA-STYLE STEWARDING</div>
            <h2>RULEBOOK & RACING STANDARDS</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            
            <div>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>INCIDENT REVIEW POLICY</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
                ASPL approaches stewarding with professional realism. We implement a structured protest submission channel. Incident requests are analyzed post-race by a dedicated committee of retired Sim Racers who evaluate onboard replays and telemetry telemetry logs to award points adjustments or license penalty strikes.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="/docs/ASPL_Season4_Rulebook.pdf" target="_blank" rel="noopener noreferrer" className="btn-aspl btn-aspl-secondary" style={{ justifyContent: 'flex-start', padding: '12px 20px' }}>
                  <BookOpen size={18} /> DOWNLOAD OFFICIAL RULEBOOK (PDF)
                </a>
              </div>
            </div>

            {/* Interactive incident submission simulator */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '20px', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>SIMULATED INCIDENT PROTEST LODGE</h4>
              
              <AnimatePresence mode="wait">
                {!incidentSubmitted ? (
                  <motion.form 
                    key="incident-form"
                    onSubmit={handleIncidentSubmit} 
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div className="aspl-form-group">
                        <label>SESSION TYPE</label>
                        <select 
                          className="aspl-input"
                          value={incidentData.session}
                          onChange={(e) => setIncidentData({ ...incidentData, session: e.target.value })}
                        >
                          <option value="QUALIFYING">QUALIFYING</option>
                          <option value="RACE">RACE EVENT</option>
                        </select>
                      </div>

                      <div className="aspl-form-group">
                        <label>INCIDENT LAP</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 3" 
                          className="aspl-input"
                          value={incidentData.lap}
                          onChange={(e) => setIncidentData({ ...incidentData, lap: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div className="aspl-form-group">
                        <label>PROTESTING DRIVER</label>
                        <input 
                          type="text" 
                          placeholder="Your racing tag" 
                          className="aspl-input"
                          value={incidentData.driverA}
                          onChange={(e) => setIncidentData({ ...incidentData, driverA: e.target.value })}
                          required
                        />
                      </div>

                      <div className="aspl-form-group">
                        <label>DEFENDANT DRIVER</label>
                        <input 
                          type="text" 
                          placeholder="Opponent tag" 
                          className="aspl-input"
                          value={incidentData.driverB}
                          onChange={(e) => setIncidentData({ ...incidentData, driverB: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="aspl-form-group">
                      <label>COLLISION DETAILS</label>
                      <textarea 
                        rows="3" 
                        placeholder="Briefly describe corner number, line choice, and contact details..." 
                        className="aspl-input"
                        value={incidentData.description}
                        onChange={(e) => setIncidentData({ ...incidentData, description: e.target.value })}
                        required
                        style={{ resize: 'none' }}
                      />
                    </div>

                    <button type="submit" className="btn-aspl btn-aspl-primary">
                      <Send size={16} /> SUBMIT TO FIA STEWARDS
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="incident-success"
                    style={{ textAlign: 'center', padding: '30px 10px' }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div style={{ color: 'var(--accent-red)', marginBottom: '16px' }}><Flag size={48} style={{ animation: 'bounce 1s infinite' }} /></div>
                    <h5 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '8px' }}>INCIDENT FILE GENERATED</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                      Protest submitted. Your appeal file has been assigned ID: <strong style={{ color: 'var(--accent-red)' }}>ASPL-2026-089A</strong>. The stewards panel will review camera feeds and issue verdicts within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         REGISTRATION SYSTEM
         ========================================== */}
      <section id="registration" className="content-section">
        <div className="section-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
          <div>
            <div className="sub">JOIN THE GRID</div>
            <h2>SEASON 4 REGISTRATION</h2>
          </div>

          <div style={{ display: 'flex', gap: '6px', background: '#0a0a0c', border: '1px solid var(--border-color)', padding: '4px' }}>
            {['DRIVER', 'TEAM', 'RESERVE'].map(tab => (
              <button 
                key={tab}
                onClick={() => setSignupTab(tab)}
                style={{ 
                  background: signupTab === tab ? 'var(--accent-red)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '8px 16px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '36px', maxWidth: '800px', margin: '0 auto' }}>
          
          <AnimatePresence mode="wait">
            {!registrationSubmitted ? (
              <motion.form 
                key="reg-form"
                onSubmit={handleRegSubmit} 
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                
                {signupTab === 'DRIVER' && (
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>FULLTIME DRIVER SIGNUP</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                      <div className="aspl-form-group">
                        <label>DRIVER NAME (GAMERTAG)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. SpeedDemon99" 
                          className="aspl-input"
                          value={regData.name}
                          onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="aspl-form-group">
                        <label>DISCORD ID</label>
                        <input 
                          type="text" 
                          placeholder="e.g. speed#1234" 
                          className="aspl-input"
                          value={regData.discordName}
                          onChange={(e) => setRegData({ ...regData, discordName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '16px' }}>
                      <div className="aspl-form-group">
                        <label>RACING PLATFORM</label>
                        <select 
                          className="aspl-input"
                          value={regData.platform}
                          onChange={(e) => setRegData({ ...regData, platform: e.target.value })}
                        >
                          <option value="PS5">PLAYSTATION 5</option>
                          <option value="XBOX">XBOX SERIES X|S</option>
                        </select>
                      </div>

                      <div className="aspl-form-group">
                        <label>RACING NUMBER (0-999)</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 77" 
                          className="aspl-input"
                          value={regData.number}
                          onChange={(e) => setRegData({ ...regData, number: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '16px' }}>
                      <div className="aspl-form-group">
                        <label>CAR CHOICE (GT3 ACC CLASS)</label>
                        <select 
                          className="aspl-input"
                          value={regData.car}
                          onChange={(e) => setRegData({ ...regData, car: e.target.value })}
                        >
                          <option value="Porsche 911 GT3 R (992)">Porsche 911 GT3 R (992)</option>
                          <option value="Ferrari 296 GT3">Ferrari 296 GT3</option>
                          <option value="Aston Martin Vantage GT3">Aston Martin Vantage GT3</option>
                          <option value="BMW M4 GT3">BMW M4 GT3</option>
                          <option value="Audi R8 LMS Evo II">Audi R8 LMS Evo II</option>
                          <option value="Lamborghini Huracan GT3 EVO2">Lamborghini Huracan GT3 EVO2</option>
                        </select>
                      </div>

                      <div className="aspl-form-group">
                        <label>TEAM ASSOCIATION (OPTIONAL)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. APEX Racing" 
                          className="aspl-input"
                          value={regData.team}
                          onChange={(e) => setRegData({ ...regData, team: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {signupTab === 'TEAM' && (
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>TEAM REGISTRATION (CONSTRUCTORS)</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                      <div className="aspl-form-group">
                        <label>CONSTRUCTOR TEAM NAME</label>
                        <input type="text" placeholder="e.g. Redline Esports" className="aspl-input" required />
                      </div>
                      <div className="aspl-form-group">
                        <label>TEAM PRINCIPAL / MANAGER</label>
                        <input type="text" placeholder="Manager tag" className="aspl-input" required />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '16px' }}>
                      <div className="aspl-form-group">
                        <label>PRIMARY DRIVER 1 NAME</label>
                        <input type="text" placeholder="Driver 1 tag" className="aspl-input" required />
                      </div>
                      <div className="aspl-form-group">
                        <label>PRIMARY DRIVER 2 NAME</label>
                        <input type="text" placeholder="Driver 2 tag" className="aspl-input" required />
                      </div>
                    </div>
                  </div>
                )}

                {signupTab === 'RESERVE' && (
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>RESERVE RACER APPLICATION</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      Can't commit to every Saturday? Register as a backup reserve. You'll receive call-ups when full-time grid members are absent.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                      <div className="aspl-form-group">
                        <label>DRIVER NAME (GAMERTAG)</label>
                        <input type="text" placeholder="Tag" className="aspl-input" required />
                      </div>
                      <div className="aspl-form-group">
                        <label>DISCORD ID</label>
                        <input type="text" placeholder="Discord tag" className="aspl-input" required />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid var(--border-color)' }}>
                  <Info size={16} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                  <span>By submitting, you agree to adhere to the ASPL Rulebook, stewarding codes, and maintain sporting conduct. Discord membership is mandatory for lobby assignments.</span>
                </div>

                <button type="submit" className="btn-aspl btn-aspl-primary" style={{ padding: '16px' }}>
                  SUBMIT GRID REGISTRATION
                </button>

              </motion.form>
            ) : (
              <motion.div 
                key="reg-success"
                style={{ textAlign: 'center', padding: '40px 10px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div style={{ color: 'var(--accent-red)', marginBottom: '20px' }}><CheckCircle size={60} style={{ animation: 'bounce 1s infinite' }} /></div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px' }}>REGISTRATION SUBMITTED</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 24px' }}>
                  Awesome job, <strong style={{ color: '#fff' }}>{regData.name || 'Driver'}</strong>! Your entry sheet has been queued. To secure your grid slot, please join the discord server to complete the onboarding track.
                </p>
                <a href="https://discord.gg/your-link" target="_blank" rel="noopener noreferrer" className="btn-aspl btn-aspl-primary">
                  JOIN DISCORD SERVER
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ==========================================
         COMMUNITY SECTION
         ========================================== */}
      <section id="community" style={{ background: '#08080b', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="content-section">
          <div className="section-header">
            <div className="sub">PADDOCK BUZZ</div>
            <h2>COMMUNITY CORNER</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            {newsFeed.map(news => (
              <div key={news.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.65rem', background: 'var(--accent-gray)', border: '1px solid var(--border-color)', color: 'var(--accent-red)', padding: '2px 8px', fontWeight: 'bold' }}>
                    {news.tag}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{news.date}</span>
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>{news.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {news.summary}
                </p>
                <a href="#news" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', marginTop: 'auto' }}>
                  READ BULLETIN <ChevronRight size={14} />
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CSS helper animations */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

    </div>
  );
}

export default Home;
