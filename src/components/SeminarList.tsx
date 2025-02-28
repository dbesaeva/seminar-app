import { useEffect, useState } from 'react';
import React from "react";
import axios, { AxiosError } from 'axios';
import { Button, List, ListItem, ListItemText, Typography, ListItemAvatar, Avatar } from '@mui/material';
import DeleteModal from './DeleteSeminar';
import EditModal from './EditSeminar';
import { Seminar } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';

const SeminarList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seminarToEdit, setSeminarToEdit] = useState<Seminar | null>(null);
  const [seminarToDelete, setSeminarToDelete] = useState<string | null>(null);

  // Эффект для загрузки данных с сервера при монтировании компонента
  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        // Запрос данных с сервера
        const response = await axios.get<Seminar[]>('http://localhost:3001/seminars');
        setSeminars(response.data); // Устанавливаем данные в состояние
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message); 
        } else {
          setError('An unknown error occurred'); 
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchSeminars();
  }, []);

  // Функция для удаления семинара
  const handleDelete = async (id: string) => {
    try {
      // Отправляем DELETE-запрос на сервер
      await axios.delete(`http://localhost:3001/seminars/${id}`);
      // Обновляем состояние, удаляя семинар из списка
      setSeminars(seminars.filter(seminar => seminar.id !== id));
      setSeminarToDelete(null); 
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  // Функция для редактирования семинара
  const handleEdit = async (updatedSeminar: Partial<Seminar>) => {
    try {
      // Отправляем PATCH запрос на сервер для частичного обновления
      await axios.patch(`http://localhost:3001/seminars/${updatedSeminar.id}`, updatedSeminar);
      // Обновляем состояние, заменяя старый семинар на обновлённый
      setSeminars(seminars.map(seminar =>
        seminar.id === updatedSeminar.id ? { ...seminar, ...updatedSeminar } : seminar
      ));
      setSeminarToEdit(null); 
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div>
      <List>
        {seminars.map(seminar => (
          <ListItem key={seminar.id}>
            <ListItemAvatar>
              <Avatar src={seminar.photo} alt={seminar.title} />
            </ListItemAvatar>
            <ListItemText
              primary={seminar.title}
              secondary={
                <>         
                  <Typography component="span" variant="body2" color="textPrimary">
                    {seminar.date} - {seminar.time}
                  </Typography>
                  <br />                
                  {seminar.description}
                </>
              }
            />           
            <Button onClick={() => setSeminarToEdit(seminar)}>Редактировать</Button>          
            <Button onClick={() => setSeminarToDelete(seminar.id)} variant="outlined" startIcon={<DeleteIcon />}>
              Удалить
            </Button>
          </ListItem>
        ))}
      </List>
    
      <EditModal
        isOpen={seminarToEdit !== null}
        onClose={() => setSeminarToEdit(null)}
        seminar={seminarToEdit}
        onSave={handleEdit}
      />

      <DeleteModal
        isOpen={seminarToDelete !== null}
        onClose={() => setSeminarToDelete(null)}
        onConfirm={() => handleDelete(seminarToDelete!)}
      />
    </div>
  );
};

export default SeminarList;