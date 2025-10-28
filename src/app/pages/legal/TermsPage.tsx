import {FC} from 'react'
import {LegalComponent} from './components/LegalComponent'
import { TermsData } from './data/TermsData'
import { withLegalLayout } from './WithLegalLayout'

const TermsPageBase: FC = () => {
  return <LegalComponent title={TermsData.title} sections={TermsData.sections} />
}

export const TermsPage = withLegalLayout(TermsPageBase)