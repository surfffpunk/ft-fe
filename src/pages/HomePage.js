import Header from '../components/Header';
import '../assets/HomePage.scss';
import TransactionsTable from '../components/TransactionsTable';
import BalanceAndTransaction from '../components/BalanceAndTransaction';
import ExpenseCharts from '../components/ExpenseCharts';
import SideMenu from '../components/SideMenu';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <Header />

            <div className="main-content">
                <SideMenu />

                <div className="content">
                    <div id="current-balance" className="balance-transaction-wrapper">
                        <BalanceAndTransaction/>
                    </div>
                    <div id="transactions-table" className="table-container">
                        <TransactionsTable />
                    </div>

                    <div id="charts">
                        <ExpenseCharts/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
