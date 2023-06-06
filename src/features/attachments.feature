Feature: Attachment

  Background:
    Given I empty app 22 with token "NTXCgHRFLgpkkEDukdq0fdsbvMvNUlaleBAyG7rw"

  Scenario: Verify cli-kintone can import and export attachments on the record
    Given I import to app 22 by attachment file "src/test-data/attachment/import.data.csv" with attachment folder "src/test-data/attachment"
    When I export records of app 22 including attachments
    Then I can save attachments
