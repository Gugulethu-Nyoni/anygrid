
        // Create an instance of AnyGrid and use it

const data = [
  { id: 1, name: 'John', surname: 'Doe', age: 30, role: 'Developer', salary: 50000 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 28, role: 'Designer', salary: 45000 },
  { id: 3, name: 'Jack', surname: 'Smith', age: 34, role: 'Product Manager', salary: 60000 },
  { id: 4, name: 'Emily', surname: 'Jones', age: 27, role: 'Marketing Specialist', salary: 47000 },
  { id: 5, name: 'Michael', surname: 'Brown', age: 40, role: 'Software Engineer', salary: 55000 },
  { id: 6, name: 'Sarah', surname: 'Davis', age: 32, role: 'UX Researcher', salary: 52000 },
  { id: 7, name: 'David', surname: 'Wilson', age: 29, role: 'Business Analyst', salary: 49000 },
  { id: 8, name: 'Laura', surname: 'Moore', age: 35, role: 'QA Engineer', salary: 48000 },
  { id: 9, name: 'Chris', surname: 'Taylor', age: 31, role: 'DevOps Engineer', salary: 60000 },
  { id: 10, name: 'Jessica', surname: 'Anderson', age: 26, role: 'Content Writer', salary: 43000 },
  { id: 11, name: 'Daniel', surname: 'Thomas', age: 38, role: 'HR Manager', salary: 65000 },
  { id: 12, name: 'Megan', surname: 'Jackson', age: 33, role: 'Sales Manager', salary: 57000 },
  { id: 13, name: 'Matthew', surname: 'White', age: 41, role: 'IT Director', salary: 70000 },
  { id: 14, name: 'Olivia', surname: 'Martin', age: 25, role: 'Graphic Designer', salary: 45000 },
  { id: 15, name: 'Andrew', surname: 'Lee', age: 36, role: 'Data Scientist', salary: 65000 },
  { id: 16, name: 'Ava', surname: 'Clark', age: 30, role: 'Project Coordinator', salary: 47000 },
  { id: 17, name: 'James', surname: 'Lewis', age: 28, role: 'Web Developer', salary: 50000 },
  { id: 18, name: 'Sophia', surname: 'Walker', age: 27, role: 'Customer Support', salary: 42000 },
  { id: 19, name: 'Benjamin', surname: 'Hall', age: 39, role: 'Network Administrator', salary: 54000 },
  { id: 20, name: 'Isabella', surname: 'Allen', age: 32, role: 'Research Scientist', salary: 62000 },
  { id: 21, name: 'Ethan', surname: 'Young', age: 37, role: 'Operations Manager', salary: 66000 },
  { id: 22, name: 'Charlotte', surname: 'King', age: 26, role: 'Database Administrator', salary: 51000 },
  { id: 23, name: 'Liam', surname: 'Wright', age: 29, role: 'Product Designer', salary: 48000 },
  { id: 24, name: 'Amelia', surname: 'Scott', age: 34, role: 'Financial Analyst', salary: 59000 },
  { id: 25, name: 'Oliver', surname: 'Green', age: 31, role: 'Software Architect', salary: 62000 },
  { id: 26, name: 'Harper', surname: 'Adams', age: 40, role: 'Compliance Officer', salary: 55000 },
  { id: 27, name: 'Jacob', surname: 'Baker', age: 33, role: 'Systems Analyst', salary: 50000 },
  { id: 28, name: 'Mia', surname: 'Nelson', age: 26, role: 'Digital Marketer', salary: 46000 },
  { id: 29, name: 'William', surname: 'Carter', age: 35, role: 'Technical Support', salary: 47000 },
  { id: 30, name: 'Ella', surname: 'Mitchell', age: 29, role: 'Event Planner', salary: 44000 },
  { id: 31, name: 'James', surname: 'Perez', age: 32, role: 'Network Engineer', salary: 53000 },
  { id: 32, name: 'Evelyn', surname: 'Roberts', age: 28, role: 'Business Development', salary: 49000 },
  { id: 33, name: 'Henry', surname: 'Turner', age: 39, role: 'Legal Advisor', salary: 67000 },
  { id: 34, name: 'Harper', surname: 'Phillips', age: 37, role: 'Data Engineer', salary: 62000 },
  { id: 35, name: 'Jackson', surname: 'Collins', age: 26, role: 'Account Manager', salary: 45000 },
  { id: 36, name: 'Avery', surname: 'Stewart', age: 30, role: 'Content Strategist', salary: 47000 },
  { id: 37, name: 'Lucas', surname: 'Sanchez', age: 33, role: 'Customer Success Manager', salary: 55000 },
  { id: 38, name: 'Zoe', surname: 'Morris', age: 27, role: 'Software Tester', salary: 48000 },
  { id: 39, name: 'Mason', surname: 'Rogers', age: 29, role: 'Technical Writer', salary: 47000 },
  { id: 40, name: 'Lily', surname: 'Cook', age: 31, role: 'Business Consultant', salary: 60000 },
  { id: 41, name: 'Elijah', surname: 'Morgan', age: 36, role: 'Sales Engineer', salary: 55000 },
  { id: 42, name: 'Grace', surname: 'Bennett', age: 24, role: 'Junior Developer', salary: 42000 },
  { id: 43, name: 'Sebastian', surname: 'James', age: 31, role: 'Solutions Architect', salary: 64000 },
  { id: 44, name: 'Chloe', surname: 'Watson', age: 29, role: 'HR Coordinator', salary: 45000 },
  { id: 45, name: 'Mila', surname: 'Brooks', age: 34, role: 'Administrative Assistant', salary: 43000 } 
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

// diable default features and add options 
const features = {
  //search: false,
  //sort: false,
  //actions: false,
  pagination: false,
  itemsPerPage: false,
  //dynamicHeaders: false,
  renderActionsInRows: true,
  initialItemsPerPage: 10,
  gridContainerId: 'anygrid'
}

const dataGrid = new AnyGrid(data, columns, features);


/// SECOND DATA GRID

const carsData = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2021, type: 'Sedan', price: 20000 },
  { id: 2, brand: 'Ford', model: 'Mustang', year: 2020, type: 'Coupe', price: 35000 },
  { id: 3, brand: 'Honda', model: 'Civic', year: 2019, type: 'Sedan', price: 22000 },
  { id: 4, brand: 'Chevrolet', model: 'Camaro', year: 2021, type: 'Coupe', price: 40000 },
  { id: 5, brand: 'BMW', model: 'X5', year: 2022, type: 'SUV', price: 60000 },
  { id: 6, brand: 'Audi', model: 'A4', year: 2018, type: 'Sedan', price: 30000 },
  { id: 7, brand: 'Mercedes-Benz', model: 'C-Class', year: 2020, type: 'Sedan', price: 45000 },
  { id: 8, brand: 'Volkswagen', model: 'Golf', year: 2021, type: 'Hatchback', price: 25000 },
  { id: 9, brand: 'Nissan', model: 'Altima', year: 2019, type: 'Sedan', price: 24000 },
  { id: 10, brand: 'Hyundai', model: 'Elantra', year: 2022, type: 'Sedan', price: 21000 },
  { id: 11, brand: 'Kia', model: 'Sorento', year: 2021, type: 'SUV', price: 32000 },
  { id: 12, brand: 'Mazda', model: 'CX-5', year: 2020, type: 'SUV', price: 28000 },
  { id: 13, brand: 'Subaru', model: 'Impreza', year: 2021, type: 'Hatchback', price: 27000 },
  { id: 14, brand: 'Tesla', model: 'Model 3', year: 2022, type: 'Sedan', price: 50000 },
  { id: 15, brand: 'Volvo', model: 'XC60', year: 2019, type: 'SUV', price: 45000 },
  { id: 16, brand: 'Jaguar', model: 'F-PACE', year: 2020, type: 'SUV', price: 55000 },
  { id: 17, brand: 'Land Rover', model: 'Discovery', year: 2021, type: 'SUV', price: 70000 },
  { id: 18, brand: 'Porsche', model: '911', year: 2022, type: 'Coupe', price: 100000 },
  { id: 19, brand: 'Lexus', model: 'RX', year: 2019, type: 'SUV', price: 47000 },
  { id: 20, brand: 'Infiniti', model: 'QX50', year: 2020, type: 'SUV', price: 38000 },
  { id: 21, brand: 'Acura', model: 'TLX', year: 2021, type: 'Sedan', price: 37000 },
  { id: 22, brand: 'Cadillac', model: 'Escalade', year: 2022, type: 'SUV', price: 80000 },
  { id: 23, brand: 'Chrysler', model: '300', year: 2018, type: 'Sedan', price: 29000 },
  { id: 24, brand: 'Jeep', model: 'Wrangler', year: 2020, type: 'SUV', price: 35000 },
  { id: 25, brand: 'Dodge', model: 'Charger', year: 2021, type: 'Sedan', price: 34000 },
  { id: 26, brand: 'Alfa Romeo', model: 'Giulia', year: 2019, type: 'Sedan', price: 43000 },
  { id: 27, brand: 'Mitsubishi', model: 'Outlander', year: 2020, type: 'SUV', price: 26000 },
  { id: 28, brand: 'Peugeot', model: '3008', year: 2021, type: 'SUV', price: 29000 },
  { id: 29, brand: 'Renault', model: 'Clio', year: 2022, type: 'Hatchback', price: 22000 },
  { id: 30, brand: 'Fiat', model: '500', year: 2020, type: 'Hatchback', price: 18000 },
];


const carsColumns = [
{ name: 'id', header: 'ID', render: (value, row) => `<a href="car/details/${row.id}"> ${row.id} </a>`, sortable: true },
{ name: 'brand', header: 'BRAND' },
{ name: 'model', header: 'YEAR & MODEL', joinedColumns: ['model', 'year'] },
{ name: 'type', header: 'TYPE'},
{ name: 'price', header: 'PRICE', render: 'R{price}' }

  ];


//const carsGrid = new AnyGrid(carsData, carsColumns, 5, 'carsTable'); 

