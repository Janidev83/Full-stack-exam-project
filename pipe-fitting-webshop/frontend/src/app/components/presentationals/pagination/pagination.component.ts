import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() skipProductVolume = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  emitSkipAmount(amount: number): void {
    this.skipProductVolume.emit(amount);
  }
}
