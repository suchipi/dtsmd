// ---
// title: Sample Library Definitions File
// ---
export class SomethingOrOther {
  /**
   * This method does stuff
   */
  someMethod(
    arg1: string,
    arg2: { blah: 5 },
    ...varargs: Array<Function>
  ): string;

  /** This one's a static method */
  static classMethod(): 3748239387342;
}

/** it's a nice function */
export function something(arg1: number, arg2: string): void;

declare namespace Idk {
  export const BLAH = 5;
}

declare enum FoodStuffs {
  fruit,
  vegetable,
  grain,
  meat,
  dairy,
  dessert = 898909,
}
