import React from 'react';
import { Radar } from 'react-chartjs';

const PokeInfo = props => {
  const labels = props.stats
    ? props.stats.map(info => {
        return info.stat.name;
      })
    : [];

  const data = props.stats
    ? props.stats.map(info => {
        return info.base_stat;
      })
    : [];

  let chartData = {
    labels,
    datasets: [
      {
        data: data,
        fillColor: 'rgba(255,99,132,0.2)',
        strokeColor: 'rgba(255,99,132,1)',
        pointColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)'
      }
    ]
  };
  return (
    <div className="info">
      <img src={props.sprites ? props.sprites.front_default : ''} />
      <Radar data={chartData} width="280" height="280" />
    </div>
  );
};

export default PokeInfo;
