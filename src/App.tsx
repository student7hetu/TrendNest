import Sidebar from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className='flex h-screen'>
        <Sidebar />
      </div>
    </BrowserRouter>
  );
};

export default App;
