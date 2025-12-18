import React, { createContext, useState } from 'react'
import { KTSVG } from '../../_metronic/helpers'

type ConfirmOptions = {
  title: string
  message: string
}

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null)

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const [resolver, setResolver] = useState<(value: boolean) => void>()

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts)
    setOpen(true)

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve)
    })
  }

  const handleConfirm = () => {
    resolver?.(true)
    close()
  }

  const handleCancel = () => {
    resolver?.(false)
    close()
  }

  const close = () => {
    setOpen(false)
    setOptions(null)
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {open && options && (
        <div className="tap-experience-nb-modal-overlay">
          <div className="tap-experience-nb-modal-container tap-flex-center flex-column">
            <h2 className="tap-experience-nb-modal-title">{options.title}</h2>
            <p className="tap-experience-nb-modal-text">
              {options.message}
            </p>

            <div className="decline-experience__actions">
              <button className="decline-experience__btn decline-experience__btn--secondary" onClick={handleCancel}>
                Cancel
              </button>

              <button className="decline-experience__btn decline-experience__btn--primary" onClick={handleConfirm}>
                Confirm
                &nbsp;<KTSVG path='/media/svg/nobilis/vector02.svg' />
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}
