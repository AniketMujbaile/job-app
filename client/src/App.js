import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/user" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/user" 
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<PrivateRoute path="/admin" adminComponent={AdminDashboard} />} />
//         <Route path="/user" element={<PrivateRoute path="/user" userComponent={UserDashboard} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         {/* Add a route for the home page */}
//         <Route path="/" element={<Login />} />
//         {/* Add a fallback route for undefined paths */}
//         <Route path="*" element={<div>Page Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin" element={<PrivateRoute component={AdminDashboard} />} />
//         <Route path="/user" element={<PrivateRoute component={UserDashboard} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import { Provider } from 'react-redux';
// // import store from './store';
// // import Login from './components/Login';
// // import Signup from './components/Signup';
// // import AdminDashboard from './components/AdminDashboard';
// // import UserDashboard from './components/UserDashboard';
// // import PrivateRoute from './components/PrivateRoute';

// // function App() {
// //   return (
// //     <Provider store={store}>
// //       <Router>
// //         <div className="min-h-screen bg-gray-100">
// //           <Switch>
// //             <Route exact path="/" component={Login} />
// //             <Route path="/signup" component={Signup} />
// //             <PrivateRoute path="/admin" component={AdminDashboard} />
// //             <PrivateRoute path="/user" component={UserDashboard} />
// //           </Switch>
// //         </div>
// //       </Router>
// //     </Provider>
// //   );
// // }

// // export default App;