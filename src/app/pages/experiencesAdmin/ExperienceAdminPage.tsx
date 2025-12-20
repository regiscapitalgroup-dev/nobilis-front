import React, { useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { getDetailExperience } from '../../services/teamExperienceService'
import { ExperienceShort } from '../teamExperiences/models/ExperienceSummaryModel';
import Pagination from '../components/Pagination';
import { useHistory } from 'react-router-dom';
import { DetailExperienceDrawer } from './components/DetailExperienceDrawer'
import { EXPERIENCE_STATUS, EXPERIENCE_STATUS_LIST } from '../teamExperiences/models/ExperienceStatus';
import { getExperiencesByStatus } from '../../services/adminExperiencesService';
import { KTSVG } from '../../../_metronic/helpers';

interface SearchProps {
    limit:number;
    offset:number;
    status:string;
    search?:string;
    type?:string;
}

const ExperienceAdminPage: React.FC = () => {
    const { config, setLayout } = useLayout()
    const restoreRef = useRef(config)

    const [isLoader, setIsLoader] = useState(true);
    const [messageLoader, setMessageLoader] = useState("Loading...")

    const [tabs, setTabs] = useState<any>()
    const [activeTab, setActiveTab] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [experiences, setExperiences] = useState<ExperienceShort[]>([]);
    const [openDetail, setOpenDetail] = useState(false)
    const [experience, setExperience] = useState(0)
    
    const [totalRows, setTotalRows] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const history = useHistory()

    const experienceStatusList:any = [
      { id: EXPERIENCE_STATUS.PUBLISHED, code: 'active', name: 'Active' },
      { id: `${EXPERIENCE_STATUS.PENDING},${EXPERIENCE_STATUS.DRAFT}`, code: 'pending', name: 'Members' },
      { id: `${EXPERIENCE_STATUS.DRAFT},${EXPERIENCE_STATUS.PENDING}`, code: 'pending', name: 'Partner' },
      // { id: EXPERIENCE_STATUS.DRAFT, code: '', name: 'Suggested' },
      { id: EXPERIENCE_STATUS.PRE_LAUNCH, code: 'preLaunch', name: 'Pre launch' },
      { id: EXPERIENCE_STATUS.REJECTED, code: 'declined', name: 'Decline' },
    ]
    
    const limit = 10;

    const fetchData = async (params:SearchProps,showLoader:boolean=false) => {
        try {
            setIsLoader(true);
            if(params.status === `${EXPERIENCE_STATUS.PENDING},${EXPERIENCE_STATUS.DRAFT}`){
                params.type = 'member';
            }else if(params.status === `${EXPERIENCE_STATUS.DRAFT},${EXPERIENCE_STATUS.PENDING}`){
                params.type = 'partner';
            }
            const experiences_ = await getExperiencesByStatus(params)
            setExperiences(experiences_.results);
            setTabs(experiences_.stats);
            setIsLoader(false);
            setTotalRows(Number(experiences_?.count));
        } catch (error) {
            history.goBack();
        }
    }
    
    const getExperienceDetail = async (id:number) => {
        const experience_ = await getDetailExperience(id);
        setExperience(experience_);
    }

    useEffect(() => {
        restoreRef.current = config
        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })        
        return () => {
            setLayout(restoreRef.current)
        }
    }, [])

    useEffect(() => {
        console.log('useEffect',activeTab);
        setCurrentPage(1);
        const handler = setTimeout(() => {
            fetchData({ limit, offset: 0, status: (activeTab ?? 1), search: searchTerm });
            if(!activeTab) setActiveTab(1);
        }, 2000);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const totalPages = totalRows ? Math.ceil(totalRows / limit) : 1;

    const changeTab = async (status:string) => {
        setActiveTab(status);
        await fetchData({ limit, offset: 0, status });
    }

    const handlePageChange = async (page: number) => {
        const offset = (page - 1) * limit;
        await fetchData({ limit, offset, status: activeTab });
        setCurrentPage(page);
    };

    const searchInList = (event: any) => {
        if (event.key === 'Enter') {
            setCurrentPage(1);
            fetchData({ limit, offset: 0, status: activeTab, search: searchTerm });
        }
    }

    const handleOpenDetail = async (id:number) => {
        await getExperienceDetail(id);
        await setOpenDetail(true);
    }

    const renderCells = (
        items: any[],
        isLoading: boolean,
        getValue: (u: any) => React.ReactNode,
        keyPrefix: string,
        skeletonWidth: string = '70%',
        styleCell: 'admin-experience-page-table__cell--bold' | '' = 'admin-experience-page-table__cell--bold',
        isDate: boolean = false,
    ) => {
        if (isLoading) {
            return Array.from({ length: limit }).map((_, index) => (
                <div key={`${keyPrefix}-${index}`}
                    className={`table__cell ${index === 0 ? 'table__cell--bold' : ''}`}>
                    <span className='skeleton skeleton--text' style={{ width: skeletonWidth }} />
                </div>
            ))
        }
        return items.map((u, index) => (
            <div onClick={()=>handleOpenDetail(u.id)}
                key={`${keyPrefix}-${index}`}
                className={`cursor-pointer admin-experience-page-table__cell ${styleCell}`}>
                {keyPrefix === 'submittedBy'
                    ? getValue({ name: u.submittedBy.name, image: u.submittedBy.image })
                    : getValue(u)}
            </div>
        ))
    }

    return (<div className='admin-experience-page'>
        <div className='admin-experience-page__container'>
            <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
                <h1 className='admin-experience-page__title'>Experiences</h1>
                <button className="tap-add-experience-2-btn-secondary" onClick={()=>history.push(`/my-experience`)}>
                    <KTSVG path='/media/svg/nobilis/calendar-edit.svg' />
                    <span>&nbsp;&nbsp;Create Experience</span>
                </button>
            </div>
            <div className="card">
                <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-bottom-0">
                    {experienceStatusList.map((item:any,index:number)=>(<div className='d-flex flex-row' key={`tabs-experiences-${index}`}>
                        <li className="nav-item">
                            <a className={`nav-link text-capitalize ${activeTab === item.id ? "active" : ""}`}
                                onClick={() => changeTab(item.id)}>
                                {item.name}
                                {tabs && (<div className={`badge-wrapper ${tabs && tabs[item.code] && Number(tabs[item.code]) > 0 ? 'd-flex' : 'd-none'}`}>
                                    <div className='badge-count'>{tabs[item.code]}</div>
                                </div>)}
                            </a>
                        </li>
                        <li className={`separator-vertical ${index < experienceStatusList.length-1 ? 'd-flex' : 'd-none'}`}>
                            <hr />
                        </li>
                    </div>))}
                </ul>
            </div>

            <div className='admin-experience-page__content'>
                {/* Search Bar */}
                <div className='search-bar'>
                    <div className='search-bar__icon'>
                        <div className='search-icon__circle'></div>
                        <div className='search-icon__handle'></div>
                    </div>
                    <input
                        type='text'
                        className='search-bar__input'
                        placeholder='Search Experience'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => { searchInList(e) }}
                    />
                    {/* {isLoader && (<div className='loader-search-bar'></div>)} */}
                </div>

                {/* Table */}
                <div className={`admin-experience-page-table ${experiences.length > 0 ? 'd-flex' : 'd-none'}`}>
                    {/* ID Column */}
                    <div className='admin-experience-page-table__column admin-experience-page-table__column--80'>
                        <div className='admin-experience-page-table__header'>ID</div>
                        {renderCells(experiences, isLoader, (u) => u.id, 'id')}
                    </div>

                    {/* Name Column */}
                    <div className='admin-experience-page-table__column admin-experience-page-table__column--200'>
                        <div className='admin-experience-page-table__header'>NAME</div>
                        {renderCells(experiences, isLoader, (u) => u.title, 'title')}
                    </div>

                    {/* Source Column */}
                     <div className='admin-experience-page-table__column admin-experience-page-table__column--150'>
                        <div className='admin-experience-page-table__header'>SUBMITTED BY</div>
                        {renderCells(
                            experiences, 
                            isLoader, 
                            (u) => (<div className="experience-preview-invited-item">
                                <img src={u.image} />
                                <div className='text-dark admin-experience-page-table__cell--bold'>{u.name}</div>
                            </div>),
                            'submittedBy',
                            '80%')}
                    </div>

                    {/* Country Column */}
                    <div className='admin-experience-page-table__column admin-experience-page-table__column--80'>
                        <div className='admin-experience-page-table__header'>TYPE</div>
                        {renderCells(experiences, isLoader, (u) => u.typeDisplay, 'typeDisplay')}
                    </div>

                    {/* Requested On Column */}
                    <div className='admin-experience-page-table__column admin-experience-page-table__column--150'>
                        <div className='admin-experience-page-table__header'>DATE UPLOADED</div>
                        {renderCells(experiences, isLoader, (u) => u.dateUploaded, 'dateUploaded')}
                    </div>

                    {/* Category Column */}
                    <div className='admin-experience-page-table__column admin-experience-page-table__column--150'>
                        <div className='admin-experience-page-table__header'>DAYS LEFT</div>
                        {renderCells(experiences, isLoader, (u) => u.daysLeft, 'daysLeft')}
                    </div>

                    {/* Assigned Column */}
                    <div className='admin-experience-page-table__column admin-experience-page-table__column--80'>
                        <div className='admin-experience-page-table__header'>STATUS</div>
                        {renderCells(experiences, isLoader, (u) => {
                            let status = EXPERIENCE_STATUS_LIST.find((item)=>item.id == u.status);
                            return status.name;
                        }, 'status')}
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {totalRows > 0 && (<div className='tap-flex-center mt-5'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>)}
            {/* <LoaderOverlay visible={isLoader} message={messageLoader} /> */}
        </div>
        <DetailExperienceDrawer experience={experience} open={openDetail} onClose={setOpenDetail} />
    </div>)
}

export default ExperienceAdminPage
