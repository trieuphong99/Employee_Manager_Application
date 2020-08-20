import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Overtime from '../../components/selection/overTime/overTime';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

Enzyme.configure({adapter: new Adapter});
const mockStore = configureStore([]);

function setup(){
  const props = {
    listOT: jest.fn()
  }
  let store = mockStore({});
  const enzymeWrapper = shallow(
    <Provider store={store}>
      <Overtime {...props} />
    </Provider>
  )
  return {
    props,
    enzymeWrapper
  }
}
describe('component overtime', () => {
  it('show render', () => {
    const {enzymeWrapper} = setup();
    expect(enzymeWrapper.contains(<div className="container-fluid" />).valueOf(true))
  })
})