# Expense Tracker

Sample solution for the [Expense Tracker](https://roadmap.sh/projects/expense-tracker) from [roadmap.sh](https://roadmap.sh/)

## Features
- Users can add an expense with a description and amount.
- Users can update an expense.
- Users can delete an expense.
- Users can view all expenses.
- Users can view a summary of all expenses.
- Users can view a summary of expenses for a specific month (of current year).
- Add expense categories and allow users to filter expenses by category.
- Allow users to set a budget for each month and show a warning -when the user exceeds the budget.
- Allow users to export expenses to a CSV file.

## Requirement
- Node.js installed on your system 

## Installation
To get started, clone the repo;
```bash
git clone https://github.com/Yafet01/Expense-Tracker-CLI
cd Expense-Tracker-CLI
```
# Install Dependencies:
In the terminal, navigate to the directory where your expense.js file is located and run:
```bash
npm install commander
```
## Usage
Run the application using:
```bash
node expense.js <command> [options]
```
## Commands
### 1.Add Expenses
- Add new expense
**Usage:**
```bash
node expense.js add --description "Description" --amount <amount> --category "Category"
```
**Options:**
`--description <desc>`: The description of the expense. (Required)
`--amount <amount>`: The amount of the expense. (Required)
`--category <category>`: The category of the expense (e.g., Food, Travel). (Required)


### 2.List Expenses
- List all expenses.
**Usage:**
```bash
node expense.js list
```
This will display all the expenses stored in the `expense.json` file.


### 3.DELETE Expense
Deletes an expense by its Unique ID.
**Usage:**
```bash
node expense.js delete --id <id>
```
`--id <id>`: The unique identifier of the expense to be deleted. (Required)

### 4.Expense Summary
Displays a summary with the option to filter by a specific month.

**Usage:**
- Total Summary:
```bash
node expense.js summary
```
- Monthly Summary:
```bash
node expense.js summary --month <month>
```
`--month <month>`: The month number (1-12) for which you want to see the summary. (Optional)

### 5.Set Monthly Budget
Sets your monthly spending budget.
**Usage:**
```bash
node expense.js set-budget --amount <amount>
```
`--amount <amount>`: The budget amount you wish to set. (Required)

### 6.Check Budget
Compares your total expenses to your set monthly budget and displays a warning if you have exceeded it.
**Usage:**
```bash
node expense.js check-budget
```
This will display the total expenses and compare them with the set budget.

### 7.Export Expenses
Exports all recorded expenses to a CSV file.
**Usage:**
```bash
node expense.js export
```
This will create a file `expenses.csv` containing all the expense records.

## Example Iputs:
### 1.Add Expense
To add a new expense, use the following command:
```bash
node expense.js add --description "Lunch at Cafe" --amount 15.50 --category "Food"
```

### 2.List Expense
To list all expenses, use the following command:
```bash
node expense.js list
```

### 3.Delete Expense
To delete an expense by ID, use the following command:
```bash
node expense.js delete --id 1
```

### 4.Summary of Expenses
To view a summary of all expenses, use:
```bash 
node expense.js summary
```
To view a summary for a specific month (e.g., for February):
```bash
node expense.js summary --month 2
```


### 5.Set Monthly Budget
To set the monthly budget, use:
```bash
node expense.js set-budget --amount 500.00
```

### 6. Check Budget Status
To check the current status of your budget:
```bash
node expense.js check-budget
```

### 7.Export Expenses to CSV
To export your expenses to a CSV file:
```bash
node expense.js export
```

