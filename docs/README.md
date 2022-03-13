# Frontend Libraries with OpenAPI

## Getting Started

To run the following experiment, you'll need the following installed:

1. Node.js version 16 or higher
2. Docker version 17 or higher

### Start Everything

To run all examples at once, run:

```bash
npm install
npm start
```

### What runs?

* `backend` - runs on port 5000 (http://localhost:5000/hello-world)
* `react` - runs on port 3000 (http://localhost:3000)
* `svelte` - runs on port 8080 (http://localhost:8080)
* `angular` - runs on port 4200 (http://localhost:4200)

So, please ensure you have nothing running on port `5000`, `3000`, `8080`, or `4200` prior to running `npm start`.

## Goals

Our experiment goals are the following:

1. Compare & contrast candidate frontend libraries in 2022.
2. Generate as much frontend code as possible using OpenAPI tooling.
3. Generate as much backend code as possible using OpenAPI tooling.
4. Create the best frontend developer experience we can using OpenAPI, and measure it with each library candidate.
5. Profile and measure size and performance characteristics of each frontend library candidate.
6. Determine library compatibility with Design system technologies like Web Components and Storybook.

## Approach

1. Implement the same application using each candidate library:
   * React (`react` folder)
   * Svelte (`svelte` folder)
   * Angular (`angular` folder, not a candidate but included for comparison)
2. Utilize OpenAPI to generate models and APIs for each application (`shared` folder).
3. Utilize OpenAPI to generate a backend that satisfies the API contract.
   * Spring Web (`backend` folder)
4. Utilize Material Web Components library to demonstrate utilization of Web Components.
5. Measure and profile size and performance characteristics.

## Not Included

* Vue - not included as it solves problems in a similar way to React and Svelte, with no clear advantages.
* SolidJS - not included as its too new, with very little adoption.
* Alpine.js - not well-adopted and doesn't provide as clear performance benefits as promised.
* Lit - too low-level for application development.
* Preact - uses the same API as React, offered as a better-performing alternative. Not included as it's
  really just React with better performance.

## Generated Code

The `npm install` command generates both backend and frontend code from the [OpenAPI specification](../openapi.yml).

### Frontend Code

The frontend code is in the `shared` folder, under `src/generated`. In particular, it generates:

* Models used by the contract
* API classes that can be used directly by consumers

### Backend Code

The backend code is in the `server` folder. The entire folder is generated from the OpenAPI specification. It generates
and entire Spring Boot application, including:

* Models used by the contract
* API interfaces
* Sample controller classes
* Sample security configuration

There are a few files that are committed to source control, and won't be overwritten when regenerating the code from
the OpenAPI spec.

In particular, you should pay attention to the [HelloWorldApiController.java](server/src/main/java/org/openapitools/api/HelloWorldApiController.java) file, which contains a sample in-memory implementation of the API contract. You'll also want to check the `HelloWorldApi.java` file,
which contains the actual API contract.

<br />

# Results

The results of the experiment can be [found here](./findings.md).
