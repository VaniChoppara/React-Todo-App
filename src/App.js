
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { TodoHome } from './components/home';
import { TodoLogin } from './components/login';
import { TodoRegister } from './components/register';
import { TodoInvalidLogin } from './components/invalidlogin';
import { TodoDashboard } from './components/tododashboard';
import { TodoError } from './components/error';
import { TodoAddTask } from './components/addtask';
import { TodoDeleteTask } from './components/deletetask';
import { TodoEditTask } from './components/edittask';

function App() {
  return (
    <div className="container-fluid">
    <BrowserRouter>
    <header>
      <h1 className='text-white text-center'>To-Do</h1>
      <p className='text-white fs-4 fw-bold text-center'>Your Appointments</p>
      
    </header>
    <section className='mt-4'>
      <div>
        <Routes>
          <Route path='/' element={<TodoHome />}></Route>
          <Route path='/login' element={<TodoLogin/>}></Route>
          <Route path='/register' element={<TodoRegister />}></Route>
          <Route path='/invalidlogin' element={<TodoInvalidLogin />}></Route>
          <Route path='/dashboard' element={<TodoDashboard />}></Route>
          <Route path='/addtask' element={<TodoAddTask/>}></Route>
          <Route path='/deletetask/:id' element={<TodoDeleteTask/>}></Route>
          <Route path='/edittask/:id' element={<TodoEditTask/>}></Route>
          <Route path='*' element={<TodoError/>}></Route>
        </Routes>
      </div>
    </section>
    </BrowserRouter>
          </div>
  );
}

export default App;
