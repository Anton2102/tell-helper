import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";
import {IList} from "../app.component";

interface IListModalDialogComponent extends IList {
  isEdit: boolean;
}

@Component({
  selector: 'app-list-modal-dialog',
  templateUrl: './list-modal-dialog.component.html',
  styleUrls: ['./list-modal-dialog.component.scss']
})
export class ListModalDialogComponent {
  _fio = new FormControl(this.data.fio || '', [Validators.required]);
  _address = new FormControl(this.data.address || '');
  _tell = new FormControl(this.data.tells && JSON.parse(this.data.tells).main || '', [Validators.required]);
  _extra = new FormControl('');
  _extraCollections: string[] = this.data.tells && JSON.parse(this.data.tells).extra || [];

  constructor(
    public dialogRef: MatDialogRef<ListModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IListModalDialogComponent
  ) {}

  async _updateList(fio: string | null, address: string | null, tell: string | null): Promise<string | Response> {
    return await fetch(`http://localhost:3002/users/:${this.data.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fio,
        address,
        tells: JSON.stringify({
          main: tell,
          extra: ["1", "2"]
        })
      })
    }).then(r => r.text());
  }

  async _createList(fio: string | null, address: string | null, tell: string | null, extraCollection: string[]): Promise<string | Response> {
    return await fetch('http://localhost:3002/users', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fio,
        address,
        tells: JSON.stringify({
          main: tell,
          extra: extraCollection
        })
      })
    }).then(r => r.text());
  }

  /**
   * Добавляем "Доп. Номер" в коллекцию
   */
  _addExtraTell(): void {
    if (this._extra.value) {
      this._extraCollections.push(this._extra.value);
    }
  }

  /**
   * Удаление "Доп. Номера"
   * @param tell
   */
  _deleteExtraTell(tell: string): void {
    this._extraCollections = this._extraCollections.filter((extra: string) => extra !== tell);
  }

  /**
   * Обработчик клика кнопки Сохранить
   * @param isEdit
   */
  async _save(isEdit: boolean): Promise<void> {
    if (isEdit) {
      // todo Метод отрабатывает, ошибок нет, но и результата тоже. Надо править!
      // this._updateList(this._fio.value, this._address.value, this._tell.value).then((data) => {
      //   this.dialogRef.close();
      // });
      await fetch(`http://localhost:3002/users/${this.data.id}`, {method: 'DELETE', body: JSON.stringify({ id: this.data.id } )}).then(() => {
        this._createList(this._fio.value, this._address.value, this._tell.value, this._extraCollections).then(() => {
          this.dialogRef.close();
        });
      });
    } else {
      this._createList(this._fio.value, this._address.value, this._tell.value, this._extraCollections).then(() => this.dialogRef.close());
    }
  }

}
