import { FC, useEffect, useRef, useState } from 'react'
import { useLayout } from '../../../_metronic/layout/core'
import { useLocation, useHistory } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers'
import { deleteTeam, getListTeam } from '../../services/teamAdminService'
import Pagination from '../components/Pagination'
import { TeamModel } from './models/TeamModel'
import { shallowEqual, useSelector } from 'react-redux'
import { UserModel } from '../../modules/auth/models/UserModel'
import { RootState } from '../../../setup'
import { MenuComponent } from '../../../_metronic/assets/ts/components'
import { MemberModal } from './components/MemberModal'
import DropdownOption from './components/fields/DropdownOption'
import { LoaderOverlay } from '../../hooks/loader/LoaderOverlay'
import { useConfirmAction } from '../../hooks/utils/useConfirmAction'
import { showErrorAlert } from '../../helpers/alert'

const TeamAdminPage: FC = () => {
    const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
    const [paginationCount, setPaginationCount] = useState(0);
    const [teamList, setTeamList] = useState<TeamModel[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const { config, setLayout } = useLayout()
    const [currentPage, setCurrentPage] = useState(1);
    const restoreRef = useRef(config)
    const history = useHistory();
    const confirm = useConfirmAction();
    const limit = 10;

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
                MenuComponent.reinitialization();
            }, 50);
        }
    }, [teamList]);

    const totalPages = paginationCount
        ? Math.ceil(paginationCount / limit)
        : 1;

    const handlePageChange = async (page: number) => {
        const offset = (page - 1) * limit;
        await getList(page,offset);
    };

    const getList = async (page:number=1,offset:number=0) => {
        const experiences = await getListTeam(user.id,{ limit, offset });
        setPaginationCount(experiences.count ?? 0);
        setTeamList(experiences.results ?? []);
        setCurrentPage(page);
    }

    const handleOnSubmit = async () => {
        setOpenModal(false);
        await getList();
    }

    const handleOnClose = async () => {
        setOpenModal(false);
        setSelectedId(0);
    }

    const handleOnEdit = async (id:number) => {
        setSelectedId(id);
        setOpenModal(true);
    }
    
    const handleDelete = async (id:number) => {
        let isDelete = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member from your team?' });
        if (isDelete) {
            let deleted = await deleteTeam(user.id,id);
            console.log('is deleted',deleted);
            showErrorAlert({ title: 'Deleted', message: 'Member team deleted' });
            await getList();
        }
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
                {teamList.map((item,index)=>(<div key={`team-admin-row-${item.id}`} className="team-admin-row">
                    <div className="team-admin-field">
                        <label>Employee name</label>
                        <div className="team-admin-input">{item.userData.firstName} {item.userData.lastName}</div>
                    </div>

                    <div className="team-admin-field">
                        <label>Email</label>
                        <div className="team-admin-input">{item.userData.email}</div>
                    </div>

                    <div className="team-admin-field team-admin-field--small">
                        <label>Phone</label>
                        <div className="team-admin-input">{item.phoneNumber ?? ''}</div>
                    </div>

                    <div className="team-admin-field team-admin-field--small">
                        <label>Role</label>
                        <div className="team-admin-input">{item.role.name}</div>
                    </div>
                    <DropdownOption item={item} onEdit={handleOnEdit} onDelete={handleDelete} />
                </div>))}
                {teamList.length == 0 ? 'No results' : ''}
                {paginationCount && (<div className='tap-flex-center mt-5'>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>)}
            </div>
            <MemberModal show={openModal} onClose={handleOnClose} onSubmit={handleOnSubmit} onLoad={setIsLoader} userSelectedId={selectedId} />
            <LoaderOverlay visible={isLoader} message={'loading...'} />
        </div>
    )
}

export { TeamAdminPage }
