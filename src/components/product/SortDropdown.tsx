import { SORT_OPTIONS } from '@/lib/constants';
import { useFilterStore } from '@/store/store';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function SortDropdown() {
    const { sortBy, setSortBy } = useFilterStore();

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Sắp xếp:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
