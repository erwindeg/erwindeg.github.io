---
layout: post
title:  Mocking callbacks with Mockito
comments: true
permalink: /blog/mocking-callbacks-with-mockito
---

## Unit testing methods with callbacks
I am using the asynchronous Java MongoDB driver in an application to interact with MongoDB. A typical method signature from this library look like this:

```java
MongoClient find(String collection, JsonObject query, Handler<AsyncResult<List<JsonObject>>> result);
```

This method retrieves the documents from the given collection, matching the given query. When the operation is finished, the callback handler is called with the resulting documents. When you want to write a unit test for a piece of code which uses this functionality, you probably want to mock this call and return a dummy result. However, since the result is not returned synchronously from the method, we have to mock the call to the callback handler. 

## Calling a callback handler from a Mockito mock.

First we create a mock instance of the MongoClient:

```java
MongoClient mongoClient = mock(MongoClient.class);
```

```java
 doAnswer(invocation -> {
                ((Handler<AsyncResult<List<JsonObject>>>) invocation.getArguments()[2]).handle(Future.succeededFuture(Arrays.asList(new JsonObject())));
                return mongoClient;
        }).when(mongoClient).find(any(String.class), any(JsonObject.class), any(Handler.class));
```



