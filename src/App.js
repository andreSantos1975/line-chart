import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
} from 'recharts';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

const RealTimeCpuUsage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('cpu', cpuPercent => {
      setData(currentData => [...currentData, cpuPercent]);
    });
  }, []);

  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <RealTimeCpuUsage />
    </div>
  );
};

export default App;
