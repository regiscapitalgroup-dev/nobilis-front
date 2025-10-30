import {FC} from 'react'
import {LegalComponent} from './components/LegalComponent'
import { TermsData } from './data/TermsData'
import { withLegalLayout } from './WithLegalLayout'

const TermsPageBase: FC = () => {
  return (
    <LegalComponent 
      title={TermsData.title}
      lastUpdated={TermsData.lastUpdated}
      importantNotice={TermsData.importantNotice}
      sections={TermsData.sections}
      closingStatement={TermsData.closingStatement}
    />
  )
}

export const TermsPage = withLegalLayout(TermsPageBase)