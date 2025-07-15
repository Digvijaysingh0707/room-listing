import React, { useState, useRef, useEffect } from 'react';

const RoomCarousel = ({ media }) => {
  const [idx, setIdx] = useState(0);
  const mainRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false); // NEW
  const videoRef = useRef();

  // Intersection observer for video autoplay
  useEffect(() => {
    if (!mainRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true); // lazy load
      },
      { threshold: 0.25 }
    );

    obs.observe(mainRef.current);

    return () => {
      if (mainRef.current) obs.unobserve(mainRef.current);
    };
  }, [idx]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [isVisible]);

  if (!media || media.length === 0) return <div className="carousel-placeholder">No media available</div>;

  const current = media[idx];
  return (
    <div className="room-carousel-vertical">
      <div className="carousel-thumbnails">
        {media.map((item, i) => (
          <div key={i} className={`carousel-thumb-wrap${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)}>
            {item.type === 'video' ? (
              <div className="carousel-thumb-video">
                <video src={item.url} preload="metadata" muted tabIndex={-1} width={150} height={70} />
              </div>
            ) : (
              <img src={item.url} alt={`Thumbnail ${i + 1}`} className="carousel-thumb" loading="lazy" />
            )}
          </div>
        ))}
      </div>
      <div className="carousel-main-img-wrap" ref={mainRef}>
        {current.type === 'video' ? (
          <video
            ref={videoRef}
            src={ current.url} // lazy load
            controls
            muted
            loop
            playsInline
            className="carousel-main-img"
            poster=""
            preload="none"
          />
        ) : (
          <img src={current.url} alt="Room" className="carousel-main-img" loading="lazy" />
        )}
        {media.length > 1 &&
          <>
            <button className="carousel-arrow left" onClick={() => setIdx(idx === 0 ? media.length - 1 : idx - 1)}>&lt;</button>
            <button className="carousel-arrow right" onClick={() => setIdx(idx === media.length - 1 ? 0 : idx + 1)}>&gt;</button>
          </>
        }
      </div>
    </div>
  );
};

export default RoomCarousel; 