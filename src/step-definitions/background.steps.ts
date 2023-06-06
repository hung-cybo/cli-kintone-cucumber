import { binding, given } from "cucumber-tsflow";
import { executeCommand } from "../common/helper";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { restAPIClientOptions } from "../common/rest-api-client-options";

setDefaultTimeout(10000); // Set the default timeout to 10 seconds

@binding()
export class BackgroundSteps {
  @given(/^I empty app (\d+) with token "([^"]*)"$/)
  public async deleteRecords(appId: number, apiToken: string) {
    await executeCommand(
      `./bin/cli-kintone record delete --base-url ${restAPIClientOptions.baseUrl} --api-token ${apiToken} --app ${appId} -y`
    );
  }
}
