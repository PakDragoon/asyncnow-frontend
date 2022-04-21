import { Routes, Route, Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { userDataRecoil } from "./components/data/atom"

import HomePage from "./components/homePage/home.component"
import Login from "./components/loginPage/login.component"
import Thanks from "./components/thanksPage/thanks.component"
import Error from "./components/404ErrorComponent/error.component"
import Dashboard from "./components/dashboardPage/dashboard.component"
import DashboardMain from "./components/dashboardPage/dashboardMain/dashboardMain.component"
import DashboardVideos from "./components/dashboardPage/dashboardVideos/dashboardVideos.component"
import DashboardInsights from "./components/dashboardPage/dashboardInsights/dashboardInsights.component"
import DashboardSettings from "./components/dashboardPage/dashboardSettings/dashboardSettings.component"
import AwesomeVideo from "./components/awesomeVideosPage/awesomeVideos.component"
import Register from "./components/registerPage/register.component"
import CheckoutComponent from "./components/checkoutPage/checkout.component"
import PaypalCheckoutComponent from "./components/paypalCheckoutPage/paypalCheckout.component"
import OrderConfirmationComponent from "./components/orderConfirmationPage/orderConfirnation.component"
import DashboardApp from "./pages/DashboardApp"
import User from "./pages/User"

import ThemeConfig from "./theme"
import GlobalStyles from "./theme/globalStyles"
import ScrollToTop from "./components/ScrollToTop"
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart"
import DashboardLayout from "./layouts/dashboard"

import ProtectedRoutes from "./components/ProtectedRoutes"
import PublicRoutes from "./components/PublicRoutes"

function DashboardL() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <DashboardLayout />
    </ThemeConfig>
  )
}

// const { userRole } = useRecoilValue(userDataRecoil)
const isRole = sessionStorage.getItem("isRole")

const MainRoutes = () => (
  <Routes>
    {/** Admin Routes */}
    <Route path="/dashboardadmin" element={<ProtectedRoutes />}>
      <Route path="/dashboardadmin" element={<DashboardL />}>
        <Route path="app" element={<DashboardApp />} />
        <Route path="user" element={<User />} />
      </Route>
    </Route>

    {/** User Routes */}
    <Route path="/dashboarduser" element={<PublicRoutes />}>
      <Route path="/dashboarduser" element={<Dashboard title="Dashboard" />}>
        <Route path="main" element={<DashboardMain />} />
        <Route path="videos" element={<DashboardVideos />} />
        <Route path="insights" element={<DashboardInsights />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Route>

    {/** Public Routes */}
    <Route path="/" element={<HomePage title="Home" />} />
    <Route path="login" element={<Login title="Login" />} />
    <Route path="register" element={<Register title="Register" />} />
    <Route path="checkout" element={<CheckoutComponent title="Checkout" />} />
    <Route path="paypal" element={<PaypalCheckoutComponent title="Paypal Checkout" />} />
    <Route path="order" element={<OrderConfirmationComponent title="Order Confirmation" />} />
    <Route path="thanks" element={<Thanks title="Thanks" />} />
    <Route path="awesome" element={<AwesomeVideo title="Awesome" />} />
    <Route path="*" element={<Error title="404" />} />
  </Routes>
)

export default MainRoutes
