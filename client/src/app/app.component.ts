import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

export interface IList {
  id: number;
  fio: string;
  address: string;
  tells: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  _nameControl: any = new FormControl('');
  _isSelectedItem: number[] = [];
  _lists: IList[] = [];

  /**
   * Массовое удаление
   */
  async _deleteItems(): Promise<void> {
    this._isSelectedItem.map((id) => {
      const param = JSON.stringify({ id });
      fetch(`http://localhost:3002/users/${id}`, {method: 'DELETE', body: param});
    });
    this._lists = this._lists.filter((item) => !this._isSelectedItem.includes(item.id));
  }

  /**
   * Видимость кнопки массового удаления
   * @param ids
   */
  _setVisibleDelete(ids: number[]): void {
    this._isSelectedItem = ids;
  }

  /**
   * Обновление списка
   * @param tell
   */
  _setLists(tell: string): void {
    this._loadListUsers(tell.length >= 3 ? tell : '').then((lists) => this._lists = lists);
  }

  /**
   * Загрузка записей
   */
  async _loadListUsers(tell: string): Promise<IList[]> {
    const url = tell ? `http://localhost:3002/users/${tell}` : 'http://localhost:3002/users';
    return await fetch(url).then((response) => response.json()).then((data) => data);
  }

  constructor() {
    this._setLists('');

    /**
     * Подписались на обработчик ввода данных в input поиска по телефону
     */
    this._nameControl.valueChanges.subscribe((value: string) => {
      this._setLists(value);
    });
  }
}
