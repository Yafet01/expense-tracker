const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// File paths
const expenseFilePath = path.join(__dirname, 'expense.json');
const budgetFilePath = path.join(__dirname, 'budget.json');

// Ensure file exists
function ensureFileExists(filePath, defaultValue) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    }
}

ensureFileExists(expenseFilePath, []);
ensureFileExists(budgetFilePath, { amount: 0 });

// Read & write functions
function readJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Add expense
function addExpense(description, amount, category) {
    const expenses = readJSON(expenseFilePath);
    const date = new Date().toISOString().split('T')[0];
    const id = expenses.length ? Math.max(...expenses.map(exp => exp.id)) + 1 : 1;
    
    expenses.push({ id, description, amount: parseFloat(amount), category, date });
    writeJSON(expenseFilePath, expenses);
    console.log(`Expense added successfully (ID: ${id})`);
}

// List expenses
function listExpenses() {
    const expenses = readJSON(expenseFilePath);
    console.log("ID  Date       Description  Category  Amount");
    expenses.forEach(expense => {
        console.log(`${expense.id}   ${expense.date}  ${expense.description}  ${expense.category}  $${expense.amount.toFixed(2)}`);
    });
}

// Delete expense
function deleteExpense(id) {
    let expenses = readJSON(expenseFilePath);
    const initialLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== parseInt(id));
    if (expenses.length < initialLength) {
        writeJSON(expenseFilePath, expenses);
        console.log("Expense deleted successfully");
    } else {
        console.log("Expense not found");
    }
}

// Summary of expenses
function summary(month) {
    const expenses = readJSON(expenseFilePath);
    let total = 0;
    if (month) {
        month = parseInt(month);
        expenses.forEach(expense => {
            const expenseMonth = new Date(expense.date).getMonth() + 1;
            if (expenseMonth === month) {
                total += expense.amount;
            }
        });
        console.log(`Total expenses for month ${month}: $${total.toFixed(2)}`);
    } else {
        total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        console.log(`Total expenses: $${total.toFixed(2)}`);
    }
}

// Set monthly budget
function setBudget(amount) {
    writeJSON(budgetFilePath, { amount: parseFloat(amount) });
    console.log(`Budget set to $${amount}`);
}

// Check budget status
function checkBudget() {
    const budget = readJSON(budgetFilePath).amount;
    const expenses = readJSON(expenseFilePath);
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`Total expenses: $${total.toFixed(2)}, Budget: $${budget.toFixed(2)}`);
    if (total > budget) {
        console.log("Warning: You have exceeded your budget!");
    }
}

// Export expenses to CSV
function exportToCSV() {
    const expenses = readJSON(expenseFilePath);
    const csvContent = "ID,Date,Description,Category,Amount\n" +
        expenses.map(exp => `${exp.id},${exp.date},${exp.description},${exp.category},${exp.amount.toFixed(2)}`).join("\n");
    fs.writeFileSync("expenses.csv", csvContent);
    console.log("Expenses exported to expenses.csv");
}

// CLI Commands
program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <desc>', 'Expense description')
    .requiredOption('--amount <amount>', 'Expense amount', parseFloat)
    .requiredOption('--category <category>', 'Expense category')
    .action((options) => addExpense(options.description, options.amount, options.category));

program
    .command('list')
    .description('List all expenses')
    .action(() => listExpenses());

program
    .command('delete')
    .description('Delete an expense by ID')
    .requiredOption('--id <id>', 'Expense ID', parseInt)
    .action((options) => deleteExpense(options.id));

program
    .command('summary')
    .description('Show expense summary')
    .option('--month <month>', 'Show summary for a specific month', parseInt)
    .action((options) => summary(options.month));

program
    .command('set-budget')
    .description('Set monthly budget')
    .requiredOption('--amount <amount>', 'Budget amount', parseFloat)
    .action((options) => setBudget(options.amount));

program
    .command('check-budget')
    .description('Check budget status')
    .action(() => checkBudget());

program
    .command('export')
    .description('Export expenses to CSV')
    .action(() => exportToCSV());

program.parse(process.argv);
