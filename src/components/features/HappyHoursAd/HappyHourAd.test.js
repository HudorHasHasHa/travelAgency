import {shallow} from 'enzyme';
import React from 'react';
import HappyHourAd from './HappyHourAd';
import {happyHoursTimeFormat} from '../../../utils/formatTime';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};

const mockProps = {
  title: 'tytul',
  promoDescription: 'Lorem ipsum',
};

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

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe ('Component HappyHourAd ', () => {

  it('should render', () => {
    const component = shallow(<HappyHourAd/>);
    expect(component).toBeTruthy();
  });

  it('should render elements with class title and countdown', () => {
    const component = shallow(<HappyHourAd {...select}/>);
    expect((component).exists(select.title)).toBe(true);
    expect((component).exists(select.promoDescription)).toBe(true);
  });

  it('render title from given title props', () => {
    const component = shallow(<HappyHourAd {...mockProps}/>);
    const renderedTitle = component.find(select.title).text();
    expect(renderedTitle).toEqual(mockProps.title);
  });

});

const checkDescriptionAtTime = (time, expectedDescription) => (
  it(`should display correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  })
);

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', happyHoursTimeFormat(122));
  checkDescriptionAtTime('11:59:59', happyHoursTimeFormat(1));
  checkDescriptionAtTime('13:00:00', happyHoursTimeFormat(23 * 60 * 60));
});

const checkDescriptionAfterTime = (time, expectedDescription, delay) => {
  it(`should display correct time after ${delay} seconds`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    const component = shallow(<HappyHourAd {...mockProps}/>);

    const testDate = new Date();
    testDate.setSeconds(testDate.getSeconds() + delay);
    global.Date = mockDate(testDate.getTime());
    jest.advanceTimersByTime(delay * 1000);

    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', happyHoursTimeFormat(120), 2);
  checkDescriptionAfterTime('11:59:58', happyHoursTimeFormat(1), 1);
  checkDescriptionAfterTime('13:00:00', happyHoursTimeFormat(22 * 60 * 60), 60 * 60);
});

const checkPromoDescription = (time, expectedDescription) => (
  it(`should display correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  })
);

describe('Component HappyHourAd display info about promotion', () => {
  checkPromoDescription('11:59:59', happyHoursTimeFormat(1));
  checkPromoDescription('12:00:00', 'Lorem ipsum');
  checkPromoDescription('12:30:00', 'Lorem ipsum');
  checkPromoDescription('12:59:59', 'Lorem ipsum');
  checkPromoDescription('13:00:01', happyHoursTimeFormat(23*60*60-1));
});


// const checkPromoDescriptionAfterTime = (time, expectedDescription, delay) => {
//   it(`should display correct time after ${delay} seconds`, () => {
//     jest.useFakeTimers();
//     global.Date = mockDate(`2019-05-14T${time}.135Z`);
//     const component = shallow(<HappyHourAd {...mockProps}/>);

//     const testDate = new Date();
//     testDate.setSeconds(testDate.getSeconds() + delay);
//     global.Date = mockDate(testDate.getTime());
//     jest.advanceTimersByTime(delay * 1000);

//     const renderedTime = component.find(select.promoDescription).text();
//     expect(renderedTime).toEqual(expectedDescription);

//     global.Date = trueDate;
//     jest.useRealTimers();
//   });
// };

describe('Component HappyHourAd display info about promotion with delay', () => {
  checkDescriptionAfterTime('11:59:58', 'Lorem ipsum', 2);
  checkDescriptionAfterTime('11:59:54', 'Lorem ipsum', 7);
});

