import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const SERVICE_META = [
  {
    id: 'early-learners',
    image: 'https://images.pexels.com/photos/8612992/pexels-photo-8612992.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    href: '/homeschool-plans',
    panelBg: '#e8f4f0',
    accent: '#16a34a',
  },
  {
    id: 'elementary',
    image: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    href: '/homeschool-plans',
    panelBg: '#e8eef4',
    accent: '#486581',
  },
  {
    id: 'middle-school',
    image: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    href: '/homeschool-plans',
    panelBg: '#f0eee8',
    accent: '#cb6e17',
  },
  {
    id: 'high-school',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    href: '/homeschool-plans',
    panelBg: '#eee8f0',
    accent: '#627d98',
  },
  {
    id: 'unique-needs',
    image: 'https://images.pexels.com/photos/8422144/pexels-photo-8422144.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    href: '/homeschool-plans',
    panelBg: '#f4ece8',
    accent: '#b44d12',
  },
  {
    id: 'homeschool',
    image: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    href: '/homeschool-plans',
    visiting: 'Homeschool Students',
    panelBg: '#e8f0ee',
    accent: '#334e68',
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function ServicesCarousel() {
  const { t } = useLanguage();
  const sc = t.servicesCarousel;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICE_META.length);
    }, AUTOPLAY_INTERVAL);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return;
      setIsAnimating(true);
      setActiveIndex(index);
      startAutoplay();
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, activeIndex, startAutoplay]
  );

  const prev = () => goTo((activeIndex - 1 + SERVICE_META.length) % SERVICE_META.length);
  const next = () => goTo((activeIndex + 1) % SERVICE_META.length);

  const activeMeta = SERVICE_META[activeIndex];

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 pt-32 md:pt-36 relative overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-700"
        style={{ background: `linear-gradient(90deg, ${activeMeta.accent}60, ${activeMeta.accent}, ${activeMeta.accent}60)` }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className="inline-block font-semibold text-sm tracking-wider uppercase mb-3"
            style={{ color: activeMeta.accent }}
          >
            {sc.sectionLabel}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 leading-tight">
            {sc.titleLine1}{' '}
            <span style={{ color: activeMeta.accent }} className="transition-colors duration-500">
              {sc.titleLine2}
            </span>
          </h2>
        </div>

        {/* Carousel panels */}
        <div className="flex gap-2 sm:gap-3 h-[500px] sm:h-[540px] md:h-[560px] rounded-2xl overflow-hidden shadow-xl">
          {SERVICE_META.map((meta, index) => {
            const isActive = index === activeIndex;
            const item = sc.items[index];
            if (!item) return null;

            return (
              <Link
                key={meta.id}
                to={meta.href}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault();
                    goTo(index);
                  }
                }}
                aria-label={item.title}
                className={[
                  'relative overflow-hidden cursor-pointer flex-shrink-0',
                  'transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isActive ? 'flex-[4] shadow-lg' : 'flex-[0.6] hover:flex-[0.75]',
                ].join(' ')}
                style={{ minWidth: 0 }}
              >
                {/* Background image */}
                <img
                  src={meta.image}
                  alt={item.title}
                  className={[
                    'absolute inset-0 w-full h-full object-cover',
                    'transition-transform duration-[800ms] ease-out',
                    isActive ? 'scale-100' : 'scale-110',
                  ].join(' ')}
                  loading="lazy"
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(10,25,41,0.92) 0%, rgba(10,25,41,0.55) 45%, rgba(10,25,41,0.15) 100%)'
                      : 'linear-gradient(to top, rgba(10,25,41,0.88) 0%, rgba(10,25,41,0.80) 100%)',
                  }}
                />

                {/* Accent bottom line */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                  style={{
                    height: isActive ? '4px' : '2px',
                    background: meta.accent,
                    opacity: isActive ? 1 : 0.5,
                  }}
                />

                {/* Collapsed label — vertical text */}
                <div
                  className={[
                    'absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300',
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
                  ].join(' ')}
                >
                  <div
                    className="text-white font-bold text-sm tracking-wide"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                  >
                    {item.title}
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className={[
                    'absolute inset-0 flex flex-col justify-end p-6 sm:p-8',
                    'transition-all duration-500',
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
                  ].join(' ')}
                >
                  <div
                    className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wider uppercase"
                    style={{
                      background: `${meta.accent}35`,
                      color: '#fff',
                      border: `1px solid ${meta.accent}70`,
                    }}
                  >
                    {item.tag}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
                    {item.subtitle}
                  </p>

                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl self-start transition-all duration-300 hover:gap-3 hover:brightness-110"
                    style={{ background: meta.accent, color: '#fff' }}
                  >
                    {sc.viewProgram}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mt-6 px-1">
          <div className="flex items-center gap-2">
            {SERVICE_META.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? '24px' : '8px',
                  height: '8px',
                  background: index === activeIndex ? activeMeta.accent : '#bcccdc',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous service"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 border"
              style={{ background: '#fff', borderColor: '#bcccdc', color: '#334e68' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next service"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 border"
              style={{ background: activeMeta.accent, borderColor: activeMeta.accent, color: '#fff' }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
