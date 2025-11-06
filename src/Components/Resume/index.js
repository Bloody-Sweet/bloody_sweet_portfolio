import { useEffect, useRef, useState } from 'react';
import { RESUME_URL } from '../../constants/Content';

const Resume = () => {
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
    <section id="resume" ref={sectionRef} className="relative min-h-screen bg-[#FCFBF8]" style={{ scrollMarginTop: '80px' }}>
      <div className="absolute inset-0 bg-white opacity-100" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[720px] transition-all duration-1000 ease-out ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-5 text-center">Resume</h2>
          <div className="h-0.5 bg-black mx-auto mb-8" style={{ width: '80px' }} />
          <p className="text-black/80 text-center mb-6">Download a copy of my latest resume.</p>
          <div className="flex justify-center">
            <a href={RESUME_URL} download="Adithya_Resume.pdf" className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;


