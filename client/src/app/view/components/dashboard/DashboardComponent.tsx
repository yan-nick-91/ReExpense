import { useState } from 'react';
import TransactionComponent from '../transactions/TransactionComponent';
import ChartDisplay from './ChartDisplay';
import ExpenseFormModal from './expense/ExpenseFormModal';
import ExpenseInputComponent from './expense/ExpenseInputComponent';
import TransactionActivities from '../transactions/TransactionActivities';

type ExpenseModalType = 'income' | 'outcome';

export default function DashboardComponent() {
  const [activeExpenseModal, setActiveExpenseModal] = useState<
    ExpenseModalType | undefined
  >(undefined);

  const openExpenseModal = (type: ExpenseModalType) => {
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
        <section className='border border-gray-600 w-full rounded-[0.2rem] mb-8'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10' />
          <TransactionComponent
            onOpenIncomeModal={() => openExpenseModal('income')}
            onOpenOutcomeModal={() => openExpenseModal('outcome')}
          />
        </section>
        <section className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2>Activities</h2>
          </div>
          <TransactionActivities />
        </section>
      </div>
      {activeExpenseModal === 'income' && (
        <ExpenseFormModal formHeaderText='Income' onClose={closeExpenseModal}>
          <ExpenseInputComponent
            labelId='amount of income currency'
            labelText='Amount of income currency'
            type='number'
          />
          <ExpenseInputComponent
            labelId='category'
            labelText='Category'
            type='text'
          />
        </ExpenseFormModal>
      )}

      {activeExpenseModal === 'outcome' && (
        <ExpenseFormModal formHeaderText='Outcome' onClose={closeExpenseModal}>
          test
        </ExpenseFormModal>
      )}
    </div>
  );
}
