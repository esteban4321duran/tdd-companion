import {Schema, model} from "mongoose";

export interface ProjectInterface{
    name: string;
}
const ProjectSchema = new Schema<ProjectInterface>({
    name: { type: String, unique: true, required: true},
});
export const Project = model<ProjectInterface>('Project',ProjectSchema);