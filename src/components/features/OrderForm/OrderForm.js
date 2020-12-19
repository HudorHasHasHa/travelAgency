import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import {Row, Col, Grid} from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const OrderForm = ({options, tripCost}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} tripOptions={options}/>
      </Col>
    </Row>
  </Grid>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};


export default OrderForm;
