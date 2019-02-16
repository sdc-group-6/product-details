import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Likes from '../../client/src/components/Likes';
import Description from '../../client/src/components/Description';
import LikeCard from '../../client/src/components/LikeCard';
import sampleShoes from './data.js';

describe('Likes component', () => {

  const component = shallow(<Likes shoes={sampleShoes} />);


  it('should display like snapshot', () => {
    expect(component).toMatchSnapshot();
  })

  describe('Image Carousel', () => {
    it('should display carousel of shoes properly', () => {
      expect(component.find('div#carouselLikes')).toHaveLength(1);
    });

    it('should start with first slide', () => {
      expect(component.find('li.active')).toHaveLength(1);
      expect(component.find('li').at(0)).toHaveClassName('active');
    });

    it('should display 4 pages of image cards', () => {
      expect(component.find('div.carousel-item')).toHaveLength(4);
    })

    it('should have rendered LikeCard component correctly', () => {
      expect(component.find(LikeCard)).toHaveLength(4);
    })
  })


})
