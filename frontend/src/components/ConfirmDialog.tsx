import React, { FunctionComponent } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

interface Prop {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onYes: () => void;
  loading?: boolean;
}
const ConfirmDialog: FunctionComponent<Prop> = ({ open, onClose, onYes, title, description, loading = false }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
    >
      <DialogTitle id="alert-dialog-title">
        { title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { description }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        { loading ? <CircularProgress style={{ marginBottom: 10, marginRight: 10 }} /> : (
          <div>
            <Button onClick={() => onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => onYes()} color="primary" autoFocus>
              Yes
            </Button>
          </div>
        ) }
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
