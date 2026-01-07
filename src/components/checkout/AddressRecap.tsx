import { useCheckoutStore } from '@/store/checkoutStore';
import { CITIES, DISTRICTS } from '@/lib/addressData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AddressRecap() {
    const { shippingInfo, setStep } = useCheckoutStore();

    if (!shippingInfo) return null;

    const cityLabel =
        CITIES.find((c) => c.value === shippingInfo.city)?.label ||
        shippingInfo.city;
    const districtLabel =
        DISTRICTS[shippingInfo.city]?.find((d) => d.value === shippingInfo.district)
            ?.label || shippingInfo.district;

    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                            Giao hàng đến:
                        </p>
                        <p className="font-semibold">{shippingInfo.name}</p>
                        <p className="text-sm text-gray-700">{shippingInfo.phone}</p>
                        <p className="text-sm text-gray-700 mt-1">
                            {shippingInfo.address}, {districtLabel}, {cityLabel}
                        </p>
                        <p className="text-sm text-gray-700">{shippingInfo.email}</p>
                    </div>
                    <Button
                        variant="link"
                        onClick={() => setStep(1)}
                        className="text-primary"
                    >
                        Thay đổi
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
