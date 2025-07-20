// PulseCore.js
let currentEffect = null;

export class PulseCore {
    constructor(value, options = {}) {
        this._value = value;
        this._dependents = new Set();
        this._options = options;
        
        // If persistence is enabled, set up storage listener
        if (this._options.key) {
            window.addEventListener('storage', this._handleStorageEvent.bind(this));
        }
    }

    get value() {
        if (currentEffect) {
            this._dependents.add(currentEffect);
        }
        return this._value;
    }

    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            
            // Persist to storage if key is provided
            if (this._options.key) {
                try {
                    const storage = this._options.storage || localStorage;
                    storage.setItem(this._options.key, JSON.stringify(newValue));
                } catch (e) {
                    console.warn(`Failed to persist state for key "${this._options.key}"`, e);
                }
            }
            
            const deps = new Set(this._dependents);
            this._dependents.clear();
            deps.forEach(effect => effect());
        }
    }
    
    _handleStorageEvent(event) {
        if (event.key === this._options.key && event.storageArea === (this._options.storage || localStorage)) {
            try {
                const newValue = JSON.parse(event.newValue);
                if (JSON.stringify(this._value) !== event.newValue) {
                    this._value = newValue;
                    const deps = new Set(this._dependents);
                    this._dependents.clear();
                    deps.forEach(effect => effect());
                }
            } catch (e) {
                console.warn(`Failed to parse stored value for key "${this._options.key}"`, e);
            }
        }
    }
}

export function getCurrentEffect() {
    return currentEffect;
}

export function setCurrentEffect(effect) {
    currentEffect = effect;
}