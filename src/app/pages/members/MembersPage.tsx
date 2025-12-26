import {MemberSearchList} from './components/MemberSearchList'
import {useSearchableMembersContext} from '../../context/SearchableMembersContext'
import {useCategoriesMembers} from '../../hooks/members/useCategoriesMembers'
import {MembersCategoriesList} from './components/MembersCategoriesList'
import {useEffect} from 'react'
import {useUserProfileContext} from '../../context/UserProfileContext'

const MembersPage = () => {
  const {data: categories} = useCategoriesMembers()
  const {data: members, loading: membersLoading} = useSearchableMembersContext()
  const {setSearchParams: setParamasData} = useUserProfileContext()
  const {setSearchParams} = useSearchableMembersContext()

  useEffect(() => {
    return () => {
      setSearchParams({where: '', keywords: '', category: ''})
      setParamasData({userSelected: ''})
    }
  }, [setSearchParams, setParamasData])

  return (
    <>
      <div className='members-page'>
        <div className='members-page__header'>
          <h1 className='members-page__title'>
            Members
            <svg
              width='22'
              height='6'
              viewBox='0 0 22 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M14.1667 0.378906L20 5.37891H0' stroke='#151515' />
            </svg>
          </h1>
        </div>

        <MembersCategoriesList data={categories} />
        <MemberSearchList data={members} loading={membersLoading} />
      </div>
    </>
  )
}

export {MembersPage}
