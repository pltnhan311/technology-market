import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
    const [view, setView] = useState<'login' | 'register'>(initialView);

    const handleSuccess = () => {
        onClose();
        // Optionally reload the page to update UI
        window.location.reload();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {view === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    {view === 'login' ? (
                        <LoginForm
                            onSuccess={handleSuccess}
                            onSwitchToRegister={() => setView('register')}
                        />
                    ) : (
                        <RegisterForm
                            onSuccess={handleSuccess}
                            onSwitchToLogin={() => setView('login')}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
