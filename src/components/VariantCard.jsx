import React from 'react';
import './VariantCard.css';

const icons = {
  meal: <span role="img" aria-label="meal">🍽️</span>,
  bed: <span role="img" aria-label="bed">🛏️</span>,
  person: <span role="img" aria-label="person">👤</span>,
};

function getAmenityIcon(name) {
  if (/meal|breakfast|lunch|dinner|food/i.test(name)) return icons.meal;
  if (/bed/i.test(name)) return icons.bed;
  if (/adult|person/i.test(name)) return icons.person;
  return null;
}

const VariantCard = ({ variant }) => {
  const price = variant.total_price?.discounted_price_rounded || variant.total_price?.total_price_rounded;
  const currency = variant.total_price?.currency || 'MYR';
  const discount = variant.total_price?.discount_percent_rounded;
  const cancellation = variant.cancellation_policy || 'Free cancellation till 19 Sep 2024, 20:00 PM';
  const amenities = [
    ...(variant.display_properties || []).map(p => ({
      name: p.display_name,
      value: p.value,
      icon: getAmenityIcon(p.display_name),
    })),
  ];
  return (
    <div className="variant-card">
      <div className="variant-title-row">
        <div className="variant-title">{variant.name}</div>
      </div>
      <div className="variant-amenities">
        {amenities.map((a, i) => (
          <div className="variant-amenity" key={i}>
            {a.icon && <span className="variant-amenity-icon">{a.icon}</span>}
            <span>{a.name}</span>
          </div>
        ))}
      </div>
      <div className="variant-price-row">
        <span className="variant-price">{price} {currency}</span>
        {discount && <span className="variant-discount">{discount}% off</span>}
      </div>
      <div className="variant-cancellation">
        <span className="variant-cancellation-main">{cancellation}</span>
      </div>
      <div className="variant-cancellation-link">
        Cancellation charges <span className="variant-arrow">&rsaquo;</span>
      </div>
      <button className="variant-book-btn">Book now</button>
    </div>
  );
};

export default VariantCard; 