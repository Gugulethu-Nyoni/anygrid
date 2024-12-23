"use strict";module.exports=class{constructor(t,e,n={}){this.data=t,this.totalRecords=t.length,this.columns=e,this.itemsPerPage=n.initialItemsPerPage||10,this.currentPage=1,this.tbody=null,this.searchInput=null,this.paginationContainer=null,this.filteredData=this.data,this.sortingOrder={},this.dataTableId=this.generateUniqueId("anygrid-datatable"),this.paginationContainerId=this.generateUniqueId("anygrid-pagination"),this.searchInputId=this.generateUniqueId("search-input"),this.itemsPerPageId=this.generateUniqueId("items-per-page"),this.gridContainerId=n.gridContainerId||"anygrid";this.features={search:!0,sort:!0,actions:!0,pagination:!0,itemsPerPage:!0,dynamicHeaders:!0,renderActionsInRows:!0,...n},this.initializeDataGrid(),this.features.search&&(this.searchInput=document.getElementById(`${this.searchInputId}`),this.searchInput.addEventListener("input",this.searchTable.bind(this)))}generateUniqueId(t){return`${t}-${Math.random().toString(36).substring(2,7)}`}initializeDataGrid(){const t=document.getElementById(this.gridContainerId);if(t){const e=[5,10,20,50,100],n=this.features.itemsPerPage?e.map((t=>`\n        <option value="${t}" ${t===this.itemsPerPage?"selected":""}>${t}</option>\n      `)).join(""):"",i=this.features.csvExport?`\n      <button id="export-csv-${this.gridContainerId}" class="anygrid-export-csv">Export CSV</button>\n    `:"",a=this.features.excelExport?`\n      <button id="export-excel-${this.gridContainerId}" class="anygrid-export-csv">Export EXCEL</button>\n    `:"",s=`\n        <div class="search-container"> \n          ${this.features.search?`<input type="text" id="${this.searchInputId}" class="anygrid-search-input" placeholder="Search...">`:""}\n          ${this.features.itemsPerPage?`<select id="${this.itemsPerPageId}" class="items-per-page">${n}</select>`:""}\n          ${i} ${a}\n        </div>\n        \n        <table class="anygrid-table" id="${this.dataTableId}">\n          <thead>\n            <tr></tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n        ${this.features.pagination?`<div id="${this.paginationContainerId}" class="anygrid-pagination"></div>`:""}\n      `;if(t.insertAdjacentHTML("afterbegin",s),this.features.csvExport){document.getElementById(`export-csv-${this.gridContainerId}`).addEventListener("click",this.exportToCSV.bind(this))}if(this.features.excelExport){document.getElementById(`export-excel-${this.gridContainerId}`).addEventListener("click",this.exportToExcel.bind(this))}if(this.features.itemsPerPage){const t=document.getElementById(`${this.itemsPerPageId}`);t.value=this.itemsPerPage,t.addEventListener("change",(t=>{this.itemsPerPage=parseInt(t.target.value),this.currentPage=1,this.renderData(),this.updatePagination()}))}this.features.search&&(this.searchInput=document.getElementById(this.searchInputId),this.searchInput.addEventListener("input",this.searchTable.bind(this))),this.tbody=document.querySelector(`#${this.dataTableId} tbody`),this.paginationContainer=document.getElementById(`${this.paginationContainerId}`),this.renderData(this.filteredData),this.updatePagination()}}renderData(){this.tbody.innerHTML="";const t=document.querySelector(`#${this.dataTableId} thead tr`);let e,n;t.innerHTML="",this.features.dynamicHeaders&&this.columns.forEach(((e,n)=>{if(!e.hidden){const i=document.createElement("th");if(i.textContent=e.label||e.header,e.joinedColumns)i.setAttribute("colspan",e.joinedColumns.length);else if(this.features.sort&&e.sortable){i.dataset.index=n,i.addEventListener("click",(()=>this.sortTable(n)));const t=document.createElement("span");t.innerHTML=" ⇅",t.style.fontSize="1.1em",t.style.marginLeft="0.2em",t.className="anygrid-column-sortable",i.appendChild(t)}t.appendChild(i)}})),this.features.pagination?(e=(this.currentPage-1)*this.itemsPerPage,n=Math.min(this.currentPage*this.itemsPerPage,this.filteredData.length)):(e=0,n=this.totalRecords),this.filteredData.slice(e,n).forEach((t=>{const e=document.createElement("tr");if(this.columns.forEach((n=>{if(!n.hidden){const i=document.createElement("td");let a=n.joinedColumns?n.joinedColumns.map((e=>t[e])).join(" "):t[n.name];n.render?"string"==typeof n.render?i.innerHTML=n.render.replace(`{${n.name}}`,a):"function"==typeof n.render&&(i.innerHTML=n.render(a,t)):n.joinedColumns?(i.textContent=a,i.setAttribute("colspan",n.joinedColumns.length)):i.textContent=a,e.appendChild(i)}})),this.features.actions){const n=this.columns.find((t=>t.actions));n&&n.actions.forEach((n=>{const i=document.createElement("td"),a=document.createElement("a");a.textContent=n.label,a.href=n.url.replace("{id}",t.id),n.class&&a.classList.add(n.class),n.id&&(a.id=n.id.replace("{id}",t.id)),n.confirm&&a.setAttribute("onclick","return confirm('Are you sure?')"),i.appendChild(a),e.appendChild(i)}))}this.tbody.appendChild(e)})),this.updatePagination()}updatePagination(){if(this.features.pagination){const t=this.itemsPerPage,e=Math.ceil(this.filteredData.length/t),n=Math.max(1,this.currentPage-5),i=Math.min(n+9,e);this.paginationContainer.innerHTML="";const a=document.createElement("div");a.classList.add("pagination-wrapper");const s=(this.currentPage-1)*t+1,r=Math.min(this.currentPage*t,this.totalRecords),o=this.totalRecords,d=document.createElement("div");d.classList.add("pagination-info"),d.textContent=`Showing ${s} to ${r} of ${o} records`;const c=document.createElement("div");c.classList.add("pagination-buttons");for(let t=n;t<=i;t++){const e=document.createElement("button");e.textContent=t,e.classList.add("pagination-button"),t===this.currentPage&&e.classList.add("active"),e.onclick=()=>{this.currentPage=t,this.renderData()},c.appendChild(e)}a.appendChild(d),a.appendChild(c),this.paginationContainer.appendChild(a)}}sortTable(t){if(this.features.sort){const e=this.columns[t],n="asc"!==this.sortingOrder[e.name],i=[...this.filteredData].sort(((t,i)=>{let a=t[e.name],s=i[e.name];return"number"===e.type&&(a=parseFloat(a),s=parseFloat(s)),n?a-s:s-a}));this.filteredData=i,this.sortingOrder[e.name]=n?"asc":"desc",this.renderData()}}searchTable(){const t=this.searchInput.value.toLowerCase();this.filteredData=this.data.filter((e=>this.columns.some((n=>{let i=n.joinedColumns?n.joinedColumns.map((t=>e[t])).join(" "):e[n.name];return null==i&&(i=""),"string"!=typeof i&&(i=String(i)),i.toLowerCase().includes(t)})))),this.currentPage=1,this.renderData()}exportToCSV(t){const e=t.target.id.replace("export-csv-","");if(this.features.csvExport){const t=this.columns.map((t=>t.label||t.header)).join(","),n=this.filteredData.map((t=>this.columns.map((e=>{let n=e.joinedColumns?e.joinedColumns.map((e=>t[e])).join(" "):t[e.name];return`"${String(n).replace(/"/g,'""')}"`})).join(","))).join("\n"),i=encodeURI(`data:text/csv;charset=utf-8,${t}\n${n}`),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",`data-${e}.csv`),a.click()}}exportToExcel(t){const e=t.target.id.replace("export-excel-","");if(this.features.excelExport){let t='\n      <xml version="1.0" encoding="UTF-8"?>\n      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n                xmlns:o="urn:schemas-microsoft-com:office:office"\n                xmlns:x="urn:schemas-microsoft-com:office:excel"\n                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n                xmlns:html="http://www.w3.org/TR/REC-html40">\n        <Worksheet ss:Name="Sheet1">\n          <Table>\n    ';t+="<Row>",this.columns.forEach((e=>{t+=`<Cell><Data ss:Type="String">${e.label||e.header}</Data></Cell>`})),t+="</Row>",this.filteredData.forEach((e=>{t+="<Row>",this.columns.forEach((n=>{let i=n.joinedColumns?n.joinedColumns.map((t=>e[t])).join(" "):e[n.name];const a=isNaN(i)?"String":"Number";t+=`<Cell><Data ss:Type="${a}">${i}</Data></Cell>`})),t+="</Row>"})),t+="\n          </Table>\n        </Worksheet>\n      </Workbook>\n    ";const n=new Blob([t],{type:"application/vnd.ms-excel"}),i=URL.createObjectURL(n),a=document.createElement("a");a.href=i,a.setAttribute("download",`data-${e}.xls`),a.click()}}};
