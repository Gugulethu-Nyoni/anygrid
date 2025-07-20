// reState.js
import { PulseCore, getCurrentEffect, setCurrentEffect } from './PulseCore.js';

export function reState(computation) {
    const effect = () => {
        setCurrentEffect(effect);
        const newValue = computation();
        setCurrentEffect(null);
        
        if (result._value !== newValue) {
            result._value = newValue;
            const deps = new Set(result._dependents);
            result._dependents.clear();
            deps.forEach(dep => dep());
        }
    };
    
    const result = new PulseCore(undefined); // Changed from Signal to PulseCore
    effect();
    
    return new Proxy(result, {
        get(target, prop) {
            if (prop === 'value') return target.value;
            return Reflect.get(target, prop);
        }
    });
}

export const $derived = reState;