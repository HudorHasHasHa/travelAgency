import {shallow} from 'enzyme';
import React from 'react';
import DaysToSummer from './DaysToSummer.js';

const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};

const checkDisplayAtDate = (time, expectedDescription) => {
  it('is not displaying anything in summer', () => {
    global.Date = mockDate(`${time}T11:57:58.135Z`);

    const component = shallow(<DaysToSummer/>);
    console.log(component.debug());
    const renderedTime = component.find('.daysToSummerComponent').text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component', () => {
  checkDisplayAtDate('2021-08-15', '');
  checkDisplayAtDate('2021-06-21', '');
  checkDisplayAtDate('2021-09-30', '');
  checkDisplayAtDate('2020-11-15', '217 days to summer!');
  checkDisplayAtDate('2021-02-21', '119 days to summer!');
  checkDisplayAtDate('2023-02-10', '130 days to summer!');
  checkDisplayAtDate('2020-11-24', '208 days to summer!');
});


