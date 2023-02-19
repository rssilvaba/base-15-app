import { createMachine } from 'xstate';

/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUGJUDsDCANqrGANoAMAuoqAA7ECWALg7jSAB6IC0ATAJwB2AHQAOXr0EBWKQBYAzLKn9ysgDQgAnogCMgkQDZZggeIPyBOnfIC+NjWgyYcYAO6PUFakhD1YzVhx2LgRua15heUEDUR0DQXkdUVFyeXkNbVDZfmFo8iTlXh1yAykY2TsHdFRhAEUAVzAAJ00PbBwG5tbqgHkAay92PwC2HxDuKVFhXllUhItRQVnyUQyeItlhKyilGX4pVIVKkA86xpa23E6L6oAxAEMGAkGfYZZR0BC0g2F+WSKDH9yAI-sY1ggpMJZoIdPxRPJyIipHEksdToRGDgoO0Mf4sQARXBkKhDRjvIJjRC8KJQ3iiYy8RF6OEycG8SbCFZ6BTyURSal-NHVYQAZTABDAAGMmKgmu0xRLpbKAHJEl50MmBYJUmLCAz5cgqQTieRSEzpLQ8BGQ42KfT-YwrMpCjCi8VSmVy3AKj2yh5PdW+TUfTjrXnCA7ZJK8fWTGb8cFhcRibLGxbkaKyWR6F01DwAGQYsCY7Q8+LATEezxJr2DFM+VKUnIMOgEZVmZSMgkT2Vy+oK-CKJTK9NzwgLRZLuFuTyYzTwAAt7ljid4Nf5ydqEMUIryzfH-ojs7xEzplFtrEsZMoDopbMccOg4OwPKSN1rKaFFJDxJIZAolBUdRLVCA5yD7eY+UWQF9DHa5ugwN8RnrUNt0ZTlUyMAwW2NDNVhAvhk30GM21kcxFh0MdcQYLEkM3T8rBEQd4mBKIYyEQE2TIzlYiWRI6X+P5RCoogSAgOiPwbbdrChRYsziMj2R0cF5AMCJjH2el9H4QdYnvKpXQAUSaJpZQkkMQlbEQrxWKJEnhLNwVbHIFCMfhShjUo5LHH0lSacyUMsyRciUFZyH5bCpESZSCOzeRpniNJ2VU6wzzHCdiwCrcrJC5FgUHM0YgsRNklyVRRCMKxVFmLN0uqctKyeLKGKKX4sz+fcYztbsQNhCNimScLolUiRBDsOwgA */
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
      on: {
        onQueryTodoOk: {
          target: 'TodoList',
        },
        onQueryTodoFail: {
          target: 'Error',
        },
      },
      description: `Query`,
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
      description: 'List',
      on: {
        onTodoDetail: {
          target: 'TodoDetail',
        },
        onFilterChange: {
          target: 'QueryTodo',
        },
      },
    },
    TodoDetail: {
      description: 'Form',
    },
  },
  id: 'Todo',
});

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
      Error: {},
    },
    initial: 'Selector',
  });
