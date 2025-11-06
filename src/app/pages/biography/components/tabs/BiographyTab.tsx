import {FC, useState} from 'react'
import {useUserProfileContext} from '../../../../context/UserProfileContext'

const CHARACTER_LIMIT = 400

const BiographyTab: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const {data} = useUserProfileContext()

  const truncateText = (text: string, limit: number): string => {
    if (text.length <= limit) return text
    
    const truncated = text.slice(0, limit)
    const lastSpace = truncated.lastIndexOf(' ')
    
    return truncated.slice(0, lastSpace > 0 ? lastSpace : limit) + '...'
  }

  const biography = data?.biography || ''
  const shouldTruncate = biography.length > CHARACTER_LIMIT

  const displayText = isExpanded || !shouldTruncate 
    ? biography 
    : truncateText(biography, CHARACTER_LIMIT)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!biography) {
    return (
      <div className='bio-tabs__panel' >
        <div className='bio-tabs__text'>
          <p>No biography available.</p>
        </div>        
      </div>
    )
  }

  return (
    <div className='bio-tabs__panel'>
      <div className='bio-tabs__text'>
        <p>{displayText}</p>

        {shouldTruncate && (
          <div className='bio-tabs__readmore mb-15' onClick={toggleExpanded}>
            <div>{isExpanded ? 'Read less' : 'Read more'}</div>
          </div>
        )}
      </div>      
    </div>
  )
}

export {BiographyTab}