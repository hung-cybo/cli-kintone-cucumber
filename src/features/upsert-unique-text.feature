Feature: Upsert

  Background:
    Given I empty app 21 with token "yPaHQtBr15g4yVb9QdirzhUXBV4QKyrqSEwR734p"

  Scenario: Verify that cli-kintone upserts by a unique text
    Given I import to app 21 by attachment file "src/test-data/upsert/sample-rows.csv"
    When I upsert to app 21 by update key is "UUID" and the attachment file "src/test-data/upsert/unique-text.data.csv"
    Then The first record does not change
    Then The second record is changed
    Then The third record is changed
