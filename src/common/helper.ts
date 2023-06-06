import type { ExecException } from "child_process";
import { exec } from "child_process";
import crypto from "crypto";

export const executeCommand = (
  cmd: string,
  throwError: boolean = true
): Promise<{ error: ExecException | null; stderr: string; stdout: string }> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error && throwError) {
        reject(error);
      } else {
        resolve({ error, stderr, stdout });
      }
    });
  });
};

export const generateRandomString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};
