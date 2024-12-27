  # AnyGridJS


<img src="https://github.com/thincmedia/anyGridJs/blob/main/images/anygridjs-datagrid-js-datatable-example.png" alt="anyGridJs Example">

AnyGridJS is a Lightweight, feature-rich JS library for dynamic data tables with paginated, sortable, searchable, column joining, action handles &amp; URL definition. The library works with Semantq JS framework and vanilla JS. AnyGrid is flexible, customizable, responsive &amp; performant. Open-source &amp; MIT licensed.

## Key Features

### Data Management

  - Pagination: Effortlessly navigate large datasets with customizable page sizes
  - Sorting: Enable users to sort data by specific columns
  - Searching: Include a search bar for quick data filtering
  - Column Joining: Combine data from multiple columns for enhanced visualization

### Customization

  - Action Handles: Add custom buttons for interactive functionality
  - URL Definition: Define URLs for data linking and seamless navigation
  - Define Theme via JS: Available themes include default (dark), light, blue, pink, indigo, dark-orange, and green

### Export Options

  - Export Table to CSV: Easily export table data into CSV format
  - Export Table to Excel: Seamlessly export table data into Excel format
  - Define Theme via JS: Available themes include default (dark), light, blue, pink, indigo, dark-orange, and green

### Usability

  - Sticky Table Headers: Keep headers visible while scrolling for better usability
  - Framework Agnostic: Works with any JavaScript framework (React, Angular, Vue, Svelte etc.) or vanilla JS
  - Modularity and Features Optionality: Choose only the features you need for a lightweight and tailored implementation


## Why Choose AnyGrid?

 - Vanilla JS: No dependencies, works with any JavaScript framework or vanilla JS
 - Lightweight: Minimal footprint, optimized for performance
 - Customizable: Adapt the library to fit your project's unique needs
 - Responsive: Tables adapt to various screen sizes and devices
 - Flexible: Integrate with your preferred framework or use with vanilla JS
Get Started
- Extensible: you can extend the features nd functions of the library
- Minimal Configs: all you need is  a div with dataGrid id name,  a json data object, column definition in your app.js or via script tag directly on the html. See usage section below.

## Usage Example


There are three ways to use AnyGrid in your html.

## Option A: Global JS Format



1. html: insert this containter somewhere in your html (before the js script tags html mark up shown in step 2)

```html
<div id="anygrid"></div>
```

You can also use any id that you prefer e.g. 

```html
<div id="users"></div>
```

In this case, you will have to define the target container id in the features object as shown below:

```javascript
const features = {
gridContainerId: 'users'
}
```

If the id of your target grid container is 'anygrid' then you do not need to define the gridConatinerId in the features object. 

2. Add your js mark up in the html just before the ```html </body> ``` tag:

```html
<script src="https://unpkg.com/anygridjs@1.0.8/anyGrid.global.js"></script>
 <script src="app.js"></script>
 ```

 ## app.js 

 ```javascript

const data = [
  { id: 1, name: 'John', surname: 'Doe', age: 30, role: 'Developer', salary: 50000 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 28, role: 'Designer', salary: 45000 },
  { id: 3, name: 'Jack', surname: 'Smith', age: 34, role: 'Product Manager', salary: 60000 },
  { id: 4, name: 'Emily', surname: 'Jones', age: 27, role: 'Marketing Specialist', salary: 47000 },
  // add more records 
];

  const columns = [
  { name: 'id', header: 'ID', render: (value, row) => `<a href="/user/profile/${row.id}">${row.id}</a>`, sortable: true },
  { name: 'fullName', header: 'FULL NAME', joinedColumns: ['name', 'surname'] },
  { name: 'age', header: 'AGE', sortable: true },
  { name: 'role', header: 'ROLE' },
  { name: 'salary', header: 'SALARY', render: '<strong>R{salary}</strong>', sortable: true,

    actions: [
      {
        label: 'EDIT',
        url: 'edit/{id}',
        class: 'edit',
        id: 'edit-{id}',
      },
      {
        label: 'DELETE',
        url: 'delete/{id}',
        class: 'delete',
        id: 'delete-{id}',
        confirm: true,
      }, 
    ], 
  },
];

const features = {
initialItemsPerPage: 30,
csvExport: true,
excelExport: true,
theme: 'pink'
}

const dataGrid = new AnyGrid(data, columns, features);
```



## Option B: Universal Module Definition (UMD) JS Format


1. html: insert this containter somewhere in your html (before the js mark up shown in step 2)

```html
<div id="anygrid"></div>
```

2. Add your js mark up in the html just before the ```html </body> ``` tag:

```html
  <script src="https://unpkg.com/anygridjs@1.0.9/anyGrid.umd.js"></script>
 <script src="app.js"></script>
 ```

## Option C: ESM modules importmap

1. html: insert this containter somewhere in your html (before the js mark up shown in step 2)

```html
<div id="anygrid"></div>
```

2. Add your js mark up in the html just before the </body> tag:

```html
<script type="importmap">
{
  "imports": {
    "anygridjs": "https://unpkg.com/anygridjs@1.0.8/anyGrid.mjs"
  }
}
</script>

<script type="module" src="esm_app.js"></script>

```

## esm_app.js 

```javascript
import AnyGrid from 'anygridjs';

const data = [
  { id: 1, name: 'John', surname: 'Doe', age: 30, role: 'Developer', salary: 50000 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 28, role: 'Designer', salary: 45000 },
  { id: 3, name: 'Jack', surname: 'Smith', age: 34, role: 'Product Manager', salary: 60000 },
  { id: 4, name: 'Emily', surname: 'Jones', age: 27, role: 'Marketing Specialist', salary: 47000 },
  { id: 5, name: 'Michael', surname: 'Brown', age: 40, role: 'Software Engineer', salary: 55000 },
  { id: 6, name: 'Sarah', surname: 'Davis', age: 32, role: 'UX Researcher', salary: 52000 },
  ];


const columns = [
  { name: 'id', header: 'ID', render: (value, row) => `<a href="/user/profile/${row.id}">${row.id}</a>`, sortable: true },
  { name: 'fullName', header: 'FULL NAME', joinedColumns: ['name', 'surname'] },
  { name: 'age', header: 'AGE', sortable: true },
  { name: 'role', header: 'ROLE' },
  { name: 'salary', header: 'SALARY', render: '<strong>R{salary}</strong>', sortable: true,

    actions: [
      {
        label: 'EDIT',
        url: 'edit/{id}',
        class: 'edit',
        id: 'edit-{id}',
      },
      {
        label: 'DELETE',
        url: 'delete/{id}',
        class: 'delete',
        id: 'delete-{id}',
        confirm: true,
      }, 
    ], 
  },
];

const features = {
initialItemsPerPage: 30,
csvExport: true,
excelExport: true,
theme: 'pink'
}

const dataGrid = new AnyGrid(data, columns, features);
```



## The data object
```javascript

// data object (JSON)

const data = [
  { id: 1, name: 'John', surname: 'Doe', age: 30, role: 'Developer', salary: 50000 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 28, role: 'Designer', salary: 45000 },
  { id: 3, name: 'Jack', surname: 'Smith', age: 34, role: 'Product Manager', salary: 60000 }
  // Additional data trimmed for brevity
];
```

## Column Definition

```javascript

const columns = [
  { name: 'id', header: 'ID', render: (value, row) => `<a href="/user/profile/${row.id}">${row.id}</a>`, sortable: true },
  { name: 'fullName', header: 'FULL NAME', joinedColumns: ['name', 'surname'] },
  { name: 'age', header: 'AGE', sortable: true },
  { name: 'role', header: 'ROLE' },
  { name: 'salary', header: 'SALARY', render: '<strong>R{salary}</strong>', sortable: true,

    actions: [
      {
        label: 'EDIT',
        url: 'edit/{id}',
        class: 'edit',
        id: 'edit-{id}',
      },
      {
        label: 'DELETE',
        url: 'delete/{id}',
        class: 'delete',
        id: 'delete-{id}',
        confirm: true,
      }, 
    ], 
  },
];

// create a new instance of AnyGrid

const dataGrid = new anyGrid(data, columns, 10);
```


# Default Features 

AnyGridJS has these built in features enabled by default: Features like search/filter, sort, actions (row actions like edit or delete), pagination, items per page, dynamic headers and initial items per page. Therefore you do not need to declare them in the features object. However, AnyGridJS gives the option to disable these features if you don't need them. Below is an example of how you can disable these. 

```javascript
const features = {
  search: false,
  sort: false,
  actions: false,
  pagination: false,
  itemsPerPage: false,
  dynamicHeaders: false,
}
```


# Styling (Optional)

AnyGridJS is a headless js library - meaning the styling is entirely up to you, However as an option we offer a basic and high css themes to enhance the look and feel of your data tables. If you want to use the provided css just deploy anyGrid.css via this cdn link:

Place this somewhere in the head section of your html.

```html

  <link rel="stylesheet" href="https://unpkg.com/anygridcss@1.0.1/anyGrid.css" anygrid-style>

```

## Color Themes

AnyGrid css offer these color themes: default (dark), light, blue, pink, dark-orange, green and indigo. 
You can define your prefer color theme on the features object this way:

```javascript
const features = {

theme: 'pink';

}
```

# Block Table Style Mobile displays

AnyGridJS styles and themes come with block table style for mobile screen displays. 

<img src="https://github.com/thincmedia/anyGridJs/blob/main/images/mobile-friendly-js-datagrid-anygrid.png" alt="Mobile Friedly Datagrid Displays">



# Using Custom Containers (useful for multiple data grids)

By default, AnyGrid will place your data grid in the element with the id: anygrid eg:

 ```html 
  <div id="anygrid">Your data grid will be displayd here</div>
  ``` 

  However using custom container ids can be useful particularly if you want to display more than one data grids on the same page. 

1. Define your custom container 

``` html
<div id="users"></div>
```

Having defined your data and columns for your AnyGrid instance you can then invoke the AnyGrid class with the custom container id parameter: 

```javascript
const containerId='users';
const dataGrid = new anyGrid(data, columns, 10, containerId);
//or 
const dataGrid = new anyGrid(data, columns, 10, 'users');
```

*You need to use this approach for every instance of AnyGrid you need to implement on your page.*


## Contribute
AnyGrid is an open-source project. Contributions, issues, and feature requests are welcome!
## License
AnyGrid is licensed under the MIT License.
## Keywords

- JavaScript data tables
- JS data grid
- Table pagination js
- Table column sorting js
- Searchable data table js
- JS data tables with column joining
- JS data tables with action handles
- JS data tables with URL definition
- Framework Agnostic js data tables
- Vanilla JS data tables
- Lightweight JS Library data tables
- Customizable js data tables
- Responsive Design js data tables
- Front-end Development js data tables
- Dynamic JS Data Tables
- Interactive Data Tables

