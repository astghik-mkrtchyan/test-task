import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private taskService = inject(TaskService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    form = this.fb.group({
        title: ['', Validators.required],
        status: ['pending', Validators.required]
    });

    isEditMode = false;
    taskId: number | null = null;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'new') {
            this.isEditMode = true;
            this.taskId = +id;
            this.taskService.getTask(this.taskId).subscribe(task => {
                this.form.patchValue({
                    title: task.title,
                    status: task.status
                });
            });
        }
    }

    save() {
        if (this.form.invalid) return;
        const task = this.form.value as Task;
        if (this.isEditMode && this.taskId) {
            this.taskService.updateTask(this.taskId, task).subscribe(() => {
                this.router.navigate(['/tasks']);
            });
        } else {
            this.taskService.createTask(task).subscribe(() => {
                this.router.navigate(['/tasks']);
            });
        }
    }
}
