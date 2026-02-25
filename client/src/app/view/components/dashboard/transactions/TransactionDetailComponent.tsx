import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllTransactionController } from '../../../../controllers/transactionController';

export default function TransactionDetailComponent() {
  const { transactionId } = useParams<{ transactionId: string }>();
  const dispatch = useDispatch();

  const transaction = useSelector((state: RootState) =>
    state.transaction.items.find((t) => t.id === transactionId),
  );

  useEffect(() => {
    if (!transaction) {
      getAllTransactionController(dispatch);
    }
  }, [dispatch, transaction]);

  const firstIdPart = transaction!.id.split('-')[0];
  const date = new Date(transaction!.date);
  const dateDisplay = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  useEffect(() =>{
    document.title = `ReExpense | Item ${transaction?.category}-${dateDisplay}-${firstIdPart}`
  })

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <section className='flex justify-center h-screen'>
      <div className='flex justify-items-start border w-[90%] p-4'>
        <h1 className='text-[1.2rem] font-bold'>Item: {`${transaction.category}-${dateDisplay}-${firstIdPart}`}</h1>
      </div>
    </section>
  );
}
