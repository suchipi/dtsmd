<!-- INPUT:
/**
 * Given a mapping object of name-to-init-functions, create an object with the
 * same property keys, whose property descriptors are initially getters which
 * run the initializer function for that key and then replace the getter
 * descriptor with a standard value descriptor.
 *
 *
 * The net effect is that the first time you read a given key, its initializer
 * function is run to get a resulting value, and on subsequent reads, that
 * resulting value is re-used, without running the initializer function.
 *
 * @param initializers A object whose keys are arbitrary (your choice) and whose values are functions assignable to the type `() => any`, where the returned `any` type is the initialized value. The values are considered "initializer functions" which get used the first time the corresponding key is read on the object returned by {@link deferredInit}.
 * @returns An object with the same keys as the initializers object passed in, which run the initializer function on the first read and re-use the result on later calls.
 */
export declare function deferredInit<Initializers extends {
    [Key: PropertyKey]: () => any;
}>(initializers: Initializers): {
    readonly [Key in keyof Initializers]: ReturnType<Initializers[Key]>;
};
/**
 * Peek into an object returned by {@link deferredInit} and check if one of its
 * properties has been initialized, without causing initialization to occur.
 *
 * @param deferredInitResult - The object returned from {@link deferredInit}
 * @param key - The key on the object which you want to check the initialization status of
 * @returns A boolean indicating whether that key has been initialized yet.
 */
export declare function isInitialized<DeferredInitResult extends {
    [Key: PropertyKey]: any;
}>(deferredInitResult: DeferredInitResult, key: keyof DeferredInitResult): boolean;

-->
# deferredInit (exported function)

Given a mapping object of name-to-init-functions, create an object with the
same property keys, whose property descriptors are initially getters which
run the initializer function for that key and then replace the getter
descriptor with a standard value descriptor.

The net effect is that the first time you read a given key, its initializer
function is run to get a resulting value, and on subsequent reads, that
resulting value is re-used, without running the initializer function.

- `@param` _initializers_ — A object whose keys are arbitrary (your choice) and whose values are functions assignable to the type `() => any`, where the returned `any` type is the initialized value. The values are considered "initializer functions" which get used the first time the corresponding key is read on the object returned by [deferredInit](#).
- `@returns` An object with the same keys as the initializers object passed in, which run the initializer function on the first read and re-use the result on later calls.

```ts
export declare function deferredInit<
  Initializers extends {
    [Key: PropertyKey]: () => any;
  },
>(
  initializers: Initializers,
): { readonly [Key in keyof Initializers]: ReturnType<Initializers[Key]> };
```

# isInitialized (exported function)

Peek into an object returned by [deferredInit](#) and check if one of its
properties has been initialized, without causing initialization to occur.

- `@param` _deferredInitResult_ — The object returned from [deferredInit](#)
- `@param` _key_ — The key on the object which you want to check the initialization status of
- `@returns` A boolean indicating whether that key has been initialized yet.

```ts
export declare function isInitialized<
  DeferredInitResult extends {
    [Key: PropertyKey]: any;
  },
>(
  deferredInitResult: DeferredInitResult,
  key: keyof DeferredInitResult,
): boolean;
```

<!-- OUTPUT.frontmatter:
null
-->
<!-- OUTPUT.warnings:
[
  "No link URL provided for \"deferredInit\"; falling back to \"#\""
]
-->
