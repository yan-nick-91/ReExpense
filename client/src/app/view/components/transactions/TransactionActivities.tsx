import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

export default function TransactionActivities() {
  const transactions = useSelector(
    (state: RootState) => state.transaction.items,
  );

  const convertDateToLocaleDate = (date: string): string => {
    const isoDate = new Date(date);
    const localeDate = isoDate.toLocaleDateString('en-GB');
    return localeDate;
  };

  return (
    <div className='p-4'>
      <ul>
        {transactions.map((item) => (
          <li className='mb-2' key={item.id}>
            <div className='flex flex-row gap-2'>
              <p>{convertDateToLocaleDate(item.date)}</p>
              <p className='w-[15%]'>{item.category}</p>
              <p className='w-[10%]'>
                {item.type === 'outcome' ? '-' : ''} {item.currency.toFixed(2)}
              </p>
            </div>

            <div className='border border-gray-400' />
          </li>
        ))}
      </ul>
    </div>
  );
}
