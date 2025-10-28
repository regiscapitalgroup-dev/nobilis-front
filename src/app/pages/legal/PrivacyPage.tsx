import {FC} from 'react'
import {LegalComponent} from './components/LegalComponent'
import {PrivacyData} from './data/PrivacyData'
import { withLegalLayout } from './WithLegalLayout'

const PrivacyPageBase: FC = () => {
  return <LegalComponent title={PrivacyData.title} sections={PrivacyData.sections} />
}

export const PrivacyPage = withLegalLayout(PrivacyPageBase)