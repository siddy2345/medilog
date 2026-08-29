import { Component, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LOCAL_STORAGE_KEY, PillModel } from './pill-log.models';
import { PillEditor } from '../pill-editor/pill-editor';

@Component({
  imports: [DialogModule, ButtonDirective, PillEditor],
  selector: 'app-pill-log',
  styleUrl: './pill-log.css',
  templateUrl: './pill-log.html',
})
export class PillLog {
  readonly visible = signal(false);
  readonly pillsToCreate = signal<PillModel[]>([{ name: '', goal: 0, id: 0, intake: 0 }]);
  readonly pills = signal<PillModel[]>([]);

  private readonly defaultPillModel: PillModel = { name: '', goal: 0, id: 0, intake: 0 };

  openDialog(): void {
    this.visible.set(true);
    try {
      const pills = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '');
      if (pills) this.pillsToCreate.set(pills);
    } catch (error) {
      console.warn('No Entries found.');
    }
  }

  closeDialog(): void {
    this.visible.set(false);
    this.pillsToCreate.set([{ ...this.defaultPillModel }]);
  }

  addEntry(): void {
    this.pillsToCreate.update((value) => [...value, { ...this.defaultPillModel }]);
  }

  removeEntry(index: number): void {
    this.pillsToCreate.update((value) => value.filter((_, i) => i !== index));
  }

  savePills(): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.pillsToCreate()));
    this.pills.set(this.pillsToCreate());
    this.closeDialog();
  }
}
