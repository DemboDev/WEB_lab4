import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import type { Equipment, EquipmentInput } from "../types/equipment";

interface EditEquipmentModalProps {
  open: boolean;
  item: Equipment | null;
  onClose: () => void;
  onSave: (id: number, data: EquipmentInput) => void;
}

export const EditEquipmentModal: React.FC<EditEquipmentModalProps> = ({
  open,
  item,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<EquipmentInput>({
    name: "",
    type: "",
    ip_address: "",
    status: "",
    location: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        type: item.type,
        ip_address: item.ip_address,
        status: item.status,
        location: item.location,
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onSave(item.id, formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Редактировать оборудование</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Наименование"
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
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
