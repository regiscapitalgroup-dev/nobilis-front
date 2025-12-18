import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { KTSVG } from '../../../_metronic/helpers'
import { Link, useHistory } from 'react-router-dom'

const AddExperienceSuccessPage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const history = useHistory()

    useEffect(() => {
        restoreRef.current = config

        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })

        return () => setLayout(restoreRef.current)
    }, [])

    return (<div className='tap-flex-center'>
        <div className="tap-add-experience-success-container">
            <div className="tap-add-experience-success-title">
                Your experience has been successfully submitted.
            </div>
            <div className="tap-add-experience-success-subtitle">
                Thank you for your active role in Nobilis. You’ll be notified once your experience is approved and visible to members—or if additional changes are required.
            </div>
            <div className="tap-add-experience-success-icon-wrapper">
                <div className='line-svg'>
                    <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-line-icon.svg' />
                </div>
                <div className='icon-svg'>
                    <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-icon.svg' />
                </div>
                <div className='line-svg'>
                    <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-line-icon.svg' />
                </div>
                {/* <div className="tap-add-experience-success-icon" /> */}
            </div>
            <div className="tap-add-experience-success-buttons">
                <Link to={'/host-experience'} className="tap-add-experience-success-btn-secondary">
                    <div>explore community</div>
                </Link>
            </div>
        </div>
    </div>)
}

export { AddExperienceSuccessPage }