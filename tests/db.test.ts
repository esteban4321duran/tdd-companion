import {connect} from "mongoose";
import {readCredentials} from "../src/utilities/credentials";
import {TaskTypes, Task} from "../src/models/Task";

describe("Mongoose Database Client", function () {
	it("should not throw error on connect()", function () {
		const credentials = readCredentials();
		return connect(credentials.databaseURI).then((successData) => {
			expect(successData).toBeDefined();
		})
	});
});

describe("tasks.create()", function () {
	it('should create Task document on db', async function () {
		const credentials = readCredentials();
		await connect(credentials.databaseURI);
		const newTaskData = {name: "new task", type: TaskTypes.testCase};
		return Task.create(newTaskData).then((resolveData) => {
			expect(resolveData).toBeDefined();
		}).finally(async () => {
			await Task.deleteOne({name: "new task"});
		})
	});
})
