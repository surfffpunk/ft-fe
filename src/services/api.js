export const mockBalance = 5000;

export const mockTransactions = [
    { id: 1, amount: -50, date: '2024-09-05', category: 'Продукты', type: 'Расход' },
    { id: 2, amount: -500, date: '2024-09-01', category: 'Аренда', type: 'Расход' },
    { id: 3, amount: -100, date: '2024-09-03', category: 'Коммунальные услуги', type: 'Расход' },
    { id: 4, amount: -200, date: '2024-09-06', category: 'Прочее', type: 'Расход' },
    { id: 5, amount: 2000, date: '2024-09-07', category: 'Доход', type: 'Доход' },
    { id: 6, amount: 500, date: '2024-09-08', category: 'Дополнительный доход', type: 'Доход' },
    { id: 7, amount: 300, date: '2024-09-09', category: 'Инвестиции', type: 'Доход' },
];

let currentBalance = mockBalance;

export const getTransactions = () => Promise.resolve({ data: mockTransactions });

export const getBalance = () => Promise.resolve(currentBalance);

export const updateBalance = (newBalance) => {
    currentBalance = newBalance;
    return Promise.resolve(currentBalance);
};

export const registerUser = (userData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userData);
        }, 1000);
    });
};


export const addTransaction = (transaction) => {
    return fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    }).then(response => response.json());
};
