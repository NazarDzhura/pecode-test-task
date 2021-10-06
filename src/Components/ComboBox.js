import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={props.options}
            className="my-3 mx-2 bg-white shadow"
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={props.label} />}
            value={props.searchValue}
            onChange={(event, newValue) =>  {
                props.setSearchValue(newValue)
            }}
        />
    );
}