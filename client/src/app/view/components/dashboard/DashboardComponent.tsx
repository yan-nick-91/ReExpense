
export default function DashboardComponent() {


  // useEffect(() => {
  //   const date = new Date();
  //   const time: number = date.getHours() 
    
  //   if (time >= 24 && time < 12) {
  //     setGreetingTimeState('Good Morning')
  //   } else if (time >= 12 && time < 18) {
  //     setGreetingTimeState('Good Afternoon')
  //   } else {
  //     setGreetingTimeState('Good Evening')
  //   }

  // },[setGreetingTimeState])

  return (
    <div className='p-4'>
      <div className='border border-gray-600 w-[40%] rounded-[0.2rem]'>
        <div className='bg-[#090979] text-white p-2 pl-2 text-[1.2rem] h-10'/>
          Hello
        <div className=""></div>
      </div>
    </div>
  );
}


