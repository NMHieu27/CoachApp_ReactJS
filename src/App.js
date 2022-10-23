import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, authRoutes, garageRoutes } from '~/routes';
import { Page404 } from './pages/Page404';
import DefaultLayout, { AdminLayout } from '~/layouts';
import { ToastContainer } from 'react-toastify';
import ScrollButton from '~/components/ScrollButton/ScrollButton';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth/RequireAuth';
import GarageLayout from './layouts/GarageLayout/GarageLayout';
import config from './config';
import PageUnauthorized from './pages/PageUnauthorized/PageUnauthorized';
import 'moment-timezone';
import moment from 'moment';
import 'moment/locale/vi';
import EditTicket from './pages/Admin/TicketManagement/EditTicket';
moment().local('vi');

function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<DefaultLayout />}>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <>
                                                <Page /> <ScrollButton />
                                            </>
                                        }
                                    />
                                );
                            })}
                        </Route>
                        <Route path="/auth">
                            {authRoutes.map((route, index) => {
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <>
                                                <Page /> <ScrollButton />
                                            </>
                                        }
                                    />
                                );
                            })}
                        </Route>
                        {/* Admin */}
                        <Route element={<AdminLayout />}>
                            <Route element={<RequireAuth allowedRoles="admin" />}>
                                {privateRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <>
                                                    <Page /> <ScrollButton />
                                                </>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                        </Route>

                        <Route element={<AdminLayout />}>
                            <Route element={<RequireAuth allowedRoles="admin" />}>
                                <Route
                                    path="/admin/ve-xe/chinh-sua"
                                    element={
                                        <>
                                            <EditTicket />
                                            <ScrollButton />
                                        </>
                                    }
                                >
                                    <Route
                                        path=":ticketId"
                                        element={
                                            <>
                                                <EditTicket />
                                                <ScrollButton />
                                            </>
                                        }
                                    >
                                        <Route
                                            path=":coachesId"
                                            element={
                                                <>
                                                    <EditTicket />
                                                    <ScrollButton />
                                                </>
                                            }
                                        ></Route>
                                    </Route>
                                </Route>
                            </Route>
                        </Route>

                        {/* Garage */}
                        <Route element={<GarageLayout />}>
                            <Route element={<RequireAuth allowedRoles="coachGarage" />}>
                                {garageRoutes.map((route, index) => {
                                    const Page = route.component;
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <>
                                                    <Page /> <ScrollButton />
                                                </>
                                            }
                                        />
                                    );
                                })}
                            </Route>
                        </Route>
                        <Route path={config.routes.unauthorized} element={<PageUnauthorized />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
