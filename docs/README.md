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

1. Implement the same, simple frontend application using each candidate library:
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

## What's in the OpenAPI contract?

The [OpenAPI contract](../openapi.yml) contains a simple model, `HelloWorld` that contains an `id` and `name`.

The remainder of the contract defines a standard set of REST CRUD operations with
the following paths:

* GET /hello-world - gets a paginated list of `HelloWorld` messages.
* GET /hello-world/:id - gets a single `HelloWorld` message.
* POST /hello-world - creates a new `HelloWorld` message.
* PUT /hello-world/:id - updates an existing `HelloWorld` message.
* DELETE /hello-world/:id - deletes an existing `HelloWorld` message.

## Generated Code

The `npm install` command generates both backend and frontend code from the [OpenAPI specification](../openapi.yml).

### Frontend Code

The frontend code is in the `shared` folder, under `src/generated`. In particular, it generates:

* Models used by the contract
* API classes that can be used directly by consumers

### Backend Code

The backend code is in the `server` folder. The entire folder is generated from the OpenAPI specification.
It generates a complete Spring Boot application, including:

* Models used by the contract
* API interfaces
* Sample controller classes
* Sample security configuration

There are a few files that are committed to source control, and won't be overwritten when regenerating
the code from the OpenAPI spec.

To implement a basic stub for the contract, only the
[HelloWorldApiController.java](../server/src/main/java/org/openapitools/api/HelloWorldApiController.java) and
[OpenAPI2SpringBoot.java](../server/src/main/java/org/openapitools/OpenAPI2SpringBoot.java) files needed
to be modified. The controller includes a basic in-memory stub to demonstrate the contract. The 
[OpenAPI2SpringBoot.java](../server/src/main/java/org/openapitools/OpenAPI2SpringBoot.java#L45-L50) file
required slight modification to configure CORS.

You'll also want to look at the `HelloWorldApi.java` file, which contains the majority of the API contract.

<br />

# Results

The results of the experiment can be [found here](./findings.md).
