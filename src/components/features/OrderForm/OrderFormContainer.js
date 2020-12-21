import {connect} from 'react-redux';
import {getOrderOptions} from '../../../redux/orderRedux';
import OrderForm from './OrderForm.js';
import setOrderOption from '../../../redux/orderRedux';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
  setOrderOption: setOrderOption(state),
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: option => dispatch(setOrderOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);

