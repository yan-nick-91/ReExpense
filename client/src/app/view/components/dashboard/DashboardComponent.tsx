import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import TransactionComponent from '../transactions/TransactionComponent';

export default function DashboardComponent() {
  return (
    <div className='grid grid-cols-2 w-[80%] border'>
      <div className='p-4'>
        <div className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem] h-10' />
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
          <div className=''></div>
        </div>
      </div>
      <div className='p-4'>
        <div className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem] h-10' />
          <TransactionComponent />
          <div className=''></div>
        </div>
      </div>
    </div>
  );
}
