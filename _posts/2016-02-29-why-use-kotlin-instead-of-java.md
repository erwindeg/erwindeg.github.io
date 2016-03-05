---
layout: post
title: Why use Kotlin instead of Java
permalink: /blog/why-use-kotlin-instead-of-java
---
[<img src="{{ site.baseurl }}/img/github.svg">](https://github.com/erwindeg/kotlin-example)
This month, the 1.0 version of the new JVM language "Kotlin" was [released](http://blog.jetbrains.com/kotlin/2016/02/kotlin-1-0-released-pragmatic-language-for-jvm-and-android/). Kotlin is 100% compatible with Java and can be used along side it. It is an object oriented language with functional properties.
There are plenty of [quick starts](https://kotlinlang.org/docs/tutorials/getting-started.html) available, but what are the killer features that would make you choose it over the trusty old Java?

## Type inference
The Kotlin compiler is able to derive (infer) the type of a variable from the context. The type declaration is optional. This allows for shorter code.

```java
val s = "ABC" //immutable variable of type String
var i = 1  //mutable variable of type Int
var i2: Int = 1  //explicit type declaration
```


## Lambda's and more in Java 6 
Kotlin runs from Java 6 and up. Which means you can start using it in your existing code bases which haven't been upgrade or even for Android development. This allows us to use Lambda expressions and function references in pre Java 8 environments.

### Lambda expressions
Like in Java, a Lambda expression is a literal function, which can be passed as an expression. It is not declared in a function statement.

```java
val total = { X: Int, y: Int -> x + y}
println(total(1,2)); //prints 3
```

The parameter declaration can be left out, when there is only one parameter. This parameter will be called 'it'.

```java
val list = listOf(-2,-1,0,1,2)
list.filter { it > 0 }.forEach { println(it) } // prints 1 and 2
```

In contrast to Java, it is possible to use non final (mutable) variables declared in the outer scope (closure) of the Lamba expression.

```java
fun closure() {
	val list = listOf(-2,-1,0,1,2)
	var total = 0;
	list.filter { it > 0 }.forEach { 
		total += it
	}
	println(total) //prints 3
}
```


### Function references
Like in Java, functions can be referenced and passed around by their name.

```java
fun main(args: Array<String>) : Unit {
	val total = ::calculateTotal
	println(total(2,2)) //prints 4
}
	
fun calculateTotal(x: Int, y: Int) = x + y //Example of a single expression function, where the curly braces, return type and return statement can be ommitted.
```

## Null safety
With Kotlin, the compiler will check for possible null deferences. The following code doesn't compile.

```java
var text: String = null //Null cannot be a value of a non-null type
```

To work with nullable variables, we have to use a question mark (?), behind the type at declaration time. To safely use a nullable variable, we use another ? behind the variable when calling a method. The method will print null when the variable is null.

```java
var text: String? = null
println(text?.length)
```

## Equality checks
In Kotlin, object identity is checked with === (in Java ==). Object equality (Java equals) is checked with ==.

## Named parameters
When functions or constructors have a high number of parameters, it is cumbersome to have to use them all, when only a few are required. In Java, constructor or method overloading would be used to counter this. This however requires a lot of extra code. In Kotlin, we can make use of named arguments, to provide only a few of the declared parameters.

Consider the following function. Notice the default values provided, this allows us to ommit these parameters when calling this function.

```java
fun createPerson(firstName: String = "", lastName: String = "", street: String = "", number: Int = 0, height: Double = 0.0) {
	...
}
```

When we want to create a Person with only the last name and the height, we can use to following syntax.

```java
createPerson(lastName = "lastname", height = 1.82)
```

## When expression
A when expression is like a Java switch, but much more powerful. First of all, conditions do not have to be constants.

```java
when(x) {
	getValue(x) -> print("getValue")
	0,1 -> print("0 or 1")
	else -> print("else")
}
```

The argument is matched against the conditions, unit the first one matches. 

When can also be used to directly asign a value to a variable.

```java
val result = when(x) {
	getValue(x) -> print("getValue")
	0,1 -> print("0 or 1")
	else -> print("else")
}
```

Or for type checking. We can directly use the properties of type String in the first condition. This is called Smart Casting.

```java
when(y) {
	is String -> print(y.length)
	is Int -> print(y)
	else -> print("else")
}
```

## Data classes (POJO's)
To create classes that hold data, we can use the Kotlin data class. It automatically gives us getters and setters, hashCode, equals and toString methods. This saves us a great deal of code in comparison to Java.

```java
data class Person(val firstName: String, val lastName: String)
```

The part after the name between () is called the primary constructor.

## Extension functions
Extension functions allow us to add functionality to existing classes, even if they are not marked as extensible. This can be used instead of Utility classes to provide additional functionality.
Consider for instance to following function, which checks if a String contains only uppercase characters.

```java
fun String.allUpperCase() : Boolean {
	return this == this.toUpperCase()
}
```


## Functional Operations
The Kotlin library has a number of functional language constructs. In Java they are part of the Java 8 Streams API, but remember that Kotlin works from Java 6.
Some of the standard functions available on Iterable types are:
* flatMap
* map
* reduce
* filter
* distinct
* count
* etc....

## Start using Kotlin today!
These are just some of the features that make Kotlin a powerful, concise and safe language. Remember that you can call Kotlin code from Java and vice versa. This allows you to start using it today in any of your Java 6 or higher projects! A good start for instance is to write unit tests in Kotlin, it won't run in production, but it is useful for learning a new language.