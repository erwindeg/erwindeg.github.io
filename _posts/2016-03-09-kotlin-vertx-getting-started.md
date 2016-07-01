---
layout: post
title: Getting started with Vert.x and Kotlin 
comments: true
permalink: /blog/kotlin-vertx-getting-started
category: blog
---
[<img src="{{ site.url }}/img/github.svg">](https://github.com/erwindeg/kotlin-example)
Vert.x is my favorite JVM framework of recent years. And since I discovered Kotlin, it's becoming my favorite JVM language. So you can probably guess how happy I was when I discovered the [kotlin language bindings](https://github.com/cy6erGn0m/vertx3-lang-kotlin) for Vert.x!
Because of the nice syntactic sugar, Kotlin makes Vert.x code a lot more readable. 

Example:

```java

fun main(args: Array<String>) {
    DefaultVertx {
        httpServer(8080) { request ->
            bodyJson {
                object_(
                        "message" to "Hello World!"
                )
            }
        }
    }
}

```

Off course, this syntax is possible because of the language bindings themselves. When looking into the language binding code, we discover this function, which makes use of Vert.x as the receiver object:

```java
public inline fun DefaultVertx(options: VertxOptions = VertxOptions(), block: Vertx.() -> Unit): Unit {
    Vertx.vertx(options).with(block)
}
```

Furthermore, the ability of Kotlin to place a function outside of the parenthesis, between curly braces, makes the syntax very nice and readable. So let's have a look at how to start with Kotlin and Vert.x in a Maven project.

## Maven configuration
For reference, I'm posting almost the complete pom.xml. The import parts are the dependency to vertx-core (add more vert.x dependencies if you need them, like hazelcast for clustering or web for http routing), the vertx3-lang-kotlin language bindings (and the repository) and the kotlin compiler plugin. The full example on [github](https://github.com/erwindeg/kotlin-example) also contains the maven shade plugin, which lets you build a fat runnable jar.

```xml
 <properties>
        <vertx.version>3.2.1</vertx.version>
        <kotlin.version>1.0.0</kotlin.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>io.vertx</groupId>
            <artifactId>vertx-core</artifactId>
            <version>${vertx.version}</version>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlinx</groupId>
            <artifactId>vertx3-lang-kotlin</artifactId>
            <version>[0.0.4,0.1.0)</version>
        </dependency>
       <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
    </dependencies>

    <build>
        <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
        <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
        <plugins>
            <plugin>
                <artifactId>kotlin-maven-plugin</artifactId>
                <groupId>org.jetbrains.kotlin</groupId>
                <version>${kotlin.version}</version>
                <executions>
                    <execution>
                        <id>compile</id>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>test-compile</id>
                        <goals>
                            <goal>test-compile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
    <repositories>
        <repository>
            <id>bintray-cy</id>
            <name>bintray-cy</name>
            <url>http://dl.bintray.com/cy6ergn0m/maven</url>
        </repository>
    </repositories>
```

This is it, you can now use kotlin for Vert.x development. Since this is a Kotlin only project, our source files will go in src/main/kotlin.

## Kotlin Vert.x example code
Let's write some code. Create a new file Main.kt in src/main/kotlin in a package of your choice (I'm using nl.edegier). Remember that Kotlin allows for functions outside of classes, so we specify the main function on the file level:

```java
fun main(args: Array<String>) {
    DefaultVertx {
        httpServer(8080) { request ->
            bodyJson {
                object_(
                        "message" to "Hello World!"
                )
            }
        }
    }
}
```

This example starts an HTTP server on port 8080. For each request, a json object with the property "message" and value "hello world" is returned. From this example we immediately notice that Kotlin syntax is well suited to the callback style API of Vert.x. The nested code suddenly doesn't look so bad as it does in Java.

For the next example, we create a sender and a receiver class which both inherit from AbstractVerticle:

```java
class Sender : AbstractVerticle() {
    override fun start(){
        vertx.setPeriodic(1000){
            vertx.eventBus().publish("test-channel","hello world")
        }
    }
}

class Receiver : AbstractVerticle() {
    override fun start() {
        vertx.eventBus().consumer<String>("test-channel"){
            println(it.body());
        }
    }
}
```

The Sender Verticle post as message to the eventbus every 1000 ms. The Receiver Verticle prints all received messages.

To deploy these Verticles, create the following main function:

```java
fun main(args: Array<String>) {
    DefaultVertx {
        deployVerticle(Receiver())
        deployVerticle(Sender())
    }
}
```

Kotlin and Vert.x really are a perfect match, this is as much fun as you can have on the JVM! The full source of this example is available on [github](https://github.com/erwindeg/kotlin-example).

