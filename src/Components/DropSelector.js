import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function DropSelector(props) {
    const classes = useStyles();
    const [select, setSelect] = [props.select, props.setSelect]
    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    return (
            <FormControl className={classes.formControl}>
                <Select
                    value={select}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >

                    {props.options ? props.options.map(((option, key) => <MenuItem key={key} value={props.values[key]}>{option}</MenuItem>)) : null}
                </Select>
                <FormHelperText>{props.label}</FormHelperText>
            </FormControl>
    );
}