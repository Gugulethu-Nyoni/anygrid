var AnyGrid=function(){"use strict";return class{constructor(t,e,i={}){this.data=t,this.totalRecords=t.length,this.columns=e,this.itemsPerPage=i.initialItemsPerPage||10,this.currentPage=1,this.tbody=null,this.searchInput=null,this.paginationContainer=null,this.filteredData=this.data,this.sortingOrder={},this.dataTableId=this.generateUniqueId("anygrid-datatable"),this.paginationContainerId=this.generateUniqueId("anygrid-pagination"),this.searchInputId=this.generateUniqueId("search-input"),this.itemsPerPageId=this.generateUniqueId("items-per-page"),this.gridContainerId=i.gridContainerId||"anygrid";this.features={search:!0,sort:!0,actions:!0,pagination:!0,itemsPerPage:!0,dynamicHeaders:!0,renderActionsInRows:!0,...i},this.initializeDataGrid(),alert(this.features.search),this.features.search&&(this.searchInput=document.getElementById(`${this.searchInputId}`),this.searchInput.addEventListener("input",this.searchTable.bind(this)))}generateUniqueId(t){return`${t}-${Math.random().toString(36).substring(2,7)}`}initializeDataGrid(){const t=document.getElementById(this.gridContainerId);if(t){const e=[5,10,20,50,100],i=this.features.itemsPerPage?e.map((t=>`\n        <option value="${t}" ${t===this.itemsPerPage?"selected":""}>${t}</option>\n      `)).join(""):"",n=`\n        <div class="search-container"> \n          ${this.features.search?`<input type="text" id="${this.searchInputId}" class="anygrid-search-input" placeholder="Search...">`:""}\n          ${this.features.itemsPerPage?`<select id="${this.itemsPerPageId}" class="items-per-page">${i}</select>`:""}\n        </div>\n        \n        <table class="anygrid-table" id="${this.dataTableId}">\n          <thead>\n            <tr></tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n        ${this.features.pagination?`<div id="${this.paginationContainerId}" class="anygrid-pagination"></div>`:""}\n      `;if(t.insertAdjacentHTML("afterbegin",n),this.features.itemsPerPage){const t=document.getElementById(`${this.itemsPerPageId}`);t.value=this.itemsPerPage,t.addEventListener("change",(t=>{this.itemsPerPage=parseInt(t.target.value),this.currentPage=1,this.renderData(),this.updatePagination()}))}this.features.search&&(this.searchInput=document.getElementById(this.searchInputId),this.searchInput.addEventListener("input",this.searchTable.bind(this))),this.tbody=document.querySelector(`#${this.dataTableId} tbody`),this.paginationContainer=document.getElementById(`${this.paginationContainerId}`),this.renderData(this.filteredData),this.updatePagination()}}renderData(){this.tbody.innerHTML="";const t=document.querySelector(`#${this.dataTableId} thead tr`);let e,i;t.innerHTML="",this.features.dynamicHeaders&&this.columns.forEach(((e,i)=>{if(!e.hidden){const n=document.createElement("th");if(n.textContent=e.label||e.header,e.joinedColumns)n.setAttribute("colspan",e.joinedColumns.length);else if(this.features.sort&&e.sortable){n.dataset.index=i,n.addEventListener("click",(()=>this.sortTable(i)));const t=document.createElement("span");t.innerHTML=" ⇅",t.style.fontSize="1.1em",t.style.marginLeft="0.2em",t.className="anygrid-column-sortable",n.appendChild(t)}t.appendChild(n)}})),this.features.pagination?(e=(this.currentPage-1)*this.itemsPerPage,i=Math.min(this.currentPage*this.itemsPerPage,this.filteredData.length)):(e=0,i=this.totalRecords),this.filteredData.slice(e,i).forEach((t=>{const e=document.createElement("tr");if(this.columns.forEach((i=>{if(!i.hidden){const n=document.createElement("td");let a=i.joinedColumns?i.joinedColumns.map((e=>t[e])).join(" "):t[i.name];i.render?"string"==typeof i.render?n.innerHTML=i.render.replace(`{${i.name}}`,a):"function"==typeof i.render&&(n.innerHTML=i.render(a,t)):i.joinedColumns?(n.textContent=a,n.setAttribute("colspan",i.joinedColumns.length)):n.textContent=a,e.appendChild(n)}})),this.features.actions){const i=this.columns.find((t=>t.actions));i&&this.features.renderActionsInRows&&i.actions.forEach((i=>{const n=document.createElement("td"),a=document.createElement("a");a.textContent=i.label,a.href=i.url.replace("{id}",t.id),i.class&&a.classList.add(i.class),i.id&&(a.id=i.id.replace("{id}",t.id)),i.confirm&&a.setAttribute("onclick","return confirm('Are you sure?')"),n.appendChild(a),e.appendChild(n)}))}this.tbody.appendChild(e)})),this.updatePagination()}updatePagination(){if(this.features.pagination){const t=this.itemsPerPage,e=Math.ceil(this.filteredData.length/t),i=Math.max(1,this.currentPage-5),n=Math.min(i+9,e);this.paginationContainer.innerHTML="";for(let t=i;t<=n;t++){const e=document.createElement("button");e.textContent=t,e.classList.add("pagination-button"),t===this.currentPage&&e.classList.add("active"),e.onclick=()=>{this.currentPage=t,this.renderData()},this.paginationContainer.appendChild(e)}}}sortTable(t){if(this.features.sort){const e=this.columns[t],i="asc"!==this.sortingOrder[e.name],n=[...this.filteredData].sort(((t,n)=>{let a=t[e.name],s=n[e.name];return"number"===e.type&&(a=parseFloat(a),s=parseFloat(s)),i?a-s:s-a}));this.filteredData=n,this.sortingOrder[e.name]=i?"asc":"desc",this.renderData()}}searchTable(){const t=this.searchInput.value.toLowerCase();this.filteredData=this.data.filter((e=>this.columns.some((i=>{let n=i.joinedColumns?i.joinedColumns.map((t=>e[t])).join(" "):e[i.name];return null==n&&(n=""),"string"!=typeof n&&(n=String(n)),n.toLowerCase().includes(t)})))),this.currentPage=1,this.renderData()}}}();
