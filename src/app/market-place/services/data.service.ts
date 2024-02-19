import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private updateDataSubject = new Subject<void>();

  updateData() {
    this.updateDataSubject.next();
  }

  getUpdateData() {
    return this.updateDataSubject.asObservable();
  }
}
