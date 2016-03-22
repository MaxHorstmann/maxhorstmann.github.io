---
layout: post
title: 'Co-variant array conversions'
date: 2016-03-22 
categories:
- Coding
status: published
type: post
published: true
---

Here's one of my favorite programming questions: let's say, in a C# program, we have a parent class

```
class Book
{
	public void Read() { Console.WriteLine("Reading..."); }
}
```

and a child class

```
class EBook : Book
{
    public void Download() {  Console.WriteLine("Downloading... "); }
}
```

<!-- more -->

In other words, EBook *is a* Book (a more special one - it can be downloaded).

Will the following code compile or not?

```
EBook[] eBooks = new EBook[10];
Book[] books = eBooks;  
```

I like this question, because when I heard it first, I went through the following thinking process:

* Since an EBook *is a* Book, we should be able to use it wherever only a *Book* is required. We can always provide the more special type. So, probably the answer is "yes".

* However, although an EBook is a Book, that doesn't automatically mean that an **array** of EBooks *is an* **array** of Books. In fact, there's a problem with that: if the compiler will accept the conversion above, one could do this next:

```
books[0] = new Book()
```

Whoops - now we've inserted a new element into the array which is just a Book, not an eBook. So, if we now try to do this with the eBooks reference to the same array...

```
eBooks[0].Download();
```

... it won't work - the Download method is not defined on the parent type. So, the answer must be "no"!

Well - turns out the right answer is actually "yes": the code *will* compile.

The reason for that is that C# (and also Java) supports **covariant array conversions**. It basically means that if B is a subtype of A, an array of B will also be treated as a subtype of A and array insertions are checked at *runtime*. So, while the example above will compile, the assignment to ```books[0]``` will throw an [ArrayTypeMismatchException](https://msdn.microsoft.com/en-us/library/system.arraytypemismatchexception(v=vs.110).aspx). 

Things get more complicated with generic containers such as Lists (covariant/contravariant type parameters in C#, and the notorious wildcard types in Java...), but that's kinda expected. - Have a look at the Wikipedia article on [Covariance and contravariance](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)) for more - it's an interesting topic which tends to fry even the brains of experienced programmers. 


















