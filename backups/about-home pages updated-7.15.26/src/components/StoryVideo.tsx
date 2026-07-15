import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { siteMedia } from '../lib/media';

function isPlaceholder(value: string): boolean {
  return value.length === 0 || value.startsWith('TODO');
}

export default function StoryVideo() {
  const { story } = siteMedia;
  const [activated, setActivated] = useState(false);

  if (!story.enabled || isPlaceholder(story.thumbnail)) return null;

  const hasYouTube = story.youTubeId !== null && !isPlaceholder(story.youTubeId);
  const hasSelfHosted = story.sources.some((s) => !isPlaceholder(s.src));
  if (!hasYouTube && !hasSelfHosted) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: story.schema.name,
    description: story.schema.description,
    thumbnailUrl: [story.schema.thumbnailUrl],
    uploadDate: story.schema.uploadDate,
    duration: story.schema.duration,
    ...(hasYouTube
      ? { embedUrl: `https://www.youtube-nocookie.com/embed/${story.youTubeId}` }
      : { contentUrl: story.schema.contentOrEmbedUrl }),
  };

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-3 leading-tight">
            {story.title}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg aspect-video bg-brand-900">
          {!activated ? (
            <button
              type="button"
              onClick={() => setActivated(true)}
              aria-label={`Play video: ${story.title}`}
              className="group absolute inset-0 w-full h-full"
            >
              <img src={story.thumbnail} alt={story.thumbnailAlt} className="w-full h-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-brand-900/30 transition-colors group-hover:bg-brand-900/40">
                <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
              </span>
            </button>
          ) : hasYouTube ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${story.youTubeId}?autoplay=1&rel=0`}
              title={story.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video className="absolute inset-0 w-full h-full" controls autoPlay playsInline poster={story.thumbnail}>
              {story.sources.map((s) => (
                <source key={s.type} src={s.src} type={s.type} />
              ))}
              {story.captions
                .filter((c) => !isPlaceholder(c.src))
                .map((c) => (
                  <track key={c.srclang} kind="captions" srcLang={c.srclang} src={c.src} label={c.label} />
                ))}
            </video>
          )}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
