import React from "react"
import { Bar } from "react-chartjs-2"

const BarChart = ({ monthlyData, label }) => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: label,
        backgroundColor: "rgba(50,205,50,1)",
        borderColor: "rgba(50,205,50,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(50,205,50,0.8)",
        hoverBorderColor: "rgba(50,205,50,0.8)",
        data: monthlyData,
      },
    ],
  }

  const option = {
    scales: {
      dataset: [
        {
          barPercentage: 0.4,
        },
      ],
    },
  }

  return <Bar width={300} height={200} data={data} options={option} />
}

export default BarChart
