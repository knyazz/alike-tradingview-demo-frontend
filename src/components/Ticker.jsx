import React from 'react';

import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Brush,
  AreaChart,
  Area
} from 'recharts';


export const TickerSelector = (props) => {
  return (
    <select
      style={{ margin: '2rem' }}
      onChange={props.selectProduct}
    >
      {
        (Object.keys(props?.products) || []).map((value, index) => {
          return (
            <option key={index} value={value}>Ticker {value}</option>
          )
        })
      }
    </select>
  )
};

export const TickerLineChart = (props) => {
  const { data, windowWidth } = props;

  const formatXAxis = (tickItem) => {
    return new Date(tickItem).toLocaleTimeString();
  };
  return (
    <LineChart
      width={windowWidth}
      height={400}
      data={data}
      margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey="time" tickFormatter={formatXAxis} />
      <YAxis domain={['auto', 'auto']} />
      <Tooltip
        wrapperStyle={{
          borderColor: 'white',
          boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
        }}
        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        labelStyle={{ fontWeight: 'bold', color: '#666666' }}
      />
      <Line dataKey="value" stroke="green" dot={true} />
      <Brush dataKey="time" startIndex={Math.max(0, data.length - 40)}>
        <AreaChart>
          <CartesianGrid />
          <YAxis hide domain={['auto', 'auto']} />
          <Area dataKey="value" stroke="green" fill="green" dot={false} />
        </AreaChart>
      </Brush>
    </LineChart>
  )
}