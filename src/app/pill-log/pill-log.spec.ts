import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillLog } from './pill-log';

describe('PillLog', () => {
  let component: PillLog;
  let fixture: ComponentFixture<PillLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillLog],
    }).compileComponents();

    fixture = TestBed.createComponent(PillLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
