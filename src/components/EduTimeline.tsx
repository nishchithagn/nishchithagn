import React, { useState } from 'react';
import { playSound } from './AudioSystem';
import { Briefcase, Calendar, GraduationCap, Network, ShieldAlert } from 'lucide-react';

interface ChronoNode {
  id: string;
  type: 'education' | 'internship';
  title: string;
  subtitle: string;
  duration: string;
  metricLabel: string;
  metricValue: string;
  details: string[];
  classification: string;
}

export const EduTimeline: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const pipeline: ChronoNode[] = [
    {
      id: 'intern',
      type: 'internship',
      title: 'MindMatrix',
      subtitle: 'Android Development Intern (Generative AI Integration)',
      duration: 'CURRENT CYCLE [2025]',
      metricLabel: 'SECTOR_ENGAGED',
      metricValue: 'MOBILE_GENAI',
      details: [
        'Practiced advanced Android engineering powered by Generative AI workflows.',
        'Obtained functional mastery in Kotlin, Jetpack Compose, Firebase real-time synchronizations, and custom UX/UI layout logic.',
        'Direct developer on "EV Grama Charge" - a rural-focused smart EV charging localization grid designed for village accessibility.'
      ],
      classification: 'WORK-INTEGRATION-01'
    },
    {
      id: 'degree',
      type: 'education',
      title: 'KNS Institute of Technology',
      subtitle: 'B.E. in Computer Science and Engineering',
      duration: '2022 – 2026',
      metricLabel: 'CGPA_METRIC',
      metricValue: '9.0 / 10.0',
      details: [
        'In-depth specialization in computer network designs, distributed architectures, database engines, and software lifecycles.',
        'Actively deployed projects merging sustainability goals and GenAI models.',
        'Elected research application presenter representing the institute at National Symposium events.'
      ],
      classification: 'EDU-CSE-BACHELOR'
    },
    {
      id: 'preuni',
      type: 'education',
      title: 'Sri Chaithanya PU College',
      subtitle: 'Pre-University Course (PUC)',
      duration: '2020 – 2021',
      metricLabel: 'CGPA_METRIC',
      metricValue: '9.4 / 10.0',
      details: [
        'Rigorous core science focus in Mathematics, Physics, Chemistry, and Computer Science.',
        'Mastered core computing logic foundations, mathematical structures, and algorithm paradigms.'
      ],
      classification: 'EDU-PUC-SCIENCE'
    },
    {
      id: 'school',
      type: 'education',
      title: 'Vidya Chetan High School',
      subtitle: 'Secondary School Leaving Certificate (SSLC)',
      duration: '2018 – 2019',
      metricLabel: 'SSLC_METRIC',
      metricValue: '9.8 / 10.0',
      details: [
        'Graduated with outstanding merit and core academic awards in mathematical diagnostics.'
      ],
      classification: 'EDU-SSLC-BASIC'
    }
  ];

  const handleNodeClick = (id: string) => {
    playSound('success');
    setActiveNode(activeNode === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Network className="h-4 w-4 text-[#C5A059]" />
          <h2 className="text-xl font-serif italic tracking-tight text-white">
            Career & Academic Timeline
          </h2>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">CHRONOLOGY // ACTIVE</span>
      </div>

      <div className="relative pl-6 border-l border-white/10 space-y-8 py-2">
        {pipeline.map((node) => {
          const isSelected = activeNode === node.id;
          return (
            <div key={node.id} className="relative group">
              {/* Chrono Junction Node Icon */}
              <div 
                onClick={() => handleNodeClick(node.id)}
                className={`absolute left-[-31px] top-1.5 w-4 h-4 rounded-none border flex items-center justify-center cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#C5A059] border-[#C5A059] scale-110 shadow-[0_0_10px_rgba(197,160,89,0.3)]' 
                    : 'bg-[#080808] border-white/20 hover:border-[#C5A059] hover:bg-[#C5A059]/5'
                }`}
              >
                {node.type === 'internship' ? (
                  <Briefcase className={`h-2 w-2 ${isSelected ? 'text-black' : 'text-[#C5A059]'}`} />
                ) : (
                  <GraduationCap className={`h-2 w-2 ${isSelected ? 'text-black' : 'text-white/60'}`} />
                )}
              </div>

              {/* Node Card wrapper */}
              <div 
                onClick={() => handleNodeClick(node.id)}
                className={`cyber-bento-card p-6 cursor-pointer select-none transition-all duration-300 ${
                  isSelected ? 'border-[#C5A059] bg-[#C5A059]/5 shadow-[0_5px_20px_rgba(197,160,89,0.05)]' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-mono text-[#C5A059] tracking-widest uppercase">
                      {node.classification} // {node.type.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-serif font-medium text-white tracking-tight group-hover:text-[#C5A059] transition-colors mt-0.5">
                      {node.title}
                    </h3>
                    <p className="text-xs text-white/40 font-mono tracking-wider">{node.subtitle}</p>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                    <span className="text-[10px] font-mono text-[#C5A059] bg-[#C5A059]/5 px-2 py-0.5 border border-[#C5A059]/10 flex items-center space-x-1">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {node.duration}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 sm:mt-1">
                      {node.metricLabel}: <span className="text-white font-medium">{node.metricValue}</span>
                    </span>
                  </div>
                </div>

                {/* Expanding sub-records with staggered details */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isSelected ? 'max-h-60 mt-4 pt-4 border-t border-white/5' : 'max-h-0'
                }`}>
                  <h4 className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">
                    Trace Records
                  </h4>
                  <ul className="space-y-2">
                    {node.details.map((detail, idx) => (
                      <li key={idx} className="text-xs text-white/70 flex items-start space-x-2 font-sans leading-relaxed">
                        <span className="text-[#C5A059] font-mono select-none mt-0.5">»</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 text-[9px] font-mono text-white/30 flex items-center justify-between">
                    <span>SECTOR_LOG_OK</span>
                    <span className="animate-pulse text-[#C5A059]">NODE_ACTIVE: TRUE</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EduTimeline;
