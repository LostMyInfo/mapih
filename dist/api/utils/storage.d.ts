// @ts-check
declare const utils: {
  https: (params: {
    url?: string;
    method?: string;
    body?: string | Object;
    headers?: any;
  }, match?: string) => Promise<any>;
  
  storage: {
    get: (key: string, options?: {
      default?: any;
      delete?: boolean;
      keep_history?: boolean;
      keep_listeners?: boolean;
    }) => Promise<any>;
    
    getSync: (key: string, options?: {
      default?: any;
      delete?: boolean;
      keep_history?: boolean;
      keep_listeners?: boolean;
    }) => any;
    
    getMany: (keys: string[]) => Promise<{[x: string]: any}>;
    
    set: (options: {
      key: string;
      value: any;
      ttl?: number;
      ttlCb?: Function;
      allow_overwrite?: boolean;
      on_change?: Function;
    }) => Promise<any>;
    
    setSync: (options: {
      key: string;
      value: any;
      ttl?: number;
      ttlCb?: Function;
      allow_overwrite?: boolean;
      on_change?: Function;
    }) => any;
    
    setMany: (options: {[key: string]: any}) => Promise<any[]>;
    
    delete: (key: string, options?: {
      keep_history?: boolean;
      keep_listeners?: boolean
    }) => Promise<boolean>;
    
    deleteSync: (key: string, options?: {
      keep_history?: boolean;
      keep_listeners?: boolean
    }) => boolean;
    
    deleteMany: (keys: string[]) => Promise<boolean[]>;
    
    each: (callback: Function) => Promise<any>;
    eachSync: (callback: Function) => any;
    
    merge: (key: string, value: any) => Promise<any>;
    mergeSync: (key: string, value: any) => any;
    
    push: (key: string, ...args: any) => Promise<any[]>;
    pushSync: (key: string, ...args: any) => any[];
    
    search: (key: string) => Promise<{[x: string]: any}>;
    searchSync: (key: string) => {[x: string]: any};
    
    increment: (key: string) => Promise<any>;
    incrementSync: (key: string) => any;
    
    decrement: (key: string) => Promise<any>;
    decrementSync: (key: string) => any;
    
    clearHistory: (key: string) => Promise<void>;
    clearHistorySync: (key: string) => void;
    
    all: () => Promise<_File[][]>;
    allSync: () => _File[][];
    
    equals: (key: string, value: any) => Promise<any>;
    equalsSync: (key: string, value: any) => any;
    
    filter: (callback: (file: _File) => boolean) => _File[];
    has: (key: string) => boolean;
    export: () => {[key: string]: {value: any, expire?: number}};
    history: (key: string) => {value: any, timestamp: number}[]|undefined;
    clear: () => void;
    entries: () => string[][]
    keys: () => string[];
    values: () => any[]
    size: () => number;
    bytes: () => number;
    toJson: () => string;
  }
};