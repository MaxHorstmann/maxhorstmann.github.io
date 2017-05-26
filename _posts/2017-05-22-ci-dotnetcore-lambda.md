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

End of last year, [AWS Lambda](https://aws.amazon.com/lambda), Amazon's popular Function as a Service (FaaS) offering, [announced](https://aws.amazon.com/blogs/compute/announcing-c-sharp-support-for-aws-lambda) C# support based on the .NET Core runtime.

Which is neat, because there's a lot of interesting things you can do with Lambda. One of them is hosting [custom skills for Amazon Alexa](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function), Amazon's voice interface for Echo, for free. I'll blog about that use case in a later post.

One of the first things I like to set up in a new tech ecosystem is a continuous integration (CI) pipeline. This post describes a simple CI setup for C#/.NET Core code to Amazon Lambda.

<!-- more -->

### Let's write a AWS Lambda function in C#

We'll start by creating a clean new .NET Core project (Lambda currently supports the 1.0 runtime):

```
$ dotnet new classlib --framework netcoreapp1.0
```

Let's rename the generated `.csproj` file to `MyProject.csproj` and the `Class1.cs` file to `MyClass.cs`.

We'll also add references to [Amazon.Lambda.Core](https://www.nuget.org/packages/Amazon.Lambda.Core) and 
[Amazon.Lambda.Serialization.Json](https://www.nuget.org/packages/Amazon.Lambda.Serialization.Json) to the `.csproj`:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netcoreapp1.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Amazon.Lambda.Core" Version="1.0.0" />
    <PackageReference Include="Amazon.Lambda.Serialization.Json" Version="1.1.0" />
  </ItemGroup>

</Project>
```


### Let's automate deployment

### Trigger it from GitHub






















