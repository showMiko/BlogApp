import { Box } from "@mui/material";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import AuthProvider, {
  useAuth,
} from "./components/ContextProvider/AuthContext";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import BlogForm from "./components/BlogForm";
import AllPosts from "./components/AllPosts";
import HomePage from "./components/HomePage";
function App() {
  const AuthRoute = ({ children }) => {
    const authContext = useAuth();
    if (authContext.isAuthenticated) return children;
    return <Navigate to="/login" />;
  };
  return (
    <AuthProvider>
      <Box>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/welcome"
              element={
                <AuthRoute>
                  <Welcome />
                </AuthRoute>
              }
            />
            <Route path='/welcome/postablog' element={
            <AuthRoute>
              <BlogForm />
            </AuthRoute>
          } />
            <Route path='/welcome/Home' element={
            <AuthRoute>
              <HomePage/>
            </AuthRoute>
          } />
            <Route
              path="/*"
              element={
                <div>
                  404 not Found <br />
                  We are Currently Working on It{" "}
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </AuthProvider>
  );
}

export default App;
