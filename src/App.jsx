import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModelProvider } from './context/ModelContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ModelDetails = lazy(() => import('./pages/ModelDetails'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 rounded-full border-[3px] border-accent-cyan/20 border-t-accent-cyan border-l-accent-purple animate-spin shadow-[0_0_20px_rgba(0,212,255,0.25)]" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ModelProvider>
        <div className="min-h-screen flex flex-col relative z-[1] font-inter">
          <Navbar />
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/model/*" element={<ModelDetails />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </ModelProvider>
    </BrowserRouter>
  );
}

export default App;
