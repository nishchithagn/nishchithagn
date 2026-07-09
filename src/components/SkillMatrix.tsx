import React, { useState } from 'react';
import { playSound } from './AudioSystem';
import { Cpu, HardDrive, ShieldCheck, Terminal } from 'lucide-react';

interface SkillNode {
  name: string;
  level: number; // 0 to 100
  classCode: string;
  category: 'core' | 'ai' | 'strength';
}

export const SkillMatrix: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillSet: SkillNode[] = [
    // Core Tech
    { name: 'Kotlin', level: 92, classCode: 'KTLN-9.2', category: 'core' },
    { name: 'Jetpack Compose', level: 90, classCode: 'JPCO-9.0', category: 'core' },
    { name: 'Firebase & Firestore', level: 85, classCode: 'FBSE-8.5', category: 'core' },
    { name: 'JavaScript (ES6+)', level: 80, classCode: 'JS-8.0', category: 'core' },
    { name: 'HTML5 / CSS3', level: 88, classCode: 'HTCS-8.8', category: 'core' },
    
    // AI & Advanced
    { name: 'Google AI Studio', level: 95, classCode: 'GAIS-9.5', category: 'ai' },
    { name: 'Generative AI Prompting', level: 92, classCode: 'GENAI-9.2', category: 'ai' },
    { name: 'RESTful APIs & Endpoints', level: 86, classCode: 'REST-8.6', category: 'ai' },
    { name: 'Large Language Models (LLMs)', level: 88, classCode: 'LLM-8.8', category: 'ai' },
    { name: 'Git & Command Line', level: 84, classCode: 'VCS-GIT', category: 'ai' },

    // Strengths
    { name: 'Interactive Enhancement', level: 90, classCode: 'INT-ENH', category: 'strength' },
    { name: 'Debugging & Diagnostics', level: 94, classCode: 'DEB-DIAG', category: 'strength' },
    { name: 'Project-Based Learning', level: 95, classCode: 'PRJ-LRN', category: 'strength' },
    { name: 'Android Workflows', level: 92, classCode: 'ANDR-WF', category: 'strength' }
  ];

  const handleMouseEnter = (name: string) => {
    playSound('data');
    setHoveredSkill(name);
  };

  const getASCIIProgress = (level: number) => {
    const totalBars = 10;
    const filledBars = Math.round((level / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'■'.repeat(filledBars)}${' '.repeat(emptyBars)}] ${level}%`;
  };

  const renderSection = (category: 'core' | 'ai' | 'strength', title: string, icon: React.ReactNode) => {
    const filtered = skillSet.filter(s => s.category === category);
    return (
      <div className="border border-white/5 bg-[#121212]/80 p-5 space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
          {icon}
          <h3 className="text-xs tracking-[0.2em] text-white/50 font-mono uppercase">
            {title}
          </h3>
        </div>
        <div className="space-y-3">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => handleMouseEnter(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`p-3 border transition-all duration-300 cursor-pointer ${
                hoveredSkill === skill.name
                  ? 'border-[#C5A059] bg-[#C5A059]/5 shadow-[0_5px_15px_rgba(197,160,89,0.05)]'
                  : 'border-white/5 bg-transparent'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-serif text-white">
                  {skill.name}
                </span>
                <span className="text-[9px] font-mono text-[#C5A059] font-mono">
                  {skill.classCode}
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[#C5A059]">
                <span className="tracking-tighter font-mono">
                  {getASCIIProgress(skill.level)}
                </span>
                <span className={`text-[9px] uppercase tracking-wider font-mono transition-opacity ${
                  hoveredSkill === skill.name ? 'opacity-100 text-white animate-pulse' : 'opacity-40 text-white/50'
                }`}>
                  {skill.level >= 90 ? 'OPTIMAL' : 'STABLE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-[#C5A059]" />
          <h2 className="text-xl font-serif italic tracking-tight text-white">
            Skill Inventory & Core Strengths
          </h2>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">TELEMETRY // ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderSection('core', 'Development Stack', <HardDrive className="h-4 w-4 text-[#C5A059]" />)}
        {renderSection('ai', 'Cognitive integrations', <Cpu className="h-4 w-4 text-white" />)}
        {renderSection('strength', 'Architecture & Workflow', <ShieldCheck className="h-4 w-4 text-[#C5A059]" />)}
      </div>
    </div>
  );
};

export default SkillMatrix;
