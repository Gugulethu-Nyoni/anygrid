import { $effect } from './effect.js';


function bindNonReactive(element, value, options = {}) {
  const formattedValue = options.format ? options.format(value) : value;

  if ('value' in element || element.tagName === 'SELECT') {
    // Handle form elements
    if (element.type === 'checkbox') {
      element.checked = !!formattedValue;
    } else if (element.tagName === 'SELECT' && options.multiple && Array.isArray(formattedValue)) {
      Array.from(element.options).forEach(option => {
        option.selected = formattedValue.includes(option.value);
      });
    } else {
      element.value = formattedValue ?? '';
    }
  } else {
    // Handle non-form elements (e.g., <p>, <span>)
    element.textContent = formattedValue ?? '';
  }
}


export function bind(inputSelectorOrElement, stateOrValue, options = {}) {
  const elements = getElements(inputSelectorOrElement);
  
  if (!elements || elements.length === 0) {
    console.warn(`Element(s) not found for binding: ${inputSelectorOrElement}`);
    return;
  }

  const first = elements[0];
  const isReactive = typeof stateOrValue === 'object' && stateOrValue !== null && 'value' in stateOrValue;

  // Handle radio buttons
  if (first.type === 'radio') {
    return bindRadioGroup(elements, stateOrValue, options, isReactive);
  }

  // Handle non-reactive case
  if (!isReactive) {
    console.log("non reactive context", first, stateOrValue, options)
    bindNonReactive(first, stateOrValue, options);
    return () => {}; // Return a no-op cleanup function
  }

  // Handle reactive case
  return bindStandardElement(first, stateOrValue, options, isReactive);
}



function bindStandardElement(element, stateOrValue, options, isReactive) {
    const updateElement = () => {
        let value = isReactive ? stateOrValue.value : stateOrValue;

        // Format the value if a formatter is provided
        if (options.format) {
            value = options.format(value);
        }

        if (element.type === 'checkbox') {
            element.checked = !!value;
        } else if (element.tagName === 'SELECT') {
            if (options.multiple && Array.isArray(value)) {
                Array.from(element.options).forEach(option => {
                    option.selected = value.includes(option.value);
                });
            } else {
                element.value = value ?? '';
            }
        } else {
            element.value = value ?? '';
        }
    };

    // Only set up two-way binding if it's reactive
    const updateState = isReactive ? () => {
        let newValue;

        if (element.type === 'checkbox') {
            newValue = element.checked;
        } else if (element.tagName === 'SELECT' && options.multiple || element.multiple) {
            newValue = Array.from(element.selectedOptions).map(o => o.value);
        } else {
            newValue = element.value;
        }

        if (options.parse) {
            newValue = options.parse(newValue);
        }

        stateOrValue.value = newValue;
    } : null;

    const eventType = getEventType(element);
    if (updateState) {
        element.addEventListener(eventType, updateState);
    }

    updateElement();
    
    // Only set up effect if it's reactive
    const cleanup = isReactive ? $effect(updateElement) : null;

    // Return a cleanup function for both reactive and non-reactive states
    return () => {
        if (updateState) {
            element.removeEventListener(eventType, updateState);
        }
        if (cleanup) {
            cleanup();
        }
    };
}





function bindRadioGroup(radios, stateOrValue, options, isReactive) {
    const updateRadios = () => {
        const value = isReactive ? stateOrValue.value : stateOrValue;
        radios.forEach(r => {
            r.checked = r.value === value;
        });
    };

    // Only set up two-way binding if it's reactive
    const updateState = isReactive ? (event) => {
        const selected = event.target;
        if (selected.checked) {
            const newValue = options.parse ? options.parse(selected.value) : selected.value;
            stateOrValue.value = newValue;
        }
    } : null;

    if (updateState) {
        radios.forEach(r => r.addEventListener('change', updateState));
    }

    updateRadios();
    
    // Only set up effect if it's reactive
    const cleanup = isReactive ? $effect(updateRadios) : null;

    return () => {
        if (updateState) {
            radios.forEach(r => r.removeEventListener('change', updateState));
        }
        if (cleanup) {
            cleanup();
        }
    };
}




function getElements(selectorOrElement) {
    if (typeof selectorOrElement === 'string') {
        const found = document.querySelectorAll(selectorOrElement);
        return found.length ? Array.from(found) : null;
    }
    return [selectorOrElement];
}

function getEventType(element) {
    if (element.type === 'checkbox' || element.tagName === 'SELECT') {
        return 'change';
    }
    if (element.tagName === 'INPUT' && (element.type === 'range' || element.type === 'file')) {
        return 'change';
    }
    return 'input';
}

// Bind textContent to state
export function bindText(selectorOrElement, stateOrValue, options = {}) {
    const element = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;

    if (!element) {
        console.warn(`Element not found for text binding: ${selectorOrElement}`);
        return;
    }

    const isReactive = typeof stateOrValue === 'object' && stateOrValue !== null && 'value' in stateOrValue;

    const updateElement = () => {
        const value = isReactive ? stateOrValue.value : stateOrValue;
        element.textContent = options.format ? options.format(value) : value;
    };

    updateElement();

    if (isReactive) {
        const cleanupEffect = $effect(updateElement);
        return () => cleanupEffect();
    } else {

// Handle non-reactive case
 
    //console.log("non reactive context text", element, stateOrValue, options);
    //bindNonReactive(element, stateOrValue, options);

    return () => {}; // Return a no-op cleanup function
  

    }

   
}

// Bind attribute
export function bindAttr(selectorOrElement, attr, state, options = {}) {
    const el = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;

    if (!el) {
        console.warn(`Element not found for attribute binding: ${selectorOrElement}`);
        return;
    }

    // Check if the state is reactive (object with .value)
    const isReactive = typeof state === 'object' && state !== null && 'value' in state;

    const update = () => {
        // Get value depending on whether it's reactive or not
        const value = isReactive ? state.value : state;
        el.setAttribute(attr, options.format ? options.format(value) : value);
    };

    update();

    if (isReactive) {
        const cleanup = $effect(update);
        return () => cleanup(); // Cleanup if reactive
    } else {
        return () => {}; // No-op for non-reactive
    }
}



// Bind class based on truthy state
export function bindClass(selectorOrElement, className, state, options = {}) {
    const el = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;

    if (!el) {
        console.warn(`Element not found for class binding: ${selectorOrElement}`);
        return;
    }

    // Check if the state is reactive (object with .value)
    const isReactive = typeof state === 'object' && state !== null && 'value' in state;

    const update = () => {
        // Get value depending on whether it's reactive or not
        const value = isReactive ? state.value : state;
        el.classList.toggle(className, !!value);
    };

    update();

    if (isReactive) {
        const cleanup = $effect(update);
        return () => cleanup(); // Cleanup if reactive
    } else {
        return () => {}; // No-op for non-reactive
    }
}

