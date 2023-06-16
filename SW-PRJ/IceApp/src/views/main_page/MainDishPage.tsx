/* eslint-disable prettier/prettier */
import MainDish from './component/pages/MainDish';
import {DataMain} from './component/pages/DataModal';
import MainScreen from './component/pages/PageLayout';
import React from 'react';
import CTMapList from '../../components/CTMapList';

const data: DataMain[] = [
  {
    id: 0,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 1,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 2,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 3,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 4,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 5,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 6,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
  {
    id: 7,
    title: 'Fired Rice',
    url: require('./component/products/sumptous1.png'),
  },
];

const Data = () => {
  return (
    <CTMapList
      data={data}
      style={{paddingHorizontal: 30, zIndex: -1}}
      numColumns={2}
      renderItem={<MainDish title={item.title} url={item.url} key={item.id}/>}
    />
  );
};

const titleData = [
  'Main Dishes',
  'Find the best selling dishes. All meals',
  'are prepared fresh',
];

const MainDishPage = () => {
  return <MainScreen DataPage={Data} titleData={titleData} />;
};

export default MainDishPage;
