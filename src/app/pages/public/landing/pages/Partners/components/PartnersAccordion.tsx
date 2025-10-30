import React, {FC, useState} from 'react'
import { KTSVG } from '../../../../../../../_metronic/helpers'

interface AccordionItem {
  id: string
  title: string
  content: {
    subtitle?: string
    introText?: string
    sections: Array<{
      title: string
      description: string
      hasBullets?: boolean
    }>
    footer?: string
  }
  primaryImage: string
  secondaryImage: string
}

export const PartnersAccordion: FC = () => {
  const [openItem, setOpenItem] = useState<string>('travel')

  const items: AccordionItem[] = [
    {
      id: 'travel',
      title: 'Travel Partners',
      content: {
        subtitle: 'What We Seek in Travel Partners?',
        sections: [
          {
            title: 'Unique Venues & Rare Access',
            description:
              'Properties, clubs, or sites that are difficult to reach or normally closed to the public—UNESCO heritage locations requiring permits, invitation-only golf or yacht clubs, private islands, or cultural and scientific institutions available for private after-hours visits as well as distinctive health retreats in extraordinary settings.',
            hasBullets: false,
          },
          {
            title: 'Extraordinary Travel Experiences',
            description:
              "Bespoke journeys to the world's most remarkable destinations—iconic safaris, polar expeditions, swimming with whales, even space travel—creating unforgettable memories and lasting positive impressions.",
            hasBullets: false,
          },
          {
            title: 'Our Requirements',
            description:
              'Verified Excellence – A proven reputation in the luxury market, impeccable references, and the ability to meet the expectations of our ultra-high-net-worth clientele.\nAbsolute Discretion & Security – A commitment to rigorous privacy agreements and flawless guest confidentiality at every stage.',
            hasBullets: true,
          },
        ],
        footer:
          'If your destination offers experiences few can access but everyone remembers, Nobilis invites you to apply as a trusted Travel Partner.',
      },
      primaryImage: '/media/partner_01.png',
      secondaryImage: '/media/in-par-02.png',
    },
    {
      id: 'philanthropic',
      title: 'Philanthropic Organizations',
      content: {
        subtitle:
          'We help charities raise funds for meaningful causes, creating lasting legacies and global impact.',
        sections: [
          {
            title: 'Requirements for Philanthropic Partners:',
            description:
              'The charity must be represented by its founder or official leader, who must be a current Nobilis Member.\nThe organization must have an impeccable reputation and agree to provide transparency on how funds collected through Nobilis events are spent.',
            hasBullets: true,
          },
        ],
        footer:
          'Together, we create unique events that make a difference and leave a lasting mark on the world.',
      },
      primaryImage: '/media/partner_02.png',
      secondaryImage: '/media/in-par-03.png',
    },
    {
      id: 'experts',
      title: 'Experts',
      content: {
        introText: "Nobilis offers 15 exclusive spots for external partners—renowned experts representing the most influential industries, including investments and finance, health and longevity, art and culture, advanced technology, sustainability, and other sectors essential to our Members' lives and legacies.",    
        sections: [
          {
            title: 'What Partners Receive',
            description:
              'Direct access to present cutting-edge knowledge and market perspectives to Nobilis members.\nOpportunities to host discussions and be invited to Mastermind Circles.',
            hasBullets: true,
          },
          {
            title: 'Requirements',
            description:
              'Insight Leadership: Provide Nobilis with early, high-value market intelligence and lead discussions for Members on emerging trends before they reach the wider market.\nCredentials: Recognized leaders with a proven record of innovation, insight, and influence.\nReputation: Only top-tier professionals or firms with impeccable standing and verified references will be considered.\nPay annual fee to keep the spot.',
            hasBullets: true,
          },
        ],
        footer:
          'Nobilis partners are selected by invitation and must meet the highest standards of expertise and credibility to ensure lasting value for our community.',
      },
      primaryImage: '/media/partner_03.png',
      secondaryImage: '/media/in-par-01.png',
    },
  ]

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? '' : id)
  }

  const currentItem = items.find((item) => item.id === openItem) || items[0]

  return (
    <section className='partners-accordion'>
      <div className='partners-accordion__container'>
        <div className='partners-accordion__content'>
          {items.map((item) => (
            <div
              key={item.id}
              className={`partners-accordion__item ${
                openItem === item.id ? 'partners-accordion__item--open' : ''
              }`}
            >
              <button className='partners-accordion__header' onClick={() => handleToggle(item.id)}>
                <h3 className='partners-accordion__title'>{item.title}</h3>
                <div className='partners-accordion__icon'>
                <KTSVG path='/media/svg/nobilis/care-down.svg' className='svg-icon-2' />
                </div>
              </button>

              {openItem === item.id && (
                <div className='partners-accordion__body'>
                  {item.content.subtitle && (
                    <h4 className='partners-accordion__subtitle'>{item.content.subtitle}</h4>
                  )}
                  
                  {item.content.introText && (
                    <p className='partners-accordion__intro-text'>{item.content.introText}</p>
                  )}

                  {item.content.sections.map((section, index) => (
                    <div key={index} className='partners-accordion__section'>
                      <h5 className='partners-accordion__section-title'>{section.title}</h5>
                      {section.hasBullets ? (
                        <ul className='partners-accordion__section-list'>
                          {section.description.split('\n').map((line, i) => (
                            <li key={i} className='partners-accordion__section-list-item'>
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className='partners-accordion__section-description'>
                          {section.description}
                        </p>
                      )}
                    </div>
                  ))}

                  {item.content.footer && (
                    <p className='partners-accordion__footer'>{item.content.footer}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='partners-accordion__images'>
          <img
            key={`primary-${currentItem.id}`}
            src={currentItem.primaryImage}
            alt={currentItem.title}
            className='partners-accordion__image partners-accordion__image--primary'
          />
          <img
            key={`secondary-${currentItem.id}`}
            src={currentItem.secondaryImage}
            alt='Preview'
            className='partners-accordion__image partners-accordion__image--secondary'
          />
        </div>
      </div>
    </section>
  )
}