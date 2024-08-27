import React, { useEffect, useState } from "react";
import { Doughnut, Line, Bar} from "react-chartjs-2";
import { Chart, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';  // Import PointElement
import { useTheme } from '@mui/material/styles'; // Import useTheme hook
import Typography from '@mui/material/Typography';

import Graphcss from "../css/Graphcss.css"; 

// Register components with Chart.js
Chart.register(ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function Graph({ mode }) {
  const theme = useTheme(); // Get the current theme from MUI
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [lineChartData2, setLineChartData2] = useState(null);
  const [lineChartData3, setLineChartData3] = useState(null);

  useEffect(() => {
    // Fetch Doughnut chart data
    fetch("http://localhost:5000/api/car-stats")
      .then((response) => response.json())
      .then((data) => {
        setDoughnutChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Count",
              data: data.values,
              backgroundColor: [
                "rgba(43, 63, 229, 0.8)",
                "rgba(250, 192, 19, 0.8)",
                "rgba(253, 135, 135, 0.8)",
              ],
              borderColor: [
                "rgba(43, 63, 229, 0.8)",
                "rgba(250, 192, 19, 0.8)",
                "rgba(253, 135, 135, 0.8)",
              ],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch Line chart data for carstats2
    fetch("http://localhost:5000/api/car-stats2")
      .then((response) => response.json())
      .then((data) => {
        setLineChartData2({
          labels: data.labels,
          datasets: [
            {
              label: "Volkswagen",
              data: data.volkswagen,
              backgroundColor: "#2b3fe5",
              borderColor: "#2b3fe5",
            },
            {
              label: "Audi",
              data: data.audi,
              backgroundColor: "#fac013",
              borderColor: "#fac013",
            },
            {
              label: "Mercedes",
              data: data.mercedes,
              backgroundColor: "#fd8787",
              borderColor: "#fd8787",
            }
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching line chart data for carstats2:", error);
      });

    // Fetch Line chart data for carstats3
    fetch("http://localhost:5000/api/car-stats3")
      .then((response) => response.json())
      .then((data) => {
        setLineChartData3({
          labels: data.labels,
          datasets: [
            {
              label: "Volkswagen",
              data: data.volkswagen,
              backgroundColor: "#2b3fe5",
              borderColor: "#2b3fe5",
            },
            {
              label: "Audi",
              data: data.audi,
              backgroundColor: "#fac013",
              borderColor: "#fac013",
            },
            {
              label: "Mercedes",
              data: data.mercedes,
              backgroundColor: "#fd8787",
              borderColor: "#fd8787",
            }
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching line chart data for carstats3:", error);
      });

  }, [mode]);

  // Define chart background color based on the mode
  const cardBackgroundColor = mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300];
  const cardTextColor = mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800];

  return (
    <div className="App">
      <div className="Title">
      <Typography
                variant="h1"
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                }}
              >
                Car Stats
              </Typography>
      </div>
      <div
        className="dataCard carstats2"
        style={{
          backgroundColor: cardBackgroundColor,
          color: cardTextColor,
        }}
      >
        {lineChartData2 ? (
          <Line
            data={lineChartData2}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Price Distribution by Manufacturer (Filtered and Limited)",
                  display: true,
                  color: cardTextColor,
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                  
                },
                legend: {
                  labels: {
                    color: cardTextColor,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Price',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    color: cardTextColor,
                  },
                  ticks: {
                    color: cardTextColor,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Density',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    color: cardTextColor,
                  },
                  ticks: {
                    color: cardTextColor,
                  },
                },
              },
              backgroundColor: cardBackgroundColor,
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div
        className="dataCard carstats1"
        style={{
          backgroundColor: cardBackgroundColor,
          color: cardTextColor,
        }}
      >
        {doughnutChartData ? (
          <Doughnut
            data={doughnutChartData}
            options={{
              plugins: {
                title: {
                  text: "Car Manufacturer Distribution",
                  display: true,
                  color: cardTextColor,
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                },
                legend: {
                  labels: {
                    color: cardTextColor,
                  },
                },
              },
              backgroundColor: cardBackgroundColor,
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div
        className="dataCard carstats3"
        style={{
          backgroundColor: cardBackgroundColor,
          color: cardTextColor,
        }}
      >
        {lineChartData3 ? (
          <Line
            data={lineChartData3}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: ['Average Price Based on Year', '(If the price is 0, the car for that year is unavailable)'],
                  color: cardTextColor,
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                },
                legend: {
                  labels: {
                    color: cardTextColor,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Year',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    color: cardTextColor,
                  },
                  ticks: {
                    color: cardTextColor,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Price',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    color: cardTextColor,
                  },
                  ticks: {
                    color: cardTextColor,
                  },
                },
              },
              backgroundColor: cardBackgroundColor,
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      
    </div>
  );
}

