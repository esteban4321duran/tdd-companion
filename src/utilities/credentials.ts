import {readFileSync} from "fs";
import {resolve} from "path";
import CredentialsNotFound from "../errors/CredentialsNotFound";

const path = resolve(__dirname, "../../..", "credentials.json");

/*
interface Credentials {
    databaseURI: string;
    databasePassword: string;
}
*/
export function readCredentials() {
    try {
        return JSON.parse(readFileSync(path, "utf-8"));
    } catch (error) {
        throw new CredentialsNotFound('received path: ' + path);
    }
}

