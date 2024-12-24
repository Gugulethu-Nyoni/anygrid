!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).AnyGrid=t()}(this,(function(){"use strict";return class{constructor(e,t,n={}){this.data=e,this.totalRecords=e.length,this.columns=t,this.itemsPerPage=n.initialItemsPerPage||10,this.currentPage=1,this.tbody=null,this.searchInput=null,this.paginationContainer=null,this.filteredData=this.data,this.sortingOrder={},this.dataTableId=this.generateUniqueId("anygrid-datatable"),this.paginationContainerId=this.generateUniqueId("anygrid-pagination"),this.searchInputId=this.generateUniqueId("search-input"),this.itemsPerPageId=this.generateUniqueId("items-per-page"),this.gridContainerId=n.gridContainerId||"anygrid";this.features={search:!0,sort:!0,actions:!0,pagination:!0,itemsPerPage:!0,dynamicHeaders:!0,renderActionsInRows:!0,...n},this.initializeDataGrid(),this.features.search&&(this.searchInput=document.getElementById(`${this.searchInputId}`),this.searchInput.addEventListener("input",this.searchTable.bind(this)))}generateUniqueId(e){return`${e}-${Math.random().toString(36).substring(2,7)}`}initializeDataGrid(){const e=document.getElementById(this.gridContainerId);if(e){const t=[5,10,20,50,100],n=this.features.itemsPerPage?t.map((e=>`\n        <option value="${e}" ${e===this.itemsPerPage?"selected":""}>${e}</option>\n      `)).join(""):"",i=this.features.csvExport?`\n      <button id="export-csv-${this.gridContainerId}" class="anygrid-export-csv">Export CSV</button>\n    `:"",a=this.features.excelExport?`\n      <button id="export-excel-${this.gridContainerId}" class="anygrid-export-excel">Export EXCEL</button>\n    `:"",s=`\n        <div class="search-container"> \n          ${this.features.search?`<input type="text" id="${this.searchInputId}" class="anygrid-search-input" placeholder="Search...">`:""}\n          ${this.features.itemsPerPage?`<select id="${this.itemsPerPageId}" class="items-per-page">${n}</select>`:""}\n          ${i} ${a}\n        </div>\n        \n        <table class="anygrid-table" id="${this.dataTableId}">\n          <thead>\n            <tr></tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n        ${this.features.pagination?`<div id="${this.paginationContainerId}" class="anygrid-pagination"></div>`:""}\n      `,r=document.createElement("template");r.innerHTML=s.trim();const o=r.content.cloneNode(!0);if(e.appendChild(o),this.features.csvExport){document.getElementById(`export-csv-${this.gridContainerId}`).addEventListener("click",this.exportToCSV.bind(this))}if(this.features.excelExport){document.getElementById(`export-excel-${this.gridContainerId}`).addEventListener("click",this.exportToExcel.bind(this))}if(this.features.itemsPerPage){const e=document.getElementById(`${this.itemsPerPageId}`);e.value=this.itemsPerPage,e.addEventListener("change",(e=>{this.itemsPerPage=parseInt(e.target.value),this.currentPage=1,this.renderData(),this.updatePagination()}))}this.features.search&&(this.searchInput=document.getElementById(this.searchInputId),this.searchInput.addEventListener("input",this.searchTable.bind(this))),this.tbody=document.querySelector(`#${this.dataTableId} tbody`),this.paginationContainer=document.getElementById(`${this.paginationContainerId}`),this.renderData(this.filteredData),this.updatePagination()}}renderData(){this.tbody.innerHTML="";const e=document.querySelector(`#${this.dataTableId} thead tr`);let t,n;e.innerHTML="",this.features.dynamicHeaders&&this.columns.forEach(((t,n)=>{if(!t.hidden){const i=document.createElement("th");if(i.textContent=t.label||t.header,t.joinedColumns)i.setAttribute("colspan",t.joinedColumns.length);else if(this.features.sort&&t.sortable){i.dataset.index=n,i.addEventListener("click",(()=>this.sortTable(n)));const e=document.createElement("span");e.innerHTML=" ⇅",e.style.fontSize="1.1em",e.style.marginLeft="0.2em",e.className="anygrid-column-sortable",i.appendChild(e)}e.appendChild(i)}})),this.features.pagination?(t=(this.currentPage-1)*this.itemsPerPage,n=Math.min(this.currentPage*this.itemsPerPage,this.filteredData.length)):(t=0,n=this.totalRecords),this.filteredData.slice(t,n).forEach((e=>{const t=document.createElement("tr");if(this.columns.forEach((n=>{if(!n.hidden){const i=document.createElement("td");let a=n.joinedColumns?n.joinedColumns.map((t=>e[t])).join(" "):e[n.name];n.render?"string"==typeof n.render?i.innerHTML=n.render.replace(`{${n.name}}`,a):"function"==typeof n.render&&(i.innerHTML=n.render(a,e)):n.joinedColumns?(i.textContent=a,i.setAttribute("colspan",n.joinedColumns.length)):i.textContent=a,t.appendChild(i)}})),this.features.actions){const n=this.columns.find((e=>e.actions));n&&n.actions.forEach((n=>{const i=document.createElement("td"),a=document.createElement("a");a.textContent=n.label,a.href=n.url.replace("{id}",e.id),n.class&&a.classList.add(n.class),n.id&&(a.id=n.id.replace("{id}",e.id)),n.confirm&&a.setAttribute("onclick","return confirm('Are you sure?')"),i.appendChild(a),t.appendChild(i)}))}this.tbody.appendChild(t)})),this.updatePagination()}updatePagination(){if(this.features.pagination){const e=this.itemsPerPage,t=Math.ceil(this.filteredData.length/e),n=Math.max(1,this.currentPage-5),i=Math.min(n+9,t);this.paginationContainer.innerHTML="";const a=document.createElement("div");a.classList.add("pagination-wrapper");const s=(this.currentPage-1)*e+1,r=Math.min(this.currentPage*e,this.totalRecords),o=this.totalRecords,d=document.createElement("div");d.classList.add("pagination-info"),d.textContent=`Showing ${s} to ${r} of ${o} records`;const c=document.createElement("div");c.classList.add("pagination-buttons");for(let e=n;e<=i;e++){const t=document.createElement("button");t.textContent=e,t.classList.add("pagination-button"),e===this.currentPage&&t.classList.add("active"),t.onclick=()=>{this.currentPage=e,this.renderData()},c.appendChild(t)}a.appendChild(d),a.appendChild(c),this.paginationContainer.appendChild(a)}}sortTable(e){if(this.features.sort){const t=this.columns[e],n="asc"!==this.sortingOrder[t.name],i=[...this.filteredData].sort(((e,i)=>{let a=e[t.name],s=i[t.name];return"number"===t.type&&(a=parseFloat(a),s=parseFloat(s)),n?a-s:s-a}));this.filteredData=i,this.sortingOrder[t.name]=n?"asc":"desc",this.renderData()}}searchTable(){const e=this.searchInput.value.toLowerCase();this.filteredData=this.data.filter((t=>this.columns.some((n=>{let i=n.joinedColumns?n.joinedColumns.map((e=>t[e])).join(" "):t[n.name];return null==i&&(i=""),"string"!=typeof i&&(i=String(i)),i.toLowerCase().includes(e)})))),this.currentPage=1,this.renderData()}exportToCSV(e){const t=e.target.id.replace("export-csv-","");if(this.features.csvExport){const e=this.columns.map((e=>e.label||e.header)).join(","),n=this.filteredData.map((e=>this.columns.map((t=>{let n=t.joinedColumns?t.joinedColumns.map((t=>e[t])).join(" "):e[t.name];return`"${String(n).replace(/"/g,'""')}"`})).join(","))).join("\n"),i=encodeURI(`data:text/csv;charset=utf-8,${e}\n${n}`),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",`data-${t}.csv`),a.click()}}exportToExcel(e){const t=e.target.id.replace("export-excel-","");if(this.features.excelExport){let e='\n      <xml version="1.0" encoding="UTF-8"?>\n      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n                xmlns:o="urn:schemas-microsoft-com:office:office"\n                xmlns:x="urn:schemas-microsoft-com:office:excel"\n                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n                xmlns:html="http://www.w3.org/TR/REC-html40">\n        <Worksheet ss:Name="Sheet1">\n          <Table>\n    ';e+="<Row>",this.columns.forEach((t=>{e+=`<Cell><Data ss:Type="String">${t.label||t.header}</Data></Cell>`})),e+="</Row>",this.filteredData.forEach((t=>{e+="<Row>",this.columns.forEach((n=>{let i=n.joinedColumns?n.joinedColumns.map((e=>t[e])).join(" "):t[n.name];const a=isNaN(i)?"String":"Number";e+=`<Cell><Data ss:Type="${a}">${i}</Data></Cell>`})),e+="</Row>"})),e+="\n          </Table>\n        </Worksheet>\n      </Workbook>\n    ";const n=new Blob([e],{type:"application/vnd.ms-excel"}),i=URL.createObjectURL(n),a=document.createElement("a");a.href=i,a.setAttribute("download",`data-${t}.xls`),a.click()}}}}));
