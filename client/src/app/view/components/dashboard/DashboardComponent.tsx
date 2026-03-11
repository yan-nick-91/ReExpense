import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { resetSuccessCreate } from '../../../store/slice/transactionSlice';
import TransactionComponent from './transactions/TransactionComponent';
import ChartComponent from './charts/ChartComponent';
import TransactionFormModal from './transactions/TransactionFormModal';
import TransactionActivities from './transactions/TransactionActivities';
import GoalComponent from './goals/GoalComponent';
import GoalFormModal from './goals/GoalFormModal';
import { useRegisterSkipLinks } from '../../../hooks/skipLinkHooks';

type ExpenseModalType = 'income' | 'expense';

export default function DashboardComponent() {
  const transactionsSuccess = useSelector(
    (state: RootState) => state.transaction.success,
  );

  const [activeExpenseModal, setActiveExpenseModal] = useState<
    ExpenseModalType | undefined
  >(undefined);

  const [activeGoalModal, setActiveGoalModal] = useState(false);

  useState(() => {
    document.title = 'ReExpense | Dashboard';
  });

  useRegisterSkipLinks('dashboard', [
    { href: '#chart-section', label: 'Go to chart diagrams' },
    { href: '#transaction-section', label: 'Go to transactions' },
    { href: '#goals-section', label: 'Go to goals' },
    { href: '#activities-section', label: 'Go to activities' },
  ]);

  const openExpenseModal = (type: ExpenseModalType) => {
    setActiveExpenseModal(type);
    if (transactionsSuccess) resetSuccessCreate();
  };

  const openGoalModal = () => {
    setActiveGoalModal(true);
  };

  const closeExpenseModal = () => setActiveExpenseModal(undefined);

  const closeGoalModal = () => setActiveGoalModal(false);

  return (
    <div className='grid lg:grid-cols-2 w-[90%] m-auto sm:grid-cols-1'>
      <h1 id='main-content' className='sr-only'>
        Dashboard
      </h1>
      <section
        id='chart-section'
        className='p-4'
        aria-labelledby='chart-heading'
      >
        <div className='border border-gray-600 w-full rounded-[0.2rem]'>
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2 id='chart-heading'>Diagram Chart</h2>
          </div>
          <ChartComponent />
        </div>
      </section>
      <div className='p-4'>
        <section
          id='transaction-section'
          className='border border-gray-600 w-full rounded-[0.2rem] mb-8'
          aria-labelledby='transaction-heading'
        >
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2 id='transaction-heading'>Transaction Manager</h2>
          </div>
          <TransactionComponent
            onOpenIncomeModal={() => openExpenseModal('income')}
            onOpenOutcomeModal={() => openExpenseModal('expense')}
          />
        </section>
        <section
          id='goals-section'
          className='border border-gray-600 rounded-[0.2rem] mb-8'
          aria-labelledby='goals-heading'
        >
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2 id='goals-heading'>Goals</h2>
          </div>
          <GoalComponent onOpenGoalModal={openGoalModal} />
        </section>
        <section
          id='activities-section'
          className='border border-gray-600 w-full rounded-[0.2rem]'
          aria-labelledby='activities-header'
        >
          <div className='bg-[#090979] text-white p-1 pl-2 text-[1.2rem] h-10'>
            <h2 id='activities-header'>Activities</h2>
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
      {activeGoalModal && <GoalFormModal onClose={closeGoalModal} />}
    </div>
  );
}
