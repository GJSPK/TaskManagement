// src/__tests__/TaskForm.test.tsx

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { Category } from '../models/Category';

// Mock the window.alert function before all tests
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

describe('TaskForm Component', () => {
  test('adds a new task when the form is submitted', async () => {
    const categories: Category[] = [{ id: 1, name: 'Work' }];
    const addTask = jest.fn();

    render(<TaskForm categories={categories} addTask={addTask} />);

    // Open the modal dialog
    fireEvent.click(screen.getByText(/Add New Task/i));

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/Due Date/i), { target: { value: '2024-01-01' } });

    // Open the category select dropdown
    fireEvent.mouseDown(screen.getByLabelText(/Category/i));
    // Select the category
    fireEvent.click(screen.getByText('Work'));

    // Submit the form
    fireEvent.click(screen.getByText(/Add Task/i));

    // Wait for any asynchronous actions (if necessary)
    await waitFor(() => {
      expect(addTask).toHaveBeenCalledTimes(1);
    });

    // Optionally, you can check that the modal closes after submission
    expect(screen.queryByLabelText(/Description/i)).toBeNull();
  });

  test('displays validation error when description is empty', async () => {
    const categories: Category[] = [{ id: 1, name: 'Work' }];
    const addTask = jest.fn();

    render(<TaskForm categories={categories} addTask={addTask} />);

    // Open the modal dialog
    fireEvent.click(screen.getByText(/Add New Task/i));

    // Attempt to submit the form without filling it
    fireEvent.click(screen.getByText(/Add Task/i));

    // Wait for any asynchronous actions (if necessary)
    await waitFor(() => {
      // Since alert is mocked, we expect addTask not to be called
      expect(addTask).not.toHaveBeenCalled();
    });
  });
});
