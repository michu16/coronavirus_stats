import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api/index";

import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Chart = ({ data: { confirmed, recovered, deaths, tests }, region }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Zainfekowani",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Zgony",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.recovered),
            label: "Ozdrowieńcy",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.tests),
            label: "Wykonane Testy",
            borderColor: "rgba(3, 196, 255, 0.5)",
            backgroundColor: "rgba(3, 196, 255, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Zainfekowani", "Ozdrowieńcy", "Zgony", "Testy"],
        datasets: [
          {
            label: `Obecny stan w ${region}`,
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(3, 196, 255, 0.5)",
            ],
            data: [confirmed, recovered, deaths, tests],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Obecny stan w ${region}` },
      }}
    />
  ) : null;

  return (
    <>
      {console.log(region)}
      <div className={styles.container}>
        {region !== "cały kraj" && region !== "" ? barChart : lineChart}
      </div>
    </>
  );
};

export default Chart;
