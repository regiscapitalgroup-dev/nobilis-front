import React, {FC, useEffect, useState} from "react";
import {KTSVG} from '../../../helpers'
import { DrawerComponent } from "../../../assets/ts/components";
import { daysSince } from "../../../../app/helpers/FormatDate";
import { acceptRequest, rejectedRequest } from "../../../../app/services/waitingListService";
import { ApproveModal } from "../../../../app/pages/waitingList/modals/ApproveModal";
import { DeclineModal } from "../../../../app/pages/waitingList/modals/DeclineModal";
import { showErrorAlert } from "../../../../app/helpers/alert";
import questions from '../../../../app/modules/auth/components/helper/json-data/section1.json'


const RequestMembership: FC = ({ isOpen, onClose, dataUser }) => {
    const [showModal, setShowModal] = useState(false)
    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const [user, setUser] = useState<number>(0)
    // Inicializar Drawer UNA SOLA VEZ
    useEffect(() => {
        const el = document.getElementById("drawer_request_membership_panel");
        if (!el) return;

        let drawer = DrawerComponent.getInstance(el);
        if (!drawer) {
        drawer = new DrawerComponent(el, {
            overlay: true,
            width: "400px",
            direction: "end",
        });
        }
    }, []);

    // Abrir / cerrar según isOpen
    useEffect(() => {
        const el = document.getElementById("drawer_request_membership_panel");
        if (!el) return;

        const drawer = DrawerComponent.getInstance(el);
        if (!drawer) return;

        isOpen ? drawer.show() : drawer.hide();
    }, [isOpen]);

    const handleAccept = async () => {
        const el = document.getElementById("kt_drawer_request_membership_btn");
        try {
            let response = await acceptRequest(dataUser?.id)
            setShowModal(false)
            el?.click();
            showErrorAlert({title: 'Success', message: response?.data?.success ?? 'User approved' })
        } catch (error:any) {
            showErrorAlert({title: 'Success', message: 'User approved' })
            setShowModal(false)
            el?.click();
        }
    }

    const handleDecline = async (reason: string, note: string) => {
        const el = document.getElementById("kt_drawer_request_membership_btn");
        try {
            let response = await rejectedRequest(dataUser?.id, {
                rejection_reason_id: reason ?? '',
                notes: note ?? '',
            })
            setShowDeclineModal(false)
            el?.click();
            showErrorAlert({title: 'Success', message: response?.success ?? 'User declined' })
        } catch (error:any) {
            showErrorAlert({title: 'Success', message: 'User declined' })
            setShowDeclineModal(false)
            el?.click();
        }
    }

    const openModal = () => {
        setUser(Number(dataUser?.id));
        setShowModal(true);
    }
    const openModalDecline = () => {
        setUser(Number(dataUser?.id));
        setShowDeclineModal(true);
    }

    return (
        <div
            id='kt_drawer_request_membership'
            className='bg-white'
            data-kt-drawer='true'
            data-kt-drawer-name='request-membership'
            data-kt-drawer-activate='true'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'300px', 'md': '500px'}"
            data-kt-drawer-direction='end'
            data-kt-drawer-toggle='#kt_drawer_request_membership_btn'
            data-kt-drawer-close='#kt_drawer_request_membership_close'
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            >
            <div className="rm-style-0">
                <div className="rm-style-1">
                    <div className="rm-style-2">Users Waitlist Detail</div>
                    <div data-property-1="close-circle" className="rm-style-3 cursor-pointer" id='kt_drawer_request_membership_btn'>
                        <KTSVG path="/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_close_drawer.svg" className="rm-style-4" />
                        {/* <div className="rm-style-4"></div>
                        <div className="rm-style-5"></div>
                        <div className="rm-style-6"></div> */}
                    </div>
                </div>
                <div className="rm-style-7">
                    <div className="rm-style-8 cursor-pointer">
                        <div data-property-1="calendar-edit" className="rm-style-9">
                            <KTSVG path="/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_create_record.svg" className="rm-style-5" />
                            {/* <div className="rm-style-10"></div>
                            <div className="rm-style-11"></div>
                            <div className="rm-style-12"></div> */}
                        </div>
                        <div className="rm-style-13">Create Record</div>
                    </div>
                </div>
                <div className="rm-style-14">
                    <div className="rm-style-15">
                        <div className="rm-style-16">
                            <div className="rm-style-17">
                                <div className="rm-style-18">Assign Admin</div>
                                <div className="rm-style-19">John Doe</div>
                            </div>
                            <div className="rm-style-20">
                                <div className="rm-style-21">New Member Guide</div>
                                <div className="rm-style-22">John Doe</div>
                            </div>
                        </div>
                    </div>
                    <div className="rm-style-23">
                        <div className="rm-style-24">
                            <div className="rm-style-25">
                                <div className="d-flex flex-row w-100">
                                    <div className="rm-style-26 justify-content-start w-50">#{dataUser?.id ?? ''}</div>
                                    <div className="rm-style-36 justify-content-end w-50">{dataUser?.status ?? ''}</div>
                                </div>
                                <div className="rm-style-27">{dataUser?.firstName ?? ''} {dataUser?.lastName ?? ''}</div>
                            </div>
                            <div className="rm-style-28">
                                <div className="rm-style-29">
                                    <div className="rm-style-30">Occupation </div>
                                    <div className="rm-style-31">{dataUser?.occupation ?? ''}</div>
                                </div>
                                <div className="rm-style-32">
                                    <div className="rm-style-33">Location</div>
                                    <div className="rm-style-34">{dataUser?.city ?? ''}</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="rm-style-35">
                            
                        </div> */}
                    </div>
                    <div className="rm-style-37">
                        <div className="rm-style-38">
                            <div className="rm-style-39">
                                <div className="rm-style-40">Email</div>
                                <div className="rm-style-41">{dataUser?.email ?? ''}</div>
                            </div>
                            <div className="rm-style-42">
                                <div className="rm-style-43">Phone</div>
                                <div className="rm-style-44">{dataUser?.phoneNumber ?? ''}</div>
                            </div>
                            <div className="rm-style-45">
                                <div className="rm-style-46">Requested on</div>
                                <div className="rm-style-47">
                                    <div className="rm-style-48">{dataUser?.createdAt ?? ''}</div>{/*  fecha debe ser asi 20 Aug 2025 */}
                                    <div className="rm-style-49">{daysSince(dataUser?.createdAt ?? '')} Days Pending</div>{/* 7 Days Pending diferencia de dias */}
                                </div>
                            </div>
                            <div className="rm-style-50">
                                <div className="rm-style-51">Invited by :</div>
                                <div data-property-1="small" className="rm-style-52">
                                    {dataUser?.referenced != '' ? <img className="rm-style-53" src="https://placehold.co/28x28"></img> : null}
                                    <div className="rm-style-54">{dataUser?.referenced || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rm-style-55">
                        <div className="rm-style-56">
                            <div className="rm-style-57">Category</div>
                            <div className="rm-style-58">
                                {(questions?.[2]?.section03 ?? []).map((option) =>{
                                    return (dataUser?.[option.code] === true) ?
                                    (<div className="rm-style-59">
                                        <div className="rm-style-60">
                                            <div className="rm-style-61">{option?.title} </div>
                                            <div className="rm-style-62">{option?.description}</div>
                                        </div>
                                    </div>)
                                    : null
                                })}
                            </div>
                            <div className="rm-style-67">
                                <div className="rm-style-68">Initiation fee :</div>
                                <div className="rm-style-69">V1 - Category</div>
                            </div>
                        </div>
                        <div className="rm-style-70">
                            <div className="rm-style-71">Source</div>
                            <div className="rm-style-72">{dataUser?.linkVerify || ''}</div>
                        </div>
                    </div>
                    <div className="rm-style-73">
                        <div className="rm-style-74">
                            <div className="rm-style-75">Interest</div>
                            <div className="rm-style-76">
                                {(questions?.[0]?.section01 ?? []).map((option) =>{
                                    return (dataUser?.[option.code] === true) ?
                                    (<div className="rm-style-77">
                                        <div className="rm-style-78">{option?.description}</div>
                                    </div>)
                                    : null
                                })}
                            </div>
                        </div>
                        <div className="rm-style-81">
                            <div className="rm-style-82">Intentions</div>
                            <div className="rm-style-83">
                                {(questions?.[1]?.section02 ?? []).map((option) =>{
                                    return (dataUser?.[option.code] === true) ?
                                    (<div className="rm-style-77">
                                        <div className="rm-style-78">{option?.description}</div>
                                    </div>)
                                    : null
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rm-style-88">
                    <div data-type="second" className="rm-style-89" onClick={openModalDecline} role="button">
                        <div className="rm-style-90">Decline Request</div>
                    </div>
                    <div data-icon="true" data-type="main" className="rm-style-91" onClick={openModal} role="button">
                        <div className="rm-style-92">
                            Approve Request 
                        </div>
                        <div className="rm-style-93">
                            <KTSVG path='/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_approve.svg' />
                        </div>
                    </div>
                </div>
            </div>
            <ApproveModal show={showModal} onHide={() => setShowModal(false)} onApprove={handleAccept} />
            <DeclineModal show={showDeclineModal} onHide={() => setShowDeclineModal(false)} onDecline={handleDecline} />
        </div>);
}

export {RequestMembership}