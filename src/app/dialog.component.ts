import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'my-dialog',
  standalone: true,
  template: `
    <h1 class="header">
      <ng-content select="[my-dialog-header]"></ng-content>
    </h1>
    <div class="body">
      <ng-content select="[my-dialog-body]"></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        width: 400px;
        height: 400px;
        background: #ccc;
        display: flex;
        flex-direction: column;
        opacity: 0.9;
        position: fixed;
        left: 50%;
        padding: 8px;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class MyDialogComponent {}
