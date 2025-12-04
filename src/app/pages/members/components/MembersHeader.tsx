import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from '../../../modules/auth/models/UserModel'
import {RootState} from '../../../../setup'

const MembersHeader: FC = () => {
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel

  return (
    <section className='member-search-hero'>
      <img
        src='/media/partners.png'
        alt='MembersHeader background'
        className='member-search-hero__background'
      />
      <div className='member-search-hero__overlay'>
        <div className='member-search-hero__content'>
          <div className='member-search-hero__welcome'>
            <span className='member-search-hero__welcome-text'>Welcome,</span>
            <span className='member-search-hero__welcome-name'>{user.firstName}</span>
          </div>

          <div className='member-search-hero__cta'>
            <p className='member-search-hero__cta-text'>
              Finalize your profile to earn 1000 Credits
            </p>
            <div className='member-search-hero__cta-button'>
              {/* <span className='member-search-hero__cta-button-text'>Finalize now</span> */}
              <svg
                width='84'
                height='26'
                viewBox='0 0 84 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <mask id='path-1-inside-1_416_21696' fill='white'>
                  <path d='M0 0H82V26H0V0Z' />
                </mask>
                <path
                  d='M82 26V25H0V26V27H82V26Z'
                  fill='white'
                  mask='url(#path-1-inside-1_416_21696)'
                />
                <path
                  d='M1.02302 18V8.28H5.01902V9.504H2.79902V12.336H4.61102V13.572H2.79902V18H1.02302ZM6.02805 18V8.28H7.78005V18H6.02805ZM9.28473 18V8.28H10.5207L12.8847 13.824V8.28H14.3487V18H13.1727L10.7967 12.192V18H9.28473ZM15.3318 18L17.2758 8.28H19.1718L21.1158 18H19.4718L19.0878 15.756H17.3958L16.9998 18H15.3318ZM17.5758 14.628H18.8958L18.2358 10.548L17.5758 14.628ZM22.0933 18V8.28H23.8693V16.776H26.2213V18H22.0933ZM27.1921 18V8.28H28.9441V18H27.1921ZM30.1128 18V16.86L32.7288 9.504H30.2568V8.28H34.5168V9.192L31.8048 16.776H34.5288V18H30.1128ZM35.5465 18V8.28H39.6265V9.528H37.3225V12.324H39.1345V13.56H37.3225V16.776H39.6505V18H35.5465ZM43.5972 18V8.28H44.8332L47.1972 13.824V8.28H48.6612V18H47.4852L45.1092 12.192V18H43.5972ZM52.7763 18.132C52.0883 18.132 51.5403 18.004 51.1323 17.748C50.7243 17.492 50.4323 17.124 50.2563 16.644C50.0803 16.164 49.9923 15.596 49.9923 14.94V11.304C49.9923 10.648 50.0803 10.088 50.2563 9.624C50.4323 9.152 50.7243 8.792 51.1323 8.544C51.5403 8.296 52.0883 8.172 52.7763 8.172C53.4803 8.172 54.0323 8.296 54.4323 8.544C54.8403 8.792 55.1323 9.152 55.3083 9.624C55.4923 10.088 55.5843 10.648 55.5843 11.304V14.952C55.5843 15.6 55.4923 16.164 55.3083 16.644C55.1323 17.116 54.8403 17.484 54.4323 17.748C54.0323 18.004 53.4803 18.132 52.7763 18.132ZM52.7763 16.824C53.0723 16.824 53.2883 16.76 53.4243 16.632C53.5683 16.504 53.6643 16.328 53.7123 16.104C53.7603 15.88 53.7843 15.636 53.7843 15.372V10.896C53.7843 10.624 53.7603 10.38 53.7123 10.164C53.6643 9.948 53.5683 9.78 53.4243 9.66C53.2883 9.532 53.0723 9.468 52.7763 9.468C52.4963 9.468 52.2843 9.532 52.1403 9.66C51.9963 9.78 51.9003 9.948 51.8523 10.164C51.8043 10.38 51.7803 10.624 51.7803 10.896V15.372C51.7803 15.636 51.8003 15.88 51.8403 16.104C51.8883 16.328 51.9843 16.504 52.1283 16.632C52.2723 16.76 52.4883 16.824 52.7763 16.824ZM57.918 18L56.538 8.28H58.026L58.83 14.58L59.838 8.304H61.05L62.082 14.58L62.874 8.28H64.338L62.982 18H61.542L60.462 11.484L59.394 18H57.918Z'
                  fill='white'
                />
                <path d='M78.5 11.498L82 14.5022H70' stroke='white' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export {MembersHeader}
