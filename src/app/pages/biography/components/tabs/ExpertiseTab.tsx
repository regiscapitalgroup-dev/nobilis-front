import { FC } from 'react'
import { useUserProfileContext } from '../../../../context/UserProfileContext'

interface ServiceCardProps {
  title: string
  description: string
  rate: string
  rateType?: string
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, rate, rateType }) => {
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
            {rate}
            {rateType ? `/${rateType}` : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

const ExpertiseTab: FC = () => {
  const { data } = useUserProfileContext()

  const services = data?.expertise || []

  if (!services.length) {
    return (
      <div className='expertise-tab'>
        <div className='expertise-tab__empty'>No expertise information available.</div>
      </div>
    )
  }

  return (
    <div className='expertise-tab'>
      <div className='expertise-tab__services'>
        {services.map((service: any, index: number) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.content}
            rate={service.rate}
            rateType={service.rateType}
          />
        ))}
      </div>
    </div>
  )
}

export { ExpertiseTab }
