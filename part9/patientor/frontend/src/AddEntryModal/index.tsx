import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  patientId: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  patientId,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new Entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm
        patientId={patientId}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
