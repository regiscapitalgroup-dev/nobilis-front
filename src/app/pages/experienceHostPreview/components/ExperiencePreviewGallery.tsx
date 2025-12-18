import { useRef, useEffect, useState } from "react";

type ExperiencePreviewGalleryProps = {
  images: any[];
  eventsScroll: boolean;
};

export function ExperiencePreviewGallery({ images, eventsScroll }: ExperiencePreviewGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // ---- DRAG TO SCROLL ----
  useEffect(() => {
    if(!eventsScroll) return;
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDown.current = true;
      el.classList.add("dragging");
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown.current = false;
      el.classList.remove("dragging");
    };

    const onMouseUp = () => {
      isDown.current = false;
      el.classList.remove("dragging");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5; // sensibilidad
      el.scrollLeft = scrollLeft.current - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // ---- SCROLL CON RUEDA (VERTICAL → HORIZONTAL) ----
  useEffect(() => {
    if(!eventsScroll) return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // ---- BOTONES SIGUIENTE / ANTERIOR ----
  const scrollByAmount = 320; // tamaño aproximado de una imagen

  const handlePrev = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const handleNext = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <div className="experience-preview-gallery-wrapper">
      <button className={`experience-preview-arrow left ${eventsScroll ? 'd-flex' : 'd-none'}`} onClick={handlePrev}>
        ‹
      </button>

      <div ref={scrollRef} className={`${eventsScroll ? 'experience-preview-gallery-carousel' : 'experience-preview-gallery-no-scroll' }`}>
        {images.map((src, index) => (
          <div key={index} className="experience-preview-gallery-carousel-item">
            <img
              className="experience-preview-gallery-image"
              src={src.image}
              alt={`Gallery image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button className={`experience-preview-arrow right ${eventsScroll ? 'd-flex' : 'd-none'}`} onClick={handleNext}>
        ›
      </button>
    </div>
  );
}
