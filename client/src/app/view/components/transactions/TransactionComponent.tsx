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
    if (tx.type === 'income') return acc + tx.currency;
    if (tx.type === 'outcome') return acc - tx.currency;
    return acc;
  }, 0);

  return (
    <div className='p-4'>
      <p className='mb-4'>Current currency: {currentAmount.toFixed(2)}</p>
      <div className='border border-gray-400 mb-4' />
      <div className='flex gap-4'>
        <Button theme={'primary'} onClick={onOpenIncomeModal}>
          Income
        </Button>
        <Button theme={'primary'} onClick={onOpenOutcomeModal}>
          Outcome
        </Button>
      </div>
    </div>
  );
}
