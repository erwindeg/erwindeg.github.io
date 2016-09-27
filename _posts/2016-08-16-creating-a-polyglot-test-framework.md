---
layout: post
title:  Creating a polyglot test framework with reactive technology
comments: true
permalink: /presentations/creating-a-polyglot-test-framework
category: presentation
---
![JavaOne]({{ site.url }}/img/javaone.jpg)
JavaOne 2016: Wednesday, Sep 21, 8:30 a.m. - 9:30 a.m. 

[Download Slides](CreatingAPolyglotTestFramework.pdf)

JavaOne is an annual conference organized by Oracle to discuss Java technologies among Java developers. JavaOne is held in San Francisco, California. This year I will be one of the speakers at this conference.

## What is this talk about?
At Sogeti Open Source we are building a test automation framework. The goal of this framework is to present a generic standard for test automation, by implementing a standard process and integrating with various existing frameworks. It allows test automation professionals to write tests in their own format (flat file, MS Excel, Json, etc.). These test scripts can then be used to run multiple tests against different API's (Web, REST, SQL, etc.) by using tools like Selenium, SOAPUI, Database drivers, etc.

The design follows a microservices approach, with loosely coupled components communicating through messages. Components can be realized in multiple languages such as Groovy and JavaScript. This enables test engineers to build extensions to the framework. The services themselves use a nonblocking, reactive programming paradigm. It is possible to add and remove components at runtime without bringing down the framework. It is also possible to easily deploy the framework on multiple nodes, giving it the ability to run a great number of test cases or performance tests in an isolated environment.

The framework leverages the various features of [Vert.x](http://vertx.io), like it's eventbus, polyglot, realtime deployment, etc.

## Where did this idea come from?
A lot of teams that want to implement test automation tend to reinvent the wheel. A tool for testing the specific technology is downloaded and test scripts are written. However, the more general approach of maintaining tests, scheduling them and integrating multiple test tools into test suits is something that teams struggle with. Sogeti's test automation department came up with the idea to present a generic approach to test automation and to implement this into an open framework. The framework can be extended by writing scripts for specific test components. This allows professionals who do not have programming as their core skill to extend the framework.


## What is your personal link with test automation and the technology used?
As a developer, I think that automation is a really important aspect of software development. The realization of this framework came as a challenge for me in which I could leverage the various features of modern approaches to software development and new technologies like Vert.x, MongoDB and AngularJS.

<iframe class="centerembed" src="//www.slideshare.net/slideshow/embed_code/key/Cm3Cbotimap5b" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> 
