import { useOutletContext } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  
  const { revenue } = useOutletContext();
  const { monthly, products } = revenue;

  const maxRevenue = Math.max(
    ...products.map((p) => p.revenue),
  );

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className=" bg-white border border-[#ddd5c8]  rounded-xl p-5">
          <h2 className="font-serif text-xs lg:text-lg font-bold">Monthly Revenue</h2>
          <div className="h-55 mt-4 text-xs sm:text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tickMargin={10} 
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={45}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => `Rp${value.toLocaleString("id-ID")}`}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#BC5D3D"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-[#ddd5c8] rounded-xl p-5">
          <h2 className="font-serif text-xs lg:text-lg font-bold">
            Top Products by Revenue
          </h2>
          <div className="mt-4  space-y-3">
            {products.map((p) => {
              const percentage = (p.revenue / maxRevenue) * 100;

              return (
                <div key={p.name}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs sm:text-sm">{p.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Rp{p.revenue.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="w-full h-1.5 bg-[#EAE6DF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#BC5D3D] rounded-full"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
