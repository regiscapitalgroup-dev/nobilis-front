import { FC, useEffect, useRef } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { KTSVG } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'

const AddExperienceDraftPage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)

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
                Draft is Saved
            </div>
            <div className="tap-add-experience-success-subtitle">
                Your experience is saved as a draft. You can return anytime to edit or publish it from My Experiences &gt; Drafts.
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
                    <div>Go to dashboard</div>
                </Link>
                <Link to={'/my-experience'} className="tap-add-experience-success-btn-underline">
                    <div>check the draft</div>
                </Link>
            </div>
        </div>
    </div>)
}

export { AddExperienceDraftPage }