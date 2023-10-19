import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    contactNo: string;
    id: string;
};

interface EditUserModalProps {
    open: boolean;
    onClose: () => void;
    user: User;
    onEdit: (editedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({open, onClose, user, onEdit}) => {
    const [editedUser, setEditedUser] = useState<User>({
        firstName: '',
        lastName: '',
        contactNo: '',
        email: '',
        role: '',
        id: ''
    });

    useEffect(() => {
        if (user) {
            setEditedUser({
                firstName: user.firstName,
                lastName: user.lastName,
                contactNo: user.contactNo,
                email: user.email,
                role: user.role,
                id: user.id
            })
        }
    }, [user]);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedUser({...editedUser, [name]: value});
    };

    const handleCancel = () => {
        onClose();
    };

    const handleEdit = () => {
        onEdit(editedUser);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{mt: 1}}>
                    <Grid item xs={4}>
                        <TextField
                            name="firstName"
                            label="First Name"
                            value={editedUser.firstName}
                            onChange={handleFieldChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            name="lastName"
                            label="Last Name"
                            value={editedUser.lastName}
                            onChange={handleFieldChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="show-role">Role</InputLabel>
                            <Select
                                labelId="show-role"
                                id="show-role"
                                value={editedUser.role}
                                label="Role"
                                onChange={(event: SelectChangeEvent) => setEditedUser({...editedUser, role: event.target.value as string})}
                            >
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"user"}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="email"
                            label="Email"
                            value={editedUser.email}
                            onChange={handleFieldChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="contactNo"
                            label="Contact No"
                            value={editedUser.contactNo}
                            onChange={handleFieldChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
