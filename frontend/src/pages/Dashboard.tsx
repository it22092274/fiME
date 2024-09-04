import Navbar from "../components/Global/Navbar.tsx";
import BudgetCard from "../components/Dashboard/UI/BudgetCard.tsx";

const Dashboard = () => {
    return(
        <div>
            <Navbar currentPage={'D'} />
            <main>
                <div>
                    <BudgetCard />
                </div>
            </main>
        </div>
    )
}

export default Dashboard