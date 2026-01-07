import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Home } from '@/pages/Home';
import { CategoryPage } from '@/pages/CategoryPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { SearchResultsPage } from '@/pages/SearchResultsPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { OrderTrackingPage } from '@/pages/OrderTrackingPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AddressesPage } from '@/pages/AddressesPage';
import { NotFound } from '@/pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/order-tracking" element={<OrderTrackingPage />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile/addresses"
                        element={
                            <ProtectedRoute>
                                <AddressesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
