export interface Equipment {
  id: number;
  name: string;
  type: string;
  ip_address: string;
  status: string;
  location: string;
  created_at?: string;
}

export type EquipmentInput = Omit<Equipment, "id" | "created_at">;
