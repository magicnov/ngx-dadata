import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NgxDadataService } from './ngx-dadata.service';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { DadataResponse } from './models/dadata-response';
import { DadataSuggestion } from './models/suggestion';
import { DadataConfig, DadataConfigDefault } from './dadata-config';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-dadata',
  templateUrl: './ngx-dadata.component.html',
  styleUrls: ['./ngx-dadata.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxDadataComponent),
    multi: true
  }]
})
export class NgxDadataComponent implements OnInit {

  data: DadataSuggestion[] = [];

  @Input() config: DadataConfig = DadataConfigDefault;
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Output() selected: EventEmitter<DadataSuggestion> = new EventEmitter<DadataSuggestion>();

  constructor(private dataService: NgxDadataService) {}

  ngOnInit(): void {
    this.dataService.setApiKey(this.config.apiKey);
    this.control.valueChanges.pipe(
      debounce(() => timer(this.config.delay ? this.config.delay : 500)),
    ).subscribe(x => {
      if (x && typeof x === 'string') {
        this.dataService.getData(x, this.config.type, this.config)
          .subscribe((y: DadataResponse) => {
          this.data = y.suggestions;
        });
      }
      else {
        this.data = [];
      }
    });
  }

  getItemDisplayName(item: DadataSuggestion) {
    return item ? item.value : '';
  }

  itemSelected(item: DadataSuggestion): void {
    this.selected.emit(item);
  }
}
