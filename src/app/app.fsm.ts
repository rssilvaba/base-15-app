import { createMachine } from 'xstate';
import { escalate } from 'xstate/lib/actions';

export const QueryMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEUBXMAJwE8CoBiAeQGsBtABgF1FQAHAPaxcAF1yD8fEAA9EAJgAsnEpwAcigMwBGAOzK9+tWoA0IWogC0ukovnyAbAE41T-Q85PNugKwBfPzM0LDxCUkoaenwmADF0XAAbLl4kECERcUlpOQRLexInB3kfXU5tJ047QuMzC1ybO0cXN0UPL18AwJB8QQg4aWCcAmJpdLEJKVScyzV5AtLvH04HbU5NH20HWqttEtt7Z1d3T001AKCMIbDyKjoGUeFxrKnEVc0SXTV9OwNdI1NzFZnAUDs1jl4zl1BqFiCQ2A8MhNsgp5O8fBodPoyn9FE5tggfA5VH9NGVOMVNBUiv4oZcYaQAKLUaiCagIp6TUDTTSKeZrXzLN4bQn4wnE3Sk1YUqnFTp+IA */
createMachine({
  states: {
    Querying: {
      on: {
        Ok: "Ok",
        Fail: "Error"
      }
    },

    Ok: {
      type: "final"
    },
    Error: {
      entry: escalate({ message: 'This is some error' }),
      type: "final"
    }
  },

  initial: "Querying"
})


/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUGJUDsDCANqrGANoAMAuoqAA7ECWALg7jSAB6IC0AzLwE4AdABZeARgCsIgOy8R4kbIBMAGhABPRL2miAHCIBsh3nsMyxywwF9r6tBkw4wAdweoK1JCHqxmrHHYuBG5xQ2FJZRlI3hkBKTkzdS0EcSkhcT09AUl5ZUFE23t0VCFCRhwobHwiP0qAEVwyKnZffzZvYN5yPSFomT1lcnJlLJEe5MRx3vEZckkBRfJDccVeIpB3IQBlMAIwAGMmVAAnat39o9OAOSbPVsYWDtAupSFTPVyJA3FeZUVJiFuiIhMoBBYRPERPkhnp1nZNiUdntDsczrgLqjTgAxACGDAI928bSegU6PCsylBel+cxkAwGJhkgP+hiE2Uy4gEymkhkkZnhxQwQncABkGLAmNV3PUwEx8YSWsTHgEgtowu8BMtclzJLM9MtATIqYIBGJJNIst0+RstmKJVLcNiCUwwCc8AALXGVZpeOgq56cRDiEbvT7GyHQ4YKNSaHhSYRpWIiC0LSTkeSCxHCgCKAFc3Rp3JgMM4hAwcAA3VAAazAIqR+cL7gQFerB1xpM8RP9flJapCIbZhiixkyA0WCl4gPIYZH0iU5EhfJksxsCK2TZORZKmDdJ1OQloBE7ADNTgBbBu5gvbltt1AdrtUHs+ANkl7q3h9XICD7hEdDAMFl5gycERDMBQRjBelbARHB0Dgdh3AePtVXJIE9BkUQJGkOQFCUY1AW4dNZxkcx+B5XhDF+KRbUbW8dwwVD2g-IMEGyd5jX4Gl-mGflmTjIFQOWbpcgGZQhj+GR6OFco6igFj+ww8QrHZaEsKGcwRgUQwWQEXpyG5ORulU4Z5lk0p5MgJT0M-VJJNEDMaN+cZJHpWRAQI0QtXcowTEheJ1yFUoAFETgPE5bMDYJfmHGiqOhGjDB6QSUk5URZAglYQ0k8DLORS40WitjYqiPoUx6eYrD5CRxGIqdQQov5cho3CCvtSUSoHXKhDNNYsgAqxgKEkjZ2WXisKAnR4izO0SlleUCW6lTunZFypF0gQEpEI1xCESJxyXBY-2kuDrCAA */
export const todoMachine = createMachine({
  on: {
    onClose: {
      target: '.Closing',
    },
    newTodo: {
      target: '.TodoDetail',
    },
  },
  initial: 'Selector',
  states: {
    QueryTodo: {
      invoke: {
        src: "QueryMachine",
        onDone: "TodoList",
        onError: "Error"
      }
    },
    Closing: {
      on: {
        onClosingDone: 'Closed',
      },
      description: `Confirmation`,
    },
    Closed: {
      type: 'final',
    },
    Error: {
      description: `Error`,
    },
    Selector: {
      on: {
        onSelectorNone: {
          target: 'QueryTodo',
        },
        onSelectorFail: 'Error',
      },
      description: `Selector`,
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
        src: "ListMachine"
      }
    },
    TodoDetail: {
      description: 'Form',
    },
  },
  id: 'Todo',
},{services: {QueryMachine}});

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
        type: "final"
      },
    },
    initial: 'Selector',
  });

