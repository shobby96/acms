import React from "react";
import ReactApexChart from "react-apexcharts";
import "./SparkWidget.css";

class SparkWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          //   name: "Likes",
          data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
        },
      ],
      options: {
        chart: {
          width: "100%",
          height: 380,
          redrawOnParentResize: true,
          id: "spark1",
          group: "sparks",
          type: "line",
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
          },
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        grid: {
          
        },
        colors: ['#00cc7e'],
        tooltip: {
          theme: "dark",
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function formatter(val) {
                return "";
              },
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div className="spark">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          //   height={100}
        />
      </div>
    );
  }
}

export default SparkWidget;
