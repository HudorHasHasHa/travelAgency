import React from 'react';
import {formatPrice} from '../../../utils/formatPrice';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


const OrderOptionDropdown = ({setOptionValue, values, required, currentValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
  >
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id}>
        {value.name}
        ({formatPrice(value.price)})
      </option>
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionDropdown;
