import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './firebase';
import { collection, doc, onSnapshot, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { DatabaseContext } from './DatabaseContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sponsors from './pages/Sponsors';
import Admin from './pages/Admin';

// Default Data Seed (adapted for ASPL)
export const DEFAULT_DB = {
  news: [],
  calendar: [],
  driverStandings: [],
  teamStandings: [],
  sponsors: [],
};


function App() {
  const [dbData, setDbData] = useState(DEFAULT_DB);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // security block similar to PRL
    const block = (e) => e.preventDefault();
    document.addEventListener('contextmenu', block);
    const handleKey = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', handleKey);

    // Live listener — updates instantly when admin saves anything
    const docRef = doc(db, 'aspl', 'database');
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          setDbData(snap.data());
        } else {
          setDoc(docRef, DEFAULT_DB);
          setDbData(DEFAULT_DB);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Firebase snapshot error:', err);
        setDbData(DEFAULT_DB);
        setLoading(false);
      }
    );

    const timeoutId = setTimeout(() => setLoading(false), 8000);

    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('keydown', handleKey);
      unsub();
      clearTimeout(timeoutId);
    };
  }, []);

  const updateDb = async (key, value) => {
    const newData = { ...dbData, [key]: value };
    setDbData(newData);
    try {
      await setDoc(doc(db, 'aspl', 'database'), newData);
    } catch (e) {
      console.error('Firebase sync error:', e);
    }
  };

  const saveDriver = async (driver) => {
    const id = String(driver.id);
    try {
      await setDoc(doc(db, 'drivers', id), driver);
      setDrivers(prev => {
        const exists = prev.find(d => String(d.id) === id);
        if (exists) return prev.map(d => String(d.id) === id ? driver : d);
        return [...prev, driver];
      });
      return true;
    } catch (e) {
      console.error('Driver save error:', e);
      return false;
    }
  };

  const deleteDriver = async (id) => {
    try {
      await deleteDoc(doc(db, 'drivers', String(id)));
      setDrivers(prev => prev.filter(d => String(d.id) !== String(id)));
      return true;
    } catch (e) {
      console.error('Driver delete error:', e);
      return false;
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080808' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ fontFamily: 'Barlow Condensed', fontSize: '2rem', color: '#CC0000', fontWeight: 'bold' }}>
          LOADING ASPL...
        </motion.div>
      </div>
    );
  }

  return (
    <DatabaseContext.Provider value={{ dbData, updateDb, drivers, saveDriver, deleteDriver }}>
      <Router>
        <div className="page-container">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/sponsors" element={<PageTransition><Sponsors /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </DatabaseContext.Provider>
  );
}

const PageTransition = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    {children}
  </motion.div>
);

export default App;
