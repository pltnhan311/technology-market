import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantityPickerProps {
    stock: number;
    value: number;
    onChange: (value: number) => void;
}

export function QuantityPicker({ stock, value, onChange }: QuantityPickerProps) {
    const [inputValue, setInputValue] = useState(value.toString());

    const handleDecrease = () => {
        if (value > 1) {
            const newValue = value - 1;
            onChange(newValue);
            setInputValue(newValue.toString());
        }
    };

    const handleIncrease = () => {
        if (value < stock) {
            const newValue = value + 1;
            onChange(newValue);
            setInputValue(newValue.toString());
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 1 && num <= stock) {
            onChange(num);
        } else if (!isNaN(num) && num > stock) {
            onChange(stock);
            setInputValue(stock.toString());
        } else if (!isNaN(num) && num < 1) {
            onChange(1);
            setInputValue('1');
        }
    };

    const handleBlur = () => {
        // Reset to current value if input is invalid
        setInputValue(value.toString());
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Số lượng:</span>
            <div className="flex items-center border rounded-md">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={handleDecrease}
                    disabled={value <= 1}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="h-10 w-16 text-center border-x focus:outline-none"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={handleIncrease}
                    disabled={value >= stock}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <span className="text-sm text-gray-500">
                ({stock} sản phẩm có sẵn)
            </span>
        </div>
    );
}
