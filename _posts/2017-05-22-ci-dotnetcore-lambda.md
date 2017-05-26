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

### Writing an AWS Lambda function in C#

We'll start by creating a clean new .NET Core project. Lambda currently supports the 1.0 runtime:

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

Now, let's edit `MyClass.cs` and write a minimalistic function:

```csharp
using System;
using Amazon.Lambda.Core;

[assembly: LambdaSerializerAttribute(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace MyNamespace
{
    public class MyClass
    {
    	public object MyFunction()
    	{
    		return new { message = "Hello from Lambda!", time = DateTime.UtcNow };
    	}
    }
}
```

With the `LambdaSerializerAttribute`, JSON serialization will be taken care of. Basically, our function can just accept and return .NET objects as needed.

### Manual Deployment

Before automating build & deployment, let's set up our lambda function manually. On the [AWS Lambda dashboard page](https://console.aws.amazon.com/lambda/home), click *Create a Lambda Function* and select the *Blank Function* blueprint. Skip the *Configure triggers* page for now.

On the *Configure Function* page, give your function a name and select the *C#* runtime (which should really be called *.NET Core 1.0*):

<img style="display:block;margin-left:auto;margin-right:auto" src="/images/lambda1.png"/>

You'll notice that unlike with other runtimes, unfortunately we can't just paste our code inline right here. Instead, a zip file with our compiled assembly and all references needs to be uploaded. So - time to build and package our function:

```
$ dotnet restore
$ dotnet publish -c Release
```

Now we need to zip the content of the `publish` folder...

```
$ cd bin/Release/netcoreapp1.0/publish
$ zip MyProject.zip *
```

... which creates the zip file we'll have to upload. We'll also have to specify a handler, which is the function's entry point in the format `assembly::namespace.class-name::method-name`. In our case, that's `MyProject::MyNamespace.MyClass::MyFunction`. We'll also have to specify a role for security purposes:

<img style="display:block;margin-left:auto;margin-right:auto" src="/images/lambda2.png"/>

And that's it! Create the function and test it, it should return a result like this:

<img style="display:block;margin-left:auto;margin-right:auto" src="/images/lambda3.png"/>

Next, we could for example expose the function with an [API Gateway trigger](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html). 

### Automatic Deployment

Of course, we don't want to manually upload a zip file through the Lambda UI every time we want to deploy a new version of our function. Fortunately, it can be done with the [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/) via [update-function-code](http://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html). So, in order to build and deploy from your local machine, add the build and zip steps above to a shell script, followed by:

```
aws lambda update-function-code --function-name myLambdaFunction --zip-file fileb://MyProject.zip
```

Note that the CLI also supports [create-function](http://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html), in case you also want to automate the initial setup. 

As always, building and deploying from your local dev box is not ideal. What we really want is clean, reproducable builds on a build server and a fully automated deployment pipeline. 

There's an endless number of CI tools to choose from, but for this exercise, let's stay inside the AWS universe and go with [AWS CodeBuild](https://aws.amazon.com/codebuild). Codebuild is a fairly [recent](https://aws.amazon.com/blogs/aws/aws-codebuild-fully-managed-build-service) addition to Amazon's services; it's fairly simple but does two things well: Docker support, on-demand.

TODO..




### Trigger on git push






















