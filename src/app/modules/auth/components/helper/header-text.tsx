import {FC} from 'react'

const HeaderText = () => {
  return (
    <>
      {/* begin::Title */}
      <h1 className='text-white fw-bold mb-3 fs-2'>The is currently a waiting list for</h1>

      <div className='text-white fw-bold fs-2 mb-3'>NOBILIS membership</div>
      {/* end::Title */}
    </>
  )
}

const HeaderTitle: FC<{text: string}> = ({text}) => {
  return (
    <>
      {/* begin::Title */}
      <div className='text-muted fs-7'>{text}</div>
      {/* end::Title */}
    </>
  )
}

const FooterTitle: FC<{text: string}> = ({text}) => {
  return (
    <>
      {/* begin::Title */}
      <div className='text-muted fs-7'>{text}</div>
      {/* end::Title */}
    </>
  )
}

export {HeaderText, HeaderTitle, FooterTitle}
