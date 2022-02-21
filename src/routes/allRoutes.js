import React from "react"
import { Redirect } from "react-router-dom"

// CLIENT
import ClientDashboard from "../pages/Client/Dashboard";
import ClientTransactions from '../pages/Client/MyAccount';
import ClientPrivateEquity from '../pages/Client/PrivateEquity';
import ClientProfile from '../pages/Client/Profile';
import ClientNewDeposit from '../pages/Client/MyAccount/RequestDepositPage';
import ClientNewWithdrawal from '../pages/Client/MyAccount/RequestWithdrawalPage';
import RequestDepositPage from '../pages/Client/MyAccount/RequestDepositPage';
import RequestWithdrawalPage from '../pages/Client/MyAccount/RequestWithdrawalPage';
import ClientBankDetails from '../pages/Client/Profile/BankDetailsPage';
import ClientAvailableInvestments from '../pages/Client/MyAccount/AvailableInvestments';
import BondTermsAndConditions from '../pages/Client/TermsAndConditions';
import GdprTermsAndConditions from '../pages/Auth/gdprTermsandConditions';

// ADMIN
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminDeposits from '../pages/Admin/Deposits';
import AdminClients from '../pages/Admin/Clients';
import AdminProducts from '../pages/Admin/Products';
import AdminTrades from '../pages/Admin/Trades';
import AdminNewDeposit from '../pages/Admin/Deposits/NewDeposit';
import AdminNewProduct from '../pages/Admin/Products/NewProduct';
import AdminNewTrade from '../pages/Admin/Trades/NewTrade';
import AdminSendPaymentDetails from '../pages/Admin/SendPaymentDetails';
import AdminNewPaymentDetails from '../pages/Admin/SendPaymentDetails/NewPaymentDetails';
import AdminNewClient from '../pages/Admin/Clients/NewClient';
import AdminNewIPO from '../pages/Admin/IPOs/NewIPOs';
import AdminIpos from '../pages/Admin/IPOs';
import AdminPurchasedIPOs from '../pages/Admin/PurchasedIPOs';
import AdminEditPurchasedIPO from '../pages/Admin/PurchasedIPOs/NewIpoPurchased';
import AdminUserSales from '../pages/Admin/Sales';
import AdminNewUserSales from '../pages/Admin/Sales/NewUserSales';

// AUTH
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Logout from "../pages/Auth/Logout"

let rootPath = "client-dashboard";

const authJson = localStorage.getItem("authUser")
if (authJson) {
  const authUser = JSON.parse(authJson)
  if (authUser && authUser.isAdmin) {
    rootPath = "/admin-dashboard"
  }
}

const adminRoutes = [
  { path: "/admin-dashboard", component: AdminDashboard },
  { path: "/admin-deposits", component: AdminDeposits },
  { path: "/admin-new-deposit/:id", component: AdminNewDeposit },
  { path: "/admin-new-deposit", component: AdminNewDeposit },
  { path: "/admin-clients", component: AdminClients },
  { path: "/admin-new-client", component: AdminNewClient },
  { path: "/admin-new-client/:id", component: AdminNewClient },
  { path: "/admin-new-ipo/:id", component: AdminNewIPO },
  { path: "/admin-new-ipo", component: AdminNewIPO },
  { path: "/admin-ipos", component: AdminIpos },
  { path: "/admin-purchased-ipos", component: AdminPurchasedIPOs },
  { path: "/admin-new-purchased-ipo", component: AdminEditPurchasedIPO },
  { path: "/admin-new-purchased-ipo/:id", component: AdminEditPurchasedIPO },
  { path: "/admin-trades", component: AdminTrades },
  { path: "/admin-sales", component: AdminUserSales },
  { path: "/admin-products", component: AdminProducts },
  { path: "/admin-new-product", component: AdminNewProduct },
  { path: "/admin-new-product/:id", component: AdminNewProduct },
  { path: "/admin-new-trade", component: AdminNewTrade },
  { path: "/admin-new-trade/:id", component: AdminNewTrade },
  { path: "/admin-new-sale", component: AdminNewUserSales },
  { path: "/admin-new-sale/:id", component: AdminNewUserSales },
  { path: "/admin-send-payment-details", component: AdminSendPaymentDetails },
  { path: "/admin-send-payment-details/:id", component: AdminNewPaymentDetails },
  { path: "/admin-new-payment-details", component: AdminNewPaymentDetails },
  { path: "/profile", component: ClientProfile },
]

const userRoutes = [
  { path: "/client-dashboard", component: ClientDashboard },
  { path: "/client-my-account", component: ClientTransactions },
  { path: "/client-private-equity", component: ClientPrivateEquity },
  { path: "/profile", component: ClientProfile },
  { path: "/client-new-deposit", component: ClientNewDeposit },
  { path: "/client-new-withdrawal", component: ClientNewWithdrawal },
  { path: "/client-bank-details", component: ClientBankDetails },
  { path: "/client-available-investments", component: ClientAvailableInvestments },
  { path: "/bond-terms-conditions", component: BondTermsAndConditions },
  { path: "/client-request-deposit", component: RequestDepositPage },
  { path: "/client-request-withdrawal", component: RequestWithdrawalPage },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to={rootPath} /> },
]

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/logout", component: Logout },
  { path: "/gdpr", component: GdprTermsAndConditions },
]

export { userRoutes, authRoutes, adminRoutes }
