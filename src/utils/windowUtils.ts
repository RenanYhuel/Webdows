import { useState, useEffect } from "react";

export const useDrag = (initialPosition: { x: number, y: number }) => {
    const [position, setPosition] = useState(initialPosition);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        };

        const handleMouseUp = () => setDragging(false);

        if (dragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, offset]);

    return { position, handleMouseDown };
};

export const useResize = (initialSize: { width: number, height: number }, position: { x: number, y: number }, setPosition: (position: { x: number, y: number }) => void) => {
    const [size, setSize] = useState(initialSize);
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);

    const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
        setResizing(true);
        setResizeDirection(direction);
        e.stopPropagation();

        if (direction === 'right' || direction === 'left') {
            document.body.classList.add('resizing');
        } else if (direction === 'top' || direction === 'bottom') {
            document.body.classList.add('resizing-vertical');
        } else {
            document.body.classList.add('resizing-corner');
        }
    };

    useEffect(() => {
        const handleMouseMoveResize = (e: MouseEvent) => {
            if (!resizing) return;
            if (resizeDirection === 'right') {
                setSize({ width: e.clientX - position.x, height: size.height });
            } else if (resizeDirection === 'left') {
                const newWidth = size.width + (position.x - e.clientX);
                setPosition({ x: e.clientX, y: position.y });
                setSize({ width: newWidth, height: size.height });
            } else if (resizeDirection === 'top') {
                const newHeight = size.height + (position.y - e.clientY);
                setPosition({ x: position.x, y: e.clientY });
                setSize({ width: size.width, height: newHeight });
            } else if (resizeDirection === 'bottom') {
                setSize({ width: size.width, height: e.clientY - position.y });
            }
        };

        const handleMouseUpResize = () => {
            setResizing(false);
            setResizeDirection(null);
            document.body.classList.remove('resizing', 'resizing-vertical', 'resizing-corner');
        };

        if (resizing) {
            document.addEventListener("mousemove", handleMouseMoveResize);
            document.addEventListener("mouseup", handleMouseUpResize);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMoveResize);
            document.removeEventListener("mouseup", handleMouseUpResize);
        };
    }, [resizing, resizeDirection, position, size]);

    return { size, handleMouseDownResize };
};