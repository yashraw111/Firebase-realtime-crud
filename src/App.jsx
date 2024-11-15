import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Realtime/CRUD/Create';
import SingleUser from './Realtime/CRUD/SingleUser';
import 'bootstrap/dist/css/bootstrap.css';
import Update from './Realtime/CRUD/Update';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/user/:id" element={<SingleUser />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
