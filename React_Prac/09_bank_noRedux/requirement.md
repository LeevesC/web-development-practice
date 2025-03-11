# Bank App

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

# useReducer

`useReducer` is a React hook that's particularly useful when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. It's inspired by Redux's pattern but built into React.

- Core Concepts
  - Reducer Function: A pure function that takes the current state and an action, then returns the new state.
  - Action: An object that describes what happened (typically with a type property and optional payload).
  - Dispatch: A function that sends actions to the reducer.
  - Initial State: The starting state value.

# Pain Points that Redux could solve

- Middleware Support: Redux has built-in support for middleware like redux-thunk or redux-saga that make async operations more manageable.
- DevTools Integration: Redux has excellent developer tools for time-travel debugging and state inspection.
- Action Creators: Redux encourages the use of action creators, which can encapsulate complex logic for creating actions.
- Selectors: Redux ecosystems often use selectors to efficiently derive data from state, which isn't built into useReducer.
- Scalability: As your application grows, useReducer contexts can become unwieldy. Redux provides better patterns for scaling state management.
- State Persistence: Redux has established patterns for persisting and rehydrating state (with redux-persist), which you'd need to implement manually with useReducer.
- Standardized Patterns: Redux has more established patterns for handling common scenarios like loading states, error states, and optimistic updates.
