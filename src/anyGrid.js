"use strict";
class AnyGrid {
  constructor(data, columns, options = {}) {
    this.data = data;
    this.dataApiEndPoint=options.dataApiEndPoint || null;
    this.totalRecords = data.length;
    this.columns = columns;
    this.itemsPerPage = options.initialItemsPerPage || 10;
    this.currentPage = 1;
    this.tbody = null;
    this.searchInput = null;
    this.paginationContainer = null;
    this.filteredData = this.data;
    this.sortingOrder = {};
    this.dataTableId = this.generateUniqueId('anygrid-datatable');
    this.paginationContainerId = this.generateUniqueId('anygrid-pagination');
    this.searchInputId = this.generateUniqueId('search-input');
    this.itemsPerPageId = this.generateUniqueId('items-per-page');
    this.gridContainerId = options.gridContainerId || 'anygrid';


    // AnyGrid Default Settings
    // Default Features (including modal defaults)
    const defaultFeatures = {
      // Core Grid Features
      search: true,
      sort: true,
      actions: true,
      pagination: true,
      itemsPerPage: true,
      dynamicHeaders: true,
      mode: 'datagrid',
      theme: 'default',
      initialItemsPerPage: 10,
      
      // Modal Features
      gridModal: false,
      modalConfig: {
        editable: false,
        nonEditableFields:['id'],
        deletable: false,
        animation: 'fade',
        closeOnOutsideClick: true,
        confirmDelete: true,
        confirmEdit: true
      }

    }

   // Merging user defined features with defaults
   // Deep Merge User Options
    this.features = {
      ...defaultFeatures,
      ...options,
      modalConfig: {
        ...defaultFeatures.modalConfig,
        ...(options.modalConfig || {})
      }
    };


        // Initialize the data grid
    this.initializeDataGrid();


    if (options.themeColor) {
      this.applyDynamicTheme(options.themeColor, this.gridContainerId);
    } else if (this.features.theme) {
      let theme = this.features.theme;
      if (theme === 'dark') theme = 'default';
      this.applyTheme(theme, this.gridContainerId);
    } else {
      this.applyTheme('dark', this.gridContainerId);
    }
    
  /*
 if (this.features.theme) {
      //alert(this.features.theme);
      let theme = this.features.theme;
      if (theme==='dark') theme ='default';
      this.applyTheme(theme, this.gridContainerId);
    } else {
      this.applyTheme('dark', this.gridContainerId);
    }
*/


    //console.log(this.features.search);

    // Set up search input (only if search is enabled)
    if (this.features.search) {
      this.searchInput = document.getElementById(`${this.searchInputId}`);
      this.searchInput.addEventListener('input', this.searchTable.bind(this));
    }


    // ONLY NEW CODE FOR THIS STEP:

     this._editState = {
      originalRecord: null,    // Store original values
      pendingChanges: {}       // Track changed fields
    };


    if (this.features.gridModal) {
      this._initModalStructure();
      this._setupRowClickHandlers();

      // Add to your modal initialization (where delete button is created)
this.modalElement.querySelector('.anygrid-btn-delete').addEventListener('click', () => {
  this._handleDeleteRecord();
});

    }

    // TEST: Verify merged configuration
    //console.log(this.features)


   
  }

  // CLOSE CONSTRUCTOR HERE


applyDynamicTheme(color, gridContainerId) {
    const gridContainer = document.getElementById(gridContainerId);
    if (!gridContainer) {
      console.error(`Grid container with ID '${gridContainerId}' not found.`);
      return;
    }

    // Remove any existing theme classes
    const themeClasses = Array.from(gridContainer.classList).filter(cls => 
      cls.endsWith('-theme')
    );
    themeClasses.forEach(cls => gridContainer.classList.remove(cls));

    // Add dynamic theme class
    gridContainer.classList.add('dynamic-theme');

    // Generate CSS variables based on the provided color
    const primaryColor = this.hexToRgb(color);
    const style = document.createElement('style');
    style.id = 'anygrid-dynamic-theme';
    
    // Remove existing dynamic theme if it exists
    const existingStyle = document.getElementById('anygrid-dynamic-theme');
    if (existingStyle) existingStyle.remove();

    // Calculate theme colors - mostly using light theme values with accent color for key elements
    const themeCSS = `
      .dynamic-theme {
        --background-dark: #ededeb; /* Keep light theme value */
        --background-light: #f9f9f9; /* Keep light theme value */
        --text-light: #333333; /* Keep light theme value */
        --border-color: #cccccc; /* Keep light theme value */
        --input-background: #ffffff; /* Keep light theme value */
        --input-background-disabled: #e0e0e0; /* Keep light theme value */
        --label-color: ${color}; /* Use theme color */
        --radio-checkbox-accent: ${color}; /* Use theme color */
        --button-background: ${this.lightenColor(color, 20)}; /* Very light version of theme color */
        --button-background-hover: ${this.lightenColor(color, 50)}; /* Slightly darker */
        --edit-background: #e91e63; /* Keep light theme value (red) */
        --delete-background: #dc3545; /* Keep light theme value (red) */
        --text-contrast: #ffffff; /* Keep light theme value */
        --shadow-color: rgba(79, 77, 77, 0.1); /* Keep light theme value */
        --primary-color: ${color}; /* Use theme color */
        --primary-color-rgb: ${primaryColor};
        --hover-bg: ${this.lightenColor(color, 90)}; /* Very subtle hover effect */
        
        /* Additional variables for consistency */
        --focus-shadow: 0 0 0 0.2rem ${this.hexToRgb(color, 0.25)};
        --link-color: ${color};
        --link-hover-color: ${this.lightenColor(color, 30)};
      }
    `;

    style.textContent = themeCSS;
    document.head.appendChild(style);
}
  // Helper function to lighten a color
  lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1)}`;
  }

  // Helper function to convert hex to rgb
  hexToRgb(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return alpha === 1 
      ? `rgb(${r}, ${g}, ${b})`
      : `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

// ========================
// MODAL METHODS (SEQUENTIAL ORDER)
// ========================

/**
 * 1. Initialize modal structure
 */
_initModalStructure() {
  // Create modal container
  this.modalElement = document.createElement('div');
  this.modalElement.className = `anygrid-modal ${this.features.modalConfig.animation}`;
  this.modalElement.style.display = 'none';

  // Modal structure
  this.modalElement.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">×</button>
      <div class="modal-body"></div>
      ${this.features.modalConfig.deletable ? 
        '<div class="modal-footer"><button class="anygrid-btn-delete">Delete</button></div>' : ''}
    </div>
    <div class="modal-backdrop"></div>
  `;

  document.body.appendChild(this.modalElement);
  
  // Close handlers
  this.modalElement.querySelector('.modal-close').addEventListener('click', () => {
    this._hideModal();
  });
  
  if (this.features.modalConfig.closeOnOutsideClick) {
    this.modalElement.querySelector('.modal-backdrop').addEventListener('click', () => {
      this._hideModal();
    });
  }
}

/**
 * 2. Setup row click handlers (triggered from constructor)
 */
_setupRowClickHandlers() {
  if (!this.tbody) {
    console.warn('Tbody not found - check initializeGrid()');
    return;
  }

  this.tbody.addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if (!row) return;

    const rowIndex = row.dataset.rowIndex || 
                    Array.from(this.tbody.children).indexOf(row);
    const record = this.filteredData[rowIndex];

    if (record) {
      this._showModalWithData(record);
    }
  });

  this.tbody.style.cursor = 'pointer';
}

/**
 * 3. Show modal with record data
 */
_showModalWithData(record) {
  if (!this.modalElement) return;
  
  this.currentRecord = record; // Store current record
  const modalBody = this.modalElement.querySelector('.modal-body');

  if (this.features.modalConfig.editable) {
    // Click-to-edit version
    modalBody.innerHTML = Object.entries(record)
      .map(([key, value]) => `
        <div class="record-field" data-field="${key}">
          <strong>${key}:</strong>
          <span class="field-value">${value}</span>
        </div>
      `).join('');
      
    this._setupClickToEdit();
  } else {
    // Read-only version
    modalBody.innerHTML = Object.entries(record)
      .map(([key, value]) => `
        <div class="record-field">
          <strong>${key}:</strong>
          <span>${value}</span>
        </div>
      `).join('');
  }

  // Setup footer buttons if editable
  if (this.features.modalConfig.editable) {
    this._setupModalFooter();
  }

   this._editState.originalRecord = {...record};
  this._editState.pendingChanges = {};

  this.modalElement.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

/**
 * 4. Setup click-to-edit handlers
 */
_setupClickToEdit() {
  const fields = this.modalElement.querySelectorAll('.record-field');
  
  // Define non-editable fields (can also be configured via modalOptions)
  const nonEditableFields = [
    ...['id', 'uuid', 'created_at', 'updated_at'], // Default system fields
    ...(this.features.modalConfig.nonEditableFields || []) // User-specified fields
  ];
  
  fields.forEach(field => {
    const fieldName = field.dataset.field;
    const isEditable = !nonEditableFields.includes(fieldName);
    
    if (!isEditable) {
      // Visual indication of non-editable fields
      field.classList.add('non-editable');
      field.style.cursor = 'not-allowed';
      return;
    }
    
    // Only make clickable if editable
    field.style.cursor = 'pointer';
    
    field.addEventListener('click', (e) => {
      if (!isEditable || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
      
      const valueElement = field.querySelector('.field-value');
      const currentValue = valueElement.textContent;
      
      valueElement.innerHTML = `
        <input type="text" value="${currentValue}" 
               data-field="${fieldName}"
               class="field-input">
      `;
      
      const input = valueElement.querySelector('input');
      input.focus();
      input.select();
      
      const saveEdit = () => this._saveFieldEdit(field, fieldName, input);
      
      input.addEventListener('blur', saveEdit);
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') saveEdit();
      });
    });
  });
}

/**
 * 5. Setup modal footer buttons
 */
_setupModalFooter() {
  // Get or create footer
  let footer = this.modalElement.querySelector('.modal-footer');
  if (!footer) {
    footer = document.createElement('div');
    footer.className = 'modal-footer';
    this.modalElement.querySelector('.modal-content').appendChild(footer);
  }
  
  // Clear existing save button (if any)
  const existingSaveBtn = footer.querySelector('.btn-save');
  if (existingSaveBtn) {
    existingSaveBtn.remove();
  }
  
  // Add new save button if editable
  if (this.features.modalConfig.editable) {
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-save';
    saveBtn.textContent = 'Save All Changes';
    saveBtn.addEventListener('click', () => this._saveAllEdits());
    footer.prepend(saveBtn); // Add at beginning
  }
  
  // Handle delete button (only add once)
  if (this.features.modalConfig.deletable && !footer.querySelector('.anygrid-btn-delete')) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'anygrid-btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => this._handleDelete());
    footer.appendChild(deleteBtn);
  }
}

/**
 * 6. Save individual field edit
 */
_saveFieldEdit(fieldElement, fieldName, inputElement) {
  const newValue = inputElement.value;
  fieldElement.querySelector('.field-value').textContent = newValue;
  this.currentRecord[fieldName] = newValue;

  if (this.features.modalConfig.confirmEdit) {
    const confirmation = document.createElement('span');
    confirmation.className = 'edit-confirmation';
    confirmation.textContent = '✓ Saved';
    fieldElement.appendChild(confirmation);
    
    setTimeout(() => confirmation.remove(), 2000);
  }
}

/**
 * 7. Save all edits (footer button)
 */
_saveAllEdits() {
  const changes = {};
  const fields = this.modalElement.querySelectorAll('.record-field');
  
  fields.forEach(field => {
    const fieldName = field.dataset.field;
    const value = field.querySelector('.field-value').textContent;
    changes[fieldName] = value;
    this.currentRecord[fieldName] = value;
  });

  console.log('All changes saved:', changes);
  
  if (this.features.modalConfig.confirmEdit) {
    alert('All changes saved successfully!');
  }
}

/**
 * 8. Hide modal
 */
_hideModal() {
  if (!this.modalElement) return;
  this.modalElement.style.display = 'none';
  document.body.style.overflow = '';
  this.currentRecord = null;
}
 
  // ==============================================
  // EXISTING METHODS (below)
  // ==============================================
  

  generateUniqueId(prefix) {
    const randomPart = Math.random().toString(36).substring(2, 7); // Generate a 5-character random string
    return `${prefix}-${randomPart}`;
  }

  // Initialize the data grid layout and event listeners
  initializeDataGrid() {
    const dataGrid = document.getElementById(this.gridContainerId);

    if (dataGrid) {
      const options = [5, 10, 20, 50, 100]; // Define possible itemsPerPage options

      // Generate select options dynamically if itemsPerPage feature is enabled
      const selectOptions = this.features.itemsPerPage ? options.map(option => `
        <option value="${option}" ${option === this.itemsPerPage ? 'selected' : ''}>${option}</option>
      `).join('') : '';

      // Add a CSV export button if csvExport is enabled
    const exportButtonHTML = this.features.csvExport ? `
      <button id="export-csv-${this.gridContainerId}" class="anygrid-export-csv">Export CSV</button>
    ` : '';


     // Add a CSV export button if csvExport is enabled
    const exportExcelButtonHTML = this.features.excelExport ? `
      <button id="export-excel-${this.gridContainerId}" class="anygrid-export-excel">Export EXCEL</button>
    ` : '';

      const htmlContent = `
        <div class="search-container"> 
          ${this.features.search ? `<input type="text" id="${this.searchInputId}" class="anygrid-search-input" placeholder="Search...">` : ''}
          ${this.features.itemsPerPage ? `<select id="${this.itemsPerPageId}" class="items-per-page">${selectOptions}</select>` : ''}
          ${exportButtonHTML} ${exportExcelButtonHTML}
        </div>
        
        <table class="anygrid-table" id="${this.dataTableId}">
          <thead>
            <tr></tr>
          </thead>
          <tbody></tbody>
        </table>
        ${this.features.pagination ? `<div id="${this.paginationContainerId}" class="anygrid-pagination"></div>` : ''}
      `;

      //dataGrid.insertAdjacentHTML('afterbegin', htmlContent);

      // Create a template
        const template = document.createElement('template');
        template.innerHTML = htmlContent.trim();

        // Clone the template content
        const clone = template.content.cloneNode(true);

        // Append the cloned content to the data grid container
        dataGrid.appendChild(clone);

      // Bind the CSV export button click event
    if (this.features.csvExport) {
      const exportButton = document.getElementById(`export-csv-${this.gridContainerId}`);
      exportButton.addEventListener('click', this.exportToCSV.bind(this));
    }


 if (this.features.excelExport) {
      const exportExcelButton = document.getElementById(`export-excel-${this.gridContainerId}`);
      exportExcelButton.addEventListener('click', this.exportToExcel.bind(this));
    }

      // Set up event listeners for items per page and search input (only if those features are enabled)
      if (this.features.itemsPerPage) {
        const itemsPerPageSelect = document.getElementById(`${this.itemsPerPageId}`);
        itemsPerPageSelect.value = this.itemsPerPage; // Set the initial value
        itemsPerPageSelect.addEventListener('change', (event) => {
          this.itemsPerPage = parseInt(event.target.value); // Update the value
          this.currentPage = 1; // Reset the current page
          this.renderData();
          this.updatePagination();
        });
      }

      if (this.features.search) {
  this.searchInput = document.getElementById(this.searchInputId);
  this.searchInput.addEventListener('input', this.searchTable.bind(this)); // Bind searchTable function to 'input' event
}


      this.tbody = document.querySelector(`#${this.dataTableId} tbody`);
      this.paginationContainer = document.getElementById(`${this.paginationContainerId}`);

      this.renderData(this.filteredData);
      this.updatePagination();
    }
  }

  renderData() {
  // Safeguard: Ensure filteredData is always an array
  if (!Array.isArray(this.filteredData)) {
    console.warn('filteredData is not an array - resetting to empty array');
    this.filteredData = [];
  }

  // Clear existing content
  this.tbody.innerHTML = '';
  const headerRow = document.querySelector(`#${this.dataTableId} thead tr`);
  
  // Safeguard: Ensure headerRow exists
  if (!headerRow) {
    console.error('Header row not found!');
    return;
  }
  
  headerRow.innerHTML = '';

  // Create table headers (only if dynamic headers are enabled)
  if (this.features.dynamicHeaders) {
    this.columns.forEach((column, index) => {
      // Skip if column is hidden or invalid
      if (!column || column.hidden) return;

      const headerCell = document.createElement('th');
      
      // Safeguard: Fallback for missing label/header
      headerCell.textContent = column.label || column.header || `Column ${index}`;
      
      if (column.joinedColumns) {
        // Safeguard: Ensure joinedColumns is an array
        if (Array.isArray(column.joinedColumns)) {
          // Don't set colspan here - we'll handle it in the data cells
        }
      } else if (this.features.sort && column.sortable) {
        headerCell.dataset.index = index;
        
        // Safeguard: Ensure sortTable exists before adding listener
        if (typeof this.sortTable === 'function') {
          headerCell.addEventListener('click', () => this.sortTable(index));
        }

        const sortableIcon = document.createElement('span');
        sortableIcon.innerHTML = ' ⇅';
        sortableIcon.style.fontSize = '1.1em';
        sortableIcon.style.marginLeft = '0.2em';
        sortableIcon.className = 'anygrid-column-sortable';
        headerCell.appendChild(sortableIcon);
      }
      
      headerRow.appendChild(headerCell);
    });
  }

  // Calculate pagination bounds
  let startIndex, endIndex;
  
  if (this.features.pagination) {
    const itemsPerPage = Math.max(1, parseInt(this.itemsPerPage) || 10);
    startIndex = (Math.max(1, this.currentPage) - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, this.filteredData.length);
  } else {
    startIndex = 0;
    endIndex = this.filteredData.length;
  }

  // Safeguard: Ensure slice bounds are valid
  const displayData = this.filteredData.slice(
    Math.max(0, startIndex),
    Math.min(this.filteredData.length, endIndex)
  );

  // Render rows
  displayData.forEach((row, rowIndex) => {
    // Safeguard: Skip invalid rows
    if (!row || typeof row !== 'object') return;
    const tr = document.createElement('tr');

    this.columns.forEach((column) => {
      if (!column || column.hidden) return;

      if (column.joinedColumns && Array.isArray(column.joinedColumns)) {
        // Handle joined columns - create one cell that combines all values
        const cell = document.createElement('td');
        const value = column.joinedColumns.map(col => row[col]).join(' ');
        cell.textContent = value;
        tr.appendChild(cell);
      } else {
        // Normal column
        const cell = document.createElement('td');
        let value = row[column.name];
        cell.setAttribute('data-id', column.name);
       

        if(column.name === 'id') tr.setAttribute('data-id', value); 


        // Handle null/undefined values
        if (value == null) value = '';

        if (column.render) {
          try {
            if (typeof column.render === 'string') {
              cell.innerHTML = column.render.replace(`{${column.name}}`, value);
            } else if (typeof column.render === 'function') {
              cell.innerHTML = column.render(value, row);
            }
          } catch (e) {
            console.error('Error in column render:', e);
            cell.textContent = value;
          }
        } else {
          cell.textContent = value;
        }
        
        tr.appendChild(cell);
      }
    });

    this.tbody.appendChild(tr);
  });

  // Update pagination if enabled
  if (this.features.pagination) {
    this.updatePagination();
  }
}

  updatePagination() {
  if (this.features.pagination) {
    const itemsPerPage = this.itemsPerPage;
    const totalPages = Math.ceil(this.filteredData.length / itemsPerPage);
    const startPage = Math.max(1, this.currentPage - 5);
    const endPage = Math.min(startPage + 9, totalPages);

    // Clear the pagination container
    this.paginationContainer.innerHTML = '';

    // Create a container for pagination info and buttons
    const paginationWrapper = document.createElement('div');
    paginationWrapper.classList.add('pagination-wrapper');

    // Add the "Showing X to Y of Z records" text
    const startIndex = (this.currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(this.currentPage * itemsPerPage, this.totalRecords);
    const totalRecords = this.totalRecords;

    const paginationInfo = document.createElement('div');
    paginationInfo.classList.add('pagination-info');
    paginationInfo.textContent = `Showing ${startIndex} to ${endIndex} of ${totalRecords} records`;

    // Create a container for the buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pagination-buttons');

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');

      if (i === this.currentPage) {
        button.classList.add('active');
      }

      button.onclick = () => {
        this.currentPage = i;
        this.renderData();
      };

      buttonsContainer.appendChild(button);
    }

    // Append info and buttons to the wrapper
    paginationWrapper.appendChild(paginationInfo);
    paginationWrapper.appendChild(buttonsContainer);

    // Append the wrapper to the pagination container
    this.paginationContainer.appendChild(paginationWrapper);
  }
}

  // Implement sorting functionality (only if sorting is enabled)
  sortTable(index) {
    if (this.features.sort) {
      const column = this.columns[index];
      const isAsc = this.sortingOrder[column.name] !== 'asc';
      const sortedData = [...this.filteredData].sort((a, b) => {
        let valueA = a[column.name];
        let valueB = b[column.name];
        if (column.type === 'number') {
          valueA = parseFloat(valueA);
          valueB = parseFloat(valueB);
        }
        return isAsc ? valueA - valueB : valueB - valueA;
      });

      this.filteredData = sortedData;
      this.sortingOrder[column.name] = isAsc ? 'asc' : 'desc';
      this.renderData();
    }
  }

  // Implement search functionality (only if search is enabled)
searchTable() {
  const query = this.searchInput.value.toLowerCase();  // Get search query and make it lowercase

  // Filter the data based on the query
  this.filteredData = this.data.filter((row) =>
    this.columns.some((column) => {
      // Retrieve the column value to search through
      let value = column.joinedColumns ? 
        column.joinedColumns.map(col => row[col]).join(' ') : 
        row[column.name];

      // Ensure the value is a string and make it lowercase
      if (value == null) value = '';  // Handle null or undefined
      if (typeof value !== 'string') value = String(value);  // Convert non-strings to strings

      return value.toLowerCase().includes(query);  // Return true if query is found in the column value
    })
  );

  // Reset to first page on new search to avoid displaying empty pages
  this.currentPage = 1;

  // Re-render the table with filtered data
  this.renderData();
}



applyTheme(theme, gridContainerId) {
  // Find the stylesheet link referencing anyGrid.css
  const stylesheet = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .find(link => link.href.includes('anyGrid.css'));

  if (!stylesheet) {
    console.error("Stylesheet referencing 'anyGrid.css' not found!");
    return; // Exit this function gracefully — no fatal error
  }

  fetch(stylesheet.href)
    .then(response => response.text())
    .then(cssText => {
      // Extract theme-specific CSS rules
      const themeRules = cssText.match(new RegExp(`\\.${theme}-theme\\s*{([^}]*)}`, 'i'));

      if (!themeRules) {
        console.error(`Theme rules for '${theme}' not found in the stylesheet.`);
        return;
      }

      const themeCSS = themeRules[1].trim();
      const gridContainer = document.getElementById(gridContainerId);

      if (gridContainer) {
        gridContainer.classList.add(`${theme}-theme`);

        const clonedStyle = document.createElement('style');
        clonedStyle.textContent = `
          #${gridContainerId} {
            ${themeCSS}
          }
        `;

        gridContainer.parentNode.insertBefore(clonedStyle, gridContainer);

        console.log(`Applied '${theme}' theme to grid container: ${gridContainerId}`);
      } else {
        console.error(`Grid container with ID '${gridContainerId}' not found.`);
      }
    })
    .catch(error => {
      console.error('Error loading the stylesheet:', error);
    });
}



/* PREMIUM FEATURES BLOCK */

exportToCSV(event) {
  const tableId = event.target.id.replace('export-csv-', ''); // Extract the dataTableId
  const tableInstance = this;  // `this` refers to the instance calling the method
  
  if (this.features.csvExport) {
    const headers = this.columns.map(col => col.label || col.header).join(',');
    const rows = this.filteredData.map(row => {
      return this.columns.map(col => {
        let value = col.joinedColumns ? col.joinedColumns.map(c => row[c]).join(' ') : row[col.name];
        return `"${String(value).replace(/"/g, '""')}"`; // Escape quotes
      }).join(',');
    }).join('\n');

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data-${tableId}.csv`);
    link.click();
  }
}


exportToExcel(event) {
  const tableId = event.target.id.replace('export-excel-', ''); // Extract the dataTableId
  const tableInstance = this; // `this` refers to the instance calling the method

  if (this.features.excelExport) {
    // Create Excel XML content
    let xml = `
      <xml version="1.0" encoding="UTF-8"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                xmlns:html="http://www.w3.org/TR/REC-html40">
        <Worksheet ss:Name="Sheet1">
          <Table>
    `;

    // Add headers
    xml += '<Row>';
    this.columns.forEach(col => {
      xml += `<Cell><Data ss:Type="String">${col.label || col.header}</Data></Cell>`;
    });
    xml += '</Row>';

    // Add data rows
    this.filteredData.forEach(row => {
      xml += '<Row>';
      this.columns.forEach(col => {
        let value = col.joinedColumns ? col.joinedColumns.map(c => row[c]).join(' ') : row[col.name];
        const cellType = isNaN(value) ? 'String' : 'Number';
        xml += `<Cell><Data ss:Type="${cellType}">${value}</Data></Cell>`;
      });
      xml += '</Row>';
    });

    xml += `
          </Table>
        </Worksheet>
      </Workbook>
    `;

    // Create Blob and download
    const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-${tableId}.xls`);
    link.click();
  }
}

// ========================
// MODAL EDITING SEQUENCE (with UI updates)
// ========================

// 1. FIRST: Called when user clicks Save button
// ========================
// MODAL CONTENT METHODS
// ========================

/**
 * Generates read-only modal content
 */
_getReadOnlyContent(record) {
  return Object.entries(record)
    .filter(([key]) => !key.startsWith('_')) // Skip internal fields
    .map(([key, value]) => `
      <div class="record-field">
        <strong>${key}:</strong>
        <span class="field-value">${value !== null ? value : 'null'}</span>
      </div>
    `).join('');
}

/**
 * Refreshes modal content while preserving state
 */
_refreshModalContent(updatedRecord) {
  const modalBody = this.modalElement.querySelector('.modal-body');
  if (!modalBody) return;
  
  const isEditMode = modalBody.querySelector('input') !== null;
  
  if (isEditMode) {
    // Update existing inputs without rebuilding
    this.columns.forEach(column => {
      const input = modalBody.querySelector(`input[data-field="${column.field}"]`);
      if (input) input.value = updatedRecord[column.field] ?? '';
    });
  } else {
    // Rebuild read-only view using the new method
    modalBody.innerHTML = this._getReadOnlyContent(updatedRecord);
  }
}

// ========================
// UPDATED SAVE METHOD
// ========================

async _saveAllEdits() {
  if (!this.currentRecord?.id) {
    this._showStatusMessage('No record loaded', 'error');
    return;
  }

  try {
    const changes = this._getChangedFields();
    if (Object.keys(changes).length === 0) {
      this._showStatusMessage('No changes detected', 'info');
      return;
    }

    const result = await this._recordUpdateApi({
      recordId: this.currentRecord.id,
      ...changes
    });

    this._refreshUIAfterEdit(result); // This is the only added line
    this._showSuccessMessage();

  } catch (error) {
    this._showErrorMessage(error.message);
  }
}

// 2. SECOND: Field value extraction
_getFieldValue(element) {
  // Handle all standard input types
  if (element.tagName === 'INPUT') {
    switch (element.type) {
      case 'checkbox':
      case 'radio':
        return element.checked;
      case 'number':
        return element.value ? Number(element.value) : null;
      case 'date':
        return element.valueAsDate;
      default:
        return element.value;
    }
  }
  
  if (element.tagName === 'SELECT') {
    return element.multiple 
      ? Array.from(element.selectedOptions).map(opt => opt.value)
      : element.value;
  }
  
  return element.textContent;
}

// 3. THIRD: Gets changed fields from DOM
_getChangedFields() {
  const changes = {};
  const fields = this.modalElement.querySelectorAll('.record-field[data-field]');
  
  fields.forEach(field => {
    const fieldName = field.dataset.field;
    const valueEl = field.querySelector('.field-value');
    if (!valueEl) return;
    
    const currentValue = this._extractCleanValue(valueEl.textContent);
    const originalValue = this._editState.originalRecord[fieldName];
    
    if (currentValue !== originalValue) {
      changes[fieldName] = currentValue;
    }
  });
  
  return changes;
}

_extractCleanValue(formattedText) {
  if (!formattedText) return null;
  const value = formattedText.split(':').pop().replace('✓ Saved', '').trim();
  if (value === 'null') return null;
  
  if (formattedText.includes('metadata:')) {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  }
  
  return value;
}

// 4. FOURTH: API communication
async _recordUpdateApi(dataUpdate) {
  if (!dataUpdate.recordId) throw new Error('recordId is required');

  const endpoint = `${this.dataApiEndPoint}/${dataUpdate.recordId}`;
  const payload = { ...dataUpdate };
  delete payload.recordId;

  // Get the list of non-editable fields
  const nonEditable = (this.features?.modalConfig?.nonEditableFields || []);

  // Clean and filter payload values
  Object.keys(payload).forEach(key => {
    if (nonEditable.includes(key)) {
      delete payload[key];
    } else {
      payload[key] = this._cleanPayloadValue(payload[key]);
    }
  });

  console.debug('API Payload:', payload);

  try {
    this._showLoadingState(true);

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    this._showLoadingState(false);
  }
}


_cleanPayloadValue(value) {
  if (value === null || value === undefined || value === 'null') return null;
  if (!isNaN(value) && value !== '') return Number(value);
  return value;
}

// ========================
// UI UPDATE METHODS (NEW)
// ========================
/**
 * Refreshes all UI elements after edit
 */
_refreshUIAfterEdit(updatedRecord) {
  // Update current record
  this.currentRecord = updatedRecord;
  console.log("current Update Record", JSON.stringify(updatedRecord));

  // Update data grid
  this._updateDataObject();
  
  // Update data grid
  //this._updateDataGridRow(updatedRecord);

  this.renderData();


  this._showModalWithData(updatedRecord);

  
  // Update modal if open
  /*
  if (this.modalElement.style.display === 'block') {
    this._refreshModalContent(updatedRecord);
  }
  */
  // Visual feedback
  this._highlightUpdatedRow(updatedRecord.id);
}



/**
 * update data object first
 */

_updateDataObject() {

  const index = this.data.findIndex(item => item.id === this.currentRecord.id);
  if (index !== -1) {
    this.data[index] = { ...this.data[index], ...this.currentRecord };
  }

  //console.log("DO Updated", JSON.stringify(this.data,null,2));
}


_deleteFromDataObject() {
  const index = this.data.findIndex(item => item.id === this.currentRecord.id);
  if (index !== -1) {
    this.data.splice(index, 1); // Removes the item at the found index
  }

  // console.log("DO Updated (After Delete)", JSON.stringify(this.data, null, 2));
}



/**
 * Updates specific row in data grid
 */
/*
_updateDataGridRow() {
  if (!this.tbody || !this.currentRecord || !this.currentRecord.id) return;

  const recordId = String(this.currentRecord.id);
  const row = this.tbody.querySelector(`tr[data-id="${recordId}"]`);
  if (!row) return;

  const cells = row.querySelectorAll('td[data-id]');

  cells.forEach(cell => {
    const field = cell.getAttribute('data-id');
    const value = this.currentRecord[field] ?? '';

    // If cell contains an <a>, update its text and href (for id fields)
    const anchor = cell.querySelector('a');
    if (anchor) {
      anchor.textContent = value;
      if (field === 'id') {
        anchor.href = `/user/profile/${value}`;
      }
    } else {
      cell.textContent = value;
    }
  });
}
*/


/**
 * Refreshes modal content while preserving state
 */

/*
_refreshModalContent(updatedRecord) {
  const modalBody = this.modalElement.querySelector('.modal-body');
  if (!modalBody) return;
  
  const isEditMode = modalBody.querySelector('input') !== null;
  
  if (isEditMode) {
    // Update inputs without rebuilding
    this.columns.forEach(column => {
      const input = modalBody.querySelector(`input[data-field="${column.field}"]`);
      if (input) input.value = updatedRecord[column.field] ?? '';
    });
  } else {
    // Rebuild read-only view
    modalBody.innerHTML = this._getReadOnlyContent(updatedRecord);
  }
}

*/


/**
 * Visual feedback for updated row
 */
_highlightUpdatedRow(recordId) {
  if (!this.tbody || !recordId) return;

  const row = this.tbody.querySelector(`tr[data-id="${String(recordId)}"]`);
  if (!row) return;

  row.classList.remove('row-updated'); // reset
  void row.offsetWidth;                // force reflow
  row.classList.add('row-updated');    // reapply class

  setTimeout(() => {
    row.classList.remove('row-updated');
  }, 10000);
}


/**
 * Minimal UI Status Methods
 */
_showLoadingState(show) {
  const footer = this.modalElement.querySelector('.modal-footer');
  if (!footer) return;
  
  if (show) {
    const loader = document.createElement('div');
    loader.className = 'modal-status loading';
    loader.textContent = 'Saving...';
    footer.appendChild(loader);
  } else {
    footer.querySelector('.modal-status.loading')?.remove();
  }
}

_showSuccessMessage() {
  const footer = this.modalElement.querySelector('.modal-footer');
  const successMsg = document.createElement('div');
  successMsg.className = 'modal-status success';
  successMsg.textContent = '✓ Saved successfully';
  footer.appendChild(successMsg);
  setTimeout(() => successMsg.remove(), 3000);
}

_showErrorMessage(message) {
  const footer = this.modalElement.querySelector('.modal-footer');
  const errorMsg = document.createElement('div');
  errorMsg.className = 'modal-status error';
  errorMsg.innerHTML = `✗ Error: ${message} <button class="btn-retry">Retry</button>`;
  footer.appendChild(errorMsg);
  
  errorMsg.querySelector('.btn-retry').addEventListener('click', () => {
    this._saveAllEdits();
  });
}

// =================
// DELETE A RECORD 
// ===================

async _handleDeleteRecord() {
  if (!this.currentRecord?.id) return;
  
  // Confirm deletion
  if (this.features.modalConfig.confirmDelete && 
      !confirm(`Delete record ${this.currentRecord.id}?`)) {
    return;
  }

  try {
    // Get row element before API call
    const row = this._getRowElement(this.currentRecord.id);
    
    // Visual feedback before deletion
    if (row) {
      row.classList.add('row-deleting');
      await new Promise(resolve => setTimeout(resolve, 300)); // Brief visual feedback
    }
    
    // API call
    await this._deleteRecordApi(this.currentRecord.id);
    
    // Update data immediately
    this._deleteFromDataObject();
    
    // Show success message in modal
    const modalBody = this.modalElement.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="delete-confirmation">
          ✓ Record ${this.currentRecord.id} deleted
        </div>
      `;
    }
    
    // Close modal after delay
    setTimeout(() => {
      this._hideModal();
      this.renderData(); // Refresh grid
    }, 1500);

  } catch (error) {
    // Remove visual feedback if error occurs
    const row = this._getRowElement(this.currentRecord.id);
    if (row) row.classList.remove('row-deleting');
    
    // Show error in modal
    const modalBody = this.modalElement.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="delete-error">
          ✗ Delete failed: ${error.message}
          <button class="retry-btn">Retry</button>
        </div>
      `;
      
      modalBody.querySelector('.retry-btn').addEventListener('click', () => {
        this._handleDeleteRecord();
      });
    }
  }
}





// Reuse your existing API method with DELETE method
async _deleteRecordApi(recordId) {
  if (!this.dataApiEndPoint) {
    throw new Error('API endpoint not configured');
  }

  const response = await fetch(`${this.dataApiEndPoint}/${recordId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

// Reuse existing row highlight method
_getRowElement(recordId) {
  return this.tbody?.querySelector(`tr[data-id="${recordId}"]`);
}


/* END PREMIUM FEATURES BLOCK */

  
}


export default AnyGrid;