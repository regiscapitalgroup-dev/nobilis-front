import React, {useEffect, useState} from 'react'
import Pagination from '../../components/Pagination'
import {useUseWaitinListRequest} from '../../../hooks/waitingList/useWaitingList'
import { MenuComponent } from '../../../../_metronic/assets/ts/components'
import { useDrawer } from '../../../context/UserWaitlistSelectedContext'
import { formatDateShortIntl2 } from '../../../helpers/FormatDate'
import { usePagination } from '../../../hooks/utils/usePagination'

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
  const [timeoutWaitingList, setTimeoutWaitingList] = useState(10)
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [reload, setReload] = useState<number>(Math.random() * 10)
  const {data, loading} = useUseWaitinListRequest(reload,activeTab,searchTerm,timeoutWaitingList)
  const [user, setUser] = useState<number>(0)
  const [countNews, setCountNews] = useState<number>(0)
  const safeData: WaitlistUser[] = Array.isArray(data) ? data : []
  const { openDrawer, isOpen } = useDrawer();
  const {
    page,
    totalPages,
    currentData,
    setPage,
    nextPage,
    prevPage
  } = usePagination(data ?? [], 10);

  const toggleDropdown = (userId: string, status: string) => {
    if (status.toLowerCase() === 'approved') {
      return
    }
    setOpenDropdownId((prev) => (prev === userId ? null : userId))
  }

  // escuchamos cambios en el estado del drawer/panel
  useEffect(() => {
    // demos recargar el grid solo cuando se cierre el panel detalle de información
    if(!isOpen){
      setPage(1) // reset page
      setTimeoutWaitingList(10) // ajustamos el timeout para que sea rápido
      setReload(Math.random() * 20)
    }
  }, [isOpen]);
  
  // escuchamos cambios en el input del buscador
  useEffect(() => {
    // demos recargar el grid cuando buscamos por texto
    setPage(1) // reset page
    setTimeoutWaitingList(2000) // ajustamos el timeout para que sea lento y de tiempo de escribir
    setReload(Math.random() * 20)
  }, [searchTerm]);

  useEffect(() => {
    MenuComponent.reinitialization();
    if(activeTab == 'pending'){
      setCountNews(data?.length ?? 0);
    }
  }, [data]);

  const changeTab = (status: string) => {
    setActiveTab(status);
    setPage(1) // reset page
    setTimeoutWaitingList(10) // ajustamos el timeout para que sea rápido
    setReload(Math.random() * 20)
  }

  const searchInList = (event:any) => {
    if (event.key === 'Enter') {
      setPage(1) // reset page
      setTimeoutWaitingList(10) // ajustamos el timeout para que sea rápido
      setReload(Math.random() * 20)
    }
  }

  const renderCells = (
    items: any[],
    isLoading: boolean,
    getValue: (u: any) => React.ReactNode,
    keyPrefix: string,
    skeletonWidth: string = '70%',
    styleCell: 'table__cell--bold'|'' = 'table__cell--bold',
    isDate:boolean = false,
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
      <div onClick={drawerOpen.bind(null, parseInt(u.id))}
        key={`${keyPrefix}-${index}`}
        className={`cursor-pointer table__cell ${styleCell}`}>
        {isDate ? formatDateShortIntl2(getValue(u)) : getValue(u)}
      </div>
    ))
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
          <div className="card">
            <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-bottom-0">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'pending' ? "active" : ""}`}
                  onClick={()=>changeTab('pending')}>
                  New
                  <div data-property-1="regular" className='badge-wrapper'>
                    <div className='badge-count'>{countNews}</div>
                  </div>
                </a>
              </li>
              <li className="separator-vertical">
                <hr />
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'approved' ? "active" : ""}`}
                  onClick={()=>{changeTab('approved')}}>
                  Approved
                </a>
              </li>
              <li className="separator-vertical">
                <hr />
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'rejected' ? "active" : ""}`}
                  onClick={()=>{changeTab('rejected')}}>
                  Rejected
                </a>
              </li>
            </ul>
          </div>

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
                onKeyDown={(e) => { searchInList(e) }}
              />
            </div>

            {/* Table */}
            <div className='table'>
              {/* ID Column */}
              <div className='table__column table__column--id'>
                <div className='table__header'>ID</div>
                {renderCells(currentData, loading, (u) => u.id, 'id', '40%')}
              </div>

              {/* Name Column */}
              <div className='table__column table__column--name'>
                <div className='table__header'>NAME</div>
                {renderCells(currentData, loading, (u) => u.fullName, 'name', '60%')}
              </div>

              {/* Source Column */}
              <div className='table__column table__column--source'>
                <div className='table__header'>SOURCE</div>
                {renderCells(currentData, loading, (u) => u.source, 'source', '50%')}
              </div>

              {/* Country Column */}
              <div className='table__column table__column--country'>
                <div className='table__header'>CITY</div>
                {renderCells(currentData, loading, (u) => u.country, 'country', '50%')}
              </div>

              {/* Requested On Column */}
              <div className='table__column table__column--requested'>
                <div className='table__header'>REQUESTED ON</div>
                {renderCells(currentData, loading, (u) => u.requested, 'requested', '70%', 'table__cell--bold', true)}
              </div>

              {/* Category Column */}
              <div className='table__column table__column--category'>
                <div className='table__header'>CATEGORY</div>
                {renderCells(currentData, loading, (u) => u.category, 'category', '55%')}
              </div>

              {/* Assigned Column */}
              <div className='table__column table__column--assigned'>
                <div className='table__header'>ASSIGNED TO</div>
                {renderCells(currentData, loading, (u) => u.assigned, 'assigned', '55%')}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  )
}

export default WaitingListGrid
