export const projectsData = [
  {
    id: "cyberlab",
    number: "01",
    title: "CYBERLAB",
    category: "Cybersecurity Learning Platform",
    badge: "Interactive Security Lab",
    status: "Prototype / In Development",
    year: "2025",
    description:
      "An interactive cybersecurity learning environment designed to help beginners understand security concepts through guided missions, simulated terminals and practical exercises.",
    features: [
      "Interactive learning missions",
      "Simulated terminal",
      "Progressive hints",
      "Command validation",
      "Learning progress tracking"
    ],
    techStack: ["React", "Tailwind CSS", "Linux CLI", "Web Security", "Framer Motion"],
    links: {
      github: "https://github.com/vmaurya905/cyberlab",
      demo: null // Configurable placeholder
    },
    // Interactive terminal preview data for the card!
    terminalDemo: {
      prompt: "guest@cyberlab:~$",
      initialCommand: "cyberlab --scan-target demo.local",
      initialOutput: [
        "[+] Initializing security sandbox...",
        "[+] Port 22: SSH (Open - OpenSSH 8.9p1)",
        "[+] Port 80: HTTP (Open - Nginx/1.18.0)",
        "[+] Port 443: HTTPS (Open - SSL/TLS Active)",
        "[!] Vulnerability check: 1 misconfiguration detected in auth token handler.",
        "[i] Mission Objective: Exploit token leakage to retrieve root flag."
      ],
      quickCommands: ["scan", "decrypt", "status", "hint"]
    }
  },
  {
    id: "relx",
    number: "02",
    title: "RELX",
    category: "AI Chatbot",
    badge: "LLM Web Experience",
    status: "Active Exploration",
    year: "2025",
    description:
      "An AI-powered conversational web application built to explore LLM integration and modern chatbot interfaces.",
    features: [
      "Gemini API integration",
      "Conversational interface",
      "Modern sidebar layout",
      "AI-powered responses"
    ],
    techStack: ["React", "Gemini API", "Tailwind CSS", "Framer Motion", "Markdown Parser"],
    links: {
      github: "https://github.com/vmaurya905/relx-ai",
      demo: null // Configurable placeholder
    },
    // Simulated chat interface preview
    chatDemo: [
      {
        sender: "user",
        text: "Can you explain how neural attention works in simple terms?"
      },
      {
        sender: "ai",
        text: "Think of attention like a spotlight: instead of reading an entire book equally, the model focuses on the words most related to the current context."
      }
    ]
  },
  {
    id: "ai-experiments",
    number: "03",
    title: "AI Experiments",
    category: "Artificial Intelligence",
    badge: "Research & Sandbox",
    status: "Active Research",
    year: "2024 - 2025",
    description:
      "A collection of experiments exploring language models, AI applications, prompt engineering and emerging AI technologies.",
    features: [
      "Prompt chain orchestration",
      "Tokenization & context window benchmarking",
      "Retrieval Augmented Generation (RAG) concepts",
      "System prompt vulnerability testing"
    ],
    techStack: ["Python", "Gemini API", "LangChain concepts", "Prompt Engineering"],
    links: {
      github: "https://github.com/vmaurya905/ai-experiments",
      demo: null
    },
    metrics: [
      { label: "Experiments", value: "8+" },
      { label: "Pipelines Tested", value: "12" },
      { label: "Latency Benchmark", value: "~320ms" }
    ]
  },
  {
    id: "creative-experiments",
    number: "04",
    title: "Creative Experiments",
    category: "Creative Technology",
    badge: "Motion & UI Concepts",
    status: "Continuous Sandbox",
    year: "2024 - 2026",
    description:
      "An evolving collection of visual experiments, interactive interfaces, UI concepts and motion design explorations.",
    features: [
      "GSAP timeline choreography",
      "Interactive canvas and particle systems",
      "Awwwards-style editorial typography",
      "Micro-interaction physics"
    ],
    techStack: ["GSAP", "ScrollTrigger", "Canvas API", "Tailwind CSS", "CSS Shaders"],
    links: {
      github: "https://github.com/vmaurya905/creative-experiments",
      demo: null
    },
    metrics: [
      { label: "Animations", value: "20+" },
      { label: "Framerate", value: "60 FPS" },
      { label: "Techniques", value: "Parallax / Shaders" }
    ]
  }
];
