import apiClient from './client';

export const createTask = task => (
    apiClient.post('/tasks', task)
);

export const updateTask = (task, id) => (
    apiClient.patch(`/tasks/${id}`, task)
);

export const deleteTask = id => (
    apiClient.delete(`/tasks/${id}`)
);