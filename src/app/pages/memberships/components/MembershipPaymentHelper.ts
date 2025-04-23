import * as Yup from 'yup'

export interface IMembershipPayment {
  cardHoldName: string,  
  invoice: boolean,
  membershipId: string,
  paymentMethodId: string,
  price_id: string
}

const cardNameHolderRegex = /^[A-Za-z\s]+$/;
const membershipPaymentSchemas = [
  Yup.object({
    cardHoldName: Yup.string().required().matches(cardNameHolderRegex, 'The name must only contain letters').label('Card Hold Name'),
  })
]

const inits: IMembershipPayment = {
  cardHoldName: "",
  invoice: false,
  membershipId: "",
  paymentMethodId: "" ,
  price_id: ""
}

export { membershipPaymentSchemas, inits }
