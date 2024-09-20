// src/components/Filter.tsx

import React from 'react';
import { Category } from '../models/Category';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FilterProps {
  categories: Category[];
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({
  categories,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <div>
      <h2>Filter Tasks</h2>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="complete">Complete</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          label="Category"
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
