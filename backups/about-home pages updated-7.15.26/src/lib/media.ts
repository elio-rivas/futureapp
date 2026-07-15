// Centralized media assets for the FFE marketing site.
// URLs must be verified to resolve (HTTP 200) before wiring — see Stop Gate D.
// Placeholders ('TODO:...') degrade gracefully:
//   - HeroVideo renders the poster image only (no video layer).
//   - StoryVideo renders nothing until real assets are supplied + `story.enabled` is true.

export interface VideoSource {
  src: string;
  type: string;
}

export interface CaptionTrack {
  srclang: string;
  src: string;
  label: string;
}

interface HeroMedia {
  poster: string;
  posterAlt: string;
  sources: VideoSource[];
}

interface StoryMedia {
  enabled: boolean;
  thumbnail: string;
  thumbnailAlt: string;
  title: string;
  youTubeId: string | null; // YouTube id -> iframe facade; null -> self-hosted <video>
  sources: VideoSource[];
  captions: CaptionTrack[];
  schema: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string; // ISO 8601 date, e.g. 2026-06-01
    contentOrEmbedUrl: string;
    duration: string; // ISO 8601 duration, e.g. PT1M30S
  };
}

interface SiteMedia {
  hero: HeroMedia;
  story: StoryMedia;
}

export const siteMedia: SiteMedia = {
  hero: {
    // REUSE the current HeroIntro background image (DIAGNOSE step 1):
    poster:
      'https://images.pexels.com/photos/6654125/pexels-photo-6654125.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    posterAlt: 'Happy child smiling while reading a book with a caring tutor',
    sources: [
      // TEMPORARY placeholder — free Pexels stock loop (cottonbro studio), verified HTTP 200.
      // 960x506, 1.49MB. Swap for owned ≤720p footage once produced (single edit here).
      {
        src: 'https://videos.pexels.com/video-files/3676995/3676995-sd_960_506_25fps.mp4',
        type: 'video/mp4',
      },
    ],
  },
  story: {
    enabled: false, // flip to true once real assets are wired + verified
    thumbnail: 'TODO: story-thumbnail.jpg',
    thumbnailAlt: 'A reading session at Future Foundations Education',
    title: 'See a reading session in action',
    youTubeId: null,
    sources: [],
    captions: [
      { srclang: 'en', src: 'TODO: captions.en.vtt', label: 'English' },
      { srclang: 'es', src: 'TODO: captions.es.vtt', label: 'Español' },
    ],
    schema: {
      name: 'Future Foundations Education — Reading Session',
      description:
        'A short look at literacy instruction at Future Foundations Education in Kissimmee, FL.',
      thumbnailUrl: 'TODO',
      uploadDate: 'TODO',
      contentOrEmbedUrl: 'TODO',
      duration: 'TODO',
    },
  },
};
