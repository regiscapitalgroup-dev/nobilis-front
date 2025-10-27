import React, {FC, useState, useEffect} from 'react'

interface Testimonial {
  quote: string
  author: string
}

export const LandingTestimonial: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      quote: '"Finally, a digital space that unites people like me"',
      author: '— Founding Member, Serial Entrepreneur, Investor, Philanthropist',
    },
    {
      quote:
        '"In my world, trust is everything. Nobilis gives me the confidence to share, learn, and build new paths without noise."',
      author: '— Founding Member, Olympic Athlete',
    },
    {
      quote: '"Nobilis feels like the next chapter of how people will truly connect."',
      author: '— Founding Member, Public figure, Artist',
    },
    {
      quote: "It's beautiful to see my children learning from inspiring people across the world.",
      author: '— Founding Member, Legacy Holder & Mother',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className='landing-testimonial'>
      <div className='landing-testimonial__content'>
        <div className='landing-testimonial__watermark'>“</div>
        <div className='landing-testimonial__quote-container'>
          <div key={currentIndex} className='landing-testimonial__text-wrapper'>
            <p className='landing-testimonial__quote'>{currentTestimonial.quote}</p>
            <p className='landing-testimonial__author'>{currentTestimonial.author}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
