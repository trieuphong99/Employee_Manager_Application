import * as actionTypes from '../../const/loading';
import { showLoading, hideLoading } from '../../actions/loading';

describe('loading', () => {
  it('show loading', () => {
    const expectedAction1 = {
      type: actionTypes.SHOW_LOADING
    }
    expect(showLoading()).toEqual(expectedAction1)
  });
  it('hide loading', () => {
    const expectedAction2 = {
      type: actionTypes.HIDE_LOADING
    }
    expect(hideLoading()).toEqual(expectedAction2)
  })
})