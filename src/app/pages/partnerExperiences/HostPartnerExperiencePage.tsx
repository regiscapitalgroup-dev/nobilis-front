import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { GenericModel } from '../teamExperiences/models/GenericModel'
import { SectionOnReview } from './components/SectionOnReview'
import { SectionActive } from './components/SectionActive'
import { SectionPast } from './components/SectionPast'

const HostPartnerExperiencePage: FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)
    const [activeTab, setActiveTab] = useState(1)
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const opc = Number(params.get("opc") ?? 1);

    const tabs:Array<GenericModel> = [
        { id: 1, name: 'On Review' },
        { id: 2, name: 'Active Experiences' },
        // { id: 3, name: 'Past Experiences' },
    ]

    useEffect(() => {
        restoreRef.current = config
        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })
        /* validamos si tiene una opcion seleccionada */
        if(opc){
            setActiveTab(opc);
        }
        return () => setLayout(restoreRef.current)
    }, [])

    const changeTab = async (status: number) => {
        setActiveTab(status);
        setParam('opc',`${status}`);
    }

    const setParam = (key:string, value:string) => {
        const params = new URLSearchParams(location.search);
        params.set(key, value);

        history.push({
            pathname: location.pathname,
            search: params.toString(),
        });
    };

    const renderContentOptionSelected = () => {
        switch (activeTab) {
            case 1:
                return (<SectionOnReview />);
            case 2:
                return (<SectionActive />);
            case 3:
                return (<SectionPast />);
            default:
                return null;
        }
    }

    return (
        <div className="tap-host-wrapper">
            <div className="tap-host-container">

                <div className="tap-host-title-block">
                    <div className="tap-host-title">My Experiences</div>
                </div>

                <div className="tap-host-section">
                    <div className='w-100 d-flex flex-row justify-content-between'>
                        <Link to="/host-experience" className="tap-add-experience-2-btn-main">
                            <div className="tap-host-button-text tap-flex-center">
                                HOST EXPERIENCE &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                            </div>
                        </Link>
                        <div role='button' onClick={()=>{ history.push(`/partner/my-experiences/draft`) }} className="tap-host-secction-experiences-past-btn-view cursor-pointer">
                            <span>Select from draft</span>
                        </div>
                    </div>

                    <div className="card">
                        <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-bottom-0">
                            {tabs.map((item:any,index:number)=>(<div className='d-flex flex-row' key={`tabs-experiences-${index}`}>
                                <li className="nav-item">
                                    <a className={`nav-link text-capitalize ${activeTab === item.id ? "active" : ""}`}
                                        onClick={() => changeTab(item.id)}>
                                        {item.name}
                                    </a>
                                </li>
                                <li className={`separator-vertical ${index < tabs.length-1 ? 'd-flex' : 'd-none'}`}>
                                    <hr />
                                </li>
                            </div>))}
                        </ul>
                    </div>
                </div>
                <div className="tap-host-footer">
                    {renderContentOptionSelected()}
                </div>
            </div>
        </div>

    )
}

export { HostPartnerExperiencePage }
