import { assign, createMachine, raise, send, sendParent, sendTo } from 'xstate';
import { escalate } from 'xstate/lib/actions';

export const Router =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEUBXMAJwE8CoBiAeQGsBtABgF1FQAHAPaxcAF1yD8fEAA9EAJgAsnEpwAcigMwBGAOzK9+tWoA0IWogC0ukovnyAbAE41T-Q85PNugKwBfPzM0LDxCUkoaenwmADF0XAAbLl4kECERcUlpOQRLexInB3kfXU5tJ047QuMzC1ybO0cXN0UPL18AwJB8QQg4aWCcAmJpdLEJKVScyzV5AtLvH04HbU5NH20HWqttEtt7Z1d3T001AKCMIbDyKjoGUeFxrKnEVc0SXTV9OwNdI1NzFZnAUDs1jl4zl1BqFiCQ2A8MhNsgp5O8fBodPoyn9FE5tggfA5VH9NGVOMVNBUiv4oZcYaQAKLUaiCagIp6TUDTTSKeZrXzLN4bQn4wnE3Sk1YUqnFTp+IA */
  createMachine({
    context: {
      route: null,
    },
    states: {
      Querying: {
        on: {
          Ok: 'Ok',
          Fail: 'Error',
        },
      },

      Ok: {
        type: 'final',
        data: (context, event) => ({
          route: window.location.pathname,
        }),
      },
      Error: {
        entry: escalate({ message: 'We could not fetch the todos' }),
        type: 'final',
      },
    },

    initial: 'Querying',
  });

export const QueryTodosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEUBXMAJwE8CoBiAeQGsBtABgF1FQAHAPaxcAF1yD8fEAA9EAJgAsnEpwAcigMwBGAOzK9+tWoA0IWogC0ukovnyAbAE41T-Q85PNugKwBfPzM0LDxCUkoaenwmADF0XAAbLl4kECERcUlpOQRLexInB3kfXU5tJ047QuMzC1ybO0cXN0UPL18AwJB8QQg4aWCcAmJpdLEJKVScyzV5AtLvH04HbU5NH20HWqttEtt7Z1d3T001AKCMIbDyKjoGUeFxrKnEVc0SXTV9OwNdI1NzFZnAUDs1jl4zl1BqFiCQ2A8MhNsgp5O8fBodPoyn9FE5tggfA5VH9NGVOMVNBUiv4oZcYaQAKLUaiCagIp6TUDTTSKeZrXzLN4bQn4wnE3Sk1YUqnFTp+IA */
  createMachine({
    context: {
      items: null,
    },
    states: {
      Querying: {
        on: {
          Ok: 'Ok',
          Fail: 'Error',
        },
      },

      Ok: {
        type: 'final',
        data: (context, event) => ({
          items: [],
        }),
      },
      Error: {
        entry: escalate({ message: 'We could not fetch the todos' }),
        type: 'final',
      },
    },

    initial: 'Querying',
  });

/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUDoCiAnXquAxKgHYDyA0gNoAMAuoqAA6qwCWALu2UyAB6IA7AE5amWgBYpADgCMMgMy05I1QBoQAT0QBaAEyL9mAGwz9ko-pEBWExZsyAvk81oMmAAoBDXJneoAILMzESkYADuAXSMSCCsHNy8cYIIugoSJiIytCJCNpY2QkqSmjoI9pgykjY2cvpCJpI50kIubuhYPn4BwcyYAMpgADZgAMachCSkQ6MThAByZGAxfAlcPKR8qZJC4vo2ijJC0rUmtEZleoomclV1igUyjoqWIpLtIAFevv6dfYMRuNJsQyLNgYQAGLedjDVZxdZJLYpPRyc6YCwiG5GaRNGRmK4IRQnUyFHJZST6WhmT7fbp-DAAgCKAFcwLgtAEiBhwph2KQAG6oADWYAZXV+vRCmFZ7M5nQQ-KFY28SJi8JYbA2yVAqXR9iEclyTSNR0shPSe0whyU5nkYjkqhMtM6Px6-2lso5XJ5YqVIrFdMlHv6XvlGEVgtQKrVDGoclimsSm22iDM1sNKkMB3ktAaFskkiq8lUYmeckzztcX1d9KlobZ3s6RHZBD8zGGqoAZoQALbit3i5mN8OoSPK1WbdUMNZapGphCWISYR0iBp5SRGvIiQnEkwrsnU95UmnVoPuxnSgIAGXYsE40wCABEwJwYXCZwi5ymUYvDNaZCxBpFBEUDzBsQlnmteonUkUDdkpD4z1rYNL36G87wfMhIVhTh2QAYQAC28UgYA1eJvx1AREAsYxaJkY4jEcI19H0C19EdTBFFeRQK2PVReKQjoPDrENxRfN9YWmfDhjYFZPyTbVkV1NM80wERbmyI5snqTcCyKa0bFAhpyzeE4XRE34ACVUBZPDiFbQhMA7bs+wHekbLs9lx2jScyGnRMKOTKjUlsERTDzVQ0WsWwTAg7REEeRQqixIorEkEw8SrYSJT8Tz7O5ZY+SjUV3Os2z7J8mMpzjBSgqUhcGJkLiGMsXYTEeOK2IStICmXLI5EpORiSkI5nE+Uh0DgPgAlnYLlOotIqWazFsQsalmgJHrdGKZraCEZbaBsTEpDkCysDwNs5oa38lGS6xzCEbiVDROwLQ6zAnoOORaiOV4TCEfJzrda751-dJBsybJcnyQpikUC09nEIpluGx00eymtLIvIIQlBn8VLSTKoZyPICkeeH3ouCQijgn7WjsM7kOxodpXBeZcHxkKaP2jEcm4-FWPMOL4vKXQ6hsQyTjXIwsiUTHz1Zhs5Vmr95oXDj9yKI16iY3NWItbF1JsPM1yUH6jLaZncqV8Vb3vLmFtSCn1IUYlN3xYajJMC0oNyRnHSO4ojJEYHRLQ8TX3fR2Fza0lOtMmpBMJNFkuO6o82KTLGnsMPUNx-psF7ZhOHKRSwcJx4i1qH7aEAwHvYtH7mqaQ1Nx4jSCn0PO8oq9kY9-epGhXOu1BuaQGPe4aJAOuvzmGwSqxcIA */
export const todoMachine = createMachine(
  {
    context: { todos: null },

    states: {
      Error: {
        description: `Error`,

        on: {
          onOK: "Par.TodoApp",
        }
      },

      Par: {
        states: {
          TodoApp: {
            initial: 'Selector',

            states: {
              Selector: {
                on: {
                  onSelectorNone: {
                    target: 'QueryTodo',
                  },

                  onSelectorFail: '#Todo.Error'
                },

                description: `Selector`,
                entry: 'router',
              },
              QueryTodo: {
                invoke: {
                  src: QueryTodosMachine,
                  //"TodoList",onDone:
                  onDone: [
                    {
                      target: 'Empty',
                      cond: 'isTodosEmpty',
                      actions: assign({
                        todos: (context, event) => {
                          // event is:
                          // { type: 'done.invoke.secret', data: { secret: '42' } }
                          debugger;
                          return event.data.items;
                        },
                      }),
                    },
                    {
                      target: 'TodoList',
                      actions: assign({
                        todos: (context, event) => {
                          // event is:
                          // { type: 'done.invoke.secret', data: { secret: '42' } }
                          debugger;
                          return event.data.items;
                        },
                      }),
                    },
                  ],
                  onError: '#Todo.Error',
                },
              },
              TodoList: {
                on: {
                  onTodoDetail: {
                    target: 'TodoDetail',
                  },
                  onFilterChange: {
                    target: 'QueryTodo',
                  },
                },
                invoke: {
                  src: 'ListMachine',
                },
              },
              TodoDetail: {
                description: 'Form',
                on: {
                  onClose: "#Todo.Par.TodoApp",
                },
              },
              Empty: {},
            },

            on: {
              newTodo: ".TodoDetail"
            }
          },

          Router: {
            invoke: {
              src: Router,
              onError: "#Todo.Error",
              onDone: "TodoApp.Selector"
            }
          }
        },

        type: "parallel"
      }
    },

    id: 'Todo',
    initial: "Par",
  },
  {
    guards: {
      isTodosEmpty: (context, event) => {
        debugger;
        return event['data'].items.length === 0;
      },
      isNewOrEdit: (context, event) => {
        debugger;
        return event['data'].route === '/new' || event['data'].route === '/edit'
      },
    },
    actions: {
      router: (context, event) => {
        // debugger
        // console.log('activating...');
        if (window.location.pathname === '/new') {
          // sendTo('#Todo.TodoApp',{
          //     type: 'newTodo',
          //   },
          // );
          raise({
            type: 'newTodo',
          })
          // sendParent({type:'newTodo'});
        }
      },
    },
  }
  // { services: { QueryTodosMachine } }
);

export const formMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBEwAXdXAGwGIB7fAYW3XxgG0AGAXUSgADo1i5KuZoJAAPRABYAjAFYSADgBMygJzyAbNp57lAdm0BmPQBoQAT0SKeiktrV6TPbcrXbFGnhomAL5BNmhYeISkFNR0JABq6LS4EOgSnEz4icmplGAAYjS0vAJIICJiElJlcgjyASTmimqK8v7mOibm2jb2CBotJCbKPKMmehoWusrmIWEYOATE5FRFCUkpaQRQmdmbeQDyANYl0hXikvjStcoTJBr1o4omL83yar2I5mo895Ymzw0zWUrRM8jmIHCiyiK1itHWOUyAGV0AA3MCnMrnKpXGoKZ4kYz1AGGYxmSyfOryExDf6eby+fwaEKhED4RgQODSKGRYhnUQXaqgWoqNT3ZSUgC0AJITnMk3lJICejUEJ5S2iqzo-Mql2uiH8enFlJUJHe7h4pjBbXMTzVC15mrhJAAkvhURsIDrBbjhQblPJjXYDYNhvaIhrYWsAAoAJ1wsHSYG9OP1-QDQb6zVVrPVMJiaz2uW2Kb1eLqzXUWl0aha3QGJplYdzDsjBbiRdLQtkCg0GkJAZ4SrJFmswYQ31+GjpXh8fgC4ehy3b8JRqJLWIFqfLSm0ZsU2Ye2m006HlMHfwts8ZPFmLKAA */
  createMachine({
    states: {
      Detail: {
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
        },
        initial: 'Pristine',
        on: {
          onChange: '.Validating',
        },
      },
    },
    initial: 'Detail',
  });

export const controlMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgGMsMAXAJywBt8QAHLWASxMeJoA9EBaARgDYALOgCe3HgFYeyaciA */
  createMachine({
    id: 'control',
  });

export const ListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgGUwAbMTAFwHsAnAYnvwurqYHkBrAbQAMAXUSgADvVi5auNmJAAPRACYAjGoA0IAJ6q1AXwPa0WPIVIcaDFmytdGffmtFIQk6bPlvlCFYIB2EgAOFWC1FQBWbT0EYMiSAMijEwwcAmJyKmsmVnZshwAxdFxKIVcJKRk5fAVfAFoNABYYxDUmgDZE5JSQfHoIOAVTdIsFD2rvUAa1DpVWhEaVAGZekfNM+xtxqq9an0QA5YX65YSe1LMM0gAJdFgASVowVHg3Cb26w7USZbCI6K6fRrNIbUgAOXoTxeb0qnhqXwQRwW8W6IKuFhIAFFGIwmDt4VMlIdjkCEO0ukkjEYgA */
  createMachine({
    context: {
      // eslint-disable-next-line no-undefined
      items: undefined as undefined | [],
    },
    states: {
      Selector: {
        on: {
          onSelectorOk: [
            {
              /*
              States that depends on context data should only transition with guarded transitions???
              
              In this case here we assume that the context data is valid but it can be empty.
              */
              target: 'HasItems',
              cond: 'hasItems',
            },
            'NoItems',
          ],

          onSelectorFail: 'Error',
        },
      },
      HasItems: {},
      NoItems: {},
      Error: {
        type: 'final',
      },
    },
    initial: 'Selector',
  });

const secretMachine = createMachine({
  id: 'secret',
  initial: 'wait',
  context: {
    secret: '42',
  },
  states: {
    wait: {
      after: {
        1000: { target: 'reveal' },
      },
    },
    reveal: {
      type: 'final',
      data: (context, event) => ({
        secret: context.secret,
      }),
    },
  },
});

export const parentMachine = createMachine({
  id: 'parent',
  initial: 'pending',
  context: {
    revealedSecret: undefined,
  },
  states: {
    pending: {
      invoke: {
        id: 'secret',
        src: secretMachine,
        onDone: {
          target: 'success',
          actions: assign({
            revealedSecret: (context, event) => {
              // event is:
              // { type: 'done.invoke.secret', data: { secret: '42' } }
              debugger;
              return event.data.secret;
            },
          }),
        },
      },
    },
    success: {
      type: 'final',
    },
  },
});

// const service = interpret(parentMachine)
//   .onTransition((state) => console.log(state.context))
//   .start();
// => { revealedSecret: undefined }
// ...
// => { revealedSecret: '42' }
