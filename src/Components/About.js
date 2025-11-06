import { useEffect, useRef, useState } from 'react';
import { DESCRIPTION } from '../constants/Content';

const About = () => {
  const [showAboutCard, setShowAboutCard] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowAboutCard(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-[#FCFBF8]" style={{ scrollMarginTop: '80px' }}>
      {/* Background layers to match Home */}
      <div className="absolute inset-0 bg-white opacity-100" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />

      {/* Content layer */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div
          className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 w-full max-w-[860px] transition-all duration-1000 ease-out ${
            showAboutCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-5 text-center">About Me</h2>
          <div className="h-0.5 bg-black mx-auto mb-7" style={{ width: '80px' }} />
          <p className="text-black text-base sm:text-lg md:text-xl leading-7 sm:leading-8 md:leading-9 text-center max-w-[820px] mx-auto">{DESCRIPTION}</p>
        </div>
      </div>
    </section>
  );
};

export default About;


