import * as Yup from 'yup'

export interface IMembershipPayment {
  cardHoldName: string,  
  invoice: boolean,
  paymentMethodId: string,
  price_id: string,
  country: string
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
  paymentMethodId: "" ,
  price_id: "",
  country: ""
}

export { membershipPaymentSchemas, inits }
