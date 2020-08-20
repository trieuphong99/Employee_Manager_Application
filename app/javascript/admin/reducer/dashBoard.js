import * as actionTypes from '../const/account'

let initialState = {
  data: [],
  dataPie: [],
  dataBar: []
}

const DashBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_DASHBOARD:
      return {
        ...state,
        data: action.data
      }
    case actionTypes.GET_DATA_PIECHART:
      return {
        ...state,
        dataPie: action.data
      }
    case actionTypes.GET_DATA_BARCHART:
      return {
        ...state,
        dataBar: action.data
      }
    default:
      return state;
  }
}
export default DashBoardReducer;