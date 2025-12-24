import React, { useRef, useState } from "react";
import { KTSVG, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { ExperienceShort } from "../../teamExperiences/models/ExperienceSummaryModel";
import { Link, useHistory } from "react-router-dom";
import { MemberExperienceCategories } from "./MemberExperienceCategories";

interface Props {
    items?: ExperienceShort[];
    eventsScroll?: boolean;
}

export const MemberExperiences: React.FC<Props> = ({ items, eventsScroll }) => {

    const itemsExample:ExperienceShort = [
        {
            "id": 26,
            "title": "Eget a enim in tincidunt a eget. Massa orci at neque sit eu pulvinar ullamcorper imperdiet proin. Eg",
            "submittedBy": {
                "id": 53,
                "name": "Juan Carlos Lopez",
                "image": "https://nobilis-social.s3.amazonaws.com/profile_pics/default.jpg"
            },
            "typeDisplay": "Public",
            "dateUploaded": "Dec 23, 2025",
            "daysLeft": "Ended",
            "status": 3
        },
        {
            "id": 25,
            "title": "asdasdasdasd",
            "submittedBy": {
                "id": 47,
                "name": "Rodney Taylor",
                "image": "https://nobilis-social.s3.amazonaws.com/profile_pics/default.jpg"
            },
            "typeDisplay": "Public",
            "dateUploaded": "Dec 23, 2025",
            "daysLeft": "Ended",
            "status": 2
        },
        {
            "id": 24,
            "title": "Experience",
            "submittedBy": {
                "id": 53,
                "name": "Juan Carlos Lopez",
                "image": "https://nobilis-social.s3.amazonaws.com/profile_pics/default.jpg"
            },
            "typeDisplay": "Public",
            "dateUploaded": "Dec 22, 2025",
            "daysLeft": "Ended",
            "status": 3
        },
        {
            "id": 23,
            "title": "Eget a enim in tincidunt a eget. Massa orci at neque sit eu pulvinar ullamcorper imperdiet proin. Eg",
            "submittedBy": {
                "id": 47,
                "name": "Rodney Taylor",
                "image": "https://nobilis-social.s3.amazonaws.com/profile_pics/default.jpg"
            },
            "typeDisplay": "Public",
            "dateUploaded": "Dec 19, 2025",
            "daysLeft": "Ended",
            "status": 3
        },
        {
            "id": 22,
            "title": "Painting Experience Amid the Rolling Hills of Tuscany with a Master Artist",
            "submittedBy": {
                "id": 48,
                "name": "Hola Mundo",
                "image": "https://nobilis-social.s3.amazonaws.com/profile_pics/default.jpg"
            },
            "typeDisplay": "Public",
            "dateUploaded": "Dec 12, 2025",
            "daysLeft": "Ended",
            "status": 3
        }
    ];

    const categoriesExample = [
        {
            "id": 6,
            "name": "Artists",
            "createdAt": "2025-11-26T12:38:52.140864-06:00"
        },
        {
            "id": 4,
            "name": "Athlets",
            "createdAt": "2025-11-26T12:38:42.216691-06:00"
        },
        {
            "id": 3,
            "name": "Executives",
            "createdAt": "2025-11-26T12:38:32.952771-06:00"
        },
        {
            "id": 2,
            "name": "Founders",
            "createdAt": "2025-11-26T12:38:27.528359-06:00"
        },
        {
            "id": 8,
            "name": "Legacy Holders",
            "createdAt": "2025-11-26T12:39:03.048354-06:00"
        }
    ];

    const scrollRef = useRef<HTMLDivElement>(null);
    const placeholder = toAbsoluteUrl('/media/svg/nobilis/experience/experience-preview.jpg');

    // Drag tracking
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const history = useHistory()

    // === Drag-to-scroll ===
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!eventsScroll) return;
        setIsDown(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => setIsDown(false);
    const handleMouseUp = () => setIsDown(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!eventsScroll) return;
        if (!isDown || !scrollRef.current) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1; // scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // === Flechas ===
    const scrollNext = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    };

    const scrollPrev = () => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    };

    return (<>
        <div className='experience-preview-wrapper__img bg-experiences-section-black'>
            {/* <img className="" src={toAbsoluteUrl('/media/svg/nobilis/experience/experience-preview.jpg')} alt={'exp.title'}/> */}
        </div>
        <div className='members-page mt-experiences-section-black'>
            <div className='members-page__header'>
                <h1 className='members-page__title text-white'>
                    Experience&nbsp;<KTSVG path='/media/svg/nobilis/teams_and_partner/waitlist_nb_btn_icon_host_experience_btn.svg' />
                </h1>
            </div>
        </div>
        <MemberExperienceCategories data={categoriesExample} loading={false} />
        <div className={`experience-preview-invite-carousel mt-5 ${itemsExample?.length > 0 ? '' : 'd-none'}`}>
            {/* FLECHAS */}
            <button className="carousel-btn left" onClick={scrollPrev}>‹</button>
            <button className="carousel-btn right" onClick={scrollNext}>›</button>

            {/* WRAPPER */}
            <div
                ref={scrollRef}
                className="experience-preview-invite-scroll"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
                {(itemsExample ?? []).map((item) => (
                    <div onClick={() => {}} className="experience-preview-invite-card" key={item.id} >
                        <div className="experience-preview-invite-card-img">
                            <img src={item.coverImage ?? placeholder} alt={item.title} />
                        </div>

                        <div className="experience-preview-invite-card-info">
                            <div className="experience-preview-invite-badges">
                                <div className="experience-preview-invite-badge">
                                    <div className='line-svg'>
                                        <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-line-icon.svg' />
                                    </div>
                                    New
                                    <div className='line-svg'>
                                        <KTSVG path='/media/svg/nobilis/teams_and_partner/mask-success-line-icon.svg' />
                                    </div>
                                </div>
                                <div className="experience-preview-invite-badge-secondary">
                                    Invited by
                                </div>
                            </div>

                            <div className="experience-preview-invite-users">
                                <div className="experience-preview-invite-user">
                                    <img src={item.submittedBy.image} />
                                    <span>{item.submittedBy.name}</span>
                                </div>
                                {/* {item.invited.map((u, i) => (
                                <div className="experience-preview-invite-user" key={i}>
                                    <img src={u.img} />
                                    <span>{u.name}</span>
                                </div>
                                ))} */}
                            </div>

                            <div className="experience-preview-invite-title">{item.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>);
};
