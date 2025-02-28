import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Seminar } from '../types';

interface EditModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  seminar: Seminar | null; 
  onSave: (seminar: Seminar) => void; 
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, seminar, onSave }) => {
  // Состояние для хранения изменённых данных
  const [formData, setFormData] = useState<Partial<Seminar>>({});

  // Если семинар не передан, не рендерим модальное окно
  if (!seminar) return null;

  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик сохранения изменений
  const handleSubmit = () => {
    onSave({ ...seminar, ...formData }); // Объединяем старые и новые данные
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Редактировать семинар</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Заголовок"
          value={formData.title || seminar.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Описание"
          value={formData.description || seminar.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          name="date"
          label="Дата"
          type="date"
          value={formData.date || seminar.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="time"
          label="Время"
          type="time"
          value={formData.time || seminar.time}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="photo"
          label="Ссылка на фото"
          value={formData.photo || seminar.photo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;