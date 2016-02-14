## MQTT Client in Java
<span class="date">15-02-2016</span> <br></br>
<a href="https://github.com/erwindeg/mqtt-example"><img class="article-icon" src="img/github.svg"/></a>

In this example we will build two MQTT clients in Java, one publishing messages and one consuming messages. We will make use of the public broker [MQTT Dashboard](http://mqtt-dashboard.com/dashboard).

### What is MQTT?
MQTT is a lightweight publish-subscribe protocol on top of TCP/IP. Its lightweight properties make it ideal for Internet of Things (IoT) scenario's,
where battery, cpu and memory resources are often limited. However the protocol can also be used on more powerful devices. MQTT requires low bandwidth and has facilities for unreliable networks.
In MQTT we distinguish clients and brokers. A client can publish and/or consume messages. A broker is responsible for receiving messages from the clients and 
sending them to the clients subscribed to the messages. Topics are used to publish messages and indicate in which messages a client is interested.

![MQTT broker client](content/img/mqtt-broker-client.svg)

### Eclipse Paho
Eclipse Paho is an open source client implementation for the MQTT protocol. It provides implementations in multiple languages like Java, JavaScript, Python, etc. 
When you use Maven for your project, use the following to add the Paho dependency to your application.

```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
	<artifactId>org.eclipse.paho.client.mqttv3</artifactId>
	<version>1.0.2</version>
</dependency>
```

### Publisher
