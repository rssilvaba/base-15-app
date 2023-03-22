import { assign, createMachine, MachineConfig, raise, send, sendParent, sendTo } from 'xstate';
import { escalate } from 'xstate/lib/actions';
import { TodosDB } from './model';

//TODO missing the onDone events for the invoked promise
export const query = {
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEUBXMAJwE8CoBiCAe0JIIDcWBrMEtFjyFSlGvXxQEXFpnQAXXGwDaABgC6a9YlAAHFrFyK2OkAA9EARgCs1kgE4AHABYAzADZX1+5dWuA7JaOADQgtIguJABM1qpx7nGuqv5ezgC+aaGCOATE5FR0DIw01CzUJLoANgoAZmWoAhg5IvniDNL43HLG+FpapvqGPaYWCDbuJO7W7lGujt6+AUGh4QgxqiSxceOxzjP2GZkg+CwQcKbZwsQDBkZK+COIALTuK8929p9fsdaOc7YHI6XXKiAoSKA3Ib3R4IZxRN5jKL2TZxVSzGbuGz+fzpIFNK6kADyPEhdxMSHMiCRyKcbnc9Pszkc9msllcCMclhRqNUzkZlkxzlxWXxIJIAFFqKVqKThhTRtSHC4PAymSy2QjLHDuapLDY9U5pq5DmkgA */
  context: {
    items: null,
  },
  states: {
    Querying: {
      invoke: {
        src: 'query',
        onDone: {
          target: 'Ok',
          actions: assign({
            items: (_context, event) => (event as any).data,
          }),
        },
        onError: {
          target: 'Error',
          actions: assign({
            items: (_context, event) => (event as any).data,
          }),
        },
      },
    },
    Ok: {
      type: 'final',
      data: (context: any, event: any) => {
        debugger;
        return context.items;
      },
    },
    Error: {
      entry: escalate({ message: 'We could not fetch the todos' }),
      type: 'final',
    },
  },

  initial: 'Querying',
};

export const formTodoDetailStates = {
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUBEzIIYEsAbAOmzyIGJUA7AYQAtdqYBtABgF1FQAHVWfMnw1uIAB6IA7ACYANCACeiAIwBWABzE26gMw7VATgBsqtnoPTVAXyvy0GMgRKPKNWoX5h2XJCD4ChEV8JBBl5JQQAFlMtXX1pdTZlbVUTGzt0LBwnUmzXOg9YL2UfXn5BYWpRELDFRATVYks2M1VlSOVJSOlI9JB7LPJnPJIANVxCfAhcIWYqanHJ6eQwADEnb1F-CqDQEKN1SOIjSWV1VUiDdUl1c7k6hDVNA2UjIwsrnRPpIz6Bl2GQ2IiymM3wcxoIOWYAA8gBrTa+baBKrBRAHI4nM4XK43O7heqdYgdN4nHSRclmSR-TIA3JAqHzADKuAAbl5OFtyijqogDJdiaodGwMe9JAcjASENIiSS3pJyZSdNTbP1aSN6Tl3OUIXQmABjMCERFlAKVXlRNhHZIGL5sSzkixGSJS6Q3YhxfSSW2JSzXGkODV07UCXXwk1+bnmtGW61sW1Ge1Cy4-F0PHTSAzEPR6C5tcwGEUBwY5OkAJTgqEI7IoGGoYGI4NZqDhDf+QY1FdgVfZCCbqH1YJo3gjyOje0QAFplcQDIZ1EY3RYRQnJQ9pNI2LE9Im3Tn7SrVdR0HBRO2hlyzbtxFOM41VJJxYvlG62KYvlLJ9IdLODH+3skFwmK8OjFnSAKXjsqITggX6PsQD5PjKr7vmuERGD+pgtDo6gbk8OjKKBqrnqWGoAJLUKyExTJBPIxoc0iCsKhiRF0JyqKoUpqFmJKSFa8btAmYEdkCAAKABO+CwLMYC0eON6PAkCFAachGvEKL6umcCFxKkG4Pi+kS9MR6pAnSUJgswcnXiEFyYXxboJJu34ZlxbRaC0SRnHxqSqNIwlmRqULWdBCkMUxb78mxkgcVpkizq8JyHG0G6sURGSBoFQIsqy4JQCFFrJEYyjHD0trijIm7dFx-LEolxUysk1zFQFpFAiGeUFTGmbxTa+gvhoOh-kZrrnMQMWeWcZxLulaqZW1WqFJAXUwX5WZYocySZlc9wRBmW6DThTp7jKrVEJq51dj2slIlGNlThuWaIW8yE+WYaEqHO26KvyBEUo+Ng2EAA */
  id: 'todoDetail',
  context: {
    item: null,
  },
  states: {
    // Resolve: {
    //   oke: {
    //       src: 'queryTodo',
    //       onDone: {
    //         actions: assign({
    //           item: (context, event) => {
    //             debugger
    //             return (event as any)?.['data'];
    //           },
    //         }),
    //       },
    //     },
    // },
    Detail: {
      // invoke: {
      //   src: 'queryTodo',
      //   onDone: {
      //     actions: assign({
      //       item: (context, event) => {
      //         debugger
      //         return (event as any)?.['data'];
      //       },
      //     }),
      //   },
      // },
      states: {
        Invalid: {},
        Pristine: {},

        Validating: {
          on: {
            onValidateFail: 'Invalid',
            onValidateOk: 'Valid',
          },
          description: `Query`,
        },

        Valid: {
          on: {
            onSave: 'Saving',
          },
        },

        Saving: {
          description: `Query`,
          type: 'final',
        },

        Closing: {
          on: {
            onCancel: 'Validating',
            onOk: 'Closed',
          },
        },

        Closed: {
          type: 'final',
          entry: 'Close',
        },

        Resolve: {
          invoke: {
            src: 'resolve',
            // onDone: 'Pristine',
            onDone: {
              target: 'Pristine',
              actions: assign({
                item: (context, event) => {
                  debugger;
                  return (event as any)?.['data'];
                },
              }),
            },
            // },
          },
        },
      },
      initial: 'Resolve',
      on: {
        onChange: '.Validating',
        onClose: [
          {
            target: '.Closed',
            cond: 'pristine',
          },
          '.Closing',
        ],
      },
      // entry: 'checkItem',
      // (c: any, e: any, d: any) => {
      //   debugger
      //   return '';
      // },
    },
  },
  initial: 'Detail',
};

export const todoRootStates = {
  id: 'Todo',
  initial: 'RootContainer',
  states: {
    RootContainer: {
      states: {
        Root: {
          initial: 'QueryTodo',
          states: {
            QueryTodo: {
              invoke: {
                src: 'query',
                onDone: [
                  {
                    target: 'Empty',
                    cond: 'isEmpty',
                    actions: assign({
                      items: (context, event) => {
                        return (event as any)?.['data'];
                      },
                    }),
                  },
                  {
                    target: 'TodoList',
                    actions: assign({
                      items: (context, event) => {
                        return (event as any)?.['data'];
                      },
                    }),
                  },
                ],
                onError: [
                  {
                    target: '#Todo.Error',
                  },
                ],
              },
            },
            Empty: {},
            TodoList: {
              invoke: {
                src: 'list',
              },
              on: {
                onTodoDetail: {
                  target: 'TodoDetail',
                  actions: ['toRouterTodoDetail'],
                },
                onTodoDelete: {
                  target: 'QueryTodo',
                },
              },
            },
            TodoDetail: {
              invoke: {
                src: 'form',
                data: {
                  item: (context: any, event: any) => {
                    debugger;
                    return event.item;
                  },
                },
              },
              on: {
                onClose: {
                  target: '#Todo.RootContainer.Root',
                },
              },
            },
          },
          on: {
            onTodoNew: {
              target: '.TodoDetail',
            },
          },
        },
        Router: {
          invoke: {
            src: 'router',
            onDone: [
              {
                target: '#Todo.RootContainer.Root.TodoDetail',
                cond: 'isTodoNewRoute',
              },
              {
                target: '#Todo.RootContainer.Root.TodoDetail',
                cond: 'isTodoDetailRoute',
              },
              {
                target: 'Root',
              },
            ],
            onError: [
              {
                target: '#Todo.Error',
              },
            ],
          },
        },
      },
      type: 'parallel',
    },
    Error: {
      on: {
        onOk: {
          target: '#Todo.RootContainer.Root',
        },
      },
    },
  },
  schema: {
    context: {
      items: null,
    } as object,
    events: {} as
      | { type: 'onTodoNew' }
      | { type: 'onClose' }
      | { type: 'onTodoDetail' }
      | { type: 'onOk' }
      | { type: 'onTodoDelete' },
  },
  context: {},
  predictableActionArguments: true,
  preserveActionOrder: true,
};

// export const listStates = {
//   /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUDoAyBLWALpgIoCuYATgJ5oYDElFqFmADgDYCGBAZswLaZaWPIRLlqwhLgB2AN1QBjbrlQyA2gAYAulu2JQrVLFwFVMgyAAeiALQBGAOyPMjgMyaAnPYBMADjd7ABYANkd7ABoQKkQ-L0xQ-3sAVh83ZLc3PxCAXxyo4Rx8IjJKGnRUOgwZMExZBQBrWsLREolyjGl5JRU1PXV7fSQQIxMzNUsbBHsQzUwfTSDPEJmfMKc3KJiEZPt7TGXHTR9HZOSjjx88goqisWFWujUAMVx2AkoAYQALThkYPSWUamcyTRBBY6Yex+U6aZIhHxBeyeE5BLaIHwpA4heEnbJpTyhPzXEAtYriMrCKpqWr1VBNIS3VoUyQVLoKZTjDQ6QHDYFcsHTJZQoKIjKeTzuHx49EINxBFxHJZ+ezywIeRZ5fIgGToOCWYRA4wgibDKa2aXJVwebz+QKhcKypwJHEhLKaYJhI5rEmFACiFCYFCNY1BZvBPkwCL2nj8PglKThnllzjcrmOATjQQ8syu2rJhBDJos4emHpFYrcEqlMuiiHsi2x8IhRzOMPsvqZ5NKrIwRYFpYWfgOKT8KIRfmSmjHTpRLvhmR8yVtXmSnYwdyIfv4rAI20MxoHoCmQXhmEXY-8MMldtlbhCw88gVSq6WoSC65E5IexX7YePiDnFamiBGk2RTk+-iyhBUZPgicKOKE05uFqORAA */
//   context: { todos: null },

//   states: {
//     Error: {
//       description: `Error`,
//       type: 'final',
//     },

//     List: {
//       states: {
//         TodoList: {
//           invoke: {
//             src: 'ListMachine',
//           },
//           on: {
//             onFilterChange: {
//               target: 'QueryTodo',
//             },
//           },
//         },

//         QueryTodo: {
//           invoke: {
//             src: 'QueryTodosMachine',
//             onError: '#Todo.Error',

//             onDone: [
//               {
//                 target: 'Empty',
//                 cond: 'isTodosEmpty',
//                 actions: assign({
//                   todos: (context, event:any) => {
//                     // event is:
//                     // { type: 'done.invoke.secret', data: { secret: '42' } };
//                     return event.data.items;
//                   },
//                 }),
//               },
//               {
//                 target: '#Todo.List.TodoList',
//                 actions: assign({
//                   todos: (context, event:any) => {
//                     // event is:
//                     // { type: 'done.invoke.secret', data: { secret: '42' } }
//                     return event.data.items;
//                   },
//                 }),
//               },
//             ],
//           },
//         },

//         Empty: {},
//       },

//       initial: 'QueryTodo',
//     },
//   },

//   id: 'Todo',
//   initial: 'List',
// };

// export const formTodoDetailStates = {
//   states: {
//     Detail: {
//       states: {
//         Invalid: {},
//         Pristine: {},
//         Validating: {
//           on: {
//             onValidateFail: 'Invalid',
//             onValidateOk: 'Valid',
//           },
//           description: `Query`,
//         },
//         Valid: {
//           on: {
//             onSave: 'Saving',
//           },
//         },
//         Saving: {
//           description: `Query`,
//           type: 'final',
//         },
//         Closing: {
//           on: {
//             onCancel: 'Validating',
//             onOk: 'Closed',
//           },
//         },
//         Closed: {
//           type: 'final',
//           entry: 'Close',
//         },
//       },
//       initial: 'Pristine',
//       on: {
//         onChange: '.Validating',
//         onClose: [
//           {
//             target: '.Closed',
//             cond: 'pristine',
//           },
//           '.Closing',
//         ],
//       },
//     },
//   },
//   initial: 'Detail',
// } as const;

// export const Router_ =
//   /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEUBXMAJwE8CoBiAeQGsBtABgF1FQAHAPaxcAF1yD8fEAA9EAJgAsnEpwAcigMwBGAOzK9+tWoA0IWogC0ukovnyAbAE41T-Q85PNugKwBfPzM0LDxCUkoaenwmADF0XAAbLl4kECERcUlpOQRLexInB3kfXU5tJ047QuMzC1ybO0cXN0UPL18AwJB8QQg4aWCcAmJpdLEJKVScyzV5AtLvH04HbU5NH20HWqttEtt7Z1d3T001AKCMIbDyKjoGUeFxrKnEVc0SXTV9OwNdI1NzFZnAUDs1jl4zl1BqFiCQ2A8MhNsgp5O8fBodPoyn9FE5tggfA5VH9NGVOMVNBUiv4oZcYaQAKLUaiCagIp6TUDTTSKeZrXzLN4bQn4wnE3Sk1YUqnFTp+IA */
//   createMachine({
//     context: {
//       route: null,
//     },
//     states: {
//       Querying: {
//         on: {
//           Ok: 'Ok',
//           Fail: 'Error',
//         },
//       },

//       Ok: {
//         type: 'final',
//         data: (context, event) => ({
//           route: window.location.pathname,
//         }),
//       },
//       Error: {
//         entry: escalate({ message: 'We could not fetch the todos' }),
//         type: 'final',
//       },
//     },

//     initial: 'Querying',
//   });

// export const QueryTodosMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEUBXMAJwE8CoBiAeQGsBtABgF1FQAHAPaxcAF1yD8fEAA9EAJgAsnEpwAcigMwBGAOzK9+tWoA0IWogC0ukovnyAbAE41T-Q85PNugKwBfPzM0LDxCUkoaenwmADF0XAAbLl4kECERcUlpOQRLexInB3kfXU5tJ047QuMzC1ybO0cXN0UPL18AwJB8QQg4aWCcAmJpdLEJKVScyzV5AtLvH04HbU5NH20HWqttEtt7Z1d3T001AKCMIbDyKjoGUeFxrKnEVc0SXTV9OwNdI1NzFZnAUDs1jl4zl1BqFiCQ2A8MhNsgp5O8fBodPoyn9FE5tggfA5VH9NGVOMVNBUiv4oZcYaQAKLUaiCagIp6TUDTTSKeZrXzLN4bQn4wnE3Sk1YUqnFTp+IA */
//   createMachine({
//     context: {
//       items: null,
//     },
//     states: {
//       Querying: {
//         on: {
//           Ok: 'Ok',
//           Fail: 'Error',
//         },
//       },

//       Ok: {
//         type: 'final',
//         data: (context, event) => ({
//           items: [],
//         }),
//       },
//       Error: {
//         entry: escalate({ message: 'We could not fetch the todos' }),
//         type: 'final',
//       },
//     },

//     initial: 'Querying',
//   });

// /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUDoCiAnXquAxKgHYDyA0gNoAMAuoqAA6qwCWALu2UyAB6IA7AE5amWgBYpADgCMMgMy05I1QBoQAT0QBaAEyL9mAGwz9ko-pEBWExZsyAvk81oMmAAoBDXJneoAILMzESkYADuAXSMSCCsHNy8cYIIujY2mHK0IiZSJkL2RkqSmjoIJoqY5rQWkvrZcnImNkIubuhYPn4BwcyYAMpgADZgAMachCSkQ6MThAByZGAxfAlcPKR8qZJC4vo2ijJC0hl5RmV6iiZy1TZyijaSMo6KliKS7SABXr7+nX1BiNxpNiGRZiDCAAxbzsYarOLrJJbFJ6Zr7SQia5GaQmZ5mS4IRQnUyWRy0EwffQU5yub6dX49AEhTAARQArmBcFoAkQMOFMOxSAA3VAAazA-w83SlQRZHK5PM6CCForG3mRMQRLDYG2SoFS12qQiE2VykmyR0shN0zREmH0MiU5nkYiauS+PxlvXlnO5vP5ktV4slXr+Pv6Cv9yuD6s1DGocliOsSm22iF2mCxuRyeMtMmt2j0z1MindYheclNFM9DO9zMjfqVGCIXIIfmYww1ADNCABbWWM2WAqPN1AqkWoOObLUMNa65HphCWGSYa4ifSiE5m0SEt4mLJkmQUqk02vS8MN2UAGXYsE40wCABEwJxYfC54iF2nUcvDJhHCxTdFBEUDzBsQkXgAuQGnNUDdnqT46TDJkMEBAJb3vaYoThTguQAYQAC28UgYG1eJv31AREAsYxaKdIQjEcbJ9H0G0GluRQ3jLUR6lUMskI6C9ULlfpn1fd9pnw4Y2BWT8Uz1FEDUQPJjFyVRnREeQLDkG1JFaACbFAzdK3eE5zy6P4ACVUHZPDiEDQVJwlQcZRsuyuQnNUNRnBN5Io1MqNSJ1VyOAs3kKR4WjYos0ieIRTDUPjiSkMKLKHdz7NbfBCEwTse37VzrNs+yvKnHyyFnZMAsUpdbHtVTVGaaxbBaPdDmqLFWisSQTDxGQTBcOlSHQOA+ACedAqU6i0mpVcLCxSoLApfEZBtIQnQkIQ5sedSzXSvB20m2rfyUKprHMRjlCaFoTBtSpMEYg45AyI59xNGx0u6Y7F1-W17iyXN8kKQxHUUdbaHEVpqUKeQCydEQvsvNCQh+n9lLSS1AZzXqQeKcHYt0PJxFoVpnjLIwXtpITLJEwEIXmXA0aCmjaASx1aC4gbWPMFoIMJ+5jAyE4NyMSklEG5C62R0S2SbCavympcGgPVpGlB5jahi8pdGxLMbFqDclBeoy2il4ThxZDC704ZnpsNAy1CUbcBoeIy7sJqCcjsJpslaF5QKRumrc6F83zhO2l0sSRSSi0z9IEwlmiqGxHWkEy+sKewg8t-psD7ZhOHKBTfoxx4Y4yF7aBkEQPtyG0qdJU0LW43Inn0HPMq5SPfxgwpAZrh48WrtbCZuKo2bmvIHgEyWXCAA */
// export const todoMachine = createMachine(
//   {
//     context: { todos: null },

//     states: {
//       Error: {
//         description: `Error`,

//         on: {
//           onOK: 'Par.TodoApp',
//         },
//       },

//       Par: {
//         states: {
//           TodoApp: {
//             initial: 'Selector',

//             states: {
//               Selector: {
//                 on: {
//                   onSelectorNone: {
//                     target: 'QueryTodo',
//                   },

//                   onSelectorFail: '#Todo.Error',
//                 },

//                 description: `Selector`,
//               },
//               QueryTodo: {
//                 invoke: {
//                   src: QueryTodosMachine,
//                   //"TodoList",onDone:
//                   onDone: [
//                     {
//                       target: 'Empty',
//                       cond: 'isTodosEmpty',
//                       actions: assign({
//                         todos: (context, event) => {
//                           // event is:
//                           // { type: 'done.invoke.secret', data: { secret: '42' } }
//                           debugger;
//                           return event.data.items;
//                         },
//                       }),
//                     },
//                     {
//                       target: 'TodoList',
//                       actions: assign({
//                         todos: (context, event) => {
//                           // event is:
//                           // { type: 'done.invoke.secret', data: { secret: '42' } }
//                           debugger;
//                           return event.data.items;
//                         },
//                       }),
//                     },
//                   ],
//                   onError: '#Todo.Error',
//                 },
//               },
//               TodoList: {
//                 on: {
//                   onTodoDetail: {
//                     target: 'TodoDetail',
//                   },
//                   onFilterChange: {
//                     target: 'QueryTodo',
//                   },
//                 },
//                 invoke: {
//                   src: 'ListMachine',
//                 },
//               },
//               TodoDetail: {
//                 description: 'Form',
//                 on: {
//                   onClose: '#Todo.Par.TodoApp',
//                 },
//               },
//               Empty: {},
//             },

//             on: {
//               newTodo: '.TodoDetail',
//             },
//           },

//           Router: {
//             invoke: {
//               src: Router_,
//               onError: '#Todo.Error',
//               onDone: 'TodoApp.Selector',
//             },
//           },
//         },

//         type: 'parallel',
//       },
//     },

//     id: 'Todo',
//     initial: 'Par',
//   },
//   {
//     guards: {
//       isTodosEmpty: (context, event) => {
//         debugger;
//         return event['data'].items.length === 0;
//       },
//       isNewOrEdit: (context, event) => {
//         debugger;
//         return event['data'].route === '/new' || event['data'].route === '/edit';
//       },
//     },
//     actions: {
//       router: (context, event) => {
//         // debugger
//         // console.log('activating...');
//         if (window.location.pathname === '/new') {
//           // sendTo('#Todo.TodoApp',{
//           //     type: 'newTodo',
//           //   },
//           // );
//           raise({
//             type: 'newTodo',
//           });
//           // sendParent({type:'newTodo'});
//         }
//       },
//     },
//   }
//   // { services: { QueryTodosMachine } }
// );

// export const formTodoDetailMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBEwAXdXAGwGIB7fAYW3XxgG0AGAXUSgADo1i5KuZoJAAPRABYAjAFYSADgBMygJzyAbNp57lAdm0BmPQBoQAT0SKeiktrV6TPbcrXbFGnhomAL5BNmhYeISkFNR0JABq6LS4EOgSnEz4icmplGAAYjS0vAJIICJiElJlcgjyASTmimqK8v7mOibm2jb2CBotJCbKPKMmehoWusrmIWEYOATE5FRFCUkpaQRQmdmbeQDyANYl0hXikvjStcoTJBr1o4omL83yar2I5mo895Ymzw0zWUrRM8jmIHCiyiK1itHWOUyAGV0AA3MCnMrnKpXGoKZ4kYz1AGGYxmSyfOryExDf6eby+fwaCFQyLLGJFTIsWiiDH8M6iC7VUC1YbOAbKAbyJoWPRqcyUoF6EgBeS+PR6RTfcyWZmhSELNnRVZxbmCjIAUXR+EoAAJFJjhIKcddEMMNCqweZ9DM1Mp6gq7F9fI01F1tBGlHolMoQvr8IwIHBpKylkQBZVLq6ECo1PdlJSALRdFVayb+wHRyYsw1p2FFDNC3EixD+ZVaSmtEjvdw8DrmYYVmsROscuIASXwqI2EEbLrx-X9+cVg2Gw+h7JN8IACgAnXCwdJgOdZhdaeTLoM5tRqddG+txPa5bYn4WyfF5zQ6d4tboDTsAkMsb6qmMJjvCT6vs2751BoHpEjwJJGKYsqUt8vwaHSXg+H4AR3qOW4kCiqIvlizqni2dSKNo3aKM0mhqtomGIZS-oYVhDK4bMIG1mBhFmmInBQdmwy-KY0oxoYTitGhAzqGGA6TBM0bvPhfFwiQhAAO62oeaRgPawkLmCvwWG4aqtNoLzSpS1LOCCpgDH23wTIoambhp2m6dQeS2hoRmUT4NL+FZih6B0DzyDZV4+o0rRqpKPDyjoHRxkEQA */
//   createMachine(
//     {
//       /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBEwAXdXAGwGIB7fAYW3XxgG0AGAXUSgADo1i5KuZoJAAPRABYAjAFYSADgBMygJzyAbNp57lAdm0BmPQBoQAT0SKeiktrV6TPbcrXbFGnhomAL5BNmhYeISkFNR0TKy0omC8AkggImISUmlyCB48JPLmyoomJcoB8srWdogaas5lIWEYOATE5FQ0DMwsibDJiqnCouKS+NK52nrOM9r+yuZ+PJpqNvYI9Y3y2q5qHvIm5uZqzSDhbVGdsbQkAGrotLgQ6BKc8Q9PL5RgAGLdKWkGTG2VAuXkARISwa8n8xW0R206zqDRIZR4GJMeg0Fl0izOF0iHRi3Xuj2erwIUA+5O+YAA8gBrQFpYFZCY5RDKUwkDQQjGlEwmRRqeRrWqbVFNULnVpE6JdOhkr7xADK6AAbsl+EDRuzJgpSiRjBDhYZjGZLMiEPJDmjLB4vD5lhoCXL2gqbiQ+qN3r0OJgwLQWSNMuMDQhFIpLPaTP4qhCqmpxRtBWiKhiAtHPDwTPI3REPddST6xH78EyQ+k9eHOZGAnoocpbUU1MVTdaxc5bXnzLmhRjNHoQjL8IwIHBpISPbqw6DZA5vLzlNaALRHEhOcw45NmLQlAuXYmK2izkEcsF1IzL62KeSFNwGFTmCwebyumXTq4kpUASXwGq0me+p1lo95aNaWzpoe8rFkqAAKABOuCwG8YDAbWl6bM2N4SiKpyfu634nsqFJvFAGHzuCIrqFoujJtG8wpg4wrQYRhbEV6nzPJRF4LjaGgaMaza5oo5qmBYNQbCcBQaA6njeL4-gfi0HHHl66oalSvERko2iFFGyZ8rscm5taIm8vJTpKTw5gwUWP63KW2msjWVEOAEQmuHGPAJr53jMQgljONG5gmG2xjKHRKmympnolv0kA6XWZSqJoih6LmFieGonidrlJBiXmiyuF4ejDiOQA */
//       states: {
//         Detail: {
//           states: {
//             Invalid: {},
//             Pristine: {},
//             Validating: {
//               on: {
//                 onValidateFail: 'Invalid',
//                 onValidateOk: 'Valid',
//               },
//               description: `Query`,
//             },
//             Valid: {
//               on: {
//                 onSave: 'Saving',
//               },
//             },
//             Saving: {
//               description: `Query`,
//               type: 'final',
//             },
//             Closing: {
//               on: {
//                 onCancel: 'Validating',
//                 onOk: 'Closed',
//               },
//             },
//             Closed: {
//               type: 'final',
//             },
//           },
//           initial: 'Pristine',
//           on: {
//             onChange: '.Validating',
//             onClose: [
//               {
//                 target: '.Closed',
//                 cond: 'pristine',
//               },
//               '.Closing',
//             ],
//           },
//         },
//       },
//       initial: 'Detail',
//     },
//     {
//       guards: {
//         pristine: (context, event, machine) => {
//           return machine.state.matches('Detail.Pristine');
//         },
//       },
//     }
//   );

// export const controlMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgGMsMAXAJywBt8QAHLWASxMeJoA9EBaARgDYALOgCe3HgFYeyaciA */
//   createMachine({
//     id: 'control',
//   });

// export const ListMachine =
//   /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgGUwAbMTAFwHsAnAYnvwurqYHkBrAbQAMAXUSgADvVi5auNmJAAPRACYAjGoA0IAJ6q1AXwPa0WPIVIcaDFmytdGffmtFIQk6bPlvlCFYIB2EgAOFWC1FQBWbT0EYMiSAMijEwwcAmJyKmsmVnZshwAxdFxKIVcJKRk5fAVfAFoNABYYxDUmgDZE5JSQfHoIOAVTdIsFD2rvUAa1DpVWhEaVAGZekfNM+xtxqq9an0QA5YX65YSe1LMM0gAJdFgASVowVHg3Cb26w7USZbCI6K6fRrNIbUgAOXoTxeb0qnhqXwQRwW8W6IKuFhIAFFGIwmDt4VMlIdjkCEO0ukkjEYgA */
//   createMachine({
//     context: {
//       // eslint-disable-next-line no-undefined
//       items: undefined as undefined | [],
//     },
//     states: {
//       Selector: {
//         on: {
//           onSelectorOk: [
//             {
//               /*
//               States that depends on context data should only transition with guarded transitions???

//               In this case here we assume that the context data is valid but it can be empty.
//               */
//               target: 'HasItems',
//               cond: 'hasItems',
//             },
//             'NoItems',
//           ],

//           onSelectorFail: 'Error',
//         },
//       },
//       HasItems: {},
//       NoItems: {},
//       Error: {
//         type: 'final',
//       },
//     },
//     initial: 'Selector',
//   });

// const secretMachine = createMachine({
//   id: 'secret',
//   initial: 'wait',
//   context: {
//     secret: '42',
//   },
//   states: {
//     wait: {
//       after: {
//         1000: { target: 'reveal' },
//       },
//     },
//     reveal: {
//       type: 'final',
//       data: (context, event) => ({
//         secret: context.secret,
//       }),
//     },
//   },
// });

// export const parentMachine = createMachine({
//   id: 'parent',
//   initial: 'pending',
//   context: {
//     revealedSecret: undefined,
//   },
//   states: {
//     pending: {
//       invoke: {
//         id: 'secret',
//         src: secretMachine,
//         onDone: {
//           target: 'success',
//           actions: assign({
//             revealedSecret: (context, event) => {
//               // event is:
//               // { type: 'done.invoke.secret', data: { secret: '42' } }
//               debugger;
//               return event.data.secret;
//             },
//           }),
//         },
//       },
//     },
//     success: {
//       type: 'final',
//     },
//   },
// });

// // const service = interpret(parentMachine)
// //   .onTransition((state) => console.log(state.context))
// //   .start();
// // => { revealedSecret: undefined }
// // ...
// // => { revealedSecret: '42' }

// export const routerMachine = createMachine({});
