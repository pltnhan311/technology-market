import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Show max 5 pages at a time
    const visiblePages = pages.filter((page) => {
        if (totalPages <= 5) return true;
        if (page === 1 || page === totalPages) return true;
        if (Math.abs(page - currentPage) <= 1) return true;
        return false;
    });

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {visiblePages.map((page, index) => {
                // Add ellipsis if there's a gap
                const prevPage = visiblePages[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                    <div key={page} className="flex items-center gap-2">
                        {showEllipsis && <span className="text-gray-400">...</span>}
                        <Button
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    </div>
                );
            })}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
