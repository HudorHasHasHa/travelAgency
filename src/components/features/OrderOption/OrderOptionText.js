import React from 'react';

const OrderOptionText = (setOptionValue) => (
  <input type="text"
    onChange={event => setOptionValue(event.currentTarget.value)}
  />
);

export default OrderOptionText;
