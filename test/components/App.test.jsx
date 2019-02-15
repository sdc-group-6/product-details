import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../../client/src/components/App';
import Description from '../../client/src/components/Description';
import Likes from '../../client/src/components/Likes';
import Looks from '../../client/src/components/Looks';
import Share from '../../client/src/components/Share';
import Topbar from '../../client/src/components/Topbar';
import Specification from '../../client/src/components/Specification';

describe('App Component', () => {
  const component = shallow(<App />);
  it('should render Description', () => {
    expect(component.find(Description)).toHaveLength(1);
  });

  it('should render Likes', () => {
    expect(component.find(Likes)).toHaveLength(1);
  });

  it('should render Looks', () => {
    expect(component.find(Looks)).toHaveLength(1);
  });

  it('should render Share', () => {
    expect(component.find(Share)).toHaveLength(1);
  });

  it('should render Topbar', () => {
    expect(component.find(Topbar)).toHaveLength(1);
  });

  it('should not render Specification on page load', () => {
    expect(component.find(Specification)).toHaveLength(0);
  });

  it('should show Specification on click', () => {
    const clickFn = jest.fn();
    const component = shallow(<App specClick={clickFn} />);

    component.find('div#spec').simulate('click')

    expect(component.find('div#spec')).toHaveLength(1);
    expect(component.find(Specification)).toHaveLength(1);
    expect(component.find(Description)).toHaveLength(0);
  })

  it('should be able to toggle from Specification and Description', () => {
    const clickFn = jest.fn();
    const component2 = shallow(<App onClick={clickFn} />);

    component2.find('div#spec').simulate('click');
    expect(component2.find(Specification)).toHaveLength(1);
    expect(component2.find(Description)).toHaveLength(0);

    component2.find('div#desc').simulate('click');
    expect(component2.find(Specification)).toHaveLength(0);
    expect(component2.find(Description)).toHaveLength(1);
  })
})
