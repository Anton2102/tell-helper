import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModalDialogComponent } from './list-modal-dialog.component';

describe('ListModalDialogComponent', () => {
  let component: ListModalDialogComponent;
  let fixture: ComponentFixture<ListModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
