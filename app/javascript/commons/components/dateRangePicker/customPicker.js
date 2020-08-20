import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const picker = [
  { value: "Today", color: "default" },
  { value: "This week", color: "primary" },
  { value: "This month", color: "secondary" },
]

export default function (props) {
  const { pickDate } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOnClick = (value) => {
    let startDate, endDate
    if (value === "Today") {
      startDate = moment()
      endDate = moment()
    }
    else if (value === "This week") {
      if (moment().diff(moment().startOf('week'), 'days') === 1) { // sun->sat: 1->7
        startDate = moment().subtract(7, 'days')
        endDate = moment().subtract(3, 'days')
      }
      else {
        startDate = moment().startOf('week').add(1, 'days')
        endDate = moment()
      }
    }
    else {
      if (moment().diff(moment().startOf('month'), 'days' ) === 0) {
        startDate = moment().subtract(1, 'days').startOf('months')
        endDate = moment().subtract(1, 'days')
      }
      else {
        startDate = moment().startOf('month')
        endDate = moment()
      }
    }
    dispatch(pickDate(startDate, endDate))
  }

  return (
    <div className={classes.root}>
      {
        _.map(picker,
          (o, i) =>
            <Button key={i} color={o.color} onClick={() => handleOnClick(o.value)}>{o.value}</Button>
        )
      }
    </div>
  )
}
