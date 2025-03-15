export interface WaitingListModel {
    name: string,
    lastname: string,
    phone_number: string,
    email: string,
    occupation: string | null,
    city: string | null,
    referenced: string | null,
    status_waiting_list:  number | 0
  }