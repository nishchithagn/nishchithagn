import React, { useState, useEffect, useRef } from 'react';
import { CyberTerminal } from './components/CyberTerminal';
import { ProjectGrid } from './components/ProjectGrid';
import { SkillMatrix } from './components/SkillMatrix';
import { EduTimeline } from './components/EduTimeline';
import { GlitchedText } from './components/GlitchedText';
import { playSound } from './components/AudioSystem';
import { 
  Terminal, Cpu, Network, HardDrive, Mail, Linkedin, Phone, 
  MapPin, Volume2, VolumeX, Activity, ShieldAlert, User, Compass 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'terminal' | 'projects' | 'skills' | 'timeline'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound Controller helper
  const triggerSound = (type: 'click' | 'glitch' | 'data' | 'success' | 'alert') => {
    if (soundEnabled) {
      playSound(type);
    }
  };

  // Live Terminal Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Canvas-based Neural Grid Vector Animation (Oscilloscope effect)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = 300);
    let height = (canvas.height = 120);

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * (window.devicePixelRatio || 1);
      height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    let offset = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 8, 0.2)'; // trail effect
      ctx.fillRect(0, 0, width, height);

      // Drawing glitched gold grid scanlines
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 15;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Drawing animated vector signal waves (gold and white overlaps)
      ctx.lineWidth = 1.5;

      // Gold Signal (Sine wave)
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.5)';
      ctx.beginPath();
      for (let i = 0; i < width; i++) {
        const x = i;
        const y = height / 2 + 
          Math.sin(i * 0.02 + offset) * 20 + 
          Math.cos(i * 0.05 - offset * 0.5) * 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // White Signal (Cosine wave)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      for (let i = 0; i < width; i++) {
        const x = i;
        const y = height / 2 + 
          Math.cos(i * 0.015 - offset * 0.8) * 25 + 
          Math.sin(i * 0.04 + offset * 0.3) * 10;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Occasional spike glitches
      if (Math.random() > 0.98) {
        ctx.fillStyle = 'rgba(197, 160, 89, 0.4)';
        ctx.fillRect(Math.random() * width, 0, 2, height);
        triggerSound('glitch');
      }

      offset += 0.05;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [soundEnabled]);

  const handleTabChange = (tab: typeof activeTab) => {
    triggerSound('click');
    setActiveTab(tab);
  };

  return (
    <div id="mainframe-root" className="crt-screen min-h-screen bg-cyber-dark text-white font-sans pixel-grid flex flex-col p-3 md:p-6 select-none selection:bg-[#C5A059] selection:text-black">
      {/* Decorative vertical coordinates overlay on outer left/right margins */}
      <div className="hidden xl:block fixed left-4 top-1/3 [writing-mode:vertical-lr] text-[9px] font-mono text-white/20 tracking-[0.2em] pointer-events-none">
        GRID_COORDS // 12.9716° N, 77.5946° E
      </div>
      <div className="hidden xl:block fixed right-4 top-1/3 [writing-mode:vertical-lr] text-[9px] font-mono text-[#C5A059]/30 tracking-[0.2em] pointer-events-none">
        DIAGNOSTIC_ID // NISHCHITHA-V1.0
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col space-y-6">
        
        {/* Header Terminal Strip */}
        <header className="border-b border-white/10 p-6 bg-[#121212] flex flex-col md:flex-row justify-between items-center relative overflow-hidden gap-4">
          {/* Subtle light sweep */}
          <div className="scanline-sweep"></div>
          
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-light italic tracking-tight text-white">
                <GlitchedText text="Nishchitha G N" speed={2500} />
              </h1>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex flex-wrap gap-x-2 mt-0.5">
                <span>[Portfolio Mainframe]</span>
                <span className="text-white/10">|</span>
                <span className="text-[#C5A059]">STATUS: HIRED_READY</span>
                <span className="text-white/10">|</span>
                <span>BANGALORE, DK</span>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Real-time Clock */}
            <div className="font-mono text-xs bg-black/50 border border-white/5 px-3.5 py-1.5 text-[#C5A059] flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span>{currentTime}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playSound('success');
              }}
              className={`p-2 border font-mono text-xs cursor-pointer flex items-center space-x-2 transition-all ${
                soundEnabled 
                  ? 'border-[#C5A059]/30 text-[#C5A059] bg-[#C5A059]/5 hover:bg-[#C5A059]/15' 
                  : 'border-white/5 text-white/30 bg-transparent'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-4 w-4 text-[#C5A059]" />
                  <span className="hidden sm:inline text-[#C5A059] tracking-widest">AUDIO // ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span className="hidden sm:inline tracking-widest">MUTED</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Sector Tabs Navigation */}
        <nav className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { id: 'all', label: 'All Sectors', icon: <Compass className="h-3.5 w-3.5 mr-1.5" /> },
            { id: 'terminal', label: '01 // AI Core', icon: <Terminal className="h-3.5 w-3.5 mr-1.5" /> },
            { id: 'projects', label: '02 // Portfolio', icon: <Cpu className="h-3.5 w-3.5 mr-1.5" /> },
            { id: 'skills', label: '03 // Skill Matrix', icon: <HardDrive className="h-3.5 w-3.5 mr-1.5" /> },
            { id: 'timeline', label: '04 // Chronology', icon: <Network className="h-3.5 w-3.5 mr-1.5" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`p-3 border text-xs tracking-[0.1em] transition-all duration-300 cursor-pointer flex items-center justify-center font-sans ${
                  isActive 
                    ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5 font-medium' 
                    : 'border-white/5 text-white/50 hover:text-white hover:border-white/10 hover:bg-white/2'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Layout Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Diagnostics & Identifiers (Persistent Metadata) */}
          <section className="lg:col-span-4 space-y-6">
            
            {/* Holographic Avatar & Pulse Oscilloscope */}
            <div className="cyber-bento-card p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Vector Oscilloscope</span>
                <Activity className="h-4 w-4 text-[#C5A059] animate-pulse" />
              </div>

              {/* Simulated CRT Screen wave visualizer */}
              <div className="relative border border-white/5 bg-[#050505] overflow-hidden h-32 flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />
                <div className="absolute top-1 left-2 text-[8px] font-mono text-white/30 pointer-events-none select-none">
                  SIGNAL // 44.1KHZ ACTIVE
                </div>
              </div>

              {/* Creator Metadata list */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Creator Identity</div>
                  <h2 className="text-2xl font-serif font-light text-white italic tracking-tight">Nishchitha G N</h2>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase">System Core Function</div>
                  <div className="text-xs text-[#C5A059] font-mono uppercase tracking-wider">Android Developer & GenAI Specialist</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase mb-1">Biography Overview</div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    Motivated Computer Science Engineering student with practical experience in Android App Development, 
                    Generative AI, and modern web frameworks. Passionate about sustainability, smart mobility, and building next-gen AI-powered applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Link Connectors */}
            <div className="cyber-bento-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Connect Matrix</span>
                <User className="h-4 w-4 text-[#C5A059]" />
              </div>

              <div className="space-y-2.5">
                {/* Email link */}
                <a 
                  href="mailto:nishchitha.gn.92@gmail.com"
                  onClick={() => triggerSound('success')}
                  className="flex items-center space-x-3 p-3 border border-white/5 hover:border-[#C5A059]/30 bg-[#121212] hover:bg-[#C5A059]/5 transition-all duration-300 font-mono text-xs text-white/70 hover:text-[#C5A059]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span className="truncate">nishchitha.gn.92@gmail.com</span>
                </a>

                {/* LinkedIn link */}
                <a 
                  href="https://www.linkedin.com/in/nishchithagn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerSound('success')}
                  className="flex items-center space-x-3 p-3 border border-white/5 hover:border-white/30 bg-[#121212] hover:bg-white/5 transition-all duration-300 font-mono text-xs text-white/70 hover:text-white"
                >
                  <Linkedin className="h-3.5 w-3.5 text-white/50" />
                  <span className="truncate">linkedin.com/in/nishchithagn</span>
                </a>

                {/* Telephone */}
                <a 
                  href="tel:+919008218692"
                  onClick={() => triggerSound('success')}
                  className="flex items-center space-x-3 p-3 border border-white/5 hover:border-[#C5A059]/30 bg-[#121212] hover:bg-[#C5A059]/5 transition-all duration-300 font-mono text-xs text-white/70 hover:text-[#C5A059]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span className="truncate">+91 90082 18692</span>
                </a>

                {/* Location */}
                <div className="flex items-center space-x-3 p-3 border border-white/5 bg-[#0a0a0a] font-mono text-xs text-white/40">
                  <MapPin className="h-3.5 w-3.5 text-white/30" />
                  <span>Bangalore, Karnataka, IN</span>
                </div>
              </div>
            </div>

            {/* Visual aesthetic prompt banner */}
            <div className="border border-white/5 bg-white/2 p-5 relative overflow-hidden">
              <div className="absolute right-[-10px] bottom-[-10px] text-6xl font-serif text-white/2 font-black pointer-events-none select-none">
                VANE
              </div>
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-4 w-4 text-[#C5A059] mt-0.5" />
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-white/50 tracking-wider uppercase font-bold">Mainframe Note</div>
                  <div className="text-xs text-white/50 font-sans leading-relaxed">
                    This interactive matrix runs synthesized signals. Use preset sectors or the cognitive terminal below to explore projects, skills, and academic history.
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* RIGHT COLUMN: Interactive Viewing Sector */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Sector Panel 1: AI Chat Terminal */}
            {(activeTab === 'all' || activeTab === 'terminal') && (
              <div className="space-y-2">
                {activeTab === 'all' && (
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
                    Sector 01 // Interactive Cognitive Core
                  </div>
                )}
                <CyberTerminal />
              </div>
            )}

            {/* Sector Panel 2: Projects Grid */}
            {(activeTab === 'all' || activeTab === 'projects') && (
              <div className="space-y-2 pt-2">
                {activeTab === 'all' && (
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
                    Sector 02 // Curated Works & Research
                  </div>
                )}
                <ProjectGrid />
              </div>
            )}

            {/* Sector Panel 3: Technical Skills Matrix */}
            {(activeTab === 'all' || activeTab === 'skills') && (
              <div className="space-y-2 pt-2">
                {activeTab === 'all' && (
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
                    Sector 03 // Technical Skill Telemetry
                  </div>
                )}
                <SkillMatrix />
              </div>
            )}

            {/* Sector Panel 4: Career & Chronology Timeline */}
            {(activeTab === 'all' || activeTab === 'timeline') && (
              <div className="space-y-2 pt-2">
                {activeTab === 'all' && (
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
                    Sector 04 // Chronology & Academic Records
                  </div>
                )}
                <EduTimeline />
              </div>
            )}

          </main>
        </div>

        {/* Footer Terminal Strip */}
        <footer className="border-t border-white/10 py-6 px-2 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-white/30 gap-2">
          <div>
            <span>© 2026 NISHCHITHA G N. DEVELOPED FOR SOPHISTICATED DECK METRICS.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>LINK // NOMINAL</span>
            <span className="text-[#C5A059] animate-pulse">SYSTEMS ONLINE</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
