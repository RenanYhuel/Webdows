import { useContext } from 'react';
import { WindowsContext } from '../context/WindowsContext';

export default function useWindowsContext() {
    const windowsContext = useContext(WindowsContext);
    if (!windowsContext) {
        throw new Error('useWindowsContext must be used within a WindowsProvider');
    }
    return windowsContext;
}