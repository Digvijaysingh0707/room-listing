import React from 'react';

const VariantCard = ({ variant }) => (
  <div className="variant-card">
    <div className="variant-title">{variant.name}</div>
    <div className="variant-price">
      {variant.total_price?.discounted_price_rounded || variant.total_price?.total_price_rounded} {variant.total_price?.currency}
    </div>
    <div className="variant-desc">
      {variant.display_properties?.map(p => p.display_name + ': ' + p.value).join(' | ')}
    </div>
  </div>
);

export default VariantCard; 