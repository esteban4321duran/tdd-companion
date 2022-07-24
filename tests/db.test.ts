import { CallbackError, connect } from "mongoose";
import { readCredentials } from "../src/utilities/credentials";
import { TaskTypes, Task, TaskInterface } from "../src/models/Task";
import { Project, ProjectInterface } from "../src/models/Project";

describe("Mongoose Database Client", function() {
    it("should not throw error on connect()", function() {
        const credentials = readCredentials();
        return connect(credentials.databaseURI).then((successData) => {
            expect(successData).toBeDefined();
        });
    });
});

describe("Task", function() {
    it("Task.create() should create Task document on db", async function() {
        const credentials = readCredentials();
        await connect(credentials.databaseURI);
        const newTaskData = { name: "new task", type: TaskTypes.testCase, projectName: "abc" };
        Task.create(newTaskData, (error, createdTask: TaskInterface) => {
            expect(createdTask).toEqual({ newTaskData });
            Task.deleteOne({ name: "new task" });
        });
    });
    it("should get tasks for project", async function() {
        const credentials = readCredentials();
        await connect(credentials.databaseURI);
        const projectName = "abc";
        const tasksData = [
            { name: "task1", type: TaskTypes.testCase, projectName },
            { name: "task2", type: TaskTypes.testCase, projectName }
        ];
        Project.create({projectName},(_:CallbackError, project:ProjectInterface)=>{
            Task.create(tasksData,(_:CallbackError,tasks: TaskInterface[])=>{
                Task.find({ projectName }, "name type projectName", (_: CallbackError, tasks: TaskInterface[]) => {
                    expect(tasks).toEqual(tasksData);
                    Project.deleteOne({projectName});
                    Task.deleteMany({$or:[{name:"task1"},{name:"task2"}]});
                });
            });
        });
    });
});

describe("Project", function() {
    it("Project.create() should create Project document on db", async function() {
        const credentials = readCredentials();
        await connect(credentials.databaseURI);
        const newProjectData = { name: "abc" };
        Project.create(newProjectData, (_: CallbackError, createdProject: ProjectInterface) => {
            expect(createdProject).toEqual(newProjectData);
            Project.deleteOne(newProjectData);
        });
    });
    it("Project.findOne(name) should read Project document from db", async function() {
        const credentials = readCredentials();
        await connect(credentials.databaseURI);
        const newProjectData = { name: "abc" };
        Project.create(newProjectData, (_: CallbackError, newProject: ProjectInterface) => {
            Project.findOne(newProjectData, "name", (_: CallbackError, project: ProjectInterface) => {
                expect(project).toEqual(newProjectData);
                Project.deleteOne(newProjectData);
            });
        });

    });
});
