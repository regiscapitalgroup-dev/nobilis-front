import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { SectionDraft } from './components/SectionDraft'

const ExperiencesInProgressPage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const history = useHistory();
    const location = useLocation();

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

    return (
        <div className="tap-host-wrapper">
            <div className="tap-host-container">

                <div className="tap-host-title-block">
                    <div className="tap-host-title">Experiences in Progress</div>
                </div>
                <div className="tap-host-footer">
                    <SectionDraft />
                </div>
            </div>
        </div>

    )
}

export { ExperiencesInProgressPage }
