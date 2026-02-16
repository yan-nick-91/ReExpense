import { useEffect } from 'react';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaction } from '../../../api/transactionHttpHandler';
import type { AppDispatch, RootState } from '../../../store/store';

export default function TransactionComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const transactions = useSelector(
    (state: RootState) => state.transaction.items,
  );

  useEffect(() => {
    dispatch(getAllTransaction());
    // console.log(data)
  }, [dispatch]);

  const currentAmount = transactions.reduce((acc, tx) => {
    if (tx.type === 'income') return acc + tx.amount;
    if (tx.type === 'outcome') return acc - tx.amount;
    return acc;
  }, 0);

  return (
    <>
      <div className='mb-4'>Current amount: {currentAmount.toFixed(2)}</div>
      <div className='flex gap-4'>
        <Button theme={'primary'}>Add</Button>
        <Button theme={'primary'}>Sub</Button>
      </div>
    </>
  );
}
