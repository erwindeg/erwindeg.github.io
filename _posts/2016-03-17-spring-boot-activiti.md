---
layout: post
title: Spring Boot and Activiti 
comments: true
permalink: /blog/spring-boot-activiti
---
[<img src="{{ site.url }}/img/github.svg">](https://github.com/erwindeg/activiti-examples)
Activiti is an open source workflow and BPM platform built in Java. In has a BPMN engine which allows you to create business flows in diagrams and execute them as part of your application. Activiti integrates really well with the Spring Framework. Combining it with Spring Boot allows you to build micro business process applications really quickly.

The following diagram shows a simple workflow as modeled in the Activiti Diagram Editor Eclipse plugin.

![BPMN2 process]({{ site.url }}/img/process1.jpg)

Since BPMN2 is based on xml, the source can be edited easily as well.

Example:

```xml
<process id="oneTaskProcess" name="The One Task Process" isExecutable="true">
	<startEvent id="theStart"></startEvent>
	<sequenceFlow id="flow1" sourceRef="theStart" targetRef="theTask"></sequenceFlow>
	<serviceTask id="theTask" name="Java task 1" activiti:expression="#{testBean.test(text)}" activiti:resultVariableName="text"></serviceTask>
	<sequenceFlow id="flow2" sourceRef="theTask" targetRef="theTask2"></sequenceFlow>
	<serviceTask id="theTask2" name="Java task 2" activiti:expression="#{testBean.test(text)}"></serviceTask>
	<sequenceFlow id="flow3" sourceRef="theTask2" targetRef="theEnd"></sequenceFlow>
	<endEvent id="theEnd"></endEvent>
</process>
```

The diagram has two tasks (Java task one and two) which are calls to a Spring Bean. On the bean the test method is called, with as argument the process variable "text", the return value of the method is assigned to the process variable "text" by using the "resultVariableName" attribute. The implementation of the bean is as follows.

```java
@Component
public class TestBean {

    public String test(String text){
        System.out.println("testbean variable:"+text);
        return "hello from testbean";
    }
}

```

This a regular Spring component, it is not tied in any way to Activiti or it's API. Any Spring bean in the application context can be used inside the business process.
To create an Activiti / Spring Boot Maven project we use the following pom.xml.

```xml
...

    <dependencies>
        <dependency>
            <groupId>org.activiti</groupId>
            <artifactId>spring-boot-starter-basic</artifactId>
            <version>5.17.0</version>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>1.4.183</version>
        </dependency>       
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

...

```

We need to use an annotated Java class to start the application and start Spring Boot:

```java
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

Finally, we can programmatically start a process instance to test that this setup actually works:

```java
@Bean
public CommandLineRunner init(final RepositoryService repositoryService,
                              final RuntimeService runtimeService,
                              final TaskService taskService) {

    return new CommandLineRunner() {
        @Override
        public void run(String... strings) throws Exception {
            Map<String, Object> inputVariables = new HashMap<>();
            inputVariables.put("text", "intial text");
            runtimeService.startProcessInstanceByKey("oneTaskProcess", inputVariables);            
        }
    };

}
```

This will give the following output:

```
testbean variable:intial text
testbean variable:hello from testbean
2016-03-18 20:22:12.097  INFO 13792 --- [           main] MyApplication                            : Started MyApplication in 3.099 seconds (JVM running for 3.412)
```


The full source of this example is available on [github](https://github.com/erwindeg/activiti-examples).

