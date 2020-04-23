import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Room } from '../../../core/models/room';
import { FormText } from '../../../core/components/Forms/FormText';
import { DialogActions, DialogContent } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface ShareDialogProps {
  room?: Room;
  onClose: () => void;
  onAddFollower?: (room: Room, email: string) => void;
  onRemoveFollower?: (email: string) => void;
}

const newUserSchema = Yup.object({
  email: Yup.string().required('E-mail is requried'),
});

export const ShareDialog: React.FC<ShareDialogProps> = ({
  onAddFollower,
  onRemoveFollower,
  room,
  onClose,
}) => {
  const classes = useStyles();
  const [addFollower, setAddFollower] = useState(false);
  const form = useFormik({
    validationSchema: newUserSchema,
    initialValues: {
      email: '',
    },
    onSubmit: async v => {
      try {
        onAddFollower && room && (await onAddFollower(room, v.email));
        setAddFollower(false);
      } catch {}
    },
  });
  const removeFollower = (follower: string) => {
    return '';
  };
  return (
    <>
      <Dialog onClose={onClose} open={!!room}>
        <DialogTitle>Share room access</DialogTitle>
        <DialogContent>
          <Typography>Maximum : {room?.beds?.length} person</Typography>
        </DialogContent>
        <List>
          {(room?.followers ?? []).map(follower => (
            <ListItem
              button
              onClick={() => removeFollower(follower)}
              key={'follower-' + follower}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={follower} />
            </ListItem>
          ))}
          <ListItem
            autoFocus
            button
            disabled={room?.beds?.length === room?.followers?.length ?? false}
            onClick={() => setAddFollower(true)}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add follower" />
          </ListItem>
        </List>
      </Dialog>
      <Dialog onClose={() => setAddFollower(false)} open={addFollower}>
        <DialogTitle>Add New Follower</DialogTitle>
        <List>
          <ListItem>
            <FormText
              id="email"
              label="E-mail"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              errorText={form.errors.email}
            />
          </ListItem>
        </List>
        <DialogActions>
          <Button color="primary" onClick={() => form.submitForm()}>
            Add Follower
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
