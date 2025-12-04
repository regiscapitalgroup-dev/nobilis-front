import {FC} from 'react'

interface MemberLanguagesProps {
  languages: string[]
}

export const MemberLanguages: FC<MemberLanguagesProps> = ({languages}) => {
  return (
    <div className='member-detail__languages'>
      <div className='member-detail__languages-inner'>
        <div className='member-detail__languages-title'>Language Spoken</div>
        <div className='member-detail__languages-tags'>
          {languages && languages.map((item, index) => (
            <div key={index} className='member-detail__language-tag'>
              <div className='member-detail__language-tag-text'>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
