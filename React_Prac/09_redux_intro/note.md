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

# Redux

## Learning How Redux works

- `createStore()` creates a store object that holds your state and provides methods to interact with it.
- Global state management: All global states are stored in the Redux store, which serves as a single source of truth for the application.
- Provider integration: The Redux store is made available to all components through the `Provider` component from react-redux, which uses React's context API under the hood.
- Combining reducers: Redux's `combineReducers` allows you to organize state logic into separate domains while maintaining a single state tree, solving the "provider hell" problem of multiple contexts.
- Feature-based organization: Your project nicely demonstrates the "feature folder" pattern, where related components, reducers, and actions are grouped together (accounts, customers).
- Accessing state: Components use `useSelector` to extract and subscribe to specific pieces of state from the store.
- Updating state: Components use `useDispatch` to get the dispatch function, then call action creators to dispatch actions that update the store.
- Middleware for side effects: Middleware like redux-thunk allows handling side effects (like API calls) by enabling action creators to return functions instead of plain objects.
