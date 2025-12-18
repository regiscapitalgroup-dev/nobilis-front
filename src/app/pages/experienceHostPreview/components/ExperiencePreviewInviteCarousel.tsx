import React, { useRef, useState } from "react";
import { KTSVG, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { ExperienceShort } from "../../teamExperiences/models/ExperienceSummaryModel";
import { Link, useHistory } from "react-router-dom";

interface Props {
  items: ExperienceShort[];
  eventsScroll:boolean;
}

export const ExperiencePreviewInviteCarousel: React.FC<Props> = ({ items, eventsScroll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const placeholder = toAbsoluteUrl('/media/svg/nobilis/experience/experience-preview.jpg');

  // Drag tracking
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const history = useHistory()

  // === Drag-to-scroll ===
  const handleMouseDown = (e: React.MouseEvent) => {
    if(!eventsScroll) return;
    setIsDown(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!eventsScroll) return;
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

  return (
    <div className="experience-preview-invite-carousel">
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
        {(items ?? []).map((item) => (
          <div onClick={()=>history.replace(`/experience/detail/${item.id}`)} className="experience-preview-invite-card" key={item.id} >
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
  );
};
