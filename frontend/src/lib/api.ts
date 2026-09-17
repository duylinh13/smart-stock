const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type Product = {
  product_id: string;
  sku: string;
  name: string;
  category: string;
  supplier_id: string;
};

export type InventoryResponse = {
  product_id: string;
  product_name: string;
  current_stock: number;
  daily_demand: number;
  lead_time: number;
  safety_stock: number;
};

export type RecommendationResponse = {
  product_id: string;
  product_name: string;
  current_stock: number;
  reorder_point: number;
  recommended_quantity: number;
  status: string;
  ai_explanation?: string;
};

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/products/`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },
  
  getInventory: async (): Promise<InventoryResponse[]> => {
    const res = await fetch(`${API_BASE_URL}/inventory/`);
    if (!res.ok) throw new Error("Failed to fetch inventory");
    return res.json();
  },

  getRecommendations: async (): Promise<RecommendationResponse[]> => {
    const res = await fetch(`${API_BASE_URL}/recommendations/`);
    if (!res.ok) throw new Error("Failed to fetch recommendations");
    return res.json();
  },
};
