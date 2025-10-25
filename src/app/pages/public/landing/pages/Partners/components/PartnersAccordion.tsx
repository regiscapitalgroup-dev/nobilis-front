// PartnersAccordion.tsx
import React, {FC, useState} from 'react'

interface AccordionItem {
  id: string
  title: string
  content: {
    subtitle?: string
    sections: Array<{
      title: string
      description: string
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
          },
          {
            title: 'Extraordinary Travel Experiences',
            description:
              'Bespoke journeys to the worlds most remarkable destinations—iconic safaris, polar expeditions, swimming with whales, even space travel—creating unforgettable memories and lasting positive impressions.',
          },
          {
            title: 'Our Requirements',
            description:
              'Verified Excellence – A proven reputation in the luxury market, impeccable references, and the ability to meet the expectations of our ultra-high-net-worth clientele.\nAbsolute Discretion & Security – A commitment to rigorous privacy agreements and flawless guest confidentiality at every stage.',
          },
        ],
        footer:
          'If your destination offers experiences few can access but everyone remembers, Nobilis invites you to apply as a trusted Travel Partner.',
      },
      primaryImage: '/media/part_01.png',
      secondaryImage: '/media/part_02.png',
    },
    {
      id: 'philanthropic',
      title: 'Philanthropic Organizations',
      content: {
        subtitle:
          'We help charities raise funds for meaningful causes, ensuring lasting legacies and global impact.',
        sections: [
          {
            title: 'What Partners Receive',
            description:
              'Presenting causes to a highly engaged, financially robust audience that values philanthropy and legacy giving.\nCollaboration on exclusive events (e.g., galas, auctions) designed to showcase your mission and attract high-value donors.',
          },
          {
            title: 'Requirements',
            description:
              'Registered charity status, transparent financials, and verifiable outcomes.\nA clear mission statement that aligns with our Members values.\nCommitment to ethical fundraising and responsible use of funds.\nFor your safety, We do Love Eko.',
          },
        ],
        footer:
          'If you are working to make a real difference and would like to attract high-net-worth individuals, Nobilis invites you to join us as an Approved Philanthropic Partner.',
      },
      primaryImage: '/media/part_02.png',
      secondaryImage: '/media/part_03.png',
    },
    {
      id: 'experts',
      title: 'Experts',
      content: {
        subtitle: 'Verified experts guide Members through personal development.',
        sections: [
          {
            title: 'Knowledge Sharing',
            description:
              'Deliver short, powerful insights to Members eager for transformative guidance across business, health, mindfulness, leadership, creativity, and more.',
          },
        ],
      },
      primaryImage: '/media/part_03.png',
      secondaryImage: '/media/part_01.png',
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
                  <div className='partners-accordion__icon-line' />
                </div>
              </button>

              {openItem === item.id && (
                <div className='partners-accordion__body'>
                  {item.content.subtitle && (
                    <h4 className='partners-accordion__subtitle'>{item.content.subtitle}</h4>
                  )}

                  {item.content.sections.map((section, index) => (
                    <div key={index} className='partners-accordion__section'>
                      <h5 className='partners-accordion__section-title'>{section.title}</h5>
                      <p className='partners-accordion__section-description'>
                        {section.description}
                      </p>
                    </div>
                  ))}

                  {item.content.footer && (
                    <p className='partners-accordion__footer'>
                      {item.content.footer.split('Nobilis invites you')[0]}
                      <strong>
                        Nobilis invites you{item.content.footer.split('Nobilis invites you')[1]}
                      </strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <div className='partners-accordion__images'>
          <img
            key={`primary-${currentItem.id}`}
            src={currentItem.primaryImage}
            alt={currentItem.title}
            className='partners-accordion__image partners-accordion__image--primary'
          />
          <img
            key={`secondary-${currentItem.id}`}
            src={currentItem.secondaryImage}
            alt='Next preview'
            className='partners-accordion__image partners-accordion__image--secondary'
          />
        </div> */}
      </div>
    </section>
  )
}
