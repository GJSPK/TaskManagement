// src/components/CategoryForm.tsx

import React, { useState } from 'react';
import { Category } from '../models/Category';
import { TextField, Button } from '@mui/material';

interface CategoryFormProps {
  categories: Category[];
  addCategory: (category: Category) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categories, addCategory }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    addCategory(newCategory);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Category</h2>
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="secondary">
        Add Category
      </Button>
    </form>
  );
};

export default CategoryForm;
