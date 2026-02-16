import { useState } from 'react';
import TransactionComponent from '../transactions/TransactionComponent';
import ChartDisplay from './ChartDisplay';
import ExpenseFormModal from './ExpenseFormModal';
import IncomeTransaction from '../transactions/IncomeTransaction';

type ExpenseModalType = 'income' | 'outcome';

export default function DashboardComponent() {
  const [activeExpenseModal, setActiveExpenseModal] = useState<
    ExpenseModalType | undefined
  >(undefined);

  const openExpenseModal = (type: ExpenseModalType) => {
    console.log('Opening type:', type);
    setActiveExpenseModal(type);
  };
  const closeExpenseModal = () => setActiveExpenseModal(undefined);

  return (
    <div className='grid grid-cols-2 w-[90%] m-auto'>
      <section className='p-4'>
        <div className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10' />
          <ChartDisplay />
          <div className=''></div>
        </div>
      </section>
      <div className='p-4'>
        <section className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10' />
          <TransactionComponent
            onOpenIncomeModal={() => openExpenseModal('income')}
            onOpenOutcomeModal={() => openExpenseModal('outcome')}
          />
        </section>
      </div>
      {/* income */}
      {activeExpenseModal === 'income' && (
        <ExpenseFormModal formHeaderText='Income' onClose={closeExpenseModal}>
          <IncomeTransaction />
        </ExpenseFormModal>
      )}

      {/* income */}
      {activeExpenseModal === 'outcome' && (
        <ExpenseFormModal formHeaderText='Outcome' onClose={closeExpenseModal}>
          test
        </ExpenseFormModal>
      )}
    </div>

    // modal opens here
  );
}
