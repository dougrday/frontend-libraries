# Findings

## TL;DR

For the impatient, you can jump straight to the [conclusion](#conclusion).
## Bundle Sizes

| Framework | Bundle Size (raw) | Bundle Size (gzip) |
| :-------: | :---------------: | :----------------: |
|  Angular  |      520 KB       |       134 KB       |
|   React   |      492 KB       |       119 KB       |
|  Svelte   |      353 KB       |       76 KB        |

## Performance

| Framework | Performance - Lighthouse |             DevTools Performance             |
| :-------: | :----------------------: | :------------------------------------------: |
|  Angular  |            59            | <img src="./images/angular-performance.png"> |
|   React   |            96            |  <img src="./images/react-performance.png">  |
|  Svelte   |            97            | <img src="./images/svelte-performance.png">  |

### Web Vitals

<img src="./images/webvitals.png">

### Usage Trends

<img src="./images/npmtrends.png">

### Other

Another interesting metric we gathered was lines of code (non-comment, non-whitespace)
involved in building the sample application. In other words, how many lines of code
did the engineer need to touch in order to build this app?

Alone, this is not a good metric, but put together with other measurements
could be a useful indicator of development experience and ease-of-use.

| Framework | Lines of code |
| :-------: | :-----------: |
|  Angular  |   504 lines   |
|   React   |   531 lines   |
|  Svelte   |   336 lines   |

Don't read too much into these numbers, as alone they don't mean much.

## Pros/Cons

Each library had its own set of pros/cons. Let's look at each of them:

### Angular

Pros

- ✔ Component-based
- ✔ Provides everything you need out-of-the-box (e.g. routing, forms, etc.)
- ✔ High adoption, 3rd overall behind Vue
- ✔ Written & maintained by Google

Cons

- ❌ Steeper learning curve
- ❌ More complex than other solutions
- ❌ Poorer size and performance
- ❌ [Poor developer satisfaction](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks/#front_end_frameworks_experience_ranking)

### React

Pros

- ✔ Component-based
- ✔ Industry-standard (1st in overall usage), large & active community
- ✔ Easy to learn and use
- ✔ Powerful and customizable
- ✔ Performant and fast
- ✔ Hooks promote composition and pattern reuse

Cons

- ❌ Virtual DOM makes using Web Components difficult
- ❌ JSX is required for a decent developer experience
- ❌ Hooks aren't easy for new developers to understand

### Svelte

Pros

- ✔ Component-based
- ✔ Provides value at compile-time, rather than runtime
- ✔ Incredibly small and performant
- ✔ Easy to learn and use
- ✔ Natively uses Observer patterns (RxJS-compatible)
- ✔ Works well with Web Components
- ✔ Fewest lines of code to implement
- ✔ Fewer complex lifecycle events than other frameworks

Cons

- ❌ New, with a smaller community
- ❌ Not as battle-tested as other frameworks

## Conclusion

If you plan to utilize many Web Components in your frontends, *choose Svelte*.
Otherwise, *choose React*.
