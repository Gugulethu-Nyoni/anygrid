import { PulseCore } from './PulseCore.js';

export function pulse(initialValue, options = {}) {
    const { key, storage = localStorage } = options;

    // Load from storage if key is provided
    if (key) {
        try {
            const stored = storage.getItem(key);
            if (stored !== null) {
                initialValue = JSON.parse(stored);
            }
        } catch (e) {
            console.warn(`Failed to parse stored value for key "${key}"`, e);
        }
    }

    // Pass options to PulseCore to enable persistence!
    const signal = new PulseCore(initialValue, { key, storage });

    return new Proxy(signal, {
        get(target, prop) {
            if (prop === 'value') return target.value;
            if (prop === 'set') return (newValue) => { target.value = newValue; };
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            if (prop === 'value') {
                target.value = value;
                return true;
            }
            return Reflect.set(target, prop, value);
        }
    });
}

export const $state = pulse;
