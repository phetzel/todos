import apiClient from './client';

export const fetchCategories = () => (
    apiClient.get('/categories')
);

export const fetchCategory = id => (
    apiClient.get(`/categories/${id}`)
)

export const deleteCategory = id => (
    apiClient.delete(`/categories/${id}`)
)