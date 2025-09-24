# AnyGrid Data Grid Documentation

[![NPM](https://img.shields.io/npm/v/anygridjs.svg)](https://www.npmjs.com/package/anygridjs)
[![NPM Downloads](https://img.shields.io/npm/dt/anygridjs.svg)](https://www.npmjs.com/package/anygridjs)
[![GitHub Stars](https://img.shields.io/github/stars/Gugulethu-Nyoni/anygridjs.svg)](https://github.com/Gugulethu-Nyoni/anygridjs/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/Gugulethu-Nyoni/anygridjs.svg)](https://github.com/Gugulethu-Nyoni/anygridjs/issues)
<a href="https://github.com/Gugulethu-Nyoni/anygridjs/blob/main/LICENSE">
  <img alt="anygridjs uses the MIT license" src="https://img.shields.io/github/license/Gugulethu-Nyoni/anygridjs" style="max-width: 100%;">
</a>
[![GitHub Workflow](https://img.shields.io/github/workflow/status/Gugulethu-Nyoni/anygridjs/CI/main.svg)](https://github.com/Gugulethu-Nyoni/anygridjs/actions)



<img src="https://github.com/Gugulethu-Nyoni/anygrid/blob/main/images/anygridjs-datagrid-js-datatable-example.png" alt="AnyGrid Example">

#### AnyGrid offers a powerful, flexible data grid system with built-in form integration, pagination, sorting, modals (with functional edit and delete capabilties), and more — all without having to touch any HTML or CSS.

While the library is built for the Semantq JS Framework - AnyGrid is framework agnostic and can work with any JS Framework and vanilla JavaScript. 

## Table of Contents  
- [AnyGrid Data Grid Documentation](#anygrid-data-grid-documentation)  
- [Feature Overview](#feature-overview)  
  - [Data Handling & Display](#data-handling--display)  
  - [Customization & Theming](#customization--theming)  
  - [Interactivity & Modals](#interactivity--modals)  
  - [Integration & Deployment](#integration--deployment)  
- [Why Choose AnyGrid?](#why-choose-anygrid)  
- [Installation & Usage](#installation--usage)  
  - [Installation](#installation)  
  - [Usage](#usage)  
- [The Data Object](#the-data-object)  
- [Column Definition](#column-definition)  
- [Default Features](#default-features)  
- [Styling (Optional)](#styling-optional)  
  - [Color Themes](#color-themes)  
- [API Integration with smQL](#api-integration-with-smql)  
- [Advanced Usage](#advanced-usage)  
- [Using Custom Containers](#using-custom-containers)  
- [Contribute](#contribute)  
- [License](#license)  
- [Additional Resources](#additional-resources)  


## Feature Overview

### Data Handling & Display

* **Flexible Data Presentation**:
    * **Pagination**: Easily navigate large datasets with configurable items per page, ensuring optimal performance and user experience.
    * **Search & Filtering**: Empower users with an integrated search functionality for quick and efficient data filtering.
    * **Sorting**: Enable data sorting by specific columns, with options to configure which columns are sortable.
* **Advanced Column Management**:
    * **Custom Column Display**: Choose precisely which columns from your form data to display in the grid.
    * **Joinable Columns**: Combine data from multiple columns (e.g., `name` and `surname` rendered as `fullName`) for enhanced readability and visualization.
    * **Custom Rendering**: Deploy custom JavaScript functions or inject HTML directly into data rendering, allowing for highly flexible and dynamic cell content.

### Customization & Theming

* **Effortless Theming**:
    * **Built-in Themes**: Apply predefined visual themes by simply defining your preferred theme (e.g., `theme: 'blue'`) in the `features` object.
    * **Custom Theme Colors**: Override built-in themes or define a unique aesthetic by specifying a custom main color using a HEX code (e.g., `themeColor: '#4f4f4d'`) in your `features` object.
* **Action Handles**: Integrate custom action buttons (e.g., "Edit," "Delete") directly within table rows, providing interactive functionality.

### Interactivity & Modals

* **Grid Modal for Detailed Views**:
    * **Row-Click Modal**: Enable a `gridModal` option to allow users to click on any row and view the full record details in a dedicated modal window.
    * **In-Modal Editing & Deleting**: The modal mode provides options for record editing and deleting. This is particularly useful for use cases where you want to disable inline editing/deleting (e.g., for lower-level users or front-end displays).
    * **Seamless API Integration**: Grid Modal editing and deleting (including a confirmation step for deleting) are backed by a fully functional API. You simply need to pass your record editing and deleting endpoints in the `features` object. e.g. `dataApiEndPoint: 'http://localhost:3000/product/products',`
    * **Dynamic UI Updates**: All modal editing and deleting features occur on-screen without a page refresh. AnyGrid seamlessly updates the data grid and the modal itself after record modifications, ensuring a smooth and responsive user experience without page reloads.

### Integration & Deployment

* **Easy & Quick Deployment**: AnyGrid is designed for rapid deployment. All you need is your `$data` object, column definitions, and an optional `features` object to get started.
* **Multiple Grid Capability**: Implement the capability to display multiple independent data grids on the same page, each with its own data and configurations.
* **Formique Integration**: Works seamlessly with Formique, a robust code, low-code/no-code JavaScript-driven form builder, enabling you to write complete forms with robust inbuilt form submission logic without touching HTML or CSS.
* **On-the-Fly Export**: Optionally enable CSV and Excel export formats for your data directly from the grid interface.

* **Sticky Table Headers**: Keep headers visible while scrolling for better usability.
* **Framework Agnostic**: Works with any JavaScript framework (Semantq, React, Angular, Vue, Svelte etc.) or vanilla JS.
* **Modularity and Features Optionality**: Choose only the features you need for a lightweight and tailored implementation.


## Why Choose AnyGrid?

 - Vanilla JS: No dependencies, works with any JavaScript framework or vanilla JS
 - Lightweight: Minimal footprint, optimized for performance
 - Customizable: Adapt the library to fit your project's unique needs
 - Responsive: Tables adapt to various screen sizes and devices
 - Flexible: Integrate with your preferred framework or use with vanilla JS
Get Started
- Extensible: you can extend the features nd functions of the library
- Minimal Configs: all you need is  a div with anygrid or custom id name,  a json data object, column definition, features object (optional) in your app.js or via script tag directly on the html. See usage section below.

## Installation & Usage


### Installation

```bash
npm install anygridjs
```

Import into your project:

```js
import AnyGrid from 'anygridjs';
```

**Using AnyGrid in Non-Bundler Environments**

If you're not using a bundler (or working in an environment that doesn't handle `npm` installs and ES module imports), you can simply include AnyGrid via CDN. Add the following `<script>` tag inside the `<head>` or just before the closing `</body>` tag of your HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/anygridjs@1.0.13/anyGrid.global.min.js"></script>
```

This will make `AnyGrid` available globally as a browser-friendly script.

### Usage


Get the AnyGrid css via the cdn link. 

```html
<link rel="stylesheet" href="https://unpkg.com/anygridcss@1.0.4/anyGrid.css" />
```


> **Note:** You should check the latest CSS version here:  
> - [`https://unpkg.com/anygridcss/`](https://unpkg.com/anygridcss/)  
> - [`https://www.npmjs.com/package/anygridcss`](https://www.npmjs.com/package/anygridcss)  


In a Semantq project you can place that stylesheet link tag inside the `@head ...link tag here.. @end` section of your `@layout.smq` page inside the route where you want to use AnyGrid.

You would have created the route this way: 

`semantq make:route products -l`

this will create a dir:

`src/routes/products`

inside that directory there would two files 

`@page.smq` and `@layout.smq`

[For more on this you can view the Semantq Layouts Guide here](https://github.com/Gugulethu-Nyoni/semantq/blob/main/docs/SemantqLayouts.md)


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

2. The JS api call



 ## app.js (For non Semantq environments)

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
theme: 'pink',
gridModal:true,
modalConfig: {
  editable: true,
  deletable:true,
  nonEditableFields:['id']
}
}

const dataGrid = new AnyGrid(data, columns, features);
```

### NOTE that the features object is optional so you can invoke AnyGrid without the features object as shown below:


```javascript
const dataGrid = new AnyGrid(data, columns);
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
  { 
    name: 'id', 
    header: 'ID', 
    render: (value, row) => `<a href="/user/profile/${row.id}">${row.id}</a>`, 
    sortable: true, 
    noModal: true // Prevents this cell from triggering the modal
  },
  { name: 'fullName', header: 'FULL NAME', joinedColumns: ['name', 'surname'] },
  { name: 'age', header: 'AGE', sortable: true },
  { name: 'role', header: 'ROLE' },
  { 
    name: 'salary', 
    header: 'SALARY', 
    render: '<strong>R{salary}</strong>', 
    sortable: true,

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

const dataGrid = new anyGrid(data, columns);
```

> **Note:**
> The `noModal: true` property is useful when `gridModal: true` is enabled in `features`. Normally, clicking anywhere in a row would open the modal with record details.
> By setting `noModal: true` on a specific column, you **exclude that cell from triggering the modal**. This is ideal for cases where a column already has its own clickable action (e.g., profile links, external navigation, or inline buttons) and you don’t want the modal trigger to interfere with that interaction.


# Default Features 

AnyGrid has these in built features enabled by default: search/filter, sort, actions (row actions like edit or delete), pagination, items per page, dynamic headers and initial items per page. Therefore you do not need to declare them in the features object. However, AnyGrid gives the option to disable these features if you don't need them. Below is an example of how you can disable these features. 

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

AnyGrid is a headless JS library - meaning the library can still work without any CSS and the styling is entirely up to you. However as an option we offer a basic and high end css themes to enhance the look and feel of your data tables. If you want to use the provided css just deploy anyGrid.css via this cdn link as demonstated earlier in the docs. 


## Color Themes

AnyGrid css offer these color themes: default (dark), light, blue, pink, dark-orange, green and indigo. 

You can define your preferred color theme on the features object this way:

```javascript
const features = {

theme: 'pink'

}
```


### 🌐 API Integration with smQL (For NPM environments)

Use `@semantq/ql` for fetching and submitting data efficiently.

#### Install

```bash
npm install @semantq/ql
```

#### Import

```js
import smQL from '@semantq/ql';
```

#### Fetching data:

```js
const records = await new smQL(API_END_POINT); 
```

> `smQL` handles GET, POST, PUT, DELETE behind the scenes and simplifies async handling.
> It's recommended to declare `API_END_POINT` (e.g. `http://localhost:3000/product/products`) as a constant or environment variable for maintainability.


### Edit & Delete API Structure in SemantqQL (Semantq Context)

In the **SemantqQL** full-stack project, the API routes for editing and deleting records follow a consistent structure:

```
{server_url} / {model_name (lowercase)} / {route_name}
```

For example, if you create this resource:

`semantq make:resource Product`

The API endpoint for editing or deleting records would look like:

```
http://localhost:3000/product/products
```

Note that `http://localhost:3000/` is just an example. 

You can always confirm or modify these routes by checking the `semantqQL/server/routes/modelRoutes.js` file.


## Advanced Usage

### Column Definition and Feature Configuration

```js
const features = {
  initialItemsPerPage: 5,
  csvExport: true,
  excelExport: true,

  theme: 'indigo', // Optional: Built-in colour themes like 'indigo', 'green', 'slate', etc.
  themeColor: '#556B2F', // Optional: Custom HEX colour to override built-in theme

  gridModal: true, // NEW: Enables row-click modal interaction
  modalConfig: {
    editable: true,                  // Show "Edit" button in modal
    deletable: true,                 // Show "Delete" button in modal
    nonEditableFields: [             // Fields will show in modal but cannot be edited
      'id', 'uuid', 'status', 
      'sortOrder', 'createdAt', 'updatedAt'
    ],
    hiddenFields: [                  // Fields will not be shown at all in modal
      'id', 'uuid', 'status', 
      'sortOrder', 'createdAt', 'updatedAt'
    ]
  },

  dataApiEndPoint: 'http://localhost:3000/product/products', // For update/delete actions
};
```

### New Feature Explanations

#### `gridModal` (Default: `false`)

* When enabled, clicking on any row opens a modal displaying full record details.
* This modal is useful for CRUD-lite use cases where inline editing is disabled.
* Controlled via `modalConfig`:

| Option              | Description                              |
| - | - |
| `editable`          | Enables "Edit" button inside the modal   |
| `deletable`         | Enables "Delete" button inside the modal |
| `nonEditableFields` | Prevents editing of specified fields     |


#### `dataApiEndPoint`

* Sets the URL for **update** and **delete** operations (used by the modal).
* Automatically appends record ID to the endpoint for PUT and DELETE requests.

```js
// Example:
PUT    /product/products/6
DELETE /product/products/6
```

#### `themeColor`

* Accepts a custom HEX code (e.g. `#556B2F`) - this will override the theme if a theme is also defined in the features object.
* Affects button backgrounds, hover states, modal accents, and more.


### If you want to use the default/dark theme then you don't need to define the theme parameter in your features object. 

# Block Table Style Mobile displays

AnyGrid styles and themes come with block table style for mobile screen displays. See example below: 

<img src="https://github.com/thincmedia/AnyGrid/blob/main/images/mobile-friendly-js-datagrid-anygrid.png" alt="Mobile Friedly Datagrid Displays">

AVAILABLE IN BUILT THEMES (List is to be extended)

- default or dark
- Light
- Pink
- Indigo
- Blue
- Dark Orange
- Green

# Using Custom Containers (useful for multiple data grids)

By default, AnyGrid will place your data grid in the element with the id: anygrid eg:

 ```html 
  <div id="anygrid">Your data grid will be displayd here</div>
  ``` 

  However using custom container ids can be useful particularly if you want to display more than one data grids on the same page. See below.

1. Define your custom container 

``` html
<div id="users"></div>
```

Having defined your data and columns for your AnyGrid instance you can then invoke the AnyGrid class with the custom container id parameter: 

```javascript
const containerId='users';
const dataGrid = new anyGrid(data, columns, features);
//or without the features object
const dataGrid = new anyGrid(data, columns);
```

*You need to use this approach for every instance of AnyGrid you need to implement on your page.*

[Laravel Implementaton Guide](docs/Laravel-guide.md)


## Contribute
AnyGrid is primarily an open-source project. Contributions, issues, and feature requests are welcome!
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
- Datagrid Modals
- DataGrid Crud
- Datagrid with edit and delete options

#### For more details, visit:

- [AnyGridJS GitHub Repository](https://github.com/Gugulethu-Nyoni/anygrid)
- [AnyGridJS Documentation](https://anygridjs.com/)

## Additional Resources

- [AnyGrid Main Documentation](https://github.com/Gugulethu-Nyoni/anygrid)
- [Laravel Basic Integration Guide](https://github.com/Gugulethu-Nyoni/anygrid/blob/main/docs/Lavavel.md)
- [Laravel Eloquent ORM Integration Guide](https://github.com/Gugulethu-Nyoni/anygrid/blob/main/docs/Laravel-guide.md)

- [Mastering Obect Relational Mapping In Laravel: Spotlight On AnyGrid JS](https://dev.to/gugulethu_nyoni/mastering-obect-relational-mapping-in-laravel-a-spotlight-on-anygrid-js-3ckf)

Danko! Ngyabonga -:)