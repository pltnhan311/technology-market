import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFound() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-24">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Không tìm thấy trang này
                </p>
                <Link to="/">
                    <Button size="lg">
                        <HomeIcon className="mr-2 h-5 w-5" />
                        Về trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
}
