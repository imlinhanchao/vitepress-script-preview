declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const comp: ComponentOptions
  export default comp
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type CustomElement<T> = HTMLElement & T;

declare type IfUnknown<T, V> = [unknown] extends [T] ? V : T;

declare type ValueType<T, K extends keyof T> = T[K];
