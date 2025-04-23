import {SubscriptionModel} from '../../../modules/auth/models/SubscriptionModel'

type Props = {
  subscriptionDetail: SubscriptionModel | null
}

const MembershipWelcomeWidget: React.FC<Props> = ({subscriptionDetail}) => {
  const parsedProduct = subscriptionDetail?.plan.product
  ? JSON.parse(subscriptionDetail.plan?.product)
  : null;

  return (
    <>
      <div className='col-xl-12'>
        <div className='card card-custom shadow'>
          <div className='card-header'>
            <h3 className='card-title'>Welcome to Nobilis</h3>
          </div>
          <div className='card-body p-0'>
            <div className='card-p d-flex'>
              <span className='badge badge-success mb-3'>{subscriptionDetail?.status}</span>
              <div className='ms-2 fs-3 text-gray-700'>{parsedProduct?.name}</div>
            </div>
            <img
              className='w-100 card-rounded-bottom'
              alt=''
              src='assetsmedia/svg/illustrations/bg-4.svg'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export {MembershipWelcomeWidget}
