import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllWallets = () => apiClient.get('/wallets/all');
export const getWalletById = (id) => apiClient.get(`/wallets/find/${id}`);
export const createWallet = (data) => apiClient.post('/wallets/create', data);
export const updateWallet = (id, data) => apiClient.put(`/wallets/update/${id}`, data);
export const deleteWallet = (id) => apiClient.delete(`/wallets/remove/${id}`);

export const getAllUsers = () => apiClient.get('/users/all');
export const getUserById = (id) => apiClient.get(`/users/find/${id}`);
export const createUser = (data) => apiClient.post('/users/create', data);
export const updateUser = (id, data) => apiClient.put(`/users/update/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/users/remove/${id}`);
export const uploadProfilePicture = async (data) => {
    const response = await apiClient.post('/auth/profile/upload-photo', data); // Убедитесь, что этот путь существует
    return response;
};

export const getAllScheduledPayments = () => apiClient.get('/scheduled/all');
export const getScheduledPaymentById = (id) => apiClient.get(`/scheduled/find/${id}`);
export const createScheduledPayment = (data) => apiClient.post('/scheduled/create', data);
export const updateScheduledPayment = (id, data) => apiClient.put(`/scheduled/update/${id}`, data);
export const deleteScheduledPayment = (id) => apiClient.delete(`/scheduled/remove/${id}`);

export const getAllOperations = () => apiClient.get('/operations/all');
export const getOperationById = (id) => apiClient.get(`/operations/find/${id}`);
export const createOperation = (data) => apiClient.post('/operations/create', data);
export const updateOperation = (id, data) => apiClient.put(`/operations/update/${id}`, data);
export const deleteOperation = (id) => apiClient.delete(`/operations/remove/${id}`);


export const getAllCategories = () => apiClient.get('/categories/all');
export const getCategoryById = (id) => apiClient.get(`/categories/find/${id}`);
export const createCategory = (data) => apiClient.post('/categories/create', data);
export const updateCategory = (id, data) => apiClient.put(`/categories/update/${id}`, data);
export const deleteCategory = (id) => apiClient.delete(`/categories/remove/${id}`);

export const registerUser = (data) => apiClient.post('/auth/register', data);
