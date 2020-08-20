import _ from 'lodash';

export const SliceData = (data, index, item) => {
  return ( [
      ..._.slice(data, 0, index),
      item,
      ..._.slice(data, index + 1)
    ])
  
}
