import * as Yup from 'yup'

export interface ICreateAccount {
  name: string,
  lastName: string
  email: string
  phoneNumber: string,
  occupation: string,
  country: string,
  referenced: string,
  otherOption: string;
  option0: boolean;
  option1: boolean;
  option2: boolean;
  option3: boolean;
  option4: boolean;
  option5: boolean;
  option6: boolean;
  option7: boolean;
  option8: boolean;
  option9: boolean;
  wealthOwner: boolean;
  impactMaker: boolean;
  executive: boolean;
  governor: boolean;
  linkVerify: string;
  statusWaitingList: number
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const createAccountSchemas = [

  Yup.object({
    name: Yup.string().required().label('First Name'),
    lastName: Yup.string().required().label('Last Name'),
    email: Yup.string().required().email().label('Email'),
    phoneNumber: Yup.string().required().matches(phoneRegExp, 'Phone number is not valid').label('Phone Number'),

  }),
  Yup.object({}),
  Yup.object({
    linkVerify: Yup.string()
      .nullable()
      .notRequired()
      .matches(
        /^(https?:\/\/[^\s]+)?$/,
        'Invalid link format'
      ),

  }),

]

const inits: ICreateAccount = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  occupation: "",
  country: "",
  referenced: "",
  otherOption: "",
  option0: false,
  option1: false,
  option2: false,
  option3: false,
  option4: false,
  option5: false,
  option6: false,
  option7: false,
  option8: false,
  option9: false,
  wealthOwner: false,
  impactMaker: false,
  executive: false,
  governor: false,
  linkVerify: "",
  statusWaitingList: 0
}

export { createAccountSchemas, inits }
