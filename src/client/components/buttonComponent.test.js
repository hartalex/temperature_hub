import React from 'react';
import ButtonComponent from './buttonComponent.js';
import renderer from 'react-test-renderer';
import mockdate from 'mockdate';

describe('Button Component', () => {
  it('Renders', () => {
    mockdate.set('2017-01-01T00:00:00.000Z');

    const component = renderer.create(<ButtonComponent />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  afterEach(mockdate.reset);
});
