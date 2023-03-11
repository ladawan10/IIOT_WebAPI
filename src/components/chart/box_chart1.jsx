import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  ComposedChart,
  CartesianGrid,
} from "recharts";

import "./styleChart.css";

export default function Chart_Boxes({ data, keyar, nums }) {

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="widget-chart-content">
          {/* <div className="widget-numbers"></div> */}
          <div className="widget-subheading">
            {/* <h4 style={{ marginRight: "10px", marginBottom: "0" }}>
              {message}
            </h4> */}
            <span className="pe-1">{nums}%</span>
          </div>
          <div className="widget-description text-warning">
            {/* <FontAwesomeIcon icon={faArrowLeft}/> */}
          </div>
        </div>
        <div className="widget-chart-wrapper">
          <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#24a6f7" stopOpacity={0.7} />
                  <stop offset="90%" stopColor="#24a6f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* <Tooltip /> */}
              <Area
                type="monotoneX"
                dataKey={keyar}
                stroke="#24a6f7"
                fill="url(#colorPv2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
