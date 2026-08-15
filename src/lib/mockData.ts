import type {
  ContentCategory,
  ContentItem,
  ContentSource,
  RecommendationType,
} from "@/types";

export const CATEGORIES: ContentCategory[] = [
  "technology",
  "sports",
  "finance",
  "entertainment",
  "science",
  "health",
  "gaming",
  "business",
];

export const SOURCES: ContentSource[] = ["news", "recommendation", "social"];

interface RichStoryTemplate {
  title: string;
  description: string;
  content: string;
  sourceName: string;
  author: string;
  authorHandle?: string;
  authorAvatar?: string;
  readTimeMinutes: number;
  tags: string[];
  rating?: number;
  mediaType?: RecommendationType;
}

const NEWS_TEMPLATES: Record<ContentCategory, RichStoryTemplate[]> = {
  technology: [
    {
      title: "Breakthrough in Local AI: 7B Models Running Smoothly on Ultra-Low-Power Edge Hardware",
      description: "A new quantization and kernel execution architecture allows high-throughput neural inference without high-end discrete GPUs.",
      content: "Engineers have demonstrated sub-10W transformer inference with zero perceptual degradation in reasoning quality. By redesigning memory layout and SIMD vector packing, mobile devices and IoT appliances can now execute local conversational models securely and offline without cloud roundtrips.",
      sourceName: "TechChronicle",
      author: "Elena Rostova",
      authorHandle: "@erostova",
      readTimeMinutes: 4,
      tags: ["AI", "EdgeComputing", "Hardware", "OpenSource"],
    },
    {
      title: "W3C and Major Browser Vendors Standardize Instant Offline Local Data Storage",
      description: "A unified high-performance file-system and index protocol reaches cross-vendor consensus across Chromium, WebKit, and Gecko.",
      content: "The newly ratified specification brings near-native storage speeds to web applications. With encrypted SQLite-compatible indexing and background sync workers, progressive web applications can now deliver seamless desktop-grade experiences completely offline.",
      sourceName: "DevWire",
      author: "Marcus Chen",
      authorHandle: "@mchen_dev",
      readTimeMinutes: 3,
      tags: ["WebDev", "W3C", "Standards", "Frontend"],
    },
    {
      title: "Open-Source Distributed Database Unveils Native Graph-Vector Hybrid Search Engine",
      description: "Combines semantic vector embeddings with deep relationship graph traversal in a single query planner.",
      content: "Bridging the gap between knowledge graphs and high-dimensional vector search, this new release allows real-time contextual discovery for large language agents. Benchmark tests show a 4x reduction in query latency compared to multi-system pipelines.",
      sourceName: "DataSystems Journal",
      author: "Priya Sharma",
      authorHandle: "@psharma_data",
      readTimeMinutes: 5,
      tags: ["Database", "GraphDB", "VectorSearch", "Architecture"],
    },
    {
      title: "Quantum Computing Benchmark: 100-Qubit Error Correction Milestone Achieved",
      description: "Surface code experiments demonstrate exponential suppression of physical qubit phase and bit-flip errors.",
      content: "Research teams published peer-reviewed validation demonstrating stable logical qubit preservation across thousands of cycle executions. The achievement represents a pivotal leap toward fault-tolerant commercial quantum supremacy.",
      sourceName: "QuantumToday",
      author: "Dr. Aris Thorne",
      authorHandle: "@athorne_phys",
      readTimeMinutes: 6,
      tags: ["Quantum", "Physics", "FutureTech"],
    },
  ],
  sports: [
    {
      title: "Underdog Club Clinches Championship in Dramatic 94th-Minute Stoppage Time Winner",
      description: "An extraordinary counter-attack in the dying seconds sealed a historic title victory against all pre-season odds.",
      content: "The stadium erupted as the 19-year-old academy graduate volleyed home from the edge of the box. Overcoming a two-goal deficit with ten men, the triumph will go down as one of the most thrilling tactical turnarounds in modern sporting history.",
      sourceName: "Global Sports Net",
      author: "Mateo Silva",
      authorHandle: "@mateosilva_sport",
      readTimeMinutes: 3,
      tags: ["Football", "Championship", "Highlights"],
    },
    {
      title: "World Athletic Championships: Historic Sub-9.60 Second Sprint Record Set",
      description: "Flawless reaction time and aerodynamic stride technique redefine human athletic speed boundaries.",
      content: "Before a sold-out international crowd, the sprinter clocked an astonishing finish, shattering a decade-old benchmark. Biomechanical analysts highlighted explosive transition mechanics from drive phase to upright acceleration.",
      sourceName: "Athletics Weekly",
      author: "Chloe Dubois",
      authorHandle: "@cdubois_track",
      readTimeMinutes: 4,
      tags: ["TrackAndField", "RecordBreaker", "Olympics"],
    },
    {
      title: "Basketball Analytics Revolution: Shot-Tracking Spatial AI Transforms Playoff Tactics",
      description: "Coaching staffs adopt real-time computer vision modeling to optimize spacing and pick-and-roll defensive coverage.",
      content: "Micro-second tracking cameras calculate expected shooting percentage per possession dynamically. Teams utilizing the system have generated a measurable 6.4 point efficiency gain per 100 possessions during late-game clutch moments.",
      sourceName: "HoopStat Review",
      author: "Darius King",
      authorHandle: "@dking_stats",
      readTimeMinutes: 5,
      tags: ["Basketball", "Analytics", "Strategy"],
    },
    {
      title: "Grand Slam Thriller: Epic Five-Set Comeback Secures Career Golden Milestone",
      description: "Over 4 hours and 45 minutes of elite baseline rallies culminate in a crowning tennis masterclass.",
      content: "Saving three match points in the fourth set tiebreak, the veteran champion dug deep to prevail under the center court lights. Both players received a standing ovation from legends in the royal box.",
      sourceName: "CourtSide Daily",
      author: "Sophia Vance",
      authorHandle: "@svance_tennis",
      readTimeMinutes: 4,
      tags: ["Tennis", "GrandSlam", "MatchReport"],
    },
  ],
  finance: [
    {
      title: "Global Central Banks Coordinate Policy Framework as Inflation Stabilizes Across G7",
      description: "Yield curves normalize as economic growth indicators maintain resilient employment figures.",
      content: "Policymakers outlined a cautious roadmap for liquidity balancing, acknowledging that supply-chain recovery and productivity investments have successfully counterbalanced price pressures without triggering broad contractions.",
      sourceName: "Financial Herald",
      author: "Arthur Pendelton",
      authorHandle: "@apendelton_fin",
      readTimeMinutes: 5,
      tags: ["Macroeconomics", "Markets", "CentralBanking"],
    },
    {
      title: "Index and Thematic ETF Inflows Surge to Record High of $120B in Single Quarter",
      description: "Retail and institutional allocators expand exposure to renewable infrastructure and semiconductor funds.",
      content: "Automated dollar-cost averaging and low expense ratios continue to fuel massive capital allocation into broad-market index products. Analysts note a steady shift away from actively managed mutual funds toward thematic baskets.",
      sourceName: "Wall Street Digest",
      author: "Nathalie Voss",
      authorHandle: "@nvoss_capital",
      readTimeMinutes: 4,
      tags: ["Investing", "ETFs", "WealthManagement"],
    },
    {
      title: "Decentralized Settlement Network Passes Real-Time Interbank Cross-Border Trial",
      description: "Settles 50,000 multi-currency transactions in under 2 seconds with cryptographic atomicity and zero slippage.",
      content: "Major commercial banking consortiums confirmed the successful completion of Phase 3 testing. The cryptographic rails eliminated multi-day correspondent banking hops while satisfying rigorous anti-money laundering compliance criteria.",
      sourceName: "FinTech Observer",
      author: "Kareem El-Sayed",
      authorHandle: "@kelsayed_fintech",
      readTimeMinutes: 4,
      tags: ["FinTech", "Payments", "Banking"],
    },
    {
      title: "Green Bond Issuance Outpaces Fossil Sector Financing for Second Consecutive Year",
      description: "Capital markets prioritize solar grid modernization, sustainable agriculture, and offshore wind developments.",
      content: "Investors demanded higher yields for carbon-intensive ventures while underwriting green coupon instruments at historic spreads. Over $600 billion in certified climate bonds entered sovereign debt registries this fiscal cycle.",
      sourceName: "Sustainable Economy",
      author: "Greta Lindqvist",
      authorHandle: "@glind_eco",
      readTimeMinutes: 5,
      tags: ["ESG", "CleanEnergy", "Bonds"],
    },
  ],
  entertainment: [
    {
      title: "Visionary Sci-Fi Feature Shatters Global Box Office and Streaming Records",
      description: "Praised for groundbreaking practical cinematography, seamless visual effects, and an unforgettable orchestral score.",
      content: "Critics are calling the three-hour space odyssey a generational cinematic masterpiece. Directed with uncompromising grandeur, the film surpassed $350 million in global opening weekend admissions across IMAX and premium large formats.",
      sourceName: "Cinema Insider",
      author: "Julian Romero",
      authorHandle: "@jromero_film",
      readTimeMinutes: 3,
      tags: ["Movies", "BoxOffice", "Cinematography"],
    },
    {
      title: "Immersive Spatial Audio and Live Symphony Performances Headline Modern Music Fest",
      description: "Festival organizers combine binaural acoustic domes with live orchestral synthesizers for 60,000 attendees.",
      content: "The audio-visual spectacle pushed acoustic boundaries with 128 discrete speaker channels mapped to atmospheric holographic projections. Headlining electronic composers collaborated with world-renowned brass sections.",
      sourceName: "Soundscape Pulse",
      author: "Maya Lin",
      authorHandle: "@mayalin_music",
      readTimeMinutes: 4,
      tags: ["Music", "LiveEvents", "Audio"],
    },
    {
      title: "Critically Acclaimed Mystery Thriller Series Concludes with Masterful Finale",
      description: "Showrunners weave complex narrative threads into a poignant and startling resolution.",
      content: "The season finale pulled in over 14 million simultaneous viewers on premiere night. The writing duo confirmed no spin-offs are planned, leaving the story as a self-contained, immaculate four-season narrative arc.",
      sourceName: "ScreenCraft",
      author: "Oscar Vance",
      authorHandle: "@ovance_screen",
      readTimeMinutes: 3,
      tags: ["Television", "Streaming", "Drama"],
    },
    {
      title: "Independent Studio Video Game Wins Game of the Year in Unanimous Jury Vote",
      description: "Hand-painted art style, responsive physics-driven mechanics, and emotional soundtrack captivate global players.",
      content: "Developed over five years by an eight-person core team, the atmospheric exploration title triumphed over multi-hundred-million-dollar AAA competitors, proving that creative vision and meticulous polish still rule the medium.",
      sourceName: "PixelCraft Review",
      author: "Kenji Sato",
      authorHandle: "@kenjisato_games",
      readTimeMinutes: 4,
      tags: ["Gaming", "IndieGames", "GameAwards"],
    },
  ],
  science: [
    {
      title: "James Webb Space Telescope Directly Images Potentially Habitable Exoplanet Atmosphere",
      description: "Spectroscopic transmission reveals water vapor, methane, and atmospheric ozone signatures 48 light-years away.",
      content: "Astrobiologists are analyzing data from the NIRSpec instrument which captured filtered starlight through the exoplanet's troposphere. The observations indicate a stable moderate planetary temperature and cloud formations.",
      sourceName: "Cosmos & Astrophysical Letters",
      author: "Dr. Astrid Nygard",
      authorHandle: "@astrid_cosmos",
      readTimeMinutes: 5,
      tags: ["Astronomy", "JWST", "Exoplanets", "Space"],
    },
    {
      title: "Deep-Sea Expedition Uncovers Ancient Bioluminescent Coral Forest in Unmapped Trench",
      description: "Remote submersible dives catalog over 40 species previously unknown to marine taxonomy.",
      content: "Operating at depths exceeding 3,000 meters in total darkness, autonomous exploration drones captured dazzling rhythmic bioluminescent displays used by benthic invertebrates for intra-species communication and predation camouflage.",
      sourceName: "Oceanic Discoveries",
      author: "Leila Al-Mansoor",
      authorHandle: "@leila_ocean",
      readTimeMinutes: 4,
      tags: ["MarineBiology", "DeepSea", "Biodiversity"],
    },
    {
      title: "CRISPR-Guided Epigenetic Reprogramming Reverses Cellular Aging Markers in Mammalian Trials",
      description: "Targeted DNA methylation resets cell vitality without inducing genomic mutations or oncogenic transformations.",
      content: "Researchers demonstrated restored tissue elasticity, improved mitochondrial respiration, and extended healthy lifespan in preclinical cohorts. The non-destructive epigenome tune-up represents a landmark horizon for regenerative medicine.",
      sourceName: "BioGenesis Quarterly",
      author: "Dr. Viktor Franke",
      authorHandle: "@vfranke_bio",
      readTimeMinutes: 6,
      tags: ["Genetics", "Longevity", "Biotech"],
    },
    {
      title: "Solid-State Battery Chemistry Reaches 1,000 Wh/L Volumetric Energy Density",
      description: "Non-flammable ceramic electrolyte enables 10-minute ultrafast charging with 3,000 cycle lifespan.",
      content: "Materials scientists engineered an ultra-thin composite lithium anode that prevents dendrite formation at high current densities. Commercial automotive prototypes are slated for pilot production next year.",
      sourceName: "Materials Science Advance",
      author: "Chen Wei",
      authorHandle: "@chenwei_chem",
      readTimeMinutes: 4,
      tags: ["Energy", "BatteryTech", "MaterialsScience"],
    },
  ],
  health: [
    {
      title: "Revolutionary mRNA Therapeutic Vaccine Shows 85% Efficacy in Pancreatic Oncology Trial",
      description: "Personalized neoantigen priming trains cytotoxic T-cells to identify and neutralize micrometastatic tumor cells.",
      content: "Clinical oncologists reported prolonged disease-free survival in patients receiving customized mRNA cocktails synthesized within weeks of initial biopsy. The adaptive immune response remained active across a three-year follow-up observation window.",
      sourceName: "The Medical Journal",
      author: "Dr. Sarah Jenkins",
      authorHandle: "@dr_sjenkins",
      readTimeMinutes: 5,
      tags: ["Oncology", "mRNA", "Immunotherapy", "Health"],
    },
    {
      title: "Cognitive Neuroscience: Circadian-Aligned REM Cycles Enhance Complex Problem Solving",
      description: "Synchronizing deep sleep spindles with pre-frontal cortex rest boosts memory retention by over 40%.",
      content: "A double-blind study utilizing high-density EEG caps tracked neural replay during synchronized slow-wave sleep. Subjects exhibited immediate creative insights into mathematical and spatial challenges after waking.",
      sourceName: "NeuroScience Trends",
      author: "Dr. Hiroshi Tanaka",
      authorHandle: "@htanaka_neuro",
      readTimeMinutes: 4,
      tags: ["Neuroscience", "Sleep", "Wellness"],
    },
  ],
  gaming: [
    {
      title: "Next-Gen Unreal Engine 5.5 Showcases Path-Traced 60FPS Virtual Worlds on Console",
      description: "Neural radiance caching and procedural geometry streaming render photorealistic real-time open landscapes.",
      content: "Game developers demoed fully dynamic destruction physics and atmospheric volumetric lighting with zero baking required. The breakthrough allows hyper-detailed game worlds to scale gracefully across diverse player hardware specifications.",
      sourceName: "GamerFocus",
      author: "Zack Kowalski",
      authorHandle: "@zack_kowalski",
      readTimeMinutes: 4,
      tags: ["Gaming", "UnrealEngine", "Graphics"],
    },
    {
      title: "Global Esports Championship Final Draws 100 Million Concurrent Viewers Worldwide",
      description: "Tactical team showdown reaches climactic fifth-map overtime in front of a packed 40,000-seat arena.",
      content: "With millions of dollars in prize pools on the line, the reigning champions pulled off a miraculous 2v5 retake in the deciding round, cementing their legacy as the greatest dynasty in digital sports history.",
      sourceName: "Esports Arena",
      author: "Lucas Gomez",
      authorHandle: "@lgomez_esports",
      readTimeMinutes: 3,
      tags: ["Esports", "Gaming", "Competitive"],
    },
  ],
  business: [
    {
      title: "AI-Driven Automation Boosts Small Enterprise Productivity by 35% in Annual Benchmark",
      description: "Independent studios and direct-to-consumer businesses leverage automated workflows to scale operations.",
      content: "A comprehensive survey across 10,000 medium and small businesses found that automated customer routing, inventory forecasting, and content generation reduced overhead while increasing customer satisfaction metrics.",
      sourceName: "Enterprise Vanguard",
      author: "Rachel Sterling",
      authorHandle: "@rsterling_biz",
      readTimeMinutes: 4,
      tags: ["Business", "Productivity", "Startups"],
    },
    {
      title: "Circular Supply Chain Models Adopted by Top 50 Global Retail Manufacturers",
      description: "Closed-loop material recycling and zero-waste logistics reduce carbon footprint and raw material procurement costs.",
      content: "Supply chain executives reported that closed-loop packaging and modular product architectures mitigated component shortages while satisfying consumer demand for environmentally verifiable manufacturing pipelines.",
      sourceName: "Supply Chain World",
      author: "David O'Connor",
      authorHandle: "@doconnor_scm",
      readTimeMinutes: 4,
      tags: ["Sustainability", "SupplyChain", "Retail"],
    },
  ],
};

const RECOMMENDATION_TEMPLATES: Record<ContentCategory, RichStoryTemplate[]> = {
  technology: [
    {
      title: "The Architecture of Intelligence: The Modern Transformer Documentary",
      description: "A deep dive into the algorithmic revolution, featuring candid interviews with pioneering research scientists.",
      content: "This critically acclaimed 4-part series unpacks attention mechanisms, self-supervised learning, and the socio-economic impacts of next-generation artificial cognition. Recommended for engineers and inquisitive thinkers.",
      sourceName: "StreamHub / TMDB",
      author: "DocuVision Labs",
      readTimeMinutes: 52,
      tags: ["Docuseries", "AI", "MustWatch"],
      rating: 9.2,
      mediaType: "movie",
    },
    {
      title: "Syntax & Synth: Lo-Fi Coding Beats & Focus Soundscapes",
      description: "Curated ambient soundscapes engineered with binaural theta frequencies for deep cognitive coding focus.",
      content: "Over 8 hours of generative ambient music, acoustic piano echoes, and subtle vinyl warmth designed to eliminate background distraction during deep development sprints.",
      sourceName: "Spotify Audio",
      author: "Algorithm Records",
      readTimeMinutes: 120,
      tags: ["Music", "Focus", "CodingPlaylist"],
      rating: 8.9,
      mediaType: "music",
    },
  ],
  entertainment: [
    {
      title: "Chronicles of the Astral Gate (Season 2 Preview)",
      description: "Interstellar political intrigue meets high-stakes time dilation in this award-winning sci-fi epic.",
      content: "With breathtaking practical sets and an ensemble cast delivering gripping performances, Season 2 raises the stakes across three warring planetary alliances.",
      sourceName: "TMDB Picks",
      author: "Starlight Studios",
      readTimeMinutes: 58,
      tags: ["SciFi", "Series", "TopRated"],
      rating: 9.4,
      mediaType: "movie",
    },
    {
      title: "Soundtrack Sessions: Orchestral Scores for Solitude & Wonder",
      description: "Grammy-winning composer shares intimate live acoustic arrangements of cinematic orchestral themes.",
      content: "Featuring cellos, analog modular synthesizers, and grand piano recordings from Abbey Road Studios. A transformative auditory journey.",
      sourceName: "Spotify Master Audio",
      author: "Maestro Ensemble",
      readTimeMinutes: 48,
      tags: ["Soundtrack", "Orchestral", "Audio"],
      rating: 9.1,
      mediaType: "music",
    },
  ],
  sports: [
    {
      title: "The Final Mile: Elite Marathoners at the Edge of Human Endurance",
      description: "Follows four world-class distance runners through grueling high-altitude training camps in Kenya and the Alps.",
      content: "A visceral and inspiring documentary capturing the psychological resilience, meticulous nutrition science, and heartbreak behind breaking world records.",
      sourceName: "TMDB Sports",
      author: "Endurance Films",
      readTimeMinutes: 94,
      tags: ["Running", "Documentary", "Inspiration"],
      rating: 8.8,
      mediaType: "movie",
    },
  ],
  finance: [
    {
      title: "Market Minds: Uncovering Macroeconomic Cycles and Asymmetric Opportunities",
      description: "Top hedge fund strategists and economic historians dissect market psychology and risk management.",
      content: "Weekly deep dives into sovereign debt dynamics, commodity supercycles, and quantitative options strategies. Essential listening for serious investors.",
      sourceName: "Spotify Podcasts",
      author: "Alpha Wave Media",
      readTimeMinutes: 45,
      tags: ["Podcast", "Finance", "Investing"],
      rating: 8.7,
      mediaType: "podcast",
    },
  ],
  science: [
    {
      title: "Cosmic Horizons: Mapping the Edge of the Observable Universe",
      description: "Visual tour of superclusters, gravitational lensing, and the cosmic microwave background in 8K resolution.",
      content: "Narrated by renowned cosmologists, this visually stunning journey illustrates the formation of galaxies and the ongoing mysteries of dark energy.",
      sourceName: "TMDB Science",
      author: "Nova Observatory",
      readTimeMinutes: 75,
      tags: ["Cosmology", "Space", "4K"],
      rating: 9.5,
      mediaType: "movie",
    },
  ],
  health: [
    {
      title: "The Longevity Blueprint: Science-Backed Protocols for Vitality",
      description: "Practical insights on zone 2 cardio, intermittent fasting, and circadian sleep optimization.",
      content: "Leading medical researchers provide actionable, evidence-based recommendations to maximize cellular health and cognitive longevity.",
      sourceName: "Spotify Podcasts",
      author: "Dr. Andrew Mercer",
      readTimeMinutes: 60,
      tags: ["Health", "Longevity", "Wellness"],
      rating: 9.0,
      mediaType: "podcast",
    },
  ],
  gaming: [
    {
      title: "Elden Symphony: Orchestrated Themes of the Lands Between",
      description: "Live concert recording of the legendary dark fantasy gaming soundtrack performed by the Tokyo Philharmonic.",
      content: "Over 2 hours of majestic brass, haunting choral arrangements, and epic boss battle themes remastered in lossless spatial audio.",
      sourceName: "Spotify Gaming",
      author: "FromSound Orchestra",
      readTimeMinutes: 110,
      tags: ["GamingOST", "Orchestra", "Soundtrack"],
      rating: 9.6,
      mediaType: "music",
    },
  ],
  business: [
    {
      title: "Zero to Scale: Building Resilient Companies in the Modern Era",
      description: "Founders share unvarnished stories of early failures, critical pivots, and product-market fit breakthroughs.",
      content: "In-depth case studies on scaling engineering culture, managing runway, and maintaining founder clarity amidst rapid growth.",
      sourceName: "Spotify Podcasts",
      author: "Venture Daily",
      readTimeMinutes: 40,
      tags: ["Business", "Startups", "Leadership"],
      rating: 8.9,
      mediaType: "podcast",
    },
  ],
};

const SOCIAL_TEMPLATES: Record<ContentCategory, RichStoryTemplate[]> = {
  technology: [
    {
      title: "Just open-sourced our blazing fast Rust-based bundler! ⚡ 10x faster HMR than standard toolchains. Check out the GitHub repo 👇",
      description: "Zero config, instant module replacement, built-in TypeScript transpilation, and native WASM support out of the box.",
      content: "We spent 6 months rewriting the AST parser in Rust with multi-threaded chunk splitting. Cold starts dropped from 4.2s to 180ms! Feedback and PRs welcome: github.com/fastbuild/turbostack",
      sourceName: "X / Twitter",
      author: "Alex Rivera",
      authorHandle: "@alex_codes",
      readTimeMinutes: 1,
      tags: ["RustLang", "WebDev", "OpenSource", "JavaScript"],
    },
    {
      title: "Hot take: The best CSS is the CSS you didn't have to fight. Utility-first token design + CSS custom variables is the peak frontend DX.",
      description: "Discussing component encapsulation, layout predictability, and design system scaling in production.",
      content: "When design tokens map 1:1 with styling primitives, teams move 3x faster with zero regression bugs. What's your current styling stack in 2026?",
      sourceName: "Bluesky",
      author: "Sarah Kim",
      authorHandle: "@sarah.ui.dev",
      readTimeMinutes: 1,
      tags: ["CSS", "DesignSystems", "WebDev"],
    },
  ],
  sports: [
    {
      title: "What a save in the 90th minute! Absolute heroics to keep the clean sheet alive 🧤⚽ Highlights do not do this justice.",
      description: "Incredible fingertip deflection on a point-blank header keeps championship hopes alive.",
      content: "Unbelievable reflexes! That fingertip save just secured 3 crucial points in the title race. Pure world-class goalkeeping under maximum pressure!",
      sourceName: "X / Twitter",
      author: "Liam Campbell",
      authorHandle: "@liam_football",
      readTimeMinutes: 1,
      tags: ["MatchDay", "CleanSheet", "Football"],
    },
  ],
  finance: [
    {
      title: "Visualizing the 50-year trend in global market cap concentration. The diversification lesson holds true across every decade 📊",
      description: "Infographic breakdown of sector rotations, interest rate cycles, and the power of compound dividend reinvestment.",
      content: "Markets go through cycles, but broad index discipline consistently rewards patient long-term allocators. Stay disciplined and ignore the daily noise.",
      sourceName: "LinkedIn Pulse",
      author: "Jonathan Pierce, CFA",
      authorHandle: "@jpierce_cfa",
      readTimeMinutes: 2,
      tags: ["Investing", "Markets", "Wealth"],
    },
  ],
  entertainment: [
    {
      title: "Behind the scenes on set for episode 8! The lighting team created this entire cyberpunk storm using real atmospheric rain rigs 🎬🌧️",
      description: "Director shares exclusive high-res cinematography photographs and rigging schematics.",
      content: "Practical effects bring an authentic grit that CGI simply cannot replicate. Huge shoutout to our dedicated crew working through the midnight shoots!",
      sourceName: "Instagram",
      author: "Chloe Dubois",
      authorHandle: "@chloe_cinematography",
      readTimeMinutes: 1,
      tags: ["FilmSet", "Cinematography", "PracticalEffects"],
    },
  ],
  science: [
    {
      title: "First high-resolution spectral image of our target exoplanet just came through the downlink! Look at those clear water vapor absorption lines 🔭🪐",
      description: "Astrophysics team celebrates live telemetry confirmation of atmospheric vapor.",
      content: "Years of telescope calibration culminating in this single crystal-clear spectrogram. Science is truly humbling and magnificent.",
      sourceName: "X / Twitter",
      author: "Dr. Neil Thorne",
      authorHandle: "@dr_thorne_space",
      readTimeMinutes: 1,
      tags: ["Astronomy", "JWST", "SpaceExploration"],
    },
  ],
  health: [
    {
      title: "Reminder: 15 minutes of direct morning sunlight + a 20-minute brisk walk resets your cortisol curve and boosts sleep efficiency tonight ☀️",
      description: "Simple, science-backed lifestyle habits that deliver outsized cognitive and physical dividends.",
      content: "Photoreceptors in the retina signal the suprachiasmatic nucleus to anchor your internal 24-hour master clock. Try it for 7 days and feel the difference!",
      sourceName: "Bluesky",
      author: "Dr. Maya Patel",
      authorHandle: "@mayapatel.health",
      readTimeMinutes: 1,
      tags: ["Wellness", "SleepScience", "HealthyHabits"],
    },
  ],
  gaming: [
    {
      title: "Finally completed the hitless boss rush on ultra-hard mode! 🏆 48 hours of practice paid off. Clip of the final parry 👇🎮",
      description: "Frame-perfect parry reaction timing seals victory in challenging soulslike encounter.",
      content: "My hands were shaking on the final phase! Huge thanks to everyone in the stream chat for keeping the energy high throughout the run.",
      sourceName: "X / Twitter",
      author: "Kai Vance",
      authorHandle: "@kaigaming_live",
      readTimeMinutes: 1,
      tags: ["Gaming", "HitlessRun", "StreamHighlights"],
    },
  ],
  business: [
    {
      title: "3 mental models that transformed how our startup prioritizes engineering roadmaps: 1. Impact vs Effort 2. Regret Minimization 3. Reversible vs Irreversible decisions 💡",
      description: "Actionable frameworks for engineering managers and startup founders.",
      content: "Velocity without direction is just expensive noise. Clear decision heuristics help teams execute with autonomy and high conviction.",
      sourceName: "LinkedIn",
      author: "Tara Jenkins",
      authorHandle: "@tarajenkins_exec",
      readTimeMinutes: 2,
      tags: ["Leadership", "Productivity", "Startups"],
    },
  ],
};

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

const SEED_IMAGES: Record<ContentCategory, string[]> = {
  technology: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
  ],
  sports: [
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  ],
  finance: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  ],
  entertainment: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  ],
  science: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  ],
  health: [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  ],
  gaming: [
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  ],
  business: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  ],
};

const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
];

export function generateMockItem(
  index: number,
  activeCategories: ContentCategory[] = CATEGORIES,
  activeSources: ContentSource[] = SOURCES
): ContentItem {
  const category = pick(activeCategories.length ? activeCategories : CATEGORIES, index);
  const source = pick(activeSources.length ? activeSources : SOURCES, index + 1);

  let template: RichStoryTemplate;
  if (source === "recommendation") {
    const list = RECOMMENDATION_TEMPLATES[category] || RECOMMENDATION_TEMPLATES.technology;
    template = pick(list, index);
  } else if (source === "social") {
    const list = SOCIAL_TEMPLATES[category] || SOCIAL_TEMPLATES.technology;
    template = pick(list, index);
  } else {
    const list = NEWS_TEMPLATES[category] || NEWS_TEMPLATES.technology;
    template = pick(list, index);
  }

  const id = `${source}-${category}-${index}`;
  const images = SEED_IMAGES[category] || SEED_IMAGES.technology;
  const image = pick(images, index);
  const avatar = pick(AVATAR_IMAGES, index);

  const ctaLabel =
    source === "recommendation"
      ? template.mediaType === "movie"
        ? "Watch Preview"
        : "Play Preview"
      : source === "social"
      ? "View Post"
      : "Read Story";

  const trendingScore = Math.min(100, Math.max(10, Math.floor(98 - ((index * 7) % 85))));

  return {
    id,
    source,
    category,
    title: template.title,
    description: template.description,
    content: template.content,
    image,
    ctaLabel,
    url: "#",
    author: template.author,
    authorAvatar: avatar,
    authorHandle: template.authorHandle || `@${template.author.toLowerCase().replace(/[^a-z]/g, "")}`,
    sourceName: template.sourceName,
    publishedAt: new Date(Date.now() - index * 1000 * 60 * 42).toISOString(),
    readTimeMinutes: template.readTimeMinutes,
    trendingScore,
    rating: template.rating,
    mediaType: template.mediaType,
    socialMetrics: {
      likes: 120 + ((index * 83) % 4500),
      reposts: 24 + ((index * 31) % 890),
      replies: 12 + ((index * 17) % 340),
      shares: 18 + ((index * 29) % 520),
    },
    tags: template.tags,
  };
}

export function generateMockItems(
  page: number,
  pageSize: number,
  categories: ContentCategory[] = CATEGORIES,
  sources: ContentSource[] = SOURCES
): ContentItem[] {
  const items: ContentItem[] = [];
  for (let i = 0; i < pageSize; i++) {
    const globalIndex = page * pageSize + i;
    items.push(generateMockItem(globalIndex, categories, sources));
  }
  return items;
}

export function searchMockItems(
  query: string,
  categories: ContentCategory[] = CATEGORIES,
  sources: ContentSource[] = SOURCES
): ContentItem[] {
  const pool = generateMockItems(0, 60, categories, sources);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return pool.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
  );
}
