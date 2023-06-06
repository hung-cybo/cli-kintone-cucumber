import { binding, given, then, when } from "cucumber-tsflow";
import { executeCommand, generateRandomString } from "../common/helper";
import { assert } from "chai";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { restAPIClientOptions } from "../common/rest-api-client-options";

setDefaultTimeout(10000); // Set the default timeout to 10 seconds

@binding()
export class UpsertSteps {
  private responseData: string[] = [];
  private downloadedAttachmentFolder: string = `tmp/${generateRandomString(
    10
  )}-attachments_dir`;

  @given(/^I empty app (\d+) with token "([^"]*)"$/)
  public async deleteRecords(appId: number, apiToken: string) {
    await executeCommand(
      `./bin/cli-kintone record delete --base-url ${restAPIClientOptions.baseUrl} --api-token ${apiToken} --app ${appId} -y`
    );
  }

  @given(
    /^I import to app (\d+) by attachment file "([^"]*)" with attachment folder "([^"]*)"$/
  )
  public async importRecords(
    appId: number,
    filePath: string,
    attachmentDir: string
  ) {
    const result = await executeCommand(
      `./bin/cli-kintone record import --base-url ${restAPIClientOptions.baseUrl} --username ${restAPIClientOptions.username} --password ${restAPIClientOptions.password} --app ${appId} --file-path ${filePath} --attachments-dir ${attachmentDir}`
    );
    assert.isNull(result.error);
  }

  @when(/^I export records of app (\d+) including attachments$/)
  public async exportRecords(appId: number) {
    const exportResult = await executeCommand(
      `./bin/cli-kintone record export --base-url ${restAPIClientOptions.baseUrl} --username ${restAPIClientOptions.username} --password ${restAPIClientOptions.password} --app ${appId} --attachments-dir ${this.downloadedAttachmentFolder}`
    );

    this.responseData = exportResult.stdout.split("\n");
  }

  @then(/^I can save attachments$/)
  public canSaveAttachment() {
    assert.match(
      this.responseData[1],
      /^\*,"[0-9]+","Attachment-[0-9]+\/A\.txt","[0-9]+","Attachment_0-[0-9]+-0\/A-1\.txt"/
    );
    assert.match(
      this.responseData[2],
      /^,"[0-9]+","Attachment-[0-9]+\/A.txt","[0-9]+","Attachment_0-[0-9]+-1\/A-2.txt"/
    );
    assert.match(
      this.responseData[3],
      /^\*,"[0-9]+","Attachment-[0-9]+\/B.txt","[0-9]+","Attachment_0-[0-9]+-0\/B-1.txt/
    );
    assert.match(
      this.responseData[4],
      /^Attachment_0-[0-9]+-0\/B-1 \(1\).txt"/
    );
  }
}
