import AnyGrid from 'anygridjs';

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
  { name: 'id', header: 'ID' },
  { name: 'fullName', header: 'Full Name', joinedColumns: ['name', 'surname'] },
  { name: 'age', header: 'Age' },
  { name: 'role', header: 'Role' },
  { name: 'salary', header: 'Salary',
    actions: [
      {
        label: 'Edit',
        url: 'edit/{id}',
        class: 'edit',
        id: 'edit-{id}',
      },
      {
        label: 'Delete',
        url: 'delete/{id}',
        class: 'delete',
        id: 'delete-{id}',
        confirm: true,
      },
    ],
  },
];


const dataGrid = new AnyGrid(data, columns, 10);

