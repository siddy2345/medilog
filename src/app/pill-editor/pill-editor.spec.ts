import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillEditor } from './pill-editor';

describe('PillEditor', () => {
  let component: PillEditor;
  let fixture: ComponentFixture<PillEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(PillEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
