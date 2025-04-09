import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {UserModel} from '../models/UserModel'

export class UsersTableMock {
  public static table: Array<UserModel> = [
    {
     /*  username: 'admin',
      password: 'demo', */
      email: 'admin@demo.com',
      /* auth: {
        accessToken: 'access-token-8f3ae836da744329a6f93bf20594b5cc',
        refreshToken: 'access-token-f8c137a2c98743f48b643e71161d90aa',
      },
      roles: [1], // Administrator
      pic: toAbsoluteUrl('/media/avatars/150-2.jpg'),
      fullname: 'Sean S', */
      firstName: 'Sean',
      lastName: 'Stark',
      /* occupation: 'CEO',
      companyName: 'Keenthemes',
      phone: '456669067890',
      language: 'en',
      timeZone: 'International Date Line West',
      website: 'https://keenthemes.com',
      emailSettings: {
        emailNotification: true,
        sendCopyToPersonalEmail: false,
        activityRelatesEmail: {
          youHaveNewNotifications: false,
          youAreSentADirectMessage: false,
          someoneAddsYouAsAsAConnection: true,
          uponNewOrder: false,
          newMembershipApproval: false,
          memberRegistration: true,
        },
        updatesFromKeenthemes: {
          newsAboutKeenthemesProductsAndFeatureUpdates: false,
          tipsOnGettingMoreOutOfKeen: false,
          thingsYouMissedSindeYouLastLoggedIntoKeen: true,
          newsAboutStartOnPartnerProductsAndOtherServices: true,
          tipsOnStartBusinessProducts: true,
        },
      },
      communication: {
        email: true,
        sms: true,
        phone: false,
      },
      address: {
        addressLine: 'L-12-20 Vertex, Cybersquare',
        city: 'San Francisco',
        state: 'California',
        postCode: '45000',
      },
      socialNetworks: {
        linkedIn: 'https://linkedin.com/admin',
        facebook: 'https://facebook.com/admin',
        twitter: 'https://twitter.com/admin',
        instagram: 'https://instagram.com/admin',
      }, */
    },    
  ]
}
