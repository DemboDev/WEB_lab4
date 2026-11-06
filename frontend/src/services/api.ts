import axios from "axios";
import type { Equipment, EquipmentInput } from "../types/equipment";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEquipmentList = async (): Promise<Equipment[]> => {
  const response = await api.get<Equipment[]>("/equipment");
  return response.data;
};

export const createEquipment = async (data: EquipmentInput): Promise<Equipment> => {
  const response = await api.post<Equipment>("/equipment", data);
  return response.data;
};

export const updateEquipment = async (id: number, data: EquipmentInput): Promise<Equipment> => {
  const response = await api.put<Equipment>(`/equipment/${id}`, data);
  return response.data;
};

export const deleteEquipment = async (id: number): Promise<void> => {
  await api.delete(`/equipment/${id}`);
};
