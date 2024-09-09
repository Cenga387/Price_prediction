import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { Chart, ArcElement, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { useTheme } from '@mui/material/styles'; 
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { alpha } from '@mui/material';
import Grid from '@mui/material/Grid';

Chart.register(ArcElement, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function Graph({ mode }) {
  const theme = useTheme();
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [doughnutChartData4, setDoughnutChartData4] = useState(null);
  const [doughnutChartData5, setDoughnutChartData5] = useState(null);
  const [doughnutChartData6, setDoughnutChartData6] = useState(null);

  const [lineChartData2, setLineChartData2] = useState(null);
  const [lineChartData3, setLineChartData3] = useState(null);
  const [xAxisOption, setXAxisOption] = useState('year');
  const [columnStats, setColumnStats] = useState(null);

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

          // Fetch Doughnut chart data for carstats4
    axios.get("http://localhost:5000/api/car-stats4")
    .then((response) => {
      const data = response.data;
      setDoughnutChartData4({
        labels: data.labels,
        datasets: [
          {
            label: "Count",
            data: data.values,
            backgroundColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
              "rgba(44, 205, 27, 0.8)",
              "rgba(111, 89, 180, 0.8)",
              "rgba(240, 107, 22, 0.8)",
              "rgba(202, 30, 32, 0.8)",
              "rgba(139, 53, 25, 0.8)",
              "rgba(12, 61, 3, 0.8)",
              "rgba(96, 28, 44, 0.43)"
            ],
            borderColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
              "rgba(44, 205, 27, 0.8)",
              "rgba(111, 89, 180, 0.8)",
              "rgba(240, 107, 22, 0.8)",
              "rgba(202, 30, 32, 0.8)",
              "rgba(139, 53, 25, 0.8)",
              "rgba(12, 61, 3, 0.8)",
              "rgba(96, 28, 44, 0.43)"
            ],
          },
        ],
      });
    })
    .catch((error) => {
      console.error("Error fetching Doughnut chart data for carstats4:", error);
    });

  // Fetch Doughnut chart data for carstats5
  axios.get("http://localhost:5000/api/car-stats5")
    .then((response) => {
      const data = response.data;
      setDoughnutChartData5({
        labels: data.labels,
        datasets: [
          {
            label: "Count",
            data: data.values,
            backgroundColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
              "rgba(44, 205, 27, 0.8)",
              "rgba(111, 89, 180, 0.8)",
              "rgba(240, 107, 22, 0.8)",
              "rgba(202, 30, 32, 0.8)",
              "rgba(139, 53, 25, 0.8)",
              "rgba(12, 61, 3, 0.8)",
              "rgba(96, 28, 44, 0.43)"
            ],
            borderColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
              "rgba(44, 205, 27, 0.8)",
              "rgba(111, 89, 180, 0.8)",
              "rgba(240, 107, 22, 0.8)",
              "rgba(202, 30, 32, 0.8)",
              "rgba(139, 53, 25, 0.8)",
              "rgba(12, 61, 3, 0.8)",
              "rgba(96, 28, 44, 0.43)"
            ],
          },
        ],
      });
    })
    .catch((error) => {
      console.error("Error fetching Doughnut chart data for carstats5:", error);
    });

  // Fetch Doughnut chart data for carstats6
  axios.get("http://localhost:5000/api/car-stats6")
    .then((response) => {
      const data = response.data;
      setDoughnutChartData6({
        labels: data.labels,
        datasets: [
          {
            label: "Count",
            data: data.values,
            backgroundColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
              "rgba(44, 205, 27, 0.8)",
              "rgba(111, 89, 180, 0.8)",
              "rgba(240, 107, 22, 0.8)",
              "rgba(202, 30, 32, 0.8)",
              "rgba(139, 53, 25, 0.8)",
              "rgba(12, 61, 3, 0.8)",
              "rgba(96, 28, 44, 0.43)"
            ],
            borderColor: [
              "rgba(43, 63, 229, 0.8)",
              "rgba(250, 192, 19, 0.8)",
              "rgba(253, 135, 135, 0.8)",
              "rgba(44, 205, 27, 0.8)",
              "rgba(111, 89, 180, 0.8)",
              "rgba(240, 107, 22, 0.8)",
              "rgba(202, 30, 32, 0.8)",
              "rgba(139, 53, 25, 0.8)",
              "rgba(12, 61, 3, 0.8)",
              "rgba(96, 28, 44, 0.43)"
            ],
          },
        ],
      });
    })
    .catch((error) => {
      console.error("Error fetching Doughnut chart data for carstats6:", error);
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
              label: "Škoda",
              data: data.skoda,
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
        if (xAxisOption === 'transmission' || xAxisOption === 'type') {
          setLineChartData3({
            labels: data.labels,
            datasets: [
              { label: "Volkswagen", data: data.volkswagen, backgroundColor: "#2b3fe5" },
              { label: "Audi", data: data.audi, backgroundColor: "#fac013" },
              { label: "Škoda", data: data.skoda, backgroundColor: "#fd8787" },
            ],
          });
        } else {
          setLineChartData3({
            labels: data.labels,
            datasets: [
              { label: "Volkswagen", data: data.volkswagen, backgroundColor: "#2b3fe5", borderColor: "#2b3fe5" },
              { label: "Audi", data: data.audi, backgroundColor: "#fac013", borderColor: "#fac013" },
              { label: "Škoda", data: data.skoda, backgroundColor: "#fd8787", borderColor: "#fd8787" },
            ],
          });
        }

        setColumnStats(data.stats); // Set the stats data
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
          {lineChartData2 && lineChartData2.labels ? (
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
          {doughnutChartData && doughnutChartData.labels ?  (
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

      <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
      <div
          className="dataCard carstats4"
          style={{
            borderRadius: '15px',
            width: '28%',
            height: '62vh',
            marginTop: '40px',
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
          {doughnutChartData4 && doughnutChartData4.labels ?  (
            <Doughnut
              data={doughnutChartData4}
              options={{
                plugins: {
                  title: {
                    text: "Volkswagen Type Distribution",
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
          className="dataCard carstats5"
          style={{
            borderRadius: '15px',
            width: '28%',
            marginTop: '40px',
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
          {doughnutChartData5 && doughnutChartData5.labels ? (
            <Doughnut
              data={doughnutChartData5}
              options={{
                plugins: {
                  title: {
                    text: "Audi Type Distribution",
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
          className="dataCard carstats6"
          style={{
            borderRadius: '15px',
            width: '28%',
            marginTop: '40px',
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
          {doughnutChartData6 && doughnutChartData6.labels ? (
            <Doughnut
              data={doughnutChartData6}
              options={{
                plugins: {
                  title: {
                    text: "Škoda Type Distribution",
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
      <FormControl fullWidth sx={{ marginTop: '100px', marginBottom: '20px',marginLeft: '30px', width: '20%', borderRadius: '300px',}}>
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
          <MenuItem value="transmission">Transmission</MenuItem>
          <MenuItem value="type">Type</MenuItem>
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
    xAxisOption === 'transmission' || xAxisOption === 'type' ? (
      <Bar
        data={lineChartData3}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Average Price Based on ${xAxisOption.charAt(0).toUpperCase() + xAxisOption.slice(1)}`,
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
        }}
      />
    ) : (
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
        }}
      />
      
    )
  ) : (
    <div>Loading...</div>
  )}
</div>
      </div>
      <div>
  {/* Render statistics for each manufacturer under the chart */}
  {columnStats && (
    <Box sx={{ marginTop: '0px', marginBottom: '80px' }}>
      <Grid container spacing={2} marginLeft={"0px"}>
        {/* Volkswagen Stats */}
        <Grid item xs={2}>
        <Typography variant="h1"
          sx={{
            fontSize: '3vh',
            marginTop: '30px',
          }}>
        ▹Statistics for <b>{xAxisOption.charAt(0).toUpperCase() + xAxisOption.slice(1)}</b>:
      </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ padding: '16px', backgroundColor: cardBackgroundColor, color: cardTextColor, borderRadius: '15px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
           }}>
            <Typography variant="h6" sx={{ backgroundColor: 'rgba(43, 63, 229, 0.8)', padding: '10px', borderRadius: '15px',}}>Volkswagen</Typography>
            <Typography>Count: {columnStats.volkswagen.count}</Typography>
            <Typography>Mean: {columnStats.volkswagen.mean}</Typography>
            <Typography>Std: {columnStats.volkswagen.std}</Typography>
            <Typography>Min: {columnStats.volkswagen.min}</Typography>
            <Typography>25%: {columnStats.volkswagen['25%']}</Typography>
            <Typography>50%: {columnStats.volkswagen['50%']}</Typography>
            <Typography>75%: {columnStats.volkswagen['75%']}</Typography>
            <Typography>Max: {columnStats.volkswagen.max}</Typography>
          </Box>
        </Grid>

        {/* Audi Stats */}
        <Grid item xs={3}>
          <Box sx={{ padding: '16px', backgroundColor: cardBackgroundColor, color: cardTextColor, borderRadius: '15px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
           }}>
            <Typography variant="h6" sx={{ backgroundColor: 'rgba(250, 192, 19, 0.8)', padding: '10px', borderRadius: '15px' }}>Audi</Typography>
            <Typography>Count: {columnStats.audi.count}</Typography>
            <Typography>Mean: {columnStats.audi.mean}</Typography>
            <Typography>Std: {columnStats.audi.std}</Typography>
            <Typography>Min: {columnStats.audi.min}</Typography>
            <Typography>25%: {columnStats.audi['25%']}</Typography>
            <Typography>50%: {columnStats.audi['50%']}</Typography>
            <Typography>75%: {columnStats.audi['75%']}</Typography>
            <Typography>Max: {columnStats.audi.max}</Typography>
          </Box>
        </Grid>

        {/* Škoda Stats */}
        <Grid item xs={3}>
          <Box sx={{ padding: '16px', backgroundColor: cardBackgroundColor, color: cardTextColor, borderRadius: '15px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.9)}`
                : `0 0 24px 12px ${alpha('#033363', 0.4)}`,
           }}>
            <Typography variant="h6" sx={{ backgroundColor: 'rgba(253, 135, 135, 0.8)', padding: '10px', borderRadius: '15px' }}>Škoda</Typography>
            <Typography>Count: {columnStats.skoda.count}</Typography>
            <Typography>Mean: {columnStats.skoda.mean}</Typography>
            <Typography>Std: {columnStats.skoda.std}</Typography>
            <Typography>Min: {columnStats.skoda.min}</Typography>
            <Typography>25%: {columnStats.skoda['25%']}</Typography>
            <Typography>50%: {columnStats.skoda['50%']}</Typography>
            <Typography>75%: {columnStats.skoda['75%']}</Typography>
            <Typography>Max: {columnStats.skoda.max}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )}
</div>
    </div>
    </Box> 
  );
}
