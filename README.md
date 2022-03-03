# Frontend Libraries

A place to compare/contrast frontend libraries in 2022.

# Test backend

The `server` folder contains a test hello-world backend to support the different frontend tests.

We decided not to mock this server, but instead generate it using the same `openapi-generator-cli` as the frontend.
This helps us ensure the backend is adhering to the same API contract as the frontend.

To start the backend, run `npm run server`.

# React with TypeScript

To run the React example, run `npm run react`.

Then, open a browser to http://localhost:3000

# Svelte

To run the Svelte example, run `npm run svelte`.

Then, open a browser to http://localhost:8080

# Start Everything

To run all examples at once, run `npm start`.
