import './App.css'
import Calendar from '@/components/sections/calendar/Calendar';
import Events from '@/components/sections/event/Event';

function App() {

  return (
    <main className='sm:p-8 sm:bg-blue-400 h-screen w-screen'>
      <section className=' bg-slate-50 sm:flex-row flex-col flex h-full w-full sm:rounded-md overflow-hidden shadow-sm'>
        <Calendar />
        <Events />
      </section>
    </main>
  )
}

export default App
