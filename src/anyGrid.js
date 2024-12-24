class AnyGrid {
  constructor(data, columns, options = {}) {
    this.data = data;
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
    const defaultFeatures = {
      search: true,
      sort: true,
      actions: true,
      pagination: true,
      itemsPerPage: true,
      dynamicHeaders: true,
      theme:'dark'
    };

   // Merging user defined features with defaults
    this.features = { ...defaultFeatures, ...options }; 

    if (this.features.theme) {
      //alert(this.features.theme);
      this.applyTheme(this.features.theme, this.gridContainerId);
    }

    // Initialize the data grid
    this.initializeDataGrid();
    
    //console.log(this.features.search);

    // Set up search input (only if search is enabled)
    if (this.features.search) {
      this.searchInput = document.getElementById(`${this.searchInputId}`);
      this.searchInput.addEventListener('input', this.searchTable.bind(this));
    }
  }

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

  // Render the data in the table
 // Inside renderData function
renderData() {
  this.tbody.innerHTML = '';
  const headerRow = document.querySelector(`#${this.dataTableId} thead tr`);
  headerRow.innerHTML = '';

  // Create table headers (only if dynamic headers are enabled)
  if (this.features.dynamicHeaders) {
    this.columns.forEach((column, index) => {
      if (!column.hidden) {
        const headerCell = document.createElement('th');
        headerCell.textContent = column.label || column.header;
        if (column.joinedColumns) {
          headerCell.setAttribute('colspan', column.joinedColumns.length);
        } else {
          if (this.features.sort && column.sortable) {
            headerCell.dataset.index = index;
            headerCell.addEventListener('click', () => this.sortTable(index));

            const sortableIcon = document.createElement('span');
            sortableIcon.innerHTML = ' ⇅'; // Use the Unicode character for the icon
            sortableIcon.style.fontSize = '1.1em';
            sortableIcon.style.marginLeft = '0.2em';
            sortableIcon.className = 'anygrid-column-sortable';
            headerCell.appendChild(sortableIcon);
          }
        }
        headerRow.appendChild(headerCell);
      }
    });
  }

  // Render rows of data

  /*
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
  */

// UPDATE THIS TO ONLY DISPLAY items per page only if pagination is set - else we display all records in one page

  // Render rows of data
let startIndex, endIndex;

if (this.features.pagination) {
    // Calculate indices for paginated view
    startIndex = (this.currentPage - 1) * this.itemsPerPage;
    endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
} else {
    // Show all records if pagination is disabled
    startIndex = 0;
    endIndex = this.totalRecords;
}


  this.filteredData.slice(startIndex, endIndex).forEach((row) => {
    const tr = document.createElement('tr');
    this.columns.forEach((column) => {
      if (!column.hidden) {
        const cell = document.createElement('td');
        let value = column.joinedColumns ? column.joinedColumns.map(col => row[col]).join(' ') : row[column.name];

        if (column.render) {
          if (typeof column.render === 'string') {
            cell.innerHTML = column.render.replace(`{${column.name}}`, value);
          } else if (typeof column.render === 'function') {
            cell.innerHTML = column.render(value, row);
          }
        } else {
          if (column.joinedColumns) {
            cell.textContent = value;
            cell.setAttribute('colspan', column.joinedColumns.length);
          } else {
            cell.textContent = value;
          }
        }
        tr.appendChild(cell);
      }
    });

    // Render actions for the last column (only if actions are enabled)
    if (this.features.actions) {
      const actionColumn = this.columns.find(col => col.actions);
      if (actionColumn) {
        actionColumn.actions.forEach((action) => {
          const actionCell = document.createElement('td');
          const actionLink = document.createElement('a');
          actionLink.textContent = action.label;
          actionLink.href = action.url.replace('{id}', row.id);

          if (action.class) {
            actionLink.classList.add(action.class);
          }
          if (action.id) {
            actionLink.id = action.id.replace('{id}', row.id);
          }
          if (action.confirm) {
            actionLink.setAttribute('onclick', "return confirm('Are you sure?')");
          }

          actionCell.appendChild(actionLink);
          tr.appendChild(actionCell);
        });
      }
    }

    this.tbody.appendChild(tr);
  });

  this.updatePagination();
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
  const stylesheet = document.querySelector('link[anygrid-style]');
  
  if (!stylesheet) {
    console.error("Stylesheet with 'anygrid-style' not found!");
    return;
  }

  fetch(stylesheet.href)
    .then(response => response.text())
    .then(cssText => {
      // Extract theme-specific CSS rules
      const themeRules = cssText.match(new RegExp(`\\.${theme}-theme\\s*{([^}]*)}`, 'i'));

      if (!themeRules) {
        console.error(`Theme rules for ${theme} not found in the stylesheet.`);
        return;
      }

      // Extract CSS rules for the theme
      const themeCSS = themeRules[1].trim();

      // Find the grid container element
      const gridContainer = document.getElementById(gridContainerId);

      if (gridContainer) {
        // Append the theme class to the grid container
        gridContainer.classList.add(`${theme}-theme`);

        // Create a <style> tag with the extracted theme styles
        const clonedStyle = document.createElement('style');
        clonedStyle.textContent = `
          #${gridContainerId} {
            ${themeCSS}
          }
        `;

        // Insert the <style> tag above the grid container
        gridContainer.parentNode.insertBefore(clonedStyle, gridContainer);

        console.log(`Applied ${theme} theme to grid container: ${gridContainerId}`);
      } else {
        console.error(`Grid container with ID ${gridContainerId} not found.`);
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



/* END PREMIUM FEATURES BLOCK */
  
}


export default AnyGrid;