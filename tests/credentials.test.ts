import {readCredentials} from "../src/utilities/credentials";
import CredentialsNotFound from "../src/errors/CredentialsNotFound";

describe("function readCredentials", function () {
	it('should not throw CredentialsNotFound', () => {
		expect(readCredentials).not.toThrow(CredentialsNotFound);
	});
	it("should return object with Credentials", () => {
		const credentials = readCredentials();
		expect(credentials).toHaveProperty("databaseURI");
		expect(credentials).toHaveProperty("databasePassword");
	})
});

