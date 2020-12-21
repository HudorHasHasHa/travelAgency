import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import {Row, Col, Grid} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';

const OrderForm = ({options, tripCost, setOrderOption}) => {
  return(
    <Grid>
      <Row>
        {pricing.map(option => (
          <Col md={4} key={option.id}>
            <OrderOption {...option}
              currentValue={options[option.id]}
              setOrderOption={setOrderOption}/>
          </Col>
        ))}
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} tripOptions={options}/>
        </Col>
      </Row>
    </Grid>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};


export default OrderForm;
