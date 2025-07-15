import React,{useState} from 'react';
import RoomCarousel from './RoomCarousel';

const RoomContainer = React.forwardRef(({ room }, ref) => {
  // Use first variant for price/amenities
  const variant = room.variants?.[0] || {};
  // Collect videos (priority) and images
  let media = [];
  // 1. Videos from room.properties.video_url (if present)
  if (room.properties?.video_url?.med) {
    media.push({ type: 'video', url: room.properties.video_url.med });
  }
  // 2. Videos from room.properties.new_videos (if present)
  if (Array.isArray(room.properties?.new_videos)) {
    room.properties.new_videos.forEach(v => {
      if (v.video_url?.med) {
        media.push({ type: 'video', url: v.video_url.med });
      }
    });
  }
  // 3. Images
  const images = room.properties?.room_images?.[0]?.image_urls || [];
  media = media.concat(images.map(url => ({ type: 'image', url })));

  const amenities = variant.display_properties?.slice(0, 3) || [];
    const allAmenities = variant.display_properties || [];
  const moreAmenities = (variant.display_properties?.length || 0) > 3;
  const price = variant.total_price?.discounted_price_rounded || variant.total_price?.total_price_rounded;
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const amenitiesToShow = showMoreAmenities ? allAmenities : amenities;
  return (
    <div className="room-container card-layout" ref={ref}>
      <div className="room-left">
        <RoomCarousel media={media} />
      </div>
      <div className="room-right">
        <div className="room-header-row">
          <div>
            <div className="room-title">{room.name}</div>
          </div>
        </div>
        <div className="room-amenities-row">
          {amenitiesToShow.map(a => (
            <span className="room-amenity" key={a.name}>
              {/* icon could go here */}
              {a.display_name}
            </span>
          ))}
          {moreAmenities && <span className="room-amenity more" onClick={() => setShowMoreAmenities(!showMoreAmenities)}>{showMoreAmenities? "Show less":`+ ${variant.display_properties.length - 3} more`}</span>}
        </div>
        <div className="room-bottom-row">
          <div className="room-price">
            <span className="room-price-main">₹{price}</span>
            <span className="room-price-sub">+ taxes & fees · per room per night</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RoomContainer; 