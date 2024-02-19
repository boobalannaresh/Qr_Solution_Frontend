

import "./App.css";
import CourseList from "./CourseList";
import AddCourse from "./AddCourse";
import { Routes, Route } from "react-router-dom";
import Portal from "./Portal";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import Home from "./Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { EditCourse } from "./EditCourse";
import CourseDetail from "./CourseDetail";
import UserList from "./Admin/UserList";
import Users from "./Admin/Users";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Paper style={{ minHeight: "100vh", borderRadius: "0%" }} elevation={9}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/portal"
              element={<ProtectedRoute><Portal mode={mode} setMode={setMode} /></ProtectedRoute>}>

              <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="addcourse" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
              <Route path="course" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
              <Route path="edit/:id" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
              <Route path="view/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
              <Route path="users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
              <Route path="users/:id" element={<ProtectedRoute><Users /></ProtectedRoute>} />


            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
