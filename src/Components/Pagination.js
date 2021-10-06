import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationRounded(props) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        props.setPage(value);
    }

    return (
        <div className={classes.root} style={{display: "flex", justifyContent: "center"}}>
            <Pagination count={props.countOfPages} onChange={handleChange} shape="rounded" className="pb-5"  />
        </div>
    );
}
