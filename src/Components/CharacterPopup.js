import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useHistory } from "react-router-dom";
import {Box, Grid, Paper, styled} from "@material-ui/core";

export default function CharacterPopup(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    let history = useHistory();
    const handleClose = () => {
        history.goBack()
        setOpen(false);
    };

    const dialogContentStyle = {
        color: "#333333",
        fontSize: 20
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <Button className="shadow-2xl btn-green flex w-full" variant="contained" color="primary" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                   <h2 style={{fontSize: 30, fontWeight: 'bold', display: 'flex', justifyContent: 'center', marginTop: 10}}>{props.character.name}</h2>
                    <DialogContent>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Item style={{height: "fit-content"}}>
                                        <img
                                            className="rounded"
                                            width="600"
                                            height="600"
                                            src={props.character.image}
                                            alt={props.character.name}
                                            style={{float: "center"}}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Item>
                                        <DialogContentText style={dialogContentStyle}>
                                            Species: {props.character.species} <br/>
                                            Status: {props.character.status} <br/>
                                            Gender: {props.character.gender} <br/>
                                            Location: {props.character.location.name} <br/>
                                            Origin: {props.character.origin.name} <br/>

                                        </DialogContentText>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
}