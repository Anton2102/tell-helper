import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListModalDialogComponent } from '../list-modal-dialog/list-modal-dialog.component';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss']
})
export class ListModalComponent {
  @Output() closeDialogCallback = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog) {}

  _openDialog() {
    const dialogRef = this.dialog.open(ListModalDialogComponent, {
      width: '600px',
      data: { isEdit: false }
    });

    /**
     * Ловим событие закрытия окна "Создания\Редактирования" записи
     */
    dialogRef.afterClosed().subscribe(() => {
      this.closeDialogCallback.emit();
    });
  }
}
