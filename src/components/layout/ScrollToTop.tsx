import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls to top of page when route changes
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top instantly when pathname changes
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' as ScrollBehavior,
        });
    }, [pathname]);

    return null;
}
