// import { Injectable, NgModule } from '@angular/core';
// import { createMachine, interpret, assign } from 'xstate';
// import { inspect } from '@xstate/inspect';

// @Injectable()
// @NgModule({})
// export class CounterMachineService {
//   counterMachine: any;
//   counterService: any;
//   constructor() {
//     this.counterMachine = createMachine({
//       initial: 'active',
//       states: {
//         active: {
//           on: {
//             INC: { actions: 'INC' },
//             DEC: { actions: 'DEC' },
//             STOP: { actions: 'STOP', target: 'stoped' },
//           },
//         },
//         stoped: {
//           on: {
//             RESUME: { actions: 'RESUME', target: 'active' },
//           },
//         },
//       },
//     }).withConfig({
//       actions: {
//         INC: dispatchToStore(store),
//         DEC: dispatchToStore(store),
//         STOP: dispatchToStore(store),
//         RESUME: dispatchToStore(store),
//       },
//     });
//     this.counterService = interpret(this.counterMachine, { devTools: true });
//     inspect({
//       // options
//       // url: 'https://stately.ai/viz?inspect', // (default)
//       iframe: false, // open in new window
//     });
//     this.counterService.start();
//   }
// }
