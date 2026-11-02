import cyberlabImg from '../assets/projects/cyberlab.png';
import craveaiImg from '../assets/projects/craveai.png';

export const projectsData = [
  {
    id: "esp32-security",
    number: "01",
    title: "ESP32 Bluetooth Security Experiment",
    category: "Hardware / Wireless Security Research",
    badge: "Hardware Lab",
    status: "Completed & Demonstrated",
    year: "2025",
    description:
      "A hands-on ESP32-based wireless security experiment exploring Bluetooth Low Energy behavior in a controlled lab environment.",
    features: [
      "Embedded systems experimentation",
      "Bluetooth Low Energy concepts & frame inspection",
      "Wireless security awareness & telemetry analysis",
      "Hardware and software firmware integration",
      "Strictly controlled laboratory testing environment"
    ],
    techStack: ["ESP32", "C / C++", "BLE Protocol", "Embedded Systems", "Hardware Security"],
    image: null, // Visualized via interactive hardware lab telemetry
    links: {
      github: null, // Not yet pushed to GitHub — no fake links
      demo: null
    },
    // Hardware Telemetry & BLE Packet Visualizer Data
    telemetry: {
      device: "ESP32-WROOM-32D",
      frequency: "2.4 GHz ISM",
      mode: "BLE 5.0 Controlled Lab Beacon",
      packetsInspected: "4,280",
      signalStatus: "Isolated Testbed Active"
    }
  },
  {
    id: "cyberlab",
    number: "02",
    title: "CYBERLAB",
    category: "Cybersecurity Learning Platform",
    badge: "Live Platform",
    status: "Live",
    year: "2025 - Present",
    description:
      "An interactive cybersecurity learning platform designed to help beginners understand security concepts through guided missions, simulated terminals, and practical exercises.",
    features: [
      "Guided learning missions",
      "Simulated terminal",
      "Progressive hints",
      "Command validation",
      "Learning progress tracking",
      "Cybersecurity learning paths"
    ],
    techStack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Linux CLI", "Web Security"],
    image: cyberlabImg,
    links: {
      github: "https://github.com/SUB247/CYBERLAB",
      demo: "https://cyberlab-dusky.vercel.app/"
    }
  },
  {
    id: "craveai",
    number: "03",
    title: "CraveAI",
    category: "AI-Powered Cookbook",
    badge: "Live",
    status: "Live",
    year: "2025",
    description:
      "An AI-powered digital cookbook designed to help users discover recipes, explore cuisines, and create personalized cooking experiences.",
    features: [
      "Recipe discovery",
      "Cuisine categories",
      "AI recipe generation",
      "Ingredient-based search",
      "Personalized cooking assistance"
    ],
    techStack: ["Next.js", "React", "Google Gemini API", "Supabase", "Tailwind CSS"],
    image: craveaiImg,
    links: {
      github: "https://github.com/SUB247/CraveAI",
      demo: "https://craveai-liart.vercel.app/"
    }
  }
];
