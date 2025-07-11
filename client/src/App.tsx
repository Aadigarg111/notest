import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LecturePage from './pages/LecturePage';
import NotesPage from './pages/NotesPage';
import StudyPage from './pages/StudyPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            } 
          />
          <Route 
            path="/lecture" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LecturePage />
              </motion.div>
            } 
          />
          <Route 
            path="/notes" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NotesPage />
              </motion.div>
            } 
          />
          <Route 
            path="/study" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StudyPage />
              </motion.div>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SettingsPage />
              </motion.div>
            } 
          />
        </Routes>
      </Layout>
    </div>
  );
};

export default App; 