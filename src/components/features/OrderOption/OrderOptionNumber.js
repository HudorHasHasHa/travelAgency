import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionNumber = ({limits, currentValue, setOptionValue, price}) => {
  return(
    <div className={styles.number}>
      <input type="number"
        value={currentValue}
        min={limits.min}
        max={limits.max}
        onChange={event => setOptionValue(event.currentTarget.value)}
      />
      {formatPrice(price)}
    </div>
  );
};

OrderOptionNumber.propTypes = {
  limits: PropTypes.any,
  price: PropTypes.number,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionNumber;
