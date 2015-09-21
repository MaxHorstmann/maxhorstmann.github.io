---
layout: post
title: 'Devs: blow the whistle!'
date: 2015-09-21 
categories:
- Ethics
status: published
type: post
published: true
---

Volkswagen, Germany's and Europe's largest car maker, [is in big trouble](http://www.npr.org/sections/thetwo-way/2015/09/21/442174444/volkswagen-stock-plummets-as-ceo-apologizes-for-emissions-cheat) after admitting that they built cheating software into their cars.

<!-- more -->

Specifically, it looks like VW tweaked the code running the "electronic control module" of their Diesel engines to produce EPA compliant emissions, but *only when actually undergoing emission tests*. Otherwise, the software would allow the engine to produce non-compliant emissions, probably for better performance.

As a software developer, I'm actually quite impressed what they've achieved. Data scientists must have been involved to build a model which takes a set of sensor inputs and maps them to some sort of boolean *IsEmissionTestRunning* output variable. Quite possibly, some fancy machine learning was involved here. Developers must have implemented the model and integrated it with the actual control module code. Interfaces, maybe even API contracts, must have been discussed. Testers made sure the emission test feature worked with high accuracy. Did they even have test cases for this? Automated tests? Some product manager might have written a spec. Project managers must have been involved to manage the release cycle for the cheating software with the larger development cycles of engines and cars. Maybe somebody was even in charge of *obfuscating* the feature, making it harder to understand what's going on just from reviewing the code? 

Brilliant engineering.

Unfortunately, the business reasons behind this effort were plain evil: bypass environmental regulations in hope of better sales. Or in other words, VW decided to screw the environment for higher profits. That's pretty despicable, and someone should go to jail for this.

What surprises me most though is, apparently none of the many engineers involved decided to blow the whistle. 

[Groupthink](https://en.wikipedia.org/wiki/Groupthink)? Fear? 

Even *if* you're getting fired over raising your voice (putting aside that this kind of retaliation would be illegal in many places) - if you're a software developer and you're good enough to work on a project like this, you don't have to be afraid to lose your job. There are [many, many others waiting for you](http://careers.stackoverflow.com/jobs). So, we software developers should actually be *first* to blow the whistle in cases like this, and I'll hereby pledge to do just that if ever confronted with the task of writing software that does something unethical.

As an aside, the least VW could do for the developer community is to provide full transparency into all the implementation details and open-source that evil masterpiece of software, so maybe some parts of it can be used for something good in the future. 

[Discuss on Hacker News](https://news.ycombinator.com/item?id=10255045)

