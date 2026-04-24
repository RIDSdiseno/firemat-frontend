import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function MovementsChart({ movimientos = [] }) {
  // 🔥 PROCESAR DATOS (últimos 7 días)
  const data = useMemo(() => {
  const days = 7;
  const result = [];

  // 🔥 Crear mapa base de días
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const key = date.toISOString().split("T")[0]; // YYYY-MM-DD

    result.push({
      key,
      fecha: date.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
      }),
      entrada: 0,
      salida: 0,
    });
  }

  // 🔥 Mapear movimientos correctamente
  movimientos.forEach((m) => {
    if (!m.createdAt) return;

    const key = new Date(m.createdAt).toISOString().split("T")[0];

    const day = result.find((d) => d.key === key);

    if (day) {
      if (m.tipo === "entrada") day.entrada += m.cantidad;
      if (m.tipo === "salida") day.salida += m.cantidad;
    }
  });

  return result;
}, [movimientos]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-neutral-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">
          Movimientos últimos 7 días
        </h3>
        <p className="text-xs text-neutral-500">
          Entradas y salidas de inventario
        </p>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

            <XAxis dataKey="fecha" fontSize={12} />

            <YAxis fontSize={12} />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />

            <Legend />

            {/*  ENTRADAS */}
            <Bar
              dataKey="entrada"
              fill="#16a34a"
              name="Entradas"
              radius={[6, 6, 0, 0]}
              animationDuration={600}
            />

            {/*  SALIDAS */}
            <Bar
              dataKey="salida"
              fill="#dc2626"
              name="Salidas"
              radius={[6, 6, 0, 0]}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MovementsChart;