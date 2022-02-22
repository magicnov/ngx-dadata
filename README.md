# ngx-dadata
[![npm version](https://badge.fury.io/js/%40magicnov%2Fngx-dadata.svg)](https://badge.fury.io/js/%40magicnov%2Fngx-dadata)

Angular 6+ [Dadata][dadata] suggestion (подсказки) implementation with Material Design


## Getting Started

### Demo
Demo is here [demo][demo]

Working code for this demo at stackblitz [example][example]

### Installation

Install via [npm][npm] package manager

```bash
npm install @kolkov/ngx-dadata --save
```

### Usage

Import `ngx-dadata` module

```typescript
import { HttpClientModule } from '@angular/common/http';
...
import { NgxDadataModule } from '@kolkov/ngx-dadata';

@NgModule({
  imports: [ HttpClientModule, NgxDadataModule ]
})
```

Then in HTML

```html
<ngx-dadata [config]="config" [(ngModel)]="currentAddress"></ngx-dadata>
```

or

```html
<ngx-dadata formControlName="currentAddress" [config]="config" (selected)="onAddressSelected($event)"></ngx-dadata>
```

where

```typescript
import { DadataConfig } from '@kolkov/ngx-dadata';

...

config: DadataConfig = {
    apiKey: 'your_api_key',
    type: DadataType.address
  };

onAddressSelected(event: DadataSuggestion) {
    const addressData = event.data as DadataAddress;
    console.log(addressData);
  }
```

For `ngModel` to work, you must import `FormsModule` from `@angular/forms`, or for `formControlName`, you must import `ReactiveFormsModule` from `@angular/forms`

also you may add additional options to constraint search (for example cities only):

 ```typescript
import { DaDataConfig } from '@kolkov/ngx-dadata';
 ...
 config: DaDataConfig = {
    apiKey: 'your_api_key',
    type: DaDataType.address,
    locations: [
        {
            region: 'Самарская',
            city: 'Тольятти',
        }        
    ]     
  };
```

## What's included

Within the download you'll find the following directories and files. You'll see something like this:

```
dadata/
└── projects/
    ├── ngx-dadata/
    └── ngx-dadata-app/
```
`ngx-dadata/` - library

`ngx-dadata-app/` - demo application

## Documentation

The documentation for the `ngx-dadata` is hosted at our website [ngx-dadata](https://ngx-dadata.kolkov.ru/)

## Contributing

Please read through our [contributing guidelines](https://github.com/kolkov/ngx-dadata/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Editor preferences are available in the [editor config](https://github.com/kolkov/ngx-dadata/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, `ngx-dadata` is maintained under [the Semantic Versioning guidelines](http://semver.org/).

See [the Releases section of our project](https://github.com/kolkov/ngx-dadata/releases) for changelogs for each release version.

## Creators

**Andrey Kolkov**

* <https://github.com/kolkov>

[npm]: https://www.npmjs.com/
[dadata]: https://dadata.ru/api/suggest/
[demo]: https://ngx-dadata.stackblitz.io/
[example]: https://stackblitz.com/edit/ngx-dadata
