import { Input, Output, EventEmitter, Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { IList } from '../app.component';
import {ListModalDialogComponent} from "../list-modal-dialog/list-modal-dialog.component";

interface IJSONParseTells {
  main: string;
  extra: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  @Input() lists: IList[] = [];
  @Output() newItemEvent = new EventEmitter<number[]>();
  @Output() closeDialogCallback = new EventEmitter<number[]>();
  _selectedIdsItem: number[] = [];

  constructor(public dialog: MatDialog) { }

  /**
   * Парсер. Строку -> Объект
   * @param str
   * @param type
   */
  _JSONParse(str: string): IJSONParseTells {
    return JSON.parse(str);
  }

  /**
   * Удаление записи
   * @param event
   * @param id
   */
  async _deleteItem(event: Event, id: number): Promise<void> {
    event.stopPropagation();
    const param = JSON.stringify({ id });
    return await fetch(`http://localhost:3002/users/${id}`, {method: 'DELETE', body: param}).then(() => {
      this._deleteItemsList([id]);
    });
  }

  /**
   * Удаление записей, без обращения к бд(локально)
   * @param ids
   */
  _deleteItemsList(ids: number[]): void {
    this.lists = this.lists.filter((list: IList) => !ids.includes(list.id));
  }

  /**
   * Обработчик выделение записи и событие с данными выделенных items (id)
   * @param selectedLength
   * @param id
   */
  _handlerListOption(selectedLength: number, id: number): void {
    if (selectedLength > this._selectedIdsItem.length) {
      this._selectedIdsItem.push(id);
    } else {
      this._selectedIdsItem = this._selectedIdsItem.filter((item) => item !== id);
    }
    this.newItemEvent.emit(this._selectedIdsItem);
  }

  /**
   * Открытие окна диалога Создания\редактирования записи
   * @param event
   * @param isEdit
   * @param list
   */
  _openDialog(event: Event, isEdit: boolean, list: IList) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ListModalDialogComponent, {
      width: '600px',
      data: { isEdit, ...list }
    });

    /**
     * Ловим событие закрытия окна "Создания\Редактирования" записи
     */
    dialogRef.afterClosed().subscribe(() => {
      this.closeDialogCallback.emit();
    });
  }
}
