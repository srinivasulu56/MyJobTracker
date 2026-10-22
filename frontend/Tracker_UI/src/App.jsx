 import {Navigate,Route,Routes} from "react-router-dom";
 import {useAuth} from "./context/AuthContext";
 import Login from "./components/Login";
 import Register from "./components/Register";
 import Dashboard from "./pages/Dashboard";

 function ProtectedRoute({children}){
 const {isAuthenticated} = useAuth();
 return isAuthenticated ? children: <Navigate to="/login" replace/>
 }

  function App() {
   return (
   <Routes>
    <Route
    path="/"
    element={<Navigate to="/dashboard" replace/>}
    />

    <Route
    path="/login"
    element={<Login/>}
    />

    <Route
    path="/register"
    element={<Register/>}
    />

    <Route
    path="/dashboard"
    element={<ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>}  
    />

    <Route
    path="*"
    element={<Navigate to="/" replace/>}
    />

    
   </Routes>
   )
  }

  export default App;