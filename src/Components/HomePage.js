import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { WELCOME_MESSAGE, FIRST_CARD_DESCRIPTION } from '../constants/Content';
const About = lazy(() => import('./About'));
const Projects = lazy(() => import('./Projects'));
const Experience = lazy(() => import('./Experience'));
const Skills = lazy(() => import('./Skills'));
const Resume = lazy(() => import('./Resume'));
const Contact = lazy(() => import('./Contact'));

// HomePage component with magical animation effects
const HomePage = () => {
  // Animation states
  const [showBackground, setShowBackground] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showQuestionCard, setShowQuestionCard] = useState(false);
  const [showQuestionText, setShowQuestionText] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showSocialIcons, setShowSocialIcons] = useState(false);

  // Welcome typing states
  const [typedWelcome, setTypedWelcome] = useState("");
  const [isWelcomePhase, setIsWelcomePhase] = useState(true);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  // About lazy-mount control
  const initialHash = typeof window !== 'undefined' ? window.location.hash : '';
  const [loadAbout, setLoadAbout] = useState(initialHash === '#about' || initialHash === '#experience' || initialHash === '#projects');
  const aboutSentinelRef = useRef(null);
  const [loadExperience, setLoadExperience] = useState(initialHash === '#experience' || initialHash === '#projects' || initialHash === '#skills' || initialHash === '#resume' || initialHash === '#contact');
  const experienceSentinelRef = useRef(null);
  const [loadSkills, setLoadSkills] = useState(initialHash === '#skills' || initialHash === '#resume' || initialHash === '#contact');
  const skillsSentinelRef = useRef(null);
  const [loadResume, setLoadResume] = useState(initialHash === '#resume' || initialHash === '#contact');
  const resumeSentinelRef = useRef(null);
  const [loadContact, setLoadContact] = useState(initialHash === '#contact');
  const contactSentinelRef = useRef(null);
  const [loadProjects, setLoadProjects] = useState(initialHash === '#projects' || initialHash === '#skills' || initialHash === '#resume' || initialHash === '#contact');
  const projectsSentinelRef = useRef(null);

  // Magical animation sequence
  useEffect(() => {
    // If user refreshed on #about, skip Home animations entirely
    if (typeof window !== 'undefined' && window.location.hash === '#about') {
      setIsWelcomePhase(false);
      // Ensure Home appears in its final state when scrolled back up
      setShowBackground(true);
      setShowProfileCard(true);
      setShowProfileImage(true);
      setShowQuestionCard(true);
      setShowQuestionText(true);
      setShowSocialIcons(true);
      setShowWelcomeOverlay(false);
      return () => {};
    }
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const animationSequence = async () => {
      // Lock scroll while home animations play
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
      // Start with blank screen for 500ms
      await delay(500);
      
      // 1. Background appears with fade-in
      setShowBackground(true);
      await delay(800);
      
      // 2. Show centered welcome overlay card and type welcome message
      setShowWelcomeOverlay(true);
      await delay(300);

      // 3. Type the welcome message letter by letter
      setTypedWelcome("");
      for (let i = 0; i < WELCOME_MESSAGE.length; i++) {
        setTypedWelcome(prev => prev + WELCOME_MESSAGE[i]);
        // typing speed
        // Slightly slower on spaces for a more natural feel
        const char = WELCOME_MESSAGE[i];
        const speed = char === " " ? 80 : 55;
        // eslint-disable-next-line no-await-in-loop
        await delay(speed);
      }
      // small hold after typing completes
      await delay(500);
      setIsWelcomePhase(false);
      // fade out overlay
      setShowWelcomeOverlay(false);
      await delay(500);

      // 4. Profile card slides in from left (begin original sequence)
      setShowProfileCard(true);
      await delay(600);
      
      // 5. Profile image appears with scale effect
      setShowProfileImage(true);
      await delay(400);
      
      // 6. Question card slides in from right
      setShowQuestionCard(true);
      await delay(500);

      // 7. Question text appears with smooth animation
      setShowQuestionText(true);
      await delay(800);
      
      // 8. Social icons appear with stagger effect
      setShowSocialIcons(true);

      // Unlock scroll after animations complete
      await delay(200);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };

    animationSequence();
    return () => {
      // Ensure scroll is unlocked on unmount
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  // Ensure overlay never lingers behind when returning to the tab
  useEffect(() => {
    const handleVisibility = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        setShowWelcomeOverlay(false);
        setIsWelcomePhase(false);
        document.body.style.overflow = 'auto';
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibility);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibility);
      }
    };
  }, []);

  // Observe the sentinel to lazy-mount About when scrolled near it
  useEffect(() => {
    if (loadAbout) return undefined;
    const sentinel = aboutSentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadAbout(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadAbout]);

  // Observe the sentinel to lazy-mount Experience when scrolled near it
  useEffect(() => {
    if (loadExperience) return undefined;
    const sentinel = experienceSentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadExperience(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadExperience]);

  // Observe Skills
  useEffect(() => {
    if (loadSkills) return undefined;
    const sentinel = skillsSentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadSkills(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadSkills]);

  // Observe Resume
  useEffect(() => {
    if (loadResume) return undefined;
    const sentinel = resumeSentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadResume(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadResume]);

  // Observe Contact
  useEffect(() => {
    if (loadContact) return undefined;
    const sentinel = contactSentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadContact(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadContact]);

  // Observe the sentinel to lazy-mount Projects when scrolled near it
  useEffect(() => {
    if (loadProjects) return undefined;
    const sentinel = projectsSentinelRef.current;
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadProjects(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadProjects]);



  return (
    <>
    <div id="home" className="relative min-h-screen bg-[#FCFBF8] overflow-hidden" style={{ scrollMarginTop: '80px' }}>
      {/* Animated Background */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-out z-0 ${
          showBackground 
            ? 'bg-white opacity-100' 
            : 'bg-white opacity-0'
        }`}
      />
      
      {/* Beige background section with animation */}
      <div 
        className={`absolute inset-y-0 left-0 w-2/5 transition-all duration-1000 ease-out z-0 ${
          showBackground 
            ? 'bg-[#E6DCD4] transform translate-x-0 opacity-100' 
            : 'bg-[#E6DCD4] transform -translate-x-full opacity-0'
        }`} 
      />

      {/* Content layer */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 pt-20 md:pt-16">
        {/* Welcome Overlay Card */}
        <div
          className={`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-500 ease-out ${
            showWelcomeOverlay ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!showWelcomeOverlay}
        >
          <div className="pointer-events-auto bg-white rounded-3xl shadow-2xl p-10 w-[720px] max-w-[90vw]">
            <h1 className="text-3xl sm:text-4xl font-semibold text-black text-center min-h-[120px]">
              {typedWelcome}
              {isWelcomePhase && <span className="typing-caret">|</span>}
            </h1>
          </div>
        </div>
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 md:gap-0">

          {/* Profile Card with magical entrance */}
          <div 
            className={`md:absolute md:left-[35%] md:transform md:-translate-x-1/2 w-full max-w-xs sm:max-w-sm md:w-80 h-auto md:h-[440px] bg-[#FAF7F2] rounded-xl shadow-2xl transition-all duration-1000 ease-out ${
              showProfileCard 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="flex flex-col items-center text-center p-6 md:pt-8">
              {/* Profile Image with scale animation */}
              <div
                className={`relative w-32 h-32 rounded-full overflow-hidden mb-4 transition-all duration-800 ease-out ${
                  showProfileImage 
                    ? 'opacity-100 scale-100 rotate-0' 
                    : 'opacity-0 scale-0 rotate-180'
                }`}
              >
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Name with slide-up animation */}
              <h3 
                className={`text-2xl font-bold mt-8 mb-2 text-black transition-all duration-700 delay-300 ease-out ${
                  showProfileImage 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                Adithya<br />Thirupathi
              </h3>

              {/* Divider line with width animation */}
              <div 
                className={`h-0.5 bg-black my-4 transition-all duration-600 delay-500 ease-out ${
                  showProfileImage 
                    ? 'w-12 opacity-100' 
                    : 'w-0 opacity-0'
                }`}
              />

              {/* Job title with fade-in */}
              <p 
                className={`text-black text-xs sm:text-sm md:text-base tracking-widest uppercase transition-all duration-500 delay-700 ease-out text-center break-words ${
                  showProfileImage 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                }`}
              >
                FULL STACK DEVELOPER  
              </p>
              
              {/* Social icons with stagger animation */}
              <div 
                className={`md:absolute md:bottom-0 md:left-0 md:right-0 bg-white rounded-xl p-3 flex justify-center md:justify-start md:pl-[30%] space-x-4 transition-all duration-600 delay-1000 ease-out ${
                  showSocialIcons 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <a 
                  href="https://www.linkedin.com/in/adithya-thirupathi-a46582211/" 
                  className={`text-black hover:text-gray-600 text-3xl transition-all duration-300 hover:scale-110 ${
                    showSocialIcons 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: '1200ms' }}
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a 
                  href="https://github.com/Bloody-Sweet?tab=repositories" 
                  className={`text-black hover:text-gray-600 text-3xl transition-all duration-300 hover:scale-110 ${
                    showSocialIcons 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: '1400ms' }}
                >
                  <i className="fab fa-github"></i>
                </a>
                <a 
                  href="mailto:adithyathirupathi65@gmail.com" 
                  className={`text-black hover:text-gray-600 text-3xl transition-all duration-300 hover:scale-110 ${
                    showSocialIcons 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: '1600ms' }}
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Question Card with magical entrance */}
          <div 
            className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl md:w-[600px] md:ml-auto md:mr-16 transition-all duration-1000 ease-out ${
              showQuestionCard 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-20 scale-95'
            }`}
          >
            <h2 
              className={`text-base sm:text-lg md:text-2xl font-semibold mb-2 text-black min-h-[120px] transition-all duration-1200 ease-out ${
                showQuestionText 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {FIRST_CARD_DESCRIPTION}
            </h2>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        @keyframes caretBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .typing-caret {
          display: inline-block;
          width: 1ch;
          animation: caretBlink 1s steps(1, end) infinite;
        }
      `}</style>
    </div>

    {/* About Section (lazy-mounted). If not loaded yet, render a visual placeholder so anchor and scroll work */}
    {loadAbout ? (
      <Suspense fallback={
        <section id="about" className="relative min-h-screen bg-[#FCFBF8]">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
        </section>
      }>
        <About />
      </Suspense>
    ) : (
      <section id="about" ref={aboutSentinelRef} className="relative min-h-screen bg-[#FCFBF8]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
      </section>
    )}

    {/* Experience Section (lazy-mounted) */}
    {loadExperience ? (
      <Suspense fallback={
        <section id="experience" className="relative min-h-screen bg-[#FCFBF8]">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
        </section>
      }>
        <Experience />
      </Suspense>
    ) : (
      <section id="experience" ref={experienceSentinelRef} className="relative min-h-screen bg-[#FCFBF8]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
      </section>
    )}

    {/* Projects Section (lazy-mounted) - moved here to follow Experience */}
    {loadProjects ? (
      <Suspense fallback={
        <section id="projects" className="relative min-h-screen bg-[#FCFBF8]">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
        </section>
      }>
        <Projects />
      </Suspense>
    ) : (
      <section id="projects" ref={projectsSentinelRef} className="relative min-h-screen bg-[#FCFBF8]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
      </section>
    )}

    {/* Skills Section */}
    {loadSkills ? (
      <Suspense fallback={
        <section id="skills" className="relative min-h-screen bg-[#FCFBF8]">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
        </section>
      }>
        <Skills />
      </Suspense>
    ) : (
      <section id="skills" ref={skillsSentinelRef} className="relative min-h-screen bg-[#FCFBF8]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
      </section>
    )}

    {/* Resume Section */}
    {loadResume ? (
      <Suspense fallback={
        <section id="resume" className="relative min-h-screen bg-[#FCFBF8]">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
        </section>
      }>
        <Resume />
      </Suspense>
    ) : (
      <section id="resume" ref={resumeSentinelRef} className="relative min-h-screen bg-[#FCFBF8]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
      </section>
    )}

    {/* Contact Section */}
    {loadContact ? (
      <Suspense fallback={
        <section id="contact" className="relative min-h-screen bg-[#FCFBF8]">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
        </section>
      }>
        <Contact />
      </Suspense>
    ) : (
      <section id="contact" ref={contactSentinelRef} className="relative min-h-screen bg-[#FCFBF8]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />
      </section>
    )}
    </>
  );
};

export default HomePage;