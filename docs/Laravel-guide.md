# AnyGrid Laravel (Eloquent) Object-Relational Mapping (ORM) Documentation

This guide provides a concise overview of integrating AnyGrid with Laravel, focusing on Object-Relational Mapping (ORM) and rendering relational data efficiently.

For basic implementation of AnyGrid in Laravel you can refer to: - [Laravel Basic Integration Guide](https://github.com/Gugulethu-Nyoni/anygrid/blob/main/docs/Lavavel.md)


---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [ORM with Eager Loading](#orm-with-eager-loading)
5. [Frontend Integration with AnyGridJS](#frontend-integration-with-anygridjs)
6. [Conclusion](#conclusion)

---

## Prerequisites
- PHP ≥ 8.1
- Composer
- Node.js
- Laravel 10+
- Basic knowledge of Laravel and JavaScript

---

## Installation

### 1. Install Laravel
Create a new Laravel project:
```bash
composer create-project --prefer-dist laravel/laravel anygrid-laravel
cd anygrid-laravel
php artisan serve
```

### 2. Add AnyGridJS to Your Project
Include AnyGridJS via CDN in your Blade layout (`resources/views/layouts/app.blade.php`):
```html
<!-- AnyGrid CSS -->
<link rel="stylesheet" href="https://unpkg.com/anygridcss@1.0.1/anyGrid.css" anygrid-style>

<!-- AnyGrid JS -->
<script src="https://cdn.jsdelivr.net/npm/anygridjs@1.0.9/anyGrid.global.min.js"></script>
```

---

## Database Setup

### 1. Create Models and Migrations
Generate models and migrations for `Product` and `ProductCategory`:
```bash
php artisan make:model ProductCategory -m
php artisan make:model Product -m
```

### 2. Define Schema
Update the migrations:
- **ProductCategory Migration** (`database/migrations/YYYY_MM_DD_create_product_categories_table.php`):
  ```php
  public function up()
  {
      Schema::create('product_categories', function (Blueprint $table) {
          $table->id();
          $table->string('name')->unique();
          $table->text('description')->nullable();
          $table->timestamps();
      });
  }
  ```

- **Product Migration** (`database/migrations/YYYY_MM_DD_create_products_table.php`):
  ```php
  public function up()
  {
      Schema::create('products', function (Blueprint $table) {
          $table->id();
          $table->string('name');
          $table->text('description')->nullable();
          $table->decimal('price', 10, 2);
          $table->foreignId('product_category_id')->constrained()->onDelete('cascade');
          $table->timestamps();
      });
  }
  ```

### 3. Define Model Relationships
- **ProductCategory Model** (`app/Models/ProductCategory.php`):
  ```php
  public function products()
  {
      return $this->hasMany(Product::class);
  }
  ```

- **Product Model** (`app/Models/Product.php`):
  ```php
  public function category()
  {
      return $this->belongsTo(ProductCategory::class, 'product_category_id');
  }
  ```

### 4. Run Migrations
Apply the schema to your database:
```bash
php artisan migrate
```

---

## ORM with Eager Loading

### 1. Fetch Data Efficiently
Use Laravel's `with()` method to avoid the N+1 query problem:
```php
$products = Product::with('category')->get();
```

### 2. Controller Implementation
In `app/Http/Controllers/ProductController.php`:
```php
public function index()
{
    $products = Product::with('category')->get();
    return view('shop.products', compact('products'));
}
```

### 3. Performance Comparison
| Aspect                | Without Eager Loading | With Eager Loading |
|-----------------------|-----------------------|---------------------|
| Number of Queries     | 1 + N (1 per product) | 2 (Products + Categories) |
| Query Efficiency      | Slow (multiple hits)  | Fast (batched)     |
| Result Structure      | Flat (No relations)   | Nested (Relations loaded) |
| Memory Usage          | Higher                | Lower              |

---

## Frontend Integration with AnyGridJS

### 1. Pass Data to the View
Update the `index` method in `ProductController.php`:
```php
public function index()
{
    $products = Product::with('category')->get();
    return view('shop.products', compact('products'));
}
```

### 2. Create the Blade View
In `resources/views/shop/products.blade.php`:
```blade
@extends('layouts.app')
@section('content')
    <h1>Product Listings</h1>
    <div id="anygrid"></div>

    <script type="module">
        const data = @json($products);

        const columns = [
            { name: 'id', header: 'ID', sortable: true },
            { name: 'name', header: 'Product Name', sortable: true },
            { name: 'price', header: 'Price', render: (value) => `R ${value}` },
            { name: 'category_id', header: 'Category', render: (value, row) => row.category ? row.category.name : 'N/A' },
            { name: 'created_at', header: 'Created Date', sortable: true },
            {
                name: 'actions',
                header: 'Actions',
                actions: [
                    { label: 'EDIT', url: 'products/edit/{id}', class: 'edit', id: 'edit-{id}' },
                    { label: 'DELETE', url: 'products/delete/{id}', class: 'delete', id: 'delete-{id}', confirm: true },
                    { label: 'VIEW', url: 'products/view/{id}', class: 'view', id: 'view-{id}' },
                ]
            }
        ];

        const features = {
            initialItemsPerPage: 20,
            csvExport: true,
            excelExport: true,
            theme: 'dark'
        };

        new AnyGrid(data, columns, features);
    </script>
@endsection
```

**Note**

Note how we get the product category name in the column definition object: ```row.category.name```

```javascript
{ name: 'category_id', header: 'Category', render: (value, row) => row.category ? row.category.name : 'N/A' },
```

### 3. Define Routes
In `routes/web.php`:
```php
use App\Http\Controllers\ProductController;
Route::get('/products', [ProductController::class, 'index']);
```

---

## Conclusion
This guide demonstrated how to:
1. Set up Laravel with AnyGridJS.
2. Use ORM and eager loading to optimize database queries.
3. Render relational data dynamically in the frontend using AnyGridJS.

For more details, visit:
- [Laravel Basic Integration Guide](https://github.com/Gugulethu-Nyoni/anygrid/blob/main/docs/Lavavel.md)
- [AnyGridJS GitHub Repository](https://github.com/Gugulethu-Nyoni/anygrid)
- [AnyGridJS Documentation](https://anygridjs.com/)

---

## References
- [Laravel Eloquent Relationships](https://laravel.com/docs/10.x/eloquent-relationships)
- [N+1 Query Problem Explained](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it)
- [Mastering Obect Relational Mapping In Laravel: Spotlight On AnyGrid JS](https://dev.to/gugulethu_nyoni/mastering-obect-relational-mapping-in-laravel-a-spotlight-on-anygrid-js-3ckf)