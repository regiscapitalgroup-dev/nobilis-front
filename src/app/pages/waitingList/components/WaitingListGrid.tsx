import React, {useEffect, useState} from 'react'
import Pagination from '../../components/Pagination'
import ActionsDropdown from './Actionsdropdown'
import {useUseWaitinListRequest} from '../../../hooks/waitingList/useWaitingList'
import {ApproveModal} from '../modals/ApproveModal'
import {acceptRequest, rejectedRequest} from '../../../services/waitingListService'
import {DeclineModal} from '../modals/DeclineModal'
import { MenuComponent } from '../../../../_metronic/assets/ts/components'
import { useDrawer } from '../../../context/UserWaitlistSelectedContext'

export interface WaitlistUser {
  id: string
  fullName: string
  source: string
  country: string
  requested: string
  category: string
  assigned: string
  status: string
}

const PLACEHOLDER_ROWS = 8

const WaitingListGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [reload, setReload] = useState<number>(Math.random() * 10)
  const {data, loading} = useUseWaitinListRequest(reload)
  const [user, setUser] = useState<number>(0)
  const safeData: WaitlistUser[] = Array.isArray(data) ? data : []
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const totalPages = 12
  const { openDrawer } = useDrawer();

  const toggleDropdown = (userId: string, status: string) => {
    if (status.toLowerCase() === 'approved') {
      return
    }
    setOpenDropdownId((prev) => (prev === userId ? null : userId))
  }

  useEffect(() => {
    MenuComponent.reinitialization();
  }, [data]);

  const closeDropdown = () => {
    setOpenDropdownId(null)
  }

  const handleAccept = async () => {
    await acceptRequest(user)
    closeDropdown()
    setShowModal(false)
    setReload(Math.random() * 20)
  }

  const handleDecline = async (reason: string, note: string) => {
    
    await rejectedRequest(user, {
      rejection_reason_id: reason,
      notes: note,
    })
    setShowDeclineModal(false)
    setReload(Math.random() * 20)
    closeDropdown()
  }

  const renderCells = (
    items: WaitlistUser[],
    isLoading: boolean,
    getValue: (u: WaitlistUser) => React.ReactNode,
    keyPrefix: string,
    skeletonWidth: string = '70%'
  ) => {
    if (isLoading) {
      return Array.from({length: PLACEHOLDER_ROWS}).map((_, index) => (
        <div
          key={`${keyPrefix}-${index}`}
          className={`table__cell ${index === 0 ? 'table__cell--bold' : ''}`}
        >
          <span className='skeleton skeleton--text' style={{width: skeletonWidth}} />
        </div>
      ))
    }
    return items.map((u, index) => (
      <div
        key={`${keyPrefix}-${index}`}
        className={`table__cell ${index === 0 ? 'table__cell--bold' : ''}`}
      >
        {getValue(u)}
      </div>
    ))
  }

  const openModal = (user: number) => {
    setUser(user)
    setShowModal(true)
  }
  const openModalDecline = (user: number) => {
    setUser(user)
    setShowDeclineModal(true)
  }
  const drawerOpen = (user: number) => {
    setUser(user)
    openDrawer(user);
  }

  return (
    <>
      <div className='users-waitlist-page'>
        <div className='users-waitlist-page__container'>
          <h1 className='users-waitlist__title'>Users Waitlist</h1>

          {/* Barra de carga superior */}
          {loading && <div className='page-loading-bar' />}

          <div className='users-waitlist__content'>
            {/* Search Bar */}
            <div className='search-bar'>
              <div className='search-bar__icon'>
                <div className='search-icon__circle'></div>
                <div className='search-icon__handle'></div>
              </div>
              <input
                type='text'
                className='search-bar__input'
                placeholder='Search Forum'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className='table'>
              {/* ID Column */}
              <div className='table__column table__column--id'>
                <div className='table__header'>ID</div>
                {renderCells(safeData, loading, (u) => u.id, 'id', '40%')}
              </div>

              {/* Name Column */}
              <div className='table__column table__column--name'>
                <div className='table__header'>NAME</div>
                {renderCells(safeData, loading, (u) => u.fullName, 'name', '60%')}
              </div>

              {/* Source Column */}
              <div className='table__column table__column--source'>
                <div className='table__header'>SOURCE</div>
                {renderCells(safeData, loading, (u) => u.source, 'source', '50%')}
              </div>

              {/* Country Column */}
              <div className='table__column table__column--country'>
                <div className='table__header'>COUNTRY</div>
                {renderCells(safeData, loading, (u) => u.country, 'country', '50%')}
              </div>

              {/* Requested On Column */}
              <div className='table__column table__column--requested'>
                <div className='table__header'>REQUESTED ON</div>
                {renderCells(safeData, loading, (u) => u.requested, 'requested', '70%')}
              </div>

              {/* Category Column */}
              <div className='table__column table__column--category'>
                <div className='table__header'>CATEGORY</div>
                {renderCells(safeData, loading, (u) => u.category, 'category', '55%')}
              </div>

              {/* Assigned Column */}
              <div className='table__column table__column--assigned'>
                <div className='table__header'>ASSIGNED</div>
                {renderCells(safeData, loading, (u) => u.assigned, 'assigned', '55%')}
              </div>

              {/* Status Column */}
              <div className='table__column table__column--status'>
                <div className='table__header'>STATUS</div>
                {renderCells(safeData, loading, (u) => u.status, 'status', '45%')}
              </div>

              {/* Actions Column */}
              <div className='table__column table__column--actions'>
                <div className='table__header'>ACTIONS</div>
                {loading
                  ? Array.from({length: PLACEHOLDER_ROWS}).map((_, index) => (
                      <div
                        key={`actions-skel-${index}`}
                        className='table__cell table__cell--actions'
                      >
                        <span
                          className='skeleton'
                          style={{width: 28, height: 28, borderRadius: 6}}
                        />
                      </div>
                    ))
                  : safeData.map((user: WaitlistUser, index: number) => {
                      // const isApproved = user.status.toLowerCase() === 'approved'
                      const isApproved = false

                      return (
                        <div key={`actions-${index}`} className='table__cell table__cell--actions'>
                          <button
                            className='btn btn-sm btn-icon btn-light btn-active-light-primary'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            disabled={isApproved}
                            style={{
                              opacity: isApproved ? 0.4 : 1,
                              cursor: isApproved ? 'not-allowed' : 'pointer',
                            }}
                          >
                            <svg
                              width='18'
                              height='18'
                              viewBox='0 0 18 18'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <circle cx='9' cy='4' r='1.5' fill='#151515' />
                              <circle cx='9' cy='9' r='1.5' fill='#151515' />
                              <circle cx='9' cy='14' r='1.5' fill='#151515' />
                            </svg>
                          </button>

                          {!isApproved && (
                            <ActionsDropdown
                              onAccept={() => openModal(Number(user.id))}
                              onReject={() => openModalDecline(Number(user.id))}
                              onDrawerOpen={() => drawerOpen(Number(user.id))}
                            />
                          )}
                        </div>
                      )
                    })}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <ApproveModal show={showModal} onHide={() => setShowModal(false)} onApprove={handleAccept} />
      <DeclineModal
        show={showDeclineModal}
        onHide={() => setShowDeclineModal(false)}
        onDecline={handleDecline}
      />
    </>
  )
}

export default WaitingListGrid
