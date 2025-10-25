import React, {FC} from 'react'

interface LandingTestimonialProps {
  quote?: string
  author?: string
}

export const LandingTestimonial: FC<LandingTestimonialProps> = ({
  quote = '"Finally, a digital space that unites people like me"',
  author = '— Founding Member T.A.',
}) => {
  return (
    <section className='landing-testimonial'>
      <div className='landing-testimonial__content'>
        <div className='landing-testimonial__watermark'>"</div>
        <div className='landing-testimonial__quote-container'>
          <blockquote className='landing-testimonial__quote'>
            {quote}
            <br />
            <span className='landing-testimonial__author'>{author}</span>
          </blockquote>
        </div>
      </div>
    </section>
  )
}