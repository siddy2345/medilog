import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plus } from '@primeicons/angular/plus';
import { Trash } from '@primeicons/angular/trash';
import { ButtonDirective } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { PillModel } from '../pill-log/pill-log.models';

@Component({
  imports: [
    ButtonDirective,
    InputTextModule,
    InputNumberModule,
    LabelModule,
    FormsModule,
    Plus,
    Trash,
  ],
  selector: 'app-pill-editor',
  styleUrl: './pill-editor.css',
  templateUrl: './pill-editor.html',
})
export class PillEditor {
  readonly pillsToCreate = input.required<PillModel[]>();
  readonly onAddEntry = output();
  readonly onRemoveEntry = output<number>();

  addEntry(): void {
    this.onAddEntry.emit();
  }

  removeEntry(index: number): void {
    this.onRemoveEntry.emit(index);
  }
}
