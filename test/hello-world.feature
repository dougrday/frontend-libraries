Feature: Hello World
Background:
    * url "http://localhost:5000"

Scenario: Say Hello
Given path "/hello-world"
And request
"""
    {
        name: "Doug",
    }
"""
When method post
Then status 200
And match response ==
"""
    {
        "message": {
            "id": #string,
            "name": "Doug"
        }
    }
"""

Given path "/hello-world/" + response.message.id
When method get
Then status 200
And match response ==
"""
    {
        "message": {
            "id": #string,
            "name": "Doug"
        }
    }
"""
