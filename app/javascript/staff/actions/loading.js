import * as uiType from '../const/loading';

export const showLoading = () => ({
  type: uiType.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: uiType.HIDE_LOADING,
});
