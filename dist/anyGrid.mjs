class e{constructor(e,t,n={}){this.data=e,this.totalRecords=e.length,this.columns=t,this.itemsPerPage=n.initialItemsPerPage||10,this.currentPage=1,this.tbody=null,this.searchInput=null,this.paginationContainer=null,this.filteredData=this.data,this.sortingOrder={},this.dataTableId=this.generateUniqueId("anygrid-datatable"),this.paginationContainerId=this.generateUniqueId("anygrid-pagination"),this.searchInputId=this.generateUniqueId("search-input"),this.itemsPerPageId=this.generateUniqueId("items-per-page"),this.gridContainerId=n.gridContainerId||"anygrid";this.features={search:!0,sort:!0,actions:!0,pagination:!0,itemsPerPage:!0,dynamicHeaders:!0,renderActionsInRows:!0,theme:"dark",...n},this.features.theme&&this.applyTheme(this.features.theme),this.initializeDataGrid(),this.features.search&&(this.searchInput=document.getElementById(`${this.searchInputId}`),this.searchInput.addEventListener("input",this.searchTable.bind(this)))}generateUniqueId(e){return`${e}-${Math.random().toString(36).substring(2,7)}`}initializeDataGrid(){const e=document.getElementById(this.gridContainerId);if(e){const t=[5,10,20,50,100],n=this.features.itemsPerPage?t.map((e=>`\n        <option value="${e}" ${e===this.itemsPerPage?"selected":""}>${e}</option>\n      `)).join(""):"",a=this.features.csvExport?`\n      <button id="export-csv-${this.gridContainerId}" class="anygrid-export-csv">Export CSV</button>\n    `:"",i=this.features.excelExport?`\n      <button id="export-excel-${this.gridContainerId}" class="anygrid-export-excel">Export EXCEL</button>\n    `:"",r=`\n        <div class="search-container"> \n          ${this.features.search?`<input type="text" id="${this.searchInputId}" class="anygrid-search-input" placeholder="Search...">`:""}\n          ${this.features.itemsPerPage?`<select id="${this.itemsPerPageId}" class="items-per-page">${n}</select>`:""}\n          ${a} ${i}\n        </div>\n        \n        <table class="anygrid-table" id="${this.dataTableId}">\n          <thead>\n            <tr></tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n        ${this.features.pagination?`<div id="${this.paginationContainerId}" class="anygrid-pagination"></div>`:""}\n      `,o=document.createElement("template");o.innerHTML=r.trim();const s=o.content.cloneNode(!0);if(e.appendChild(s),this.features.csvExport){document.getElementById(`export-csv-${this.gridContainerId}`).addEventListener("click",this.exportToCSV.bind(this))}if(this.features.excelExport){document.getElementById(`export-excel-${this.gridContainerId}`).addEventListener("click",this.exportToExcel.bind(this))}if(this.features.itemsPerPage){const e=document.getElementById(`${this.itemsPerPageId}`);e.value=this.itemsPerPage,e.addEventListener("change",(e=>{this.itemsPerPage=parseInt(e.target.value),this.currentPage=1,this.renderData(),this.updatePagination()}))}this.features.search&&(this.searchInput=document.getElementById(this.searchInputId),this.searchInput.addEventListener("input",this.searchTable.bind(this))),this.tbody=document.querySelector(`#${this.dataTableId} tbody`),this.paginationContainer=document.getElementById(`${this.paginationContainerId}`),this.renderData(this.filteredData),this.updatePagination()}}renderData(){this.tbody.innerHTML="";const e=document.querySelector(`#${this.dataTableId} thead tr`);let t,n;e.innerHTML="",this.features.dynamicHeaders&&this.columns.forEach(((t,n)=>{if(!t.hidden){const a=document.createElement("th");if(a.textContent=t.label||t.header,t.joinedColumns)a.setAttribute("colspan",t.joinedColumns.length);else if(this.features.sort&&t.sortable){a.dataset.index=n,a.addEventListener("click",(()=>this.sortTable(n)));const e=document.createElement("span");e.innerHTML=" ⇅",e.style.fontSize="1.1em",e.style.marginLeft="0.2em",e.className="anygrid-column-sortable",a.appendChild(e)}e.appendChild(a)}})),this.features.pagination?(t=(this.currentPage-1)*this.itemsPerPage,n=Math.min(this.currentPage*this.itemsPerPage,this.filteredData.length)):(t=0,n=this.totalRecords),this.filteredData.slice(t,n).forEach((e=>{const t=document.createElement("tr");if(this.columns.forEach((n=>{if(!n.hidden){const a=document.createElement("td");let i=n.joinedColumns?n.joinedColumns.map((t=>e[t])).join(" "):e[n.name];n.render?"string"==typeof n.render?a.innerHTML=n.render.replace(`{${n.name}}`,i):"function"==typeof n.render&&(a.innerHTML=n.render(i,e)):n.joinedColumns?(a.textContent=i,a.setAttribute("colspan",n.joinedColumns.length)):a.textContent=i,t.appendChild(a)}})),this.features.actions){const n=this.columns.find((e=>e.actions));n&&n.actions.forEach((n=>{const a=document.createElement("td"),i=document.createElement("a");i.textContent=n.label,i.href=n.url.replace("{id}",e.id),n.class&&i.classList.add(n.class),n.id&&(i.id=n.id.replace("{id}",e.id)),n.confirm&&i.setAttribute("onclick","return confirm('Are you sure?')"),a.appendChild(i),t.appendChild(a)}))}this.tbody.appendChild(t)})),this.updatePagination()}updatePagination(){if(this.features.pagination){const e=this.itemsPerPage,t=Math.ceil(this.filteredData.length/e),n=Math.max(1,this.currentPage-5),a=Math.min(n+9,t);this.paginationContainer.innerHTML="";const i=document.createElement("div");i.classList.add("pagination-wrapper");const r=(this.currentPage-1)*e+1,o=Math.min(this.currentPage*e,this.totalRecords),s=this.totalRecords,d=document.createElement("div");d.classList.add("pagination-info"),d.textContent=`Showing ${r} to ${o} of ${s} records`;const c=document.createElement("div");c.classList.add("pagination-buttons");for(let e=n;e<=a;e++){const t=document.createElement("button");t.textContent=e,t.classList.add("pagination-button"),e===this.currentPage&&t.classList.add("active"),t.onclick=()=>{this.currentPage=e,this.renderData()},c.appendChild(t)}i.appendChild(d),i.appendChild(c),this.paginationContainer.appendChild(i)}}sortTable(e){if(this.features.sort){const t=this.columns[e],n="asc"!==this.sortingOrder[t.name],a=[...this.filteredData].sort(((e,a)=>{let i=e[t.name],r=a[t.name];return"number"===t.type&&(i=parseFloat(i),r=parseFloat(r)),n?i-r:r-i}));this.filteredData=a,this.sortingOrder[t.name]=n?"asc":"desc",this.renderData()}}searchTable(){const e=this.searchInput.value.toLowerCase();this.filteredData=this.data.filter((t=>this.columns.some((n=>{let a=n.joinedColumns?n.joinedColumns.map((e=>t[e])).join(" "):t[n.name];return null==a&&(a=""),"string"!=typeof a&&(a=String(a)),a.toLowerCase().includes(e)})))),this.currentPage=1,this.renderData()}applyTheme(e){const t={light:{"--background-dark":"#ffffff","--background-light":"#f9f9f9","--text-light":"#333333","--border-color":"#cccccc","--input-background":"#ffffff","--input-background-disabled":"#e0e0e0","--label-color":"#5a2d81","--radio-checkbox-accent":"#5a2d81","--button-background":"#fff","--button-background-hover":"#003d7a","--edit-background":"#e91e63","--delete-background":"#dc3545"},dark:{"--background-dark":"#1e1e1e","--background-light":"#2e2e2e","--text-light":"#e0e0e0","--border-color":"#444","--input-background":"#333","--input-background-disabled":"#444","--label-color":"#b0b0b0","--radio-checkbox-accent":"#b0b0b0","--button-background":"#b0b0b0","--button-background-hover":"#9e9e9e","--edit-background":"#0d6efd","--delete-background":"#dc3545"},pink:{"--background-dark":"#2c2c2c","--background-light":"#3d3d3d","--text-light":"#f1f1f1","--border-color":"#555","--input-background":"#444","--input-background-disabled":"#666","--label-color":"#ff4081","--radio-checkbox-accent":"#ff4081","--button-background":"#ff4081","--button-background-hover":"#e91e63","--edit-background":"#e91e63","--delete-background":"#f44336"},indigo:{"--background-dark":"#2c2c2c","--background-light":"#3d3d3d","--text-light":"#e0e0e0","--border-color":"#444","--input-background":"#333","--input-background-disabled":"#555","--label-color":"#3f51b5","--radio-checkbox-accent":"#3f51b5","--button-background":"#3f51b5","--button-background-hover":"#303f9f","--edit-background":"#3f51b5","--delete-background":"#f44336"},blue:{"--background-dark":"#0a0a0a","--background-light":"#1a1a1a","--text-light":"#e0e0e0","--border-color":"#333","--input-background":"#222","--input-background-disabled":"#444","--label-color":"#2196f3","--radio-checkbox-accent":"#2196f3","--button-background":"#2196f3","--button-background-hover":"#1976d2","--edit-background":"#2196f3","--delete-background":"#f44336"},darkOrange:{"--background-dark":"#121212","--background-light":"#1e1e1e","--text-light":"#e0e0e0","--border-color":"#333","--input-background":"#333","--input-background-disabled":"#444","--label-color":"#ff9800","--radio-checkbox-accent":"#ff9800","--button-background":"#ff9800","--button-background-hover":"#e68900","--edit-background":"#ff9800","--delete-background":"#f44336"}}[e],n=document.documentElement;for(let[e,a]of Object.entries(t))n.style.setProperty(e,a)}exportToCSV(e){const t=e.target.id.replace("export-csv-","");if(this.features.csvExport){const e=this.columns.map((e=>e.label||e.header)).join(","),n=this.filteredData.map((e=>this.columns.map((t=>{let n=t.joinedColumns?t.joinedColumns.map((t=>e[t])).join(" "):e[t.name];return`"${String(n).replace(/"/g,'""')}"`})).join(","))).join("\n"),a=encodeURI(`data:text/csv;charset=utf-8,${e}\n${n}`),i=document.createElement("a");i.setAttribute("href",a),i.setAttribute("download",`data-${t}.csv`),i.click()}}exportToExcel(e){const t=e.target.id.replace("export-excel-","");if(this.features.excelExport){let e='\n      <xml version="1.0" encoding="UTF-8"?>\n      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n                xmlns:o="urn:schemas-microsoft-com:office:office"\n                xmlns:x="urn:schemas-microsoft-com:office:excel"\n                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n                xmlns:html="http://www.w3.org/TR/REC-html40">\n        <Worksheet ss:Name="Sheet1">\n          <Table>\n    ';e+="<Row>",this.columns.forEach((t=>{e+=`<Cell><Data ss:Type="String">${t.label||t.header}</Data></Cell>`})),e+="</Row>",this.filteredData.forEach((t=>{e+="<Row>",this.columns.forEach((n=>{let a=n.joinedColumns?n.joinedColumns.map((e=>t[e])).join(" "):t[n.name];const i=isNaN(a)?"String":"Number";e+=`<Cell><Data ss:Type="${i}">${a}</Data></Cell>`})),e+="</Row>"})),e+="\n          </Table>\n        </Worksheet>\n      </Workbook>\n    ";const n=new Blob([e],{type:"application/vnd.ms-excel"}),a=URL.createObjectURL(n),i=document.createElement("a");i.href=a,i.setAttribute("download",`data-${t}.xls`),i.click()}}}export{e as default};
