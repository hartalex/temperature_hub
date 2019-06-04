import React from 'react';
import ButtonComponent from './buttonComponent.js';
import renderer from 'react-test-renderer';

describe('Button Component', async () => {
  it('Renders', async () => {
    const component = renderer.create(<ButtonComponent />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
