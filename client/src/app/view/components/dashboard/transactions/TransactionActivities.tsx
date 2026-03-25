import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import clsx from 'clsx';
import Button from '../../../UI/Button';
import { convertDateToLocaleDate } from '../../../../utils/globalFunctions';
import { useEffect } from 'react';
import { getAllTransactionController } from '../../../../controllers/transactionController';

type Props = {
  selectedSavingId: string;
};

export default function TransactionActivities({ selectedSavingId }: Props) {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state: RootState) => state.transaction.items,
  );

  useEffect(() => {
    getAllTransactionController(dispatch, selectedSavingId);
  }, [dispatch, selectedSavingId]);

  return (
    <div className='px-4 py-2 mt-3 h-60 overflow-y-scroll'>
      <ul>
        {transactions.map((item) => (
          <li className='mb-2' key={item.id}>
            <div className='flex flex-row gap-2'>
              <p>{convertDateToLocaleDate(item.date)}</p>
              <p className='w-[15%]'>{item.category}</p>
              <p
                className={clsx(
                  `w-[20%] text-right ${item.type === 'expense' ? 'text-red-500' : 'text-green-600'}`,
                )}
              >
                {item.type === 'expense' ? '-' : '+'} {item.amount.toFixed(2)}
              </p>
              <Button
                className='ml-6'
                theme='primary'
                navigateTo={`/transactions/${item.id}`}
              >
                View transaction
              </Button>
            </div>
            <div className='border border-gray-400' />
          </li>
        ))}
      </ul>
    </div>
  );
}
