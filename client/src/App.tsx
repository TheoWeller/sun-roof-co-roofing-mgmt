import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";
import Layout from "./components/Layout";

// import Home from "./pages/Home";

import Projects from "./pages/Projects";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectUpdate from "./pages/ProjectEdit";

import Users from "./pages/Users";
import UserCreate from "./pages/UserCreate";
import UserDetail from "./pages/UserDetail";
import UserEdit from "./pages/UserEdit";

import TimeCards from "./pages/TimeCards";
import TimeCardDetail from "./pages/TimeCardDetail";
import TimeCardEdit from "./pages/TimeCardEdit";
import TimeCardCreate from "./pages/TimeCardCreate";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<ProjectCreate />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id/edit" element={<ProjectUpdate />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users/:id/edit" element={<UserEdit />} />

            <Route path="/time-cards" element={<TimeCards />} />
            <Route path="/time-cards/:id" element={<TimeCardDetail />} />

            <Route path="/time-cards/:id/edit" element={<TimeCardEdit />} />
            <Route path="/time-cards/create" element={<TimeCardCreate />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
