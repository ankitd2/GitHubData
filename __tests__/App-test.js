import React from 'react';
import {Linking} from "expo";
import {shallow} from 'enzyme';
import 'react-native';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

import App from '../App';
import Parser from '../Parser.js'
import RepositoriesScreen from "../screens/RepositoriesScreen";
import RepositoriesData from "../screens/RepositoriesData";
import {createSwitchNavigator} from "@react-navigation/core";
import createBrowserApp from "@react-navigation/web/dist/createBrowserApp";
import HomeScreen from "../screens/HomeScreen";
import FollowerScreen from "../screens/FollowerScreen";
import FollowingScreen from "../screens/FollowingScreen";

// jest.mock('../request');
// it('works with promises', () => {
//     expect.assertions(1);
//     return parser.query
// })

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

it('Home Screen renders correctly', () => {
  const tree = renderer.create(<HomeScreen />);
  expect(tree).toMatchSnapshot();
});
it('Repo Screen renders correctly', () => {
  const tree = renderer.create(<RepositoriesScreen />);
  expect(tree).toMatchSnapshot();
});
it('Following renders correctly', () => {
  const tree = renderer.create(<FollowingScreen />);
  expect(tree).toMatchSnapshot();
});

it('Followers renders correctly', () => {
  const tree = renderer.create(<FollowerScreen />);
  expect(tree).toMatchSnapshot();
});
describe('Fetch Data works', () => {
  test('gets data', ()=> {
    const tree = renderer.create(<Parser />);
    expect(tree).toMatchSnapshot();
  })
});
describe('SwitchNavigator works', () => {
  test('renders successfully', () => {
    const AppNavigator = createSwitchNavigator({
      HomeScreen,
      RepositoriesScreen,
      FollowerScreen,
      FollowingScreen

    });
    const App = createBrowserApp(AppNavigator);
    const rendered = renderer.create(<App />).toJSON();

    expect(rendered).toMatchSnapshot();
  });
});
// describe('App', () => {
//   jest.useFakeTimers();
//
//   beforeEach(() => {
//     NavigationTestUtils.resetInternalState();
//   });
//
describe('Parser', () =>{
  it('displays user profile', done =>{
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

    const wrapper = shallow(<Parser />); // 5

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/graphql');
  })
});
  it(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
//
  it(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
// });
