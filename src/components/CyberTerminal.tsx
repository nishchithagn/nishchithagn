import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { playSound } from './AudioSystem';
import { GlitchedText } from './GlitchedText';
import { Terminal, Send, ShieldAlert, Zap, Radio, RefreshCw } from 'lucide-react';

export const CyberTerminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'model',
      content: "[NEURAL_LINK_ESTABLISHED]\n\nCOGNITIVE REPLICA NISHCHITHA-V1.0_CORE IS ONLINE.\n\nWELCOME, AGENT. I represent the cognitive patterns and technical archives of NISHCHITHA G N, Android Developer and Generative AI Specialist.\n\nInput your query or select a preset command to query my databanks regarding hireability, project details, and technical pipelines.",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemAlert, setSystemAlert] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetQueries = [
    { label: 'WHY HIRE?', query: 'Provide diagnostic reasons on why Nishchitha should be hired immediately for an Android or Generative AI position.' },
    { label: 'PROJECTS', query: 'List all major active projects built by Nishchitha and describe their technical architectural metrics.' },
    { label: 'INTERNSHIP', query: 'What was Nishchitha\'s specific role and contribution at MindMatrix during her internship?' },
    { label: 'SECURE LINK', query: 'Output Nishchitha\'s verified contact coordinates, including email, LinkedIn, and telephone link.' }
  ];

  const getLocalResponse = (query: string): string => {
    const cleanQuery = query.toLowerCase();

    // Check for "hire" / "why" / "recruit" / "choose" / "employ"
    if (cleanQuery.includes('hire') || cleanQuery.includes('why') || cleanQuery.includes('recruit') || cleanQuery.includes('choose') || cleanQuery.includes('employ') || cleanQuery.includes('strength') || cleanQuery.includes('benefit')) {
      return `[SYSTEM_DIAGNOSTIC: HIREABILITY_CORE]

Nishchitha G N represents an exceptional candidate for Android App Developer or Generative AI roles. Her key strengths include:

1. **Academic Excellence**: Computer Science Engineering undergrad at KNS Institute of Technology with an outstanding **9.0 CGPA** (and consistently strong history: 9.4 CGPA in PUC, 9.8 CGPA in SSLC).
2. **Modern Android Mastery**: Practical, hands-on experience in native Android development utilizing **Kotlin**, **Jetpack Compose**, and robust cloud backends like **Firebase**.
3. **Generative AI Specialist**: Successfully integrated AI pipelines into real-world systems, such as building intelligent calculator solutions and deploying LLM prompts.
4. **Research & Presentation**: Proven capability to defend and present engineering solutions to academic delegates (selected speaker at the National-Level SKITE 2025 Conference).

[DIAGNOSTIC_RESULT: STATUS_READY_FOR_ENGAGEMENT]`;
    }

    // Check for "project" / "work" / "app"
    if (cleanQuery.includes('project') || cleanQuery.includes('work') || cleanQuery.includes('ev') || cleanQuery.includes('water') || cleanQuery.includes('skite') || cleanQuery.includes('calculator') || cleanQuery.includes('grama')) {
      return `[SYSTEM_DIAGNOSTIC: PROJECT_ARCHIVE]

Core verified projects retrieved from Nishchitha's academic and professional logs:

1. **EV Grama Charge (Smart Rural EV Charging)**:
   - *Architecture*: Kotlin, Jetpack Compose, Firebase, Google Maps API.
   - *Details*: A decentralized mapping and scheduling network to solve electric vehicle charging accessibility gaps in rural villages and semi-urban communities, balancing grid power overloads.

2. **AI Water Footprint Calculator (Sustainability Tech)**:
   - *Architecture*: HTML5, CSS3, JavaScript, RESTful APIs, OpenAI/Gemini Integration.
   - *Details*: Estimates and analyzes freshwater consumption of daily-use commercial goods, producing contextual recommendations. Selected for formal presentation at SKITE 2025.

3. **SKITE 2025 Symposium Presentation**:
   - *Details*: Formally presented "Software Application to Calculate the Water Footprints for Daily-Use Products" at the National Conference hosted by KNSIT, Bangalore, receiving high commendation for sustainable software engineering.

[DIAGNOSTIC_RESULT: PROJECTS_INTEGRITY_VERIFIED]`;
    }

    // Check for "intern" / "mindmatrix" / "experience" / "career" / "job"
    if (cleanQuery.includes('intern') || cleanQuery.includes('mindmatrix') || cleanQuery.includes('experience') || cleanQuery.includes('job') || cleanQuery.includes('career') || cleanQuery.includes('role')) {
      return `[SYSTEM_DIAGNOSTIC: EXPERIENCE_TRACE]

**MindMatrix — Android Development Intern (Generative AI Integration)**
*Active Period: 2024 – 2025*

*Operational Achievements*:
- Engineered responsive client-side mobile interfaces using **Kotlin** and **Jetpack Compose**.
- Integrated local offline state synchronizations and Firebase database real-time listeners.
- Designed logic adapters to process and render generative outputs dynamically.
- Developed "EV Grama Charge" under the MindMatrix incubation pipeline to bridge the rural-urban green transit divide.

[DIAGNOSTIC_RESULT: PROFESSIONAL_RECORD_EXCELLENT]`;
    }

    // Check for "contact" / "email" / "linkedin" / "phone" / "connect" / "call" / "location" / "address"
    if (cleanQuery.includes('contact') || cleanQuery.includes('email') || cleanQuery.includes('linkedin') || cleanQuery.includes('phone') || cleanQuery.includes('connect') || cleanQuery.includes('call') || cleanQuery.includes('coordinate') || cleanQuery.includes('location')) {
      return `[SYSTEM_DIAGNOSTIC: SECURE_CHANNELS]

Verified contact channels for Nishchitha G N:

- **Email**: nishchitha.gn.92@gmail.com
- **LinkedIn**: linkedin.com/in/nishchithagn
- **Phone**: +91 90082 18692
- **Location**: Bangalore, Karnataka, India [12.9716° N, 77.5946° E]

Please use the links above or the interactive buttons in the side pane to establish a direct communication channel.

[DIAGNOSTIC_RESULT: CHANNELS_STABLE]`;
    }

    // Check for "skills" / "tech" / "languages" / "tools" / "framework"
    if (cleanQuery.includes('skill') || cleanQuery.includes('tech') || cleanQuery.includes('kotlin') || cleanQuery.includes('compose') || cleanQuery.includes('firebase') || cleanQuery.includes('java') || cleanQuery.includes('web') || cleanQuery.includes('javascript') || cleanQuery.includes('html') || cleanQuery.includes('css')) {
      return `[SYSTEM_DIAGNOSTIC: TECHNICAL_CAPABILITIES]

Active technology inventory verified in core databanks:

- **Languages & Core Coding**: Kotlin, Java, JavaScript (ES6+), HTML5, CSS3
- **Mobile Development**: Native Android, Jetpack Compose, SDK Integrations (Google Maps, Location services, Google Play Services)
- **Backend & Cloud**: Firebase Authentication, Firestore Database, Realtime DB, local storage systems (Room / SQLite)
- **Advanced Tools**: Git & GitHub, Google AI Studio, LLM Prompt Engineering, RESTful APIs, Visual Studio Code, Android Studio

[DIAGNOSTIC_RESULT: CAPABILITIES_MATCH_OPTIMAL]`;
    }

    // Check for "education" / "college" / "school" / "degree" / "cgpa" / "knsit" / "academic"
    if (cleanQuery.includes('education') || cleanQuery.includes('college') || cleanQuery.includes('school') || cleanQuery.includes('degree') || cleanQuery.includes('cgpa') || cleanQuery.includes('knsit') || cleanQuery.includes('academic') || cleanQuery.includes('puc') || cleanQuery.includes('sslc')) {
      return `[SYSTEM_DIAGNOSTIC: ACADEMIC_RECORD]

Scholastic achievements and academic history metrics:

1. **B.E. in Computer Science and Engineering**
   - *Institution*: KNS Institute of Technology, Bangalore (2022 – 2026)
   - *Academic Standing*: **9.0 CGPA**
   - *Focus*: Distributed architectures, modern mobile software systems, artificial intelligence.

2. **Pre-University Course (PUC)**
   - *Institution*: Sri Chaithanya PU College (2020 – 2021)
   - *Academic Standing*: **9.4 CGPA**
   - *Focus*: Physics, Chemistry, Mathematics, Computer Science.

3. **Secondary School Leaving Certificate (SSLC)**
   - *Institution*: Vidya Chetan High School (2018 – 2019)
   - *Academic Standing*: **9.8 CGPA**

[DIAGNOSTIC_RESULT: ACADEMIC_VERIFICATION_COMPLETE]`;
    }

    // Greeting Fallbacks
    if (cleanQuery.includes('hello') || cleanQuery.includes('hi') || cleanQuery.includes('hey') || cleanQuery.includes('greet') || cleanQuery.includes('welcome')) {
      return `Hello, Authorized Guest.

Welcome to the local Cognitive Core mainframe. I can provide instantaneous diagnostic readouts from the given portfolio databanks.

Please query me about any of the following parameters:
- **WHY HIRE?** (Academic merit, modern Android focus, and presentation accolades)
- **PROJECTS** (EV Grama Charge, Water Footprint Calculator)
- **EXPERIENCE** (MindMatrix internship achievements)
- **SKILLS** (Kotlin, Jetpack Compose, Firebase, Web Stack)
- **EDUCATION** (Detailed CGPA records from school and college)
- **CONTACT** (Secured connection coordinates)`;
    }

    // Generic fallback based purely on given data
    return `[SYSTEM_DIAGNOSTIC: METRICS_LOCALLY_RESOLVED]

Query processed successfully using local resume telemetry.

Summary record of Nishchitha G N:
- **Degree & Standing**: B.E. in Computer Science (9.0 CGPA) at KNSIT (2022 – 2026).
- **Core Focus**: Android App Developer & Generative AI Specialist.
- **Key Enterprise**: "EV Grama Charge" (Kotlin, Compose, Firebase, Google Maps) built under MindMatrix.
- **National Presenter**: Formally selected speaker at SKITE 2025 conference (Water Footprint Calculator).
- **Direct Connect**: nishchitha.gn.92@gmail.com | +91 90082 18692

Please use one of the preset buttons above or search specific terms like 'projects', 'skills', or 'experience' for highly detailed local diagnostic readouts.`;
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    playSound('click');
    setSystemAlert(null);

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Occasional sound effects on data stream
    const audioInterval = setInterval(() => {
      playSound('data');
    }, 150);

    // Simulated short network delay for local terminal response
    setTimeout(() => {
      clearInterval(audioInterval);
      playSound('success');

      const responseText = getLocalResponse(textToSend);

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'model',
        content: responseText,
        timestamp: new Date().toLocaleTimeString(),
      }]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  return (
    <div className="border border-white/10 bg-[#121212] p-4 md:p-6 relative pixel-grid flex flex-col h-[550px] shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      {/* Title / Diagnostic Frame */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-3 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-[#C5A059]" />
          <h2 className="text-sm font-serif italic text-white">
            Cognitive Core Link // Nishchitha V1
          </h2>
        </div>
        <div className="flex items-center space-x-3 text-[10px] font-mono">
          <span className="flex items-center text-white/60">
            <Radio className="h-3 w-3 mr-1 text-[#C5A059]" /> CORE_ONLINE
          </span>
          <span className="text-white/40">REFRESH_RATE: 240Hz</span>
        </div>
      </div>

      {/* Terminal Telemetry Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="border border-white/5 bg-[#050505] p-2 font-mono text-[10px] space-y-0.5">
          <div className="text-white/30 uppercase tracking-widest text-[8px]">Uptime</div>
          <div className="text-[#C5A059] font-bold">2026_ACTIVE</div>
        </div>
        <div className="border border-white/5 bg-[#050505] p-2 font-mono text-[10px] space-y-0.5">
          <div className="text-white/30 uppercase tracking-widest text-[8px]">Academic Rating</div>
          <div className="text-white font-bold">9.0 CGPA (CSE)</div>
        </div>
        <div className="border border-white/5 bg-[#050505] p-2 font-mono text-[10px] space-y-0.5">
          <div className="text-white/30 uppercase tracking-widest text-[8px]">Cognitive Engine</div>
          <div className="text-[#C5A059] font-bold">LOCAL-FOLIO-DB</div>
        </div>
        <div className="border border-white/5 bg-[#050505] p-2 font-mono text-[10px] space-y-0.5">
          <div className="text-white/30 uppercase tracking-widest text-[8px]">Location Core</div>
          <div className="text-white font-bold">BANGALORE</div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 border border-white/5 bg-[#080808] p-4 font-mono text-xs scrollbar-thin">
        {messages.map((msg, idx) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender tag */}
            <span className={`text-[8px] mb-1 tracking-widest uppercase ${
              msg.sender === 'user' ? 'text-white/40' : 'text-[#C5A059]'
            }`}>
              {msg.sender === 'user' ? '[AUTHORIZED_GUEST]' : '[COGNITIVE_CORE]'} // {msg.timestamp}
            </span>

            {/* Bubble content */}
            <div className={`p-3 border max-w-[85%] whitespace-pre-wrap leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-white/2 border-white/10 text-white/90 font-light' 
                : 'bg-[#C5A059]/5 border-[#C5A059]/20 text-white/80'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-[#C5A059] text-xs font-mono">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span className="animate-pulse">COGNITIVE_CORE STREAMING METRICS... [██████░░░░]</span>
          </div>
        )}

        {systemAlert && (
          <div className="border border-white/15 bg-white/2 p-2 text-xs text-white/75 flex items-center space-x-2 animate-pulse font-mono">
            <ShieldAlert className="h-4 w-4 text-[#C5A059]" />
            <span>{systemAlert}</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Preset Suggestions */}
      <div className="mb-4">
        <div className="text-[9px] font-mono text-white/30 mb-2 uppercase tracking-widest">Secured Preset Inquiries:</div>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.query)}
              disabled={isTyping}
              className="text-[9px] font-mono border border-white/10 hover:border-[#C5A059] bg-white/2 hover:bg-[#C5A059]/5 text-white/60 hover:text-[#C5A059] px-3 py-1.5 transition-all duration-300 cursor-pointer disabled:opacity-40 uppercase tracking-wider"
            >
              &gt; {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input controls */}
      <div className="flex items-center space-x-2 border border-white/10 p-1 bg-[#050505]">
        <span className="text-[#C5A059] font-mono pl-2 select-none">&gt;</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isTyping}
          placeholder="Query the AI Core..."
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none p-2 placeholder-white/20 disabled:opacity-50"
        />
        <button
          onClick={() => handleSend(inputValue)}
          disabled={!inputValue.trim() || isTyping}
          className="bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#C5A059] border border-[#C5A059]/35 hover:border-[#C5A059] px-4 py-2 transition-all duration-300 font-mono text-xs cursor-pointer flex items-center space-x-1 disabled:opacity-40"
        >
          <Send className="h-3 w-3" />
          <span className="hidden sm:inline">QUERY</span>
        </button>
      </div>
    </div>
  );
};

export default CyberTerminal;
