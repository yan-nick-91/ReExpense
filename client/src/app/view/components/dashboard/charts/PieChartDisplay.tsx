import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip } from 'recharts';
import type { RootState } from '../../../../store/store';

type Props = {
  isAnimationActive?: boolean;
};

export default function PieChartDisplay({ isAnimationActive = true }: Props) {
  const transactions = useSelector(
    (state: RootState) => state.transaction.items,
  );

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;
  const isPositive = balance >= 0;

  const pieData = [
    { name: 'Income', value: totalIncome, fill: '#196090' },
    { name: 'Expense', value: totalExpense, fill: '#AA0E14' },
  ];

  return (
    <div className='flex flex-col p-2'>
      <strong>
        Total balance:{' '}
        <span className={`${isPositive ? '' : 'text-red-500'}`}>
          {isPositive ? '' : '-'}{Math.abs(balance).toFixed(2)}
        </span>
      </strong>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
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
          <p className='leading-none text-[1rem]'>Expense</p>
        </div>
      </div>
    </div>
  );
}
