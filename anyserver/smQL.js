// smQL.js - Final version
export class smQL {
  constructor(baseURL, defaultHeaders = {}, options = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
    this.token = null;
    this.options = {
      log: options.log ?? true, // Default to true, can be overridden
    };
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, method = 'GET', body = null, headers = {}) {
    const finalHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (this.token) {
      finalHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    const options = { method, headers: finalHeaders };

    if (body && method !== 'GET' && method !== 'HEAD') {
      if (finalHeaders['Content-Type'] === 'application/json') {
        options.body = JSON.stringify(body);
      } else {
        options.body = body;
      }
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      
      let data;
      try {
        const contentType = response.headers.get('content-type');
        data = contentType && contentType.includes('application/json')
          ? await response.json()
          : await response.text();
      } catch (parseError) {
        // This is a true failure, as the response is unreadable.
        const rawResponse = await response.text();
        throw new Error(`Failed to parse response: ${rawResponse}`);
      }

      // Add status and ok properties to the returned data for client-side evaluation
      data = {
        _status: response.status,
        _ok: response.ok,
        ...data,
      };

      // Optional logging based on instance setting
      if (this.options.log) {
        console.log(`[smQL] Request to ${endpoint} returned status ${response.status}`, data);
      }

      return data;

    } catch (error) {
      // This catch block is only for network errors or un-handled exceptions from fetch.
      if (this.options.log) {
        console.error(`[smQL] API request failed: ${method} ${endpoint}`, error);
      }
      throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, 'POST', body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, 'PUT', body, headers);
  }

  patch(endpoint, body, headers = {}) {
    return this.request(endpoint, 'PATCH', body, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', null, headers);
  }

  static async fetch(baseURL, endpoint, method = 'GET', body = null, headers = {}, options = {}) {
    const client = new smQL(baseURL, {}, options);
    return client.request(endpoint, method, body, headers);
  }
}


export class Form {
  constructor(formId, eventType = 'submit', options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) throw new Error(`Form with ID "${formId}" not found`);

    this.debug = options.debug ?? false;
    this.data = null;
    this.onCaptured = options.onCaptured;

    this.form.addEventListener(eventType, (event) => {
      event.preventDefault();
      this.data = this.#captureFormData(this.form);

      if (this.debug) {
        console.log(`[Form] Data captured from #${formId}:`, this.data);
      }

      if (typeof this.onCaptured === 'function') {
        this.onCaptured(this.data);
      }

      const customEvent = new CustomEvent('form:captured', { detail: this.data });
      this.form.dispatchEvent(customEvent);
    });
  }

  #captureFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Handle all form elements
    for (const [name, value] of formData.entries()) {
      // If the key already exists, convert to array or push to existing array
      if (data[name] !== undefined) {
        if (Array.isArray(data[name])) {
          data[name].push(value);
        } else {
          data[name] = [data[name], value];
        }
      } else {
        data[name] = value;
      }
    }
    
    // Special handling for multi-selects that might not be included in FormData if nothing selected
    const multiSelects = form.querySelectorAll('select[multiple]');
    multiSelects.forEach(select => {
      if (!select.name) return;
      
      const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
      if (selectedOptions.length > 0) {
        data[select.name] = selectedOptions.length === 1 ? selectedOptions[0] : selectedOptions;
      }
    });
    
    return data;
  }

  getData() {
    return this.data;
  }
}



// Add this new Notification class right before the final exports
export class Notification {
  static show(options) {
    // Create container if it doesn't exist
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      document.body.appendChild(container);
      
      // Add styles dynamically
      const style = document.createElement('style');
      style.textContent = `
        #notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .notification {
          position: relative;
          padding: 15px 25px;
          margin-bottom: 15px;
          border-radius: 5px;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          max-width: 400px;
          transform: translateX(120%);
          transition: transform 0.3s ease-in-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
        }
        
        .notification.show {
          transform: translateX(0);
        }
        
        .notification.success {
          background-color: #4CAF50;
          border-left: 5px solid #2E7D32;
        }
        
        .notification.error {
          background-color: #F44336;
          border-left: 5px solid #C62828;
        }
        
        .notification.warning {
          background-color: #FF9800;
          border-left: 5px solid #EF6C00;
        }
        
        .notification-icon {
          margin-right: 12px;
          font-size: 24px;
          font-weight: bold;
        }
        
        .notification-close {
          margin-left: 15px;
          cursor: pointer;
          font-weight: bold;
          font-size: 20px;
          opacity: 0.8;
        }
        
        .notification-close:hover {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }

    // Default options
    const defaults = {
      type: 'success',
      message: 'Operation completed successfully',
      duration: 5000,
      closeable: true,
      successColor: null,
      errorColor: null,
      warningColor: null,
      themeColor: null // General theme color that applies to all types if specific ones not provided
    };
    
    const settings = {...defaults, ...options};
    
    const notification = document.createElement('div');
    notification.className = `notification ${settings.type}`;
    notification.innerHTML = `
      <span class="notification-icon">${settings.type === 'success' ? '✓' : '⚠'}</span>
      <span class="notification-message">${settings.message}</span>
      ${settings.closeable ? '<span class="notification-close" title="Dismiss">&times;</span>' : ''}
    `;
    
    container.appendChild(notification);
    
    // Apply custom colors if provided
    this.applyCustomColors(notification, settings);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-remove if duration is set
    if (settings.duration > 0) {
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, settings.duration);
    }
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      });
    }
  }
  
  static applyCustomColors(notification, settings) {
    // Determine which color to use based on type and provided options
    let backgroundColor = null;
    let borderColor = null;
    
    switch(settings.type) {
      case 'success':
        backgroundColor = settings.successColor || settings.themeColor;
        borderColor = settings.successColor ? this.darkenColor(settings.successColor) : null;
        break;
      case 'error':
        backgroundColor = settings.errorColor || settings.themeColor;
        borderColor = settings.errorColor ? this.darkenColor(settings.errorColor) : null;
        break;
      case 'warning':
        backgroundColor = settings.warningColor || settings.themeColor;
        borderColor = settings.warningColor ? this.darkenColor(settings.warningColor) : null;
        break;
    }
    
    // Apply colors if provided
    if (backgroundColor) {
      notification.style.backgroundColor = backgroundColor;
      if (borderColor) {
        notification.style.borderLeft = `5px solid ${borderColor}`;
      }
    }
  }
  
  static darkenColor(color, amount = 0.2) {
    // Simple color darkening function
    // Handles hex colors like #4CAF50 or #F44336
    if (color.startsWith('#')) {
      let hex = color.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      
      const num = parseInt(hex, 16);
      const amt = Math.round(2.55 * amount * 100);
      
      const R = Math.max(0, ((num >> 16) & 0xff) - amt);
      const G = Math.max(0, ((num >> 8) & 0xff) - amt);
      const B = Math.max(0, (num & 0xff) - amt);
      
      return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
    }
    
    // If it's not a hex color, return a slightly darker version using rgba
    return color; // Fallback to original color
  }
}