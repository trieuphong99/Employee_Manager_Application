import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TimePickers(props) {
  const { defaultTime, onChange, name } = props
  const classes = useStyles();

  return (
    <TextField className={classes.container}
      name={name}
      onChange={e => onChange(e)}
      type="time"
      defaultValue={defaultTime}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 60, // 1 min
      }}
    />
  );
}
