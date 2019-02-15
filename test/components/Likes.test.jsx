import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Likes from '../../client/src/components/Likes';
import Description from '../../client/src/components/Description';

describe('Likes component', () => {
  const sample = [{
      "id": 1,
      "name": "SOLARBOOST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/14.jpg",
      "type": "Performance",
      "price": 110,
      "short_desc": 'This is a short description for solarboost',
      "long_desc": 'This is a long description of solarboost'
    },
    {
      "id": 2,
      "name": "ANDALAX",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/13.jpg",
      "type": "Comfort",
      "price": 115,
      "short_desc": 'This is a short description for andalax',
      "long_desc": 'This is a long description of andalax'
    },
    {
      "id": 3,
      "name": "SOLAR GLIDE",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/12.jpg",
      "type": "Originals",
      "price": 130
    },
    {
      "id": 4,
      "name": "ULTRABOOST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/ultraboost-black.jpg",
      "type": "Performance",
      "price": 95,
    },
    {
      "id": 5,
      "name": "SOLAR GLIDE ST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/11.jpg",
      "type": "Performance",
      "price": 140,
    },
    {
      "id": 6,
      "name": "SOLARBOOST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/14.jpg",
      "type": "Performance",
      "price": 110
    },
    {
      "id": 7,
      "name": "ANDALAX",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/13.jpg",
      "type": "Comfort",
      "price": 115
    },
    {
      "id": 8,
      "name": "SOLAR GLIDE",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/12.jpg",
      "type": "Originals",
      "price": 130
    },
    {
      "id": 9,
      "name": "ULTRABOOST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/ultraboost-black.jpg",
      "type": "Performance",
      "price": 95,
    },
    {
      "id": 10,
      "name": "SOLAR GLIDE ST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/11.jpg",
      "type": "Performance",
      "price": 140,
    },
    {
      "id": 11,
      "name": "SOLARBOOST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/14.jpg",
      "type": "Performance",
      "price": 110
    },
    {
      "id": 12,
      "name": "ANDALAX",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/13.jpg",
      "type": "Comfort",
      "price": 115
    },
    {
      "id": 13,
      "name": "SOLAR GLIDE",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/12.jpg",
      "type": "Originals",
      "price": 130
    },
    {
      "id": 14,
      "name": "ULTRABOOST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/ultraboost-black.jpg",
      "type": "Performance",
      "price": 95,
    },
    {
      "id": 15,
      "name": "SOLAR GLIDE ST",
      "img_url": "https://s3-us-west-1.amazonaws.com/adidas-shoe/11.jpg",
      "type": "Performance",
      "price": 140,
    },
  ];

  const component = shallow(<Likes shoes={sample} />);


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

    it('should have at least have 2 image cards', () => {
      expect(component.find('div.card').length).toBeGreaterThan(2);
    })

    it('should display name, type, and price on each card', () => {
      expect(component.find('span#like-name').at(0).text()).toBe('SOLARBOOST');
      expect(component.find('span#like-type').at(0).text()).toBe('Performance');
      expect(component.find('span#like-price').at(0).text()).toBe('$110');
    })

    it('should render images in order', () => {
      expect(component.find('span#like-name').at(0).text()).toBe('SOLARBOOST');
      expect(component.find('span#like-name').at(1).text()).toBe('ANDALAX');
      expect(component.find('span#like-price').at(2).text()).toBe('$130');
    })
  })


})
