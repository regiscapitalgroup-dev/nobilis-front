import React, { FC, useEffect, useRef, useState } from "react";
import { KTSVG } from '../../../helpers'
import { DrawerComponent } from "../../../assets/ts/components";
import { daysSince } from "../../../../app/helpers/FormatDate";
import { acceptRequest, rejectedRequest } from "../../../../app/services/waitingListService";
import { ApproveModal } from "../../../../app/pages/waitingList/modals/ApproveModal";
import { DeclineModal } from "../../../../app/pages/waitingList/modals/DeclineModal";
import { showErrorAlert } from "../../../../app/helpers/alert";
import questions from '../../../../app/modules/auth/components/helper/json-data/section1.json'
import { UserModel } from "../../../../app/modules/auth/models/UserModel";
import { RootState } from "../../../../setup";
import { shallowEqual, useSelector } from "react-redux";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    dataUser?: any;
};

const RequestMembership: FC<Props> = ({ isOpen, onClose, dataUser }) => {
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const drawerInstanceRef = useRef<DrawerComponent | null>(null);
    const onCloseRef = useRef(onClose);

    const [showModal, setShowModal] = useState(false)
    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const [user, setUser] = useState<number>(0)
    const userAccount = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
    const [activeTab, setActiveTab] = useState(1)

    // Mantener referencia actualizada de onClose
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    // Inicializar Drawer UNA SOLA VEZ
    useEffect(() => {
        if (!drawerRef.current) return;

        const elementId = drawerRef.current.id;
        let instance = DrawerComponent.getInstance(elementId);

        if (!instance) {
            instance = new DrawerComponent(drawerRef.current, {
                overlay: true,
                baseClass: 'drawer',
                overlayClass: 'drawer-overlay',
                direction: "end",
            });

            instance.on("kt.drawer.hide", () => {
                onClose();
            });
        }

        drawerInstanceRef.current = instance;

        // When Metronic drawer closes → sync React isOpen = false
        drawerRef.current.addEventListener("kt.drawer.afterHide", () => {
            onCloseRef.current();
        });

    }, []);

    // Abrir / cerrar según isOpen
    useEffect(() => {
        const instance = drawerInstanceRef.current;
        if (!instance) return;

        if (isOpen){
            instance.show()
            if(drawerRef.current) drawerRef.current.scrollTop = 0;
        }else{
            instance.hide()
        }

    }, [isOpen]);

    const handleAccept = async () => {
        try {
            let response = await acceptRequest(dataUser?.id)
            setShowModal(false)
            onClose();
            showErrorAlert({ title: 'Success', message: response?.data?.success ?? 'User approved' })
        } catch (error: any) {
            showErrorAlert({ title: 'Success', message: 'User approved' })
            setShowModal(false)
            onClose();
        }
    }

    const handleDecline = async (reason: string, note: string) => {
        try {
            let response = await rejectedRequest(dataUser?.id, {
                rejection_reason_id: reason ?? '',
                notes: note ?? '',
            })
            setShowDeclineModal(false)
            onClose();
            showErrorAlert({ title: 'Success', message: response?.success ?? 'User declined' })
        } catch (error: any) {
            showErrorAlert({ title: 'Success', message: 'User declined' })
            setShowDeclineModal(false)
            onClose();
        }
    }

    const changeTab = (status: number) => {
        setActiveTab(status);
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
            data-kt-drawer-overlay='true'
            data-kt-drawer-direction='end'
            data-kt-drawer-activate='true'
            data-kt-drawer-close='#kt_drawer_request_membership_close'
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            data-kt-drawer-width="{default:'95%', 'md': '648px'}"
            ref={drawerRef}
        >
            <div className="rm-style-0">
                <div className="rm-style-1">
                    <div className="rm-style-2 text-truncate">Request of Membership - {dataUser?.firstName ?? ''} {dataUser?.lastName ?? ''}</div>
                    <div data-property-1="close-circle" className="rm-style-3 cursor-pointer" id='kt_drawer_request_membership_close' onClick={onClose}>
                        <KTSVG path="/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_close_drawer.svg" className="rm-style-4" />
                    </div>
                </div>
                <div className="rm-style-7 d-flex flex-wrap flex-md-nowrap">
                    <div className="card col-12 col-md-8">
                        <ul className="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-bottom-0">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 1 ? "active" : ""}`}
                                    onClick={() => changeTab(1)}>
                                    General Information
                                </a>
                            </li>
                            <li className="separator-vertical">
                                <hr />
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 2 ? "active" : ""}`}
                                    onClick={() => changeTab(2)}>
                                    Support Tickets
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="rm-style-8 cursor-pointer col-12 col-md-4">
                        <div data-property-1="calendar-edit" className="rm-style-9">
                            <KTSVG path="/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_create_record.svg" className="rm-style-5" />
                            {/* <div className="rm-style-10"></div>
                            <div className="rm-style-11"></div>
                            <div className="rm-style-12"></div> */}
                        </div>
                        <div className="rm-style-13">Create Record</div>
                    </div>
                </div>
                {/* información del usuario */}
                <div className={`rm-style-14 ${activeTab == 1 ? "d-flex" : "d-none"}`}>
                    <div className="rm-style-23">
                        <div className="rm-style-24">
                            <div className="rm-style-16">
                                <div className="rm-style-17 col-12">
                                    <div className="rm-style-18">Assign Admin</div>
                                    <div className="rm-style-19">{userAccount?.firstName} {userAccount?.lastName}</div>
                                </div>
                            </div>
                            <div className="rm-style-25">
                                <div className="d-flex flex-row w-100">
                                    <div className="rm-style-26 justify-content-start w-50">#{dataUser?.id ?? ''}</div>
                                    <div className="rm-style-36 justify-content-end w-50"></div>
                                </div>
                                <div className="rm-style-27">{dataUser?.firstName ?? ''} {dataUser?.lastName ?? ''}</div>
                            </div>
                            <div className="rm-style-28 d-flex flex-wrap flex-md-nowrap">
                                <div className="rm-style-29 col-12 col-md-6">
                                    <div className="rm-style-30">Occupation </div>
                                    <div className="rm-style-31">{dataUser?.occupation || 'No occupation provided.'}</div>
                                </div>
                                <div className="rm-style-32 col-12 col-md-6">
                                    <div className="rm-style-33">City</div>
                                    <div className="rm-style-34">{dataUser?.city || 'No location provided.'}</div>
                                </div>
                            </div>
                            <div className="rm-style-38 d-flex flex-wrap flex-md-nowrap">
                                <div className="rm-style-39 col-12 col-md-6">
                                    <div className="rm-style-40">Email</div>
                                    <div className="rm-style-41">{dataUser?.email ?? ''}</div>
                                </div>
                                <div className="rm-style-42 col-12 col-md-6">
                                    <div className="rm-style-43">Phone</div>
                                    <div className="rm-style-44">{dataUser?.phoneNumber ?? ''}</div>
                                </div>
                            </div>
                            <div className="rm-style-38 d-flex flex-wrap flex-md-nowrap">
                                <div className="rm-style-45 col-12 col-md-6">
                                    <div className="rm-style-46">Requested on</div>
                                    <div className="rm-style-47">
                                        <div className="rm-style-48">{dataUser?.createdAt ?? ''}</div>{/*  fecha debe ser asi 20 Aug 2025 */}
                                        <div className="rm-style-49">{daysSince(dataUser?.createdAt ?? '')} Days Pending</div>{/* 7 Days Pending diferencia de dias */}
                                    </div>
                                </div>
                                <div className="rm-style-50 col-12 col-md-6">
                                    <div className="rm-style-51">Invited by :</div>
                                    <div data-property-1="small" className="rm-style-52">
                                        {dataUser?.referenced != '' ? <img className="rm-style-53" src="https://placehold.co/28x28"></img> : null}
                                        <div className="rm-style-54">{dataUser?.referenced || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* información del usuario - categorías */}
                    <div className="rm-style-55">
                        <div className="rm-style-56">
                            <div className="rm-style-57">Category</div>
                            <div className="rm-style-58">
                                {(questions?.[2]?.section03 ?? []).map((option, index) => {
                                    return (dataUser?.[option.code] === true) ?
                                        (<div key={`category-${index}`} className="rm-style-59">
                                            <div className="rm-style-60">
                                                <div className="rm-style-61">{option?.title} </div>
                                                <div className="rm-style-62">{option?.description}</div>
                                            </div>
                                        </div>)
                                        : null
                                })}
                            </div>
                            <div className="rm-style-67">
                                <div className="rm-style-68">Net Income: </div>
                                <div className="rm-style-69">{dataUser?.incomeRange || ''}</div>
                            </div>
                            <div className="rm-style-67">
                                <div className="rm-style-68">Initiation fee: </div>
                                <div className="rm-style-69">
                                    {(questions?.[2]?.section03 ?? []).map((option, index) => {
                                        return (dataUser?.[option.code] === true) ?
                                            (option?.description)
                                            : null
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="rm-style-70">
                            <div className="rm-style-71">Source</div>
                            <div className="rm-style-72">{dataUser?.linkVerify ? (<a href={dataUser?.linkVerify} target="_blank">{dataUser?.linkVerify}</a>) : 'N/A'}</div>
                        </div>
                    </div>
                    <div className="rm-style-73">
                        <div className="rm-style-74">
                            <div className="rm-style-75">Interest</div>
                            <div className="rm-style-76">
                                {(questions?.[0]?.section01 && questions?.[0]?.section01.length > 50) ?
                                    (questions?.[0]?.section01).map((option, index) => {
                                        return (dataUser?.[option.code] === true) ?
                                            (<div key={`interest-${index}`} className="rm-style-77">
                                                <div className="rm-style-78">{option?.description}</div>
                                            </div>)
                                            : null
                                    }) :
                                    (<div key={`interest-0`} className="rm-style-77"><div className="rm-style-78">No interests selected yet.</div></div>)
                                }
                            </div>
                        </div>
                        <div className="rm-style-81">
                            <div className="rm-style-82">Intentions</div>
                            <div className="rm-style-83">
                                {(questions?.[1]?.section02 && questions?.[1]?.section02.length > 50) ?
                                    (questions?.[1]?.section02 ?? []).map((option, index) => {
                                        return (dataUser?.[option.code] === true) ?
                                            (<div key={`intentions-${index}`} className="rm-style-77">
                                                <div className="rm-style-78">{option?.description}</div>
                                            </div>)
                                            : null
                                    }) :
                                    (<div key={`interest-0`} className="rm-style-77"><div className="rm-style-78">No intentions selected yet.</div></div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`rm-style-88 d-flex flex-wrap flex-md-nowrap ${activeTab == 1 ? "d-flex" : "d-none"}`}>
                    <div data-type="second" className={`rm-style-89 col-12 col-md-4 ${dataUser?.status == 'pending' ? "d-flex" : "d-none"}`} onClick={openModalDecline} role="button">
                        <div className="rm-style-90">Decline Request</div>
                    </div>
                    <div data-icon="true" data-type="main" className={`rm-style-91 col-12 col-md-5 ${dataUser?.status == 'pending' ? "d-flex" : "d-none"}`} onClick={openModal} role="button">
                        <div className="rm-style-92">
                            Approve Request
                        </div>
                        <div className="rm-style-93">
                            <KTSVG path='/media/svg/nobilis/waitlist/waitlist_nb_btn_icon_approve.svg' />
                        </div>
                    </div>
                </div>
                <div className={`rm-style-88 ${activeTab == 2 ? "d-flex" : "d-none"}`}>
                    No support tickets available.
                </div>
            </div>
            <ApproveModal show={showModal} onHide={() => setShowModal(false)} onApprove={handleAccept} />
            <DeclineModal show={showDeclineModal} onHide={() => setShowDeclineModal(false)} onDecline={handleDecline} />
        </div>);
}

export { RequestMembership }