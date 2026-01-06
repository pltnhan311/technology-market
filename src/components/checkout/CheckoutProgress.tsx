import { Check } from 'lucide-react';

interface CheckoutProgressProps {
    currentStep: 1 | 2 | 3;
}

const steps = [
    { number: 1, label: 'Thông tin giao hàng' },
    { number: 2, label: 'Thanh toán' },
    { number: 3, label: 'Xác nhận' },
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                        {/* Step Circle */}
                        <div className="flex flex-col items-center relative">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step.number < currentStep
                                        ? 'bg-green-500 text-white'
                                        : step.number === currentStep
                                            ? 'bg-primary text-white ring-4 ring-primary/20'
                                            : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {step.number < currentStep ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    step.number
                                )}
                            </div>
                            <span
                                className={`mt-2 text-xs md:text-sm font-medium text-center ${step.number <= currentStep
                                        ? 'text-gray-900'
                                        : 'text-gray-500'
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-2 transition-all ${step.number < currentStep
                                        ? 'bg-green-500'
                                        : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
