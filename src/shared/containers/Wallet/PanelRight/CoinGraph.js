import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';

class CoinGraph extends React.Component {
  render() {
    <div>
      <LineChart
        width={300}
        height={200}
        data={this.props.data}
        >
        <XAxis dataKey="date"/>
        <Tooltip/>
        <Line dataKey="price" stroke="#4cd566"/>
      </LineChart>
    </div>
  }
}

export default CoinGraph;
