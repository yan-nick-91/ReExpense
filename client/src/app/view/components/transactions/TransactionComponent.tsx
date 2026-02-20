import { useEffect } from 'react';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaction } from '../../../api/transactionHttpHandler';
import type { AppDispatch, RootState } from '../../../store/store';

type Props = {
  onOpenIncomeModal: () => void;
  onOpenOutcomeModal: () => void;
}

export default function TransactionComponent({
  onOpenIncomeModal,
  onOpenOutcomeModal,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const transactions = useSelector(
    (state: RootState) => state.transaction.items,
  );

  useEffect(() => {
    dispatch(getAllTransaction());
  }, [dispatch]);

  const currentAmount = transactions.reduce((acc, tx) => {
    if (tx.type === 'income') return acc + tx.amount;
    if (tx.type === 'expense') return acc - tx.amount;
    return acc;
  }, 0);

  return (
    <div className='p-4'>
      <p className='mb-4'>Current balance: {currentAmount.toFixed(2)}</p>
      <div className='border border-gray-400 mb-4' />
      <div className='flex gap-4'>
        <Button theme={'primary'} onClick={onOpenIncomeModal}>
          Add amount
        </Button>
        <Button theme={'primary'} onClick={onOpenOutcomeModal}>
          Subtract amount
        </Button>
      </div>
    </div>
  );
}
