import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import type { EquipmentInput } from "../types/equipment";
import { createEquipment } from "../services/api";

export const AddEquipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EquipmentInput>({
    name: "",
    type: "Сервер",
    ip_address: "",
    status: "В работе",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEquipment(formData);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при создании:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
          Новое оборудование
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Наименование устройства"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Тип устройства"
              name="type"
              value={formData.type}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              <MenuItem value="Сервер">Сервер</MenuItem>
              <MenuItem value="Коммутатор">Коммутатор</MenuItem>
              <MenuItem value="Маршрутизатор">Маршрутизатор</MenuItem>
              <MenuItem value="СХД">СХД</MenuItem>
            </TextField>
            <TextField
              label="IP-адрес"
              name="ip_address"
              value={formData.ip_address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Статус"
              name="status"
              value={formData.status}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              <MenuItem value="В работе">В работе</MenuItem>
              <MenuItem value="Обслуживание">Обслуживание</MenuItem>
              <MenuItem value="В резерве">В резерве</MenuItem>
            </TextField>
            <TextField
              label="Место установки"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Сохранить
            </Button>
            <Button variant="text" color="inherit" fullWidth onClick={() => navigate("/")}>
              Отмена
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
