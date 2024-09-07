import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { useTheme } from '@mui/material/styles'; 
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { alpha } from '@mui/material';

Chart.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function Graph({ mode }) {
  const theme = useTheme();
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [lineChartData2, setLineChartData2] = useState(null);
  const [lineChartData3, setLineChartData3] = useState(null);
  const [xAxisOption, setXAxisOption] = useState('year');

  useEffect(() => {
    // Fetch Doughnut chart data
    axios.get("http://localhost:5000/api/car-stats")
      .then((response) => {
        const data = response.data;
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
        console.error("Error fetching Doughnut chart data:", error);
      });

    // Fetch Line chart data for carstats2
    axios.get("http://localhost:5000/api/car-stats2")
      .then((response) => {
        const data = response.data;
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
        console.error("Error fetching Line chart data for carstats2:", error);
      });

  }, [mode]);

  // Fetch Line chart data for carstats3, carstats4, and carstats5 when xAxisOption changes
  useEffect(() => {
    axios.get(`http://localhost:5000/api/car-stats3`, {
      params: { x_axis: xAxisOption }
    })
      .then((response) => {
        const data = response.data;
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
        console.error("Error fetching Line chart data for carstats3:", error);
      });

  }, [xAxisOption, mode]);

  // Define chart background color based on the mode
  const cardBackgroundColor = mode === 'dark' ? theme.palette.grey[900] : '#d1e0f0';
  const cardTextColor = mode === 'dark' ? '#d1e0f0' : theme.palette.grey[900];

  return (
  <Box 
  id="CarStats">
    <div className="App">
      <div className="Title" >
      <Typography
          component="h1"
          variant="h3"
          sx={(theme) => ({
            alignSelf: 'flex-start', // Aligns the text to the start (left) of the container
            justifySelf: 'flex-start', // Ensures the box is aligned to the left
            padding: '4px', // Padding around the text
            borderRadius: '40px', // Rounded corners
            textAlign: 'center', // Aligns text to the left inside the box
            marginLeft: '0vw', // Ensures the box is positioned on the left side
            marginRight: '0vw',
            marginTop: '3vw',
            marginBottom: '1vw',
          })}
        >
          Car Stats
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
        <div
          className="dataCard carstats2"
          style={{
            borderRadius: '15px',
            width: '60%',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '30px',
            marginRight: '30px',
            backgroundColor: cardBackgroundColor,
            color: cardTextColor,
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
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
            borderRadius: '15px',
            width: '27%',
            marginTop: '20px',
            marginBottom: '20px',
            marginRight: '30px',
            marginLeft: '30px',
            backgroundColor: cardBackgroundColor,
            color: cardTextColor,
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
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
      </div>


      <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* X-axis selection dropdown */}
      <FormControl fullWidth sx={{ marginTop: '100px', marginBottom: '20px',marginLeft: '30px', width: '20%', borderRadius: '300px'}}>
      <Typography
          variant="h1"
          sx={{
            fontSize: '3vh',
            marginBottom: '20px'
          }}
        >
          ▹Choose which data you want to showcase on the graph:
        </Typography>
        <Select
          value={xAxisOption}
          onChange={(e) => setXAxisOption(e.target.value)}
          displayEmpty
        >
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="kilowatts">Kilowatts</MenuItem>
          <MenuItem value="mileage">Mileage</MenuItem>
          <MenuItem value="displacement">Displacement</MenuItem>
          <MenuItem value="rimSize">Rim Size</MenuItem>
        </Select>
      </FormControl>
        <div
          className="dataCard carstats3"
          style={{
            borderRadius: '15px',
            width: '75%',
            marginTop: '80px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '60px',
            backgroundColor: cardBackgroundColor,
            color: cardTextColor,
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
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
                    text: [`Average Price Based on ${xAxisOption.charAt(0).toUpperCase() + xAxisOption.slice(1)}`, 
                      '(If the value is 0, the car is not available) '
                    ],
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
                      text: xAxisOption.charAt(0).toUpperCase() + xAxisOption.slice(1),
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
    </div>
    </Box> 
  );
}
