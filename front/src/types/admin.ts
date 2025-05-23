export interface InventoryItem {
  id: string | number;
  name: string;
  quantity: number;
  category?: string;
}