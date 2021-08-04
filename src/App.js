import './App.css';
import Navbar from './Components/Navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer'
import UPrivateRounte from './Components/PrivateRoute/UPrivateRoute';
import PrivateRounte from './Components/PrivateRoute/PrivateRounte';
import AdminPrivateRoute from './Components/PrivateRoute/AdminPrivateRoute'
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import Mainview from './Components/Mainview/Mainview';
import Profile from './Components/Profile/Profile'
import BookStore from './Components/BookStore/BookStore';
import AddBook from './Components/AddBook/AddBook';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
function App() { 
  return (
    <AuthProvider>
      <div className="App">
        <Router >
          <Navbar />
          <Route exact path='/'>
            <Mainview />
            <BookStore /> 
          </Route>
          <PrivateRounte exact path="/addbook" component={AddBook} />
          <PrivateRounte exact path="/user" component={Profile} />
          <AdminPrivateRoute exact path='/cuser/:firstName' component={Profile} />
          <PrivateRounte exact path="/updatepassword" component={UpdatePassword} />
          <AdminPrivateRoute exact path='/admin'  component={AdminPanel} />
          <UPrivateRounte exact path='/login' component={Login} />
          <UPrivateRounte exact path='/signup' component={Signup} />
        </Router>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;