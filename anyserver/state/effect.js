//effect.js
import { getCurrentEffect, setCurrentEffect } from './PulseCore.js';

export function $effect(callback) {
    const effect = () => {
        setCurrentEffect(effect);
        callback();
        setCurrentEffect(null);
    };
    
    effect();
    
    return () => {
        // Cleanup logic would go here
    };
}