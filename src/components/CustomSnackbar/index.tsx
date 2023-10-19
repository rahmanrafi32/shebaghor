import React, {SyntheticEvent, useState} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {AlertColor} from "@mui/material";

const CustomSnackBar = ({open, setOpen, message, severity}: {
    open: boolean,
    setOpen: any,
    message: string,
    severity: AlertColor
}) => {

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;
