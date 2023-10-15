import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

type DeleteServiceModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
    modalMessage: string;
};

const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({ open, onClose, onConfirmDelete, modalMessage }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                {modalMessage}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirmDelete} color="error">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteServiceModal;
