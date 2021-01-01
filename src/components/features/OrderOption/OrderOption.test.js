import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption.js';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  const propsy = {
    name: 'Your name',
    type: 'text',
  };

  it('does render', () => {
    expect(shallow(<OrderOption {...propsy} />)).toBeTruthy();
  });

  it('should return empty object if called without  required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render proper value of prop name', () => {
    const component = shallow(<OrderOption name={propsy.name} type={propsy.type} />);
    const renderedTitle = component.find('.title').first().text();
    expect(renderedTitle).toEqual(propsy.name);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    // tworzenie atrapy funkcji 1
    let mockSetOrderOption;

    beforeEach(() => {
      // tworzenie atrapy funkcji 2
      mockSetOrderOption = jest.fn();
      component = shallow(<OrderOption
        type={type}
        // tworzenie atrapy funkcji 3
        setOrderOption={mockSetOrderOption}
        {...mockProps}
        {...mockPropsForType[type]}
      />);
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });


    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        // tworzenie atrapy funkcji 4
        it('should run setOrderOption function on change', () => {
          // simulate przyjmuje 1 lub 2 argumenty,
          //('rodzaj eventu', wartość przekazywana handlerowi tego eventu)
          renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        it('does render suitable elements with icon class', () => {
          const icon = renderedSubcomponent.find('.icon');
          expect(icon.length).toBe(mockProps.values.length + 2);
        });

        it('should run setOrderOption function on click', () => {
          const icon = renderedSubcomponent.find('.icon');
          icon.at(3).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });
        break;
      }
      case 'checkboxes': {
        it('does render suitable elements with checkboxes class', () => {
          const type = renderedSubcomponent.find('[type="checkbox"]');
          expect(type.length).toBe(mockProps.values.length);
        });

        it('should run setOrderOption function on click', () => {
          const type = renderedSubcomponent.find('[type="checkbox"]');
          type.at(1).simulate('change', { currentTarget: { checked: true } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'number': {
        it('does render suitable elements with number class', () => {
          const input = renderedSubcomponent.find('[type="number"]');
          expect(input.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('[type="number"]').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('contains', () => {
          const text = renderedSubcomponent.find('[type="text"]');
          expect(text.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          const text = renderedSubcomponent.find('[type="text"]');
          text.simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {

        it('should run setOrderOption function on change', () => {
          const date = renderedSubcomponent.find(DatePicker);
          date.simulate('change', testValue);
        });

        break;
      }
    }
  });
}
