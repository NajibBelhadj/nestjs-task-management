import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatuts } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatuts.OPEN,
        TaskStatuts.IN_PROGRESS,
        TaskStatuts.DONE
    ];
    transform(value: any) {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
        throw new BadRequestException(`"${value}" is an invalid status`)
    }
     
     return value;
 }


 private isStatusValid(status: any): Boolean{
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
 }
}