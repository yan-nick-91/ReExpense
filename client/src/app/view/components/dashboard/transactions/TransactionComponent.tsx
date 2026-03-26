import { useEffect } from 'react';
import Button from '../../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../store/store';
import { getAllSavingBalanceController } from '../../../../controllers/savingController';

type Props = {
  selectedSavingId: string;
  setSelectedSavingId: (id: string) => void;
  onOpenIncomeModal: () => void;
  onOpenOutcomeModal: () => void;
  openSavingModal: () => void;
};

export default function TransactionComponent({
  selectedSavingId,
  setSelectedSavingId,
  onOpenIncomeModal,
  onOpenOutcomeModal,
  openSavingModal,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const savings = useSelector((state: RootState) => state.saving.items);

  useEffect(() => {
    getAllSavingBalanceController(dispatch);
  }, [dispatch]);

  const effectiveSelectedSaving =
    selectedSavingId || (savings.length > 0 ? savings[0].id : '');

  const selectedSaving = savings.find(
    (saving) => saving.id === effectiveSelectedSaving,
  );

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
          <div className='flex justify-end mt-2'>
            <Button
              theme='primary'
              className='w-auto'
              onClick={openSavingModal}
            >
              Add new saving
            </Button>
          </div>
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
