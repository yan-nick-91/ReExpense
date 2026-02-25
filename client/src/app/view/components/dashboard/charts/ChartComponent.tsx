import { useState } from 'react';
import Button from '../../../UI/Button';
import LineChartDisplay from './LineChartDisplay';
import PieChartDisplay from './PieChartDisplay';

type ChartType = 'line' | 'pie';

export default function ChartComponent() {
  const [activeChart, setActiveChart] = useState<ChartType>('line');

  return (
    <>
      <div className='flex flex-row gap-4 my-2 ml-2'>
        <Button theme='primary' onClick={() => setActiveChart('line')}>
          Line chart
        </Button>
        <Button theme='primary' onClick={() => setActiveChart('pie')}>
          Pie chart
        </Button>
      </div>
      {activeChart === 'line' && <LineChartDisplay />}
      {activeChart === 'pie' && <PieChartDisplay />}
    </>
  );
}
