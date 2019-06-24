Feature: API root endpoint

  Scenario: Returns a welcome message
    When I send a GET request to api root endpoint
    Then The response code should be 200
    And The response should match json:
    """
    {
      "message": "Welcome to post-comment-api."
    }
    """
