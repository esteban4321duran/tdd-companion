import { Schema, model } from "mongoose";

export interface TaskInterface {
    name: string;
    type: string;
    projectName: string;
}

export const TaskTypes = {
    testCase: "testCase",
    nullTestCase: "nullTestCase",
    refactor: "refactor"
};

const TaskSchema = new Schema<TaskInterface>({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: Object.values(TaskTypes) },
    projectName: { type: String, required: false, default: "default" }
});
/*
TaskSchema.methods.getForProject = (projectName: string, callback:(error:ErrorCallback,tasks: TaskInterface[])=>void) =>{
   Task.find({projectName},"name type projectName",callback);
}
*/
export const Task = model<TaskInterface>("Task", TaskSchema);
