import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../client/src/components/App';
import Description from '../client/src/components/Description';
import Likes from '../client/src/components/Likes';
import Looks from '../client/src/components/Looks';
import Share from '../client/src/components/Share';
import Topbar from '../client/src/components/Topbar';

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
})
