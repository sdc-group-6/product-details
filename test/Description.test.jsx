import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Description from '../client/src/components/Description';

describe('Description Component', () => {
  it('should render description correctly when passed in descriptions', () => {
    const desc = { short_desc: 'This is a short description',
                    name: 'ULTRABOOST',
                    long_desc: 'This is a long description of ultraboost.'
                  }
    const component = shallow(<Description shoe={desc} />);
    expect(component).toMatchSnapshot();
  });
  // it('should hide description component on specification click', () => {
  //   const clickFn = jest.fn();
  //   const component = shallow(<Description onClick={clickFn} />);
  //
  //   component
  //    .find('div#desc')
  //    .simulate('click');
  //    expect(clickFn).toHaveBeenCalled();
  // })
});
