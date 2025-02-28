import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Удалить семинар</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить семинар?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;