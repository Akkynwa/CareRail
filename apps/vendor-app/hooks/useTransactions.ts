export function useTransactions() {
  return {
    transactions: [
      {
        id: "t1",
        amount: 5000,
        beneficiaryName: "John Doe",
        date: new Date("2024-03-25"),
        status: "completed",
      },
      {
        id: "t2",
        amount: 10000,
        beneficiaryName: "Jane Smith",
        date: new Date("2024-03-24"),
        status: "completed",
      },
    ],
  };
}