import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../../constants/Content';

const Projects = () => {
  const [showProjects, setShowProjects] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowProjects(true);
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen bg-[#FCFBF8]" style={{ scrollMarginTop: '80px' }}>
      <div className="absolute inset-0 bg-white opacity-100" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div
          className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[1080px] transition-all duration-1000 ease-out ${
            showProjects ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-5 text-center">Projects</h2>
          <div className="h-0.5 bg-black mx-auto mb-8" style={{ width: '100px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PROJECTS.map((p) => (
              <div key={p.title} className="border border-gray-200 rounded-2xl p-5 sm:p-6 bg-[#FAF7F2] shadow transition-colors duration-300">
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-2">{p.title}</h3>
                {p.description ? (
                  <p className="text-black/80 text-sm sm:text-base mb-3">{p.description}</p>
                ) : null}
                {p.bullets && p.bullets.length ? (
                  <ul className="text-black/80 text-sm sm:text-base list-disc pl-5 mb-3 space-y-2">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech?.map((t) => (
                    <span key={t} className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-black text-white">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-black underline hover:text-gray-700">
                      Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="text-black underline hover:text-gray-700">
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;


