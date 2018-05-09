import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';

class CoinGraph extends React.Component {
  render() {
    // APENAS PARA TESTE
    const data = [
      {date: '28/04', price: 3830.99},
      {date: '29/04', price: 4088.22},
      {date: '30/04', price: 4029.93},
      {date: '01/05', price: 3980.01},
      {date: '02/05', price: 4340.88},
      {date: '03/05', price: 4320.29},
      {date: '04/05', price: 4450.92}
    ];

    return (
      <div>
        <LineChart
          width={250}
          height={175}
          data={data}
          >
          <XAxis dataKey="date"/>
          <Tooltip/>
          <Line dataKey="price" stroke="#4cd566"/>
        </LineChart>
      </div>
    )
  }
}

export default CoinGraph;
