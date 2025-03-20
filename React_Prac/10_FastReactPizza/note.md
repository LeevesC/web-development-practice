# Requirements

- Requires no user accounts and no logic: users just input their names before using the app
- The pizza menu can change, so it should be loaded from an API
- Users can add multiple pizzas to a cart before ordering
- Ordering requires just the user's name, phone number, and address
- If possible, GPS location should also be provided, to make delivery easier
- User can mark their order as 'priority' for an additional 20% of the cart price
- Orders are made by sending a POST request with the order data(user data + selected pizzas) to the API
- Each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID
- Users should be able to mark their order as 'priority' order even after it has been placed

## Feature Categories

- User (Global UI State)
- Menu (Global Remote)
- Cart (Global UI State)
- Order (Global Remote)

## Necessary Pages

- Homepage /
- Pizza menu /menu
- Cart /cart
- Placing a new order /order/new
- Looking up an order /order/:orderID

## Types of state

**Global UI State**

- Lives entirely within the application (client-side)
- Is accessible across multiple components/pages
- Doesn't require server synchronization
- Manages the user interface and experience

**Global Remote State**

- Involves communication with a server/API
- Needs to be accessible across multiple components/pages
- Requires data fetching, caching, and synchronization strategies

---

# React Router Features Used in the Pizza Project

## Core Router Setup

- createBrowserRouter(): Modern way to define routes in React Router v6.4+
- RouterProvider: Component that provides the router configuration to your application
- Nested routes: Parent/child route relationships defined in the router configuration

## Data Fetching & Forms

- loader functions: Async functions that fetch data before rendering a route
  - Attached to routes in the configuration (`loader: menuLoader`)
  - In this project: Used to fetch the pizza menu and order details
- `useLoaderData()`: Hook that accesses data returned by the loader function
  - In `Menu.jsx`: Retrieves the menu data fetched by the loader
- <Form> component
  - Connects form submission to the route's action function
  - Takes method prop to specify HTTP method('POST', 'GET', etc.)
- action functions: Handle form submissions and data mutations
  - In this project: Used for creating new orders (`createOrderAction`)
- `useActionData()` hook
  - Returns data from the action function if it doesn't redirect
  - Used here to access validation errors returned from the action function
  - Enables displaying form validation messages (`formErrors.phone`)

## Navigation & UI Components

- Outlet: Component that renders the matched child route
  - Used in `AppLayout.jsx` to render different pages within the layout
- `useNavigation`: Hook that provides information about the current navigation state
  - Used in `AppLayout.jsx` to show a loader during navigation

## Route Configuration

- Route parameters: Dynamic segments in the URL pattern (:orderId)
  - Used to look up specific orders in this project
- errorElement: Specify custom error boundaries for specific routes
  - Handles errors that occur during rendering or data loading
- Path definition: Define URL patterns for each route (/order/new, /menu, etc.)

## Route Organization

- Feature-based structure: Routes are organized by feature (menu, cart, order)
- Shared layout: Common UI elements shared across routes
  - Header and CartOverview remain consistent across page changes

## Navigation Features

- Loading indicators: Show loading state during navigation (<Loader />)
- Error handling: Custom error components for different scenarios

## How useSelector() works

- Takes a function as its argument
- Calls that function with the current Redux state
- Returns whatever value the function returns
- Re-renders your component when that returned value changes

## `navigator.geolocation.getCurrentPosition()`

`getCurrentPosition()` was created before Promises became widely used in JavaScript, so it still uses the older callback style instead of returning a Promise.

- JavaScript originally used callbacks (before Promises & async/await existed).
- Promises were introduced in ES6 (2015) and became the standard way to handle asynchronous operations.
- But some older APIs (like `navigator.geolocation.getCurrentPosition()`) were created before Promises existed.
- These older APIs still use callbacks instead of Promises because they were built before Promises became popular.

promisification - converting a callback-based API into a Promise-based one.
