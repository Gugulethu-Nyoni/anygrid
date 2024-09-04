var AnyGrid=function(){"use strict";return class{constructor(t,e,n,i){this.data=t,this.columns=e,this.itemsPerPage=n,this.currentPage=1,this.tbody=null,this.searchInput=null,this.paginationContainer=null,this.filteredData=this.data,this.sortingOrder={},this.dataTableId=generateUniqueTableId(),this.gridContainerId=i?`${i}`:"anygrid",alert(this.gridContainerId),this.initializeDataGrid(),this.searchInput=document.getElementById("searchInput"),this.searchInput.addEventListener("input",this.searchTable.bind(this))}generateUniqueTableId(t="anygrid-datatable"){return`${t}-${Math.random().toString(36).substring(2,7)}`}initializeDataGrid(){const t=document.getElementById(this.gridContainerId);if(t){const e=`\n      <div class="search-container"> \n      <input type="text" id="searchInput" placeholder="Search...">\n      <select id="itemsPerPage">\n        ${[5,10,20,50,100].map((t=>`\n      <option value="${t}" ${t===this.itemsPerPage?"selected":""}>${t}</option>\n    `)).join("")}\n      </select>\n      </div>\n      \n      <table class="anygrid-table" id="${this.dataTableId}">\n        <thead>\n          <tr></tr>\n        </thead>\n        <tbody></tbody>\n      </table>\n      <div id="pagination"></div>\n    `;t.insertAdjacentHTML("afterbegin",e);document.querySelector("#searchInput").addEventListener("input",this.searchTable.bind(this));const n=document.querySelector("#itemsPerPage");n.value=this.itemsPerPage,n.addEventListener("change",(t=>{this.itemsPerPage=parseInt(t.target.value),this.currentPage=1,this.renderData(),this.updatePagination()})),this.tbody=document.querySelector(`#${this.dataTableId} tbody`),this.paginationContainer=document.querySelector("#pagination"),this.renderData(this.data),this.updatePagination()}}renderData(){this.tbody.innerHTML="";const t=document.querySelector(`#${this.dataTableId} thead tr`);t.innerHTML="",this.columns.forEach(((e,n)=>{if(!e.hidden){const i=document.createElement("th");if(i.textContent=e.label||e.header,e.joinedColumns)i.setAttribute("colspan",e.joinedColumns.length);else if(e.sortable){i.dataset.index=n,i.addEventListener("click",(()=>this.sortTable(n)));const t=document.createElement("span");t.innerHTML=" ⇅",t.style.fontSize="1.1em",t.style.marginLeft="0.2em",t.className="anygrid-column-sortable",i.appendChild(t)}t.appendChild(i)}}));const e=this.columns.find((t=>t.actions));console.log("Action Column:",e),e&&(console.log("inside actions first if"),e.actions.forEach((e=>{const n=document.createElement("th");n.textContent=e.label,t.appendChild(n)})));const n=(this.currentPage-1)*this.itemsPerPage,i=Math.min(this.currentPage*this.itemsPerPage,this.filteredData.length);this.filteredData.slice(n,i).forEach((t=>{const n=document.createElement("tr");this.columns.forEach((e=>{if(!e.hidden){const i=document.createElement("td");let a=e.joinedColumns?e.joinedColumns.map((e=>t[e])).join(" "):t[e.name];e.render?"string"==typeof e.render?i.innerHTML=e.render.replace(`{${e.name}}`,a):"function"==typeof e.render&&(i.innerHTML=e.render(a,t)):e.joinedColumns?(i.textContent=a,i.setAttribute("colspan",e.joinedColumns.length)):i.textContent=a,n.appendChild(i)}})),e&&(console.log("inside actions second if"),e.actions.forEach((e=>{const i=document.createElement("td"),a=document.createElement("a");a.textContent=e.label,a.href=e.url.replace("{id}",t.id),e.class&&a.classList.add(e.class),e.id&&(a.id=e.id.replace("{id}",t.id)),e.confirm&&a.setAttribute("onclick","return confirm('Are you sure?')"),i.appendChild(a),n.appendChild(i)}))),this.tbody.appendChild(n)})),this.updatePagination()}updateItemsPerPage=t=>{this.itemsPerPage.value=t,this.renderData()};updatePagination(){const t=this.itemsPerPage,e=Math.ceil(this.filteredData.length/t),n=Math.max(1,this.currentPage-5),i=Math.min(n+9,e);this.paginationContainer.innerHTML="";for(let t=n;t<=i;t++){const e=document.createElement("button");e.textContent=t,e.classList.add("pagination-button"),t===this.currentPage&&e.classList.add("active"),e.onclick=()=>{this.currentPage=t,this.renderData(),this.updatePagination()},this.paginationContainer.appendChild(e)}}searchTable=t=>{const e=this.searchInput.value.toLowerCase(),n=this.data.filter((t=>{for(const n of this.columns){if(t.hasOwnProperty(n.name)&&t[n.name].toString().toLowerCase().includes(e))return!0;if(n.joinedColumns){if(n.joinedColumns.map((e=>t[e])).join(" ").toLowerCase().includes(e))return!0}}return!1}));this.filteredData=n,this.renderData()};sortTable(t){const e=this.columns[t].name;this.sortingOrder[e]&&"desc"!==this.sortingOrder[e]?this.sortingOrder[e]="desc":this.sortingOrder[e]="asc";const n=[...this.filteredData].sort(((t,n)=>{const i="string"==typeof t[e]?t[e].toLowerCase():t[e],a="string"==typeof n[e]?n[e].toLowerCase():n[e];return"asc"===this.sortingOrder[e]?i>a?1:-1:i<a?1:-1}));this.filteredData=n,this.renderData(),this.updatePagination()}}}();
