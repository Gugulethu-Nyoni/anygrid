!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).AnyGrid=e()}(this,(function(){"use strict";return class{constructor(t,e,n){this.data=t,this.columns=e,this.itemsPerPage=n,this.currentPage=1,this.tbody=null,this.searchInput=null,this.paginationContainer=null,this.filteredData=this.data,this.sortingOrder={},this.initializeDataGrid(),this.searchInput=document.getElementById("searchInput"),this.searchInput.addEventListener("input",this.searchTable.bind(this))}initializeDataGrid(){const t=document.querySelector("#anyGrid");if(t){const e='\n        <input type="text" id="searchInput" placeholder="Search...">\n        <select id="itemsPerPage">\n          <option value="5">5</option>\n          <option value="10" selected>10</option>\n          <option value="20">20</option>\n          <option value="50">50</option>\n          <option value="100">100</option>\n        </select>\n        \n        <table id="dataTable">\n          <thead>\n            <tr></tr>\n          </thead>\n          <tbody></tbody>\n        </table>\n        <div id="pagination"></div>\n      ';t.insertAdjacentHTML("afterbegin",e);document.querySelector("#searchInput").addEventListener("input",this.searchTable.bind(this));document.querySelector("#itemsPerPage").addEventListener("change",(t=>this.updateItemsPerPage(t.target.value)))}this.tbody=document.querySelector("#dataTable tbody"),this.itemsPerPage=document.querySelector("#itemsPerPage"),this.paginationContainer=document.querySelector("#pagination"),this.renderData(this.data),this.updatePagination()}renderData(){this.tbody.innerHTML="";const t=document.querySelector("#dataTable thead tr");t.innerHTML="",this.columns.forEach(((e,n)=>{if(!e.hidden){const i=document.createElement("th");i.textContent=e.label||e.header,e.joinedColumns?i.setAttribute("colspan",e.joinedColumns.length):(i.dataset.index=n,i.addEventListener("click",(()=>this.sortTable(n)))),t.appendChild(i)}}));const e=this.columns[this.columns.length-1];e.actions.forEach((e=>{const n=document.createElement("th");n.textContent=e.label,t.appendChild(n)}));const n=(this.currentPage-1)*this.itemsPerPage.value,i=Math.min(this.currentPage*this.itemsPerPage.value,this.data.length);this.filteredData.slice(n,i).forEach((t=>{const n=document.createElement("tr");this.columns.forEach((e=>{if(!e.hidden){const i=document.createElement("td");if(e.joinedColumns){const n=e.joinedColumns.map((e=>t[e])).join(" ");i.textContent=n,i.setAttribute("colspan",e.joinedColumns.length)}else i.textContent=t[e.name];n.appendChild(i)}})),e.actions.forEach((e=>{const i=document.createElement("td"),a=document.createElement("a");a.textContent=e.label,a.href=e.url.replace("{id}",t.id),e.class&&a.classList.add(e.class),e.id&&(a.id=e.id.replace("{id}",t.id)),e.confirm&&a.setAttribute("onclick","return confirm('Are you sure?')"),i.appendChild(a),n.appendChild(i)})),this.tbody.appendChild(n)})),this.updatePagination()}updateItemsPerPage=t=>{this.itemsPerPage.value=t,this.renderData()};updatePagination(){const t=Math.ceil(this.data.length/this.itemsPerPage.value),e=Math.max(1,this.currentPage-5),n=Math.min(e+10,t);this.paginationContainer.innerHTML="";for(let t=e;t<=n;t++){const e=document.createElement("button");e.textContent=t,e.classList.add("pagination-button"),e.onclick=()=>{this.currentPage=t,this.renderData(),this.updatePagination()},this.paginationContainer.appendChild(e)}}searchTable=t=>{const e=this.searchInput.value.toLowerCase(),n=this.data.filter((t=>{for(const n of this.columns){if(t.hasOwnProperty(n.name)&&t[n.name].toString().toLowerCase().includes(e))return!0;if(n.joinedColumns){if(n.joinedColumns.map((e=>t[e])).join(" ").toLowerCase().includes(e))return!0}}return!1}));this.filteredData=n,this.renderData()};sortTable(t){const e=this.columns[t].name;this.sortingOrder[e]&&"desc"!==this.sortingOrder[e]?this.sortingOrder[e]="desc":this.sortingOrder[e]="asc";const n=[...this.filteredData].sort(((t,n)=>{const i="string"==typeof t[e]?t[e].toLowerCase():t[e],a="string"==typeof n[e]?n[e].toLowerCase():n[e];return"asc"===this.sortingOrder[e]?i>a?1:-1:i<a?1:-1}));this.filteredData=n,this.renderData(),this.updatePagination()}}}));
