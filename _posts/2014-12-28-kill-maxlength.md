---
layout: post
status: published
title: ! '2015 resolution: kill maxlength, add validation'
categories:
- UI
tags: []
---
If you're still looking for a New Year's resolution, here's a suggestion: 

Go over all your UI code now, and whenever you see something like this...
<!-- more -->
{% highlight html %} 
{% raw %}
<input id="credit-card-number" maxlength="16">
{% endraw %}
{% endhighlight %}

... please spend a few minutes to remove **maxlength** and add some real validation code instead. 

Why? Because in 2015, I think it's reasonable to expect any UI to be flexible enough to handle user input even with a few extra characters. 

Your users should be able to copy&paste their credit card number from a Google Doc to your form, with or without dashes and blanks. Leading/trailing whitespaces should be handled gracefully. Just remove all those extra characters *before* validation - seriously, it's probably one line of code.

Entering a phone number with or without brackets should just work. Including international numbers. A **maxlength="10"** for phone numbers is just ridiculously inconvenient.

Copying an order/tracking/customer number from an email to a support request form should just work and not require the user to manually un-group numbers in a text editor first. 

Come on, this is 2015. Just do it.

Happy New Year!


Discuss on [Hacker News](http://news.ycombinator.com)



