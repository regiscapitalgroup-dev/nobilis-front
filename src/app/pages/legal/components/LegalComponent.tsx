import React, {FC} from 'react'
import {useLocation} from 'react-router-dom'

interface Subsection {
  subtitle?: string
  paragraphs?: string[]
  bullets?: string[]
  additionalParagraphs?: string[]
  additionalBullets?: string[]
}

interface Section {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  additionalParagraphs?: string[]
  additionalBullets?: string[]
  subsections?: Subsection[]
  importantNotice?: string
}

interface LegalComponentProps {
  title: string
  lastUpdated?: string
  importantNotice?: string
  sections: Section[]
  closingStatement?: string
}

export const LegalComponent: FC<LegalComponentProps> = ({
  title,
  lastUpdated,
  importantNotice,
  sections,
  closingStatement,
}) => {

  const location = useLocation()
  
  const getClosingStatement = () => {
    if (location.pathname.includes('/terms')) {
      return 'By using the Nobilis Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.'
    }
    if (location.pathname.includes('/privacy')) {
      return 'BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY AND CONSENT TO THE COLLECTION, USE, AND DISCLOSURE OF YOUR INFORMATION AS DESCRIBED HEREIN.'
    }
    return null
  }

  const renderSubsection = (subsection: Subsection, sIndex: number) => (
    <div key={`sub-${sIndex}`} className='legal-page__subsection'>
      {subsection.subtitle && <p className='legal-page__paragraph'>{subsection.subtitle}</p>}

      {subsection.paragraphs?.map((paragraph, spIndex) => (
        <p key={`sp-${spIndex}`} className='legal-page__paragraph'>
          {paragraph}
        </p>
      ))}

      {subsection.bullets && (
        <ul className='legal-page__list'>
          {subsection.bullets.map((bullet, sbIndex) => (
            <li key={`sb-${sbIndex}`} className='legal-page__list-item'>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {subsection.additionalParagraphs?.map((paragraph, sapIndex) => (
        <p key={`sap-${sapIndex}`} className='legal-page__paragraph'>
          {paragraph}
        </p>
      ))}

      {subsection.additionalBullets && (
        <ul className='legal-page__list'>
          {subsection.additionalBullets.map((bullet, sabIndex) => (
            <li key={`sab-${sabIndex}`} className='legal-page__list-item'>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  const renderSection = (section: Section, index: number) => (
    <div key={index} className='legal-page__section'>
      <h2 className='legal-page__section-title'>{section.title}</h2>

      {section.importantNotice && (
        <p className='legal-page__paragraph'>{section.importantNotice}</p>
      )}

      {section.paragraphs?.map((paragraph, pIndex) => (
        <p key={`p-${pIndex}`} className='legal-page__paragraph'>
          {paragraph}
        </p>
      ))}

      {section.bullets && (
        <ul className='legal-page__list'>
          {section.bullets.map((bullet, bIndex) => (
            <li key={`b-${bIndex}`} className='legal-page__list-item'>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {section.additionalParagraphs?.map((paragraph, apIndex) => (
        <p key={`ap-${apIndex}`} className='legal-page__paragraph'>
          {paragraph}
        </p>
      ))}

      {section.additionalBullets && (
        <ul className='legal-page__list'>
          {section.additionalBullets.map((bullet, abIndex) => (
            <li key={`ab-${abIndex}`} className='legal-page__list-item'>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {section.subsections?.map((subsection, sIndex) => renderSubsection(subsection, sIndex))}
    </div>
  )

  return (
    <>
      <svg className='legal-page__watermark' viewBox='0 0 20 25' xmlns='http://www.w3.org/2000/svg'>
        <path d='M12.4438 18.6367C12.5961 19.546 13.0832 21.5453 13.8139 22.2725C13.6629 22.7233 13.0918 23.8893 12.0131 24.9727V25C12.0086 24.9955 12.0039 24.9908 11.9994 24.9863C11.995 24.9907 11.9911 24.9956 11.9867 25V24.9727C10.9079 23.8892 10.3369 22.7233 10.1859 22.2725C10.9165 21.5452 11.4038 19.5459 11.5561 18.6367H12.4438ZM7.44571 17.7275C7.14127 18.3337 6.80678 19.6364 7.90274 20C8.99841 20.3633 9.57652 19.2428 9.72891 18.6367H10.643C10.4907 20.1519 9.63771 22.9091 7.44571 21.8184C5.25364 20.7275 6.5323 18.6367 7.44571 17.7275ZM16.5541 17.7275C17.4675 18.6368 18.7458 20.7275 16.5541 21.8184C14.3621 22.9092 13.5092 20.1519 13.3568 18.6367H14.2699C14.4223 19.2428 15.0011 20.3636 16.0971 20C17.1929 19.6364 16.8585 18.3337 16.5541 17.7275ZM14.7309 16.1826C15.2329 16.1826 15.64 16.5897 15.64 17.0918C15.6399 17.5938 15.2329 18.001 14.7309 18.001H9.2416C8.73975 18.0008 8.33252 17.5937 8.33243 17.0918C8.33243 16.5898 8.73969 16.1828 9.2416 16.1826H14.7309ZM0.13809 12.7285C1.24013 8.63713 9.72855 9.54643 11.099 15.4551H9.2709C8.66173 14.6974 6.89541 13.1826 4.70352 13.1826C1.96374 13.183 2.4208 16.8528 5.61758 15.9102C3.63881 16.8192 -0.840974 16.3638 0.13809 12.7285ZM12.8998 15.4551C14.2702 9.5463 22.7597 8.6371 23.8617 12.7285C24.8407 16.3637 20.361 16.8192 18.3822 15.9102C21.5791 16.8528 22.0355 13.1826 19.2953 13.1826C17.1037 13.1827 15.3382 14.6974 14.7289 15.4551H12.8998ZM12.0131 0.0449219C12.9367 1.58458 14.8221 5.11178 15.184 7.27246C15.6407 9.99973 14.2703 10.4547 13.3568 11.8184C12.6626 12.8549 12.1892 14.5207 12.0131 15.334V15.4541C12.0092 15.4348 12.0037 15.4151 11.9994 15.3945C11.9951 15.4151 11.9906 15.4349 11.9867 15.4541V15.3359C11.8109 14.5234 11.3377 12.8557 10.643 11.8184C9.72956 10.4547 8.35912 9.99973 8.81582 7.27246C9.17776 5.11171 11.0632 1.5845 11.9867 0.0449219V0Z' />
      </svg>

      <section className='legal-page'>
        <div className='legal-page__container'>
          <div className='legal-page__content'>
            <h1 className='legal-page__title'>{title}</h1>

            <div className='legal-page__paragraph'>Last Updated: October 15, 2025</div>
            {importantNotice && (
              <p className='legal-page__paragraph legal-page__paragraph--important'>
                {importantNotice}
              </p>
            )}

            {sections.map((section, index) => renderSection(section, index))}

            <p
              className='legal-page__paragraph legal-page__paragraph--closing'
              style={{textTransform: 'uppercase', fontWeight: '600'}}
            >
              {getClosingStatement()}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
