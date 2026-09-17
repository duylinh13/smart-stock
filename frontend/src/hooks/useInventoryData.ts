"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useInventoryData() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: api.getInventory,
    refetchInterval: 30000,
  });
}

export function useRecommendations() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: api.getRecommendations,
    refetchInterval: 30000,
  });
}
