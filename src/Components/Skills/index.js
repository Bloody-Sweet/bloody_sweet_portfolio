import { useEffect, useRef, useState } from 'react';
import { SKILLS, SKILL_GROUPS } from '../../constants/Content';

const Skills = () => {
  const [show, setShow] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShow(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      });
    }, { threshold: 0.25 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen bg-[#FCFBF8]" style={{ scrollMarginTop: '80px' }}>
      <div className="absolute inset-0 bg-white opacity-100" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[1080px] transition-all duration-1000 ease-out ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-5 text-center">Skills</h2>
          <div className="h-0.5 bg-black mx-auto mb-8" style={{ width: '80px' }} />
          {Array.isArray(SKILL_GROUPS) && SKILL_GROUPS.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILL_GROUPS.map((g) => (
                <div key={g.group} className="bg-[#FAF7F2] rounded-xl p-4">
                  <h3 className="font-semibold text-black mb-2">{g.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full bg-black text-white text-xs sm:text-sm">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {SKILLS.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-black text-white text-xs sm:text-sm">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;


