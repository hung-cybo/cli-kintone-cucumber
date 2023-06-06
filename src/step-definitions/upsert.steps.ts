import { binding, given, then, when } from "cucumber-tsflow";
import { executeCommand } from "../common/helper";
import { assert } from "chai";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { restAPIClientOptions } from "../common/rest-api-client-options";

setDefaultTimeout(10000); // Set the default timeout to 10 seconds

@binding()
export class UpsertSteps {
  private responseRecords: string[] = [];

  @given(/^I import to app (\d+) by attachment file "([^"]*)"$/)
  public async importRecords(appId: number, filePath: string) {
    const result = await executeCommand(
      `./bin/cli-kintone record import --base-url ${restAPIClientOptions.baseUrl} --username ${restAPIClientOptions.username} --password ${restAPIClientOptions.password} --app ${appId} --file-path ${filePath}`
    );
    assert.isNull(result.error);
  }

  @when(
    /^I upsert to app (\d+) by update key is "([^"]*)" and the attachment file "([^"]*)"$/
  )
  public async deposit(appId: number, updateKey: string, filePath: string) {
    const upsertResult = await executeCommand(
      `./bin/cli-kintone record import --base-url ${restAPIClientOptions.baseUrl} --username ${restAPIClientOptions.username} --password ${restAPIClientOptions.password} --app ${appId} --update-key ${updateKey} --file-path ${filePath}`
    );
    assert.isNull(upsertResult.error);

    const exportResult = await executeCommand(
      `./bin/cli-kintone record export --base-url ${restAPIClientOptions.baseUrl} --username ${restAPIClientOptions.username} --password ${restAPIClientOptions.password} --app ${appId}`
    );

    this.responseRecords = exportResult.stdout.split("\n");
  }

  @then(/^The first record does not change$/)
  public firstRecordIsNotChanged() {
    assert.include(
      this.responseRecords[1],
      '"100","0da21dfe-f543-4115-8b21-dc5cbded7ac4","alice","10"'
    );
  }

  @then(/^The second record is changed$/)
  public secondRecordIsChanged() {
    assert.include(
      this.responseRecords[3],
      '"200","0c7a0ea3-0ce4-4aef-be04-c15ef6b2b819","bob","15"'
    );
    assert.include(this.responseRecords[3], '"Country","JAPAN"');
    assert.include(this.responseRecords[4], '"Language","ja"');
  }

  @then(/^The third record is changed$/)
  public thirdRecordIsChanged() {
    assert.include(
      this.responseRecords[5],
      '"300","22c03f85-99e4-4a45-a6a7-bbd3e8d4d4d5","carol","30"'
    );
    assert.include(this.responseRecords[5], '"Country","DE"');
    assert.include(this.responseRecords[6], '"Language","de"');
  }
}
