import { Component, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { LOCAL_STORAGE_KEY, PillModel } from './pill-log.models';
import { PillEditor } from '../pill-editor/pill-editor';
import { CaretDown } from '@primeicons/angular/caret-down';
import { CaretUp } from '@primeicons/angular/caret-up';
import { Refresh } from '@primeicons/angular/refresh';
import { fireConfetti } from './confetti';

@Component({
  imports: [DialogModule, ButtonDirective, PillEditor, CardModule, CaretUp, CaretDown, Refresh],
  selector: 'app-pill-log',
  styleUrl: './pill-log.css',
  templateUrl: './pill-log.html',
})
export class PillLog {
  readonly visible = signal(false);
  readonly pillsToCreate = signal<PillModel[]>([{ name: '', goal: 0, id: 0, intake: 0 }]);
  readonly pills = signal<PillModel[]>([]);

  private readonly defaultPillModel: PillModel = { name: '', goal: 0, id: 0, intake: 0 };

  constructor() {
    const pills = this.retrievePills();
    if (pills && pills.length) {
      this.pillsToCreate.set(pills);
      this.pills.set(pills);
    }
  }

  openDialog(): void {
    const pills = this.retrievePills();
    if (pills && pills.length) {
      this.pillsToCreate.set(pills);
    }
    this.visible.set(true);
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
    this.setToLocalStorage(this.pillsToCreate());
    this.pills.set(this.pillsToCreate());
    this.closeDialog();
  }

  incrementIntake(index: number, event: MouseEvent): void {
    let shouldFireConfetti = false;
    this.pills.update((values) => {
      if (values[index].intake < 99) values[index].intake++;
      shouldFireConfetti = values[index].intake == values[index].goal;
      return values;
    });

    this.setToLocalStorage(this.pills());

    if (shouldFireConfetti) fireConfetti(event.clientX, event.clientY);
  }

  decrementIntake(index: number): void {
    this.pills.update((values) => {
      if (values[index].intake > 0) values[index].intake--;
      return values;
    });

    this.setToLocalStorage(this.pills());
  }

  resetIntake(index: number): void {
    this.pills.update((values) => {
      values[index].intake = 0;
      return values;
    });

    this.setToLocalStorage(this.pills());
  }

  resetAll(): void {
    this.pills.update((values) => {
      values.map((value) => (value.intake = 0));
      return values;
    });

    this.setToLocalStorage(this.pills());
  }

  private setToLocalStorage(pills: PillModel[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pills));
  }

  private retrievePills(): PillModel[] | undefined {
    try {
      const pills = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '');
      if (pills) {
        return pills as PillModel[];
      }
      return undefined;
    } catch (error) {
      console.warn('No Entries found.');
      return undefined;
    }
  }
}
