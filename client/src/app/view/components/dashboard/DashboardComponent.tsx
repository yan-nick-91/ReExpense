import { useState } from 'react';
import TransactionComponent from './transactions/TransactionComponent';
import ChartComponent from './charts/ChartComponent';
import TransactionFormModal from './transactions/TransactionFormModal';
import TransactionActivities from './transactions/TransactionActivities';
import type { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { resetSuccessCreate } from '../../../store/slice/transactionSlice';
import GoalsComponent from './goals/GoalsComponent';
import GoalFormModal from './goals/GoalFormModal';

type ExpenseModalType = 'income' | 'expense';

export default function DashboardComponent() {
  const transactionsSuccess = useSelector(
    (state: RootState) => state.transaction.success,
  );

  const [activeExpenseModal, setActiveExpenseModal] = useState<
    ExpenseModalType | undefined
  >(undefined);

  const [activeGoalModal, setActiveGoalModal] = useState(false)

  useState(() => {
    document.title = 'ReExpense | Dashboard';
  });

  const openExpenseModal = (type: ExpenseModalType) => {
    setActiveExpenseModal(type);
    if (transactionsSuccess) resetSuccessCreate();
  };

  const openGoalModal = () => {
    setActiveGoalModal(true)
  }


  const closeExpenseModal = () => setActiveExpenseModal(undefined);

  const closeGoalModal = () => setActiveGoalModal(false)

  return (
    <div className='grid lg:grid-cols-2 w-[90%] m-auto sm:grid-cols-1'>
      <section className='p-4'>
        <div className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2>Diagram Chart</h2>
          </div>
          <ChartComponent />
        </div>
      </section>
      <div className='p-4'>
        <section className='border border-gray-600 w-full rounded-[0.2rem] mb-8'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2>Transaction Manager</h2>
          </div>
          <TransactionComponent
            onOpenIncomeModal={() => openExpenseModal('income')}
            onOpenOutcomeModal={() => openExpenseModal('expense')}
          />
        </section>
        <section className='border border-gray-600 rounded-[0.2rem] mb-8'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2>Goals</h2>
          </div>
          <GoalsComponent onOpenGoalModal={openGoalModal}/>
        </section>
        <section className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2>Activities</h2>
          </div>
          <TransactionActivities />
        </section>
      </div>
      {activeExpenseModal === 'income' && (
        <TransactionFormModal
          expenseType={activeExpenseModal}
          onClose={closeExpenseModal}
        />
      )}

      {activeExpenseModal === 'expense' && (
        <TransactionFormModal
          expenseType={activeExpenseModal}
          onClose={closeExpenseModal}
        />
      )}
      {activeGoalModal && (
        <GoalFormModal onClose={closeGoalModal}/>
      )}
    </div>
  );
}
