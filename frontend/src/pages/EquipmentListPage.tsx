
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Equipment, EquipmentInput } from "../types/equipment";
import { getEquipmentList, updateEquipment, deleteEquipment } from "../services/api";
import { EditEquipmentModal } from "../components/EditEquipmentModal";

export const EquipmentListPage: React.FC = () => {
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getEquipmentList();
      setItems(data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (item: Equipment) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (id: number, data: EquipmentInput) => {
    try {
      await updateEquipment(id, data);
      setIsEditOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите списать данное оборудование?")) {
      try {
        await deleteEquipment(id);
        fetchItems();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "В работе":
        return "success";
      case "Обслуживание":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Учет серверного оборудования
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add")}
        >
          Добавить оборудование
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="overline" color="text.secondary">
                      {item.type}
                    </Typography>
                    <Chip
                      label={item.status}
                      size="small"
                      color={getStatusColor(item.status) as any}
                    />
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>IP:</strong> {item.ip_address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Размещение:</strong> {item.location}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(item)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Удалить
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <EditEquipmentModal
        open={isEditOpen}
        item={selectedItem}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveEdit}
      />
    </Container>
  );
};
