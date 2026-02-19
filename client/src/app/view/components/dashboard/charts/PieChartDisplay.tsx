import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip } from 'recharts';
import type { RootState } from '../../../../store/store';

export default function PieChartDisplay({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const transactions = useSelector(
    (state: RootState) => state.transaction.items,
  );

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.currency, 0);

  const totalOutcome = transactions
    .filter((tx) => tx.type === 'outcome')
    .reduce((sum, tx) => sum + tx.currency, 0);

  const piaData = [
    { name: 'Income', value: totalIncome, fill: '#196090' },
    { name: 'Outcome', value: totalOutcome, fill: '#AA0E14' },
  ];
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={piaData}
          dataKey={'value'}
          nameKey={'name'}
          cx='50%'
          cy='50%'
          outerRadius={120}
          label
          isAnimationActive={isAnimationActive}
        />
        <Tooltip defaultIndex={2} />
      </PieChart>
      <div className='flex flex-row gap-2 mt-4 p-4'>
        <div className='flex items-center gap-2 w-32'>
          <div className='h-3 w-6 bg-[#196090]' />
          <p className='leading-none text-[1rem]'>Income</p>
        </div>
        <div className='flex items-center gap-2 w-32'>
          <div className='h-3 w-6 bg-[#AA0E14]' />
          <p className='leading-none text-[1rem]'>Outcome</p>
        </div>
      </div>
    </>
  );
}
