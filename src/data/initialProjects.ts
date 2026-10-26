import type { Project } from '../types/portfolio';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'andhaar',
    title: 'Andhaar: A Psychological Horror Experience',
    subtitle: 'Atmospheric Psychological Horror in Unreal Engine 5',
    category: 'Psychological Horror',
    role: 'Game Designer & Developer',
    engine: 'Unreal Engine 5',
    technology: ['Unreal Engine 5', 'Blueprints', 'Dynamic Lighting', 'Audio Subsystem', 'Modular Event System'],
    designFocus: [
      'Tension',
      'Pacing',
      'Environmental Storytelling',
      'Player Anticipation',
      'Psychological Horror',
      'Player Feedback'
    ],
    overview: 'A psychological horror experience focused on player immersion, tension building, environmental storytelling, and anticipation. The project explores how light, shadow, and sound interact to manipulate player psychology and establish relentless suspense.',
    idea: 'To craft an unsettling horror experience where fear does not rely purely on sudden jump scares, but instead emerges organically from vulnerability, ambiguous threats, claustrophobic atmosphere, and the dread of what lies just beyond the line of sight.',
    coreGameplay: [
      'Exploration of hostile and dimly lit corridors where sound and silhouettes guide player navigation.',
      'Carefully paced tension building that shifts from eerie stillness to high-stakes avoidance.',
      'High-intensity chase sequence triggered through dynamic environmental progression.',
      'Environmental interaction requiring player observation, spatial awareness, and vulnerability.'
    ],
    designDecisions: [
      'Modular Horror Event System: Scripted psychological events that trigger based on player positioning, pacing, and dwell time rather than predictable timers.',
      'Lighting as a Gameplay Tool: Deep volumetric shadows and dynamic light sources force players to choose between visibility and stealth.',
      'Sound Cues & Sonic Pacing: Audio spatialization and subtle frequency shifts amplify player paranoia and signal immediate proximity of danger.',
      'Exploration-to-Chase Arc: The game loop deliberately transitions from slow psychological tension to an adrenaline-driven evasion sequence.'
    ],
    playerExperience: 'Designed to evoke vulnerability, intense curiosity, and visceral dread. Players constantly evaluate whether to step forward into darkness, deciphering environmental cues while knowing that safety is ephemeral.',
    development: 'Built by Ruturaj in Unreal Engine 5. AI was used only as a troubleshooting and debugging aid during development. The core design, gameplay systems, atmospheric pacing, scripted triggers, and level atmosphere were created and implemented directly in Unreal Engine 5.',
    media: {
      screenshots: [],
      placeholderLabel: 'Gameplay footage coming soon'
    },
    links: {},
    tags: ['Unreal Engine 5', 'Psychological Horror', 'Game Mechanics', 'Modular Systems', 'Atmospheric Design'],
    featured: true,
    futureConcept: false,
    aiAssistance: {
      enabled: false,
      label: ''
    },
    status: 'Featured Showcase',
    order: 1
  },
  {
    id: 'judgement',
    title: 'Judgement',
    subtitle: 'Multiplayer Trick-Taking Card Game',
    category: 'Multiplayer / Strategy',
    role: 'Game Designer',
    engine: 'Web Game',
    technology: ['React', 'TypeScript', 'Socket.IO', 'Vercel', 'Render'],
    designFocus: [
      'Prediction & Judgement',
      'Player Decision-Making',
      'Risk & Reward',
      'Multiplayer Interaction',
      'Trick-Taking Rules',
      'Hukum / Trump Strategy',
      'Replayability'
    ],
    overview: 'A real-time multiplayer trick-taking card game designed around prediction, strategy, and competitive decision-making. Players evaluate their hands, formulate predictions before each round, and compete to fulfill their exact bid.',
    idea: 'Translating the classic competitive dynamic of Indian card trick-taking games into a frictionless, accessible online multiplayer experience where social psychology and calculated risk matter as much as card strength.',
    coreGameplay: [
      'Room-based online multiplayer supporting 2 to 6 players in synchronized sessions.',
      '8-round structured gameplay with rotating dealer dynamics and shifting hand sizes.',
      'Pre-round Judgement phase where each player must predict their exact winning trick count.',
      'Hukum / trump declaration mechanics that alter suit hierarchies each round.',
      'Follow-suit mechanics, trick evaluation logic, and simultaneous judgement reveal.',
      'Cumulative scoring penalizing underbids and overbids, rewarding precise game mastery.'
    ],
    designDecisions: [
      'Simultaneous Prediction Phase: Concealing judgements until all players commit prevents copycat play and amplifies table anticipation.',
      'Dynamic Round Hand Sizes: Varying trick counts per round tests player adaptability across both constrained and expansive hands.',
      'Exact-Prediction Scoring Penalty: Missing a prediction by even one trick yields zero or negative points, making safe vs aggressive play a pivotal choice.',
      'Hukum / Trump System: Strategic trump suits give weaker card hands tactical avenues to disrupt opponents\' projected wins.'
    ],
    playerExperience: 'Cultivates tense tactical calculation, psychological bluffing, and electric table rivalry. Players experience the thrill of executing an underdog victory or sweating through a precarious final trick to match their exact prediction.',
    development: 'Ruturaj designed the core game idea, rules, mechanics, player interaction, prediction system, and multiplayer experience. The playable implementation was created with substantial AI assistance for coding.',
    media: {
      screenshots: [],
      placeholderLabel: 'Gameplay media coming soon'
    },
    links: {
      githubUrl: 'https://github.com/Ruturaj1610/Judgement',
      liveUrl: 'https://judgement-eight.vercel.app/'
    },
    tags: ['Web Game', 'Multiplayer Systems', 'Game Design', 'Trick-Taking', 'Socket.IO', 'Strategy'],
    featured: true,
    futureConcept: false,
    aiAssistance: {
      enabled: true,
      label: 'AI-assisted prototype',
      disclosure: 'Ruturaj designed the concept, game rules, prediction mechanics, and player experience. The playable code implementation was created with substantial AI assistance.'
    },
    status: 'Playable Web Game',
    order: 2
  },
  {
    id: 'konre',
    title: 'Konre',
    subtitle: 'Anonymous Questions Party Game',
    category: 'Social / Multiplayer',
    role: 'Game Designer',
    engine: 'Web Game',
    technology: ['React', 'TypeScript', 'Socket.IO', 'Netlify'],
    designFocus: [
      'Curiosity & Anonymity',
      'Social Interaction',
      'Voting & Deduction',
      'Player Psychology',
      'Group Dynamics',
      'Replayability'
    ],
    overview: 'A real-time multiplayer social party game built around anonymous questions, candid revelations, player deduction, and voting dynamics for groups of up to 10 players.',
    idea: 'To lower social barriers and spark uninhibited conversations among friends by leveraging cryptographic anonymity, curiosity-driven prompts, and lighthearted competitive guessing.',
    coreGameplay: [
      'Up to 10 players join via private room codes on any browser device.',
      'Anonymous question submission phase where players submit candid or humorous prompts.',
      'Randomized question broadcast with turn-by-turn player answers.',
      'Interactive voting and deduction phase where the room attempts to identify who asked each question.',
      'Competitive point system rewarding both clever question anonymity and acute social intuition.'
    ],
    designDecisions: [
      'Asymmetric Information Loop: Protecting question origin stimulates playful cross-examination and table conversation.',
      'Curiosity-Driven Prompts: The gameplay loop pivots on interpersonal curiosity rather than trivia knowledge, making it universally engaging.',
      'Dual-Reward Scoring: Players gain points for accurate deduction as well as successfully camouflaging their own questions.',
      'Rapid Turn Flow: Minimal friction between submission, answer, and voting preserves group energy and party tempo.'
    ],
    playerExperience: 'Creates vibrant social laughter, dramatic accusations, playful deceit, and memorable reveals. Players lean into the psychological mystery of learning what their peers are truly thinking.',
    development: 'Ruturaj designed the original game concept, core mechanics, anonymous interaction loops, voting systems, and player experience. The playable implementation was created with substantial AI assistance for coding.',
    media: {
      screenshots: [],
      placeholderLabel: 'Gameplay media coming soon'
    },
    links: {
      githubUrl: 'https://github.com/Ruturaj1610/KonRe',
      liveUrl: 'https://konre.netlify.app/'
    },
    tags: ['Social Multiplayer', 'Game Loops', 'Player Psychology', 'Voting Mechanics', 'Party Game'],
    featured: true,
    futureConcept: false,
    aiAssistance: {
      enabled: true,
      label: 'AI-assisted prototype',
      disclosure: 'Ruturaj designed the core game concept, gameplay loop, voting mechanics, and player experience. The playable implementation was developed with substantial AI assistance.'
    },
    status: 'Playable Web Game',
    order: 3
  },
  {
    id: 'dungeon-escape',
    title: 'Dungeon Escape',
    subtitle: '3D Dungeon Gameplay Systems',
    category: '3D Dungeon / Gameplay Systems',
    role: 'Game Developer',
    engine: 'Unreal Engine',
    technology: ['Unreal Engine', 'C++', 'Blueprints', 'Physics', 'Collision Handling'],
    designFocus: [
      'Exploration',
      'Inventory-Based Progression',
      'Conditional Progression',
      'Environmental Interaction',
      'Player Problem Solving'
    ],
    overview: 'A 3D dungeon-based game focused on exploration, logical progression, inventory interaction, and conditional room unlocking. Demonstrates practical Unreal Engine gameplay-system engineering.',
    idea: 'Creating a classic environmental puzzle dungeon where player progression is governed by tangible mechanical systems: object weight, item collection, and physical trigger states.',
    coreGameplay: [
      'Navigating labyrinthine stone dungeon chambers and observing environmental hints.',
      'Searching for and collecting specific key objects and physical relics.',
      'Managing inventory items to interact with dungeon mechanisms.',
      'Triggering pressure plates requiring precise object weight placement.',
      'Unlocking conditional security doors through multi-step mechanical prerequisites.'
    ],
    designDecisions: [
      'Physicalized Pressure Plates: Utilizing Unreal physics and collision detection rather than abstract triggers to create tactile environmental feedback.',
      'Conditional Door Logic: Layering requirements (e.g. inventory key + weight balance) to foster logical problem-solving.',
      'Atmospheric Lighting & Visibility: High-contrast dynamic torches draw player focus to interactive objects without UI hand-holding.',
      'Clear Mechanical Feedback: Visual and physical changes (doors opening, plate depressing) immediately validate player discoveries.'
    ],
    playerExperience: 'Delivers rewarding "eureka" moments as players decode environmental dependencies, manipulate dungeon physics, and open paths forward through deductive trial and interaction.',
    development: 'Developed in Unreal Engine focusing on core gameplay system architecture: collision handling, physics components, dynamic lighting, inventory management, and conditional doors.',
    media: {
      screenshots: [],
      placeholderLabel: 'Gameplay media coming soon'
    },
    links: {},
    tags: ['Unreal Engine', 'C++', 'Gameplay Systems', '3D Environment', 'Physics'],
    featured: true,
    futureConcept: false,
    aiAssistance: {
      enabled: false,
      label: ''
    },
    status: 'Technical Prototype',
    order: 4
  },
  {
    id: 'relivecricket',
    title: 'ReLiveCricket',
    subtitle: 'Interactive First-Person Cricket Moments',
    category: 'Future Game Concept',
    role: 'Game Designer / Concept',
    engine: 'Concept / Future Project',
    technology: ['Game Concept', 'Scenario Design', 'First-Person Physics', 'Future VR Potential'],
    designFocus: [
      'Historical Scenarios',
      'First-Person Batting',
      'Variable Bowling Physics',
      'Match Tension',
      'Player Decision-Making'
    ],
    overview: 'ReLiveCricket is a future game concept focused on turning iconic, historical cricket moments into interactive first-person experiences. The player steps directly into the crease as the batsman to face legendary deliveries in high-stakes match situations.',
    idea: 'Rather than an abstract management sim, ReLiveCricket investigates what it feels like to stand in the middle of a roaring stadium, facing an iconic delivery with a nation\'s hopes on the line — transforming passive spectator memory into visceral interactive agency.',
    coreGameplay: [
      'Historical Match Scenarios: Dropping players into precise overs and situations from legendary cricket history.',
      'First-Person Crease Perspective: Experiencing the ball hurtling towards the batsman from realistic eye level.',
      'Variable Bowling Line & Length: Simulating deliveries with realistic swing, seam, bounce, and pace variation.',
      'Field Placement & Match Context: Reading gap positions, run-rate requirements, and match-saving pressures.',
      'Dynamic Decision-Making: Splitting seconds between leaving, defending, lofting, or rotating strike to alter or recreate history.'
    ],
    designDecisions: [
      'Scenario-Based Architecture: Curating bite-sized, high-emotion historical vignettes rather than generic full-length matches.',
      'Multi-Variable Bowling Model: Line, length, release angle, speed, and pitch degradation combine to demand genuine anticipation.',
      'Contextual Match Audio: Stadium acoustic feedback dynamically responds to ball trajectory, edge sounds, and crowd roar.',
      'Future VR Expansion: Conceived with motion-controller batting mechanics for 1:1 tactile immersion.'
    ],
    playerExperience: 'Aims to capture the heart-pounding intensity of facing express pace under immense pressure, giving cricket fans the unprecedented thrill of playing out historical destiny with their own hands.',
    development: 'This is currently a game concept that Ruturaj is interested in developing in the future. The project explores scenario design, physics variables, and immersive first-person player agency.',
    media: {
      screenshots: [],
      placeholderLabel: 'Concept visual & design documentation in progress'
    },
    links: {},
    tags: ['Game Concept', 'First-Person', 'Sports Simulation', 'Scenario Design', 'Future VR'],
    featured: false,
    futureConcept: true,
    conceptStatus: 'Concept / Future Project',
    aiAssistance: {
      enabled: false,
      label: ''
    },
    status: 'Concept / Future Project',
    order: 5
  }
];
