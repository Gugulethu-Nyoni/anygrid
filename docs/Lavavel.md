#  AnyGrid Laravel Implementation Documentation

## Overview

This documentation provides a step-by-step guide for implementing AnyGrid in a Laravel application. AnyGrid is a lightweight, feature-rich JavaScript library for creating dynamic data tables with pagination, sorting, searching, column joining, action handles, and URL definitions.

## Installation

### 1. Include CSS and JavaScript

Add the following CDN links to your layout file (typically `resources/views/layouts/admin.blade.php`):

```html
<link rel="stylesheet" href="https://unpkg.com/anygridcss@1.0.1/anyGrid.css" anygrid-style>
<script src="https://cdn.jsdelivr.net/npm/anygridjs@1.0.9/anyGrid.global.min.js"></script>
```

## Controller Implementation

### 2. Create Controller Method

Create a controller method to fetch and pass data to your view:

```php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function users()
    {
        // Get all users from the database
        $users = User::all();

        // Pass the users to the view
        return view('dashboard.users', compact('users'));
    }
}
```

## View Implementation

### 3. Create Blade View

Create a view file (e.g., `resources/views/dashboard/users.blade.php`) with the following structure:

```html
@extends('layouts.admin')
@section('content')
    <h1>Admin Dashboard</h1>
    
    <!-- AnyGrid container -->
    <div id="anygrid"></div>

    <script type="module">
        const data = @json($users);

        //console.log(data);

        // Column definitions
        const columns = [
            { 
                name: 'id', 
                header: 'ID', 
                render: (value, row) => `<a href="view/${row.id}">${row.id}</a>`, 
                sortable: true 
            },
            { 
                name: 'fullName', 
                header: 'FULL NAME', 
                joinedColumns: ['first_name', 'surname'] 
            },
            { 
                name: 'mobile', 
                header: 'Mobile', 
                sortable: true 
            },
            { 
                name: 'email', 
                header: 'Email' 
            },
            { 
                name: 'member_status', 
                header: 'Member Status', 
                render: (value, row) => value === 1 ? 'Yes' : 'No'
            },
            { 
                name: 'country', 
                header: 'Country', 
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
                    {
                        label: 'View',
                        url: 'view/{id}',
                        class: 'edit',
                        id: 'view-{id}',
                    }, 
                    {
                        label: 'Membership Payment(S)',
                        url: 'sim/membership/{id}',
                        class: 'simulate',
                        confirm: true,
                    },
                    {
                        label: 'Product Purchase(S)',
                        url: 'sim/purchase/{id}',
                        class: 'simulate2',
                        confirm: true,
                    }
                ], 
            },
        ];

        // Grid features configuration
        const features = {
            initialItemsPerPage: 30,
            csvExport: true,
            excelExport: true,
            theme: 'light'
        }

        // Initialize AnyGrid
        const dataGrid = new AnyGrid(data, columns, features);
    </script>
@endsection
```

## Key Features Implemented

1. **Data Binding**: The Laravel controller passes data to the view using `@json()` directive
2. **Column Configuration**:
   - ID column with custom rendering as a link
   - Joined columns (first_name + surname as fullName)
   - Custom rendering for member_status (1 → "Yes", else "No")
3. **Action Handles**: Multiple action buttons per row (Edit, Delete, View, etc.)
4. **Grid Features**:
   - Pagination (30 items per page)
   - CSV and Excel export
   - Dark theme

## Advanced Usage

For Object Relational Mapping Laravel-specific implementations Refer to the [AnyGrid Laravel ORM Documentation](https://github.com/Gugulethu-Nyoni/anygrid/blob/main/docs/Laravel-guide.md)

## Troubleshooting

1. **Data Not Displaying**: Verify your controller is passing the data correctly and check browser console for errors
2. **Column Mismatches**: Ensure column names match your database fields
3. **Action URLs**: Make sure your route definitions match the URLs in your action configurations


For more details, visit:
- [AnyGridJS GitHub Repository](https://github.com/Gugulethu-Nyoni/anygrid)
- [AnyGridJS Documentation](https://anygridjs.com/)

## Additional Resources

- [AnyGrid Main Documentation](https://github.com/Gugulethu-Nyoni/anygrid)
- [Laravel Eloquent ORM Integration Guide](https://github.com/Gugulethu-Nyoni/anygrid/blob/main/docs/Laravel-guide.md)
- [Mastering Obect Relational Mapping In Laravel: Spotlight On AnyGrid JS](https://dev.to/gugulethu_nyoni/mastering-obect-relational-mapping-in-laravel-a-spotlight-on-anygrid-js-3ckf)