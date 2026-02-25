import clsx from 'clsx';
import Button from '../../../UI/Button';

type Props = {
    onClose: () => void
}

export default function GoalFormModal({onClose}: Props) {
  return (
    <div>
      <section
        className={clsx(
          'fixed inset-0 flex items-center justify-center bg-[#1b1b1bbd] bg-opacity-50',
        )}
      >
        test
        <form className='bg-white p-4 rounded-[0.2rem] shadow-lg w-200'>
            <h2>Add new goal</h2>
          <Button theme='primary' onClick={onClose}>
            Close Form
          </Button>
        </form>
      </section>
    </div>
  );
}
