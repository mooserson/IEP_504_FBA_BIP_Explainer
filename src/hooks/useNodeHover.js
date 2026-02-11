import { useState, useRef, useEffect } from 'react';

/**
 * Shared hover state + wheel capture logic for flow nodes.
 * Returns { isHovered, detailRef, handleMouseEnter, handleMouseLeave }.
 */
export default function useNodeHover() {
    const [isHovered, setIsHovered] = useState(false);
    const detailRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    // Debounced hover handlers to prevent flicker
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 100);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    // Use capture phase to intercept wheel events before React Flow
    useEffect(() => {
        const detailEl = detailRef.current;
        if (!detailEl) return;

        const handleWheel = (e) => {
            const isExpanded = detailEl.scrollHeight > 0 && detailEl.clientHeight > 0;
            const hasScrollableContent = detailEl.scrollHeight > detailEl.clientHeight;

            if (isExpanded || hasScrollableContent) {
                e.stopPropagation();
                e.preventDefault();
                detailEl.scrollTop += e.deltaY;
            }
        };

        detailEl.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        return () => detailEl.removeEventListener('wheel', handleWheel, { capture: true });
    }, [isHovered]);

    return { isHovered, detailRef, handleMouseEnter, handleMouseLeave };
}
