import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatuts } from "../task-status.enum";

export class GetTasksFilterDto{
    @IsOptional()
    @IsIn([TaskStatuts.DONE,TaskStatuts.IN_PROGRESS,TaskStatuts.OPEN])
    status: TaskStatuts;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}