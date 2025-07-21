'use strict';
/**
 * Formique Semantq Class Library
 * 
 * This library provides an extension of the FormBuilder class, allowing for dynamic form rendering, theming, 
 * and dependency management. The key functionalities include:
 * 
 * - Dynamic form rendering based on a provided schema (`formSchema`).
 * - Theming support with predefined themes that can be applied to the form container.
 * - Dependency management to show/hide fields based on parent field values.
 * - Initialization of event listeners to handle form input changes.
 * - **Dynamic dropdowns**: Automatically populate dropdown fields based on other form inputs.
 * - **ARIA labels and WCAG compliance**: Generates forms with accessibility features, including ARIA labels for improved accessibility and compliance with Web Content Accessibility Guidelines (WCAG).
 * 
 * Key Methods:
 * - `constructor(formParams, formSchema, formSettings)`: Initializes the form with the provided parameters, schema, and settings.
 * - `renderForm()`: Renders the form using the schema and appends it to the DOM.
 * - `initDependencyGraph()`: Sets up the dependency graph for managing field visibility based on dependencies.
 * - `attachInputChangeListener(parentField)`: Attaches input change listeners to parent fields for dependency management.
 * - `handleParentFieldChange(parentFieldId, value)`: Handles changes in parent fields and updates dependent fields.
 * - `registerObservers()`: Registers observers for dependent fields to manage their state based on parent field values.
 * - `applyTheme(theme, formContainerId)`: Applies a specified theme to the form container.
 * - `renderFormElement()`: Renders the form element with the necessary attributes and CSRF token if applicable.
 * - `renderField(type, name, label, validate, attributes, options)`: Renders individual form fields based on type and attributes, including dynamic dropdowns and ARIA attributes.
 * 
 * Dependencies:
 * - The library depends on a DOM structure to initialize and manipulate form elements.
 * - Requires a CSS stylesheet with theme definitions.- there are plans to internalise css themes within js
 * 
 * Example Usage:
 * const form = new Formique(formSchema,formParams,formSettings);
 * - formParams and formSettings parameters are optional
 * 
 * This package is suited for Vanilla Js implementations. Formique has different versions 
 * applicable to these frameworks: Svelte, Vue JS, React and Angular. 
 * 
 * Author: Gugulethu Nyoni
 * Version: 1.0.8
 * License: Open-source & MIT licensed.
 */


class FormBuilder 
{
  renderField(type, name, label, validate, attributes, options) {
    throw new Error('Method renderField must be implemented');
  }
  
}

// Extended class for specific form rendering methods
class Formique extends FormBuilder {
  constructor(formSchema, formSettings = {}, formParams = {}, ) {
    super();
    this.formSchema = formSchema;
    this.formParams = formParams;
    this.formSettings = {
      requiredFieldIndicator: true,
      placeholders: true,
      asteriskHtml: '<span aria-hidden="true" style="color: red;">*</span>',
      ...formSettings
    };
    this.divClass = 'input-block';
    this.inputClass = 'form-input';
    this.radioGroupClass = 'radio-group';
    this.checkboxGroupClass = 'checkbox-group';
    this.selectGroupClass = 'form-select';
    this.submitButtonClass = 'form-submit-btn';
    this.formContainerId = formSettings?.formContainerId || 'formique';
    this.formContainerStyle = formSettings?.formContainerStyle || null;
    this.formId = this.formParams?.id || this.generateFormId();
    //console.log(this.formId);
    this.formAction = formParams?.action || 'https://httpbin.org/post';
    this.method = 'POST';    
    this.formMarkUp = '';
    this.dependencyGraph = {};
    this.redirect = formSettings?.redirect ||'';
    this.redirectURL = formSettings?.redirectURL ||'';
    this.activeTheme = formSettings.theme || null;
    this.themeColor = formSettings.themeColor || null;
     this.themeColorMap = {
      'primary': {
        '--formique-base-bg': '#ffffff',
        '--formique-base-text': '#333333',
        '--formique-base-shadow': '0 10px 30px rgba(0, 0, 0, 0.1)',
        '--formique-base-label': '#555555',
        '--formique-input-border': '#dddddd',
        '--formique-focus-color': null, // Will be set to themeColor
        '--formique-btn-bg': null,      // Will be set to themeColor
        '--formique-btn-text': '#ffffff',
        '--formique-btn-shadow': null    // Will be calculated from themeColor
      }
    };


    this.themes = [
      "dark",
      "light",
      "pink",
      "light",
      "indigo",
      "dark-blue",
      "light-blue",
      "dark-orange",
      "bright-yellow",
      "green",
      "purple",
      "midnight-blush",
      "deep-blue",
      "blue",
      "brown",
      "orange"
    ];

    //this.formiqueEndpoint = "http://localhost:3000/api/send-email";
    this.formiqueEndpoint = "https://formiqueapi.onrender.com/api/send-email";

// DISABLE EVENT LISTENER
    // document.addEventListener('DOMContentLoaded', () => {

      /*
      if (this.formParams && Object.keys(this.formParams).length > 0) {
      this.formMarkUp += this.renderFormElement();
      } */

      this.formMarkUp += this.renderFormElement();


      this.renderForm();
      this.renderFormHTML();
      this.initDependencyGraph();
      this.registerObservers();

      
      if (this.formSettings.theme && this.themes.includes(this.formSettings.theme)) {
        let theme = this.formSettings.theme;
        this.applyTheme(theme, this.formContainerId);
      } else {
        // Fallback to dark theme if no theme is set or invalid theme
        this.applyTheme('dark', this.formContainerId);
      }

     document.getElementById(`${this.formId}`).addEventListener('submit', function(event) {
 
      if (this.formSettings.submitMode === 'email') {
      event.preventDefault(); // Prevent the default form submission
      document.getElementById("formiqueSpinner").style.display = "block";
      //return;
      this.handleEmailSubmission(this.formId);
      }


    if (this.formSettings.submitOnPage) {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById("formiqueSpinner").style.display = "block";
    this.handleOnPageFormSubmission(this.formId);
    //console.warn("listener fired at least>>", this.formParams.id, this.method);
    }
    }.bind(this)); // Bind `this` to ensure it's correct inside the event listener



  if (this.formContainerStyle) {
  const formContainer = document.getElementById(this.formContainerId);
  formContainer.setAttribute("style", this.formContainerStyle);
  }



// disable wrapper for DOM event listener
 //   });

// CONSTRUCTOR WRAPPER FOR FORMIQUE CLASS
  }


generateFormId() {
  return `fmq-${Math.random().toString(36).substr(2, 10)}`;
}



initDependencyGraph() {
  this.dependencyGraph = {};

  this.formSchema.forEach((field) => {
    const [type, name, label, validate, attributes = {}] = field;
    const fieldId = attributes.id || name;

    if (attributes.dependents) {
      // Initialize dependency array for the parent field
      this.dependencyGraph[fieldId] = attributes.dependents.map((dependentName) => {
        const dependentField = this.formSchema.find(
          ([, depName]) => depName === dependentName
        );

        if (dependentField) {
          const dependentAttributes = dependentField[4] || {};
          const dependentFieldId = dependentAttributes.id || dependentName; // Get dependent field ID

          return {
            dependent: dependentFieldId,
            condition: dependentAttributes.condition || null,
          };
        } else {
          console.warn(`Dependent field "${dependentName}" not found in schema.`);
        }
      });

      // Add state tracking for the parent field
      this.dependencyGraph[fieldId].push({ state: null });

      // console.log("Graph", this.dependencyGraph[fieldId]);

      // Attach the input change event listener to the parent field
      this.attachInputChangeListener(fieldId);
    }

    // Hide dependent fields initially
    if (attributes.dependents) {

      attributes.dependents.forEach((dependentName) => {
        const dependentField = this.formSchema.find(
          ([, depName]) => depName === dependentName
        );
        const dependentAttributes = dependentField ? dependentField[4] || {} : {};
        const dependentFieldId = dependentAttributes.id || dependentName;

        //alert(dependentFieldId);

        const inputBlock = document.querySelector(`#${dependentFieldId}-block`);
        //alert(inputBlock);
        

        if (inputBlock) {
         // alert(dependentName);
          inputBlock.style.display = 'none'; // Hide dependent field by default
        }
      });
    }
  });

 // console.log("Dependency Graph:", this.dependencyGraph);
}


// Attach Event Listeners
attachInputChangeListener(parentField) {
  const fieldElement = document.getElementById(parentField);
  //alert(parentField);

  if (fieldElement) {
    fieldElement.addEventListener('input', (event) => {
      const value = event.target.value;
      this.handleParentFieldChange(parentField, value);
    });
  }
}


handleParentFieldChange(parentFieldId, value) {
  const dependencies = this.dependencyGraph[parentFieldId];

  if (dependencies) {
    // Update the state of the parent field
    this.dependencyGraph[parentFieldId].forEach((dep) => {
      if (dep.state !== undefined) {
        dep.state = value; // Set state to the selected value
      }
    });

    // Log the updated dependency graph for the parent field
   // console.log(`Updated Dependency Graph for ${parentFieldId}:`, this.dependencyGraph[parentFieldId]);

    // Notify all observers (dependent fields)
    dependencies.forEach((dependency) => {
      if (dependency.dependent) {
        const observerId = dependency.dependent + "-block"; // Ensure we're targeting the wrapper
        const inputBlock = document.getElementById(observerId); // Find the wrapper element

        if (inputBlock) {
          // Check if the condition for the observer is satisfied
          const conditionMet = typeof dependency.condition === 'function'
            ? dependency.condition(value)
            : value === dependency.condition;

          // Debug the condition evaluation
         // console.log(`Checking condition for ${observerId}: `, value, "==", dependency.condition, "Result:", conditionMet);

          // Toggle visibility based on the condition
          inputBlock.style.display = conditionMet ? 'block' : 'none';

          // Adjust the 'required' attribute for all inputs within the block based on visibility
          const inputs = inputBlock.querySelectorAll('input, select, textarea');
          inputs.forEach((input) => {
            if (conditionMet) {
              input.required = input.getAttribute('data-original-required') === 'true'; // Restore original required state
            } else {
              input.setAttribute('data-original-required', input.required); // Save original required state
              input.required = false; // Remove required attribute when hiding
            }
          });
        } else {
          console.warn(`Wrapper block with ID ${observerId} not found.`);
        }
      }
    });
  }
}

// Register observers for each dependent field
registerObservers() {
  this.formSchema.forEach((field) => {
    const [type, name, label, validate, attributes = {}] = field;
    const fieldId = attributes.id || name;

    if (attributes.dependents) {
      attributes.dependents.forEach((dependentName) => {
        // Ensure the dependency graph exists for the parent field
        if (this.dependencyGraph[fieldId]) {
          // Find the dependent field in the form schema
          const dependentField = this.formSchema.find(
            ([, depName]) => depName === dependentName
          );
          
          // If the dependent field exists, register it as an observer
          if (dependentField) {
            const dependentFieldId = dependentField[4]?.id || dependentName;
            this.dependencyGraph[fieldId].forEach((dependency) => {
              if (dependency.dependent === dependentName) {
                // Store the dependent as an observer for this parent field
                if (!dependency.observers) {
                  dependency.observers = [];
                }
                dependency.observers.push(dependentFieldId);
              }
            });
          }
        }
      });
    }
  });

  // console.log("Observers Registered:", JSON.stringify(this.dependencyGraph,null,2));
}


applyTheme(theme, formContainerId) {
    const formContainer = document.getElementById(formContainerId);
    const spinnerContainer = document.getElementById('formiqueSpinner');

    if (!formContainer) {
        console.error(`Form container with ID ${formContainerId} not found.`);
        return;
    }

    // Clear any existing theme classes
    this.themes.forEach(t => formContainer.classList.remove(`${t}-theme`));
    formContainer.classList.remove('custom-theme');
    spinnerContainer.classList.remove('custom-theme');

    // If themeColor is provided, use it to create a custom theme
    if (this.themeColor) {
        this.applyCustomTheme(formContainerId);
        return;
    }

    // Fall back to predefined theme if no themeColor
    const stylesheet = document.querySelector('link[href*="formique-css"]');
    if (!stylesheet) {
        console.error("Stylesheet with 'formique-css' in the name not found!");
        return;
    }

    fetch(stylesheet.href)
        .then(response => response.text())
        .then(cssText => {
            const themeRules = cssText.match(new RegExp(`\\.${theme}-theme\\s*{([^}]*)}`, 'i'));
            if (!themeRules) {
                console.error(`Theme rules for ${theme} not found in the stylesheet.`);
                return;
            }

            const themeCSS = themeRules[1].trim();
            formContainer.classList.add(`${theme}-theme`, 'formique');
            spinnerContainer.classList.add(`${theme}-theme`);

            const clonedStyle = document.createElement('style');
            clonedStyle.textContent = `#${formContainerId} { ${themeCSS} }`;
            formContainer.parentNode.insertBefore(clonedStyle, formContainer);
        })
        .catch(error => {
            console.error('Error loading the stylesheet:', error);
        });
}

applyCustomTheme(formContainerId) {
    const formContainer = document.getElementById(formContainerId);
    const spinnerContainer = document.getElementById('formiqueSpinner');

    if (!formContainer) return;

    formContainer.classList.add('custom-theme', 'formique');
    spinnerContainer.classList.add('custom-theme');

    this.activeTheme = 'custom-theme';

    // Calculate shadow color (semi-transparent themeColor)
    const shadowColor = this.hexToRgbA(this.themeColor, 0.3);
    
    // Create custom theme CSS variables
    const customTheme = {
        ...this.themeColorMap.primary,
        '--formique-focus-color': this.themeColor,
        '--formique-btn-bg': this.themeColor,
        '--formique-btn-shadow': `0 2px 10px ${shadowColor}`
    };

    // Apply the styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #${formContainerId} {
            ${Object.entries(customTheme)
                .map(([varName, value]) => 
                    value ? `${varName}: ${value};` : ''
                )
                .join('\n')}
        }
    `;

    // Remove any existing custom style
    const existingStyle = document.querySelector(`style[data-custom-theme="${formContainerId}"]`);
    if (existingStyle) existingStyle.remove();
    
    styleElement.setAttribute('data-custom-theme', formContainerId);
    formContainer.parentNode.insertBefore(styleElement, formContainer);
}

hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${alpha})`;
    }
    return `rgba(0, 0, 0, ${alpha})`;
}


// renderFormElement method
    renderFormElement() {
  let formHTML = '<form';

  // Ensure `this.formParams` is being passed in as the source of form attributes
  const paramsToUse = this.formParams || {};
  //console.log(paramsToUse);

if (!paramsToUse.id) {
  paramsToUse.id = this.formId;
}


  // Dynamically add attributes if they are present in the parameters
Object.keys(paramsToUse).forEach(key => {
  const value = paramsToUse[key];
  if (value !== undefined && value !== null) {
    // Handle boolean attributes (without values, just their presence)
    if (typeof value === 'boolean') {
      if (value) {
        formHTML += ` ${key}`;  // Simply add the key as the attribute
      }
    } else {
      // Handle other attributes (key-value pairs)
      const formattedKey = key === 'accept_charset' ? 'accept-charset' : key.replace(/_/g, '-');
      formHTML += ` ${formattedKey}="${value}"`;
      //console.log("HERE",formHTML);
    }
  }
});

  // Conditionally add CSRF token if 'laravel' is true
  if (paramsToUse.laravel) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      formHTML += `<input type="hidden" name="_token" value="${csrfToken}">`;
    }
  }

  // Close the <form> tag
  formHTML += '>\n';

  // Return the generated form HTML
  return formHTML;
}




  // Main renderForm method
renderForm() {
    // Process each field synchronously
    const formHTML = this.formSchema.map(field => {
        const [type, name, label, validate, attributes = {},options] = field;
        return this.renderField(type, name, label, validate, attributes, options);
    }).join('');   
    this.formMarkUp += formHTML; 
}


renderField(type, name, label, validate, attributes, options) {
    const fieldRenderMap = {
        'text': this.renderTextField,
        'email': this.renderEmailField,
        'number': this.renderNumberField,
        'password': this.renderPasswordField,
        'textarea': this.renderTextAreaField,
        'tel': this.renderTelField,
        'date': this.renderDateField,
        'time': this.renderTimeField,
        'datetime-local': this.renderDateTimeField,
        'month': this.renderMonthField,
        'week': this.renderWeekField,
        'url': this.renderUrlField,
        'search': this.renderSearchField,
        'color': this.renderColorField,
        'checkbox': this.renderCheckboxField,
        'radio': this.renderRadioField,
        'file': this.renderFileField,
        'hidden': this.renderHiddenField,
        'image': this.renderImageField,
        'textarea': this.renderTextAreaField,
        'singleSelect': this.renderSingleSelectField,
        'multipleSelect': this.renderMultipleSelectField,
        'dynamicSingleSelect': this.renderDynamicSingleSelectField,
        'range': this.renderRangeField,
        'submit': this.renderSubmitButton,
    };

    const renderMethod = fieldRenderMap[type];

    if (renderMethod) {
        return renderMethod.call(this, type, name, label, validate, attributes, options);
    } else {
        console.warn(`Unsupported field type '${type}' encountered.`);
        return ''; // or handle gracefully
    }
}



// Show success/error messages (externalizable)
showSuccessMessage(message) {
  const container = document.getElementById(this.formContainerId);
  container.innerHTML = `
    <div class="formique-success ${this.activeTheme}">${message}</div>
    ${this.formSettings.redirectURL 
      ? `<meta http-equiv="refresh" content="2;url=${this.formSettings.redirectURL}">` 
      : ""}
  `;
}

showErrorMessage(message) {
  const container = document.getElementById(this.formContainerId);
  const errorDiv = document.createElement("div");
  errorDiv.className = `formique-error ${this.activeTheme}`;
  errorDiv.textContent = `${message}`;
  container.prepend(errorDiv);
}

// Check if form has file inputs
hasFileInputs(form) {
  return Boolean(form.querySelector('input[type="file"]'));
}





// A complete function to replace your old one
// Use this function wherever you are currently using the fetch().then()... structure
// This is the complete, final version of the class method.
// It is an async arrow function, so 'this' is automatically correct.
handleEmailSubmission = async (formId) => {
  try {
    const form = document.getElementById(formId);
    if (!form) throw new Error(`Form with ID ${formId} not found`);

    // --- Start of Payload and Method Logic (as provided previously) ---
    const payload = {
      formData: {},
      metadata: {
        recipients: this.formSettings.sendTo,
        timestamp: new Date().toISOString()
      }
    };
    
    let senderEmail = '';
    let formSubject = '';

    new FormData(form).forEach((value, key) => {
        payload.formData[key] = value;
        const lowerKey = key.toLowerCase();
        if ((lowerKey === 'email' || lowerKey.includes('email'))) {
          senderEmail = value;
        }
        if ((lowerKey === 'subject' || lowerKey.includes('subject'))) {
          formSubject = value;
        }
    });

    payload.metadata.subject = formSubject || this.formSettings.subject || 'Message From Contact Form';
    if (senderEmail) {
      payload.metadata.sender = senderEmail;
      payload.metadata.replyTo = senderEmail;
    }
    // --- End of Payload and Method Logic ---

    const endpoint = this.formiqueEndpoint || this.formAction;
    const method = this.method || 'POST';

    // Show spinner when request starts
    document.getElementById("formiqueSpinner").style.display = "flex";

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Formique-Version': '1.0'
      },
      body: JSON.stringify(payload)
    });

    // The core fix: Read the response body as text first.
    // This will not fail on an empty response.
    const responseBodyText = await response.text();
    let data = {};

    // Only try to parse if the body isn't empty.
    if (responseBodyText.length > 0) {
      try {
        data = JSON.parse(responseBodyText);
      } catch (err) {
        // This handles cases where the server returns non-JSON data.
        console.warn("Response was not valid JSON or unexpected format:", err);
      }
    }

    if (!response.ok) {
      const errorMsg = data.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMsg);
    }

    const successMessage = this.formSettings.successMessage || data.message || "Your message has been sent successfully!";
    this.showSuccessMessage(successMessage);

  } catch (error) {
    console.error("Email submission failed:", error);
    const errorMessage = this.formSettings.errorMessage || error.message || "Failed to send message. Please try again later.";
    this.showErrorMessage(errorMessage);
  } finally {
    // Ensure spinner is hidden on success or failure
    document.getElementById("formiqueSpinner").style.display = "none";
  }
};

// Email validation helper
validateEmail(email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  console.log(`Validating email ${email}: ${isValid ? 'valid' : 'invalid'}`); // Debug log
  return isValid;
}



// Method to handle on-page form submissions
handleOnPageFormSubmission(formId) {
  const formElement = document.getElementById(formId);
  //console.warn("handler fired also",formId,this.method,this.formAction);

  if (formElement) {
    // Gather form data
    const formData = new FormData(formElement);

    // Submit form data using fetch to a test endpoint
    fetch(this.formAction, {
      method: this.method,
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle the response data here, e.g., show a success message

        // Get the form container element
const formContainer = document.getElementById(this.formContainerId);

if (this.redirect && this.redirectURL) {
  window.location.href = this.redirectURL;
}


if (formContainer) {
  // Create a new div element for the success message
  const successMessageDiv = document.createElement('div');

  // Add custom classes for styling the success message
  successMessageDiv.classList.add('success-message', 'message-container');

  // Set the success message text
  successMessageDiv.innerHTML = this.formSettings.successMessage || 'Your details have been successfully submitted!';

  // Replace the content of the form container with the success message div
  formContainer.innerHTML = ''; // Clear existing content
  formContainer.appendChild(successMessageDiv); // Append the new success message div
}


      })
      .catch(error => {
  console.error('Error:', error);

  const formContainer = document.getElementById(this.formContainerId);
  if (formContainer) {
    // Check if an error message div already exists and remove it
    let existingErrorDiv = formContainer.querySelector('.error-message');
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }

    // Create a new div element for the error message
    const errorMessageDiv = document.createElement('div');

    // Add custom classes for styling the error message
    errorMessageDiv.classList.add('error-message', 'message-container');

    // Set the error message text
    let err = this.formSettings.errorMessage || 'An error occurred while submitting the form. Please try again.';
    err = `${err}<br/>Details: ${error.message}`;
    errorMessageDiv.innerHTML = err; 

    // Append the new error message div to the form container
    //formContainer.appendChild(errorMessageDiv);
  }
});

  }
}




// text field rendering
renderTextField(type, name, label, validate, attributes) {
  const textInputValidationAttributes = [
  'required',
  'minlength',
  'maxlength',
  'pattern',
];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (textInputValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'pattern':
            case 'minlength':
            case 'maxlength':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!textInputValidationAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'number'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'text'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
   bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`,`You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }
  }



  // Get the id from attributes or fall back to name
  let id = attributes.id || name;
  // Determine if semanti is true based on formSettings
  const framework = this.formSettings?.framework || false;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        if (framework === 'semantq') {
          const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
          additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
        } else {
          // Add parentheses if not present
          const eventValue = value.endsWith('()') ? value : `${value}()`;
          additionalAttrs += `  ${key}="${eventValue}"\n`;
        }
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }



  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
 let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${additionalAttrs.includes('placeholder') ? '' : (this.formSettings.placeholders ? `placeholder="${label}"` : '')}      />
    </div>
`.replace(/^\s*\n/gm, '').trim();

   let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });


  this.formMarkUp +=formattedHtml;
  //return formattedHtml;
}




  // Specific rendering method for rendering the email field
renderEmailField(type, name, label, validate, attributes) {
  // Define valid attributes for the email input type
  
const emailInputValidationAttributes = [
  'required',
  'pattern',
  'minlength',
  'maxlength',
  'multiple'
];


  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (emailInputValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'pattern':
            case 'minlength':
            case 'maxlength':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!emailInputValidationAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'number'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'email'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
   bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }
  }


  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }


  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}"> 
      <label for="${id}">${label}
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${additionalAttrs.includes('placeholder') ? '' : (this.formSettings.placeholders ? `placeholder="${label}"` : '')}

      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines
  

  this.formMarkUp += formattedHtml;

  //return formattedHtml;
  //return this.formMarkUp;
  //console.log(this.formMarkUp);
}



renderNumberField(type, name, label, validate, attributes) {
  // Define valid attributes for the number input type

  const numberInputValidationAttributes = [
  'required',
  'min',
  'max',
  'step',
];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (numberInputValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'min':
            case 'max':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            case 'step':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!numberInputValidationAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'number'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'number'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
   bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }
  }



  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}"> 
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines
  
  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



// New method for rendering password fields
renderPasswordField(type, name, label, validate, attributes) {
  // Define valid attributes for the password input type


  const passwordInputValidationAttributes = [
  'required',
  'minlength',
  'maxlength',
  'pattern',
];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (passwordInputValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'minlength':
            case 'maxlength':
            case 'pattern':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!passwordInputValidationAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'password'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'password'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
   bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }
  }




  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}"> 
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}


// Textarea field rendering

renderTextAreaField(type, name, label, validate, attributes) {
  const textInputValidationAttributes = [
  'required',
  'minlength',
  'maxlength',
  'pattern',
];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (textInputValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'pattern':
            case 'minlength':
            case 'maxlength':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!textInputValidationAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'number'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'text'.\x1b[0m`);
      }
    });
  }



  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
   bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }
  }



  // Get the id from attributes or fall back to name
  let id = attributes.id || name;
  // Determine if semanti is true based on formSettings
  const framework = this.formSettings?.framework || false;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        if (framework === 'semantq') {
          const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
          additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
        } else {
          // Add parentheses if not present
          const eventValue = value.endsWith('()') ? value : `${value}()`;
          additionalAttrs += `  ${key}="${eventValue}"\n`;
        }
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }



  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }

// Construct the final HTML string for textarea
let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </label>
      <textarea 
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${additionalAttrs.includes('placeholder') ? '' : (this.formSettings.placeholders ? `placeholder="${label}"` : '')}>
      </textarea>
    </div>
`.replace(/^\s*\n/gm, '').trim();

let formattedHtml = formHTML;

// Apply vertical layout to the <textarea> element only
formattedHtml = formattedHtml.replace(/<textarea\s+([^>]*)>\s*<\/textarea>/, (match, p1) => {
  // Reformat attributes into a vertical layout
  const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
  return `<textarea\n${attributes}\n></textarea>`;
});

this.formMarkUp += formattedHtml;

}


// New method for rendering tel fields
renderTelField(type, name, label, validate, attributes) {
  
const telInputValidationAttributes = [
  'required',
  'pattern',
  'minlength',
  'maxlength',
];


  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (telInputValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'pattern':
            case 'minlength':
            case 'maxlength':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!telInputValidationAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'tel'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'tel'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  return formattedHtml;
}

renderDateField(type, name, label, validate, attributes) {
  // Define valid attributes for the date input type
  const dateInputAttributes = [
    'required',
    'min',
    'max',
    'step',
    'placeholder',
    'readonly',
    'disabled',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (dateInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'min':
            case 'max':
            case 'step':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!dateInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'date'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'date'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}"> 
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



renderTimeField(type, name, label, validate, attributes) {
  // Define valid attributes for the time input type
  const timeInputAttributes = [
    'required',
    'min',
    'max',
    'step',
    'readonly',
    'disabled',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (timeInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'min':
            case 'max':
            case 'step':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!timeInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}"> 
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}




renderDateTimeField(type, name, label, validate, attributes) {
  // Define valid attributes for the datetime input type
  const dateTimeInputAttributes = [
    'required',
    'min',
    'max',
    'step',
    'readonly',
    'disabled',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (dateTimeInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'min':
            case 'max':
            case 'step':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!dateTimeInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding.startsWith('::') && name) {
   bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }
  }




  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}"> 
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}


renderMonthField(type, name, label, validate, attributes) {
  // Define valid attributes for the month input type
  const monthInputAttributes = [
    'required',
    'min',
    'max',
    'pattern',
    'placeholder',
    'readonly',
    'disabled',
    'size',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (monthInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'min':
            case 'max':
            case 'pattern':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
               if (monthInputAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'month'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'month'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



renderWeekField(type, name, label, validate, attributes) {
  // Define valid attributes for the week input type
  const weekInputAttributes = [
    'required',
    'min',
    'max',
    'pattern',
    'placeholder',
    'readonly',
    'disabled',
    'size',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (weekInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'min':
            case 'max':
            case 'pattern':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (weekInputAttributes.includes(key)) {
              console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'week'.\x1b[0m`);
               }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'week'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding  && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



renderUrlField(type, name, label, validate, attributes) {
  // Define valid attributes for the URL input type
  const urlInputAttributes = [
    'required',
    'pattern',
    'placeholder',
    'readonly',
    'disabled',
    'size',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (urlInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'pattern':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!urlInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}


renderSearchField(type, name, label, validate, attributes) {
  // Define valid attributes for the search input type
  const searchInputAttributes = [
    'required',
    'pattern',
    'placeholder',
    'readonly',
    'disabled',
    'size',
    'autocomplete',
    'spellcheck',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (searchInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            case 'pattern':
              validationAttrs += `  ${key}="${value}"\n`;
              break;
            default:
              if (!searchInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}


renderColorField(type, name, label, validate, attributes) {
  // Define valid attributes for the color input type
  const colorInputAttributes = [
    'required',
    'readonly',
    'disabled',
    'autocomplete',
    'inputmode',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (colorInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            default:
              if (!colorInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value') {
    bindingDirective = `bind:value="${name}"\n`;
  } else if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



renderFileField(type, name, label, validate, attributes) {
  // Define valid attributes for the file input type
  const fileInputAttributes = [
    'required',
    'accept',
    'multiple',
    'disabled',
    'title',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (fileInputAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          switch (key) {
            default:
              if (!fileInputAttributes.includes(key)) {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
              }
              break;
          }
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value') {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}





renderHiddenField(type, name, label, validate, attributes) {
  // Define valid attributes for the hidden input type
  const validAttributes = [
    'type',
    'name',
    'value',
    'id',
    'class',
    'style',
    'required',
    'readonly',
    'disabled',
    'tabindex',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (validAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value') {
    bindingDirective = `bind:value="${name}"\n`;
  } if (attributes.binding.startsWith('::') && name) {
    bindingDirective = `bind:value="${name}"\n`;
  }
  if (attributes.binding && !name) {
    console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
    return;
  }


  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
    <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



renderImageField(type, name, label, validate, attributes) {
  // Define valid validation attributes for image upload
  const imageUploadValidationAttributes = [
    'accept',
    'required',
    'minwidth',
    'maxwidth',
    'minheight',
    'maxheight',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (imageUploadValidationAttributes.includes(key)) {
        if (key === 'accept') {
          validationAttrs += `accept="${value}"\n`;
        } else if (['required', 'minwidth', 'maxwidth', 'minheight', 'maxheight'].includes(key)) {
          validationAttrs += `${key}="${value}"\n`;
        } else {
          console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value') {
    bindingDirective = ` bind:value="${name}"`;
  } else if (attributes.binding.startsWith('::')) {
    bindingDirective = ` bind:value="${name}"`;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}




renderImageField(type, name, label, validate, attributes) {
  // Define valid validation attributes for image upload
  const imageUploadValidationAttributes = [
    'accept',
    'required',
    'minwidth',
    'maxwidth',
    'minheight',
    'maxheight',
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (imageUploadValidationAttributes.includes(key)) {
        validationAttrs += `${key}="${value}"\n`;
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding === 'bind:value' || bindingSyntax.startsWith('::')) {
    bindingDirective = `bind:value="${name}"\n`;
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
      />
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> element only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <div> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<div\s+[^>]*>)/g, (match) => {
    // Ensure <div> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  return formattedHtml;
}






// Textarea field rendering
renderTextAreaField(type, name, label, validate, attributes) {
  const textAreaValidationAttributes = [
    'required',
    'minlength',
    'maxlength'
  ];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (textAreaValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          validationAttrs += `  ${key}="${value}"\n`;
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
    if (attributes.binding === 'bind:value' && name) {
      bindingDirective = `bind:value="${name}"\n`;
    }
    if (attributes.binding.startsWith('::') && name) {
      bindingDirective = `bind:value="${name}"\n`;
    }
    if (attributes.binding && !name) {
      console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
      return;
    }
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
    if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {
      if (key.startsWith('on')) {
        const eventValue = value.endsWith('()') ? value : `${value}()`;
        additionalAttrs += `  ${key}="${eventValue}"\n`;
      } else {
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  let inputClass = attributes.class || this.inputClass;

  // Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id + '-block'}">
      <label for="${id}">${label}
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </label>
      <textarea 
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${additionalAttrs.includes('placeholder') ? '' : (this.formSettings.placeholders ? `placeholder="${label}"` : '')}>
      </textarea>
    </div>
`.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML;

  // Apply vertical layout to the <textarea> element only
  formattedHtml = formattedHtml.replace(/<textarea\s+([^>]*)>\s*<\/textarea>/, (match, p1) => {
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<textarea\n${attributes}\n></textarea>`;
  });

  this.formMarkUp += formattedHtml;
}



renderRadioField(type, name, label, validate, attributes, options) {
    // Define valid validation attributes for radio fields
    const radioValidationAttributes = ['required'];
    
    // Construct validation attributes
    let validationAttrs = '';
    if (validate) {
        Object.entries(validate).forEach(([key, value]) => {
            if (radioValidationAttributes.includes(key)) {
                if (typeof value === 'boolean' && value) {
                    validationAttrs += `  ${key}\n`;
                } else {
                    // Handle specific validation attributes
                    switch (key) {
                        case 'required':
                            validationAttrs += `  ${key}\n`;
                            break;
                        default:
                            if (!radioValidationAttributes.includes(key)) {
                                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'radio'.\x1b[0m`);
                            }
                            break;
                    }
                }
            } else {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type 'radio'.\x1b[0m`);
            }
        });
    }

    // Handle the binding syntax
    let bindingDirective = '';
    if (attributes.binding) {
    if (attributes.binding === 'bind:value' && name) {
        bindingDirective = ` bind:value="${name}"\n`;
    } else if (attributes.binding.startsWith('::') && name) {
        bindingDirective = ` bind:value="${name}"\n`;
    } else if (attributes.binding && !name) {
        console.log(`\x1b[31m%s\x1b[0m`, `You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
        return;
    }
  }

    // Define attributes for the radio inputs
    let id = attributes.id || name;

    // Construct additional attributes dynamically
    let additionalAttrs = '';
    for (const [key, value] of Object.entries(attributes)) {
      if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {            if (key.startsWith('on')) {
                // Handle event attributes
                const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
                additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
            } else {
                // Handle boolean attributes
                if (value === true) {
                    additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
                } else if (value !== false) {
                    // Convert underscores to hyphens and set the attribute
                    additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
                }
            }
        }
    }

    let inputClass = attributes.class || this.inputClass;

    // Construct radio button HTML based on options
    let optionsHTML = '';
    if (options && options.length) {
        optionsHTML = options.map((option) => {
            return `
            <div>
                <input 
                    type="${type}" 
                    name="${name}" 
                    value="${option.value}"
                    ${bindingDirective} 
                    ${additionalAttrs}
                    ${attributes.id ? `id="${id}-${option.value}"` : `id="${id}-${option.value}"`}
                    class="${inputClass}"
                    ${validationAttrs}
                />
                <label 
                    for="${attributes.id ? `${id}-${option.value}` : `${id}-${option.value}`}">
                    ${option.label}
                </label>
            </div>
            `;
        }).join('');
    }

    // Construct the final HTML string
    let formHTML = `
    <fieldset class="${this.radioGroupClass}" id="${id + '-block'}">
        <legend>
        ${label} 
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
        </legend>
        ${optionsHTML}
    </fieldset>
    `.replace(/^\s*\n/gm, '').trim();

    // Apply vertical layout to the <input> elements only
    let formattedHtml = formHTML.replace(/<input\s+([^>]*)\/>/g, (match, p1) => {
        // Reformat attributes into a vertical layout
        const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
        return `<input\n${attributes}\n/>`;
    });

    // Ensure the <fieldset> block starts on a new line and remove extra blank lines
    formattedHtml = formattedHtml.replace(/(<fieldset\s+[^>]*>)/g, (match) => {
        // Ensure <fieldset> starts on a new line
        return `\n${match}\n`;
    }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

    //return formattedHtml;
    this.formMarkUp +=formattedHtml;
}


renderCheckboxField(type, name, label, validate, attributes, options) {
  // Define valid validation attributes for checkbox fields
  const checkboxValidationAttributes = ['required'];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (checkboxValidationAttributes.includes(key)) {
        if (key === 'required') {
          validationAttrs += `${key}\n`;
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
  if (attributes.binding === 'bind:checked') {
    bindingDirective = ` bind:checked="${name}"\n`;
  } else if (attributes.binding.startsWith('::')) {
    bindingDirective = ` bind:checked="${name}"\n`;
  }
 }

  // Define attributes for the checkbox inputs
  let id = attributes.id || name;

  // Handle additional attributes
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }


  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }

  // Construct checkbox HTML based on options
  let optionsHTML = '';
  if (Array.isArray(options)) {
    optionsHTML = options.map((option) => {
      const optionId = `${id}-${option.value}`;
      return `
        <div>
          <input 
          type="checkbox" 
          name="${name}" 
          value="${option.value}"${bindingDirective} ${additionalAttrs}
            ${attributes.id ? `id="${optionId}"` : `id="${optionId}"`}
            class="${inputClass}"
          />
          <label 
          for="${optionId}">
            ${option.label}
          </label>
        </div>
      `;
    }).join('');
  }

  // Construct the final HTML string
  let formHTML = `
    <fieldset class="${this.checkboxGroupClass}" id="${id + '-block'}">
      <legend>
      ${label}  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </legend>
      ${optionsHTML}
    </fieldset>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <input> elements only
  formattedHtml = formattedHtml.replace(/<input\s+([^>]*)\/>/g, (match, p1) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  // Ensure the <fieldset> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<fieldset\s+[^>]*>)/g, (match) => {
    // Ensure <fieldset> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}



/* DYNAMIC SINGLE SELECT BLOCK */

// Function to render the dynamic select field and update based on user selection
renderDynamicSingleSelectField(type, name, label, validate, attributes, options) {
  
// Step 1: Transform the data into an array of objects
const mainCategoryOptions = options.flat().map(item => {
  // Check if any option has selected: true
  const selected = item.options.some(option => option.selected === true);

  // Create a transformed object
  return {
    value: item.id,
    label: item.label,
    ...(selected && { selected: true }) // Conditionally add selected: true
  };
});

const subCategoriesOptions=options;
const mode='dynamicSingleSelect';
this.renderSingleSelectField(type, name, label, validate, attributes, mainCategoryOptions, subCategoriesOptions, mode);

}


renderSingleSelectField(type, name, label, validate, attributes, options, subCategoriesOptions, mode) {

    // Define valid validation attributes for select fields
    const selectValidationAttributes = ['required'];

    // Construct validation attributes
    let validationAttrs = '';
    if (validate) {
        Object.entries(validate).forEach(([key, value]) => {
            if (selectValidationAttributes.includes(key)) {
                if (key === 'required') {
                    validationAttrs += `${key} `;
                }
            } else {
                console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
            }
        });
    }

    // Handle the binding syntax
    let bindingDirective = '';
    if (attributes.binding) {
    if (typeof attributes.binding === 'string' && attributes.binding.startsWith('::')) {
        bindingDirective = ` bind:value="${name}" `;
    }
  }

    // Define attributes for the select field
    let id = attributes.id || name;
    let dimensionAttrs = ''; // No dimension attributes applicable for select fields

    // Handle additional attributes
    let additionalAttrs = '';
    for (const [key, value] of Object.entries(attributes)) {
      if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {            if (key.startsWith('on')) {
                // Handle event attributes
                const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
                additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
            } else {
                // Handle boolean attributes
                if (value === true) {
                    additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
                } else if (value !== false) {
                    // Convert underscores to hyphens and set the attribute
                    additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
                }
            }
        }
    }

    // Construct select options HTML based on options
    let selectHTML = '';
    if (Array.isArray(options)) {
        // Add a default option
        selectHTML += `
        <option value="">Choose an option</option>
        `;

        // Add the provided options
        selectHTML += options.map((option) => {
            const isSelected = option.selected ? ' selected' : '';
            return `
            <option value="${option.value}"${isSelected}>${option.label}</option>
            `;
        }).join('');
    }

    let inputClass = attributes.class || this.inputClass;

    const onchangeAttr = (mode === 'dynamicSingleSelect' && subCategoriesOptions) ? ' onchange="handleDynamicSingleSelect(this.value,id)"' : '';
    
    let labelDisplay;
    let rawLabel; 

    if (mode === 'dynamicSingleSelect' && subCategoriesOptions) {
      if (label.includes('-')) {
        const [mainCategoryLabel] = label.split('-');
        labelDisplay = mainCategoryLabel; 
        rawLabel = label;
      } else {
        labelDisplay = label;
        rawLabel = label;
      }
    } else {
      labelDisplay = label;
    }


    // Construct the final HTML string
    let formHTML = `
    <fieldset class="${this.selectGroupClass}" id="${id + '-block'}">
        <legend>${labelDisplay} 
            ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
        </legend>
        <label for="${id}"> Select ${labelDisplay} 
        <select name="${name}"
            ${bindingDirective}
            ${dimensionAttrs}
            id="${id}"
            class="${inputClass}"
            ${additionalAttrs}
            ${validationAttrs}
            ${onchangeAttr} 
        >
            ${selectHTML}
        </select>
    </fieldset>
`.replace(/^\s*\n/gm, '').trim();


    // Apply vertical layout to the <select> element and its children
    let formattedHtml = formHTML.replace(/<select\s+([^>]*)>([\s\S]*?)<\/select>/g, (match, p1, p2) => {
        // Reformat attributes into a vertical layout
        const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
        return `<select\n${attributes}\n>\n${p2.trim()}\n</select>`;
    });

    // Ensure the <fieldset> block starts on a new line and remove extra blank lines
    formattedHtml = formattedHtml.replace(/(<fieldset\s+[^>]*>)/g, (match) => {
        // Ensure <fieldset> starts on a new line
        return `\n${match}\n`;
    }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

    //console.log(formattedHtml);
    this.formMarkUp+=formattedHtml;
    //return formattedHtml;


    /* dynamicSingleSelect */

if (mode && mode ==='dynamicSingleSelect' && subCategoriesOptions) {


// Find the target div with id this.formContainerId
const targetDiv = document.getElementById(this.formContainerId);

let categoryId = attributes.id || name;


if (targetDiv) {
  // Create a script element
  const scriptElement = document.createElement('script');
  scriptElement.textContent = `
  window.handleDynamicSingleSelect = function(category, fieldsetid) {
    //console.log("HERE", fieldsetid);

    // Hide all subcategory fields
    document.querySelectorAll(\`[class*="\${fieldsetid}"]\`).forEach(div => {
      div.style.display = "none";
    });

    // Show the selected category
    const selectedCategoryFieldset = document.getElementById(category + '-options');
    if (selectedCategoryFieldset) {
      selectedCategoryFieldset.style.display = "block";
    }
  }
`;

  // Append the script element to the target div
  targetDiv.appendChild(scriptElement);
} else {
  console.error(`Target div with id "${this.formContainerId}" not found.`);
}

subCategoriesOptions.forEach(subCategory => {
  const { id, label, options } = subCategory;

  // Build the select options HTML
  const selectHTML = options.map(option => {
    const isSelected = option.selected ? ' selected' : '';
    return `
      <option value="${option.value}"${isSelected}>${option.label}</option>
    `;
  }).join('');


    let subCategoryLabel; 
    console.log('Label:', rawLabel); // Debug log

    if (rawLabel.includes('-')) {
      subCategoryLabel = rawLabel.split('-')?.[1] + ' Options'; 
    } else {
      subCategoryLabel = 'options';
    }

    let optionsLabel;
    if (subCategoryLabel !== 'options') {
      optionsLabel = rawLabel.split('-')?.[1] + ' Option'; 
    } else {
    optionsLabel  = subCategoryLabel; 
    }


  // Create the HTML for the fieldset and select elements
  let formHTML = `
    <fieldset class="${this.selectGroupClass} ${categoryId}" id="${id}-options" style="display: none;">
        <legend> ${label} ${subCategoryLabel} ${this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
        </legend>
        <label for="${id}"> Select ${label} ${optionsLabel}           
        </label>
        <select name="${id}"
            ${bindingDirective}
            ${dimensionAttrs}
            id="${id + '-block'}"
            class="${inputClass}"
            ${additionalAttrs}
            ${validationAttrs}
        >
            <option value="">Choose an option</option>
            ${selectHTML}
        </select>
    </fieldset>
  `.replace(/^\s*\n/gm, '').trim();

  // Apply vertical layout to the <select> element and its children
  formHTML = formHTML.replace(/<select\s+([^>]*)>([\s\S]*?)<\/select>/g, (match, p1, p2) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<select\n${attributes}\n>\n${p2.trim()}\n</select>`;
  });

  // Ensure the <fieldset> block starts on a new line and remove extra blank lines
  formHTML = formHTML.replace(/(<fieldset\s+[^>]*>)/g, (match) => {
    // Ensure <fieldset> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  // Append the generated HTML to formMarkUp
  this.formMarkUp += formHTML;

  //return formHTML;
});


}
}



renderMultipleSelectField(type, name, label, validate, attributes, options) {
  // Define valid validation attributes for multiple select fields
  const selectValidationAttributes = ['required', 'minlength', 'maxlength'];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (selectValidationAttributes.includes(key)) {
        if (key === 'required') {
          validationAttrs += `${key} `;
        } else if (key === 'minlength') {
          validationAttrs += `minlength="${value}" `;
        } else if (key === 'maxlength') {
          validationAttrs += `maxlength="${value}" `;
        }
      } else {
        console.warn(`\x1b[31mUnsupported validation attribute '${key}' for field '${name}' of type '${type}'.\x1b[0m`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
  if (typeof attributes.binding === 'string' && attributes.binding.startsWith('::')) {
    bindingDirective = ` bind:value="${name}" `;
  }
}

  // Define attributes for the select field
  let id = attributes.id || name;
  let dimensionAttrs = ''; // No dimension attributes applicable for select fields

  // Handle additional attributes
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  // Construct select options HTML based on options
  let selectHTML = '';
  if (Array.isArray(options)) {
    selectHTML = options.map((option) => {
      const isSelected = option.selected ? ' selected' : '';
      return `
        <option value="${option.value}"${isSelected}>${option.label}</option>
      `;
    }).join('');
  }

  // Define multiple attribute for multi-select
  const multipleAttr = 'multiple';

  let inputClass; 
  if ('class' in attributes) {
    inputClass = attributes.class; 
  } else {
        inputClass = this.inputClass; 
  }
// Construct the final HTML string
  let formHTML = `
    <fieldset class="${this.selectGroupClass}" id="${id + '-block'}">
      <label for="${id}">${label}
  ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
</label>
      <select name="${name}"
        ${bindingDirective}
        ${dimensionAttrs}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${multipleAttr}
      >
        ${selectHTML}
      </select>
    </fieldset>
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  // Apply vertical layout to the <select> element and its children
  formattedHtml = formattedHtml.replace(/<select\s+([^>]*)>([\s\S]*?)<\/select>/g, (match, p1, p2) => {
    // Reformat attributes into a vertical layout
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<select\n${attributes}\n>\n${p2.trim()}\n</select>`;
  });

  // Ensure the <fieldset> block starts on a new line and remove extra blank lines
  formattedHtml = formattedHtml.replace(/(<fieldset\s+[^>]*>)/g, (match) => {
    // Ensure <fieldset> starts on a new line
    return `\n${match}\n`;
  }).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}


renderRangeField(type, name, label, validate, attributes) {
  const rangeValidationAttributes = ['required', 'min', 'max', 'step'];

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (rangeValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += `  ${key}\n`;
        } else {
          validationAttrs += `  ${key}="${value}"\n`;
        }
      } else {
        console.warn(`Unsupported validation attribute '${key}' for field '${name}' of type 'range'.`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
    if (attributes.binding === 'bind:value' && name) {
      bindingDirective = `bind:value="${name}"\n`;
    } else if (attributes.binding.startsWith('::') && name) {
      bindingDirective = `bind:value="${name}"\n`;
    } else if (attributes.binding && !name) {
      console.log(`You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
      return;
    }
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
    if (key !== 'id' && key !== 'class' && value !== undefined) {
      if (key.startsWith('on')) {
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += `  @${key.replace(/^on/, '')}={${eventValue}}\n`;
      } else {
        if (value === true) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}\n`;
        } else if (value !== false) {
          additionalAttrs += `  ${key.replace(/_/g, '-')}="${value}"\n`;
        }
      }
    }
  }

  // Handle class attribute
  let inputClass = attributes.class || this.inputClass;

  // Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id}-block">
      <label for="${id}">${label}
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${additionalAttrs.includes('placeholder') ? '' : (this.formSettings.placeholders ? `placeholder="${label}"` : '')}
      />
      <span id="${id}-value">50</span> <!-- Displays the range value dynamically -->
    </div>
  `.replace(/^\s*\n/gm, '').trim();

  // Apply vertical layout to the <input> element only
  formHTML = formHTML.replace(/<input\s+([^>]*)\/>/, (match, p1) => {
    const attributes = p1.trim().split(/\s+/).map(attr => `  ${attr}`).join('\n');
    return `<input\n${attributes}\n/>`;
  });

  this.formMarkUp += formHTML;
}



/*
renderRangeField(type, name, label, validate, attributes) {
  const rangeValidationAttributes = ['required', 'min', 'max', 'step'];

  // Validate required parameters
  if (!type || !name || !label) {
    throw new Error('Missing required parameters: type, name, or label.');
  }

  // Construct validation attributes
  let validationAttrs = '';
  if (validate) {
    Object.entries(validate).forEach(([key, value]) => {
      if (rangeValidationAttributes.includes(key)) {
        if (typeof value === 'boolean' && value) {
          validationAttrs += ` ${key}`;
        } else {
          validationAttrs += ` ${key}="${value}"`;
        }
      } else {
        console.warn(`Unsupported validation attribute '${key}' for field '${name}' of type 'range'.`);
      }
    });
  }

  // Handle the binding syntax
  let bindingDirective = '';
  if (attributes.binding) {
    if (attributes.binding === 'bind:value' && name) {
      bindingDirective = `bind:value="${name}"`;
    } else if (attributes.binding.startsWith('::') && name) {
      bindingDirective = `bind:value="${name}"`;
    } else if (attributes.binding && !name) {
      console.error(`You cannot set binding value when there is no name attribute defined in ${name} ${type} field.`);
      return;
    }
  }

  // Get the id from attributes or fall back to name
  let id = attributes.id || name;

  // Construct additional attributes dynamically
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
    if (key !== 'id' && key !== 'class' && value !== undefined) {
      if (key.startsWith('on')) {
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += ` @${key.replace(/^on/, '')}={${eventValue}}`;
      } else {
        if (value === true) {
          additionalAttrs += ` ${key.replace(/_/g, '-')}`;
        } else if (value !== false) {
          additionalAttrs += ` ${key.replace(/_/g, '-')}="${value}"`;
        }
      }
    }
  }

  // Handle class attribute
  let inputClass = attributes.class || this.inputClass;

  // Construct the final HTML string
  let formHTML = `
    <div class="${this.divClass}" id="${id}-block">
      <label for="${id}">${label}
        ${validationAttrs.includes('required') && this.formSettings.requiredFieldIndicator ? this.formSettings.asteriskHtml : ''}
      </label>
      <input 
        type="${type}"
        name="${name}"
        ${bindingDirective}
        id="${id}"
        class="${inputClass}"
        ${additionalAttrs}
        ${validationAttrs}
        ${this.formSettings.placeholders ? `placeholder="${label}"` : ''}
      />
      <span id="${id}-value">50</span> <!-- Displays the range value dynamically -->
    </div>
  `;

  this.formMarkUp += formHTML;
}

*/


/* DYNAMIC SINGLE SELECT BLOCK */






/* END DYNAMIC SINGLE SELECT BLOCK */



renderSubmitButton(type, name, label, validate, attributes) {
  // Define id attribute or fallback to name
  const id = attributes.id || name;

  // Handle additional attributes§
  let additionalAttrs = '';
  for (const [key, value] of Object.entries(attributes)) {
  if (key !== 'id' && key !== 'class' && key !== 'dependsOn' && key !== 'dependents' && value !== undefined) {      if (key.startsWith('on')) {
        // Handle event attributes
        const eventValue = value.endsWith('()') ? value.slice(0, -2) : value;
        additionalAttrs += ` ${key}="${eventValue}"`;
      } else {
        // Handle boolean attributes
        if (value === true) {
          additionalAttrs += ` ${key.replace(/_/g, '-')}`;
        } else if (value !== false) {
          // Convert underscores to hyphens and set the attribute
          additionalAttrs += ` ${key.replace(/_/g, '-')}="${value}"`;
        }
      }
    }
  }

  let submitButtonClass;
  if ('class' in attributes) {
    submitButtonClass=attributes.class;
  } else {
    submitButtonClass=this.submitButtonClass; 
  }


const spinner = `<div class="" id="formiqueSpinner">
  <div class="formique-spinner"></div>
  <p class="message">Hang in tight, we are submitting your details…</p>
</div>`;
  // Construct the final HTML string

  const formHTML = `
    ${spinner}
    <input type="${type}"
      id="${id + '-block'}"
      class="${submitButtonClass}"
      value="${label}"
      ${additionalAttrs}
    />
  `.replace(/^\s*\n/gm, '').trim();

  let formattedHtml = formHTML; 

  //return formattedHtml;
  this.formMarkUp +=formattedHtml;
}





 renderFormHTML () {

this.formMarkUp+= '</form>'; 
//console.log(this.formMarkUp);
const formContainer = document.getElementById(this.formContainerId);
//alert(this.formContainerId);
if (!formContainer) {
  console.error(`Error: formContainer not found. Please ensure an element with id ${this.formContainerId} exists in the HTML.`);
} else {
  formContainer.innerHTML = this.formMarkUp;
}

//return this.formMarkUp;


 }




// no renderMethod below here
}



export default Formique;











