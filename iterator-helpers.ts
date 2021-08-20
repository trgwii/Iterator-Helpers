const Generator = (function* () {})().constructor;
const AsyncGenerator = (async function* () {})().constructor;

if (!("map" in Generator.prototype)) {
  Generator.prototype.map = function* map<T, U>(
    this: Generator<T>,
    mapperFn: (x: T) => U,
  ) {
    for (const x of this) {
      yield mapperFn(x);
    }
  };
}

if (!("map" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.map = async function* map<T, U>(
    this: AsyncGenerator<T>,
    mapperFn: (x: T) => PromiseLike<U> | U,
  ) {
    for await (const x of this) {
      yield await mapperFn(x);
    }
  };
}

if (!("filter" in Generator.prototype)) {
  Generator.prototype.filter = function* filter<T>(
    this: Generator<T>,
    filtererFn: (x: T) => boolean,
  ) {
    for (const x of this) {
      if (filtererFn(x)) {
        yield x;
      }
    }
  };
}

if (!("filter" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.filter = async function* filter<T>(
    this: AsyncGenerator<T>,
    filtererFn: (x: T) => PromiseLike<boolean> | boolean,
  ) {
    for await (const x of this) {
      if (await filtererFn(x)) {
        yield x;
      }
    }
  };
}

if (!("take" in Generator.prototype)) {
  Generator.prototype.take = function* take<T>(
    this: Generator<T>,
    limit: number,
  ) {
    let i = 0;
    if (i >= limit) {
      return;
    }
    for (const x of this) {
      yield x;
      if (++i >= limit) {
        return;
      }
    }
  };
}

if (!("take" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.take = async function* take<T>(
    this: AsyncGenerator<T>,
    limit: number,
  ) {
    let i = 0;
    if (i >= limit) {
      return;
    }
    for await (const x of this) {
      yield x;
      if (++i >= limit) {
        return;
      }
    }
  };
}

if (!("drop" in Generator.prototype)) {
  Generator.prototype.drop = function* drop<T>(
    this: Generator<T>,
    limit: number,
  ) {
    let i = 0;
    for (const x of this) {
      if (i++ >= limit) {
        yield x;
      }
    }
  };
}

if (!("drop" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.drop = async function* drop<T>(
    this: AsyncGenerator<T>,
    limit: number,
  ) {
    let i = 0;
    for await (const x of this) {
      if (i++ >= limit) {
        yield x;
      }
    }
  };
}

if (!("entries" in Generator.prototype)) {
  Generator.prototype.entries = function* entries<T>(
    this: Generator<T>,
  ) {
    let i = 0;
    for (const x of this) {
      yield [i++, x];
    }
  };
}

if (!("entries" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.entries = async function* entries<T>(
    this: AsyncGenerator<T>,
  ) {
    let i = 0;
    for await (const x of this) {
      yield [i++, x];
    }
  };
}

if (!("asIndexedPairs" in Generator.prototype)) {
  Generator.prototype.asIndexedPairs = Generator.prototype.entries;
}
if (!("asIndexedPairs" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.asIndexedPairs = AsyncGenerator.prototype.entries;
}

if (!("flatMap" in Generator.prototype)) {
  Generator.prototype.flatMap = function* flatMap<T, U>(
    this: Generator<T>,
    mapperFn: (x: T) => Generator<U>,
  ) {
    for (const x of this) {
      yield* mapperFn(x);
    }
  };
}

if (!("flatMap" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.flatMap = async function* flatMap<T, U>(
    this: AsyncGenerator<T>,
    mapperFn: (x: T) => AsyncGenerator<U>,
  ) {
    for await (const x of this) {
      yield* mapperFn(x);
    }
  };
}

if (!("reduce" in Generator.prototype)) {
  Generator.prototype.reduce = function reduce<T, U>(
    this: Generator<T>,
    reducer: (acc: U, x: T) => U,
    initialValue: U,
  ) {
    let acc = initialValue;
    for (const x of this) {
      acc = reducer(acc, x);
    }
    return acc;
  };
}

if (!("reduce" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.reduce = async function reduce<T, U>(
    this: AsyncGenerator<T>,
    reducer: (acc: U, x: T) => PromiseLike<U> | U,
    initialValue: U,
  ) {
    let acc = initialValue;
    for await (const x of this) {
      acc = await reducer(acc, x);
    }
    return acc;
  };
}

if (!("toArray" in Generator.prototype)) {
  Generator.prototype.toArray = function toArray<T>(this: Generator<T>) {
    return [...this];
  };
}

if (!("toArray" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.toArray = async function toArray<T>(
    this: AsyncGenerator<T>,
  ) {
    const result = [];
    for await (const x of this) {
      result.push(x);
    }
    return result;
  };
}

if (!("forEach" in Generator.prototype)) {
  Generator.prototype.forEach = function forEach<T>(
    this: Generator<T>,
    fn: (x: T) => void,
  ) {
    for (const x of this) {
      fn(x);
    }
  };
}

if (!("forEach" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.forEach = async function forEach<T>(
    this: AsyncGenerator<T>,
    fn: (x: T) => PromiseLike<void> | void,
  ) {
    for await (const x of this) {
      await fn(x);
    }
  };
}

if (!("some" in Generator.prototype)) {
  Generator.prototype.some = function some<T>(
    this: Generator<T>,
    fn: (x: T) => boolean,
  ) {
    for (const x of this) {
      if (fn(x)) {
        return true;
      }
    }
    return false;
  };
}

if (!("some" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.some = async function some<T>(
    this: AsyncGenerator<T>,
    fn: (x: T) => PromiseLike<boolean> | boolean,
  ) {
    for await (const x of this) {
      if (await fn(x)) {
        return true;
      }
    }
    return false;
  };
}

if (!("every" in Generator.prototype)) {
  Generator.prototype.every = function every<T>(
    this: Generator<T>,
    fn: (x: T) => boolean,
  ) {
    for (const x of this) {
      if (!fn(x)) {
        return false;
      }
    }
    return true;
  };
}

if (!("every" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.every = async function every<T>(
    this: AsyncGenerator<T>,
    fn: (x: T) => PromiseLike<boolean> | boolean,
  ) {
    for await (const x of this) {
      if (!await fn(x)) {
        return false;
      }
    }
    return true;
  };
}

if (!("find" in Generator.prototype)) {
  Generator.prototype.find = function find<T>(
    this: Generator<T>,
    fn: (x: T) => boolean,
  ) {
    for (const x of this) {
      if (fn(x)) {
        return x;
      }
    }
  };
}

if (!("find" in AsyncGenerator.prototype)) {
  AsyncGenerator.prototype.find = async function find<T>(
    this: AsyncGenerator<T>,
    fn: (x: T) => PromiseLike<boolean> | boolean,
  ) {
    for await (const x of this) {
      if (await fn(x)) {
        return x;
      }
    }
  };
}
