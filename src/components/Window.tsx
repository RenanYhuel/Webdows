import { useState, useEffect, createElement } from "react";
import useWindowsContext from "../hooks/useWindowsContext";

interface WindowProps {
    id: number;
    title: string;
    onFocus: () => void;
    style: React.CSSProperties;
}

export default function Window({ id, title, onFocus, style }: WindowProps) {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    const [size, setSize] = useState({ width: 800, height: 600 });

    const { apps, openWindows, minimizeWindow, closeWindow, maximizedWindows, toggleMaximizeWindow } = useWindowsContext();
    const appInOpenWindows = openWindows.find((w) => w.id === id);
    const appInfos = apps.find((app) => app.id === appInOpenWindows?.appId);

    const isMaximized = maximizedWindows.includes(id);
    const appComponent = appInfos?.component;

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

    return (
        <div
            className={`window ${appInOpenWindows?.isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
            style={{ ...style, left: position.x, top: position.y, width: size.width, height: size.height }}
            onMouseDown={onFocus}
        >
            <div className="window-header" onMouseDown={handleMouseDown}>
                <div className="window-infos">
                    <img src={appInfos?.icon} alt="" />
                    <span className="window-title">{title}</span>
                </div>
                <div className="window-buttons">
                    <button className="window-btn minimize" onClick={() => minimizeWindow(id)}>−</button>
                    <button className="window-btn maximize" onClick={() => toggleMaximizeWindow(id)}>
                        {isMaximized ? '⧉' : '☐'}
                    </button>
                    <button className="window-btn close" onClick={() => closeWindow(id)}>✕</button>
                </div>
            </div>
            <div className="window-content">
                {appComponent && createElement(appComponent)}
            </div>
            <div className="resize-handle" onMouseDown={(e) => handleMouseDownResize(e, 'corner')}></div>
            <div className="resize-handle-right" onMouseDown={(e) => handleMouseDownResize(e, 'right')}></div>
            <div className="resize-handle-left" onMouseDown={(e) => handleMouseDownResize(e, 'left')}></div>
            <div className="resize-handle-top" onMouseDown={(e) => handleMouseDownResize(e, 'top')}></div>
            <div className="resize-handle-bottom" onMouseDown={(e) => handleMouseDownResize(e, 'bottom')}></div>
        </div>
    );
}