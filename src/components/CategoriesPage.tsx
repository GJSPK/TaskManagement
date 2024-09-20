// src/components/CategoriesPage.tsx

import React, { useEffect, useState } from 'react';
import { Category } from '../models/Category';
import { saveCategories } from '../utils/localStorageUtil';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface CategoriesPageProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ categories, setCategories }) => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const addCategory = () => {
    if (name.trim() === '') {
      alert('Category name must not be empty.');
      return;
    }

    if (categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())) {
      alert('Category already exists.');
      return;
    }

    const newCategory: Category = {
      id: Date.now(),
      name,
    };

    setCategories([...categories, newCategory]);
    setName('');
  };

  const deleteCategory = (categoryId: number) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  return (
    <Box mt={4}>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Back to Tasks
      </Button>
      <h2>Manage Categories</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCategory();
        }}
      >
        <Box display="flex" alignItems="center">
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
            style={{ marginRight: '10px' }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Add Category
          </Button>
        </Box>
      </form>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => deleteCategory(category.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesPage;
