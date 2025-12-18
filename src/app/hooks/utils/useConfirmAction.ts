import { useContext } from 'react'
import { ConfirmContext } from '../../helpers/alertConfirm'

type ConfirmParams = {
  title: string
  message: string
}

export const useConfirmAction = () => {
  const context = useContext(ConfirmContext)

  if (!context) {
    throw new Error('useConfirmAction must be used within ConfirmProvider')
  }

  return (params: ConfirmParams): Promise<boolean> => {
    return context.confirm(params)
  }
}
