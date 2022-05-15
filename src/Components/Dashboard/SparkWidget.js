import React from "react";
import { connect } from "react-redux";
import ReactApexChart from "react-apexcharts";

import { getRequestsCountsWidgetData } from "../../Actions/RequestActions";

import "./SparkWidget.css";

class SparkWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getSeries = () => {
    let counts = [];
    let series = [];
    if (Object.keys(this.props.requestsCountsWidgetData).length) {
      counts = this.props.requestsCountsWidgetData.map((value, index) => {
        let { count } = value;
        return count;
      });
      series = [
        {
          //   name: "Likes",
          data: counts,
        },
      ];
    }
    return series;
  };

  getOptions = () => {
    let options = {
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
      grid: {},
      colors: ["#00cc7e"],
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
    };
    return options;
  };

  componentDidMount() {
    let { profileState } = this.props;
    let refreshToken = profileState["refresh_token"];
    let accessToken = profileState["access_token"];
    let headers = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    let url = `http://localhost:3050/requests/requestCountsStats`;

    this.props.onGetRequestsCountsWidgetDate(url, headers);
  }

  render() {
    return (
      <div className="spark">
        <ReactApexChart
          options={this.getOptions()}
          series={this.getSeries()}
          type="line"
          //   height={100}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileState: state.signIn.profileState,
    requestsCountsWidgetData: state.requests.requestsCountsWidgetData,
  };
};

const mapActionsToProps = {
  onGetRequestsCountsWidgetDate: getRequestsCountsWidgetData,
};

export default connect(mapStateToProps, mapActionsToProps)(SparkWidget);
