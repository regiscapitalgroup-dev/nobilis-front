// LandingPress.tsx
import React, {FC} from 'react'

interface PressArticle {
  id: number
  image: string
  title: string
  description: string
  date: string
  source: string
}

const pressArticles: PressArticle[] = [
  {
    id: 1,
    image: '/media/press_01.png',
    title: 'Designing for Discretion: The Architecture of Private Communities',
    description:
      'An exploration into how intentional design — from platform UX to real-world experiences — can shape trust, intimacy, and purpose within curated networks.',
    date: '25 June 2025',
    source: 'The New york observer',
  },
  {
    id: 2,
    image: '/media/press_02.png',
    title: 'Time as a Luxury: Reclaiming Stillness in a Demanding World',
    description:
      'An exploration into how intentional design — from platform UX to real-world experiences — can shape trust, intimacy, and purpose within curated networks.',
    date: '25 June 2025',
    source: 'GQ Magazine',
  },
  {
    id: 3,
    image: '/media/press_03.png',
    title: 'Designing for Discretion: The Architecture of Private Communities',
    description:
      'An exploration into how intentional design — from platform UX to real-world experiences — can shape trust, intimacy, and purpose within curated networks.',
    date: '25 June 2025',
    source: 'Nobilis',
  },
  {
    id: 4,
    image: '/media/press_04.png',
    title: 'Time as a Luxury: Reclaiming Stillness in a Demanding World',
    description:
      'An exploration into how intentional design — from platform UX to real-world experiences — can shape trust, intimacy, and purpose within curated networks.',
    date: '25 June 2025',
    source: 'The New york observer',
  },
]

export const LandingPress: FC = () => {
  return (
    <section className='landing-press'>
      <div className='landing-press__content'>
        <h2 className='landing-press__title'>Press & Media</h2>

        <div className='landing-press__grid'>
          {pressArticles.map((article) => (
            <article key={article.id} className='landing-press__card'>
              <img
                src={article.image}
                alt={article.title}
                className='landing-press__image'
              />
              <div className='landing-press__card-content'>
                <h3 className='landing-press__card-title'>{article.title}</h3>
                <p className='landing-press__card-description'>{article.description}</p>
                <div className='landing-press__card-meta'>
                  <span className='landing-press__date'>{article.date}</span>
                  <span className='landing-press__divider'></span>
                  <div className='landing-press__source-wrapper'>
                    <span className='landing-press__source'>{article.source}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className='landing-press__view-all'>view all press</button>
      </div>
    </section>
  )
}