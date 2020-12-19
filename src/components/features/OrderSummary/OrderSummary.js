import React from 'react';
import styles from './OrderSummary.scss';
import { calculateTotal } from 'D://Projekty Kodilla/travelAgency/src/utils/calculateTotal';
import { formatPrice } from 'D://Projekty Kodilla/travelAgency/src/utils/formatPrice';
import PropTypes from 'prop-types';

const OrderSummary = ({ tripCost, tripOptions }) => {
  console.log(tripCost);
  return (
    <div className={styles.component}>
      <h3>Total: {formatPrice(calculateTotal(tripCost, tripOptions))}</h3>
    </div>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  tripOptions: PropTypes.object,
};

export default OrderSummary;
