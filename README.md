<h1 align="center">
  🚀 Fast ISO String
</h1>

<p align="center">
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#benchmark">Benchmarks</a>
</p>

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

A way to get the ISO String about 120%~130% faster than using `new Date().toISOString()`.

Here's a C++ code rewrite to TypeScript from `V8` to get a faster ISO String format date.

> See [here](https://chromium.googlesource.com/v8/v8/+/6d706ae3a0153cf0272760132b775ae06ef13b1a/src/date.cc#81) the original implementation.

## Usage

First, install the library:

```bash
npm i fast-iso-string
```

Then, you have two exposed methods that you can use:

- `fastISOString`: That returns the current date as ISO String.
- `fromUnixToISOString`: To parse a unix time that you already have.

And then use like this:

```diff
import { fastISOString } from 'fast-iso-string';

-const isoString = new Date().toISOString();
+const isoString = fastISOString();
```

## Benchmarks

Above, the difference of calling `new Date().toISOString()` or using the library.

```
new Date().toISOString() x 1,419,493 ops/sec ±2.00% (85 sampled runs)
fastISOString() x 3,306,564 ops/sec ±2.75% (85 sampled runs)
```

### Why is fast?

Well, I have two reasons:

- Avoiding creating `new Date()`, actually, using just `Date.now()` is [almost 100% faster](https://github.com/RafaelGSS/nodejs-bench-operations/blob/b037b1d262d3c495429f9bb8216ed5215e70a395/v19/RESULTS-v19_4_0.md#date-format-mmddyyyy) than calling `new Date()`.
- JS->C++ cost, this is a hidden cost of calling V8 to perform that operation, I don't know exactly the cost but I think that contribute to the slowdown.

### Is fair to compare `new Date` against `Date.now`?

You might consider this benchmark unfair because I'm using `Date.now()` instead of `new Date()`. Actually yeah it's not fair, if we use `fromUnixToISOString(new Date())` it might be slower as per [this](https://github.com/RafaelGSS/nodejs-bench-operations/blob/b34c4abef4edefd7c2b5c346de05df36a4b86692/v16/RESULTS-v16_18_0.md) and [this](https://github.com/RafaelGSS/nodejs-bench-operations/blob/b34c4abef4edefd7c2b5c346de05df36a4b818692/v8_RES_0_mTS).

But otherwise, do you know how to get ISO String without calling `new Date()`? I don't know, so JavaScript for us to use the `Date` object, so I just skip that runtime cost and go directly to what I want, the formatted ISO String, which format you get the start date in doesn't matter.

This also leaves a question: so everything I'm doing with `new Date().MY_METHOD` could be faster? Maybe yes. If you parse unix time and extract the information in whatever format you want it could be faster. I just created one of the `Date` methods, but you can try and see if you get faster results with other methods.


## Should I use this library?

If you're doing a lot of operations that need to use the ISO String, maybe you should.

It's not because I'm saying that one method is faster than the other, that this will bring some performance improvement to your workflow, the best thing you can do is to do a benchmarking, to learn more, see [Preparing and Evaluating Benchmarks](https://blog.rafaelgss.com.br/preparing-and-evaluating-benchmarks) by [@RafaelGSS](https://github.com/RafaelGSS).

## Thanks

I need to thank [@RafaelGSS](https://github.com/RafaelGSS) for inspiring the creation of this library for his work on performance within NodeJs.

[build-img]:https://github.com/H4ad/fast-iso-string/actions/workflows/release.yml/badge.svg

[build-url]:https://github.com/H4ad/fast-iso-string/actions/workflows/release.yml

[downloads-img]:https://img.shields.io/npm/dt/@h4ad/fast-iso-string

[downloads-url]:https://www.npmtrends.com/fast-iso-string

[npm-img]:https://img.shields.io/npm/v/fast-iso-string

[npm-url]:https://www.npmjs.com/package/fast-iso-string

[issues-img]:https://img.shields.io/github/issues/H4ad/fast-iso-string

[issues-url]:https://github.com/H4ad/fast-iso-string/issues

[codecov-img]:https://codecov.io/gh/H4ad/fast-iso-string/branch/master/graph/badge.svg

[codecov-url]:https://codecov.io/gh/H4ad/fast-iso-string

[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[semantic-release-url]:https://github.com/semantic-release/semantic-release

[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[commitizen-url]:http://commitizen.github.io/cz-cli/
