package org.openapitools.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.annotation.Generated;

import org.openapitools.model.HelloWorld;
import org.openapitools.model.HelloWorldByIdQueryResponseMessage;
import org.openapitools.model.HelloWorldDeletedEventMessage;
import org.openapitools.model.HelloWorldSaidEventMessage;
import org.openapitools.model.HelloWorldSearchQueryResponseMessage;
import org.openapitools.model.HelloWorldSearchQueryResponseMessagePagination;
import org.openapitools.model.HelloWorldUpdatedEventMessage;
import org.openapitools.model.SayHelloCommandMessage;
import org.openapitools.model.UpdateHelloCommandMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-03-12T16:03:21.239048100-07:00[America/Denver]")
@Controller
@RequestMapping("${openapi.helloWorld.base-path:}")
public class HelloWorldApiController implements HelloWorldApi {
    private final NativeWebRequest request;
    private List<HelloWorld> helloWorldList = new ArrayList<>();

    @Autowired
    public HelloWorldApiController(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<HelloWorldSaidEventMessage> createHelloWorld(
            final SayHelloCommandMessage sayHelloCommandMessage) {
        HelloWorld helloWorld = new HelloWorld()
                .id(UUID.randomUUID())
                .name(sayHelloCommandMessage.getName());
        helloWorldList.add(helloWorld);

        HelloWorldSaidEventMessage helloWorldSaid = new HelloWorldSaidEventMessage()
                .message(helloWorld);
        return ResponseEntity.ok(helloWorldSaid);
    }

    @Override
    public ResponseEntity<HelloWorldDeletedEventMessage> deleteHelloWorld(
            final UUID helloWorldId) {
        for (int i = 0; i < helloWorldList.size(); i++) {
            HelloWorld message = helloWorldList.get(i);
            if (message.getId().equals(helloWorldId)) {
                helloWorldList.remove(i);
                return ResponseEntity.ok(new HelloWorldDeletedEventMessage().message(message));
            }
        }

        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<HelloWorldByIdQueryResponseMessage> getHelloWorld(
            final UUID helloWorldId) {
        for (int i = 0; i < helloWorldList.size(); i++) {
            HelloWorld message = helloWorldList.get(i);
            if (message.getId().equals(helloWorldId)) {
                return ResponseEntity.ok(new HelloWorldByIdQueryResponseMessage().message(message));
            }
        }

        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<HelloWorldSearchQueryResponseMessage> searchHelloWorlds(
            final Integer page,
            final Integer pageSize) {
        List<HelloWorld> results = helloWorldList.stream()
                .skip(page * pageSize)
                .limit(pageSize)
                .collect(Collectors.toUnmodifiableList());

        return ResponseEntity.ok(new HelloWorldSearchQueryResponseMessage()
                .results(results)
                .pagination(new HelloWorldSearchQueryResponseMessagePagination()
                        .page(page)
                        .pageSize(pageSize)
                        .totalResults(helloWorldList.size())));
    }

    @Override
    public ResponseEntity<HelloWorldUpdatedEventMessage> updateHelloWorld(
            final UpdateHelloCommandMessage updateHelloCommandMessage) {
        for (int i = 0; i < helloWorldList.size(); i++) {
            HelloWorld message = helloWorldList.get(i);
            message.setName(updateHelloCommandMessage.getName());
            if (message.getId().equals(updateHelloCommandMessage.getId())) {
                return ResponseEntity.ok(new HelloWorldUpdatedEventMessage().message(message));
            }
        }

        return ResponseEntity.notFound().build();
    }
}
