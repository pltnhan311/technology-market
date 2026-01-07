import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Breadcrumb } from '@/components/product/Breadcrumb';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentMethodForm } from '@/components/checkout/PaymentMethodForm';
import { ReviewOrderForm } from '@/components/checkout/ReviewOrderForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';

export function CheckoutPage() {
    const navigate = useNavigate();
    const { cart } = useCartStore();
    const { step, shippingInfo, paymentMethod } = useCheckoutStore();

    // Redirect to home if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    // Redirect to appropriate step based on state
    useEffect(() => {
        if (step === 2 && !shippingInfo) {
            // If on step 2 but no shipping info, go back to step 1
            navigate('/checkout');
        } else if (step === 3 && (!shippingInfo || !paymentMethod)) {
            // If on step 3 but no shipping info or payment method, go back to step 1
            navigate('/checkout');
        }
    }, [step, shippingInfo, paymentMethod, navigate]);

    if (cart.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Giỏ hàng', href: '/' },
                        { label: 'Thanh toán', href: '/checkout' },
                    ]}
                />

                {/* Progress Indicator */}
                <CheckoutProgress currentStep={step} />

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 md:p-8 rounded-lg border">
                            {step === 1 && <ShippingForm />}
                            {step === 2 && <PaymentMethodForm />}
                            {step === 3 && <ReviewOrderForm />}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="hidden lg:block">
                            <OrderSummary
                                showShipping={step >= 2}
                                showEstimatedDelivery={step === 3}
                            />
                        </div>
                        {/* Mobile version */}
                        <div className="lg:hidden">
                            <OrderSummary
                                showShipping={step >= 2}
                                showEstimatedDelivery={step === 3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
