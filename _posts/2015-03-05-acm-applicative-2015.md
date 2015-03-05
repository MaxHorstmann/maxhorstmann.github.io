---
layout: post
title: 'ACM Applicative Conference 2015'
date: 2015-03-05 
categories:
- Conferences
- AngularJS
- Dart
status: published
type: post
published: true
---

ACM held its inaugural two-day [Applicative conference](http://applicative.acm.org/) here in NYC. The premise of the conference was to bring together researchers and practitioners and consisted of two tracks, one on lower-level systems programming and another one on application development. <!-- more -->

Some of the talks were interesting, see summaries below. I learned a few things and got some inspiration out of them. However, IMO the conference didn’t quite deliver on its main premise- I didn’t see any particular connection or recurring theme between the talks, nothing which would somehow connect the two worlds (research and engineering) or discuss how the two could work closer together, no interactive formats etc. So, I’m not sure yet if I’ll attend again next time, I’ll have a closer look at the format first. It was fun though.

# Talks

### [JSON Graph: Reactive REST at Netflix](http://applicative.acm.org/speaker-JafarHusain.html)

TL;DR: if you’re dealing with large number of small resources which form a graph and need to be exposed via an API, some of Netflix’ ideas might be interesting for you.

The speaker explained how Netflix’ domain model (their metadata, not the actual media content) consists of a very large number of small pieces of data: movies, categories, reviews, actors, directors etc. Early versions of their clients requested those individually, such as for the overview/browse page, but this quickly led to performance issues due to a large number of HTTP requests. They then first degenerated their RESTful API to a set of RPC-style-ish endpoints to request resources in chunks. As a side-effect though, they lost several REST benefits: no more unique URL per resource, no more per-resource caching (e.g. cannot use cache control headers for invalidation) etc so you would effectively have to build your own cache per client, and you generally wanna avoid getting into this business (remember that *there are only two hard things in Computer Science: cache invalidation and naming things *- Phil Karlton). 

So, they ended up building their own system called "Falkor" which is quite neat: effectively, the idea is that the JSON data on your client *is* your API, so you can usually just pretend to have a local copy of all the server data and it’ll do the rest (caching, bulk data transfer, query optimization) for you. That’s the big picture, he then went into a lot of detail.

One particular issue is that Netflix’ domain model is a graph, not a tree (e.g. different paths lead to same movie) and just mapping it flat to JSON would lead to a tree with redundancies which then leads to even more cache invalidation problems. So they also came up with their own graph representation language called JSON Graph (JSONG). It contains symbolic links (think Unix file system) all over the place so that there’s always only one copy of the same data, plus an appropriate path evaluation syntax etc. [Here](http://www.slideshare.net/InfoQ/reactive-rest) are some older slides which go into JSONG in a bit more detail.

Netflix is going to open-source implementations of both Falkor and JSONG [in the next couple of months](https://twitter.com/jhusain/status/572528802741395456).

### **[Component-Driven** ](http://applicative.acm.org/speaker-TaylorSavage.html)[Web Development with Polymer](http://applicative.acm.org/speaker-TaylorSavage.html)

Tl;DR: might be interesting for you if you’re a web (UI) developer and aren’t familiar with web components yet.

The speaker, a PM at Google, gave an overview over the state of [Web Components](http://webcomponents.org/) and its four underlying specs: custom elements, html imports, templates, and shadow DOM. Web components is a new W3C specification for reusable UI pieces which is currently under development and only has limited browser support so far (in particular IE lagging behind). Google’s [polymer project](https://www.polymer-project.org/) is a library sitting on top of web components which, amongst other things, ships with a library of fancy pre-defined elements ([paper elements](https://www.polymer-project.org/components/paper-elements/demo.html#core-toolbar)). It also provides a whole truck load of syntactic sugar to make it simpler to define custom elements ("more sugar, less pain"). And finally, there’s polyfills, which allows for backfilling in older browsers with no web components supports.

The obvious question (at least to me) was how well polyfills work in practice (any known issues, regressions, performance penalties etc.?) ‘cause otherwise you can’t really use web components at this stage - so I asked the presenter in the Q&A and according to him, they work really well and there are only a few edge cases where they don’t and you can really go ahead and use polymer and polyfills today. Alright, I’ll give that a try.

### [Efficient Static Assets Pipeline with Webpack](http://applicative.acm.org/speaker-AlexandrineBoissiere.html)

TL;DR: webpack makes it easier to handle static assets and their dependencies.

An intro to [webpack](http://webpack.github.io/), a static assets bundler similar to [browserify](http://browserify.org/), [RequireJS](http://requirejs.org/) or [ServiceStack Bundler](https://github.com/ServiceStack/Bundler) (which we used in the past but got rid of). Its particular strength is hot-loading changes. Have a look at their [tutorial](http://webpack.github.io/docs/tutorials/getting-started/) if you’re interested. The talk was basically a feature summary plus some live demos.

### **[Scaling** ](http://applicative.acm.org/speaker-GroveMoore.html)[Dart from Mobile to Server](http://applicative.acm.org/speaker-GroveMoore.html)

TL;DR: Dart is a cool language but you probably don’t wanna use it for anything serious.

Yes, [Dart](https://www.dartlang.org) is still around. It’s a programming language Google started putting together a few years back with the ambitious goal of completely replacing Javascript (oh wouldn’t that be nice), but so far has fallen short of getting a lot of traction. They gave a summary of Dart’s inception and recent history and then went into some of the recently added language features - lots of syntactic sugar for async programming (sync*, yield*, await, await for….), clearly trying to make it more attractive for the server.

I like Dart as a *language*: optional type annotations are nice, kind of a nice hybrid of static and dynamic typing; all the async stuff is great, also some of other sugary stuff like convention based access modifiers and [implicit getters/setters](http://maxhorstmann.net/blog/2013/09/22/plain-old-dart-objects/) is neat. 

However, IMO expecting it to be adopted widely in the future is a bit of a stretch to say the least: not a single browser other than Chrome is likely to ever ship a native Dart VM, so the client-side code will always have to rely on the Javascript transpilation, breaking the "one language" (on client and server) paradigm. Also, Google hasn’t been making any significant effort to bring Dart to other platforms such as Android (too bad, it would be a nice response to Apple’s Swift) - so frankly, it wouldn’t be too far fetched to assume that Dart doesn’t have full internal support at Google either and might even just get buried next to Buzz, Reader and Helpouts one day.

Still a nice language. Try it out when you can.

### **[Systems** ](http://applicative.acm.org/speaker-BenMaurer.html)[at Facebook Scale](http://applicative.acm.org/speaker-BenMaurer.html)

TL;DR: Facebook really is a whole bunch of independent services which will sometimes tell you that they’re too busy. They also have a structured process for outages and post-mortems.

Nice high-level overview on how FB works at such a massive scale. Other than what you would expect (load-balancing, caching, services…), a few interesting key points stood out. For instance, they only have one source code repro for the entire company. Sounds crazy, but supposedly makes it easier to keep cross-service dependencies up-to-date. He also talked about some fairly low-level optimizations (down to the TCP level) they made e.g. to avoid SYN queue overflow. The recurring theme was that they avoid ripples when one of their services has a backlog: e.g. if you’re calling the "timeline" service and it’s too busy, it’ll quickly get back to you and say “not now” instead of slowing down and then the caller needs to live with it. “Adaptive LIFO” was another interesting concepts: usually, service requests get processed FIFO, but under pressure they temporarily switch to LIFO so at least some requests get a timely response (which is better than serving all requests with the same delay, effectively rendering all of the responses useless). Also, he talked about the concept of “controlled delay” which basically means that if any queue is never empty for a given period of time, that’s a red flag and it’ll proactively start turning down requests.

Another interesting point was that they have scheduled production builds twice a day. I asked in the Q&A how this would work with all those co-dependent services, whether there’s a dependency graph to manage the order of builds; the response was that it’s actually only the web tier, i.e. where ultimately all the features live, which gets pushed twice a day. All those other services build to prod on their own schedule.

Interesting talk!

### **[Flux**:](http://applicative.acm.org/speaker-BillFisher.html)[ A Unidirectional Data Flow Architecture for React Apps](http://applicative.acm.org/speaker-BillFisher.html)

TL;DR Facebook’s [Flux](https://facebook.github.io/flux/) and [React](https://facebook.github.io/react/) combo has become a viable alternative to existing SPA frameworks such as Angular, in particular due to simplicity and faster rendering performance.

The speaker was a dev at FB and author of some good SO answers, e.g. [here](http://stackoverflow.com/questions/23591325/in-flux-architecture-how-do-you-manage-store-lifecycle/23597375#23597375) and [here](http://stackoverflow.com/questions/27264487/from-angularjs-to-flux-the-react-way/27267083#27267083). Most people think of React as a simple view layer which can be combined with other frameworks, and he confirmed that effectively that’s still all it is. Its particular strength is the virtual DOM implementation which allows for rendering only what has changed, making it particularly suitable for rendering views with large amounts of data such as FB’s timeline.

Flux is built on top of React and implements a data flow pattern, which is quite different from the classical MVC or MV* paradigm. Read [this](https://facebook.github.io/flux/docs/overview.html#content) overview if you’re interested in learning more, the main difference is that data always flows in a single direction originating from an "action", which then gets dispatched to a store which updates the (not necessarily but usually) React view.

Supposedly, all client-side web apps at FB are implemented in Flux - messenger, notifications, likes/comments etc are all individual flux apps on a single page. He also mentioned that they’re usually able to teach React and Flux to new hires (including interns) within a day, after which they’re usually ready to ship new apps and features immediately while only having to write a few lines of code. At least from my experience, learning more heavyweight frameworks like Angular is more complex and takes longer than that, so this actually sounds pretty intriguing and I almost wanna try it out with our next hire. :)

The talk also briefly touched on [Jest](http://facebook.github.io/flux/docs/testing-flux-applications.html), their testing framework for Flux/React, which is also pretty neat.
