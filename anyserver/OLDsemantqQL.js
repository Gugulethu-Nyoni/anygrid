// semantqQL.js
export default class smQL {
  constructor(endpoint, method = 'GET', body = null, options = {}) {
    this.endpoint = endpoint;
    this.method = method.toUpperCase();
    this.body = body;
    this.options = options;
    this.log = options.log ?? true;
    this.formId = options.formId ?? null;
    this.successMessage = options.successMessage ?? 'Submission successful.';
    this.errorMessage = options.errorMessage ?? 'An error occurred. Please try again.';
    return this.request();
  }

  async request() {
    try {
      const config = {
        method: this.method,
        headers: {
          'Content-Type': 'application/json',
          ...this.options.headers,
        },
        ...this.options,
      };

      // Remove non-fetch config keys
      delete config.log;
      delete config.formId;
      delete config.successMessage;
      delete config.errorMessage;

      // Add JSON body if needed
      if (['POST', 'PUT', 'PATCH'].includes(this.method)) {
        config.body = JSON.stringify(this.body);
      }

      const response = await fetch(this.endpoint, config);

      const contentType = response.headers.get('content-type');
      const data = contentType && contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      //  Logging
      if (this.log) {
        const statusMsg = `${this.method} [${response.status}]`;
        response.ok
          ? console.log(`[✅] ${statusMsg}:`, data)
          : console.warn(`[❌] ${statusMsg}:`, data);
      }

      //  On success (POST/PUT): replace form with successMessage
      if (response.ok && ['POST', 'PUT'].includes(this.method)) {
        if (this.formId) {
          const form = document.getElementById(this.formId);
          if (form) {
            form.innerHTML = `<div class="formique-success">${this.successMessage}</div>`;
          }
        }
      }

      //  On failure: replace form with errorMessage
      if (!response.ok && this.formId) {
        const form = document.getElementById(this.formId);
        if (form) {
          form.innerHTML = `<div class="formique-error">${this.errorMessage}</div>`;
        }
      }

      return {
        status: response.status,
        ok: response.ok,
        data,
      };
    } catch (error) {
      if (this.log) {
        console.error(`[❌] ${this.method} request error:`, error.message);
      }

      if (this.formId) {
        const form = document.getElementById(this.formId);
        if (form) {
          form.innerHTML = `<div class="formique-error">${this.errorMessage}</div>`;
        }
      }

      return {
        status: 0,
        ok: false,
        data: null,
        error: error.message,
      };
    }
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
