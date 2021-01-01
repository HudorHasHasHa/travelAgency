import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  const propsy = {
    id: 'abc',
    image: 'image',
    name: 'name',
    // intro: PropTypes.string,
    cost: '$139,398.25',
    days: 7,
    tags: ['tekst1', 'tekst2', 'tekst3'],
  };

  const component = shallow(<TripSummary {...propsy}/>);

  it('should generate proper link', () => {

    const expectedLink = `/trip/${propsy.id}`;
    const renderedLink = component.find('Link').prop('to');
    expect(renderedLink).toEqual(expectedLink);
  });

  it('should have right image src and alt', () => {
    const renderedSrc = component.find('img').prop('src');
    const renderedAlt = component.find('img').prop('alt');

    expect(renderedSrc).toEqual(propsy.image);
    expect(renderedAlt).toEqual(propsy.name);

  });

  it('renders props name, cost and days', () => {
    // Name
    expect(component.find('.title').text()).toEqual(propsy.name);

    //Cost
    const renderedStandardCost = component.find('.details span').at(1).text();
    expect(renderedStandardCost).toContain('139,398');

    // Days
    const renderedDays1 = component.find('.details span').at(0).text();
    const renderedDays2 = renderedDays1.split(' ')[0];

    expect(parseInt(renderedDays2)).toEqual(propsy.days);
  });

  it('does raise an error in case of absence of any props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('does render span for every tag in tags prop', () => {
    const renderedTags = [];
    for(let i=0; i<propsy.tags.length; i++){
      renderedTags.push(component.find('.tag').at(i).text());
    }
    // renderedTags.push('tralalala');
    expect(renderedTags).toEqual(propsy.tags);
  });

  it('tests if tags prop is false or an empty array', () => {
    const falseTags = undefined;
    const falseComponent = shallow(<TripSummary {...propsy} tags={falseTags}/>);
    const renderedFalseComponent = falseComponent.find('.tags').exists();
    expect(renderedFalseComponent).toBeFalsy();

    const emptyTags = [];
    const emptyComponent = shallow(<TripSummary {...propsy} tags={emptyTags}/>);
    expect(emptyComponent.find('.tags').exists()).toBeFalsy();
  });
});
