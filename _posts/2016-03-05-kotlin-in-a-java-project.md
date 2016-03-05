---
layout: post
title: Using Kotlin in a Java project
permalink: /blog/kotlin-in-a-java-project
---
[<img src="{{ site.url }}/img/github.svg">](https://github.com/erwindeg/kotlin-example)
You want to start using the hot new JVM language Kotlin today, but you are knee-deep in a Java project and you cannot switch languages. Why not start using Kotlin for writing unit tests? Kotlin is Java compatible and can be used together with Java in the same project. Let's have a look at how to accomplish this.

## Maven Kotlin compiler plugin
To use Kotlin in a Java Maven project. We have to add the Kotlin compiler plugin to the pom.xml. The Kotlin source needs to be compiled before the Java source, so the plugin uses the process-sources phase.

```xml
<properties>
	<kotlin.version>1.0.0</kotlin.version>
	<junit.version>4.10</junit.version>
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
...
<build>
	<plugins>
		<plugin>
			<artifactId>kotlin-maven-plugin</artifactId>
			<groupId>org.jetbrains.kotlin</groupId>
			<version>${kotlin.version}</version>

			<executions>
				<execution>
					<id>compile</id>
					<phase>process-sources</phase>
					<goals>
						<goal>compile</goal>
					</goals>
				</execution>

				<execution>
					<id>test-compile</id>
					<phase>process-test-sources</phase>
					<goals>
						<goal>test-compile</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```

We are also going to add a dependency to the Kotlin standard library, jUnit and the kotlin jUnit integration kotlin-test-junit.

```xml
<dependency>
	<groupId>org.jetbrains.kotlin</groupId>
	<artifactId>kotlin-stdlib</artifactId>
	<version>${kotlin.version}</version>
</dependency>
<dependency>
	<groupId>junit</groupId>
	<artifactId>junit</artifactId>
	<version>${junit.version}</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>org.jetbrains.kotlin</groupId>
	<artifactId>kotlin-test-junit</artifactId>
	<version>${kotlin.version}</version>
	<scope>test</scope>
</dependency>
```

This is it. You can now mix Java code and Kotlin code in your project. The Kotlin sources can be placed next to the Java sources in the src/main/java folder.

## Kotlin en Java tests
Let's write some code to verify that this setup actually works. We start with a Test class in Kotlin. Create a new file named KotlinTest.kt. This file goes in the src/test/java folder. It has one test method, which tests that both the Java and the Kotlin implementation return the String "hello world".

```java
import org.junit.Assert.*;
import org.junit.Test;

class KotlinTest {

	@Test
	fun testGreeting(){
		assertEquals("hello world",JavaGreeting().sayHello())
		assertEquals("hello world",KotlinGreeting().sayHello())
	}
}
```

Now we write the Java and the Kotlin implementations of Hello World. Both files go in the src/main/java folder.

JavaGreeting.java:

```java
public class JavaGreeting {
	public String sayHello(){
		return "hello world";
	}
}
```

KotlinGreeting.kt:

```java
class KotlinGreeting {
	fun sayHello() : String {
		return "hello world"
	}
}
```

Run "mvn clean install" or build from you IDE to verify that everything is correct. The full source of this example is available on [github](https://github.com/erwindeg/kotlin-example).

