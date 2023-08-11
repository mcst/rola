import {useEffect, useState} from "react";

export const useSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === document.documentElement) {
                    const { width, height } = entry.contentRect;
                    setWindowSize({ width, height });
                }
            }
        });

        resizeObserver.observe(document.documentElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return windowSize;
}
