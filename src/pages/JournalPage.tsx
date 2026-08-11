import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getProductionImageUrl, handleImageError } from '../services/imageService';

export const JournalPage: React.FC = () => {
  const { setActivePage } = useGallery();

  const articles = [
    {
      id: 'journal-1',
      title: 'Decolonizing the Canvas: The Symbolic Language of Rebecca Esho',
      date: 'August 2026',
      category: 'Artist Feature',
      excerpt: 'Exploring how traditional kijipa cloth, cowrie shells, and sacred beading converge in ISEMBAYE and THIS IS OUR WAY to preserve cultural memory and ancestral sovereignty.',
      image: '/images/artworks/isembaye.jpg'
    },
    {
      id: 'journal-2',
      title: 'The First Dialogue: Colonial Encounters and African Visual History',
      date: 'August 2026',
      category: 'Curatorial Essay',
      excerpt: 'Kolawole Adedeji discusses the yellow boundary line running through his seminal composition THE FIRST DIALOGUE, reflecting on history and pre-colonial autonomy.',
      image: '/images/artworks/the_first_dialogue.jpg'
    },
    {
      id: 'journal-3',
      title: 'Thought of Hope: Economic Resilience and Youth Advocacy',
      date: 'August 2026',
      category: 'Curatorial Essay',
      excerpt: 'Okunlola Olamilekan J (Palette) interrogates economic hardship and social questions through his narrative masterwork Thought of Hope.',
      image: '/images/artworks/thought_of_hope.jpg'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12">
      
      {/* Header */}
      <div className="border-b border-ivory-300 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <BookOpen className="w-4 h-4" /> The Curatorial Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-900">
          Essays, Curatorial Notes & Artist Dialogues
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-light">
          Deepening the narrative behind contemporary African masterworks, provenance, and art market insights.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map(article => (
          <article key={article.id} className="bg-white rounded-xl border border-ivory-300 overflow-hidden shadow-subtle hover:shadow-gallery transition duration-300 flex flex-col justify-between">
            <div className="space-y-4 p-6">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-ivory-100 p-2 flex items-center justify-center">
                <img
                  src={getProductionImageUrl(article.image, article.title)}
                  alt={article.title}
                  onError={(e) => handleImageError(e, article.title)}
                  className="w-full h-full object-contain hover:scale-105 transition duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-gold-700 uppercase tracking-wider">{article.category} • {article.date}</span>
                <h3 className="font-serif text-lg font-bold text-navy-900 leading-snug">{article.title}</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed pt-2">{article.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setActivePage('catalogue')}
                className="text-xs font-semibold text-navy-900 hover:text-gold-700 uppercase tracking-wider flex items-center gap-1 transition"
              >
                Read Essay & View Related Works <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
