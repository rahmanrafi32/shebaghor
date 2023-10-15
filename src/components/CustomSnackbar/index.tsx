import React, {SyntheticEvent, useState} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const CustomSnackBar = ({open, setOpen, message, severity}: {
    open: boolean,
    setOpen: any,
    message: string,
    severity: string
}) => {

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;
