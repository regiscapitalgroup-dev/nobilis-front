// app/pages/profileMembers/components/ProfileMemberLanguages.tsx
import {FC} from 'react'

interface ProfileMemberLanguagesProps {
  languages: string[]
}

export const ProfileMemberLanguages: FC<ProfileMemberLanguagesProps> = ({languages}) => {
  return (
    <div className='nb-pm-languages'>
      <div className='nb-pm-languages-inner'>
        <div className='nb-pm-languages-title'>Language Spoken</div>
        <div className='nb-pm-languages-tags'>
          {languages.map((item, index) => (
            <div key={index} className='nb-pm-language-tag'>
              <div className='nb-pm-language-tag-text'>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}