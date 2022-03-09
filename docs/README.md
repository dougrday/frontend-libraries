# Frontend Libraries with OpenAPI

## Goals

1. Compare & contrast candidate frontend libraries in 2022.
1. Measure developer experience with OpenAPI-generated tooling.
1. Profile and measure size and performance characteristics of each candidate.
1. Determine library compatibility with Design system technologies like Web Components and Storybook.

## Approach

1. Implement the same application in each candidate library.
   * React (`react` folder)
   * Svelte (`svelte` folder)
   * Angular (`angular` folder, not a candidate but included for comparison)
2. Utilize OpenAPI to generate models and APIs for each application (`shared` folder).
3. Utilize OpenAPI to generate a backend that satisfies the API contract.
   * C# Backend (`backend` folder)
4. Utilize Material Web Components library to demonstrate utilization of Web Components.
5. Measure and profile size and performance characteristics.

# What's included?

* `backend` - runs on port 5000 (http://localhost:5000/hello-world)
* `react` - runs on port 3000 (http://localhost:3000)
* `svelte` - runs on port 8080 (http://localhost:8080)
* `angular` - runs on port 4200 (http://localhost:4200)

<br />

# Start Everything

To run all examples at once, run `npm start`.

<br />

# Results

The results of the experiment can be [found here](./findings.md).


