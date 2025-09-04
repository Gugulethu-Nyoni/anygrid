// smQL.js - Final version
export default class smQL {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
    this.token = null; // Optional auth token
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

    // Add body if needed and not GET/HEAD
    if (body && method !== 'GET' && method !== 'HEAD') {
      if (finalHeaders['Content-Type'] === 'application/json') {
        options.body = JSON.stringify(body);
      } else {
        options.body = body; // e.g. FormData or other
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, options);

    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      // Throw error with message or raw data for easy catch in caller
      throw new Error(data?.message || data || 'Request failed');
    }

    return data;
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

  // Static helper for quick one-off calls
  static async fetch(baseURL, endpoint, method = 'GET', body = null, headers = {}) {
    const client = new smQL(baseURL);
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
