const WS = {
  host: '127.0.0.1',
  port: 5678
};

export const openSocket = () => {
  const _socket = new WebSocket(`ws://${WS.host}:${WS.port}/`)
  _socket.onopen = () => {
    console.log("[open] connnected success");
  };

  _socket.onmessage = (event) => {
    console.log("[message] got data from server");
    console.log(JSON.parse(event.data));
  };

  _socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(`[close] closed clean, code=${event.code} reason=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log('[close] connection interrupted. Reconnecting...');
      setTimeout(openSocket, 60000);
    }
  };

  _socket.onerror = (error) => {
    console.log(`[error] socket ${error.message}`);
  };

  return _socket;
};