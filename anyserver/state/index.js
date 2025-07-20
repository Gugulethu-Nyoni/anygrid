// index.js
import { pulse } from './pulse.js';
import { reState } from './reState.js';
import { $effect } from './effect.js';
import { bind, bindText, bindAttr, bindClass } from './bind.js';

// Export the reactivity system
// Core primitives (direct named exports)
export { pulse as $state } from './pulse.js';
export { reState as $derived } from './reState.js';
export { $effect } from './effect.js';

// Binding utilities (grouped under `state`)
export const state = {
  bind,
  text: bindText,
  attr: bindAttr,
  class: bindClass,
};

// Optional: Re-export bind utilities directly for power users
export { bind, bindText, bindAttr, bindClass };

// Export storage utilities
export const storage = {
  get: (key) => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn(`Failed to parse stored value for key "${key}"`, e);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to persist value for key "${key}"`, e);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
};