import React from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";

import { getRequestsStatusWidgetData } from "../../Actions/RequestActions";

import "./Piechart.css";

class RadialBarChart extends React.Component {
  componentDidMount() {
    let { profileState } = this.props;
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = `http://localhost:3050/requests/requestStatusStats`;
    this.props.onGetRequestsStatusWidgetData(url, headers);
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
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 25;
              },
            },
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
      labels: ["Pending", "Accepted", "Rejected"],
    };
    return options;
  };

  getSeries = () => {
    let series = [];
    if (Object.keys(this.props.requestsStatusWidgetData).length) {
      let { pendingDocsCount, acceptedDocsCount, rejectedDocsCount } =
        this.props.requestsStatusWidgetData;
      series = [pendingDocsCount, acceptedDocsCount, rejectedDocsCount];
    }
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

const mapActionsToProps = {
  onGetRequestsStatusWidgetData: getRequestsStatusWidgetData,
};

const mapStateToProps = (state) => {
  return {
    requestsStatusWidgetData: state.requests.requestsStatusWidgetData,
    profileState: state.signIn.profileState,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RadialBarChart);
