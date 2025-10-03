import {FC} from 'react'

interface ServiceCardProps {
  title: string
  description: string
  rate: string
  rateType: string
}

const ServiceCard: FC<ServiceCardProps> = ({title, description, rate, rateType}) => {
  return (
    <div className='service-card'>
      <div className='service-card__title'>{title}</div>
      <div className='service-card__content'>
        <div className='service-card__description'>
          <div className='service-card__text'>{description}</div>
        </div>
        <div className='service-card__rate'>
          <div className='service-card__rate-label'>Rate</div>
          <div className='service-card__rate-value'>
            {rate}/{rateType}
          </div>
        </div>
      </div>
    </div>
  )
}

const ExpertiseTab: FC = () => {
  const services = [
    {
      title: 'Professional Knowledge Sharing',
      description:
        "I'm available to share insights on building founder-led companies, long-term brand strategy, and scaling philanthropic ventures with integrity. I've mentored early-stage leaders, advised family offices, and spoken at private leadership summits — and I welcome thoughtful exchanges around these topics.",
      rate: '$23',
      rateType: 'hour',
    },
    {
      title: 'Strategic Marketing Consultation',
      description:
        "I offer expertise in digital marketing strategies, brand positioning, and consumer engagement. My experience includes working with startups to enhance their online presence and optimize their marketing funnels. I'm open to discussing innovative marketing approaches that drive results.",
      rate: '$23',
      rateType: 'project',
    },
  ]

  return (
    <div className='expertise-tab'>
      <div className='expertise-tab__services'>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            rate={service.rate}
            rateType={service.rateType}
          />
        ))}
      </div>
    </div>
  )
}

export {ExpertiseTab}
