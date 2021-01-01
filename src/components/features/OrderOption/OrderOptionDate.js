// import React, { useState }  from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


// // const OrderOptionDate = () => {
// //   const [startDate] = useState(new Date());
// //   return(
// //     <DatePicker
// //       selected={startDate}
// //       onChange={this.handleStartChange}
// //     />
// //   );
// // };

// const OrderOptionDate = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
//   );
// };

// export default OrderOptionDate;

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';

class OrderOptionDate extends React.Component {
  static propTypes = {
    setOptionValue: PropTypes.func,
  };

  state = {
    startDate: new Date(),
  };

  handleChange = date => {
    const {setOptionValue} = this.props;
    this.setState({
      startDate: date,
    });
    setOptionValue(date);
  };

  componentDidMount() {
    const {setOptionValue} = this.props;
    setOptionValue(this.state.startDate);
  }

  render() {
    return (
      <DatePicker
        dateFormat='dd/MM/yyyy'
        selected={this.state.startDate}
        onChange={date => this.handleChange(date)}/>
    );
  }
}

export default OrderOptionDate;
