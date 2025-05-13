import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
//Products statistics component
const Stats = ({ products }) => {
  const totalProductos = products.length;
  const totalStock = products.reduce(
    (acc, prod) => acc + parseInt(prod.stock),
    0
  );

  const categoriasUnicas = [...new Set(products.map((prod) => prod.categoria))];

  // Productos por categoría
  const categoriaData = products.reduce((acc, prod) => {
    acc[prod.categoria] = (acc[prod.categoria] || 0) + 1;
    return acc;
  }, {});

  const stockData = products.map((prod) => prod.stock);
  const nombres = products.map((prod) => prod.nombre);

  return (
    //Resultado listado estadistico
    <div className="stats-container">
      <h2>Estadísticas</h2>
      <ul>
        <li>
          <strong>Total de productos:</strong> {totalProductos}
        </li>
        <li>
          <strong>Total en stock:</strong> {totalStock}
        </li>
        <li>
          <strong>Categorías:</strong> {categoriasUnicas.join(", ")}
        </li>
      </ul>

      <div style={{ width: "400px", margin: "auto" }}>
        <h4>Productos por categoría</h4>
        <Pie
          data={{
            labels: Object.keys(categoriaData),
            datasets: [
              {
                data: Object.values(categoriaData),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          }}
        />
      </div>

      <div style={{ width: "600px", margin: "auto", marginTop: "40px" }}>
        <h4>Stock por producto</h4>
        <Bar
          data={{
            labels: nombres,
            datasets: [
              {
                label: "Stock",
                data: stockData,
                backgroundColor: "#36A2EB",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
