import { membershipDetails } from "../../../services/waitingListService";
import { GenericModel } from "./GenericModel";

export const EXPERIENCE_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1,
  PRE_LAUNCH: 2,
  PENDING: 3,
  REJECTED: 4,
} as const;

export type ExperienceStatus = typeof EXPERIENCE_STATUS[keyof typeof EXPERIENCE_STATUS];


export const EXPERIENCE_STATUS_LIST:any = [
  { id: EXPERIENCE_STATUS.DRAFT, name: 'Draft' },
  { id: EXPERIENCE_STATUS.PUBLISHED, name: 'Active' },
  { id: EXPERIENCE_STATUS.PRE_LAUNCH, name: 'Pre launch' },
  { id: EXPERIENCE_STATUS.PENDING, name: 'Pending' },
  { id: EXPERIENCE_STATUS.REJECTED, name: 'Declined' },
]

/* 

las experiencias vienen de partners/miebros pendientes
cuando se aprueban las experiencias de miembros pasan a activos
cuando se aprueban las de partners se mueven a prelaunch
si el miembro rechaza alguna experience se va a decline

 */