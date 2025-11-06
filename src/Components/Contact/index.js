import { useEffect, useRef, useState } from 'react';

const Contact = () => {
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
    <section id="contact" ref={sectionRef} className="relative min-h-screen bg-[#FCFBF8]" style={{ scrollMarginTop: '80px' }}>
      <div className="absolute inset-0 bg-white opacity-100" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-[#E6DCD4]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-[720px] transition-all duration-1000 ease-out ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-5 text-center">Contact</h2>
          <div className="h-0.5 bg-black mx-auto mb-8" style={{ width: '80px' }} />
          <div className="flex flex-col gap-4 items-center">
            <a href="mailto:adithyathirupathi65@gmail.com" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors w-full max-w-sm justify-center">
              <i className="fas fa-envelope text-xl" aria-hidden="true"></i>
              <span>Email</span>
            </a>
            <a href="tel:+1 989-572-8379" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors w-full max-w-sm justify-center">
              <i className="fas fa-phone text-xl" aria-hidden="true"></i>
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


