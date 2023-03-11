import React from 'react'
import Chart from 'react-apexcharts'
export default function RadiaBar() {
    // const series = { series :75}
    const options = {
        series :[75],
        options: {
            chart: {
              height: 250,
              type: 'radialBar',
              toolbar: {
                // show: true
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '50%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '65%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#90d783'],
                // colorStops: [
                //     {
                //       offset: 0,
                //       color: "#FFBB0D",
                //       opacity: 1
                //     },
                //     {
                //       offset: 40,
                //       color: "#FFBB0D",
                //       opacity: 1
                //     },
                //     {
                //       offset: 60,
                //       color: "#FF720D",
                //       opacity: 1
                //     },
                //     {
                //       offset: 100,
                //       color: "#FF720D",
                //       opacity: 1
                //     }
                //   ],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
                
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Percent'],
          },
    }
  return (
    <div style={{margin:'0rem'}}>
        <Chart options={options.options} series={options.series} type="radialBar" height={300} />

    </div>
  )
}
