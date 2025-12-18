import {FC} from 'react'

interface ProfileMemberIntroductionsProps {
  introduction: any[]
}

export const ProfileMemberIntroductions: FC<ProfileMemberIntroductionsProps> = ({
  introduction,
}) => {
  return (
    <div className='nb-pm-info__introductions'>
      <div className='nb-pm-info__introductions-title'>Introductions</div>
      <div className='nb-pm-info__introductions-tags'>
        {introduction.map((item: any, index: number) => (
          <div key={index} className='nb-pm-info__introduction-tag'>
            {item.title || item}
          </div>
        ))}
      </div>
    </div>
  )
}