import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Features from './components/Features';
import ScreenRecorder from './components/ScreenRecorder';
import SEOHead from './components/SEOHead';
import { RecordingProvider } from './components/RecordingContext';

function App() {
  const [showRecorder, setShowRecorder] = useState(false);

  return (
    <RecordingProvider>
      <AnimatePresence>
        <div className="min-h-screen bg-gray-50">
          <SEOHead />
          <Hero />
          <Features />
          
          {/* Toggle Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={() => setShowRecorder(!showRecorder)}
              className="fixed left-4 bottom-4 px-3 py-1.5 text-sm border-2 rounded-md transition-colors
              border-transparent bg-gradient-to-r from-purple-600 to-blue-500
              [background-clip:padding-box]
              before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r 
              before:from-purple-600 before:to-blue-500 before:rounded-md before:-z-10
              before:content-[''] text-white bg-clip-text hover:opacity-80"
            >
              {showRecorder ? 'Hide Recorder' : 'Show Recorder'}
            </button>
          </div>

          <AnimatePresence>
            {showRecorder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScreenRecorder />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatePresence>
    </RecordingProvider>
  );
}

export default App;