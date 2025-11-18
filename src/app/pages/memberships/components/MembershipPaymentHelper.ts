
export interface IMembershipPayment {
  payment_method_id: string,
  price_id: string,
  card_no: string,
  name_on_card: string,  
  address: string
  postal_code: string
  country: string
  email: string
}


const inits: IMembershipPayment = {
  payment_method_id: "",
  price_id: "",
  card_no: "",
  name_on_card: "",  
  address: "",
  postal_code: "",
  country: "",
  email:""
}

export {  inits }
