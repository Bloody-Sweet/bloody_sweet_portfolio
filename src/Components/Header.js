import React, { useEffect, useState, useRef } from 'react';

const Header = () => {

    const navItems = [{title: 'Home', href: '#home'}, 
        {title: 'About', href: '#about'}, 
        {title: 'Experience', href: '#experience'},
        {title: 'Projects', href: '#projects'},
        {title: 'Skills', href: '#skills'},
        {title: 'Resume', href: '#resume'},
        {title: 'Contact', href: '#contact'}];

    const [active, setActive] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    // Prevent underline flicker while programmatic smooth-scroll is in progress
    const clickLockRef = useRef({ until: 0, target: null });

    useEffect(() => {
        const ids = ['home','about','experience','projects','skills','resume','contact'];

        const computeActive = () => {
          const now = Date.now();
          if (clickLockRef.current.target && now < clickLockRef.current.until) {
            // Keep the clicked target highlighted until the scroll settles
            const locked = clickLockRef.current.target;
            setActive((prev) => (prev === locked ? prev : locked));
            return;
          }
          const headerEl = document.querySelector('header');
          const headerOffset = headerEl ? headerEl.offsetHeight : 80;
          const SCROLL_MARGIN = 80; // keep in sync with sections' scrollMarginTop
          const probeY = Math.max(headerOffset, SCROLL_MARGIN) + 1;

          const sections = ids
            .map((id) => {
              const elem = document.querySelector(`#${id}`);
              return elem ? { id, elem } : null;
            })
            .filter(Boolean);

          let current = 'home';
          for (let i = sections.length - 1; i >= 0; i--) {
            const s = sections[i];
            const rect = s.elem.getBoundingClientRect();
            if (rect.top <= probeY + 10) {
              current = s.id;
              break;
            }
          }
          setActive((prev) => (prev === current ? prev : current));
        };

        computeActive();
        window.addEventListener('scroll', computeActive, { passive: true });
        window.addEventListener('resize', computeActive);
        const onHashChange = () => {
          const hash = window.location.hash.replace('#','');
          if (ids.includes(hash)) setActive(hash);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => {
          window.removeEventListener('scroll', computeActive);
          window.removeEventListener('resize', computeActive);
          window.removeEventListener('hashchange', onHashChange);
        };
    }, []);      

    // Set initial active based on current hash
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (['home','about','experience','projects','skills','resume','contact'].includes(hash)) {
          setActive(hash);
        }
    }, []);
    
    return (
        <header className='fixed w-full top-0 z-50 bg-black/90 backdrop-blur text-white transition-all duration-300'>
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex justify-between items-center py-3">
                <h1 className="font-bold">Adithya Thirupathi</h1>

                {/* Desktop Nav */}
                <nav className='hidden md:flex space-x-8'>
                    {navItems.map((item) => (
                        <a key={item.title}
                           href={item.href}
                           onClick={(e) => {
                             if (item.href.startsWith('#')) {
                               e.preventDefault();
                               if (typeof document !== 'undefined') {
                                 document.body.style.overflow = 'auto';
                               }
                               const id = item.href.replace('#','');
                               setActive(id);
                               // Lock active highlight to the clicked item during smooth scroll
                               clickLockRef.current = { until: Date.now() + 900, target: id };
                               const target = document.querySelector(item.href);
                               if (target) {
                                 target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                               }
                             }
                           }}
                           className={`transition-colors duration-300 font-medium ${
                             (active === item.href.replace('#', '')) ? 'text-white underline underline-offset-8' : 'text-gray-300'
                           } hover:text-gray-400`}> {item.title} </a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button aria-label="Open menu" className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen((v) => !v)}>
                  <span className="sr-only">Menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'} />
                  </svg>
                </button>
            </div>

            {/* Mobile Nav Panel */}
            <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <nav className='flex flex-col gap-2 pb-3'>
                {navItems.map((item) => (
                  <a key={item.title}
                     href={item.href}
                     onClick={(e) => {
                       if (item.href.startsWith('#')) {
                         e.preventDefault();
                         setMenuOpen(false);
                         if (typeof document !== 'undefined') {
                           document.body.style.overflow = 'auto';
                         }
                         const id = item.href.replace('#','');
                         setActive(id);
                         clickLockRef.current = { until: Date.now() + 900, target: id };
                         const target = document.querySelector(item.href);
                         if (target) {
                           target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                         }
                       }
                     }}
                     className={`px-2 py-2 rounded transition-colors duration-300 ${
                       (active === item.href.replace('#', '')) ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/10'
                     }`}> {item.title} </a>
                ))}
              </nav>
            </div>
          </div>
        </header>
    );
};

export default Header;
