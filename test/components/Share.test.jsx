import React from 'react';
import { shallow } from 'enzyme';
import Share from '../../client/src/components/Share';

let sample = {
  "id": 1,
  "user1": "anonymouse",
  "img1": "https://s3-us-west-1.amazonaws.com/adidas-shoe/share3.jpg",
  "user2": "indigosparkle",
  "img2": "https://s3-us-west-1.amazonaws.com/adidas-shoe/share7.jpg",
  "user3": "weareliving",
  "img3": "https://s3-us-west-1.amazonaws.com/adidas-shoe/share1.jpg",
  "user4": "urk3wl",
  "img4": "https://s3-us-west-1.amazonaws.com/adidas-shoe/share5.jpg",
  "user5": "cereal_killer",
  "img5": "https://s3-us-west-1.amazonaws.com/adidas-shoe/share3.jpg"
}

describe('Share Component', () => {
  let wrapper = shallow(<Share shares={sample} />);

  it('should look like snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have 5 different pictures/users', () => {
    expect(wrapper.find('div.overlay-blk').length).toBe(5);
  });

  it('should not show username on normal display', () => {
    expect(wrapper.find('span').at(0)).toHaveClassName('hidden');
    expect(wrapper.find('span').at(3)).toHaveClassName('hidden');
  });

  it('should display username on hover/mouseenter', () => {
    wrapper.find('div.overlay-blk').at(0).prop('onMouseEnter')();
    expect(wrapper.find('span').at(0).hasClass('hidden')).toBe(false);
  });

  it('should display correct username on hover', () => {
    wrapper.find('div.overlay-blk').at(4).prop('onMouseEnter')();
    expect(wrapper.find('span').at(4).hasClass('hidden')).toBe(false);
    expect(wrapper.find('span').at(4).text()).toBe('cereal_killer');
  })

  it('should not display username on mouse leave', () => {
    wrapper.find('div.overlay-blk').at(1).prop('onMouseEnter')();
    expect(wrapper.find('span').at(1).hasClass('hidden')).toBe(false);

    wrapper.find('div.overlay-blk').at(1).prop('onMouseLeave')();
    expect(wrapper.find('span').at(1)).toHaveClassName('hidden');
  });
})
