import React from 'react';
import VariantCard from './VariantCard';

const VariantList = ({ variants }) => (
  <div className="variant-list">
    {variants.map(variant => (
      <VariantCard key={variant.variant_id} variant={variant} />
    ))}
  </div>
);

export default VariantList; 