import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
    private taskService = inject(TaskService);
    tasks = signal<Task[]>([]);

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getTasks().subscribe(data => {
            this.tasks.set(data);
        });
    }

    deleteTask(id: number | undefined) {
        if (!id) return;
        if (confirm('Are you sure?')) {
            this.taskService.deleteTask(id).subscribe(() => {
                this.loadTasks();
            });
        }
    }
}
