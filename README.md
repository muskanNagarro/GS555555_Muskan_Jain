## Implemneted
I have implemented following screens with the available data in attched sheets-
1. The Store dimension screen which should allow adding, removing, and updating
stores. One should be able to reorder Store as well.
2. The SKU dimension screen which should allow adding, removing, and updating
SKUs and their Prices and Costs.
3. The Planning screen which shows the AG-Grid with a cross join of Stores and
SKUs along the rows, and Calendar along the columns. The Calendar should
group Weeks by Months. It should have the following columns for each Week.
    a. Sales Units: Editable integer values for units sold
    b. Sales Dollars: Non-editable calculated field, formatted as currency. It
    should be calculated as: Sales Units * Price
    c. GM Dollars: Non-editable calculated field, formatted as currency. It
    should be calculated as: Sales Dollars – Sales Units * Cost
    d. GM %: Non-editable calculated field, formatted as percentage. It should be
    calculated as: GM Dollars / Sales Dollars. The cell background should be
    conditionally formatted using the following rules:
    i. Green if greater than or equal to 40%
    ii. Yellow if greater than or equal to 10% but less than 40%
    iii. Orange if greater than 5% but less than 10%
    iv. Red if less than or equal to 5%

## Login Credentials
Username = 'admin' 
Password = 'pass1234'


## Building

To build the project run:

```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Github link
https://github.com/muskanNagarro/GS555555_Muskan_Jain.git


## Website Host URL
https://gs-555555-muskan-jain-r9ta.vercel.app