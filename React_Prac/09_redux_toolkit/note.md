# Requirements

## Cusotmer Management

1. **Initial State**:

- When no customer exists, only the "Create new customer" form should be displayed.
- Other components (Welcome message, Account operations, Balance) should be hidden.

2. **Customer Creation**

- The form should validate inputs.
- After successful customer creation, the "Create new customer" form should disappear, the Welcome message, Account operations, and Balance display should appear

## Account Operations

1. **Deposit**

- Currency selection is available (USD, EUR, GBP)
- When depositing in USD, add directly to the balance
- When depositing in other currencies, convert to USD using an exchange rate API before adding to balance
- Input validation for deposit amount (positive number)

2. **Withdrawal**

- Allow withdrawals only if sufficient funds are available
- Display error message if withdrawal amount exceeds current balance
- Input validation for withdrawal amount (positive number)

3. **Loan Management**

- Request Loan:
  - Validate loan amount (positive number)
  - Validate loan purpose (non-empty)
  - Prevent multiple loans - display message "You cannot get another loan before you pay your current loan back" if a loan already exists
- Pay Loan:
  - Display the current loan amount to be paid
  - Check if balance is sufficient to pay the loan
  - If sufficient, subtract loan amount from balance and clear the loan
  - If insufficient, display appropriate error message

# Redux Toolkit

- In classic Redux:

  - Reducers must be pure functions
  - You must never mutate state directly
  - You have to create new state objects, typically using the spread operator
  - This is shown in your commented-out code with patterns like `{...state, balance: state.balance + action.payload}`

- In Redux Toolkit:
  - You can write code that appears to mutate state directly (like `state.balance += action.payload`)
  - This is possible because Redux Toolkit uses the Immer library under the hood
  - Immer lets you write "mutative" code, but behind the scenes it's actually creating a new immutable state object
