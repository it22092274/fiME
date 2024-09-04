import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/BudgetCard.module.css"; // Import the CSS module

// Assuming you have an API route for fetching the budget
const budgetApiUrl = "/api/budget"; // Modify with the actual route

const BudgetCard = () => {
    const [budget, setBudget] = useState<{ remainingAmount: number; endDate: string } | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        fetchBudget();
    }, []);

    // Fetch budget data from API
    const fetchBudget = async () => {
        try {
            const response = await axios.get(budgetApiUrl);
            setBudget(response.data);

            if (response.data.endDate) {
                startCountdown(new Date(response.data.endDate));
            }
        } catch (error) {
            console.error("Error fetching budget data:", error);
        }
    };

    // Start countdown based on the budget's end date
    const startCountdown = (endDate: Date) => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDifference = endDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                clearInterval(interval);
                setTimeLeft("Expired");
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
    };

    return (
        <div className={styles.card}>
            {budget ? (
                <>
                    <p className={styles.remainingAmount}>Remaining Amount: ${budget.remainingAmount}</p>
                    <p>Budget renews in:</p>
                    <p className={styles.countdown}>{timeLeft}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BudgetCard;
