import {FC, useState} from 'react'
import { useUserProfileContext } from '../../../../context/UserProfileContext'

const BiographyTab: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const {data, loading} = useUserProfileContext()
  const fullText = [
    `Nam tristique sodales arcu id tempor. Donec luctus pulvinar velit quis malesuada. Aenean sollicitudin dui felis, sit amet pulvinar nisl dignissim id. Etiam varius varius enim, a aliquet mauris lobortis eu. Proin sed lectus id sapien dapibus placerat. Suspendisse molestie ante ante, sed tempus urna vestibulum tempus. Ut sed aliquam lacus. Suspendisse eget dolor a elit efficitur lobortis vel ac enim. Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.

Curabitur in congue ligula, vel facilisis tellus. Aenean nec lacus semper dui tristique fringilla.Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.`,

    `Nam tristique sodales arcu id tempor. Donec luctus pulvinar velit quis malesuada. Aenean sollicitudin dui felis, sit amet pulvinar nisl dignissim id. Etiam varius varius enim, a aliquet mauris lobortis eu. Proin sed lectus id sapien dapibus placerat. Suspendisse molestie ante ante, sed tempus urna vestibulum tempus. Ut sed aliquam lacus. Suspendisse eget dolor a elit efficitur lobortis vel ac enim. Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.

Curabitur in congue ligula, vel facilisis tellus. Aenean nec lacus semper dui tristique fringilla.Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.`,

    // Párrafos adicionales que se muestran al expandir
    `Nam tristique sodales arcu id tempor. Donec luctus pulvinar velit quis malesuada. Aenean sollicitudin dui felis, sit amet pulvinar nisl dignissim id. Etiam varius varius enim, a aliquet mauris lobortis eu. Proin sed lectus id sapien dapibus placerat. Suspendisse molestie ante ante, sed tempus urna vestibulum tempus. Ut sed aliquam lacus. Suspendisse eget dolor a elit efficitur lobortis vel ac enim. Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.`,

    `Curabitur in congue ligula, vel facilisis tellus. Aenean nec lacus semper dui tristique fringilla.Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.`,

    `Nam tristique sodales arcu id tempor. Donec luctus pulvinar velit quis malesuada. Aenean sollicitudin dui felis, sit amet pulvinar nisl dignissim id. Etiam varius varius enim, a aliquet mauris lobortis eu. Proin sed lectus id sapien dapibus placerat. Suspendisse molestie ante ante, sed tempus urna vestibulum tempus. Ut sed aliquam lacus. Suspendisse eget dolor a elit efficitur lobortis vel ac enim. Etiam vel velit id erat imperdiet porta. Morbi vulputate et odio elementum finibus. In facilisis ante a augue volutpat, sed vestibulum purus dapibus. Morbi tincidunt leo ut erat congue, non commodo lorem vulputate.`,
  ]

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='bio-tabs__panel'>
      <div className='bio-tabs__text'>
        <p>{fullText[0]}</p>
        <p>{fullText[1]}</p>

        {isExpanded && (
          <>
            <p>{fullText[2]}</p>
            <p>{fullText[3]}</p>
            <p>{fullText[4]}</p>
          </>
        )}
        <div className='bio-tabs__readmore mb-15' onClick={toggleExpanded}>
          <div>Read more</div>
        </div>
      </div>
    </div>
  )
}

export {BiographyTab}
