import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, UserCheck, Calendar, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import HeroVideo from './HeroVideo';
import { siteMedia } from '../lib/media';

function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroIntro() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <HeroVideo
          poster={siteMedia.hero.poster}
          posterAlt={siteMedia.hero.posterAlt}
          sources={siteMedia.hero.sources}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-800/65"
        style={{ opacity: overlayOpacity }}
      />

      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      <div className="relative container-max px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-accent-500/15 border border-accent-400/25 text-accent-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
            </span>
            {t.heroIntro.badge}
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.heroIntro.titleLine1}
            <span className="block text-accent-300">
              {t.heroIntro.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-brand-100/90 leading-relaxed mb-4 max-w-2xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {t.heroIntro.subtitle}
          </motion.p>

          <motion.p
            className="text-base text-warm-300/80 font-medium mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Heart className="inline w-4 h-4 mr-2 text-accent-400/80" />
            {t.heroIntro.exclusivity}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <a
              href="https://form.jotform.com/261240438813049"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/20 hover:-translate-y-0.5"
            >
              {t.heroIntro.cta}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#program-structure"
              className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 backdrop-blur-md border border-white/15 hover:border-white/25 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300"
            >
              {t.heroIntro.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <Calendar className="w-4 h-4 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter target={6} />
              </div>
              <div className="text-xs text-brand-200/70 mt-1">{t.heroIntro.statWeeks}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <UserCheck className="w-4 h-4 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter target={4} />
              </div>
              <div className="text-xs text-brand-200/70 mt-1">{t.heroIntro.statGroupSize}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <BookOpen className="w-4 h-4 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter target={4} />
              </div>
              <div className="text-xs text-brand-200/70 mt-1">{t.heroIntro.statPerWeek}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <Heart className="w-4 h-4 text-accent-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter target={98} suffix="%" />
              </div>
              <div className="text-xs text-brand-200/70 mt-1">{t.heroIntro.statSatisfaction}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-50 via-warm-50/80 to-transparent" />
    </section>
  );
}
