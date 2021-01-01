import React from 'react';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import {Row, Col, Grid} from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';
import Button from '../../common/Button/Button';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripName, tripId, tripCost, tripCountryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  if((options.name != '') && (options.contact != '')){
    const payload = {
      ...options,
      totalCost,
      tripName,
      tripId,
      tripCountryCode,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  } else {
    window.alert('missing name and contact');
  }
};

const OrderForm = ({options, tripCost, setOrderOption}) => {
  return(
    <Grid>
      <Row>
        {pricing.map(option => (
          <Col md={4} key={option.id}>
            <OrderOption
              {...option}
              currentValue={options[option.id]}
              setOrderOption={setOrderOption}/>
          </Col>
        ))}
        <Col xs={12}>
          <OrderSummary tripCost={tripCost} tripOptions={options}/>
        </Col>
        <Button onClick={() => sendOrder(options, tripCost)}>Order now!</Button>
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
