import React, { useState, useRef, useEffect } from 'react';

const RoomCard = React.memo(React.forwardRef(({ variant }, ref) => {
  // Media preference: video > images > nothing
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const mediaRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (mediaRef.current) obs.observe(mediaRef.current);
    return () => obs.disconnect();
  }, []);

  // Video: only load/autoplay if visible
  const showVideo = variant.videoUrl;
  const showImages = !showVideo && variant.roomImages.length > 0;

  return (
    <div className="room-card" ref={ref}>
      <div className="room-media" ref={mediaRef}>
        {showVideo && (
          isVisible ? (
            <video
              src={variant.videoUrl}
              controls
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setMediaLoaded(true)}
              style={{ display: mediaLoaded ? 'block' : 'none' }}
            />
          ) : (
            <div className="media-placeholder">Video will load when visible</div>
          )
        )}
        {showImages && (
          <img
            src={variant.roomImages[0]}
            alt={variant.roomName}
            loading="lazy"
            onLoad={() => setMediaLoaded(true)}
            style={{ display: mediaLoaded ? 'block' : 'none' }}
            srcSet={variant.roomImages.slice(0,3).join(',')}
          />
        )}
        {!showVideo && !showImages && (
          <div className="media-placeholder">No media available</div>
        )}
        {!mediaLoaded && <div className="media-skeleton"></div>}
      </div>
      <div className="room-info">
        <h3>{variant.roomName} - {variant.name}</h3>
        <div className="room-price">{variant.total_price?.discounted_price_rounded || variant.total_price?.total_price_rounded} {variant.total_price?.currency}</div>
        <div className="room-desc">{variant.display_properties?.map(p => p.display_name + ': ' + p.value).join(' | ')}</div>
      </div>
    </div>
  );
}));

export default RoomCard;