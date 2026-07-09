import React, { useState } from 'react';
import { Project } from '../types';
import { playSound } from './AudioSystem';
import { GlitchedText } from './GlitchedText';
import { ExternalLink, Cpu, Droplet, Award, Terminal } from 'lucide-react';

export const ProjectGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'EV Grama Charge',
      subtitle: 'Smart Rural EV Charging Pipeline',
      description: 'An eco-friendly, decentralized network designed to solve electric vehicle charging accessibility gaps in rural villages and semi-urban communities.',
      highlights: [
        'Researched charging layout strategies for rural infrastructure deployment.',
        'Engineered custom interactive mapping workflows for localization of solar-powered nodes.',
        'Conceptualized localized scheduling interfaces to balance rural grid power overloads.',
        'Fostered sustainable development by bridging the urban-rural EV divide.'
      ],
      techStack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Google Maps API'],
      classificationCode: 'PRJ-EVC-102'
    },
    {
      id: '2',
      title: 'AI Water Footprint Calculator',
      subtitle: 'Cognitive Sustainability Analyzer',
      description: 'A responsive full-stack platform integrated with LLMs to estimate and analyze the real freshwater consumption of daily-use commercial goods.',
      highlights: [
        'Built dynamic interactive calculator workflows for custom daily product analysis.',
        'Integrated GenAI LLM API endpoints to produce contextual recommendations on conservation.',
        'Constructed clean, responsive UI layouts emphasizing eco-transparency.',
        'Selected for peer-reviewed publication and formal presentation at SKITE 2025.'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'RESTful APIs', 'OpenAI/Gemini Core'],
      classificationCode: 'PRJ-H2O-909'
    },
    {
      id: '3',
      title: 'SKITE 2025 Symposium Presentation',
      subtitle: 'National Research Conference',
      description: 'Formally presented and defense-tested "Software Application to Calculate the Water Footprints for Daily-Use Products" at the prestigious SKITE National Conference.',
      highlights: [
        'Staged live demonstrations of the functional application to senior academic delegates.',
        'Analyzed data-driven knowledge discovery and interactive enhancement methodologies.',
        'Received high commendation for practical sustainable software engineering workflows.'
      ],
      techStack: ['Technical Writing', 'Data Analysis', 'Presentation', 'Knowledge Discovery'],
      classificationCode: 'CONF-SKITE-2025'
    }
  ];

  const handleCardClick = (project: Project) => {
    playSound('click');
    setSelectedProject(project);
  };

  const closeDialog = () => {
    playSound('click');
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-cyber-cyan" />
          <h2 className="text-xl font-serif italic tracking-tight text-white">
            Projects & Creative Archive
          </h2>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">SECTOR // 03 NODES</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            id={`card-${proj.id}`}
            onClick={() => handleCardClick(proj)}
            className="cyber-bento-card p-6 cursor-pointer flex flex-col justify-between group relative overflow-hidden h-64"
          >
            {/* Top Tag & Code */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider border border-[#C5A059]/20 px-2 py-0.5 bg-[#C5A059]/5">
                {proj.classificationCode}
              </span>
              {proj.id === '1' && <Cpu className="h-4 w-4 text-[#C5A059]" />}
              {proj.id === '2' && <Droplet className="h-4 w-4 text-[#C5A059]" />}
              {proj.id === '3' && <Award className="h-4 w-4 text-[#C5A059]" />}
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-medium text-white tracking-tight group-hover:text-cyber-cyan transition-colors">
                {proj.title}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-sans">
                {proj.subtitle}
              </p>
            </div>

            {/* Brief Description */}
            <p className="text-xs text-white/60 mt-3 line-clamp-3 font-sans leading-relaxed">
              {proj.description}
            </p>

            {/* Bottom Tech Tags */}
            <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-cyber-cyan/10">
              {proj.techStack.slice(0, 3).map((tech, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono bg-cyber-cyan/5 text-cyber-cyan px-2 py-0.5 border border-cyber-cyan/20"
                >
                  {tech}
                </span>
              ))}
              {proj.techStack.length > 3 && (
                <span className="text-[9px] font-mono bg-cyber-magenta/5 text-cyber-magenta px-1 border border-cyber-magenta/20">
                  +{proj.techStack.length - 3}
                </span>
              )}
            </div>

            {/* Active hover cyan flash */}
            <div className="absolute right-0 bottom-0 w-1.5 h-1.5 bg-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Pop-up Cyber-Detailed View */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
          onClick={closeDialog}
        >
          <div 
            className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 p-6 md:p-10 relative pixel-grid shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant corner layout details */}
            <div className="absolute top-3 left-4 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] select-none">
              NISHCHITHA ARCHIVE // FOLIO_DETAIL
            </div>

            {/* Close Button */}
            <button 
              onClick={closeDialog}
              className="absolute top-4 right-4 text-white/40 hover:text-white font-mono text-xs border border-white/10 hover:border-white/30 px-3 py-1.5 bg-white/2 hover:bg-white/5 transition-all cursor-pointer"
            >
              CLOSE SYSTEM
            </button>

            <div className="mt-8 space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#C5A059] tracking-widest uppercase">
                  {selectedProject.classificationCode} // ARCHIVE_CORE
                </span>
                <h3 className="text-3xl font-serif font-light text-white tracking-tight">
                  <GlitchedText text={selectedProject.title} speed={1500} />
                </h3>
                <p className="text-xs uppercase tracking-widest text-white/40">{selectedProject.subtitle}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-white/40 border-b border-white/5 pb-1 uppercase tracking-widest">
                  Description
                </h4>
                <p className="text-sm text-white/75 leading-relaxed font-sans font-light">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-white/40 border-b border-white/5 pb-1 uppercase tracking-widest">
                  Key Accomplishments
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="text-xs text-white/60 flex items-start space-x-2 font-sans leading-relaxed">
                      <span className="text-[#C5A059] font-mono select-none mt-1">○</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] font-mono text-[#C5A059] border-b border-white/5 pb-1 uppercase tracking-widest">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-mono bg-[#C5A059]/10 text-[#C5A059] px-3 py-1.5 border border-[#C5A059]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
