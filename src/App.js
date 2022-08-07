import React from 'react';
import { connect, useDispatch } from 'react-redux';


import { LOAD_STATUSES } from 'core/settings';
import { AppHeader } from 'components/Header';
import { TickerLineChart, TickerSelector } from 'components/Ticker';
import { openSocket } from 'core/ws';
import { products as getTickersAll } from 'redux/actions';

import './App.css';

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
          const tickers = product?.results?.tickers || [];
          if (tickers.length > 0) {
            setData(tickers[productId].values);
          }
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

  const selectProduct = (event) => {
    setProductId(event.target.value);
    setData(product.results.tickers[event.target.value].values)
  };

  return (
    <div className="App">
      <AppHeader />
      {
        product?.results?.tickers &&
        <TickerSelector
          products={product?.results?.tickers ||[]}
          selectProduct={selectProduct}
        />
      }
      {
        data &&
        <TickerLineChart data={data} windowWidth={windowWidth} />
      }
    </div>
  );
}
export default connect(
  (state) => ({
    ...state
  })
)(App);
