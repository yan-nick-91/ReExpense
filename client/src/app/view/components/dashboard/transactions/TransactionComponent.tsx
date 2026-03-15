import { useEffect, useState } from 'react';
import Button from '../../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store/store';
import { getAllSavingBalanceController } from '../../../../controllers/savingController';

type Props = {
  onOpenIncomeModal: () => void;
  onOpenOutcomeModal: () => void;
};

export default function TransactionComponent({
  onOpenIncomeModal,
  onOpenOutcomeModal,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const savings = useSelector((state: RootState) => state.saving.items);
  const [selectedSavingId, setSelectedSavingId] = useState<string>('');

  useEffect(() => {
    getAllSavingBalanceController(dispatch);
  }, [dispatch]);

  const selectedSaving =
    savings.find((saving) => saving.id === selectedSavingId) || savings[0];

  const currentAmount = selectedSaving ? selectedSaving.balance : 0;

  return (
    <div className='p-4'>
      <div className='flex flex-col lg:flex-row justify-between items-start gap-4 mb-4'>
        <p>Current balance: {currentAmount.toFixed(2)}</p>
        <div className='w-full lg:w-56'>
          <select
            className='w-full border border-gray-400 rounded-[0.2rem] px-2 py-1'
            value={selectedSavingId}
            onChange={(e) => setSelectedSavingId(e.target.value)}
          >
            {savings.map((saving) => (
              <option key={saving.id} value={saving.id}>
                {saving.name}
              </option>
            ))}
          </select>
        </div>
      </div>
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
