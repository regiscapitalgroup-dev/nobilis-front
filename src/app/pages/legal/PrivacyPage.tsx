import {FC} from 'react'
import {LegalComponent} from './components/LegalComponent'
import {PrivacyData} from './data/PrivacyData'
import { withLegalLayout } from './WithLegalLayout'

const PrivacyPageBase: FC = () => {
  return (
    <LegalComponent 
      title={PrivacyData.title}
      lastUpdated={PrivacyData.lastUpdated}
      importantNotice={PrivacyData.importantNotice}
      sections={PrivacyData.sections}
      closingStatement={PrivacyData.closingStatement}
    />
  )
}

export const PrivacyPage = withLegalLayout(PrivacyPageBase)