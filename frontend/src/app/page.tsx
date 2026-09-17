"use client";

import { useRecommendations } from "@/hooks/useInventoryData";
import { AlertCircle, Package, ArrowRightLeft, CheckCircle2, BarChart3, Settings, DownloadCloud } from "lucide-react";
import { DashboardCharts } from "@/components/DashboardCharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: recommendations, isLoading, error } = useRecommendations();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-page-ink">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-ash text-sm font-mono tracking-widest flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-blue-cornflower rounded-full animate-pulse"></div>
          LOADING SYSTEM...
        </motion.div>
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-page-ink text-snow p-8 lg:p-12 overflow-x-hidden selection:bg-blue-cornflower/30">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1400px] mx-auto mb-12 flex justify-between items-end border-b border-steel-border pb-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-cornflower/10 flex items-center justify-center border border-blue-cornflower/30">
              <Package className="w-4 h-4 text-blue-cornflower" />
            </div>
            <h1 className="text-[32px] font-semibold tracking-[-0.84px] leading-none">SmartStock</h1>
          </div>
          <p className="text-ash text-[15px] font-mono tracking-wide">Enterprise Inventory Command Center</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-transparent border border-graphite text-snow rounded-lg px-4 py-2.5 text-[14px] font-medium transition-all hover:bg-card-carbon hover:border-steel-border">
            <DownloadCloud className="w-4 h-4 text-ash" />
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-snow text-onyx rounded-lg px-4 py-2.5 text-[14px] font-medium transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Settings className="w-4 h-4" />
            Configure System
          </button>
        </div>
      </motion.header>

      <motion.main 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto space-y-8"
      >
        {/* STATS & CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* STATS COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div variants={itemAnim} className="bg-card-carbon rounded-xl p-6 flex flex-col justify-between h-[150px] border border-steel-border/50 relative overflow-hidden group hover:border-steel-border transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Package className="w-24 h-24 text-blue-cornflower" />
              </div>
              <div className="flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-blue-cornflower"></div>
                <div className="font-mono text-[12px] text-ash tracking-[1px] uppercase">Tracked Products</div>
              </div>
              <div className="text-[48px] font-medium tracking-[-1.5px] leading-none z-10">{totalProducts}</div>
            </motion.div>
            
            <motion.div variants={itemAnim} className="bg-card-carbon rounded-xl p-6 flex flex-col justify-between h-[150px] border border-steel-border/50 relative overflow-hidden group hover:border-steel-border transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <CheckCircle2 className="w-24 h-24 text-emerald-400" />
              </div>
              <div className="flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <div className="font-mono text-[12px] text-ash tracking-[1px] uppercase">Healthy Inventory</div>
              </div>
              <div className="text-[48px] font-medium tracking-[-1.5px] leading-none z-10">{healthyProducts}</div>
            </motion.div>

            <motion.div variants={itemAnim} className="bg-[#1a1111] rounded-xl p-6 flex flex-col justify-between h-[150px] border border-red-900/30 relative overflow-hidden group hover:border-red-900/50 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <AlertCircle className="w-24 h-24 text-red-500" />
              </div>
              <div className="flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <div className="font-mono text-[12px] text-red-400/80 tracking-[1px] uppercase">Requires Reorder</div>
              </div>
              <div className="text-[48px] font-medium tracking-[-1.5px] leading-none text-red-400 z-10">{lowStockProducts}</div>
            </motion.div>
          </div>

          {/* CHART COLUMN */}
          <motion.div variants={itemAnim} className="lg:col-span-8 bg-card-carbon rounded-xl border border-steel-border p-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-ash" />
                <h2 className="font-mono text-[12px] text-ash tracking-[1px] uppercase">Stock Levels vs ROP</h2>
              </div>
              <span className="text-[12px] text-ash bg-deep-coal px-3 py-1 rounded-full border border-steel-border">Live Data</span>
            </div>
            <div className="flex-1 min-h-[300px]">
              {recommendations && recommendations.length > 0 ? (
                <DashboardCharts data={recommendations} />
              ) : (
                <div className="h-full flex items-center justify-center text-ash font-mono text-sm">NO DATA TO DISPLAY</div>
              )}
            </div>
          </motion.div>

        </div>

        {/* INVENTORY TABLE & RECOMMENDATIONS */}
        <motion.section variants={itemAnim}>
          <div className="flex items-center gap-2 mb-4">
            <ArrowRightLeft className="w-4 h-4 text-ash" />
            <h2 className="font-mono text-[12px] text-ash tracking-[1px] uppercase">AI-Driven Procurement Analysis</h2>
          </div>
          
          <div className="bg-card-carbon rounded-xl overflow-hidden border border-steel-border shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-[#151515] border-b border-steel-border text-ash font-mono text-[11px] tracking-[1px] uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">Product Name</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium">ROP</th>
                    <th className="px-6 py-4 font-medium">Status / Action</th>
                    <th className="px-6 py-4 font-medium">AI Intelligence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-border">
                  {recommendations?.map((item) => {
                    const isLowStock = item.status === "NEED_REORDER";
                    return (
                      <tr key={item.product_id} className="hover:bg-[#1a1a1a] transition-colors group">
                        <td className="px-6 py-5 flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-deep-coal border border-steel-border flex items-center justify-center">
                            <Package className={`w-4 h-4 ${isLowStock ? "text-red-400" : "text-ash"}`} />
                          </div>
                          <span className="font-medium">{item.product_name}</span>
                        </td>
                        <td className={`px-6 py-5 font-mono text-[15px] ${isLowStock ? "text-red-400 font-semibold" : ""}`}>
                          {item.current_stock}
                        </td>
                        <td className="px-6 py-5 font-mono text-ash text-[15px]">{item.reorder_point}</td>
                        <td className="px-6 py-5">
                          {isLowStock ? (
                            <span className="inline-flex items-center gap-2 bg-[#2c1d1d] text-red-400 px-3 py-1.5 rounded-[4px] font-mono text-[12px] uppercase tracking-[0.85px] border border-red-900/30">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                              Order {item.recommended_quantity}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 bg-[#1a2333] text-blue-cornflower px-3 py-1.5 rounded-[4px] font-mono text-[12px] uppercase tracking-[0.85px] border border-blue-900/30">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Optimal
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-ash text-[13px] leading-relaxed max-w-[450px]">
                          {item.ai_explanation}
                        </td>
                      </tr>
                    );
                  })}
                  {recommendations?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-ash font-mono">
                        No inventory data available in the system.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

      </motion.main>
    </div>
  );
}
