# Comprehensive @semantq/state Documentation

`@semantq/state` is a Semantq JS Framework state library. The library is however framework-agnostic state management library that packs a punch in under 5KB:  

### Highlights
✔ **Reactivity Made Simple** – Automatic DOM updates with zero boilerplate  
✔ **Built-in Persistence** – Seamless localStorage/sessionStorage integration  
✔ **Tiny Footprint** – 3KB gzipped with zero dependencies  
✔ **Universal Binding** – Works with vanilla JS, Svelte, Vue, React, or any JS framework  


### How It Works in 30 Seconds  

```bash
npm install @semantq/state
```

### Use:

```javascript
import { $state, state } from '@semantq/state';

// 1. Create reactive state (auto-persists to localStorage)
const cart = $state([], { key: 'user-cart' });

// 2. Bind to DOM elements
state.bind('#checkout-form', cart);

// 3. Automatic UI updates everywhere
function addItem(item) {
  cart.value = [...cart.value, item]; // Triggers DOM updates
}
```

**Perfect for:**  
- Small to medium apps needing reactivity  
- JAMstack applications  
- Progressive enhancement  
- Framework-agnostic libraries  

## Core Features

### 1. State Management
```javascript
import { $state, $derived, $effect } from '@semantq/state';

// Reactive state
const count = $state(0);

// Computed state
const doubled = $derived(() => count.value * 2);

// Side effects
$effect(() => {
  console.log(`Count is: ${count.value}`);
});
```

### 2. Storage Persistence
```javascript
// localStorage persistence
const userPrefs = $state(
  { theme: 'dark' },
  { key: 'user-preferences' }
);

// sessionStorage persistence
const authToken = $state(
  null,
  { key: 'auth-token', storage: sessionStorage }
);
```

### 3. DOM Binding

#### Form Element Binding

```javascript
import { state } from '@semantq/state';

// Reactive form state
const formData = $state({
  username: '',
  password: '',
  remember: false,
  plan: 'basic',
  features: ['support']
});

// Bind form elements
state.bind('#username', formData.username);
state.bind('#password', formData.password);
state.bind('#remember', formData.remember);
state.bind('#plan', formData.plan);
state.bind('[name="features"]', formData.features, { multiple: true });
```

#### Binding Types Explained

**Text Inputs:**
```javascript
const searchQuery = $state('');
state.bind('#search', searchQuery);
```

**Checkboxes:**
```javascript
const agreeToTerms = $state(false);
state.bind('#terms-checkbox', agreeToTerms);
```

**Radio Groups:**
```javascript
const paymentMethod = $state('credit');
state.bind('[name="payment"]', paymentMethod);
```

**Select Elements:**
```javascript
const country = $state('US');
// Single select
state.bind('#country-select', country);

// Multi-select
const selectedFeatures = $state([]);
state.bind('#features-select', selectedFeatures, { multiple: true });
```

**Custom Formatters/Parsers:**
```javascript
const price = $state(0);

state.bind('#price-input', price, {
  format: (value) => `$${value.toFixed(2)}`,
  parse: (str) => parseFloat(str.replace(/[^0-9.]/g, ''))
});
```

#### Non-Form Element Binding

**Text Content:**
```javascript
const message = $state('Hello');
state.text('#message-element', message);
```

**Attributes:**
```javascript
const isActive = $state(true);
state.attr('#tab', 'aria-selected', isActive);
```

**Classes:**
```javascript
const isDarkMode = $state(false);
state.class('#theme-toggle', 'dark-mode', isDarkMode);
```

### 4. Advanced Binding Patterns

**Dynamic Element Binding:**
```javascript
const items = $state([{ id: 1, text: 'First' }]);

$effect(() => {
  items.value.forEach(item => {
    state.text(`#item-${item.id}`, item.text);
  });
});
```

**Form Validation:**
```javascript
const form = $state({ email: '', password: '' });
const errors = $derived(() => ({
  email: !form.value.email.includes('@'),
  password: form.value.password.length < 8
}));

$effect(() => {
  state.class('#email-input', 'error', errors.value.email);
  state.class('#password-input', 'error', errors.value.password);
});
```

**Debounced Input:**
```javascript
const searchQuery = $state('', { debounce: 300 });

state.bind('#search-input', searchQuery);

$effect(() => {
  // Will only trigger after 300ms of inactivity
  fetchResults(searchQuery.value);
});
```

### 5. Storage Use Cases (Expanded)

**Authentication Flow:**
```javascript
// auth.js
export const auth = $state(
  { user: null, token: null },
  { key: 'auth', storage: sessionStorage }
);

export function login(credentials) {
  // API call would go here
  auth.value = {
    user: { id: 1, name: 'User' },
    token: 'abc123'
  };
}

export function logout() {
  auth.value = { user: null, token: null };
}

// Auto-logout when token expires
$effect(() => {
  if (auth.value.token) {
    const timer = setTimeout(logout, 3600000);
    return () => clearTimeout(timer);
  }
});
```

**E-commerce Cart:**
```javascript
// cart.js
export const cart = $state(
  { items: [], lastUpdated: null },
  { key: 'cart', debounce: 500 }
);

export function addToCart(product, quantity = 1) {
  cart.value = {
    items: [
      ...cart.value.items.filter(item => item.id !== product.id),
      { ...product, quantity }
    ],
    lastUpdated: new Date().toISOString()
  };
}

// Persist cart for 7 days
$effect(() => {
  if (cart.value.lastUpdated) {
    const weekOld = new Date();
    weekOld.setDate(weekOld.getDate() - 7);
    
    if (new Date(cart.value.lastUpdated) < weekOld) {
      cart.value = { items: [], lastUpdated: null };
    }
  }
});
```

### 6. Framework Integration

**React Example:**
```javascript
import { $state, $effect } from '@semantq/state';
import { useEffect } from 'react';

function Counter() {
  const count = $state(0);
  
  // Sync state with React
  const [reactCount, setReactCount] = useState(count.value);
  $effect(() => setReactCount(count.value));
  
  return (
    <div>
      <button onClick={() => count.value--}>-</button>
      <span>{reactCount}</span>
      <button onClick={() => count.value++}>+</button>
    </div>
  );
}
```

**Vue Example:**
```javascript
import { $state } from '@semantq/state';

export default {
  setup() {
    const count = $state(0);
    return { count };
  },
  template: `
    <div>
      <button @click="count.value--">-</button>
      {{ count.value }}
      <button @click="count.value++">+</button>
    </div>
  `
};
```

### 7. Performance Optimization

**Batch Updates:**
```javascript
const user = $state({ name: '', email: '' });

// Instead of:
user.value.name = 'John';
user.value.email = 'john@example.com';

// Do:
user.value = { ...user.value, name: 'John', email: 'john@example.com' };
```

**Selective Binding:**
```javascript
const largeData = $state(/* ... */);

// Bind only needed properties
state.bind('#name-display', $derived(() => largeData.value.user.name));
```

### 8. Security Best Practices

**Sensitive Data Handling:**
```javascript
// auth.js
export const auth = $state(
  {
    // Only store minimal necessary auth data
    userId: '123',
    token: null,  // JWT token (short-lived)
    refreshToken: null // Only in memory
  },
  {
    key: 'auth',
    storage: sessionStorage,
    // Optional encryption for extra security
    transform: {
      serialize: (value) => encrypt(JSON.stringify(value)),
      deserialize: (str) => JSON.parse(decrypt(str))
    }
  }
);
```

### 9. Migration Strategies

**Versioned State:**
```javascript
const APP_VERSION = '1.0';

export const settings = $state(
  { version: APP_VERSION, theme: 'light' },
  { 
    key: 'settings',
    migrate: (oldValue) => {
      if (!oldValue.version || oldValue.version !== APP_VERSION) {
        // Return default/migrated state
        return { version: APP_VERSION, theme: 'light' };
      }
      return oldValue;
    }
  }
);
```

### 10. Testing Patterns

**Mocking Storage:**
```javascript
// test-utils.js
export function createMockStorage() {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
}

// In your tests:
const mockStorage = createMockStorage();
const testState = $state(0, { key: 'test', storage: mockStorage });
```

## Complete API Reference

### Core API

| Function       | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `$state(value, options?)` | Creates a reactive state container                                         |
| `$derived(fn)` | Creates a computed value derived from other states                         |
| `$effect(fn)`  | Runs side effects when dependencies change                                  |

### Binding API

| Method                          | Description                                                                 |
|---------------------------------|-----------------------------------------------------------------------------|
| `state.bind(selector, state, options?)` | Two-way binding for form elements                                         |
| `state.text(selector, state)`   | One-way binding for text content                                          |
| `state.attr(selector, attr, state)` | One-way binding for attributes                                           |
| `state.class(selector, className, state)` | Toggles classes based on boolean state                                  |

### Storage API

| Method                    | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `storage.get(key)`        | Retrieves a value from storage                                              |
| `storage.set(key, value)` | Stores a value in storage                                                   |
| `storage.remove(key)`     | Removes a value from storage                                                |

## Troubleshooting Guide

**Binding Not Working:**
1. Verify element exists when binding is called
2. Check for console errors
3. Ensure state is reactive (`$state` or `$derived`)

**Storage Issues:**
1. Check browser storage limits
2. Verify storage is not disabled (private mode)
3. Ensure data is JSON-serializable

**Performance Problems:**
1. Add debounce to frequent updates
2. Batch multiple state updates
3. Use derived state for computations

## Migration from Other Libraries

**Redux/Pinia:**
- Replace slices with individual states
- Use derived state instead of selectors
- Effects replace middleware

**MobX:**
- `$state` replaces `observable`
- `$derived` replaces `computed`
- `$effect` replaces `autorun`

## Final Recommendations

1. **Start Simple**: Begin with basic state, add persistence as needed
2. **Organize by Feature**: Group related states together
3. **Monitor Storage**: Regularly check what you're persisting
4. **Test Thoroughly**: Especially edge cases around persistence

This comprehensive approach to state management with @semantq/state provides a flexible, powerful solution that works across any JavaScript framework while maintaining excellent performance and security characteristics.