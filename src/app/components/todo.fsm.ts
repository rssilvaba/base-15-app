export const states: Record<string, readonly ['normal' | 'history' | 'selector', 'initial'?]> = {
  //state: [type, initial?]
  // Selector: ['normal', 'initial'],
  TodoList: ['normal'],
  QueryTodo: ['normal'],
  Error: ['normal'],
  TodoDetail: ['normal'],
  Selector: ['selector', 'initial'],
} as const;

//transitions/events
export const transitions: Record<string, Record<string, string>> = {
  Selector: { onSelectorDone: 'QueryTodo' },
  QueryTodo: {
    onQueryTodoDone: 'TodoList',
    onQueryTodoFail: 'Error',
  },
  TodoList: {
    onFilterChange: 'QueryTodo',
    onTodoDetail: 'TodoDetail',
  },
  Error: {},
  'r#': {
    onTodoNew: 'TodoDetail',
  },
  TodoDetail: {},
} as const;

export const guardedEvents: Record<string, Record<string, any>> = null;
