FROM openjdk:17
COPY target/*.jar /app/
WORKDIR /app
ENTRYPOINT ["java", "-jar", "backend-config-service-0.0.1-SNAPSHOT.jar"]