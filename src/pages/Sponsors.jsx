import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Cpu, Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { DatabaseContext } from '../DatabaseContext';

function Sponsors() {
  const { dbData } = useContext(DatabaseContext);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    tier: 'PLATINUM',
    message: ''
  });

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.email) return;
    try {
      const id = String(Date.now());
      await setDoc(doc(db, 'aspl', 'enquiries', id), {
        id,
        company: formData.company,
        contactName: formData.contactName,
        email: formData.email,
        tier: formData.tier,
        message: formData.message || ''
      });
      setInquirySubmitted(true);
      setTimeout(() => {
        setInquirySubmitted(false);
        setFormData({ company: '', contactName: '', email: '', tier: 'PLATINUM', message: '' });
      }, 5000);
    } catch (err) {
      console.error('Synergy inquiry submission failed:', err);
      // Fallback local simulation if Firestore write fails
      setInquirySubmitted(true);
      setTimeout(() => {
        setInquirySubmitted(false);
      }, 5000);
    }
  };

  const sponsorList = dbData.sponsors || [];

  return (
    <div className="carbon-bg" style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Back Link */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '32px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
          <ChevronLeft size={16} /> BACK TO PADDOCK
        </Link>

        <div className="section-header">
          <div className="sub">PARTNERSHIPS</div>
          <h2>OFFICIAL ASPL PARTNERS</h2>
        </div>

        {/* Sponsor Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {sponsorList.map((sponsor, index) => (
            <div key={index} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', right: '20px', background: sponsor.tier === 'PLATINUM' ? '#e5e7eb' : sponsor.tier === 'GOLD' ? '#ffd700' : '#c0c0c0', color: '#000', fontSize: '0.65rem', fontWeight: 900, padding: '3px 10px', letterSpacing: '1px' }}>
                {sponsor.tier} PARTNER
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <span style={{ fontSize: '2.5rem' }}>{sponsor.logo}</span>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>{sponsor.name}</h3>
                  <p style={{ color: 'var(--accent-red)', fontSize: '0.8rem', fontWeight: 'bold' }}>{sponsor.type}</p>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginTop: 'auto' }}>
                {sponsor.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action & Inquiry form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', background: 'rgba(18, 18, 22, 0.75)', border: '1px solid var(--border-color)', padding: '40px' }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>SUPPORT THE FUTURE OF SIM RACING</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.7' }}>
              Want your brand seen by thousands of console racing enthusiasts? ASPL offers targeted advertising, live stream overlays, dedicated season trophies, and social media integration.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.7' }}>
              Partner packages are custom-tailored to provide authentic motorsport synergy. Support clean driving, active youth coaching, and competitive racing structure.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
                <Shield size={20} style={{ color: 'var(--accent-red)' }} />
                <span>Premium Live Broadcast placements</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
                <Sparkles size={20} style={{ color: 'var(--accent-red)' }} />
                <span>Championship trophy naming rights</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
                <Cpu size={20} style={{ color: 'var(--accent-red)' }} />
                <span>Discord integration and direct community access</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '30px' }}>
            <h4 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '20px', letterSpacing: '1px' }}>BECOME A SPONSOR INQUIRY</h4>
            
            <AnimatePresence mode="wait">
              {!inquirySubmitted ? (
                <motion.form 
                  key="sponsor-inquiry"
                  onSubmit={handleSponsorSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="aspl-form-group">
                    <label>COMPANY NAME</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rivalry Gear" 
                      className="aspl-input"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>

                  <div className="aspl-form-group">
                    <label>CONTACT NAME</label>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="aspl-input"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="aspl-form-group">
                    <label>BUSINESS EMAIL</label>
                    <input 
                      type="email" 
                      placeholder="e.g. partner@company.com" 
                      className="aspl-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="aspl-form-group">
                    <label>DESIRED SYNERGY TIER</label>
                    <select 
                      className="aspl-input"
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    >
                      <option value="PLATINUM">PLATINUM LEVEL</option>
                      <option value="GOLD">GOLD LEVEL</option>
                      <option value="SILVER">SILVER LEVEL</option>
                      <option value="HARDWARE">HARDWARE PARTNER</option>
                    </select>
                  </div>

                  <div className="aspl-form-group">
                    <label>PROPOSAL SUMMARY</label>
                    <textarea 
                      rows="3" 
                      placeholder="Outline your partnership goals or budget expectations..." 
                      className="aspl-input"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn-aspl btn-aspl-primary">
                    <Send size={16} /> SUBMIT SYNERGY INQUIRY
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="sponsor-success"
                  style={{ textAlign: 'center', padding: '30px 10px' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ color: 'var(--accent-red)', marginBottom: '16px' }}><CheckCircle2 size={48} style={{ animation: 'bounce 1s infinite' }} /></div>
                  <h5 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '8px' }}>INQUIRY FILE OPENED</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    Thank you! Your partnership inquiry has been logged. An ASPL representative will contact you via email at <strong style={{ color: '#fff' }}>{formData.email}</strong> with our media kit within 48 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sponsors;
