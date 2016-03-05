---
layout: post
title: MQTT Client with Java
permalink: /blog/mqtt-client-with-java
---
[<img src="{{ site.baseurl }}/img/github.svg">](https://github.com/erwindeg/mqtt-example)
In this example we will build two MQTT clients in Java, one publishing messages and one consuming messages. We will make use of the public broker [MQTT Dashboard](http://mqtt-dashboard.com/dashboard).

## What is MQTT?
MQTT is a lightweight publish-subscribe protocol on top of TCP/IP. Its lightweight properties make it ideal for Internet of Things (IoT) scenario's,
where battery, cpu and memory resources are often limited. However the protocol can also be used on more powerful devices. MQTT requires low bandwidth and has facilities for unreliable networks.
In MQTT we distinguish clients and brokers. A client can publish and/or consume messages. A broker is responsible for receiving messages from the clients and 
sending them to the clients subscribed to the messages. Topics are used to publish messages and indicate in which messages a client is interested.

![MQTT broker client]({{ site.baseurl }}/img/mqtt-broker-client.svg)

## Eclipse Paho
Eclipse Paho is an open source client implementation for the MQTT protocol. It provides implementations in multiple languages like Java, JavaScript, Python, etc. 
When you use Maven for your project, use the following to add the Paho dependency to your application.

```xml
<dependency>
    <groupId>org.eclipse.paho</groupId>
	<artifactId>org.eclipse.paho.client.mqttv3</artifactId>
	<version>1.0.2</version>
</dependency>
```

## Publisher
The Publisher class implements the MqttCallback interface. This allows us to implement methods which are called when the connection is lost or when messages arrive. 
The first step is to make a connection with the broker. The URL of the mqttdashboard.com public broker is used. We also pass a CLIENT_ID, which must be unique per broker. Finally we specify an in-memory persistence mechanism.
On the MqttConnectOptions, we specify a last will. This is a message that is send by the broker, to the specified last will topic, when this client disconnects. We pass an instance of the Publisher to the setCallback method to make use of the connectionLost callback.

```java
private static final String LAST_WILL_TOPIC = "erwindeg/last_will_topic";
private static final String CLIENT_ID = UUID.randomUUID().toString();

public Publisher() throws MqttException {
	this.client = new MqttClient("tcp://broker.mqttdashboard.com", CLIENT_ID, new MemoryPersistence());

	final MqttConnectOptions mqttConnectOptions = new MqttConnectOptions();
	mqttConnectOptions.setWill(LAST_WILL_TOPIC, "client offline".getBytes(), 2, true);
	this.client.setCallback(this);
	this.client.connect(mqttConnectOptions);
}
```

Now that we have a connection with the broker, we can start sending messages. We construct a MqttMessage with as payload a json message with a latitude and a longitude. On the message, we specify a Quality of Service level of 2, which means a message should be delivered exactly once. The other levels are 0 (at most once) and 1 (at least once). For sending messages, the QoS level is between the client and the broker. For delivering messages, the QoS can be set on the subscription. A higher level will negatively impact performance.

```java
public void publishData() throws MqttException, UnsupportedEncodingException {
	String payload = "{\"lat\": \"52.3667\", \"lon\": \"4.9000\"}";
	MqttMessage message = new MqttMessage(payload.getBytes("UTF-8"));
	message.setQos(2);
	this.client.publish(TOPIC, message);
}
```

Finally we implement the connectionLost method.

```java
public void connectionLost(Throwable ex) {
	ex.printStackTrace();
}
```

Start the Publisher and go to the [MQTT dashboard](http://mqtt-dashboard.com/dashboard) page. If all is well, you will see your topic in the recently used topics list!

## Consumer
Like the publisher, the Consumer implements the MqttCallback interface. Creating the connection with the broker happens in the same way as with the publisher. The only extra step is that we subscribe to the same topic that is used by the Publisher.

```java
public Consumer() throws MqttException {
	this.client = new MqttClient("tcp://broker.mqttdashboard.com", CLIENT_ID, new MemoryPersistence());

	final MqttConnectOptions mqttConnectOptions = new MqttConnectOptions();
	mqttConnectOptions.setWill(LAST_WILL_TOPIC, "client offline".getBytes(), 2, true);

	this.client.connect(mqttConnectOptions);
	this.client.setCallback(this);
	this.client.subscribe(TOPIC);
}
```

We will be using the messageArrived method to receive messages.

```java
public void messageArrived(String arg0, MqttMessage message) throws Exception {
	System.out.println(new String(message.getPayload(), "UTF-8"));
}
```

Start your Consumer, if the Publisher is still running, the Consumer will now log the messages to the console. 

Congratulations, you have build your first MQTT clients! The full source is available on [Github](https://github.com/erwindeg/mqtt-example).