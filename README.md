# Frontend Libraries with OpenAPI

A place to compare/contrast frontend libraries in 2022 when auto-generating code with OpenAPI.

# Test backend

The `server` folder contains a test `hello-world` backend to support the different frontend tests.

We decided not to mock this server, but instead generate it using the same `openapi-generator-cli` as the frontend.
This helps us ensure the backend is adhering to the same API contract as the frontend.

To start the backend, run `npm run server`.

The server runs on port `5000`, and you can do a simple GET search at http://localhost:5000/hello-world.

<br />

# Start Everything

To run all examples at once, run `npm start`.

<br />

# Findings

[Findings here](./findings.md)
