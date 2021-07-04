import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Piechart.css";

class RadialBarChart extends React.Component {
  componentDidUpdate(prevProps) {}
  constructor(props) {
    super(props);
  }

  getOptions = () => {
    var options = {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#transparent",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#fff",
              fontSize: "20px",
              
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#fff",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#00e68e"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Pending "],
    };
    return options;
  };

  getSeries = () => {
    let series = [80];
    return series;
  };

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          className="pie-chart"
          options={this.getOptions()}
          series={this.getSeries()}
          type="radialBar"
        />
      </div>
    );
  }
}

export default RadialBarChart;
