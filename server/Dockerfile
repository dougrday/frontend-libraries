FROM maven:3.8.4-openjdk-17
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
CMD ["java", "-jar", "target/openapi-spring-1.0.0.jar"]