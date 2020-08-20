import * as types from '../../const/loading';
import reducer from '../../reducer/loading';
import { showLoading } from '../../actions/loading';

describe('loading reducer', () => {
  it('the initial state', () => {
    expect(reducer(undefined, [])).toEqual(
      {
        showLoading: false
      }
    )
  })
  it('show loading', () => {
    expect(reducer([], showLoading())).toEqual(
      {
        showLoading: true
      }
    )
    expect(reducer({
      showLoading:false
    }, showLoading())).toEqual(
      {
        showLoading: true
      },
      {
        showLoading: false
      }
    )
  })
})