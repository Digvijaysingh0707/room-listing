import React, { useState, useRef, useEffect } from 'react';

const RoomCarousel = ({ media }) => {
  const [idx, setIdx] = useState(0);
  const mainRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for video autoplay
  useEffect(() => {
    if (!mainRef.current) return;
    const obs = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(mainRef.current);
    return () => obs.disconnect();
  }, [idx]);

  if (!media || media.length === 0) return <div className="carousel-placeholder">No media available</div>;

  const current = media[idx];
  console.log({media});
  return (
    <div className="room-carousel-vertical">
      <div className="carousel-thumbnails">
        {media.map((item, i) => (
          <div key={i} className={`carousel-thumb-wrap${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)}>
            {item.type === 'video' ? (
              <div className="carousel-thumb-video">
                <video src={item.url} preload="metadata" muted tabIndex={-1} width={150} height={70}/>
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
            src={current.url}
            controls
            autoPlay={isVisible}
            muted
            loop
            playsInline
            className="carousel-main-img"
            poster=""
          />
        ) : (
          <img src={current.url} alt="Room" className="carousel-main-img" loading="lazy" />
        )}
        <button className="carousel-arrow left" onClick={() => setIdx(idx === 0 ? media.length - 1 : idx - 1)}>&lt;</button>
        <button className="carousel-arrow right" onClick={() => setIdx(idx === media.length - 1 ? 0 : idx + 1)}>&gt;</button>
      </div>
    </div>
  );
};

export default RoomCarousel; 