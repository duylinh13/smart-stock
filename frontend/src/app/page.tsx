"use client";

import { useRecommendations } from "@/hooks/useInventoryData";
import { AlertCircle, Package, ArrowRightLeft, CheckCircle2, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const { data: recommendations, isLoading, error } = useRecommendations();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-page-ink">
        <p className="text-ash text-sm font-mono tracking-widest">LOADING SYSTEM...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-page-ink">
        <p className="text-red-500 text-sm font-mono tracking-widest">SYSTEM ERROR: FAILED TO FETCH DATA</p>
      </div>
    );
  }

  const totalProducts = recommendations?.length || 0;
  const lowStockProducts = recommendations?.filter((r) => r.status === "NEED_REORDER").length || 0;
  const healthyProducts = totalProducts - lowStockProducts;

  return (
    <div className="min-h-screen bg-page-ink text-snow p-8 lg:p-16">
      <header className="max-w-6xl mx-auto mb-16 flex justify-between items-center">
        <div>
          <h1 className="text-[40px] font-semibold tracking-[-0.84px] leading-[1.2]">SmartStock</h1>
          <p className="text-ash text-[16px] mt-2">Inventory command center.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-transparent border border-graphite text-snow rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-card-carbon">
            Export Report
          </button>
          <button className="bg-snow text-onyx rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-gray-200">
            Configure System
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        
        {/* STATS */}
        <section>
          <h2 className="font-mono text-[12px] text-ash tracking-[0.85px] mb-6 uppercase">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card-carbon rounded-lg p-6 flex flex-col justify-between h-[140px]">
              <Package className="w-5 h-5 text-blue-cornflower" />
              <div>
                <div className="text-[40px] font-semibold tracking-[-0.84px] leading-none mb-2">{totalProducts}</div>
                <div className="text-[14px] text-ash">Tracked Products</div>
              </div>
            </div>
            
            <div className="bg-card-carbon rounded-lg p-6 flex flex-col justify-between h-[140px]">
              <CheckCircle2 className="w-5 h-5 text-blue-cornflower" />
              <div>
                <div className="text-[40px] font-semibold tracking-[-0.84px] leading-none mb-2">{healthyProducts}</div>
                <div className="text-[14px] text-ash">Healthy Inventory</div>
              </div>
            </div>

            <div className="bg-card-carbon rounded-lg p-6 flex flex-col justify-between h-[140px] border border-steel-border">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-[40px] font-semibold tracking-[-0.84px] leading-none text-red-400 mb-2">{lowStockProducts}</div>
                <div className="text-[14px] text-ash">Requires Reorder</div>
              </div>
            </div>
          </div>
        </section>

        {/* INVENTORY TABLE & RECOMMENDATIONS */}
        <section>
          <h2 className="font-mono text-[12px] text-ash tracking-[0.85px] mb-6 uppercase">Inventory Status & AI Analysis</h2>
          
          <div className="bg-card-carbon rounded-lg overflow-hidden border border-steel-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-deep-coal border-b border-steel-border text-ash font-medium">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">ROP</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">AI Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-border">
                  {recommendations?.map((item) => {
                    const isLowStock = item.status === "NEED_REORDER";
                    return (
                      <tr key={item.product_id} className="hover:bg-[#222222] transition-colors group">
                        <td className="px-6 py-5 font-medium flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${isLowStock ? "bg-red-400" : "bg-blue-cornflower"}`}></div>
                          {item.product_name}
                        </td>
                        <td className={`px-6 py-5 font-mono ${isLowStock ? "text-red-400" : ""}`}>
                          {item.current_stock}
                        </td>
                        <td className="px-6 py-5 font-mono text-ash">{item.reorder_point}</td>
                        <td className="px-6 py-5">
                          {isLowStock ? (
                            <span className="inline-flex items-center gap-2 bg-[#2c1d1d] text-red-400 px-3 py-1 rounded-[4px] font-mono text-[12px] uppercase tracking-[0.85px] border border-red-900/30">
                              Order {item.recommended_quantity}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 bg-[#1a2333] text-blue-cornflower px-3 py-1 rounded-[4px] font-mono text-[12px] uppercase tracking-[0.85px] border border-blue-900/30">
                              Optimal
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-ash leading-relaxed max-w-[400px]">
                          {item.ai_explanation}
                        </td>
                      </tr>
                    );
                  })}
                  {recommendations?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-ash">
                        No inventory data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
