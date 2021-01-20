---
title: 'Wrangling Spring’s Automagic'
date: '2020-09-22'
---
I primarily use [Spring](https://spring.io/projects/spring-framework) when developing Java applications. I have years of experience with Spring, and it can do a lot for you without much effort. It’s often described as working automagically. This is code for “I don’t know why it worked, but it worked.”

Spring just makes things work. You worry about your “business logic” code and Spring will glue everything together. But sometimes this breaks down. Spring will assume and try to do *too* much.

Spring lets you define “beans” in a configuration class that can be injected into other services. You define how to create an instance of a class once and it’s then automatically injected into other services that need it.
    <code class="code-block">
      @Configuration
      class LoggingConfiguration {
          @Bean
          LoggingService loggingService() {
              return new LoggingService();
          }
      }
    </code>

This is great. Spring will create one instance of <code>LoggingService</code> and will give you a reference every time you need one. But you can also define beans that use built in Java types such as <code>String</code>, <code>List</code>, or <code>Map</code>.
    <code class="code-block">
      @Bean
      Map<String, String> loggingProperties() {
          Map<String, String> properties = new HashMap<>();
          properties.put("debug.enabled", "true");
          return properties;
      }
    </code>

And this usually does what you want. You define a service that uses this bean and Spring figures out want you want from the variable name (<code>loggingProperties</code>) and the type (<code>Map<String, String></code>).
    <code class="code-block">
      @Component
      class LoggingService {
          private final Map<String, String> loggingProperties;

          LoggingService(Map<String, String> loggingProperties) {
              this.loggingProperties = loggingProperties;
          }
      }
    </code>

But what happens if you make a mistake? What happens if you don’t match the variable name exactly to the bean name?
    <code class="code-block">
      LoggingService(Map<String, String> <b>loggingProps</b>) {...}
    </code>

You are asking for a bean that is not explicitly defined. I’d hope the application would fail to start; fail fast to avoid a bug. Nope, Spring tries to be smart. It tries to find <em>something</em> that could satisfy that bean requirement, and sometimes, it succeeds.

One of Spring’s automagic features is to provide a collection of all beans of a given type. If you want all <code>LoggingService</code> beans, you can use either of these:
  <code class="code-block">
    List<LoggingService> services;
    Map<String, LoggingService> services
  </code>
and Spring will populate those collections for you. The map keys are populated with the name of the bean.

So let’s say you mistype your variable name. And you happen to have <em>any</em> String beans defined such as:
    <code class="code-block">
    @Bean
    String selectAll() {
        return "select * from table_name";
    }
    </code>
 Spring will give you a map of all beans of type String. It won’t fail to start. And it definitely won’t give you your explicitly defined `loggingProperties` bean.

This automagic feature is something I’ve used myself. Sometimes it’s really useful to get all beans of a given type. I don’t mind that the feature is there. I mind that it’s too easy to get it wrong and cause bugs.

My recommended fix: don’t define beans using the provided types such as <code>String</code>, <code>List</code>, or <code>Map</code>. Don’t give Spring the chance to guess. Define a custom type and explicitly ask for that type. If you just need a map, that’s okay. Extend HashMap to create your custom type and use that.
    <code class="code-block">
      class LoggingProperties extends HashMap<String, String> {...}
    </code>
    And use this type in your bean definition:
    <code class="code-block">
      @Bean
      LoggingProperties loggingProperties() {
        LoggingProperties properties = new LoggingProperties();
            properties.put("debug.enabled", "true");
            return properties;
      }
    </code>
Now if you mistype a variable name, Spring won’t have a bean to give you and the application won’t start. This is such a better failure mode. Instead of silently giving you what you don’t want, Spring refuses to run. I wish Spring had pulled back its automagic just a bit for this one and defined its own custom types for this feature. But it did not, so we must code defensively for it.