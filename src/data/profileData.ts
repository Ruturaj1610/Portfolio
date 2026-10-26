import type { SkillCategory, ExperienceItem, EducationItem, AchievementItem, CertificationItem } from '../types/portfolio';

export const PROFILE_INFO = {
  name: 'Ruturaj Yogesh Patil',
  primaryTitle: 'Game Designer',
  secondaryPositioning: 'Unreal Engine • Gameplay Design • Interactive Experiences',
  location: 'Mumbai, India',
  email: 'patilruturaj1610@gmail.com',
  phone: '+91 9226376370',
  github: 'https://github.com/Ruturaj1610',
  linkedin: 'https://www.linkedin.com/in/ruturaj-patil-38799133b/',
  heroBio:
    'I’m a Game Designer focused on creating engaging gameplay systems, meaningful player experiences, and interactive worlds. I enjoy turning ideas into playable experiences, from multiplayer social games to immersive Unreal Engine environments.',
  designPhilosophy:
    'Great game design lives at the intersection of what the player does and why the player wants to keep doing it. I build systems that prioritize player agency, tension pacing, mechanical feedback, and psychological engagement.',
  aboutStory: [
    'I am an aspiring Game Designer based in Mumbai, India, with hands-on experience in Unreal Engine and multiplayer web-based games.',
    'My work centers on designing coherent game loops, intuitive player feedback systems, environmental storytelling, and multiplayer group dynamics. I believe game mechanics are a language — every button press, camera shift, and rule constraint shapes how a player feels.',
    'Whether architecting a tension-driven horror corridor in Unreal Engine 5 or designing social deduction mechanics for 10-player web sessions, I focus on turning creative design concepts into tangible, playable experiences.'
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Game Design',
    description: 'Core focus: Player psychology, systemic mechanics, and interactive feedback loops.',
    priority: 'primary',
    skills: [
      { name: 'Gameplay Design', highlight: true, description: 'Player agency, verbs, and tactile feedback' },
      { name: 'Game Mechanics', highlight: true, description: 'Rule systems, balance, and interaction states' },
      { name: 'Game Loop Design', highlight: true, description: 'Core, secondary, and meta progression cycles' },
      { name: 'Player Experience', highlight: true, description: 'Emotional resonance and pacing arcs' },
      { name: 'Level Design', highlight: true, description: 'Spatial guidance, sightlines, and pacing' },
      { name: 'Player Psychology', highlight: true, description: 'Motivation, risk-reward, and social dynamics' },
      { name: 'Player Feedback Systems', highlight: false, description: 'Audio-visual cues and state readability' },
      { name: 'Game Balancing', highlight: false, description: 'Pacing math, handicap rules, and tension curves' },
      { name: 'Difficulty Progression', highlight: false, description: 'Player mastery curve and friction tuning' },
      { name: 'Environmental Storytelling', highlight: false, description: 'Diegetic narrative through world design' },
      { name: 'Multiplayer Game Design', highlight: false, description: 'Social friction, deduction, and synchrony' },
      { name: 'Prototyping', highlight: false, description: 'Rapid playable iteration of core concepts' }
    ]
  },
  {
    title: 'Game Development',
    description: 'Technical execution to bring design ideas to playable life.',
    priority: 'secondary',
    skills: [
      { name: 'Unreal Engine 5', highlight: true, description: 'Blueprints, dynamic lighting, physics, audio' },
      { name: 'C++', highlight: true, description: 'Gameplay systems, collision, and object logic' },
      { name: 'Blueprints', highlight: true, description: 'Rapid visual scripting and modular event triggers' },
      { name: 'React', highlight: false, description: 'Interactive web UI and real-time state' },
      { name: 'TypeScript', highlight: false, description: 'Type-safe game logic and state handling' },
      { name: 'Three.js', highlight: false, description: 'Browser-based 3D scene rendering' }
    ]
  },
  {
    title: 'Tools & Workflow',
    description: 'Production, version control, and interface design.',
    priority: 'supporting',
    skills: [
      { name: 'Git', highlight: false },
      { name: 'GitHub', highlight: false },
      { name: 'Figma', highlight: false }
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'WebDev Intern',
    company: 'Cloud Councelage',
    period: 'Internship',
    responsibilities: [
      'Built two web application projects utilizing JavaScript and React.js.',
      'Applied React.js component architecture and state management to build a professional platform interface similar to LinkedIn.',
      'Developed responsive frontend layouts and modular UI component structures.'
    ],
    secondaryNote: 'Foundation in modern web technologies, component architecture, and interface design.'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering — Computer Science & Engineering (Data Science)',
    institution: 'Vidyavardhini’s College of Engineering and Technology',
    score: '8.91 / 10.0',
    scoreType: 'CGPA',
    highlight: 'Strong academic foundation in computational logic, algorithm design, and data structures.'
  },
  {
    degree: 'Higher Secondary Certificate (12th Grade)',
    institution: 'Sundaram Central School and Junior College, CBSE',
    score: '74%',
    scoreType: 'CBSE'
  },
  {
    degree: 'Secondary School Examination (10th Grade)',
    institution: 'Sundaram Central School and Junior College, CBSE',
    score: '84%',
    scoreType: 'CBSE'
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'First Prize',
    event: 'BYTEVERSE 2026',
    year: '2026',
    type: 'award'
  },
  {
    title: 'First Prize',
    event: 'Oscillations 2025 Research Paper Presentation Competition',
    year: '2025',
    type: 'award'
  },
  {
    title: 'Second Prize',
    event: 'Oscillations 2026 Research Paper Presentation Competition',
    year: '2026',
    type: 'award'
  },
  {
    title: 'Second Prize',
    event: 'TechBlitz 2026',
    year: '2026',
    type: 'award'
  },
  {
    title: 'Research Paper Publication: "Visualizing and Forecasting Stocks Using XGBoost"',
    event: 'Published in IEEE Xplore',
    year: 'Publication',
    type: 'publication',
    publisher: 'IEEE Xplore'
  },
  {
    title: 'Government Copyright Received',
    event: 'Code of "Visualizing and Forecasting Stocks Using XGBoost"',
    year: 'Copyright',
    type: 'copyright'
  },
  {
    title: 'Government Copyright Received',
    event: 'Code of "Kumudendu Algorithm"',
    year: 'Copyright',
    type: 'copyright'
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Unreal Engine 5 C++ Game Development',
    issuer: 'Udemy',
    year: '2025'
  },
  {
    title: 'Microsoft Power BI',
    issuer: 'Get Tutorials',
    year: '2024'
  },
  {
    title: 'Joy of Computing Using Python',
    issuer: 'NPTEL',
    year: '2024'
  },
  {
    title: 'Java Concepts',
    issuer: 'Infosys Springboard',
    year: '2024'
  }
];
