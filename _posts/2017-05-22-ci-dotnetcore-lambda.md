---
layout: post
title: 'Continuous Integration: C# to AWS Lambda'
date: 2017-05-22 
categories:
- Coding
- Continuous Integration
status: draft
type: post
published: false
---

End of last year, AWS Lambda, Amazon's popular Function as a Service (FaaS) offering, [announced](https://aws.amazon.com/blogs/compute/announcing-c-sharp-support-for-aws-lambda) C# support based on the .NET Core runtime.

Which is neat, because there's a lot of interesting things you can do with Lambda. One of them is hosting [custom skills for Amazon Alexa](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function), Amazon's voice interface for Echo, for free. I'll blog about that use case in a later post.

One of the first things I like to set up in a new tech ecosystem is a continuous integration (CI) pipeline. This post describes a simple yet effective way to set up CI for C#/.NET Core code to Amazon Lambda.

<!-- more -->

### Let's write a C# Lambda

```csharp
class Book
{
	public void Read() { Console.WriteLine("Reading..."); }
}
```

### Let's automate deployment

### Trigger it from GitHub






















