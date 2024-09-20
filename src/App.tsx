// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import TaskManager from './components/TaskManager';
import CategoriesPage from './components/CategoriesPage';
import { Category } from './models/Category';
import { getCategories, saveCategories } from './utils/localStorageUtil';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const storedCategories = getCategories();
    if (storedCategories.length === 0) {
      const defaultCategories = [
        { id: 1, name: 'Work' },
        { id: 2, name: 'Personal' },
        { id: 3, name: 'Urgent' },
      ];
      setCategories(defaultCategories);
      saveCategories(defaultCategories);
    } else {
      setCategories(storedCategories);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveCategories(categories);
    }
  }, [categories, initialized]);

  return (
    <Router>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Task Manager
        </Typography>
        <Routes>
          <React.Fragment>
            <Route
              path="/"
              element={<TaskManager categories={categories} />}
            />
          </React.Fragment>
          <Route
            path="/categories"
            element={
              <CategoriesPage
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
