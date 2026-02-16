import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

export default function ChartDisplay() {
  return (
    <LineChart
      style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}
      responsive
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke='#aaa' strokeDasharray='5 5' />
      <Line
        type='monotone'
        dataKey='uv'
        stroke='purple'
        strokeWidth={2}
        name='My data series name'
      />
      <XAxis dataKey='name' />
      <YAxis
        width='auto'
        label={{ value: 'UV', position: 'insideLeft', angle: -90 }}
      />
      <Legend align='right' />
    </LineChart>
  );
}
