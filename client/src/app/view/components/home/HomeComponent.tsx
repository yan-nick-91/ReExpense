import Button from '../../UI/Button';

export default function HomeComponent() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='border border-gray-600 w-[80%] rounded-[0.2rem]'>
        <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem]'>
          <h1>Home</h1>
        </div>
        <section className='p-2'>
          <strong>Welcome</strong>
          <p className='mb-4'>Select the options below</p>
          <section className='flex flex-row gap-10 justify-center'>
            <Button navigateTo='login' theme='primary'>
              Login
            </Button>
            <Button navigateTo='register' theme='primary'>
              Register
            </Button>
          </section>
        </section>
      </div>
    </div>
  );
}
