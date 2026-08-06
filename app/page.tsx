"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Database,
    Brain,
    Cpu,
    Terminal,
    Globe,
    Instagram,
    ChevronRight,
    Shield,
    Trophy,
    LucideIcon
} from 'lucide-react';
import { ScrollBasedVelocity } from '@/components/ui/scroll-based-velocity';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';


// --- Types ---

interface NavProps {
    // No longer using isDark toggle as per CLI theme spec
}

interface SectionHeadingProps {
    children: React.ReactNode;
    subtitle?: string;
    seq?: string;
}

interface Project {
    title: string;
    description: string;
    icon: React.ReactNode;
    demoLink: string;
    githubLink: string;
}

interface ProjectCardProps {
    project: Project;
}

interface SkillBadgeProps {
    name: string;
    icon: LucideIcon;
}

// --- Helper Components ---

const TechnicalBorder = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative border border-dark-border ${className}`}>
        {/* Bracket Corners */}
        <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-safety-orange" />
        <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-safety-orange" />
        <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-safety-orange" />
        <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-safety-orange" />
        {children}
    </div>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-pure-black/90 backdrop-blur-md border-b border-dark-border py-4' : 'bg-transparent py-6'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            src="https://github.com/HyperPenetrator.png"
                            alt="Logo"
                            className="w-10 h-10 border border-dark-border grayscale hover:grayscale-0 transition-all cursor-pointer"
                        />
                        <span className="font-heading text-xs tracking-[0.2em] hidden sm:block">STATUS: ONLINE</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-10 text-[10px] font-mono tracking-cli-heading uppercase">
                        {['About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-muted-gray hover:text-safety-orange transition-colors relative group"
                            >
                                <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-safety-orange">//</span>
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 border border-dark-border"
                    >
                        <div className={`h-[1px] w-6 bg-safety-orange transition-all ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <div className={`h-[1px] w-6 bg-safety-orange transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                        <div className={`h-[1px] w-6 bg-safety-orange transition-all ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={false}
                animate={{ x: isOpen ? 0 : '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[40] bg-pure-black flex flex-col items-center justify-center gap-8 md:hidden p-8"
            >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] pointer-events-none opacity-20" />
                {['About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item, idx) => (
                    <motion.a
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                        transition={{ delay: idx * 0.1 }}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-heading tracking-widest text-white hover:text-safety-orange transition-colors"
                    >
                        <span className="text-safety-orange mr-4">0{idx + 1}</span>
                        {item}
                    </motion.a>
                ))}
            </motion.div>
        </>
    );
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, subtitle, seq }) => (
    <div className="mb-20">
        <div className="flex items-center gap-4 mb-2">
            {seq && <span className="text-safety-orange font-mono text-xs tracking-widest">{seq}</span>}
            <div className="h-[1px] flex-grow bg-dark-border" />
        </div>
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading tracking-cli-heading uppercase mb-4"
        >
            // {children}
        </motion.h2>
        {subtitle && (
            <p className="font-mono text-xs text-muted-gray tracking-cli-body uppercase max-w-xl border-l border-safety-orange pl-4 leading-loose">
                {subtitle}
            </p>
        )}
    </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <TechnicalBorder className="group h-full">
        <div className="p-8 h-full flex flex-col">
            <div className="mb-6 flex justify-between items-start">
                <div className="p-3 border border-dark-border text-safety-orange group-hover:bg-safety-orange group-hover:text-pure-black transition-all">
                    {project.icon}
                </div>
                <span className="font-mono text-[10px] text-dark-border group-hover:text-safety-orange transition-colors">UPLINK_STABLE</span>
            </div>

            <h3 className="text-xl font-heading tracking-widest uppercase mb-4 group-hover:text-safety-orange transition-colors">
                {project.title}
            </h3>

            <p className="text-muted-gray text-xs font-mono leading-relaxed mb-8 flex-grow tracking-cli-body">
                {project.description}
            </p>

            <div className="flex gap-6 pt-6 border-t border-dark-border">
                <a
                    href={project.demoLink}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white hover:text-safety-orange transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    [ EXECUTE DEMO ]
                </a>
                <a
                    href={project.githubLink}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-gray hover:text-safety-orange transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    [ SOURCE_CODE ]
                </a>
            </div>
        </div>
    </TechnicalBorder>
);
const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon: Icon }) => (
    <div className="group flex items-center justify-between p-4 border border-dark-border hover:border-safety-orange transition-all relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
            <Icon className="w-5 h-5 text-safety-orange group-hover:text-pure-black transition-colors" />
            <span className="font-mono text-xs tracking-widest uppercase group-hover:text-pure-black transition-colors">
                {name}
            </span>
        </div>
        <div className="absolute inset-0 bg-safety-orange translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
        <span className="text-[8px] font-mono text-dark-border group-hover:text-pure-black relative z-10">VERIFIED</span>
    </div>
);

const BackgroundGallery = () => {
    const { scrollY } = useScroll();
    // Parallax speeds for different layers
    const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -600]);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Background Image 1: Top Right Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[10%] -right-[5%] w-[300px] h-[400px] sm:w-[500px] sm:h-[700px] opacity-[0.15] grayscale contrast-125 blur-[1px] transition-all"
            >
                <img
                    src="/bg_ukulele.jpeg"
                    alt="Background Tech Decal"
                    className="w-full h-full object-cover rounded-sm border border-dark-border"
                />
            </motion.div>

            {/* Background Image 2: Bottom Left Parallax */}
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[50%] -left-[10%] w-[250px] h-[350px] sm:w-[400px] sm:h-[600px] opacity-[0.12] grayscale contrast-125 blur-[1px] rotate-12"
            >
                <img
                    src="/bg_selfie.jpeg"
                    alt="Background Tech Decal"
                    className="w-full h-full object-cover rounded-sm border border-dark-border"
                />
            </motion.div>

            {/* Scanline Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] pointer-events-none opacity-20" />
        </div>
    );
};

// --- Main Page ---

export default function Portfolio() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const [repoCount, setRepoCount] = useState<number>(36);

    useEffect(() => {
        fetch("https://api.github.com/users/HyperPenetrator")
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.public_repos === "number") {
                    setRepoCount(data.public_repos);
                }
            })
            .catch(() => {});
    }, []);

    const skills = [
        { name: "Python", icon: Code2 },
        { name: "C", icon: Terminal },
        { name: "Dart", icon: Code2 },
        { name: "YOLOv8", icon: Brain },
        { name: "Generative AI", icon: Brain },
        { name: "RAG & LangChain", icon: Brain },
        { name: "Reinforcement Learning", icon: Brain },
        { name: "Google Gemini", icon: Brain },
        { name: "Firebase", icon: Database },
        { name: "Antigravity 2.0", icon: Cpu },
        { name: "n8n Automation", icon: Terminal },
        { name: "GitHub & Git", icon: Github },
        { name: "Cloud Run", icon: Globe },
        { name: "PID Control", icon: Cpu },
        { name: "Embedded Systems", icon: Cpu },
        { name: "Circuit Simulation", icon: Cpu },
        { name: "Docker", icon: Shield },
        { name: "CI/CD", icon: Shield },
        { name: "Google Cloud", icon: Globe }
    ];

    const projects: Project[] = [
        {
            title: "CareerAI",
            description: "Built a personalized recommendation engine powered by the Google Gemini API to guide career-related decisions. Designed the application architecture around generative AI to deliver tailored, context-aware suggestions. (Personal Project)",
            icon: <Brain className="w-6 h-6" />,
            demoLink: "https://dckwuhsairu3m.cloudfront.net/",
            githubLink: "https://github.com/HyperPenetrator"
        },
        {
            title: "EAS-product",
            description: "Developed an Excel Analytics Suite unifying an Excel upload dashboard and an Antigravity 2.0 data pipeline into a single platform. (Personal Project)",
            icon: <Database className="w-6 h-6" />,
            demoLink: "https://github.com/HyperPenetrator",
            githubLink: "https://github.com/HyperPenetrator"
        },
        {
            title: "LUIT",
            description: "Developed a platform for reporting and cleaning garbage in the Brahmaputra River. Performed QA testing of YOLOv8 models for real-time garbage detection. Architected project structure and roadmap to facilitate scalable environmental monitoring. (GUenARK SIH 1.0)",
            icon: <Globe className="w-6 h-6" />,
            demoLink: "https://luit.vercel.app",
            githubLink: "https://github.com/HyperPenetrator/LUIT-CleanWater"
        },
        {
            title: "My Safety",
            description: "Built a voice-activated emergency support web application featuring GPS tracking and scream detection. Awarded 2nd Runner-up at the GDG on-campus TechSprint 2025 event. (GDGoC GU: TechSprint)",
            icon: <Shield className="w-6 h-6" />,
            demoLink: "https://my-safety-codecraft-v2.netlify.app/",
            githubLink: "https://github.com/HyperPenetrator/My_Safety"
        },
        {
            title: "OmniGuard",
            description: "Designed a robust emergency response prototype leveraging Google Gemini 1.5 Flash and Firebase backend. (Build With AI: Solution Challenge 2026)",
            icon: <Shield className="w-6 h-6" />,
            demoLink: "https://omniguard-web.vercel.app/",
            githubLink: "https://github.com/HyperPenetrator"
        },
        {
            title: "eYRC CropDrop Bot",
            description: "Collaborated as part of Team ID CB_2202. Implemented PID control loop logic for precision autonomous movement in the CropDrop Bot project. (e-Yantra Robotics Competition 2025-26)",
            icon: <Cpu className="w-6 h-6" />,
            demoLink: "https://github.com/HyperPenetrator",
            githubLink: "https://github.com/HyperPenetrator"
        },
        {
            title: "Spot@NE",
            description: "Engineered a cultural heritage and tourism hub for Northeast India using the MERN stack. Optimized responsive UI/UX and data integration to enhance user engagement with regional heritage. (HackDays 4.0)",
            icon: <Globe className="w-6 h-6" />,
            demoLink: "https://github.com/HyperPenetrator",
            githubLink: "https://github.com/HyperPenetrator"
        }
    ];

    return (
        <div className="min-h-screen text-white selection:bg-safety-orange selection:text-pure-black overflow-x-hidden relative">
            <BackgroundGallery />
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-safety-orange z-[60] origin-left shadow-[0_0_15px_#FF5F15]"
                style={{ scaleX }}
            />

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
                <div className="absolute inset-0 bg-pure-black z-[-1]" />

                {/* --- Hero Section --- */}
                <section id="about" className="min-h-[80vh] flex flex-col justify-center border-b border-dark-border pb-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                                <span className="px-3 py-1 border border-safety-orange text-safety-orange text-[10px] font-mono tracking-widest uppercase">
                                    SEQ_01 // IDENTITY
                                </span>
                                <div className="h-[1px] w-20 bg-dark-border hidden xs:block" />
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-8xl font-heading tracking-cli-heading uppercase mb-4 leading-[0.9]">
                                HRISHIKESH <br />
                                <span className="text-safety-orange">DUTTA</span>
                            </h1>

                            <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-safety-orange mb-8 max-w-xl mx-auto lg:mx-0">
                                Robotics & Artificial Intelligence Engineering Student | Software Developer
                            </div>

                            {/* Mobile-only profile photo */}
                            <div className="lg:hidden flex justify-center mb-12">
                                <TechnicalBorder className="p-2 grayscale border-muted-gray">
                                    <img
                                        src="https://github.com/HyperPenetrator.png"
                                        alt="Visual Identity"
                                        className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-cover"
                                    />
                                </TechnicalBorder>
                            </div>

                            <div className="p-6 md:p-8 border-l-4 border-safety-orange bg-dark-border/10 mb-6">
                                <p className="text-xs sm:text-sm text-muted-gray font-mono tracking-cli-body leading-relaxed max-w-xl mx-auto lg:mx-0 text-left">
                                    I am a second-year undergraduate engineering student at Gauhati University Institute of Science and Technology (GUIST), specializing in Robotics and AI. I build impactful technology, focusing on everything from public safety web apps to environmental conservation platforms. I actively lead development teams like Team LuitLabs and Team CodeCraft.
                                </p>
                            </div>

                            <div className="p-6 border border-dark-border bg-pure-black/50 mb-12 font-mono text-left max-w-xl mx-auto lg:mx-0">
                                <div className="text-safety-orange text-[10px] uppercase tracking-widest mb-2">// EDUCATION_UPLINK</div>
                                <h3 className="text-sm font-heading tracking-wider uppercase text-white">Gauhati University Institute of Science and Technology</h3>
                                <p className="text-[11px] text-muted-gray mt-1">Bachelor of Technology in Robotics and Artificial Intelligence (2025 — 2029)</p>
                                <p className="text-[11px] text-safety-orange mt-1">&gt; 1st Semester: 7.55 SGPA</p>
                            </div>

                            <div className="flex justify-center lg:justify-start gap-6">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#projects"
                                    className="w-full sm:w-auto px-10 py-5 bg-safety-orange text-pure-black font-heading tracking-widest uppercase text-sm hover:bg-white transition-colors"
                                >
                                    ACCESS PROJECTS_
                                </motion.a>
                            </div>
                        </motion.div>

                        <div className="hidden lg:flex justify-center relative">
                            <TechnicalBorder className="p-4 grayscale border-muted-gray">
                                <img
                                    src="https://github.com/HyperPenetrator.png"
                                    alt="Visual Identity"
                                    className="w-[400px] h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-safety-orange/10 mix-blend-overlay" />
                            </TechnicalBorder>
                            {/* Decorative Grid Overlay */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]" />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 mt-20 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-gray"
                    >
                        <a href="https://github.com/HyperPenetrator" target="_blank" rel="noopener noreferrer" className="hover:text-safety-orange flex items-center gap-2 transition-colors">
                            <Github className="w-4 h-4" /> [GITHUB]
                        </a>
                        <a href="https://www.linkedin.com/in/hrishikesh-dutta-714849359/" target="_blank" rel="noopener noreferrer" className="hover:text-safety-orange flex items-center gap-2 transition-colors">
                            <Linkedin className="w-4 h-4" /> [LINKEDIN]
                        </a>
                        <a href="https://www.instagram.com/___helion?igsh=NjVwdXUybXduczQ=" target="_blank" rel="noopener noreferrer" className="hover:text-safety-orange flex items-center gap-2 transition-colors">
                            <Instagram className="w-4 h-4" /> [INSTAGRAM]
                        </a>
                        <a href="mailto:hrishikeshdutta8976@gmail.com" className="hover:text-safety-orange flex items-center gap-2 transition-colors">
                            <Mail className="w-4 h-4" /> [EMAIL]
                        </a>
                    </motion.div>
                </section>

                <div className="py-8 my-12 border-y border-dark-border overflow-hidden bg-pure-black">
                    <ScrollBasedVelocity
                        text="ROBOTICS ✦ AI ✦ DEVELOPMENT ✦ CONTROL ✦"
                        default_velocity={1.2}
                        className="text-4xl md:text-6xl font-heading uppercase text-safety-orange/80 tracking-tighter"
                    />
                </div>

                {/* --- Skills Section --- */}
                <section id="skills" className="py-32 border-b border-dark-border">
                    <SectionHeading
                        seq="SEQ_02"
                        subtitle="TECHNICAL_STACK: ANALYZING CORE COMPETENCIES AND ARCHITECTURAL CAPABILITIES."
                    >
                        CORE_EXPERTISE
                    </SectionHeading>

                    <div className="grid md:grid-cols-2 gap-8 mb-16 font-mono text-xs text-muted-gray leading-relaxed">
                        <TechnicalBorder className="p-6 bg-pure-black/50">
                            <div className="text-safety-orange text-[10px] uppercase tracking-widest mb-3">// AI / ML & COMPUTER VISION [PROFICIENCY: BEGINNER]</div>
                            <p className="mb-4">
                                Deep integration of YOLOv8 computer vision models for real-time edge intelligence, garbage detection, and classification. Large Language Model integration utilizing the Google Gemini API for personalized agents and generative workflows.
                            </p>
                            <div className="text-[10px] text-white tracking-wider">PRIMARY STACK: Python, PyTorch, YOLOv8, LangChain, Google Gemini API</div>
                        </TechnicalBorder>

                        <TechnicalBorder className="p-6 bg-pure-black/50">
                            <div className="text-safety-orange text-[10px] uppercase tracking-widest mb-3">// FULL-STACK DEVELOPMENT [PROFICIENCY: INTERMEDIATE]</div>
                            <p className="mb-4">
                                Production-grade web architecture utilizing the MERN stack (MongoDB, Express, React, Node) and Next.js. Focus on mobile-first design, edge voice activation triggers, responsive UX, and Firebase backends.
                            </p>
                            <div className="text-[10px] text-white tracking-wider">PRIMARY STACK: JavaScript, React, Next.js, Node.js, Express, Firebase</div>
                        </TechnicalBorder>

                        <TechnicalBorder className="p-6 bg-pure-black/50">
                            <div className="text-safety-orange text-[10px] uppercase tracking-widest mb-3">// EMBEDDED SYSTEMS & ROBOTICS [PROFICIENCY: BEGINNER]</div>
                            <p className="mb-4">
                                Precision feedback control loop implementations using C/C++ for hardware agents. PID loop optimization for autonomous robot navigation, circuit simulations (PSpice), and embedded systems development.
                            </p>
                            <div className="text-[10px] text-white tracking-wider">PRIMARY STACK: C, C++, PID Control, PSpice, Embedded Systems</div>
                        </TechnicalBorder>

                        <TechnicalBorder className="p-6 bg-pure-black/50">
                            <div className="text-safety-orange text-[10px] uppercase tracking-widest mb-3">// DEVOPS & CLOUD INFRASTRUCTURE [PROFICIENCY: INTERMEDIATE]</div>
                            <p className="mb-4">
                                Scalable container deployment via Docker and automation scripts. Secure deployments using Google Cloud Run, continuous integration workflows (CI/CD), and automated workflows with n8n.
                            </p>
                            <div className="text-[10px] text-white tracking-wider">PRIMARY STACK: Docker, Git, CI/CD, Google Cloud Run, n8n</div>
                        </TechnicalBorder>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
                        {skills.map((skill, idx) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-pure-black"
                            >
                                <SkillBadge {...skill} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- Projects Section --- */}
                <section id="projects" className="py-32 border-b border-dark-border">
                    <SectionHeading
                        seq="SEQ_03"
                        subtitle="LOG_ENTRIES: REVIEWING IMPACTFUL SOFTWARE DEPLOYMENTS AND SYSTEM ARCHITECTURES."
                    >
                        FEATURED_PROJECTS
                    </SectionHeading>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}

                        <div className="border border-dashed border-dark-border p-8 flex items-center justify-center">
                            <p className="font-mono text-xs text-dark-border uppercase tracking-widest text-center">
                                &gt; WAITING FOR NEXT_SENSORY_INPUT... <br />
                                [ ENCRYPTED_SECTION ]
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- Achievements Section --- */}
                <section id="achievements" className="py-32 border-b border-dark-border">
                    <SectionHeading
                        seq="SEQ_04"
                        subtitle="RECORDED_ACCOMPLISHMENTS: HONORS, AWARDS, AND COMPETITIVE MILESTONES."
                    >
                        SYSTEM_ACHIEVEMENTS
                    </SectionHeading>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Research Card */}
                        <TechnicalBorder className="p-8 bg-safety-orange/5 flex flex-col justify-between h-full">
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-dark-border text-safety-orange">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-safety-orange font-mono text-[10px] uppercase tracking-widest mb-1">// RESEARCH_PROGRAM</div>
                                    <h3 className="text-xl font-heading tracking-widest uppercase mb-2">LUSIP 2026</h3>
                                    <p className="text-muted-gray text-xs font-mono tracking-cli-body">
                                        Selected for the LUSIP 2026 "Strategies for Sustainable Future" program.
                                    </p>
                                </div>
                            </div>
                        </TechnicalBorder>

                        {/* Certifications Card */}
                        <TechnicalBorder className="p-8 bg-safety-orange/5 flex flex-col justify-between h-full">
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-dark-border text-safety-orange">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-safety-orange font-mono text-[10px] uppercase tracking-widest mb-1">// CERTIFICATIONS</div>
                                    <h3 className="text-xl font-heading tracking-widest uppercase mb-2">Credentials</h3>
                                    <ul className="text-muted-gray text-xs font-mono tracking-cli-body list-disc pl-4 space-y-2 mt-2">
                                        <li>Artificial Intelligence Certification (Bolt IoT)</li>
                                        <li>Ethical Hacking Workshop (IIT Guwahati)</li>
                                    </ul>
                                </div>
                            </div>
                        </TechnicalBorder>

                        {/* Competitions Card */}
                        <TechnicalBorder className="p-8 bg-safety-orange/5 flex flex-col justify-between h-full md:col-span-2">
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-dark-border text-safety-orange">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-safety-orange font-mono text-[10px] uppercase tracking-widest mb-1">// HACKATHONS & COMPETITIONS</div>
                                    <h3 className="text-xl font-heading tracking-widest uppercase mb-2">Competitive Milestones</h3>
                                    <ul className="text-muted-gray text-xs font-mono tracking-cli-body list-disc pl-4 space-y-2 mt-2">
                                        <li>2nd Runner-up at TechSprint 2025 (Team CodeCraft, GDG on Campus — Gauhati University)</li>
                                        <li>2nd Runner-up at WebChain Hackathon 2026 (Team CodeCraft, GDG on Campus — Gauhati University)</li>
                                        <li>Participant in PromptWars 2026 and HackDays 4.0</li>
                                    </ul>
                                </div>
                            </div>
                        </TechnicalBorder>

                        {/* Portfolio Card */}
                        <TechnicalBorder className="p-8 bg-safety-orange/5 flex flex-col justify-between h-full md:col-span-2">
                            <div className="flex items-start gap-4">
                                <div className="p-3 border border-dark-border text-safety-orange">
                                    <Terminal className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-safety-orange font-mono text-[10px] uppercase tracking-widest mb-1">// PROJECT_PORTFOLIO</div>
                                    <h3 className="text-xl font-heading tracking-widest uppercase mb-2">GitHub Repositories</h3>
                                    <p className="text-muted-gray text-xs font-mono tracking-cli-body">
                                        Developed and maintained {repoCount}+ software projects actively hosted and version-controlled on GitHub.
                                    </p>
                                </div>
                            </div>
                        </TechnicalBorder>
                    </div>
                </section>

                {/* --- Contact Section --- */}
                <section id="contact" className="py-32 mb-20">
                    <SectionHeading
                        seq="SEQ_05"
                        subtitle="UPLINKSTATUS: OPEN_FOR_COLLABORATION_AND_BACKEND_DEVELOPMENT_QUERIES."
                    >
                        ESTABLISH_UPLINK
                    </SectionHeading>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="font-mono text-xs text-muted-gray leading-loose uppercase tracking-widest">
                            <p className="mb-8 border-l border-dark-border pl-6">
                                // CURRENTLY SEEKING CHALLENGING BACKEND ROLES <br />
                                // AVAILABLE FOR FULL-TIME OPPORTUNITIES <br />
                                // GLOBAL_REACH: ENABLED
                            </p>
                            <p className="text-safety-orange">
                                &gt; ESTABLISH CONNECTION VIA SECURE CHANNEL:
                            </p>
                        </div>

                        <TechnicalBorder className="p-6 sm:p-12 text-center bg-safety-orange/5">
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="mailto:hrishikeshdutta2006@gmail.com"
                                className="w-full sm:inline-flex items-center justify-center gap-4 px-8 sm:px-12 py-6 bg-pure-black border border-safety-orange text-safety-orange font-heading tracking-[0.2em] uppercase text-sm sm:text-lg hover:bg-safety-orange hover:text-pure-black transition-all"
                            >
                                SEND_MESSAGE <Mail className="w-5 h-5" />
                            </motion.a>

                            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-12 font-mono text-[10px] uppercase tracking-widest">
                                <a href="https://www.linkedin.com/in/hrishikesh-dutta-714849359/" target="_blank" rel="noopener noreferrer" className="text-muted-gray hover:text-white transition-colors">
                                    [LINKEDIN_UPLINK]
                                </a>
                                <a href="https://www.instagram.com/___helion?igsh=NjVwdXUybXduczQ=" target="_blank" rel="noopener noreferrer" className="text-muted-gray hover:text-white transition-colors">
                                    [INSTAGRAM_UPLINK]
                                </a>
                            </div>
                        </TechnicalBorder>
                    </div>
                </section>

            </main>

            <footer className="border-t border-dark-border py-12 mt-20 bg-pure-black">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-muted-gray uppercase">
                        <span>© 2026_SYSTEM_CORE</span>
                        <div className="h-4 w-px bg-dark-border" />
                        <span>HRISHIKESH_DUTTA</span>
                    </div>
                    <div className="flex gap-8 font-mono text-[10px] tracking-widest text-dark-border uppercase">
                        <span>BUILT_WITH: NEXT.JS_V14</span>
                        <span>UI_REV: CLI_02</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
