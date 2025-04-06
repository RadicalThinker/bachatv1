"use client"

import { createContext, useContext, useState } from "react";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {

  const allTransactions = [
    {
      id: "t1",
      description: "Grocery Shopping",
      amount: -120.5,
      date: "Jul 26, 2023",
      category: "Food",
      merchant: {
        name: "Whole Foods",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "W",
      },
    },
    {
      id: "t2",
      description: "Salary Deposit",
      amount: 3700.0,
      date: "Jul 25, 2023",
      category: "Income",
      merchant: {
        name: "Acme Inc",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "A",
      },
    },
    {
      id: "t3",
      description: "Electric Bill",
      amount: -85.4,
      date: "Jul 15, 2023",
      category: "Utilities",
      merchant: {
        name: "Power Co",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "P",
      },
    },
    {
      id: "t4",
      description: "Netflix Subscription",
      amount: -14.99,
      date: "Jul 13, 2023",
      category: "Entertainment",
      merchant: {
        name: "Netflix",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "N",
      },
    },
    {
      id: "t5",
      description: "Gas Station",
      amount: -45.25,
      date: "Jul 12, 2023",
      category: "Transportation",
      merchant: {
        name: "Shell",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "S",
      },
    },
    {
      id: "t6",
      description: "Restaurant Dinner",
      amount: -78.5,
      date: "Jul 10, 2023",
      category: "Food",
      merchant: {
        name: "Olive Garden",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "O",
      },
    },
    {
      id: "t7",
      description: "Phone Bill",
      amount: -65.0,
      date: "Jul 8, 2023",
      category: "Utilities",
      merchant: {
        name: "Verizon",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "V",
      },
    },
    {
      id: "t8",
      description: "Gym Membership",
      amount: -49.99,
      date: "Jul 5, 2023",
      category: "Health",
      merchant: {
        name: "Fitness Center",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "F",
      },
    },
    {
      id: "t9",
      description: "Online Shopping",
      amount: -124.35,
      date: "Jul 3, 2023",
      category: "Shopping",
      merchant: {
        name: "Amazon",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "A",
      },
    },
    {
      id: "t10",
      description: "Freelance Payment",
      amount: 850.0,
      date: "Jul 1, 2023",
      category: "Income",
      merchant: {
        name: "Client XYZ",
        logo: "/placeholder.svg?height=32&width=32",
        initial: "C",
      },
    },
  ]
  
  const [transactions, setTransactions] = useState(allTransactions);
  const [budget, setBudget] = useState(0);
  const [isBudgetValid, setIsBudgetValid] = useState(false);
  const [totalbalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [formData, setFormData] = useState({
    description:"",
    amount: 0,
    type: "",
    category: "",
    date: Date.now(),
    merchant: "",
  })

  const values = {
    budget,
    setBudget,
    isBudgetValid,
    setIsBudgetValid,
    totalbalance,
    setTotalBalance,
    totalIncome,
    setTotalIncome,
    totalExpenses,
    setTotalExpenses,
    totalSavings,
    setTotalSavings,
    formData,
    setFormData,
    transactions,
    setTransactions,
    allTransactions,
  };

  return (

    <BudgetContext.Provider value={values}>
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}