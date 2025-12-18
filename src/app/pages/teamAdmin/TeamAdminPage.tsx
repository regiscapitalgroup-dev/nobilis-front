import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { useLocation, useHistory } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers'
import { getListTeam } from '../../services/teamAdminService'
import Pagination from '../components/Pagination'
import { TeamModel } from './models/TeamModel'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../modules/auth/models/UserModel'
import { RootState } from '../../../setup'
import { MenuComponent } from '../../../_metronic/assets/ts/components'
import { MemberModal } from './components/MemberModel'
import { LoaderOverlay } from '../../hooks/loader/LoaderOverlay'

const TeamAdminPage: FC = () => {
    const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
    const [paginationData, setPaginationData] = useState<any>(null);
    const [teamList, setTeamList] = useState<TeamModel[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const { config, setLayout } = useLayout()
    const [currentPage, setCurrentPage] = useState(1);
    const restoreRef = useRef(config)
    const history = useHistory();
    const limit = 5;

    useEffect(() => {
        restoreRef.current = config
        setLayout({
            ...config,
            header: { ...config.header, display: true },
            aside: { ...config.aside, display: true },
            toolbar: { ...config.toolbar, display: false },
            footer: { ...config.footer, display: true },
        })
        getList();
        return () => {
            setLayout(restoreRef.current)
        }
    }, [])

    useEffect(() => {
        if (teamList.length > 0) {
            setTimeout(() => {
                MenuComponent.reinitialization()
            }, 0)
        }
    }, [teamList])

    const totalPages = paginationData
        ? Math.ceil(paginationData.count / limit)
        : 1;

    const handlePageChange = async (page: number) => {
        const offset = (page - 1) * limit;
        await getList(1,offset);
    };

    const getList = async (page:number=1,offset:number=0) => {
        // const experiences = await getListTeam(user.id,{ limit, offset });
        // setPaginationData(experiences);
        // setTeamList(experiences.results);
        // setCurrentPage(page);
        const teams = [
            { "id": 1, "user": { "id": 49, "email": "nuevo.moderador@ejemplo.com", "firstName": "Juan", "lastName": "Pérez" }, "role": { "id": 5, "code": "CALENDAR_MANAGEMENT", "name": "Calendar Management", "description": "", "isAdmin": false }, "joinedAt": "2025-12-05T15:53:35.298301-06:00" },
            { "id": 2, "user": { "id": 49, "email": "nuevo.moderador@ejemplo.com", "firstName": "Juan", "lastName": "Pérez" }, "role": { "id": 5, "code": "CALENDAR_MANAGEMENT", "name": "Calendar Management", "description": "", "isAdmin": false }, "joinedAt": "2025-12-05T15:53:35.298301-06:00" },
            { "id": 3, "user": { "id": 49, "email": "nuevo.moderador@ejemplo.com", "firstName": "Juan", "lastName": "Pérez" }, "role": { "id": 5, "code": "CALENDAR_MANAGEMENT", "name": "Calendar Management", "description": "", "isAdmin": false }, "joinedAt": "2025-12-05T15:53:35.298301-06:00" },
            { "id": 4, "user": { "id": 49, "email": "nuevo.moderador@ejemplo.com", "firstName": "Juan", "lastName": "Pérez" }, "role": { "id": 5, "code": "CALENDAR_MANAGEMENT", "name": "Calendar Management", "description": "", "isAdmin": false }, "joinedAt": "2025-12-05T15:53:35.298301-06:00" },
            { "id": 5, "user": { "id": 49, "email": "nuevo.moderador@ejemplo.com", "firstName": "Juan", "lastName": "Pérez" }, "role": { "id": 5, "code": "CALENDAR_MANAGEMENT", "name": "Calendar Management", "description": "", "isAdmin": false }, "joinedAt": "2025-12-05T15:53:35.298301-06:00" },
        ];
        setTeamList(teams);
    }

    return (
        <div className="admin-team-container flex-column">
            <div className="d-flex flex-row w-100 justify-content-between">
                <div className="tap-host-title">Team</div>
                <div className="tap-add-experience-2-btn-main" onClick={()=>setOpenModal(true)}>
                    <div className="tap-host-button-text tap-flex-center">
                        Add partner &nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                    </div>
                </div>
            </div>
            <div className="team-admin-content w-100">
                <div className="team-admin-section-title">Employees</div>

                {/* ROW */}
                {teamList.map((item,index)=>(<div key={`team-admin-row-${index}`} className="team-admin-row">
                    <div className="team-admin-field">
                        <label>Employee name</label>
                        <div className="team-admin-input">{item.user.firstName} {item.user.lastName}</div>
                    </div>

                    <div className="team-admin-field">
                        <label>Email</label>
                        <div className="team-admin-input">{item.user.email}</div>
                    </div>

                    <div className="team-admin-field team-admin-field--small">
                        <label>Phone</label>
                        <div className="team-admin-input">{item.user.phone ?? ''}</div>
                    </div>

                    <div className="team-admin-field team-admin-field--small">
                        <label>Role</label>
                        <div className="team-admin-input">{item.role.name}</div>
                    </div>
                    <div className="team-admin-actions" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                        <button type="button" className="btn btn-icon btn-sm btn-light">
                            <KTSVG path="/media/svg/nobilis/dots-horizontal.svg" />
                        </button>
                        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">
                            <div className="menu-item px-3">
                                <a className="menu-link px-3">Edit</a>
                            </div>
                            <div className="menu-item px-3">
                                <a className="menu-link px-3">Remove</a>
                            </div>
                        </div>
                    </div>
                </div>))}
                {teamList.length == 0 ? 'No results' : ''}
                {paginationData && (<div className='tap-flex-center mt-5'>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>)}
            </div>
            <MemberModal show={openModal} onClose={()=>{setOpenModal(false)}} onLoad={setIsLoader} />
            <LoaderOverlay visible={isLoader} message={'loading...'} />
        </div>
    )
}

export { TeamAdminPage }
