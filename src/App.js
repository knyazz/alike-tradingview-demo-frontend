import { LOAD_STATUSES } from 'core/settings';
import React from 'react';
import { connect, useDispatch } from 'react-redux';

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

import { products as getTickersAll } from 'redux/actions';

import './App.css';
import { openSocket } from './core/ws';

const ws = openSocket();

const App = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const [load, setLoad] = React.useState(LOAD_STATUSES.INIT);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [productId, setProductId] = React.useState(0);
  const [data, setData] = React.useState(undefined);

  // Window width detection
  React.useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(() => window.innerWidth);
  }, []);

  // get all tickers
  React.useEffect(
    () => {
      if (load === LOAD_STATUSES.INIT) {
        setLoad(LOAD_STATUSES.LOADING);
        dispatch(getTickersAll()).then(() => {
          console.log(product.results.tickers[productId].values)
          setData(product.results.tickers[productId].values);
          setLoad(LOAD_STATUSES.LOADED);
        });
      }
    },
    [dispatch, load, productId, product]
  );

  ws.onmessage = (event) => {
    console.log("[message] got data from server");
    console.log(JSON.parse(event.data));
    const r = JSON.parse(event.data);
    setData(r.tickers[productId].values)
  };

  const formatXAxis = (tickItem) => {
    return new Date(tickItem).toLocaleTimeString();
  };

  const selectProduct = (event) => {
    setProductId(event.target.value);
    setData(product.results.tickers[event.target.value].values)
  };

  return (
    <div className="App">
      <header className="App-header">
        Tradingview Demo
      </header>
      {
        product?.results?.tickers &&
          <select
            style={{ marginBottom: '3rem'}}
            onChange={selectProduct}
          >
            {
              (Object.keys(product?.results?.tickers) || []).map((value, index) => {
                return (
                  <option key={index} value={value}>Ticker {value}</option>
                )
              })
            }
          </select>      }
      {
        data &&
        <LineChart
          width={windowWidth}
          height={400}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
      }
    </div>
  );
}
export default connect(
  (state) => ({
    ...state
  })
)(App);
