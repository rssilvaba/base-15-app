import { assign, createMachine } from 'xstate';
import { escalate } from 'xstate/lib/actions';

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

        Closing: {
          on: {
            onCancel: 'Validating',
            onOk: 'Closed',
          },
        },

        Closed: {
          type: 'final',
          // actions: ['Close'],
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
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUDoBKrUBcBhVAO3wEMBLEsAJxz3wGJS0MA5MAdwG0AGALqJQAB1SxK+SqWEgAHogBsAJgCsmRXwCcAFj4B2ZQGZFRgIxmjAGhABPRGb6KtmPnr5HVigBxrlZ5QBfQJs2LFwCYjIqGnoI-EwARQBXOlswpgwaTGoAN1QAazBMMIZI0gpqOjKElLSwhDzUAGNyKVJ+AU7ZMQl2klkFBG9LTH0tZx0A40NFMxt7BC03TFV3ZW8jCdVzRWDQ9HDGKMrYmqTU2nTDzNJipqKSw5qTmOr4i-rDxpJ81v7OjwzEIkCBepJpANQUMRkYxhNdNMjLN5nYlGYXMplnxLKZDMo+N59iBSvFXlU4oxPlcMnRaKh6CIADZtABmDIAtk8MC8Km9KQRqdcMD8-m1IYDBD1xBCZNCHN5FDpMFpkTslTjNvoFg4TMqsXw3PpfIpjT5iaTjnyKecwgAZSiwZisQ4AETAlSZ3VB4P6gwcBMUmB0avM428+jMilUOoQmmVyKMeqM3l8yn0RgtzzJ1rOH3tjudJDC7qZHrA3tEMr98qWOMwakNFmUSq0qZjaIQXm8Y28Wn7iuWqmNqizPJz0Rt+bdHqoTJYJEITPEFalPurkP9CCjKlWqvGWmUemMiljcx7zk2OkVauNRJCJOzVsnedQyXwdFu2QexUt5Rf7xvh+tCii04odIIlZghucqgEMfi9gEax8MYUapqenaqGYPbIYa+jaPo+GpmORz-qcgHvp+WT3L8hS-k+ZH8gwlEgU0-wSpBwLSn0m61i2yiIWox67OhsY6MYqxbP2qipr4OL6HsD5-kQuYUcBX40fkjzKeSr4saB7EQV0ygglWPGwfIiD8YJyGoT4ipiZGrjuDiOiHloqiqEeJG8gBlIsUwdIMpgzJspy3KkSpfnMcBBngSQkqmdB5lQnBCpKiqoYathyKxpYUbwoa4nKCVHhGEESnPAAorQ9K0AuADyBRQb6vFpV2yixiMwb9v2+GGFMWhmKOlXjs+5H+eppC4JRhAABbkCQMAtTBqWWQgAC0OjqOJEz6DoOhzISnidZhZj6M5TbeAdPj6GswQPiQ6BwLIYTcbKa1DBtZhTMGWKmjdjibF5sYbUGhoQ44BLGCVGI+ROE3vTW7Ubaqf17YDx0g525V8K4fa6F4lhYW48PjUx8RI2163Dhdmi6AYJ7mJYYndQahqaBmpjEaNkW6YBgp1DShxUxZQwqOo9N6IYJjM9YnYRkGCmqHhOiEVGHhk4xU5UlVHIiPgixmR9W6OKoLjRiougTAdRGxoeQZDSrblYmbFUHGN2uvoKBZOqLn0OHw5saF4WJuUqauEmeKz7cDEZYaqnla1FE22jOnr+6bejKj9TgmIR4z+Dosbm5LbaeIi-i6JmvO+anM3AZntYRmJBirATRhTJM2GKR7WA1XVTftQSQeYBXh3lfl+3F52+U9gajhB8NSr6A9gRAA */
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
                id: 'formTodoDetail',
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
                  actions: ['Close'],
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
          on: {
            onRouteChange: {
              target: 'Router',
              internal: true,
            },
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
  context: {},
  predictableActionArguments: true,
  preserveActionOrder: true,
};