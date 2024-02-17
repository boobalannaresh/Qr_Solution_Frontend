

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
import { EditCourse} from "./EditCourse";
import CourseDetail from "./CourseDetail";

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
              element={<Portal mode={mode} setMode={setMode} />}>
                
              <Route path="home" element={<Home />} />
              <Route path="addcourse" element={<AddCourse />} />
              <Route path="course" element={<CourseList/>} />
              <Route path="edit/:id" element={<EditCourse/>} />
              <Route path="view/:id" element={<CourseDetail />} />

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
