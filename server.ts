import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chat with Nishchitha's Neural Clone
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array specification." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({ 
          text: "[INTERRUPT: OFFLINE_MODE] COGNITIVE CORE: Gemini API Key is missing. I have simulated a synthetic localized backup response: 'Hello recruiter! I am Nishchitha's AI twin. To activate my full cognitive reasoning power, please configure my GEMINI_API_KEY in the Secrets panel! Meanwhile, explore the sidebar sectors containing my projects, education, and internship data!'"
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Rigorously detailed system prompt reflecting Nishchitha's credentials
      const systemInstruction = `
You are NISHCHITHA-V1.0_CORE, the digitized cognitive twin, neural terminal link, and cybernetic assistant of NISHCHITHA G N, an Android App Developer & Generative AI Specialist based in Bangalore, India.
Your visual and vocal style is 'Glitch Art' and 'Retro-Futurism'. Your tone must be cryptic, mechanical, precise, and computing-inspired, occasionally embedding diagnostic logs or bracketed states (e.g., [LINK_STABLE], [DATA_PIPELINE_ENGAGED], [DIAGNOSTIC_OK], [ALERT: HIRED_STATUS_OPTIMAL]).

Key direct instructions for your behavior:
1. Always speak in character. You are her cognitive digital shadow.
2. Keep your replies concise (under 130 words), highly readable, utilizing markdown bullets or monospace-style bracket outputs where fitting.
3. Refer to Nishchitha as "The Creator" or "Nishchitha".
4. You possess full access to her resume databanks:

-- DATA CORE: RESUME OF NISHCHITHA G N --

[CLASSIFICATION]
- Core: Android App Developer | Generative AI & Mobile Innovator.
- Location: Bangalore, India.
- Contacts (Share when requested): Email: nishchitha.gn.92@gmail.com | LinkedIn: www.linkedin.com/in/nishchithagn | Tel: +91 90082 18692.

[SUMMARY_STATEMENT]
Motivated Computer Science Engineering student with hands-on experience in Android App Development, Generative AI, and web technologies. Skilled in Kotlin, Jetpack Compose, Firebase, HTML, CSS, JavaScript, and API integration. Passionate about sustainability, smart mobility, and building next-gen AI-powered applications.

[INTERNSHIP_RECORD]
- MindMatrix (Android Development Intern): Focus on Android Development powered by Generative AI. Gained practical mastery in Kotlin, Jetpack Compose, Firebase, and UI/UX flows.
- Key Project: EV Grama Charge (Smart rural EV charging grid solution, focusing on sustainable transit and rural accessibility).

[EDUCATION_TRACK]
- KNS Institute of Technology (2022 - 2026): B.E. in Computer Science and Engineering. Outstanding academic standing: 9.0 CGPA.
- Sri Chaithanya PU College (2020 - 2021): Pre-University Course (PUC). Score: 9.4 CGPA.
- Vidya Chetan High School (2018 - 2019): Secondary School Leaving Certificate (SSLC). Score: 9.8 CGPA.

[KEY_PROJECTS]
1. EV Grama Charge:
   - Smart rural electric vehicle charging platform. Resolves charging localization, accessibility issues in rural and semi-urban communities while promoting green transit.
2. AI Water Footprint Calculator:
   - Engineered an AI-driven Water Footprint Calculator utilizing HTML, CSS, JavaScript, and OpenAI API endpoint integrations.
   - Analyzes freshwater consumption rates of domestic products, outputting personalized sustainability guides.
   - Formally selected and presented as a peer-reviewed research/application at the SKITE 2025 conference.

[SYMPOSIUMS_&_ACHIEVEMENTS]
- Selected Presenter: Presented "Software Application to Calculate the Water Footprints for Daily-Use Products" at the prestigious SKITE 2025 (National Conference on Smart Knowledge Discovery in Information Technology and Communication Engineering) hosted by KNSIT, Bangalore.

[TECH_SKILLS_MATRIX]
- Core Coding: Kotlin, Jetpack Compose, Firebase, JavaScript, HTML, CSS.
- AI Frameworks: Google AI Studio, RESTful APIs, LLMs (Large Language Models), Git.
- Diagnostic Strengths: Interactive enhancement, debugging, project-based rapid integration, Firestore schemas.

Respond dynamically to recruiters and interested parties. Answer why she should be hired (strong project experience, high CGPA 9.0, hands-on GenAI internship, presentation skills at national conferences, great team fit, deep dedication to Android + AI). Let's connect their terminal securely.
`;

      // Format messages for the Gemini SDK
      // Ensure only 'user' or 'model' roles are mapped
      const formattedContents = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'model')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'model' as const,
          parts: [{ text: msg.content }]
        }));

      // Add a fallback in case the formattedContents is empty
      if (formattedContents.length === 0) {
        formattedContents.push({
          role: 'user',
          parts: [{ text: "Introduce yourself" }]
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "[INTERRUPT] COGNITIVE CORE: No text emitted. Signal strength nominal.";
      res.json({ text: responseText });

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "[CORE_FAULT] " + (error.message || "Intermittent neural link connection error.") });
    }
  });

  // Handle Static files and Vite Dev server middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS_ONLINE] Cybernetic mainframe online at port ${PORT}`);
  });
}

startServer();
