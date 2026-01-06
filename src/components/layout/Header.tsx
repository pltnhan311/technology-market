import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { seedProducts } from '@/data/seed-products';
import { searchProducts } from '@/lib/searchUtils';
import { useDebounce } from '@/hooks/useDebounce';
import { useCartStore } from '@/store/cartStore';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { CartSheet } from '@/components/cart/CartSheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { cart, setCartOpen } = useCartStore();
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const debouncedQuery = useDebounce(searchQuery, 300);
    const searchResults =
        debouncedQuery.length >= 2
            ? searchProducts(debouncedQuery, seedProducts)
            : [];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsDropdownOpen(true);
        setSelectedIndex(-1);
    };

    const handleSearchFocus = () => {
        if (searchQuery.length >= 2) {
            setIsDropdownOpen(true);
        }
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isDropdownOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < Math.min(searchResults.length - 1, 4) ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && searchResults[selectedIndex]) {
                    navigate(`/product/${searchResults[selectedIndex].slug}`);
                    setIsDropdownOpen(false);
                    setSearchQuery('');
                } else if (searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                    setIsDropdownOpen(false);
                }
                break;
            case 'Escape':
                setIsDropdownOpen(false);
                inputRef.current?.blur();
                break;
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setIsDropdownOpen(false);
        inputRef.current?.focus();
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    const handleCartClick = () => {
        setCartOpen(true);
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <span className="text-xl font-bold text-white">T</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">TechZone</span>
                    </Link>

                    {/* Search Bar - Center */}
                    <div
                        className="hidden flex-1 max-w-xl mx-8 md:block relative"
                        ref={searchRef}
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={handleSearchFocus}
                                onKeyDown={handleSearchKeyDown}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Search Dropdown */}
                        {isDropdownOpen && (
                            <SearchDropdown
                                results={searchResults}
                                query={debouncedQuery}
                                selectedIndex={selectedIndex}
                                onClose={handleDropdownClose}
                                onSelect={setSelectedIndex}
                            />
                        )}
                    </div>

                    {/* Icons - Right */}
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={handleCartClick}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-white"
                                >
                                    {cartCount > 99 ? '99+' : cartCount}
                                </Badge>
                            )}
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="border-t px-4 py-3 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Mobile Search Dropdown */}
                    {isDropdownOpen && searchQuery.length >= 2 && (
                        <div className="relative mt-2">
                            <SearchDropdown
                                results={searchResults}
                                query={debouncedQuery}
                                selectedIndex={selectedIndex}
                                onClose={handleDropdownClose}
                                onSelect={setSelectedIndex}
                            />
                        </div>
                    )}
                </div>
            </header>

            {/* Cart Sheet */}
            <CartSheet />
        </>
    );
}
