
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Instrument
 * 
 */
export type Instrument = $Result.DefaultSelection<Prisma.$InstrumentPayload>
/**
 * Model Candle
 * OHLCV, one row per closed bar. Only closed bars are stored: a live bar can repaint.
 */
export type Candle = $Result.DefaultSelection<Prisma.$CandlePayload>
/**
 * Model Setup
 * A setup is one rule + one horizon + one barrier pair. Models are fitted per setup, never across setups.
 */
export type Setup = $Result.DefaultSelection<Prisma.$SetupPayload>
/**
 * Model Signal
 * A locked call: made at a bar close, never edited, settled later from the candles that followed.
 */
export type Signal = $Result.DefaultSelection<Prisma.$SignalPayload>
/**
 * Model ModelFit
 * Walk-forward fit: coefficients plus the calibration map, with the window they were fitted on.
 */
export type ModelFit = $Result.DefaultSelection<Prisma.$ModelFitPayload>
/**
 * Model BacktestRun
 * A stored walk-forward backtest, so results can be compared over time instead of re-run from memory.
 */
export type BacktestRun = $Result.DefaultSelection<Prisma.$BacktestRunPayload>
/**
 * Model Trade
 * Your own trades. Logged by hand, compared with the plan: the discipline half of the app.
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model RiskProfile
 * 
 */
export type RiskProfile = $Result.DefaultSelection<Prisma.$RiskProfilePayload>
/**
 * Model FundingRate
 * Perpetual funding: a mechanical cash flow, not a forecast. Positive funding means longs pay shorts.
 */
export type FundingRate = $Result.DefaultSelection<Prisma.$FundingRatePayload>
/**
 * Model PortfolioSnapshot
 * A dated snapshot of the ranked universe and the weights it implies.
 */
export type PortfolioSnapshot = $Result.DefaultSelection<Prisma.$PortfolioSnapshotPayload>
/**
 * Model AppSetting
 * 
 */
export type AppSetting = $Result.DefaultSelection<Prisma.$AppSettingPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>
/**
 * Model TokenScreen
 * An append-only token screen. Never edited: a later screen is a new row, so the record of what was
 * known at the time survives. Outcomes are written back onto the row that predicted them.
 */
export type TokenScreen = $Result.DefaultSelection<Prisma.$TokenScreenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Market: {
  CRYPTO: 'CRYPTO',
  FX: 'FX'
};

export type Market = (typeof Market)[keyof typeof Market]


export const Venue: {
  BINANCE: 'BINANCE',
  BYBIT: 'BYBIT',
  TWELVE_DATA: 'TWELVE_DATA',
  DEMO: 'DEMO'
};

export type Venue = (typeof Venue)[keyof typeof Venue]


export const Side: {
  LONG: 'LONG',
  SHORT: 'SHORT'
};

export type Side = (typeof Side)[keyof typeof Side]


export const SignalState: {
  OPEN: 'OPEN',
  WON: 'WON',
  LOST: 'LOST',
  TIMEOUT: 'TIMEOUT',
  VOID: 'VOID'
};

export type SignalState = (typeof SignalState)[keyof typeof SignalState]

}

export type Market = $Enums.Market

export const Market: typeof $Enums.Market

export type Venue = $Enums.Venue

export const Venue: typeof $Enums.Venue

export type Side = $Enums.Side

export const Side: typeof $Enums.Side

export type SignalState = $Enums.SignalState

export const SignalState: typeof $Enums.SignalState

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Instruments
 * const instruments = await prisma.instrument.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Instruments
   * const instruments = await prisma.instrument.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.instrument`: Exposes CRUD operations for the **Instrument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instruments
    * const instruments = await prisma.instrument.findMany()
    * ```
    */
  get instrument(): Prisma.InstrumentDelegate<ExtArgs>;

  /**
   * `prisma.candle`: Exposes CRUD operations for the **Candle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candles
    * const candles = await prisma.candle.findMany()
    * ```
    */
  get candle(): Prisma.CandleDelegate<ExtArgs>;

  /**
   * `prisma.setup`: Exposes CRUD operations for the **Setup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Setups
    * const setups = await prisma.setup.findMany()
    * ```
    */
  get setup(): Prisma.SetupDelegate<ExtArgs>;

  /**
   * `prisma.signal`: Exposes CRUD operations for the **Signal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Signals
    * const signals = await prisma.signal.findMany()
    * ```
    */
  get signal(): Prisma.SignalDelegate<ExtArgs>;

  /**
   * `prisma.modelFit`: Exposes CRUD operations for the **ModelFit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModelFits
    * const modelFits = await prisma.modelFit.findMany()
    * ```
    */
  get modelFit(): Prisma.ModelFitDelegate<ExtArgs>;

  /**
   * `prisma.backtestRun`: Exposes CRUD operations for the **BacktestRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BacktestRuns
    * const backtestRuns = await prisma.backtestRun.findMany()
    * ```
    */
  get backtestRun(): Prisma.BacktestRunDelegate<ExtArgs>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs>;

  /**
   * `prisma.riskProfile`: Exposes CRUD operations for the **RiskProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiskProfiles
    * const riskProfiles = await prisma.riskProfile.findMany()
    * ```
    */
  get riskProfile(): Prisma.RiskProfileDelegate<ExtArgs>;

  /**
   * `prisma.fundingRate`: Exposes CRUD operations for the **FundingRate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingRates
    * const fundingRates = await prisma.fundingRate.findMany()
    * ```
    */
  get fundingRate(): Prisma.FundingRateDelegate<ExtArgs>;

  /**
   * `prisma.portfolioSnapshot`: Exposes CRUD operations for the **PortfolioSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioSnapshots
    * const portfolioSnapshots = await prisma.portfolioSnapshot.findMany()
    * ```
    */
  get portfolioSnapshot(): Prisma.PortfolioSnapshotDelegate<ExtArgs>;

  /**
   * `prisma.appSetting`: Exposes CRUD operations for the **AppSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppSettings
    * const appSettings = await prisma.appSetting.findMany()
    * ```
    */
  get appSetting(): Prisma.AppSettingDelegate<ExtArgs>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs>;

  /**
   * `prisma.tokenScreen`: Exposes CRUD operations for the **TokenScreen** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenScreens
    * const tokenScreens = await prisma.tokenScreen.findMany()
    * ```
    */
  get tokenScreen(): Prisma.TokenScreenDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Instrument: 'Instrument',
    Candle: 'Candle',
    Setup: 'Setup',
    Signal: 'Signal',
    ModelFit: 'ModelFit',
    BacktestRun: 'BacktestRun',
    Trade: 'Trade',
    RiskProfile: 'RiskProfile',
    FundingRate: 'FundingRate',
    PortfolioSnapshot: 'PortfolioSnapshot',
    AppSetting: 'AppSetting',
    SyncLog: 'SyncLog',
    TokenScreen: 'TokenScreen'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "instrument" | "candle" | "setup" | "signal" | "modelFit" | "backtestRun" | "trade" | "riskProfile" | "fundingRate" | "portfolioSnapshot" | "appSetting" | "syncLog" | "tokenScreen"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Instrument: {
        payload: Prisma.$InstrumentPayload<ExtArgs>
        fields: Prisma.InstrumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstrumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstrumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          findFirst: {
            args: Prisma.InstrumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstrumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          findMany: {
            args: Prisma.InstrumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>[]
          }
          create: {
            args: Prisma.InstrumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          createMany: {
            args: Prisma.InstrumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstrumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>[]
          }
          delete: {
            args: Prisma.InstrumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          update: {
            args: Prisma.InstrumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          deleteMany: {
            args: Prisma.InstrumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstrumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstrumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          aggregate: {
            args: Prisma.InstrumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstrument>
          }
          groupBy: {
            args: Prisma.InstrumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstrumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstrumentCountArgs<ExtArgs>
            result: $Utils.Optional<InstrumentCountAggregateOutputType> | number
          }
        }
      }
      Candle: {
        payload: Prisma.$CandlePayload<ExtArgs>
        fields: Prisma.CandleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>
          }
          findFirst: {
            args: Prisma.CandleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>
          }
          findMany: {
            args: Prisma.CandleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>[]
          }
          create: {
            args: Prisma.CandleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>
          }
          createMany: {
            args: Prisma.CandleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>[]
          }
          delete: {
            args: Prisma.CandleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>
          }
          update: {
            args: Prisma.CandleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>
          }
          deleteMany: {
            args: Prisma.CandleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CandleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandlePayload>
          }
          aggregate: {
            args: Prisma.CandleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandle>
          }
          groupBy: {
            args: Prisma.CandleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandleCountArgs<ExtArgs>
            result: $Utils.Optional<CandleCountAggregateOutputType> | number
          }
        }
      }
      Setup: {
        payload: Prisma.$SetupPayload<ExtArgs>
        fields: Prisma.SetupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SetupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SetupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>
          }
          findFirst: {
            args: Prisma.SetupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SetupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>
          }
          findMany: {
            args: Prisma.SetupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>[]
          }
          create: {
            args: Prisma.SetupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>
          }
          createMany: {
            args: Prisma.SetupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SetupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>[]
          }
          delete: {
            args: Prisma.SetupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>
          }
          update: {
            args: Prisma.SetupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>
          }
          deleteMany: {
            args: Prisma.SetupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SetupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SetupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetupPayload>
          }
          aggregate: {
            args: Prisma.SetupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetup>
          }
          groupBy: {
            args: Prisma.SetupGroupByArgs<ExtArgs>
            result: $Utils.Optional<SetupGroupByOutputType>[]
          }
          count: {
            args: Prisma.SetupCountArgs<ExtArgs>
            result: $Utils.Optional<SetupCountAggregateOutputType> | number
          }
        }
      }
      Signal: {
        payload: Prisma.$SignalPayload<ExtArgs>
        fields: Prisma.SignalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>
          }
          findFirst: {
            args: Prisma.SignalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>
          }
          findMany: {
            args: Prisma.SignalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>[]
          }
          create: {
            args: Prisma.SignalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>
          }
          createMany: {
            args: Prisma.SignalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>[]
          }
          delete: {
            args: Prisma.SignalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>
          }
          update: {
            args: Prisma.SignalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>
          }
          deleteMany: {
            args: Prisma.SignalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignalPayload>
          }
          aggregate: {
            args: Prisma.SignalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignal>
          }
          groupBy: {
            args: Prisma.SignalGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignalGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignalCountArgs<ExtArgs>
            result: $Utils.Optional<SignalCountAggregateOutputType> | number
          }
        }
      }
      ModelFit: {
        payload: Prisma.$ModelFitPayload<ExtArgs>
        fields: Prisma.ModelFitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModelFitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModelFitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>
          }
          findFirst: {
            args: Prisma.ModelFitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModelFitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>
          }
          findMany: {
            args: Prisma.ModelFitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>[]
          }
          create: {
            args: Prisma.ModelFitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>
          }
          createMany: {
            args: Prisma.ModelFitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModelFitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>[]
          }
          delete: {
            args: Prisma.ModelFitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>
          }
          update: {
            args: Prisma.ModelFitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>
          }
          deleteMany: {
            args: Prisma.ModelFitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModelFitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ModelFitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelFitPayload>
          }
          aggregate: {
            args: Prisma.ModelFitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModelFit>
          }
          groupBy: {
            args: Prisma.ModelFitGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModelFitGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModelFitCountArgs<ExtArgs>
            result: $Utils.Optional<ModelFitCountAggregateOutputType> | number
          }
        }
      }
      BacktestRun: {
        payload: Prisma.$BacktestRunPayload<ExtArgs>
        fields: Prisma.BacktestRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BacktestRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BacktestRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>
          }
          findFirst: {
            args: Prisma.BacktestRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BacktestRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>
          }
          findMany: {
            args: Prisma.BacktestRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>[]
          }
          create: {
            args: Prisma.BacktestRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>
          }
          createMany: {
            args: Prisma.BacktestRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BacktestRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>[]
          }
          delete: {
            args: Prisma.BacktestRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>
          }
          update: {
            args: Prisma.BacktestRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>
          }
          deleteMany: {
            args: Prisma.BacktestRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BacktestRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BacktestRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BacktestRunPayload>
          }
          aggregate: {
            args: Prisma.BacktestRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBacktestRun>
          }
          groupBy: {
            args: Prisma.BacktestRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<BacktestRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.BacktestRunCountArgs<ExtArgs>
            result: $Utils.Optional<BacktestRunCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      RiskProfile: {
        payload: Prisma.$RiskProfilePayload<ExtArgs>
        fields: Prisma.RiskProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiskProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiskProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>
          }
          findFirst: {
            args: Prisma.RiskProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiskProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>
          }
          findMany: {
            args: Prisma.RiskProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>[]
          }
          create: {
            args: Prisma.RiskProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>
          }
          createMany: {
            args: Prisma.RiskProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiskProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>[]
          }
          delete: {
            args: Prisma.RiskProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>
          }
          update: {
            args: Prisma.RiskProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>
          }
          deleteMany: {
            args: Prisma.RiskProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiskProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiskProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>
          }
          aggregate: {
            args: Prisma.RiskProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiskProfile>
          }
          groupBy: {
            args: Prisma.RiskProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiskProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiskProfileCountArgs<ExtArgs>
            result: $Utils.Optional<RiskProfileCountAggregateOutputType> | number
          }
        }
      }
      FundingRate: {
        payload: Prisma.$FundingRatePayload<ExtArgs>
        fields: Prisma.FundingRateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingRateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingRateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>
          }
          findFirst: {
            args: Prisma.FundingRateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingRateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>
          }
          findMany: {
            args: Prisma.FundingRateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>[]
          }
          create: {
            args: Prisma.FundingRateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>
          }
          createMany: {
            args: Prisma.FundingRateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingRateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>[]
          }
          delete: {
            args: Prisma.FundingRateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>
          }
          update: {
            args: Prisma.FundingRateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>
          }
          deleteMany: {
            args: Prisma.FundingRateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingRateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FundingRateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingRatePayload>
          }
          aggregate: {
            args: Prisma.FundingRateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingRate>
          }
          groupBy: {
            args: Prisma.FundingRateGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingRateGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingRateCountArgs<ExtArgs>
            result: $Utils.Optional<FundingRateCountAggregateOutputType> | number
          }
        }
      }
      PortfolioSnapshot: {
        payload: Prisma.$PortfolioSnapshotPayload<ExtArgs>
        fields: Prisma.PortfolioSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>
          }
          findFirst: {
            args: Prisma.PortfolioSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>
          }
          findMany: {
            args: Prisma.PortfolioSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>[]
          }
          create: {
            args: Prisma.PortfolioSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>
          }
          createMany: {
            args: Prisma.PortfolioSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>[]
          }
          delete: {
            args: Prisma.PortfolioSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>
          }
          update: {
            args: Prisma.PortfolioSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioSnapshotPayload>
          }
          aggregate: {
            args: Prisma.PortfolioSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolioSnapshot>
          }
          groupBy: {
            args: Prisma.PortfolioSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioSnapshotCountAggregateOutputType> | number
          }
        }
      }
      AppSetting: {
        payload: Prisma.$AppSettingPayload<ExtArgs>
        fields: Prisma.AppSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          findFirst: {
            args: Prisma.AppSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          findMany: {
            args: Prisma.AppSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>[]
          }
          create: {
            args: Prisma.AppSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          createMany: {
            args: Prisma.AppSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>[]
          }
          delete: {
            args: Prisma.AppSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          update: {
            args: Prisma.AppSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          deleteMany: {
            args: Prisma.AppSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppSettingPayload>
          }
          aggregate: {
            args: Prisma.AppSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppSetting>
          }
          groupBy: {
            args: Prisma.AppSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppSettingCountArgs<ExtArgs>
            result: $Utils.Optional<AppSettingCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
      TokenScreen: {
        payload: Prisma.$TokenScreenPayload<ExtArgs>
        fields: Prisma.TokenScreenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenScreenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenScreenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>
          }
          findFirst: {
            args: Prisma.TokenScreenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenScreenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>
          }
          findMany: {
            args: Prisma.TokenScreenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>[]
          }
          create: {
            args: Prisma.TokenScreenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>
          }
          createMany: {
            args: Prisma.TokenScreenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenScreenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>[]
          }
          delete: {
            args: Prisma.TokenScreenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>
          }
          update: {
            args: Prisma.TokenScreenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>
          }
          deleteMany: {
            args: Prisma.TokenScreenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenScreenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokenScreenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenScreenPayload>
          }
          aggregate: {
            args: Prisma.TokenScreenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenScreen>
          }
          groupBy: {
            args: Prisma.TokenScreenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenScreenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenScreenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenScreenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type InstrumentCountOutputType
   */

  export type InstrumentCountOutputType = {
    candles: number
    signals: number
    trades: number
    funding: number
  }

  export type InstrumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candles?: boolean | InstrumentCountOutputTypeCountCandlesArgs
    signals?: boolean | InstrumentCountOutputTypeCountSignalsArgs
    trades?: boolean | InstrumentCountOutputTypeCountTradesArgs
    funding?: boolean | InstrumentCountOutputTypeCountFundingArgs
  }

  // Custom InputTypes
  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstrumentCountOutputType
     */
    select?: InstrumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountCandlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandleWhereInput
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountSignalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalWhereInput
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountFundingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingRateWhereInput
  }


  /**
   * Count Type SetupCountOutputType
   */

  export type SetupCountOutputType = {
    signals: number
    models: number
    runs: number
  }

  export type SetupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signals?: boolean | SetupCountOutputTypeCountSignalsArgs
    models?: boolean | SetupCountOutputTypeCountModelsArgs
    runs?: boolean | SetupCountOutputTypeCountRunsArgs
  }

  // Custom InputTypes
  /**
   * SetupCountOutputType without action
   */
  export type SetupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetupCountOutputType
     */
    select?: SetupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SetupCountOutputType without action
   */
  export type SetupCountOutputTypeCountSignalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalWhereInput
  }

  /**
   * SetupCountOutputType without action
   */
  export type SetupCountOutputTypeCountModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelFitWhereInput
  }

  /**
   * SetupCountOutputType without action
   */
  export type SetupCountOutputTypeCountRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BacktestRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Instrument
   */

  export type AggregateInstrument = {
    _count: InstrumentCountAggregateOutputType | null
    _avg: InstrumentAvgAggregateOutputType | null
    _sum: InstrumentSumAggregateOutputType | null
    _min: InstrumentMinAggregateOutputType | null
    _max: InstrumentMaxAggregateOutputType | null
  }

  export type InstrumentAvgAggregateOutputType = {
    tickSize: number | null
    feeBps: number | null
    slipBps: number | null
  }

  export type InstrumentSumAggregateOutputType = {
    tickSize: number | null
    feeBps: number | null
    slipBps: number | null
  }

  export type InstrumentMinAggregateOutputType = {
    id: string | null
    market: $Enums.Market | null
    venue: $Enums.Venue | null
    symbol: string | null
    display: string | null
    tickSize: number | null
    feeBps: number | null
    slipBps: number | null
    enabled: boolean | null
    lastSyncAt: Date | null
    createdAt: Date | null
  }

  export type InstrumentMaxAggregateOutputType = {
    id: string | null
    market: $Enums.Market | null
    venue: $Enums.Venue | null
    symbol: string | null
    display: string | null
    tickSize: number | null
    feeBps: number | null
    slipBps: number | null
    enabled: boolean | null
    lastSyncAt: Date | null
    createdAt: Date | null
  }

  export type InstrumentCountAggregateOutputType = {
    id: number
    market: number
    venue: number
    symbol: number
    display: number
    tickSize: number
    feeBps: number
    slipBps: number
    enabled: number
    lastSyncAt: number
    createdAt: number
    _all: number
  }


  export type InstrumentAvgAggregateInputType = {
    tickSize?: true
    feeBps?: true
    slipBps?: true
  }

  export type InstrumentSumAggregateInputType = {
    tickSize?: true
    feeBps?: true
    slipBps?: true
  }

  export type InstrumentMinAggregateInputType = {
    id?: true
    market?: true
    venue?: true
    symbol?: true
    display?: true
    tickSize?: true
    feeBps?: true
    slipBps?: true
    enabled?: true
    lastSyncAt?: true
    createdAt?: true
  }

  export type InstrumentMaxAggregateInputType = {
    id?: true
    market?: true
    venue?: true
    symbol?: true
    display?: true
    tickSize?: true
    feeBps?: true
    slipBps?: true
    enabled?: true
    lastSyncAt?: true
    createdAt?: true
  }

  export type InstrumentCountAggregateInputType = {
    id?: true
    market?: true
    venue?: true
    symbol?: true
    display?: true
    tickSize?: true
    feeBps?: true
    slipBps?: true
    enabled?: true
    lastSyncAt?: true
    createdAt?: true
    _all?: true
  }

  export type InstrumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instrument to aggregate.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instruments
    **/
    _count?: true | InstrumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstrumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstrumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstrumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstrumentMaxAggregateInputType
  }

  export type GetInstrumentAggregateType<T extends InstrumentAggregateArgs> = {
        [P in keyof T & keyof AggregateInstrument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstrument[P]>
      : GetScalarType<T[P], AggregateInstrument[P]>
  }




  export type InstrumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstrumentWhereInput
    orderBy?: InstrumentOrderByWithAggregationInput | InstrumentOrderByWithAggregationInput[]
    by: InstrumentScalarFieldEnum[] | InstrumentScalarFieldEnum
    having?: InstrumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstrumentCountAggregateInputType | true
    _avg?: InstrumentAvgAggregateInputType
    _sum?: InstrumentSumAggregateInputType
    _min?: InstrumentMinAggregateInputType
    _max?: InstrumentMaxAggregateInputType
  }

  export type InstrumentGroupByOutputType = {
    id: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize: number
    feeBps: number
    slipBps: number
    enabled: boolean
    lastSyncAt: Date | null
    createdAt: Date
    _count: InstrumentCountAggregateOutputType | null
    _avg: InstrumentAvgAggregateOutputType | null
    _sum: InstrumentSumAggregateOutputType | null
    _min: InstrumentMinAggregateOutputType | null
    _max: InstrumentMaxAggregateOutputType | null
  }

  type GetInstrumentGroupByPayload<T extends InstrumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstrumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstrumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstrumentGroupByOutputType[P]>
            : GetScalarType<T[P], InstrumentGroupByOutputType[P]>
        }
      >
    >


  export type InstrumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    market?: boolean
    venue?: boolean
    symbol?: boolean
    display?: boolean
    tickSize?: boolean
    feeBps?: boolean
    slipBps?: boolean
    enabled?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
    candles?: boolean | Instrument$candlesArgs<ExtArgs>
    signals?: boolean | Instrument$signalsArgs<ExtArgs>
    trades?: boolean | Instrument$tradesArgs<ExtArgs>
    funding?: boolean | Instrument$fundingArgs<ExtArgs>
    _count?: boolean | InstrumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instrument"]>

  export type InstrumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    market?: boolean
    venue?: boolean
    symbol?: boolean
    display?: boolean
    tickSize?: boolean
    feeBps?: boolean
    slipBps?: boolean
    enabled?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["instrument"]>

  export type InstrumentSelectScalar = {
    id?: boolean
    market?: boolean
    venue?: boolean
    symbol?: boolean
    display?: boolean
    tickSize?: boolean
    feeBps?: boolean
    slipBps?: boolean
    enabled?: boolean
    lastSyncAt?: boolean
    createdAt?: boolean
  }

  export type InstrumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candles?: boolean | Instrument$candlesArgs<ExtArgs>
    signals?: boolean | Instrument$signalsArgs<ExtArgs>
    trades?: boolean | Instrument$tradesArgs<ExtArgs>
    funding?: boolean | Instrument$fundingArgs<ExtArgs>
    _count?: boolean | InstrumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstrumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InstrumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Instrument"
    objects: {
      candles: Prisma.$CandlePayload<ExtArgs>[]
      signals: Prisma.$SignalPayload<ExtArgs>[]
      trades: Prisma.$TradePayload<ExtArgs>[]
      funding: Prisma.$FundingRatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      market: $Enums.Market
      venue: $Enums.Venue
      symbol: string
      display: string
      tickSize: number
      feeBps: number
      slipBps: number
      enabled: boolean
      lastSyncAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["instrument"]>
    composites: {}
  }

  type InstrumentGetPayload<S extends boolean | null | undefined | InstrumentDefaultArgs> = $Result.GetResult<Prisma.$InstrumentPayload, S>

  type InstrumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstrumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstrumentCountAggregateInputType | true
    }

  export interface InstrumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Instrument'], meta: { name: 'Instrument' } }
    /**
     * Find zero or one Instrument that matches the filter.
     * @param {InstrumentFindUniqueArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstrumentFindUniqueArgs>(args: SelectSubset<T, InstrumentFindUniqueArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Instrument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstrumentFindUniqueOrThrowArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstrumentFindUniqueOrThrowArgs>(args: SelectSubset<T, InstrumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Instrument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindFirstArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstrumentFindFirstArgs>(args?: SelectSubset<T, InstrumentFindFirstArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Instrument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindFirstOrThrowArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstrumentFindFirstOrThrowArgs>(args?: SelectSubset<T, InstrumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Instruments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instruments
     * const instruments = await prisma.instrument.findMany()
     * 
     * // Get first 10 Instruments
     * const instruments = await prisma.instrument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instrumentWithIdOnly = await prisma.instrument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstrumentFindManyArgs>(args?: SelectSubset<T, InstrumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Instrument.
     * @param {InstrumentCreateArgs} args - Arguments to create a Instrument.
     * @example
     * // Create one Instrument
     * const Instrument = await prisma.instrument.create({
     *   data: {
     *     // ... data to create a Instrument
     *   }
     * })
     * 
     */
    create<T extends InstrumentCreateArgs>(args: SelectSubset<T, InstrumentCreateArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Instruments.
     * @param {InstrumentCreateManyArgs} args - Arguments to create many Instruments.
     * @example
     * // Create many Instruments
     * const instrument = await prisma.instrument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstrumentCreateManyArgs>(args?: SelectSubset<T, InstrumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Instruments and returns the data saved in the database.
     * @param {InstrumentCreateManyAndReturnArgs} args - Arguments to create many Instruments.
     * @example
     * // Create many Instruments
     * const instrument = await prisma.instrument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Instruments and only return the `id`
     * const instrumentWithIdOnly = await prisma.instrument.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstrumentCreateManyAndReturnArgs>(args?: SelectSubset<T, InstrumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Instrument.
     * @param {InstrumentDeleteArgs} args - Arguments to delete one Instrument.
     * @example
     * // Delete one Instrument
     * const Instrument = await prisma.instrument.delete({
     *   where: {
     *     // ... filter to delete one Instrument
     *   }
     * })
     * 
     */
    delete<T extends InstrumentDeleteArgs>(args: SelectSubset<T, InstrumentDeleteArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Instrument.
     * @param {InstrumentUpdateArgs} args - Arguments to update one Instrument.
     * @example
     * // Update one Instrument
     * const instrument = await prisma.instrument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstrumentUpdateArgs>(args: SelectSubset<T, InstrumentUpdateArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Instruments.
     * @param {InstrumentDeleteManyArgs} args - Arguments to filter Instruments to delete.
     * @example
     * // Delete a few Instruments
     * const { count } = await prisma.instrument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstrumentDeleteManyArgs>(args?: SelectSubset<T, InstrumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instruments
     * const instrument = await prisma.instrument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstrumentUpdateManyArgs>(args: SelectSubset<T, InstrumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Instrument.
     * @param {InstrumentUpsertArgs} args - Arguments to update or create a Instrument.
     * @example
     * // Update or create a Instrument
     * const instrument = await prisma.instrument.upsert({
     *   create: {
     *     // ... data to create a Instrument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instrument we want to update
     *   }
     * })
     */
    upsert<T extends InstrumentUpsertArgs>(args: SelectSubset<T, InstrumentUpsertArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Instruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentCountArgs} args - Arguments to filter Instruments to count.
     * @example
     * // Count the number of Instruments
     * const count = await prisma.instrument.count({
     *   where: {
     *     // ... the filter for the Instruments we want to count
     *   }
     * })
    **/
    count<T extends InstrumentCountArgs>(
      args?: Subset<T, InstrumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstrumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstrumentAggregateArgs>(args: Subset<T, InstrumentAggregateArgs>): Prisma.PrismaPromise<GetInstrumentAggregateType<T>>

    /**
     * Group by Instrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstrumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstrumentGroupByArgs['orderBy'] }
        : { orderBy?: InstrumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstrumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstrumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Instrument model
   */
  readonly fields: InstrumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instrument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstrumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candles<T extends Instrument$candlesArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$candlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "findMany"> | Null>
    signals<T extends Instrument$signalsArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$signalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findMany"> | Null>
    trades<T extends Instrument$tradesArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$tradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany"> | Null>
    funding<T extends Instrument$fundingArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$fundingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Instrument model
   */ 
  interface InstrumentFieldRefs {
    readonly id: FieldRef<"Instrument", 'String'>
    readonly market: FieldRef<"Instrument", 'Market'>
    readonly venue: FieldRef<"Instrument", 'Venue'>
    readonly symbol: FieldRef<"Instrument", 'String'>
    readonly display: FieldRef<"Instrument", 'String'>
    readonly tickSize: FieldRef<"Instrument", 'Float'>
    readonly feeBps: FieldRef<"Instrument", 'Float'>
    readonly slipBps: FieldRef<"Instrument", 'Float'>
    readonly enabled: FieldRef<"Instrument", 'Boolean'>
    readonly lastSyncAt: FieldRef<"Instrument", 'DateTime'>
    readonly createdAt: FieldRef<"Instrument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Instrument findUnique
   */
  export type InstrumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument findUniqueOrThrow
   */
  export type InstrumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument findFirst
   */
  export type InstrumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instruments.
     */
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument findFirstOrThrow
   */
  export type InstrumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instruments.
     */
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument findMany
   */
  export type InstrumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instruments to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument create
   */
  export type InstrumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Instrument.
     */
    data: XOR<InstrumentCreateInput, InstrumentUncheckedCreateInput>
  }

  /**
   * Instrument createMany
   */
  export type InstrumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instruments.
     */
    data: InstrumentCreateManyInput | InstrumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instrument createManyAndReturn
   */
  export type InstrumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Instruments.
     */
    data: InstrumentCreateManyInput | InstrumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instrument update
   */
  export type InstrumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Instrument.
     */
    data: XOR<InstrumentUpdateInput, InstrumentUncheckedUpdateInput>
    /**
     * Choose, which Instrument to update.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument updateMany
   */
  export type InstrumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Instruments.
     */
    data: XOR<InstrumentUpdateManyMutationInput, InstrumentUncheckedUpdateManyInput>
    /**
     * Filter which Instruments to update
     */
    where?: InstrumentWhereInput
  }

  /**
   * Instrument upsert
   */
  export type InstrumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Instrument to update in case it exists.
     */
    where: InstrumentWhereUniqueInput
    /**
     * In case the Instrument found by the `where` argument doesn't exist, create a new Instrument with this data.
     */
    create: XOR<InstrumentCreateInput, InstrumentUncheckedCreateInput>
    /**
     * In case the Instrument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstrumentUpdateInput, InstrumentUncheckedUpdateInput>
  }

  /**
   * Instrument delete
   */
  export type InstrumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter which Instrument to delete.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument deleteMany
   */
  export type InstrumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instruments to delete
     */
    where?: InstrumentWhereInput
  }

  /**
   * Instrument.candles
   */
  export type Instrument$candlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    where?: CandleWhereInput
    orderBy?: CandleOrderByWithRelationInput | CandleOrderByWithRelationInput[]
    cursor?: CandleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandleScalarFieldEnum | CandleScalarFieldEnum[]
  }

  /**
   * Instrument.signals
   */
  export type Instrument$signalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    where?: SignalWhereInput
    orderBy?: SignalOrderByWithRelationInput | SignalOrderByWithRelationInput[]
    cursor?: SignalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignalScalarFieldEnum | SignalScalarFieldEnum[]
  }

  /**
   * Instrument.trades
   */
  export type Instrument$tradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Instrument.funding
   */
  export type Instrument$fundingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    where?: FundingRateWhereInput
    orderBy?: FundingRateOrderByWithRelationInput | FundingRateOrderByWithRelationInput[]
    cursor?: FundingRateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FundingRateScalarFieldEnum | FundingRateScalarFieldEnum[]
  }

  /**
   * Instrument without action
   */
  export type InstrumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
  }


  /**
   * Model Candle
   */

  export type AggregateCandle = {
    _count: CandleCountAggregateOutputType | null
    _avg: CandleAvgAggregateOutputType | null
    _sum: CandleSumAggregateOutputType | null
    _min: CandleMinAggregateOutputType | null
    _max: CandleMaxAggregateOutputType | null
  }

  export type CandleAvgAggregateOutputType = {
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
  }

  export type CandleSumAggregateOutputType = {
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
  }

  export type CandleMinAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    timeframe: string | null
    openTime: Date | null
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
  }

  export type CandleMaxAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    timeframe: string | null
    openTime: Date | null
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
  }

  export type CandleCountAggregateOutputType = {
    id: number
    instrumentId: number
    timeframe: number
    openTime: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    _all: number
  }


  export type CandleAvgAggregateInputType = {
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
  }

  export type CandleSumAggregateInputType = {
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
  }

  export type CandleMinAggregateInputType = {
    id?: true
    instrumentId?: true
    timeframe?: true
    openTime?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
  }

  export type CandleMaxAggregateInputType = {
    id?: true
    instrumentId?: true
    timeframe?: true
    openTime?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
  }

  export type CandleCountAggregateInputType = {
    id?: true
    instrumentId?: true
    timeframe?: true
    openTime?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    _all?: true
  }

  export type CandleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candle to aggregate.
     */
    where?: CandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candles to fetch.
     */
    orderBy?: CandleOrderByWithRelationInput | CandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candles
    **/
    _count?: true | CandleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandleMaxAggregateInputType
  }

  export type GetCandleAggregateType<T extends CandleAggregateArgs> = {
        [P in keyof T & keyof AggregateCandle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandle[P]>
      : GetScalarType<T[P], AggregateCandle[P]>
  }




  export type CandleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandleWhereInput
    orderBy?: CandleOrderByWithAggregationInput | CandleOrderByWithAggregationInput[]
    by: CandleScalarFieldEnum[] | CandleScalarFieldEnum
    having?: CandleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandleCountAggregateInputType | true
    _avg?: CandleAvgAggregateInputType
    _sum?: CandleSumAggregateInputType
    _min?: CandleMinAggregateInputType
    _max?: CandleMaxAggregateInputType
  }

  export type CandleGroupByOutputType = {
    id: string
    instrumentId: string
    timeframe: string
    openTime: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
    _count: CandleCountAggregateOutputType | null
    _avg: CandleAvgAggregateOutputType | null
    _sum: CandleSumAggregateOutputType | null
    _min: CandleMinAggregateOutputType | null
    _max: CandleMaxAggregateOutputType | null
  }

  type GetCandleGroupByPayload<T extends CandleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandleGroupByOutputType[P]>
            : GetScalarType<T[P], CandleGroupByOutputType[P]>
        }
      >
    >


  export type CandleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    timeframe?: boolean
    openTime?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candle"]>

  export type CandleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    timeframe?: boolean
    openTime?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candle"]>

  export type CandleSelectScalar = {
    id?: boolean
    instrumentId?: boolean
    timeframe?: boolean
    openTime?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
  }

  export type CandleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }
  export type CandleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }

  export type $CandlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candle"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instrumentId: string
      timeframe: string
      openTime: Date
      open: number
      high: number
      low: number
      close: number
      volume: number
    }, ExtArgs["result"]["candle"]>
    composites: {}
  }

  type CandleGetPayload<S extends boolean | null | undefined | CandleDefaultArgs> = $Result.GetResult<Prisma.$CandlePayload, S>

  type CandleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CandleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CandleCountAggregateInputType | true
    }

  export interface CandleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candle'], meta: { name: 'Candle' } }
    /**
     * Find zero or one Candle that matches the filter.
     * @param {CandleFindUniqueArgs} args - Arguments to find a Candle
     * @example
     * // Get one Candle
     * const candle = await prisma.candle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandleFindUniqueArgs>(args: SelectSubset<T, CandleFindUniqueArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Candle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CandleFindUniqueOrThrowArgs} args - Arguments to find a Candle
     * @example
     * // Get one Candle
     * const candle = await prisma.candle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandleFindUniqueOrThrowArgs>(args: SelectSubset<T, CandleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Candle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleFindFirstArgs} args - Arguments to find a Candle
     * @example
     * // Get one Candle
     * const candle = await prisma.candle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandleFindFirstArgs>(args?: SelectSubset<T, CandleFindFirstArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Candle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleFindFirstOrThrowArgs} args - Arguments to find a Candle
     * @example
     * // Get one Candle
     * const candle = await prisma.candle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandleFindFirstOrThrowArgs>(args?: SelectSubset<T, CandleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Candles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candles
     * const candles = await prisma.candle.findMany()
     * 
     * // Get first 10 Candles
     * const candles = await prisma.candle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candleWithIdOnly = await prisma.candle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandleFindManyArgs>(args?: SelectSubset<T, CandleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Candle.
     * @param {CandleCreateArgs} args - Arguments to create a Candle.
     * @example
     * // Create one Candle
     * const Candle = await prisma.candle.create({
     *   data: {
     *     // ... data to create a Candle
     *   }
     * })
     * 
     */
    create<T extends CandleCreateArgs>(args: SelectSubset<T, CandleCreateArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Candles.
     * @param {CandleCreateManyArgs} args - Arguments to create many Candles.
     * @example
     * // Create many Candles
     * const candle = await prisma.candle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandleCreateManyArgs>(args?: SelectSubset<T, CandleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Candles and returns the data saved in the database.
     * @param {CandleCreateManyAndReturnArgs} args - Arguments to create many Candles.
     * @example
     * // Create many Candles
     * const candle = await prisma.candle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Candles and only return the `id`
     * const candleWithIdOnly = await prisma.candle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandleCreateManyAndReturnArgs>(args?: SelectSubset<T, CandleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Candle.
     * @param {CandleDeleteArgs} args - Arguments to delete one Candle.
     * @example
     * // Delete one Candle
     * const Candle = await prisma.candle.delete({
     *   where: {
     *     // ... filter to delete one Candle
     *   }
     * })
     * 
     */
    delete<T extends CandleDeleteArgs>(args: SelectSubset<T, CandleDeleteArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Candle.
     * @param {CandleUpdateArgs} args - Arguments to update one Candle.
     * @example
     * // Update one Candle
     * const candle = await prisma.candle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandleUpdateArgs>(args: SelectSubset<T, CandleUpdateArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Candles.
     * @param {CandleDeleteManyArgs} args - Arguments to filter Candles to delete.
     * @example
     * // Delete a few Candles
     * const { count } = await prisma.candle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandleDeleteManyArgs>(args?: SelectSubset<T, CandleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candles
     * const candle = await prisma.candle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandleUpdateManyArgs>(args: SelectSubset<T, CandleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Candle.
     * @param {CandleUpsertArgs} args - Arguments to update or create a Candle.
     * @example
     * // Update or create a Candle
     * const candle = await prisma.candle.upsert({
     *   create: {
     *     // ... data to create a Candle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candle we want to update
     *   }
     * })
     */
    upsert<T extends CandleUpsertArgs>(args: SelectSubset<T, CandleUpsertArgs<ExtArgs>>): Prisma__CandleClient<$Result.GetResult<Prisma.$CandlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Candles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleCountArgs} args - Arguments to filter Candles to count.
     * @example
     * // Count the number of Candles
     * const count = await prisma.candle.count({
     *   where: {
     *     // ... the filter for the Candles we want to count
     *   }
     * })
    **/
    count<T extends CandleCountArgs>(
      args?: Subset<T, CandleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandleAggregateArgs>(args: Subset<T, CandleAggregateArgs>): Prisma.PrismaPromise<GetCandleAggregateType<T>>

    /**
     * Group by Candle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandleGroupByArgs['orderBy'] }
        : { orderBy?: CandleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candle model
   */
  readonly fields: CandleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Candle model
   */ 
  interface CandleFieldRefs {
    readonly id: FieldRef<"Candle", 'String'>
    readonly instrumentId: FieldRef<"Candle", 'String'>
    readonly timeframe: FieldRef<"Candle", 'String'>
    readonly openTime: FieldRef<"Candle", 'DateTime'>
    readonly open: FieldRef<"Candle", 'Float'>
    readonly high: FieldRef<"Candle", 'Float'>
    readonly low: FieldRef<"Candle", 'Float'>
    readonly close: FieldRef<"Candle", 'Float'>
    readonly volume: FieldRef<"Candle", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Candle findUnique
   */
  export type CandleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * Filter, which Candle to fetch.
     */
    where: CandleWhereUniqueInput
  }

  /**
   * Candle findUniqueOrThrow
   */
  export type CandleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * Filter, which Candle to fetch.
     */
    where: CandleWhereUniqueInput
  }

  /**
   * Candle findFirst
   */
  export type CandleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * Filter, which Candle to fetch.
     */
    where?: CandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candles to fetch.
     */
    orderBy?: CandleOrderByWithRelationInput | CandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candles.
     */
    cursor?: CandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candles.
     */
    distinct?: CandleScalarFieldEnum | CandleScalarFieldEnum[]
  }

  /**
   * Candle findFirstOrThrow
   */
  export type CandleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * Filter, which Candle to fetch.
     */
    where?: CandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candles to fetch.
     */
    orderBy?: CandleOrderByWithRelationInput | CandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candles.
     */
    cursor?: CandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candles.
     */
    distinct?: CandleScalarFieldEnum | CandleScalarFieldEnum[]
  }

  /**
   * Candle findMany
   */
  export type CandleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * Filter, which Candles to fetch.
     */
    where?: CandleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candles to fetch.
     */
    orderBy?: CandleOrderByWithRelationInput | CandleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candles.
     */
    cursor?: CandleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candles.
     */
    skip?: number
    distinct?: CandleScalarFieldEnum | CandleScalarFieldEnum[]
  }

  /**
   * Candle create
   */
  export type CandleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * The data needed to create a Candle.
     */
    data: XOR<CandleCreateInput, CandleUncheckedCreateInput>
  }

  /**
   * Candle createMany
   */
  export type CandleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candles.
     */
    data: CandleCreateManyInput | CandleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candle createManyAndReturn
   */
  export type CandleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Candles.
     */
    data: CandleCreateManyInput | CandleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candle update
   */
  export type CandleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * The data needed to update a Candle.
     */
    data: XOR<CandleUpdateInput, CandleUncheckedUpdateInput>
    /**
     * Choose, which Candle to update.
     */
    where: CandleWhereUniqueInput
  }

  /**
   * Candle updateMany
   */
  export type CandleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candles.
     */
    data: XOR<CandleUpdateManyMutationInput, CandleUncheckedUpdateManyInput>
    /**
     * Filter which Candles to update
     */
    where?: CandleWhereInput
  }

  /**
   * Candle upsert
   */
  export type CandleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * The filter to search for the Candle to update in case it exists.
     */
    where: CandleWhereUniqueInput
    /**
     * In case the Candle found by the `where` argument doesn't exist, create a new Candle with this data.
     */
    create: XOR<CandleCreateInput, CandleUncheckedCreateInput>
    /**
     * In case the Candle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandleUpdateInput, CandleUncheckedUpdateInput>
  }

  /**
   * Candle delete
   */
  export type CandleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
    /**
     * Filter which Candle to delete.
     */
    where: CandleWhereUniqueInput
  }

  /**
   * Candle deleteMany
   */
  export type CandleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candles to delete
     */
    where?: CandleWhereInput
  }

  /**
   * Candle without action
   */
  export type CandleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candle
     */
    select?: CandleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandleInclude<ExtArgs> | null
  }


  /**
   * Model Setup
   */

  export type AggregateSetup = {
    _count: SetupCountAggregateOutputType | null
    _avg: SetupAvgAggregateOutputType | null
    _sum: SetupSumAggregateOutputType | null
    _min: SetupMinAggregateOutputType | null
    _max: SetupMaxAggregateOutputType | null
  }

  export type SetupAvgAggregateOutputType = {
    atrTarget: number | null
    atrStop: number | null
    horizonBars: number | null
  }

  export type SetupSumAggregateOutputType = {
    atrTarget: number | null
    atrStop: number | null
    horizonBars: number | null
  }

  export type SetupMinAggregateOutputType = {
    id: string | null
    key: string | null
    name: string | null
    description: string | null
    timeframe: string | null
    side: $Enums.Side | null
    atrTarget: number | null
    entryStyle: string | null
    manageMode: string | null
    atrStop: number | null
    horizonBars: number | null
    enabled: boolean | null
    autoDisabledAt: Date | null
    reviewNote: string | null
    createdAt: Date | null
  }

  export type SetupMaxAggregateOutputType = {
    id: string | null
    key: string | null
    name: string | null
    description: string | null
    timeframe: string | null
    side: $Enums.Side | null
    atrTarget: number | null
    entryStyle: string | null
    manageMode: string | null
    atrStop: number | null
    horizonBars: number | null
    enabled: boolean | null
    autoDisabledAt: Date | null
    reviewNote: string | null
    createdAt: Date | null
  }

  export type SetupCountAggregateOutputType = {
    id: number
    key: number
    name: number
    description: number
    timeframe: number
    side: number
    atrTarget: number
    entryStyle: number
    manageMode: number
    atrStop: number
    horizonBars: number
    enabled: number
    autoDisabledAt: number
    reviewNote: number
    createdAt: number
    _all: number
  }


  export type SetupAvgAggregateInputType = {
    atrTarget?: true
    atrStop?: true
    horizonBars?: true
  }

  export type SetupSumAggregateInputType = {
    atrTarget?: true
    atrStop?: true
    horizonBars?: true
  }

  export type SetupMinAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    timeframe?: true
    side?: true
    atrTarget?: true
    entryStyle?: true
    manageMode?: true
    atrStop?: true
    horizonBars?: true
    enabled?: true
    autoDisabledAt?: true
    reviewNote?: true
    createdAt?: true
  }

  export type SetupMaxAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    timeframe?: true
    side?: true
    atrTarget?: true
    entryStyle?: true
    manageMode?: true
    atrStop?: true
    horizonBars?: true
    enabled?: true
    autoDisabledAt?: true
    reviewNote?: true
    createdAt?: true
  }

  export type SetupCountAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    timeframe?: true
    side?: true
    atrTarget?: true
    entryStyle?: true
    manageMode?: true
    atrStop?: true
    horizonBars?: true
    enabled?: true
    autoDisabledAt?: true
    reviewNote?: true
    createdAt?: true
    _all?: true
  }

  export type SetupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setup to aggregate.
     */
    where?: SetupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setups to fetch.
     */
    orderBy?: SetupOrderByWithRelationInput | SetupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SetupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Setups
    **/
    _count?: true | SetupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SetupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SetupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SetupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SetupMaxAggregateInputType
  }

  export type GetSetupAggregateType<T extends SetupAggregateArgs> = {
        [P in keyof T & keyof AggregateSetup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetup[P]>
      : GetScalarType<T[P], AggregateSetup[P]>
  }




  export type SetupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetupWhereInput
    orderBy?: SetupOrderByWithAggregationInput | SetupOrderByWithAggregationInput[]
    by: SetupScalarFieldEnum[] | SetupScalarFieldEnum
    having?: SetupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SetupCountAggregateInputType | true
    _avg?: SetupAvgAggregateInputType
    _sum?: SetupSumAggregateInputType
    _min?: SetupMinAggregateInputType
    _max?: SetupMaxAggregateInputType
  }

  export type SetupGroupByOutputType = {
    id: string
    key: string
    name: string
    description: string
    timeframe: string
    side: $Enums.Side
    atrTarget: number
    entryStyle: string
    manageMode: string
    atrStop: number
    horizonBars: number
    enabled: boolean
    autoDisabledAt: Date | null
    reviewNote: string | null
    createdAt: Date
    _count: SetupCountAggregateOutputType | null
    _avg: SetupAvgAggregateOutputType | null
    _sum: SetupSumAggregateOutputType | null
    _min: SetupMinAggregateOutputType | null
    _max: SetupMaxAggregateOutputType | null
  }

  type GetSetupGroupByPayload<T extends SetupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SetupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SetupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SetupGroupByOutputType[P]>
            : GetScalarType<T[P], SetupGroupByOutputType[P]>
        }
      >
    >


  export type SetupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    timeframe?: boolean
    side?: boolean
    atrTarget?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    atrStop?: boolean
    horizonBars?: boolean
    enabled?: boolean
    autoDisabledAt?: boolean
    reviewNote?: boolean
    createdAt?: boolean
    signals?: boolean | Setup$signalsArgs<ExtArgs>
    models?: boolean | Setup$modelsArgs<ExtArgs>
    runs?: boolean | Setup$runsArgs<ExtArgs>
    _count?: boolean | SetupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["setup"]>

  export type SetupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    timeframe?: boolean
    side?: boolean
    atrTarget?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    atrStop?: boolean
    horizonBars?: boolean
    enabled?: boolean
    autoDisabledAt?: boolean
    reviewNote?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["setup"]>

  export type SetupSelectScalar = {
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    timeframe?: boolean
    side?: boolean
    atrTarget?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    atrStop?: boolean
    horizonBars?: boolean
    enabled?: boolean
    autoDisabledAt?: boolean
    reviewNote?: boolean
    createdAt?: boolean
  }

  export type SetupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signals?: boolean | Setup$signalsArgs<ExtArgs>
    models?: boolean | Setup$modelsArgs<ExtArgs>
    runs?: boolean | Setup$runsArgs<ExtArgs>
    _count?: boolean | SetupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SetupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SetupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setup"
    objects: {
      signals: Prisma.$SignalPayload<ExtArgs>[]
      models: Prisma.$ModelFitPayload<ExtArgs>[]
      runs: Prisma.$BacktestRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      name: string
      description: string
      timeframe: string
      side: $Enums.Side
      atrTarget: number
      entryStyle: string
      manageMode: string
      atrStop: number
      horizonBars: number
      enabled: boolean
      autoDisabledAt: Date | null
      reviewNote: string | null
      createdAt: Date
    }, ExtArgs["result"]["setup"]>
    composites: {}
  }

  type SetupGetPayload<S extends boolean | null | undefined | SetupDefaultArgs> = $Result.GetResult<Prisma.$SetupPayload, S>

  type SetupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SetupFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SetupCountAggregateInputType | true
    }

  export interface SetupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setup'], meta: { name: 'Setup' } }
    /**
     * Find zero or one Setup that matches the filter.
     * @param {SetupFindUniqueArgs} args - Arguments to find a Setup
     * @example
     * // Get one Setup
     * const setup = await prisma.setup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SetupFindUniqueArgs>(args: SelectSubset<T, SetupFindUniqueArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Setup that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SetupFindUniqueOrThrowArgs} args - Arguments to find a Setup
     * @example
     * // Get one Setup
     * const setup = await prisma.setup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SetupFindUniqueOrThrowArgs>(args: SelectSubset<T, SetupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Setup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupFindFirstArgs} args - Arguments to find a Setup
     * @example
     * // Get one Setup
     * const setup = await prisma.setup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SetupFindFirstArgs>(args?: SelectSubset<T, SetupFindFirstArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Setup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupFindFirstOrThrowArgs} args - Arguments to find a Setup
     * @example
     * // Get one Setup
     * const setup = await prisma.setup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SetupFindFirstOrThrowArgs>(args?: SelectSubset<T, SetupFindFirstOrThrowArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Setups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Setups
     * const setups = await prisma.setup.findMany()
     * 
     * // Get first 10 Setups
     * const setups = await prisma.setup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const setupWithIdOnly = await prisma.setup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SetupFindManyArgs>(args?: SelectSubset<T, SetupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Setup.
     * @param {SetupCreateArgs} args - Arguments to create a Setup.
     * @example
     * // Create one Setup
     * const Setup = await prisma.setup.create({
     *   data: {
     *     // ... data to create a Setup
     *   }
     * })
     * 
     */
    create<T extends SetupCreateArgs>(args: SelectSubset<T, SetupCreateArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Setups.
     * @param {SetupCreateManyArgs} args - Arguments to create many Setups.
     * @example
     * // Create many Setups
     * const setup = await prisma.setup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SetupCreateManyArgs>(args?: SelectSubset<T, SetupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Setups and returns the data saved in the database.
     * @param {SetupCreateManyAndReturnArgs} args - Arguments to create many Setups.
     * @example
     * // Create many Setups
     * const setup = await prisma.setup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Setups and only return the `id`
     * const setupWithIdOnly = await prisma.setup.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SetupCreateManyAndReturnArgs>(args?: SelectSubset<T, SetupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Setup.
     * @param {SetupDeleteArgs} args - Arguments to delete one Setup.
     * @example
     * // Delete one Setup
     * const Setup = await prisma.setup.delete({
     *   where: {
     *     // ... filter to delete one Setup
     *   }
     * })
     * 
     */
    delete<T extends SetupDeleteArgs>(args: SelectSubset<T, SetupDeleteArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Setup.
     * @param {SetupUpdateArgs} args - Arguments to update one Setup.
     * @example
     * // Update one Setup
     * const setup = await prisma.setup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SetupUpdateArgs>(args: SelectSubset<T, SetupUpdateArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Setups.
     * @param {SetupDeleteManyArgs} args - Arguments to filter Setups to delete.
     * @example
     * // Delete a few Setups
     * const { count } = await prisma.setup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SetupDeleteManyArgs>(args?: SelectSubset<T, SetupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Setups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Setups
     * const setup = await prisma.setup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SetupUpdateManyArgs>(args: SelectSubset<T, SetupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Setup.
     * @param {SetupUpsertArgs} args - Arguments to update or create a Setup.
     * @example
     * // Update or create a Setup
     * const setup = await prisma.setup.upsert({
     *   create: {
     *     // ... data to create a Setup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setup we want to update
     *   }
     * })
     */
    upsert<T extends SetupUpsertArgs>(args: SelectSubset<T, SetupUpsertArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Setups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupCountArgs} args - Arguments to filter Setups to count.
     * @example
     * // Count the number of Setups
     * const count = await prisma.setup.count({
     *   where: {
     *     // ... the filter for the Setups we want to count
     *   }
     * })
    **/
    count<T extends SetupCountArgs>(
      args?: Subset<T, SetupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SetupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SetupAggregateArgs>(args: Subset<T, SetupAggregateArgs>): Prisma.PrismaPromise<GetSetupAggregateType<T>>

    /**
     * Group by Setup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SetupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SetupGroupByArgs['orderBy'] }
        : { orderBy?: SetupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SetupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSetupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setup model
   */
  readonly fields: SetupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SetupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    signals<T extends Setup$signalsArgs<ExtArgs> = {}>(args?: Subset<T, Setup$signalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findMany"> | Null>
    models<T extends Setup$modelsArgs<ExtArgs> = {}>(args?: Subset<T, Setup$modelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "findMany"> | Null>
    runs<T extends Setup$runsArgs<ExtArgs> = {}>(args?: Subset<T, Setup$runsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setup model
   */ 
  interface SetupFieldRefs {
    readonly id: FieldRef<"Setup", 'String'>
    readonly key: FieldRef<"Setup", 'String'>
    readonly name: FieldRef<"Setup", 'String'>
    readonly description: FieldRef<"Setup", 'String'>
    readonly timeframe: FieldRef<"Setup", 'String'>
    readonly side: FieldRef<"Setup", 'Side'>
    readonly atrTarget: FieldRef<"Setup", 'Float'>
    readonly entryStyle: FieldRef<"Setup", 'String'>
    readonly manageMode: FieldRef<"Setup", 'String'>
    readonly atrStop: FieldRef<"Setup", 'Float'>
    readonly horizonBars: FieldRef<"Setup", 'Int'>
    readonly enabled: FieldRef<"Setup", 'Boolean'>
    readonly autoDisabledAt: FieldRef<"Setup", 'DateTime'>
    readonly reviewNote: FieldRef<"Setup", 'String'>
    readonly createdAt: FieldRef<"Setup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setup findUnique
   */
  export type SetupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * Filter, which Setup to fetch.
     */
    where: SetupWhereUniqueInput
  }

  /**
   * Setup findUniqueOrThrow
   */
  export type SetupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * Filter, which Setup to fetch.
     */
    where: SetupWhereUniqueInput
  }

  /**
   * Setup findFirst
   */
  export type SetupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * Filter, which Setup to fetch.
     */
    where?: SetupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setups to fetch.
     */
    orderBy?: SetupOrderByWithRelationInput | SetupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Setups.
     */
    cursor?: SetupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Setups.
     */
    distinct?: SetupScalarFieldEnum | SetupScalarFieldEnum[]
  }

  /**
   * Setup findFirstOrThrow
   */
  export type SetupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * Filter, which Setup to fetch.
     */
    where?: SetupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setups to fetch.
     */
    orderBy?: SetupOrderByWithRelationInput | SetupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Setups.
     */
    cursor?: SetupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Setups.
     */
    distinct?: SetupScalarFieldEnum | SetupScalarFieldEnum[]
  }

  /**
   * Setup findMany
   */
  export type SetupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * Filter, which Setups to fetch.
     */
    where?: SetupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setups to fetch.
     */
    orderBy?: SetupOrderByWithRelationInput | SetupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Setups.
     */
    cursor?: SetupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setups.
     */
    skip?: number
    distinct?: SetupScalarFieldEnum | SetupScalarFieldEnum[]
  }

  /**
   * Setup create
   */
  export type SetupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * The data needed to create a Setup.
     */
    data: XOR<SetupCreateInput, SetupUncheckedCreateInput>
  }

  /**
   * Setup createMany
   */
  export type SetupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Setups.
     */
    data: SetupCreateManyInput | SetupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setup createManyAndReturn
   */
  export type SetupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Setups.
     */
    data: SetupCreateManyInput | SetupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setup update
   */
  export type SetupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * The data needed to update a Setup.
     */
    data: XOR<SetupUpdateInput, SetupUncheckedUpdateInput>
    /**
     * Choose, which Setup to update.
     */
    where: SetupWhereUniqueInput
  }

  /**
   * Setup updateMany
   */
  export type SetupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Setups.
     */
    data: XOR<SetupUpdateManyMutationInput, SetupUncheckedUpdateManyInput>
    /**
     * Filter which Setups to update
     */
    where?: SetupWhereInput
  }

  /**
   * Setup upsert
   */
  export type SetupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * The filter to search for the Setup to update in case it exists.
     */
    where: SetupWhereUniqueInput
    /**
     * In case the Setup found by the `where` argument doesn't exist, create a new Setup with this data.
     */
    create: XOR<SetupCreateInput, SetupUncheckedCreateInput>
    /**
     * In case the Setup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SetupUpdateInput, SetupUncheckedUpdateInput>
  }

  /**
   * Setup delete
   */
  export type SetupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
    /**
     * Filter which Setup to delete.
     */
    where: SetupWhereUniqueInput
  }

  /**
   * Setup deleteMany
   */
  export type SetupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setups to delete
     */
    where?: SetupWhereInput
  }

  /**
   * Setup.signals
   */
  export type Setup$signalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    where?: SignalWhereInput
    orderBy?: SignalOrderByWithRelationInput | SignalOrderByWithRelationInput[]
    cursor?: SignalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignalScalarFieldEnum | SignalScalarFieldEnum[]
  }

  /**
   * Setup.models
   */
  export type Setup$modelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    where?: ModelFitWhereInput
    orderBy?: ModelFitOrderByWithRelationInput | ModelFitOrderByWithRelationInput[]
    cursor?: ModelFitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModelFitScalarFieldEnum | ModelFitScalarFieldEnum[]
  }

  /**
   * Setup.runs
   */
  export type Setup$runsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    where?: BacktestRunWhereInput
    orderBy?: BacktestRunOrderByWithRelationInput | BacktestRunOrderByWithRelationInput[]
    cursor?: BacktestRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BacktestRunScalarFieldEnum | BacktestRunScalarFieldEnum[]
  }

  /**
   * Setup without action
   */
  export type SetupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setup
     */
    select?: SetupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetupInclude<ExtArgs> | null
  }


  /**
   * Model Signal
   */

  export type AggregateSignal = {
    _count: SignalCountAggregateOutputType | null
    _avg: SignalAvgAggregateOutputType | null
    _sum: SignalSumAggregateOutputType | null
    _min: SignalMinAggregateOutputType | null
    _max: SignalMaxAggregateOutputType | null
  }

  export type SignalAvgAggregateOutputType = {
    entry: number | null
    stop: number | null
    target: number | null
    rr: number | null
    atr: number | null
    rawP: number | null
    calP: number | null
    edge: number | null
    riskR: number | null
    exitPrice: number | null
    rMultiple: number | null
  }

  export type SignalSumAggregateOutputType = {
    entry: number | null
    stop: number | null
    target: number | null
    rr: number | null
    atr: number | null
    rawP: number | null
    calP: number | null
    edge: number | null
    riskR: number | null
    exitPrice: number | null
    rMultiple: number | null
  }

  export type SignalMinAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    setupId: string | null
    barTime: Date | null
    lockedAt: Date | null
    entry: number | null
    stop: number | null
    target: number | null
    entryStyle: string | null
    manageMode: string | null
    rr: number | null
    atr: number | null
    rawP: number | null
    calP: number | null
    edge: number | null
    riskR: number | null
    modelVersion: string | null
    state: $Enums.SignalState | null
    exitPrice: number | null
    exitTime: Date | null
    rMultiple: number | null
    settledAt: Date | null
    alertedAt: Date | null
    exitAlertedAt: Date | null
    note: string | null
  }

  export type SignalMaxAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    setupId: string | null
    barTime: Date | null
    lockedAt: Date | null
    entry: number | null
    stop: number | null
    target: number | null
    entryStyle: string | null
    manageMode: string | null
    rr: number | null
    atr: number | null
    rawP: number | null
    calP: number | null
    edge: number | null
    riskR: number | null
    modelVersion: string | null
    state: $Enums.SignalState | null
    exitPrice: number | null
    exitTime: Date | null
    rMultiple: number | null
    settledAt: Date | null
    alertedAt: Date | null
    exitAlertedAt: Date | null
    note: string | null
  }

  export type SignalCountAggregateOutputType = {
    id: number
    instrumentId: number
    setupId: number
    barTime: number
    lockedAt: number
    entry: number
    stop: number
    target: number
    entryStyle: number
    manageMode: number
    rr: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR: number
    features: number
    modelVersion: number
    state: number
    exitPrice: number
    exitTime: number
    rMultiple: number
    settledAt: number
    alertedAt: number
    exitAlertedAt: number
    note: number
    _all: number
  }


  export type SignalAvgAggregateInputType = {
    entry?: true
    stop?: true
    target?: true
    rr?: true
    atr?: true
    rawP?: true
    calP?: true
    edge?: true
    riskR?: true
    exitPrice?: true
    rMultiple?: true
  }

  export type SignalSumAggregateInputType = {
    entry?: true
    stop?: true
    target?: true
    rr?: true
    atr?: true
    rawP?: true
    calP?: true
    edge?: true
    riskR?: true
    exitPrice?: true
    rMultiple?: true
  }

  export type SignalMinAggregateInputType = {
    id?: true
    instrumentId?: true
    setupId?: true
    barTime?: true
    lockedAt?: true
    entry?: true
    stop?: true
    target?: true
    entryStyle?: true
    manageMode?: true
    rr?: true
    atr?: true
    rawP?: true
    calP?: true
    edge?: true
    riskR?: true
    modelVersion?: true
    state?: true
    exitPrice?: true
    exitTime?: true
    rMultiple?: true
    settledAt?: true
    alertedAt?: true
    exitAlertedAt?: true
    note?: true
  }

  export type SignalMaxAggregateInputType = {
    id?: true
    instrumentId?: true
    setupId?: true
    barTime?: true
    lockedAt?: true
    entry?: true
    stop?: true
    target?: true
    entryStyle?: true
    manageMode?: true
    rr?: true
    atr?: true
    rawP?: true
    calP?: true
    edge?: true
    riskR?: true
    modelVersion?: true
    state?: true
    exitPrice?: true
    exitTime?: true
    rMultiple?: true
    settledAt?: true
    alertedAt?: true
    exitAlertedAt?: true
    note?: true
  }

  export type SignalCountAggregateInputType = {
    id?: true
    instrumentId?: true
    setupId?: true
    barTime?: true
    lockedAt?: true
    entry?: true
    stop?: true
    target?: true
    entryStyle?: true
    manageMode?: true
    rr?: true
    atr?: true
    rawP?: true
    calP?: true
    edge?: true
    riskR?: true
    features?: true
    modelVersion?: true
    state?: true
    exitPrice?: true
    exitTime?: true
    rMultiple?: true
    settledAt?: true
    alertedAt?: true
    exitAlertedAt?: true
    note?: true
    _all?: true
  }

  export type SignalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signal to aggregate.
     */
    where?: SignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signals to fetch.
     */
    orderBy?: SignalOrderByWithRelationInput | SignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Signals
    **/
    _count?: true | SignalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SignalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SignalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignalMaxAggregateInputType
  }

  export type GetSignalAggregateType<T extends SignalAggregateArgs> = {
        [P in keyof T & keyof AggregateSignal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignal[P]>
      : GetScalarType<T[P], AggregateSignal[P]>
  }




  export type SignalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignalWhereInput
    orderBy?: SignalOrderByWithAggregationInput | SignalOrderByWithAggregationInput[]
    by: SignalScalarFieldEnum[] | SignalScalarFieldEnum
    having?: SignalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignalCountAggregateInputType | true
    _avg?: SignalAvgAggregateInputType
    _sum?: SignalSumAggregateInputType
    _min?: SignalMinAggregateInputType
    _max?: SignalMaxAggregateInputType
  }

  export type SignalGroupByOutputType = {
    id: string
    instrumentId: string
    setupId: string
    barTime: Date
    lockedAt: Date
    entry: number
    stop: number
    target: number
    entryStyle: string
    manageMode: string
    rr: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR: number
    features: JsonValue
    modelVersion: string
    state: $Enums.SignalState
    exitPrice: number | null
    exitTime: Date | null
    rMultiple: number | null
    settledAt: Date | null
    alertedAt: Date | null
    exitAlertedAt: Date | null
    note: string | null
    _count: SignalCountAggregateOutputType | null
    _avg: SignalAvgAggregateOutputType | null
    _sum: SignalSumAggregateOutputType | null
    _min: SignalMinAggregateOutputType | null
    _max: SignalMaxAggregateOutputType | null
  }

  type GetSignalGroupByPayload<T extends SignalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignalGroupByOutputType[P]>
            : GetScalarType<T[P], SignalGroupByOutputType[P]>
        }
      >
    >


  export type SignalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    setupId?: boolean
    barTime?: boolean
    lockedAt?: boolean
    entry?: boolean
    stop?: boolean
    target?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    rr?: boolean
    atr?: boolean
    rawP?: boolean
    calP?: boolean
    edge?: boolean
    riskR?: boolean
    features?: boolean
    modelVersion?: boolean
    state?: boolean
    exitPrice?: boolean
    exitTime?: boolean
    rMultiple?: boolean
    settledAt?: boolean
    alertedAt?: boolean
    exitAlertedAt?: boolean
    note?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signal"]>

  export type SignalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    setupId?: boolean
    barTime?: boolean
    lockedAt?: boolean
    entry?: boolean
    stop?: boolean
    target?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    rr?: boolean
    atr?: boolean
    rawP?: boolean
    calP?: boolean
    edge?: boolean
    riskR?: boolean
    features?: boolean
    modelVersion?: boolean
    state?: boolean
    exitPrice?: boolean
    exitTime?: boolean
    rMultiple?: boolean
    settledAt?: boolean
    alertedAt?: boolean
    exitAlertedAt?: boolean
    note?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signal"]>

  export type SignalSelectScalar = {
    id?: boolean
    instrumentId?: boolean
    setupId?: boolean
    barTime?: boolean
    lockedAt?: boolean
    entry?: boolean
    stop?: boolean
    target?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    rr?: boolean
    atr?: boolean
    rawP?: boolean
    calP?: boolean
    edge?: boolean
    riskR?: boolean
    features?: boolean
    modelVersion?: boolean
    state?: boolean
    exitPrice?: boolean
    exitTime?: boolean
    rMultiple?: boolean
    settledAt?: boolean
    alertedAt?: boolean
    exitAlertedAt?: boolean
    note?: boolean
  }

  export type SignalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }
  export type SignalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }

  export type $SignalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Signal"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs>
      setup: Prisma.$SetupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instrumentId: string
      setupId: string
      barTime: Date
      lockedAt: Date
      entry: number
      stop: number
      target: number
      entryStyle: string
      manageMode: string
      rr: number
      atr: number
      rawP: number
      calP: number
      edge: number
      riskR: number
      features: Prisma.JsonValue
      modelVersion: string
      state: $Enums.SignalState
      exitPrice: number | null
      exitTime: Date | null
      rMultiple: number | null
      settledAt: Date | null
      alertedAt: Date | null
      exitAlertedAt: Date | null
      note: string | null
    }, ExtArgs["result"]["signal"]>
    composites: {}
  }

  type SignalGetPayload<S extends boolean | null | undefined | SignalDefaultArgs> = $Result.GetResult<Prisma.$SignalPayload, S>

  type SignalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SignalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SignalCountAggregateInputType | true
    }

  export interface SignalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Signal'], meta: { name: 'Signal' } }
    /**
     * Find zero or one Signal that matches the filter.
     * @param {SignalFindUniqueArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignalFindUniqueArgs>(args: SelectSubset<T, SignalFindUniqueArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Signal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SignalFindUniqueOrThrowArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignalFindUniqueOrThrowArgs>(args: SelectSubset<T, SignalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Signal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalFindFirstArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignalFindFirstArgs>(args?: SelectSubset<T, SignalFindFirstArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Signal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalFindFirstOrThrowArgs} args - Arguments to find a Signal
     * @example
     * // Get one Signal
     * const signal = await prisma.signal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignalFindFirstOrThrowArgs>(args?: SelectSubset<T, SignalFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Signals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Signals
     * const signals = await prisma.signal.findMany()
     * 
     * // Get first 10 Signals
     * const signals = await prisma.signal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signalWithIdOnly = await prisma.signal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignalFindManyArgs>(args?: SelectSubset<T, SignalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Signal.
     * @param {SignalCreateArgs} args - Arguments to create a Signal.
     * @example
     * // Create one Signal
     * const Signal = await prisma.signal.create({
     *   data: {
     *     // ... data to create a Signal
     *   }
     * })
     * 
     */
    create<T extends SignalCreateArgs>(args: SelectSubset<T, SignalCreateArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Signals.
     * @param {SignalCreateManyArgs} args - Arguments to create many Signals.
     * @example
     * // Create many Signals
     * const signal = await prisma.signal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignalCreateManyArgs>(args?: SelectSubset<T, SignalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Signals and returns the data saved in the database.
     * @param {SignalCreateManyAndReturnArgs} args - Arguments to create many Signals.
     * @example
     * // Create many Signals
     * const signal = await prisma.signal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Signals and only return the `id`
     * const signalWithIdOnly = await prisma.signal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignalCreateManyAndReturnArgs>(args?: SelectSubset<T, SignalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Signal.
     * @param {SignalDeleteArgs} args - Arguments to delete one Signal.
     * @example
     * // Delete one Signal
     * const Signal = await prisma.signal.delete({
     *   where: {
     *     // ... filter to delete one Signal
     *   }
     * })
     * 
     */
    delete<T extends SignalDeleteArgs>(args: SelectSubset<T, SignalDeleteArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Signal.
     * @param {SignalUpdateArgs} args - Arguments to update one Signal.
     * @example
     * // Update one Signal
     * const signal = await prisma.signal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignalUpdateArgs>(args: SelectSubset<T, SignalUpdateArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Signals.
     * @param {SignalDeleteManyArgs} args - Arguments to filter Signals to delete.
     * @example
     * // Delete a few Signals
     * const { count } = await prisma.signal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignalDeleteManyArgs>(args?: SelectSubset<T, SignalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Signals
     * const signal = await prisma.signal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignalUpdateManyArgs>(args: SelectSubset<T, SignalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Signal.
     * @param {SignalUpsertArgs} args - Arguments to update or create a Signal.
     * @example
     * // Update or create a Signal
     * const signal = await prisma.signal.upsert({
     *   create: {
     *     // ... data to create a Signal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Signal we want to update
     *   }
     * })
     */
    upsert<T extends SignalUpsertArgs>(args: SelectSubset<T, SignalUpsertArgs<ExtArgs>>): Prisma__SignalClient<$Result.GetResult<Prisma.$SignalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Signals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalCountArgs} args - Arguments to filter Signals to count.
     * @example
     * // Count the number of Signals
     * const count = await prisma.signal.count({
     *   where: {
     *     // ... the filter for the Signals we want to count
     *   }
     * })
    **/
    count<T extends SignalCountArgs>(
      args?: Subset<T, SignalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Signal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SignalAggregateArgs>(args: Subset<T, SignalAggregateArgs>): Prisma.PrismaPromise<GetSignalAggregateType<T>>

    /**
     * Group by Signal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SignalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignalGroupByArgs['orderBy'] }
        : { orderBy?: SignalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SignalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Signal model
   */
  readonly fields: SignalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Signal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    setup<T extends SetupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SetupDefaultArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Signal model
   */ 
  interface SignalFieldRefs {
    readonly id: FieldRef<"Signal", 'String'>
    readonly instrumentId: FieldRef<"Signal", 'String'>
    readonly setupId: FieldRef<"Signal", 'String'>
    readonly barTime: FieldRef<"Signal", 'DateTime'>
    readonly lockedAt: FieldRef<"Signal", 'DateTime'>
    readonly entry: FieldRef<"Signal", 'Float'>
    readonly stop: FieldRef<"Signal", 'Float'>
    readonly target: FieldRef<"Signal", 'Float'>
    readonly entryStyle: FieldRef<"Signal", 'String'>
    readonly manageMode: FieldRef<"Signal", 'String'>
    readonly rr: FieldRef<"Signal", 'Float'>
    readonly atr: FieldRef<"Signal", 'Float'>
    readonly rawP: FieldRef<"Signal", 'Float'>
    readonly calP: FieldRef<"Signal", 'Float'>
    readonly edge: FieldRef<"Signal", 'Float'>
    readonly riskR: FieldRef<"Signal", 'Float'>
    readonly features: FieldRef<"Signal", 'Json'>
    readonly modelVersion: FieldRef<"Signal", 'String'>
    readonly state: FieldRef<"Signal", 'SignalState'>
    readonly exitPrice: FieldRef<"Signal", 'Float'>
    readonly exitTime: FieldRef<"Signal", 'DateTime'>
    readonly rMultiple: FieldRef<"Signal", 'Float'>
    readonly settledAt: FieldRef<"Signal", 'DateTime'>
    readonly alertedAt: FieldRef<"Signal", 'DateTime'>
    readonly exitAlertedAt: FieldRef<"Signal", 'DateTime'>
    readonly note: FieldRef<"Signal", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Signal findUnique
   */
  export type SignalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * Filter, which Signal to fetch.
     */
    where: SignalWhereUniqueInput
  }

  /**
   * Signal findUniqueOrThrow
   */
  export type SignalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * Filter, which Signal to fetch.
     */
    where: SignalWhereUniqueInput
  }

  /**
   * Signal findFirst
   */
  export type SignalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * Filter, which Signal to fetch.
     */
    where?: SignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signals to fetch.
     */
    orderBy?: SignalOrderByWithRelationInput | SignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signals.
     */
    cursor?: SignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signals.
     */
    distinct?: SignalScalarFieldEnum | SignalScalarFieldEnum[]
  }

  /**
   * Signal findFirstOrThrow
   */
  export type SignalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * Filter, which Signal to fetch.
     */
    where?: SignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signals to fetch.
     */
    orderBy?: SignalOrderByWithRelationInput | SignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signals.
     */
    cursor?: SignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signals.
     */
    distinct?: SignalScalarFieldEnum | SignalScalarFieldEnum[]
  }

  /**
   * Signal findMany
   */
  export type SignalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * Filter, which Signals to fetch.
     */
    where?: SignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signals to fetch.
     */
    orderBy?: SignalOrderByWithRelationInput | SignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Signals.
     */
    cursor?: SignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signals.
     */
    skip?: number
    distinct?: SignalScalarFieldEnum | SignalScalarFieldEnum[]
  }

  /**
   * Signal create
   */
  export type SignalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * The data needed to create a Signal.
     */
    data: XOR<SignalCreateInput, SignalUncheckedCreateInput>
  }

  /**
   * Signal createMany
   */
  export type SignalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Signals.
     */
    data: SignalCreateManyInput | SignalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Signal createManyAndReturn
   */
  export type SignalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Signals.
     */
    data: SignalCreateManyInput | SignalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Signal update
   */
  export type SignalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * The data needed to update a Signal.
     */
    data: XOR<SignalUpdateInput, SignalUncheckedUpdateInput>
    /**
     * Choose, which Signal to update.
     */
    where: SignalWhereUniqueInput
  }

  /**
   * Signal updateMany
   */
  export type SignalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Signals.
     */
    data: XOR<SignalUpdateManyMutationInput, SignalUncheckedUpdateManyInput>
    /**
     * Filter which Signals to update
     */
    where?: SignalWhereInput
  }

  /**
   * Signal upsert
   */
  export type SignalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * The filter to search for the Signal to update in case it exists.
     */
    where: SignalWhereUniqueInput
    /**
     * In case the Signal found by the `where` argument doesn't exist, create a new Signal with this data.
     */
    create: XOR<SignalCreateInput, SignalUncheckedCreateInput>
    /**
     * In case the Signal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignalUpdateInput, SignalUncheckedUpdateInput>
  }

  /**
   * Signal delete
   */
  export type SignalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
    /**
     * Filter which Signal to delete.
     */
    where: SignalWhereUniqueInput
  }

  /**
   * Signal deleteMany
   */
  export type SignalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signals to delete
     */
    where?: SignalWhereInput
  }

  /**
   * Signal without action
   */
  export type SignalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signal
     */
    select?: SignalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignalInclude<ExtArgs> | null
  }


  /**
   * Model ModelFit
   */

  export type AggregateModelFit = {
    _count: ModelFitCountAggregateOutputType | null
    _avg: ModelFitAvgAggregateOutputType | null
    _sum: ModelFitSumAggregateOutputType | null
    _min: ModelFitMinAggregateOutputType | null
    _max: ModelFitMaxAggregateOutputType | null
  }

  export type ModelFitAvgAggregateOutputType = {
    n: number | null
    brier: number | null
  }

  export type ModelFitSumAggregateOutputType = {
    n: number | null
    brier: number | null
  }

  export type ModelFitMinAggregateOutputType = {
    id: string | null
    setupId: string | null
    modelVersion: string | null
    n: number | null
    fittedTo: Date | null
    brier: number | null
    active: boolean | null
    createdAt: Date | null
  }

  export type ModelFitMaxAggregateOutputType = {
    id: string | null
    setupId: string | null
    modelVersion: string | null
    n: number | null
    fittedTo: Date | null
    brier: number | null
    active: boolean | null
    createdAt: Date | null
  }

  export type ModelFitCountAggregateOutputType = {
    id: number
    setupId: number
    modelVersion: number
    coefficients: number
    calibration: number
    n: number
    fittedTo: number
    brier: number
    active: number
    createdAt: number
    _all: number
  }


  export type ModelFitAvgAggregateInputType = {
    n?: true
    brier?: true
  }

  export type ModelFitSumAggregateInputType = {
    n?: true
    brier?: true
  }

  export type ModelFitMinAggregateInputType = {
    id?: true
    setupId?: true
    modelVersion?: true
    n?: true
    fittedTo?: true
    brier?: true
    active?: true
    createdAt?: true
  }

  export type ModelFitMaxAggregateInputType = {
    id?: true
    setupId?: true
    modelVersion?: true
    n?: true
    fittedTo?: true
    brier?: true
    active?: true
    createdAt?: true
  }

  export type ModelFitCountAggregateInputType = {
    id?: true
    setupId?: true
    modelVersion?: true
    coefficients?: true
    calibration?: true
    n?: true
    fittedTo?: true
    brier?: true
    active?: true
    createdAt?: true
    _all?: true
  }

  export type ModelFitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModelFit to aggregate.
     */
    where?: ModelFitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelFits to fetch.
     */
    orderBy?: ModelFitOrderByWithRelationInput | ModelFitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModelFitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelFits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelFits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModelFits
    **/
    _count?: true | ModelFitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModelFitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModelFitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModelFitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModelFitMaxAggregateInputType
  }

  export type GetModelFitAggregateType<T extends ModelFitAggregateArgs> = {
        [P in keyof T & keyof AggregateModelFit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModelFit[P]>
      : GetScalarType<T[P], AggregateModelFit[P]>
  }




  export type ModelFitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelFitWhereInput
    orderBy?: ModelFitOrderByWithAggregationInput | ModelFitOrderByWithAggregationInput[]
    by: ModelFitScalarFieldEnum[] | ModelFitScalarFieldEnum
    having?: ModelFitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModelFitCountAggregateInputType | true
    _avg?: ModelFitAvgAggregateInputType
    _sum?: ModelFitSumAggregateInputType
    _min?: ModelFitMinAggregateInputType
    _max?: ModelFitMaxAggregateInputType
  }

  export type ModelFitGroupByOutputType = {
    id: string
    setupId: string
    modelVersion: string
    coefficients: JsonValue
    calibration: JsonValue
    n: number
    fittedTo: Date
    brier: number
    active: boolean
    createdAt: Date
    _count: ModelFitCountAggregateOutputType | null
    _avg: ModelFitAvgAggregateOutputType | null
    _sum: ModelFitSumAggregateOutputType | null
    _min: ModelFitMinAggregateOutputType | null
    _max: ModelFitMaxAggregateOutputType | null
  }

  type GetModelFitGroupByPayload<T extends ModelFitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModelFitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModelFitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModelFitGroupByOutputType[P]>
            : GetScalarType<T[P], ModelFitGroupByOutputType[P]>
        }
      >
    >


  export type ModelFitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setupId?: boolean
    modelVersion?: boolean
    coefficients?: boolean
    calibration?: boolean
    n?: boolean
    fittedTo?: boolean
    brier?: boolean
    active?: boolean
    createdAt?: boolean
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modelFit"]>

  export type ModelFitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setupId?: boolean
    modelVersion?: boolean
    coefficients?: boolean
    calibration?: boolean
    n?: boolean
    fittedTo?: boolean
    brier?: boolean
    active?: boolean
    createdAt?: boolean
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modelFit"]>

  export type ModelFitSelectScalar = {
    id?: boolean
    setupId?: boolean
    modelVersion?: boolean
    coefficients?: boolean
    calibration?: boolean
    n?: boolean
    fittedTo?: boolean
    brier?: boolean
    active?: boolean
    createdAt?: boolean
  }

  export type ModelFitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }
  export type ModelFitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }

  export type $ModelFitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModelFit"
    objects: {
      setup: Prisma.$SetupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      setupId: string
      modelVersion: string
      coefficients: Prisma.JsonValue
      calibration: Prisma.JsonValue
      n: number
      fittedTo: Date
      brier: number
      active: boolean
      createdAt: Date
    }, ExtArgs["result"]["modelFit"]>
    composites: {}
  }

  type ModelFitGetPayload<S extends boolean | null | undefined | ModelFitDefaultArgs> = $Result.GetResult<Prisma.$ModelFitPayload, S>

  type ModelFitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ModelFitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ModelFitCountAggregateInputType | true
    }

  export interface ModelFitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModelFit'], meta: { name: 'ModelFit' } }
    /**
     * Find zero or one ModelFit that matches the filter.
     * @param {ModelFitFindUniqueArgs} args - Arguments to find a ModelFit
     * @example
     * // Get one ModelFit
     * const modelFit = await prisma.modelFit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModelFitFindUniqueArgs>(args: SelectSubset<T, ModelFitFindUniqueArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ModelFit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ModelFitFindUniqueOrThrowArgs} args - Arguments to find a ModelFit
     * @example
     * // Get one ModelFit
     * const modelFit = await prisma.modelFit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModelFitFindUniqueOrThrowArgs>(args: SelectSubset<T, ModelFitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ModelFit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitFindFirstArgs} args - Arguments to find a ModelFit
     * @example
     * // Get one ModelFit
     * const modelFit = await prisma.modelFit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModelFitFindFirstArgs>(args?: SelectSubset<T, ModelFitFindFirstArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ModelFit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitFindFirstOrThrowArgs} args - Arguments to find a ModelFit
     * @example
     * // Get one ModelFit
     * const modelFit = await prisma.modelFit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModelFitFindFirstOrThrowArgs>(args?: SelectSubset<T, ModelFitFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ModelFits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModelFits
     * const modelFits = await prisma.modelFit.findMany()
     * 
     * // Get first 10 ModelFits
     * const modelFits = await prisma.modelFit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modelFitWithIdOnly = await prisma.modelFit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModelFitFindManyArgs>(args?: SelectSubset<T, ModelFitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ModelFit.
     * @param {ModelFitCreateArgs} args - Arguments to create a ModelFit.
     * @example
     * // Create one ModelFit
     * const ModelFit = await prisma.modelFit.create({
     *   data: {
     *     // ... data to create a ModelFit
     *   }
     * })
     * 
     */
    create<T extends ModelFitCreateArgs>(args: SelectSubset<T, ModelFitCreateArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ModelFits.
     * @param {ModelFitCreateManyArgs} args - Arguments to create many ModelFits.
     * @example
     * // Create many ModelFits
     * const modelFit = await prisma.modelFit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModelFitCreateManyArgs>(args?: SelectSubset<T, ModelFitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModelFits and returns the data saved in the database.
     * @param {ModelFitCreateManyAndReturnArgs} args - Arguments to create many ModelFits.
     * @example
     * // Create many ModelFits
     * const modelFit = await prisma.modelFit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModelFits and only return the `id`
     * const modelFitWithIdOnly = await prisma.modelFit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModelFitCreateManyAndReturnArgs>(args?: SelectSubset<T, ModelFitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ModelFit.
     * @param {ModelFitDeleteArgs} args - Arguments to delete one ModelFit.
     * @example
     * // Delete one ModelFit
     * const ModelFit = await prisma.modelFit.delete({
     *   where: {
     *     // ... filter to delete one ModelFit
     *   }
     * })
     * 
     */
    delete<T extends ModelFitDeleteArgs>(args: SelectSubset<T, ModelFitDeleteArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ModelFit.
     * @param {ModelFitUpdateArgs} args - Arguments to update one ModelFit.
     * @example
     * // Update one ModelFit
     * const modelFit = await prisma.modelFit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModelFitUpdateArgs>(args: SelectSubset<T, ModelFitUpdateArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ModelFits.
     * @param {ModelFitDeleteManyArgs} args - Arguments to filter ModelFits to delete.
     * @example
     * // Delete a few ModelFits
     * const { count } = await prisma.modelFit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModelFitDeleteManyArgs>(args?: SelectSubset<T, ModelFitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModelFits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModelFits
     * const modelFit = await prisma.modelFit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModelFitUpdateManyArgs>(args: SelectSubset<T, ModelFitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModelFit.
     * @param {ModelFitUpsertArgs} args - Arguments to update or create a ModelFit.
     * @example
     * // Update or create a ModelFit
     * const modelFit = await prisma.modelFit.upsert({
     *   create: {
     *     // ... data to create a ModelFit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModelFit we want to update
     *   }
     * })
     */
    upsert<T extends ModelFitUpsertArgs>(args: SelectSubset<T, ModelFitUpsertArgs<ExtArgs>>): Prisma__ModelFitClient<$Result.GetResult<Prisma.$ModelFitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ModelFits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitCountArgs} args - Arguments to filter ModelFits to count.
     * @example
     * // Count the number of ModelFits
     * const count = await prisma.modelFit.count({
     *   where: {
     *     // ... the filter for the ModelFits we want to count
     *   }
     * })
    **/
    count<T extends ModelFitCountArgs>(
      args?: Subset<T, ModelFitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModelFitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModelFit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModelFitAggregateArgs>(args: Subset<T, ModelFitAggregateArgs>): Prisma.PrismaPromise<GetModelFitAggregateType<T>>

    /**
     * Group by ModelFit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModelFitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModelFitGroupByArgs['orderBy'] }
        : { orderBy?: ModelFitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModelFitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelFitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModelFit model
   */
  readonly fields: ModelFitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModelFit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModelFitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    setup<T extends SetupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SetupDefaultArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModelFit model
   */ 
  interface ModelFitFieldRefs {
    readonly id: FieldRef<"ModelFit", 'String'>
    readonly setupId: FieldRef<"ModelFit", 'String'>
    readonly modelVersion: FieldRef<"ModelFit", 'String'>
    readonly coefficients: FieldRef<"ModelFit", 'Json'>
    readonly calibration: FieldRef<"ModelFit", 'Json'>
    readonly n: FieldRef<"ModelFit", 'Int'>
    readonly fittedTo: FieldRef<"ModelFit", 'DateTime'>
    readonly brier: FieldRef<"ModelFit", 'Float'>
    readonly active: FieldRef<"ModelFit", 'Boolean'>
    readonly createdAt: FieldRef<"ModelFit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModelFit findUnique
   */
  export type ModelFitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * Filter, which ModelFit to fetch.
     */
    where: ModelFitWhereUniqueInput
  }

  /**
   * ModelFit findUniqueOrThrow
   */
  export type ModelFitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * Filter, which ModelFit to fetch.
     */
    where: ModelFitWhereUniqueInput
  }

  /**
   * ModelFit findFirst
   */
  export type ModelFitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * Filter, which ModelFit to fetch.
     */
    where?: ModelFitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelFits to fetch.
     */
    orderBy?: ModelFitOrderByWithRelationInput | ModelFitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModelFits.
     */
    cursor?: ModelFitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelFits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelFits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelFits.
     */
    distinct?: ModelFitScalarFieldEnum | ModelFitScalarFieldEnum[]
  }

  /**
   * ModelFit findFirstOrThrow
   */
  export type ModelFitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * Filter, which ModelFit to fetch.
     */
    where?: ModelFitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelFits to fetch.
     */
    orderBy?: ModelFitOrderByWithRelationInput | ModelFitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModelFits.
     */
    cursor?: ModelFitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelFits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelFits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelFits.
     */
    distinct?: ModelFitScalarFieldEnum | ModelFitScalarFieldEnum[]
  }

  /**
   * ModelFit findMany
   */
  export type ModelFitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * Filter, which ModelFits to fetch.
     */
    where?: ModelFitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelFits to fetch.
     */
    orderBy?: ModelFitOrderByWithRelationInput | ModelFitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModelFits.
     */
    cursor?: ModelFitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelFits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelFits.
     */
    skip?: number
    distinct?: ModelFitScalarFieldEnum | ModelFitScalarFieldEnum[]
  }

  /**
   * ModelFit create
   */
  export type ModelFitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * The data needed to create a ModelFit.
     */
    data: XOR<ModelFitCreateInput, ModelFitUncheckedCreateInput>
  }

  /**
   * ModelFit createMany
   */
  export type ModelFitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModelFits.
     */
    data: ModelFitCreateManyInput | ModelFitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModelFit createManyAndReturn
   */
  export type ModelFitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ModelFits.
     */
    data: ModelFitCreateManyInput | ModelFitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModelFit update
   */
  export type ModelFitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * The data needed to update a ModelFit.
     */
    data: XOR<ModelFitUpdateInput, ModelFitUncheckedUpdateInput>
    /**
     * Choose, which ModelFit to update.
     */
    where: ModelFitWhereUniqueInput
  }

  /**
   * ModelFit updateMany
   */
  export type ModelFitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModelFits.
     */
    data: XOR<ModelFitUpdateManyMutationInput, ModelFitUncheckedUpdateManyInput>
    /**
     * Filter which ModelFits to update
     */
    where?: ModelFitWhereInput
  }

  /**
   * ModelFit upsert
   */
  export type ModelFitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * The filter to search for the ModelFit to update in case it exists.
     */
    where: ModelFitWhereUniqueInput
    /**
     * In case the ModelFit found by the `where` argument doesn't exist, create a new ModelFit with this data.
     */
    create: XOR<ModelFitCreateInput, ModelFitUncheckedCreateInput>
    /**
     * In case the ModelFit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModelFitUpdateInput, ModelFitUncheckedUpdateInput>
  }

  /**
   * ModelFit delete
   */
  export type ModelFitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
    /**
     * Filter which ModelFit to delete.
     */
    where: ModelFitWhereUniqueInput
  }

  /**
   * ModelFit deleteMany
   */
  export type ModelFitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModelFits to delete
     */
    where?: ModelFitWhereInput
  }

  /**
   * ModelFit without action
   */
  export type ModelFitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelFit
     */
    select?: ModelFitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelFitInclude<ExtArgs> | null
  }


  /**
   * Model BacktestRun
   */

  export type AggregateBacktestRun = {
    _count: BacktestRunCountAggregateOutputType | null
    _avg: BacktestRunAvgAggregateOutputType | null
    _sum: BacktestRunSumAggregateOutputType | null
    _min: BacktestRunMinAggregateOutputType | null
    _max: BacktestRunMaxAggregateOutputType | null
  }

  export type BacktestRunAvgAggregateOutputType = {
    trades: number | null
    hitRate: number | null
    avgPredP: number | null
    expectR: number | null
    totalR: number | null
    maxDdR: number | null
    brier: number | null
    costsBps: number | null
  }

  export type BacktestRunSumAggregateOutputType = {
    trades: number | null
    hitRate: number | null
    avgPredP: number | null
    expectR: number | null
    totalR: number | null
    maxDdR: number | null
    brier: number | null
    costsBps: number | null
  }

  export type BacktestRunMinAggregateOutputType = {
    id: string | null
    setupId: string | null
    label: string | null
    from: Date | null
    to: Date | null
    trades: number | null
    hitRate: number | null
    avgPredP: number | null
    expectR: number | null
    totalR: number | null
    maxDdR: number | null
    brier: number | null
    costsBps: number | null
    entryStyle: string | null
    manageMode: string | null
    createdAt: Date | null
  }

  export type BacktestRunMaxAggregateOutputType = {
    id: string | null
    setupId: string | null
    label: string | null
    from: Date | null
    to: Date | null
    trades: number | null
    hitRate: number | null
    avgPredP: number | null
    expectR: number | null
    totalR: number | null
    maxDdR: number | null
    brier: number | null
    costsBps: number | null
    entryStyle: string | null
    manageMode: string | null
    createdAt: Date | null
  }

  export type BacktestRunCountAggregateOutputType = {
    id: number
    setupId: number
    label: number
    from: number
    to: number
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: number
    costsBps: number
    detail: number
    entryStyle: number
    manageMode: number
    createdAt: number
    _all: number
  }


  export type BacktestRunAvgAggregateInputType = {
    trades?: true
    hitRate?: true
    avgPredP?: true
    expectR?: true
    totalR?: true
    maxDdR?: true
    brier?: true
    costsBps?: true
  }

  export type BacktestRunSumAggregateInputType = {
    trades?: true
    hitRate?: true
    avgPredP?: true
    expectR?: true
    totalR?: true
    maxDdR?: true
    brier?: true
    costsBps?: true
  }

  export type BacktestRunMinAggregateInputType = {
    id?: true
    setupId?: true
    label?: true
    from?: true
    to?: true
    trades?: true
    hitRate?: true
    avgPredP?: true
    expectR?: true
    totalR?: true
    maxDdR?: true
    brier?: true
    costsBps?: true
    entryStyle?: true
    manageMode?: true
    createdAt?: true
  }

  export type BacktestRunMaxAggregateInputType = {
    id?: true
    setupId?: true
    label?: true
    from?: true
    to?: true
    trades?: true
    hitRate?: true
    avgPredP?: true
    expectR?: true
    totalR?: true
    maxDdR?: true
    brier?: true
    costsBps?: true
    entryStyle?: true
    manageMode?: true
    createdAt?: true
  }

  export type BacktestRunCountAggregateInputType = {
    id?: true
    setupId?: true
    label?: true
    from?: true
    to?: true
    trades?: true
    hitRate?: true
    avgPredP?: true
    expectR?: true
    totalR?: true
    maxDdR?: true
    brier?: true
    baseline?: true
    costsBps?: true
    detail?: true
    entryStyle?: true
    manageMode?: true
    createdAt?: true
    _all?: true
  }

  export type BacktestRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BacktestRun to aggregate.
     */
    where?: BacktestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BacktestRuns to fetch.
     */
    orderBy?: BacktestRunOrderByWithRelationInput | BacktestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BacktestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BacktestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BacktestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BacktestRuns
    **/
    _count?: true | BacktestRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BacktestRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BacktestRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BacktestRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BacktestRunMaxAggregateInputType
  }

  export type GetBacktestRunAggregateType<T extends BacktestRunAggregateArgs> = {
        [P in keyof T & keyof AggregateBacktestRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBacktestRun[P]>
      : GetScalarType<T[P], AggregateBacktestRun[P]>
  }




  export type BacktestRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BacktestRunWhereInput
    orderBy?: BacktestRunOrderByWithAggregationInput | BacktestRunOrderByWithAggregationInput[]
    by: BacktestRunScalarFieldEnum[] | BacktestRunScalarFieldEnum
    having?: BacktestRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BacktestRunCountAggregateInputType | true
    _avg?: BacktestRunAvgAggregateInputType
    _sum?: BacktestRunSumAggregateInputType
    _min?: BacktestRunMinAggregateInputType
    _max?: BacktestRunMaxAggregateInputType
  }

  export type BacktestRunGroupByOutputType = {
    id: string
    setupId: string
    label: string
    from: Date
    to: Date
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonValue
    costsBps: number
    detail: JsonValue
    entryStyle: string
    manageMode: string
    createdAt: Date
    _count: BacktestRunCountAggregateOutputType | null
    _avg: BacktestRunAvgAggregateOutputType | null
    _sum: BacktestRunSumAggregateOutputType | null
    _min: BacktestRunMinAggregateOutputType | null
    _max: BacktestRunMaxAggregateOutputType | null
  }

  type GetBacktestRunGroupByPayload<T extends BacktestRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BacktestRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BacktestRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BacktestRunGroupByOutputType[P]>
            : GetScalarType<T[P], BacktestRunGroupByOutputType[P]>
        }
      >
    >


  export type BacktestRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setupId?: boolean
    label?: boolean
    from?: boolean
    to?: boolean
    trades?: boolean
    hitRate?: boolean
    avgPredP?: boolean
    expectR?: boolean
    totalR?: boolean
    maxDdR?: boolean
    brier?: boolean
    baseline?: boolean
    costsBps?: boolean
    detail?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    createdAt?: boolean
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backtestRun"]>

  export type BacktestRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setupId?: boolean
    label?: boolean
    from?: boolean
    to?: boolean
    trades?: boolean
    hitRate?: boolean
    avgPredP?: boolean
    expectR?: boolean
    totalR?: boolean
    maxDdR?: boolean
    brier?: boolean
    baseline?: boolean
    costsBps?: boolean
    detail?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    createdAt?: boolean
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backtestRun"]>

  export type BacktestRunSelectScalar = {
    id?: boolean
    setupId?: boolean
    label?: boolean
    from?: boolean
    to?: boolean
    trades?: boolean
    hitRate?: boolean
    avgPredP?: boolean
    expectR?: boolean
    totalR?: boolean
    maxDdR?: boolean
    brier?: boolean
    baseline?: boolean
    costsBps?: boolean
    detail?: boolean
    entryStyle?: boolean
    manageMode?: boolean
    createdAt?: boolean
  }

  export type BacktestRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }
  export type BacktestRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setup?: boolean | SetupDefaultArgs<ExtArgs>
  }

  export type $BacktestRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BacktestRun"
    objects: {
      setup: Prisma.$SetupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      setupId: string
      label: string
      from: Date
      to: Date
      trades: number
      hitRate: number
      avgPredP: number
      expectR: number
      totalR: number
      maxDdR: number
      brier: number
      baseline: Prisma.JsonValue
      costsBps: number
      detail: Prisma.JsonValue
      entryStyle: string
      manageMode: string
      createdAt: Date
    }, ExtArgs["result"]["backtestRun"]>
    composites: {}
  }

  type BacktestRunGetPayload<S extends boolean | null | undefined | BacktestRunDefaultArgs> = $Result.GetResult<Prisma.$BacktestRunPayload, S>

  type BacktestRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BacktestRunFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BacktestRunCountAggregateInputType | true
    }

  export interface BacktestRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BacktestRun'], meta: { name: 'BacktestRun' } }
    /**
     * Find zero or one BacktestRun that matches the filter.
     * @param {BacktestRunFindUniqueArgs} args - Arguments to find a BacktestRun
     * @example
     * // Get one BacktestRun
     * const backtestRun = await prisma.backtestRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BacktestRunFindUniqueArgs>(args: SelectSubset<T, BacktestRunFindUniqueArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BacktestRun that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BacktestRunFindUniqueOrThrowArgs} args - Arguments to find a BacktestRun
     * @example
     * // Get one BacktestRun
     * const backtestRun = await prisma.backtestRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BacktestRunFindUniqueOrThrowArgs>(args: SelectSubset<T, BacktestRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BacktestRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunFindFirstArgs} args - Arguments to find a BacktestRun
     * @example
     * // Get one BacktestRun
     * const backtestRun = await prisma.backtestRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BacktestRunFindFirstArgs>(args?: SelectSubset<T, BacktestRunFindFirstArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BacktestRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunFindFirstOrThrowArgs} args - Arguments to find a BacktestRun
     * @example
     * // Get one BacktestRun
     * const backtestRun = await prisma.backtestRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BacktestRunFindFirstOrThrowArgs>(args?: SelectSubset<T, BacktestRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BacktestRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BacktestRuns
     * const backtestRuns = await prisma.backtestRun.findMany()
     * 
     * // Get first 10 BacktestRuns
     * const backtestRuns = await prisma.backtestRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backtestRunWithIdOnly = await prisma.backtestRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BacktestRunFindManyArgs>(args?: SelectSubset<T, BacktestRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BacktestRun.
     * @param {BacktestRunCreateArgs} args - Arguments to create a BacktestRun.
     * @example
     * // Create one BacktestRun
     * const BacktestRun = await prisma.backtestRun.create({
     *   data: {
     *     // ... data to create a BacktestRun
     *   }
     * })
     * 
     */
    create<T extends BacktestRunCreateArgs>(args: SelectSubset<T, BacktestRunCreateArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BacktestRuns.
     * @param {BacktestRunCreateManyArgs} args - Arguments to create many BacktestRuns.
     * @example
     * // Create many BacktestRuns
     * const backtestRun = await prisma.backtestRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BacktestRunCreateManyArgs>(args?: SelectSubset<T, BacktestRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BacktestRuns and returns the data saved in the database.
     * @param {BacktestRunCreateManyAndReturnArgs} args - Arguments to create many BacktestRuns.
     * @example
     * // Create many BacktestRuns
     * const backtestRun = await prisma.backtestRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BacktestRuns and only return the `id`
     * const backtestRunWithIdOnly = await prisma.backtestRun.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BacktestRunCreateManyAndReturnArgs>(args?: SelectSubset<T, BacktestRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BacktestRun.
     * @param {BacktestRunDeleteArgs} args - Arguments to delete one BacktestRun.
     * @example
     * // Delete one BacktestRun
     * const BacktestRun = await prisma.backtestRun.delete({
     *   where: {
     *     // ... filter to delete one BacktestRun
     *   }
     * })
     * 
     */
    delete<T extends BacktestRunDeleteArgs>(args: SelectSubset<T, BacktestRunDeleteArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BacktestRun.
     * @param {BacktestRunUpdateArgs} args - Arguments to update one BacktestRun.
     * @example
     * // Update one BacktestRun
     * const backtestRun = await prisma.backtestRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BacktestRunUpdateArgs>(args: SelectSubset<T, BacktestRunUpdateArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BacktestRuns.
     * @param {BacktestRunDeleteManyArgs} args - Arguments to filter BacktestRuns to delete.
     * @example
     * // Delete a few BacktestRuns
     * const { count } = await prisma.backtestRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BacktestRunDeleteManyArgs>(args?: SelectSubset<T, BacktestRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BacktestRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BacktestRuns
     * const backtestRun = await prisma.backtestRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BacktestRunUpdateManyArgs>(args: SelectSubset<T, BacktestRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BacktestRun.
     * @param {BacktestRunUpsertArgs} args - Arguments to update or create a BacktestRun.
     * @example
     * // Update or create a BacktestRun
     * const backtestRun = await prisma.backtestRun.upsert({
     *   create: {
     *     // ... data to create a BacktestRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BacktestRun we want to update
     *   }
     * })
     */
    upsert<T extends BacktestRunUpsertArgs>(args: SelectSubset<T, BacktestRunUpsertArgs<ExtArgs>>): Prisma__BacktestRunClient<$Result.GetResult<Prisma.$BacktestRunPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BacktestRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunCountArgs} args - Arguments to filter BacktestRuns to count.
     * @example
     * // Count the number of BacktestRuns
     * const count = await prisma.backtestRun.count({
     *   where: {
     *     // ... the filter for the BacktestRuns we want to count
     *   }
     * })
    **/
    count<T extends BacktestRunCountArgs>(
      args?: Subset<T, BacktestRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BacktestRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BacktestRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BacktestRunAggregateArgs>(args: Subset<T, BacktestRunAggregateArgs>): Prisma.PrismaPromise<GetBacktestRunAggregateType<T>>

    /**
     * Group by BacktestRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BacktestRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BacktestRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BacktestRunGroupByArgs['orderBy'] }
        : { orderBy?: BacktestRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BacktestRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBacktestRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BacktestRun model
   */
  readonly fields: BacktestRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BacktestRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BacktestRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    setup<T extends SetupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SetupDefaultArgs<ExtArgs>>): Prisma__SetupClient<$Result.GetResult<Prisma.$SetupPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BacktestRun model
   */ 
  interface BacktestRunFieldRefs {
    readonly id: FieldRef<"BacktestRun", 'String'>
    readonly setupId: FieldRef<"BacktestRun", 'String'>
    readonly label: FieldRef<"BacktestRun", 'String'>
    readonly from: FieldRef<"BacktestRun", 'DateTime'>
    readonly to: FieldRef<"BacktestRun", 'DateTime'>
    readonly trades: FieldRef<"BacktestRun", 'Int'>
    readonly hitRate: FieldRef<"BacktestRun", 'Float'>
    readonly avgPredP: FieldRef<"BacktestRun", 'Float'>
    readonly expectR: FieldRef<"BacktestRun", 'Float'>
    readonly totalR: FieldRef<"BacktestRun", 'Float'>
    readonly maxDdR: FieldRef<"BacktestRun", 'Float'>
    readonly brier: FieldRef<"BacktestRun", 'Float'>
    readonly baseline: FieldRef<"BacktestRun", 'Json'>
    readonly costsBps: FieldRef<"BacktestRun", 'Float'>
    readonly detail: FieldRef<"BacktestRun", 'Json'>
    readonly entryStyle: FieldRef<"BacktestRun", 'String'>
    readonly manageMode: FieldRef<"BacktestRun", 'String'>
    readonly createdAt: FieldRef<"BacktestRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BacktestRun findUnique
   */
  export type BacktestRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * Filter, which BacktestRun to fetch.
     */
    where: BacktestRunWhereUniqueInput
  }

  /**
   * BacktestRun findUniqueOrThrow
   */
  export type BacktestRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * Filter, which BacktestRun to fetch.
     */
    where: BacktestRunWhereUniqueInput
  }

  /**
   * BacktestRun findFirst
   */
  export type BacktestRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * Filter, which BacktestRun to fetch.
     */
    where?: BacktestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BacktestRuns to fetch.
     */
    orderBy?: BacktestRunOrderByWithRelationInput | BacktestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BacktestRuns.
     */
    cursor?: BacktestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BacktestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BacktestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BacktestRuns.
     */
    distinct?: BacktestRunScalarFieldEnum | BacktestRunScalarFieldEnum[]
  }

  /**
   * BacktestRun findFirstOrThrow
   */
  export type BacktestRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * Filter, which BacktestRun to fetch.
     */
    where?: BacktestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BacktestRuns to fetch.
     */
    orderBy?: BacktestRunOrderByWithRelationInput | BacktestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BacktestRuns.
     */
    cursor?: BacktestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BacktestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BacktestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BacktestRuns.
     */
    distinct?: BacktestRunScalarFieldEnum | BacktestRunScalarFieldEnum[]
  }

  /**
   * BacktestRun findMany
   */
  export type BacktestRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * Filter, which BacktestRuns to fetch.
     */
    where?: BacktestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BacktestRuns to fetch.
     */
    orderBy?: BacktestRunOrderByWithRelationInput | BacktestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BacktestRuns.
     */
    cursor?: BacktestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BacktestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BacktestRuns.
     */
    skip?: number
    distinct?: BacktestRunScalarFieldEnum | BacktestRunScalarFieldEnum[]
  }

  /**
   * BacktestRun create
   */
  export type BacktestRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * The data needed to create a BacktestRun.
     */
    data: XOR<BacktestRunCreateInput, BacktestRunUncheckedCreateInput>
  }

  /**
   * BacktestRun createMany
   */
  export type BacktestRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BacktestRuns.
     */
    data: BacktestRunCreateManyInput | BacktestRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BacktestRun createManyAndReturn
   */
  export type BacktestRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BacktestRuns.
     */
    data: BacktestRunCreateManyInput | BacktestRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BacktestRun update
   */
  export type BacktestRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * The data needed to update a BacktestRun.
     */
    data: XOR<BacktestRunUpdateInput, BacktestRunUncheckedUpdateInput>
    /**
     * Choose, which BacktestRun to update.
     */
    where: BacktestRunWhereUniqueInput
  }

  /**
   * BacktestRun updateMany
   */
  export type BacktestRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BacktestRuns.
     */
    data: XOR<BacktestRunUpdateManyMutationInput, BacktestRunUncheckedUpdateManyInput>
    /**
     * Filter which BacktestRuns to update
     */
    where?: BacktestRunWhereInput
  }

  /**
   * BacktestRun upsert
   */
  export type BacktestRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * The filter to search for the BacktestRun to update in case it exists.
     */
    where: BacktestRunWhereUniqueInput
    /**
     * In case the BacktestRun found by the `where` argument doesn't exist, create a new BacktestRun with this data.
     */
    create: XOR<BacktestRunCreateInput, BacktestRunUncheckedCreateInput>
    /**
     * In case the BacktestRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BacktestRunUpdateInput, BacktestRunUncheckedUpdateInput>
  }

  /**
   * BacktestRun delete
   */
  export type BacktestRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
    /**
     * Filter which BacktestRun to delete.
     */
    where: BacktestRunWhereUniqueInput
  }

  /**
   * BacktestRun deleteMany
   */
  export type BacktestRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BacktestRuns to delete
     */
    where?: BacktestRunWhereInput
  }

  /**
   * BacktestRun without action
   */
  export type BacktestRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BacktestRun
     */
    select?: BacktestRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BacktestRunInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    entry: number | null
    stop: number | null
    target: number | null
    exit: number | null
    sizeUnits: number | null
    riskAmount: number | null
    rMultiple: number | null
  }

  export type TradeSumAggregateOutputType = {
    entry: number | null
    stop: number | null
    target: number | null
    exit: number | null
    sizeUnits: number | null
    riskAmount: number | null
    rMultiple: number | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    signalId: string | null
    side: $Enums.Side | null
    openedAt: Date | null
    closedAt: Date | null
    entry: number | null
    stop: number | null
    target: number | null
    exit: number | null
    sizeUnits: number | null
    riskAmount: number | null
    rMultiple: number | null
    followedPlan: boolean | null
    reason: string | null
    mistakes: string | null
    createdAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    signalId: string | null
    side: $Enums.Side | null
    openedAt: Date | null
    closedAt: Date | null
    entry: number | null
    stop: number | null
    target: number | null
    exit: number | null
    sizeUnits: number | null
    riskAmount: number | null
    rMultiple: number | null
    followedPlan: boolean | null
    reason: string | null
    mistakes: string | null
    createdAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    instrumentId: number
    signalId: number
    side: number
    openedAt: number
    closedAt: number
    entry: number
    stop: number
    target: number
    exit: number
    sizeUnits: number
    riskAmount: number
    rMultiple: number
    followedPlan: number
    reason: number
    mistakes: number
    createdAt: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    entry?: true
    stop?: true
    target?: true
    exit?: true
    sizeUnits?: true
    riskAmount?: true
    rMultiple?: true
  }

  export type TradeSumAggregateInputType = {
    entry?: true
    stop?: true
    target?: true
    exit?: true
    sizeUnits?: true
    riskAmount?: true
    rMultiple?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    instrumentId?: true
    signalId?: true
    side?: true
    openedAt?: true
    closedAt?: true
    entry?: true
    stop?: true
    target?: true
    exit?: true
    sizeUnits?: true
    riskAmount?: true
    rMultiple?: true
    followedPlan?: true
    reason?: true
    mistakes?: true
    createdAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    instrumentId?: true
    signalId?: true
    side?: true
    openedAt?: true
    closedAt?: true
    entry?: true
    stop?: true
    target?: true
    exit?: true
    sizeUnits?: true
    riskAmount?: true
    rMultiple?: true
    followedPlan?: true
    reason?: true
    mistakes?: true
    createdAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    instrumentId?: true
    signalId?: true
    side?: true
    openedAt?: true
    closedAt?: true
    entry?: true
    stop?: true
    target?: true
    exit?: true
    sizeUnits?: true
    riskAmount?: true
    rMultiple?: true
    followedPlan?: true
    reason?: true
    mistakes?: true
    createdAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    instrumentId: string
    signalId: string | null
    side: $Enums.Side
    openedAt: Date
    closedAt: Date | null
    entry: number
    stop: number
    target: number | null
    exit: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple: number | null
    followedPlan: boolean
    reason: string | null
    mistakes: string | null
    createdAt: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    signalId?: boolean
    side?: boolean
    openedAt?: boolean
    closedAt?: boolean
    entry?: boolean
    stop?: boolean
    target?: boolean
    exit?: boolean
    sizeUnits?: boolean
    riskAmount?: boolean
    rMultiple?: boolean
    followedPlan?: boolean
    reason?: boolean
    mistakes?: boolean
    createdAt?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    signalId?: boolean
    side?: boolean
    openedAt?: boolean
    closedAt?: boolean
    entry?: boolean
    stop?: boolean
    target?: boolean
    exit?: boolean
    sizeUnits?: boolean
    riskAmount?: boolean
    rMultiple?: boolean
    followedPlan?: boolean
    reason?: boolean
    mistakes?: boolean
    createdAt?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    instrumentId?: boolean
    signalId?: boolean
    side?: boolean
    openedAt?: boolean
    closedAt?: boolean
    entry?: boolean
    stop?: boolean
    target?: boolean
    exit?: boolean
    sizeUnits?: boolean
    riskAmount?: boolean
    rMultiple?: boolean
    followedPlan?: boolean
    reason?: boolean
    mistakes?: boolean
    createdAt?: boolean
  }

  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instrumentId: string
      signalId: string | null
      side: $Enums.Side
      openedAt: Date
      closedAt: Date | null
      entry: number
      stop: number
      target: number | null
      exit: number | null
      sizeUnits: number
      riskAmount: number
      rMultiple: number | null
      followedPlan: boolean
      reason: string | null
      mistakes: string | null
      createdAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */ 
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly instrumentId: FieldRef<"Trade", 'String'>
    readonly signalId: FieldRef<"Trade", 'String'>
    readonly side: FieldRef<"Trade", 'Side'>
    readonly openedAt: FieldRef<"Trade", 'DateTime'>
    readonly closedAt: FieldRef<"Trade", 'DateTime'>
    readonly entry: FieldRef<"Trade", 'Float'>
    readonly stop: FieldRef<"Trade", 'Float'>
    readonly target: FieldRef<"Trade", 'Float'>
    readonly exit: FieldRef<"Trade", 'Float'>
    readonly sizeUnits: FieldRef<"Trade", 'Float'>
    readonly riskAmount: FieldRef<"Trade", 'Float'>
    readonly rMultiple: FieldRef<"Trade", 'Float'>
    readonly followedPlan: FieldRef<"Trade", 'Boolean'>
    readonly reason: FieldRef<"Trade", 'String'>
    readonly mistakes: FieldRef<"Trade", 'String'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Model RiskProfile
   */

  export type AggregateRiskProfile = {
    _count: RiskProfileCountAggregateOutputType | null
    _avg: RiskProfileAvgAggregateOutputType | null
    _sum: RiskProfileSumAggregateOutputType | null
    _min: RiskProfileMinAggregateOutputType | null
    _max: RiskProfileMaxAggregateOutputType | null
  }

  export type RiskProfileAvgAggregateOutputType = {
    accountSize: number | null
    riskPctPerTrade: number | null
    kellyFraction: number | null
    maxOpenRisk: number | null
    maxPerMarket: number | null
  }

  export type RiskProfileSumAggregateOutputType = {
    accountSize: number | null
    riskPctPerTrade: number | null
    kellyFraction: number | null
    maxOpenRisk: number | null
    maxPerMarket: number | null
  }

  export type RiskProfileMinAggregateOutputType = {
    id: string | null
    accountSize: number | null
    riskPctPerTrade: number | null
    kellyFraction: number | null
    maxOpenRisk: number | null
    maxPerMarket: number | null
    updatedAt: Date | null
  }

  export type RiskProfileMaxAggregateOutputType = {
    id: string | null
    accountSize: number | null
    riskPctPerTrade: number | null
    kellyFraction: number | null
    maxOpenRisk: number | null
    maxPerMarket: number | null
    updatedAt: Date | null
  }

  export type RiskProfileCountAggregateOutputType = {
    id: number
    accountSize: number
    riskPctPerTrade: number
    kellyFraction: number
    maxOpenRisk: number
    maxPerMarket: number
    updatedAt: number
    _all: number
  }


  export type RiskProfileAvgAggregateInputType = {
    accountSize?: true
    riskPctPerTrade?: true
    kellyFraction?: true
    maxOpenRisk?: true
    maxPerMarket?: true
  }

  export type RiskProfileSumAggregateInputType = {
    accountSize?: true
    riskPctPerTrade?: true
    kellyFraction?: true
    maxOpenRisk?: true
    maxPerMarket?: true
  }

  export type RiskProfileMinAggregateInputType = {
    id?: true
    accountSize?: true
    riskPctPerTrade?: true
    kellyFraction?: true
    maxOpenRisk?: true
    maxPerMarket?: true
    updatedAt?: true
  }

  export type RiskProfileMaxAggregateInputType = {
    id?: true
    accountSize?: true
    riskPctPerTrade?: true
    kellyFraction?: true
    maxOpenRisk?: true
    maxPerMarket?: true
    updatedAt?: true
  }

  export type RiskProfileCountAggregateInputType = {
    id?: true
    accountSize?: true
    riskPctPerTrade?: true
    kellyFraction?: true
    maxOpenRisk?: true
    maxPerMarket?: true
    updatedAt?: true
    _all?: true
  }

  export type RiskProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskProfile to aggregate.
     */
    where?: RiskProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?: RiskProfileOrderByWithRelationInput | RiskProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiskProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiskProfiles
    **/
    _count?: true | RiskProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiskProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiskProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiskProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiskProfileMaxAggregateInputType
  }

  export type GetRiskProfileAggregateType<T extends RiskProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateRiskProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiskProfile[P]>
      : GetScalarType<T[P], AggregateRiskProfile[P]>
  }




  export type RiskProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskProfileWhereInput
    orderBy?: RiskProfileOrderByWithAggregationInput | RiskProfileOrderByWithAggregationInput[]
    by: RiskProfileScalarFieldEnum[] | RiskProfileScalarFieldEnum
    having?: RiskProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiskProfileCountAggregateInputType | true
    _avg?: RiskProfileAvgAggregateInputType
    _sum?: RiskProfileSumAggregateInputType
    _min?: RiskProfileMinAggregateInputType
    _max?: RiskProfileMaxAggregateInputType
  }

  export type RiskProfileGroupByOutputType = {
    id: string
    accountSize: number
    riskPctPerTrade: number
    kellyFraction: number
    maxOpenRisk: number
    maxPerMarket: number
    updatedAt: Date
    _count: RiskProfileCountAggregateOutputType | null
    _avg: RiskProfileAvgAggregateOutputType | null
    _sum: RiskProfileSumAggregateOutputType | null
    _min: RiskProfileMinAggregateOutputType | null
    _max: RiskProfileMaxAggregateOutputType | null
  }

  type GetRiskProfileGroupByPayload<T extends RiskProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiskProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiskProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskProfileGroupByOutputType[P]>
            : GetScalarType<T[P], RiskProfileGroupByOutputType[P]>
        }
      >
    >


  export type RiskProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountSize?: boolean
    riskPctPerTrade?: boolean
    kellyFraction?: boolean
    maxOpenRisk?: boolean
    maxPerMarket?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["riskProfile"]>

  export type RiskProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountSize?: boolean
    riskPctPerTrade?: boolean
    kellyFraction?: boolean
    maxOpenRisk?: boolean
    maxPerMarket?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["riskProfile"]>

  export type RiskProfileSelectScalar = {
    id?: boolean
    accountSize?: boolean
    riskPctPerTrade?: boolean
    kellyFraction?: boolean
    maxOpenRisk?: boolean
    maxPerMarket?: boolean
    updatedAt?: boolean
  }


  export type $RiskProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiskProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountSize: number
      riskPctPerTrade: number
      kellyFraction: number
      maxOpenRisk: number
      maxPerMarket: number
      updatedAt: Date
    }, ExtArgs["result"]["riskProfile"]>
    composites: {}
  }

  type RiskProfileGetPayload<S extends boolean | null | undefined | RiskProfileDefaultArgs> = $Result.GetResult<Prisma.$RiskProfilePayload, S>

  type RiskProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RiskProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RiskProfileCountAggregateInputType | true
    }

  export interface RiskProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiskProfile'], meta: { name: 'RiskProfile' } }
    /**
     * Find zero or one RiskProfile that matches the filter.
     * @param {RiskProfileFindUniqueArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskProfileFindUniqueArgs>(args: SelectSubset<T, RiskProfileFindUniqueArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RiskProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RiskProfileFindUniqueOrThrowArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, RiskProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RiskProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileFindFirstArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskProfileFindFirstArgs>(args?: SelectSubset<T, RiskProfileFindFirstArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RiskProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileFindFirstOrThrowArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, RiskProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RiskProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskProfiles
     * const riskProfiles = await prisma.riskProfile.findMany()
     * 
     * // Get first 10 RiskProfiles
     * const riskProfiles = await prisma.riskProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riskProfileWithIdOnly = await prisma.riskProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiskProfileFindManyArgs>(args?: SelectSubset<T, RiskProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RiskProfile.
     * @param {RiskProfileCreateArgs} args - Arguments to create a RiskProfile.
     * @example
     * // Create one RiskProfile
     * const RiskProfile = await prisma.riskProfile.create({
     *   data: {
     *     // ... data to create a RiskProfile
     *   }
     * })
     * 
     */
    create<T extends RiskProfileCreateArgs>(args: SelectSubset<T, RiskProfileCreateArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RiskProfiles.
     * @param {RiskProfileCreateManyArgs} args - Arguments to create many RiskProfiles.
     * @example
     * // Create many RiskProfiles
     * const riskProfile = await prisma.riskProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiskProfileCreateManyArgs>(args?: SelectSubset<T, RiskProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiskProfiles and returns the data saved in the database.
     * @param {RiskProfileCreateManyAndReturnArgs} args - Arguments to create many RiskProfiles.
     * @example
     * // Create many RiskProfiles
     * const riskProfile = await prisma.riskProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiskProfiles and only return the `id`
     * const riskProfileWithIdOnly = await prisma.riskProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiskProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, RiskProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RiskProfile.
     * @param {RiskProfileDeleteArgs} args - Arguments to delete one RiskProfile.
     * @example
     * // Delete one RiskProfile
     * const RiskProfile = await prisma.riskProfile.delete({
     *   where: {
     *     // ... filter to delete one RiskProfile
     *   }
     * })
     * 
     */
    delete<T extends RiskProfileDeleteArgs>(args: SelectSubset<T, RiskProfileDeleteArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RiskProfile.
     * @param {RiskProfileUpdateArgs} args - Arguments to update one RiskProfile.
     * @example
     * // Update one RiskProfile
     * const riskProfile = await prisma.riskProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiskProfileUpdateArgs>(args: SelectSubset<T, RiskProfileUpdateArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RiskProfiles.
     * @param {RiskProfileDeleteManyArgs} args - Arguments to filter RiskProfiles to delete.
     * @example
     * // Delete a few RiskProfiles
     * const { count } = await prisma.riskProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiskProfileDeleteManyArgs>(args?: SelectSubset<T, RiskProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskProfiles
     * const riskProfile = await prisma.riskProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiskProfileUpdateManyArgs>(args: SelectSubset<T, RiskProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiskProfile.
     * @param {RiskProfileUpsertArgs} args - Arguments to update or create a RiskProfile.
     * @example
     * // Update or create a RiskProfile
     * const riskProfile = await prisma.riskProfile.upsert({
     *   create: {
     *     // ... data to create a RiskProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskProfile we want to update
     *   }
     * })
     */
    upsert<T extends RiskProfileUpsertArgs>(args: SelectSubset<T, RiskProfileUpsertArgs<ExtArgs>>): Prisma__RiskProfileClient<$Result.GetResult<Prisma.$RiskProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RiskProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileCountArgs} args - Arguments to filter RiskProfiles to count.
     * @example
     * // Count the number of RiskProfiles
     * const count = await prisma.riskProfile.count({
     *   where: {
     *     // ... the filter for the RiskProfiles we want to count
     *   }
     * })
    **/
    count<T extends RiskProfileCountArgs>(
      args?: Subset<T, RiskProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiskProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RiskProfileAggregateArgs>(args: Subset<T, RiskProfileAggregateArgs>): Prisma.PrismaPromise<GetRiskProfileAggregateType<T>>

    /**
     * Group by RiskProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RiskProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskProfileGroupByArgs['orderBy'] }
        : { orderBy?: RiskProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RiskProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiskProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiskProfile model
   */
  readonly fields: RiskProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RiskProfile model
   */ 
  interface RiskProfileFieldRefs {
    readonly id: FieldRef<"RiskProfile", 'String'>
    readonly accountSize: FieldRef<"RiskProfile", 'Float'>
    readonly riskPctPerTrade: FieldRef<"RiskProfile", 'Float'>
    readonly kellyFraction: FieldRef<"RiskProfile", 'Float'>
    readonly maxOpenRisk: FieldRef<"RiskProfile", 'Float'>
    readonly maxPerMarket: FieldRef<"RiskProfile", 'Int'>
    readonly updatedAt: FieldRef<"RiskProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RiskProfile findUnique
   */
  export type RiskProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * Filter, which RiskProfile to fetch.
     */
    where: RiskProfileWhereUniqueInput
  }

  /**
   * RiskProfile findUniqueOrThrow
   */
  export type RiskProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * Filter, which RiskProfile to fetch.
     */
    where: RiskProfileWhereUniqueInput
  }

  /**
   * RiskProfile findFirst
   */
  export type RiskProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * Filter, which RiskProfile to fetch.
     */
    where?: RiskProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?: RiskProfileOrderByWithRelationInput | RiskProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskProfiles.
     */
    cursor?: RiskProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskProfiles.
     */
    distinct?: RiskProfileScalarFieldEnum | RiskProfileScalarFieldEnum[]
  }

  /**
   * RiskProfile findFirstOrThrow
   */
  export type RiskProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * Filter, which RiskProfile to fetch.
     */
    where?: RiskProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?: RiskProfileOrderByWithRelationInput | RiskProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskProfiles.
     */
    cursor?: RiskProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskProfiles.
     */
    distinct?: RiskProfileScalarFieldEnum | RiskProfileScalarFieldEnum[]
  }

  /**
   * RiskProfile findMany
   */
  export type RiskProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * Filter, which RiskProfiles to fetch.
     */
    where?: RiskProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?: RiskProfileOrderByWithRelationInput | RiskProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiskProfiles.
     */
    cursor?: RiskProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskProfiles.
     */
    skip?: number
    distinct?: RiskProfileScalarFieldEnum | RiskProfileScalarFieldEnum[]
  }

  /**
   * RiskProfile create
   */
  export type RiskProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * The data needed to create a RiskProfile.
     */
    data: XOR<RiskProfileCreateInput, RiskProfileUncheckedCreateInput>
  }

  /**
   * RiskProfile createMany
   */
  export type RiskProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiskProfiles.
     */
    data: RiskProfileCreateManyInput | RiskProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskProfile createManyAndReturn
   */
  export type RiskProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RiskProfiles.
     */
    data: RiskProfileCreateManyInput | RiskProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskProfile update
   */
  export type RiskProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * The data needed to update a RiskProfile.
     */
    data: XOR<RiskProfileUpdateInput, RiskProfileUncheckedUpdateInput>
    /**
     * Choose, which RiskProfile to update.
     */
    where: RiskProfileWhereUniqueInput
  }

  /**
   * RiskProfile updateMany
   */
  export type RiskProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiskProfiles.
     */
    data: XOR<RiskProfileUpdateManyMutationInput, RiskProfileUncheckedUpdateManyInput>
    /**
     * Filter which RiskProfiles to update
     */
    where?: RiskProfileWhereInput
  }

  /**
   * RiskProfile upsert
   */
  export type RiskProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * The filter to search for the RiskProfile to update in case it exists.
     */
    where: RiskProfileWhereUniqueInput
    /**
     * In case the RiskProfile found by the `where` argument doesn't exist, create a new RiskProfile with this data.
     */
    create: XOR<RiskProfileCreateInput, RiskProfileUncheckedCreateInput>
    /**
     * In case the RiskProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskProfileUpdateInput, RiskProfileUncheckedUpdateInput>
  }

  /**
   * RiskProfile delete
   */
  export type RiskProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
    /**
     * Filter which RiskProfile to delete.
     */
    where: RiskProfileWhereUniqueInput
  }

  /**
   * RiskProfile deleteMany
   */
  export type RiskProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskProfiles to delete
     */
    where?: RiskProfileWhereInput
  }

  /**
   * RiskProfile without action
   */
  export type RiskProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null
  }


  /**
   * Model FundingRate
   */

  export type AggregateFundingRate = {
    _count: FundingRateCountAggregateOutputType | null
    _avg: FundingRateAvgAggregateOutputType | null
    _sum: FundingRateSumAggregateOutputType | null
    _min: FundingRateMinAggregateOutputType | null
    _max: FundingRateMaxAggregateOutputType | null
  }

  export type FundingRateAvgAggregateOutputType = {
    rate: number | null
    intervalHours: number | null
  }

  export type FundingRateSumAggregateOutputType = {
    rate: number | null
    intervalHours: number | null
  }

  export type FundingRateMinAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    fundedAt: Date | null
    rate: number | null
    intervalHours: number | null
    createdAt: Date | null
  }

  export type FundingRateMaxAggregateOutputType = {
    id: string | null
    instrumentId: string | null
    fundedAt: Date | null
    rate: number | null
    intervalHours: number | null
    createdAt: Date | null
  }

  export type FundingRateCountAggregateOutputType = {
    id: number
    instrumentId: number
    fundedAt: number
    rate: number
    intervalHours: number
    createdAt: number
    _all: number
  }


  export type FundingRateAvgAggregateInputType = {
    rate?: true
    intervalHours?: true
  }

  export type FundingRateSumAggregateInputType = {
    rate?: true
    intervalHours?: true
  }

  export type FundingRateMinAggregateInputType = {
    id?: true
    instrumentId?: true
    fundedAt?: true
    rate?: true
    intervalHours?: true
    createdAt?: true
  }

  export type FundingRateMaxAggregateInputType = {
    id?: true
    instrumentId?: true
    fundedAt?: true
    rate?: true
    intervalHours?: true
    createdAt?: true
  }

  export type FundingRateCountAggregateInputType = {
    id?: true
    instrumentId?: true
    fundedAt?: true
    rate?: true
    intervalHours?: true
    createdAt?: true
    _all?: true
  }

  export type FundingRateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingRate to aggregate.
     */
    where?: FundingRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingRates to fetch.
     */
    orderBy?: FundingRateOrderByWithRelationInput | FundingRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingRates
    **/
    _count?: true | FundingRateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FundingRateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FundingRateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingRateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingRateMaxAggregateInputType
  }

  export type GetFundingRateAggregateType<T extends FundingRateAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingRate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingRate[P]>
      : GetScalarType<T[P], AggregateFundingRate[P]>
  }




  export type FundingRateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingRateWhereInput
    orderBy?: FundingRateOrderByWithAggregationInput | FundingRateOrderByWithAggregationInput[]
    by: FundingRateScalarFieldEnum[] | FundingRateScalarFieldEnum
    having?: FundingRateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingRateCountAggregateInputType | true
    _avg?: FundingRateAvgAggregateInputType
    _sum?: FundingRateSumAggregateInputType
    _min?: FundingRateMinAggregateInputType
    _max?: FundingRateMaxAggregateInputType
  }

  export type FundingRateGroupByOutputType = {
    id: string
    instrumentId: string
    fundedAt: Date
    rate: number
    intervalHours: number
    createdAt: Date
    _count: FundingRateCountAggregateOutputType | null
    _avg: FundingRateAvgAggregateOutputType | null
    _sum: FundingRateSumAggregateOutputType | null
    _min: FundingRateMinAggregateOutputType | null
    _max: FundingRateMaxAggregateOutputType | null
  }

  type GetFundingRateGroupByPayload<T extends FundingRateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingRateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingRateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingRateGroupByOutputType[P]>
            : GetScalarType<T[P], FundingRateGroupByOutputType[P]>
        }
      >
    >


  export type FundingRateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    fundedAt?: boolean
    rate?: boolean
    intervalHours?: boolean
    createdAt?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingRate"]>

  export type FundingRateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instrumentId?: boolean
    fundedAt?: boolean
    rate?: boolean
    intervalHours?: boolean
    createdAt?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingRate"]>

  export type FundingRateSelectScalar = {
    id?: boolean
    instrumentId?: boolean
    fundedAt?: boolean
    rate?: boolean
    intervalHours?: boolean
    createdAt?: boolean
  }

  export type FundingRateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }
  export type FundingRateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }

  export type $FundingRatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingRate"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instrumentId: string
      fundedAt: Date
      rate: number
      intervalHours: number
      createdAt: Date
    }, ExtArgs["result"]["fundingRate"]>
    composites: {}
  }

  type FundingRateGetPayload<S extends boolean | null | undefined | FundingRateDefaultArgs> = $Result.GetResult<Prisma.$FundingRatePayload, S>

  type FundingRateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FundingRateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FundingRateCountAggregateInputType | true
    }

  export interface FundingRateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingRate'], meta: { name: 'FundingRate' } }
    /**
     * Find zero or one FundingRate that matches the filter.
     * @param {FundingRateFindUniqueArgs} args - Arguments to find a FundingRate
     * @example
     * // Get one FundingRate
     * const fundingRate = await prisma.fundingRate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingRateFindUniqueArgs>(args: SelectSubset<T, FundingRateFindUniqueArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FundingRate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FundingRateFindUniqueOrThrowArgs} args - Arguments to find a FundingRate
     * @example
     * // Get one FundingRate
     * const fundingRate = await prisma.fundingRate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingRateFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FundingRate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateFindFirstArgs} args - Arguments to find a FundingRate
     * @example
     * // Get one FundingRate
     * const fundingRate = await prisma.fundingRate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingRateFindFirstArgs>(args?: SelectSubset<T, FundingRateFindFirstArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FundingRate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateFindFirstOrThrowArgs} args - Arguments to find a FundingRate
     * @example
     * // Get one FundingRate
     * const fundingRate = await prisma.fundingRate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingRateFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingRateFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FundingRates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingRates
     * const fundingRates = await prisma.fundingRate.findMany()
     * 
     * // Get first 10 FundingRates
     * const fundingRates = await prisma.fundingRate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fundingRateWithIdOnly = await prisma.fundingRate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FundingRateFindManyArgs>(args?: SelectSubset<T, FundingRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FundingRate.
     * @param {FundingRateCreateArgs} args - Arguments to create a FundingRate.
     * @example
     * // Create one FundingRate
     * const FundingRate = await prisma.fundingRate.create({
     *   data: {
     *     // ... data to create a FundingRate
     *   }
     * })
     * 
     */
    create<T extends FundingRateCreateArgs>(args: SelectSubset<T, FundingRateCreateArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FundingRates.
     * @param {FundingRateCreateManyArgs} args - Arguments to create many FundingRates.
     * @example
     * // Create many FundingRates
     * const fundingRate = await prisma.fundingRate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingRateCreateManyArgs>(args?: SelectSubset<T, FundingRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingRates and returns the data saved in the database.
     * @param {FundingRateCreateManyAndReturnArgs} args - Arguments to create many FundingRates.
     * @example
     * // Create many FundingRates
     * const fundingRate = await prisma.fundingRate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingRates and only return the `id`
     * const fundingRateWithIdOnly = await prisma.fundingRate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingRateCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FundingRate.
     * @param {FundingRateDeleteArgs} args - Arguments to delete one FundingRate.
     * @example
     * // Delete one FundingRate
     * const FundingRate = await prisma.fundingRate.delete({
     *   where: {
     *     // ... filter to delete one FundingRate
     *   }
     * })
     * 
     */
    delete<T extends FundingRateDeleteArgs>(args: SelectSubset<T, FundingRateDeleteArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FundingRate.
     * @param {FundingRateUpdateArgs} args - Arguments to update one FundingRate.
     * @example
     * // Update one FundingRate
     * const fundingRate = await prisma.fundingRate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingRateUpdateArgs>(args: SelectSubset<T, FundingRateUpdateArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FundingRates.
     * @param {FundingRateDeleteManyArgs} args - Arguments to filter FundingRates to delete.
     * @example
     * // Delete a few FundingRates
     * const { count } = await prisma.fundingRate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingRateDeleteManyArgs>(args?: SelectSubset<T, FundingRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingRates
     * const fundingRate = await prisma.fundingRate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingRateUpdateManyArgs>(args: SelectSubset<T, FundingRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FundingRate.
     * @param {FundingRateUpsertArgs} args - Arguments to update or create a FundingRate.
     * @example
     * // Update or create a FundingRate
     * const fundingRate = await prisma.fundingRate.upsert({
     *   create: {
     *     // ... data to create a FundingRate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingRate we want to update
     *   }
     * })
     */
    upsert<T extends FundingRateUpsertArgs>(args: SelectSubset<T, FundingRateUpsertArgs<ExtArgs>>): Prisma__FundingRateClient<$Result.GetResult<Prisma.$FundingRatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FundingRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateCountArgs} args - Arguments to filter FundingRates to count.
     * @example
     * // Count the number of FundingRates
     * const count = await prisma.fundingRate.count({
     *   where: {
     *     // ... the filter for the FundingRates we want to count
     *   }
     * })
    **/
    count<T extends FundingRateCountArgs>(
      args?: Subset<T, FundingRateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingRateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingRateAggregateArgs>(args: Subset<T, FundingRateAggregateArgs>): Prisma.PrismaPromise<GetFundingRateAggregateType<T>>

    /**
     * Group by FundingRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingRateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingRateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingRateGroupByArgs['orderBy'] }
        : { orderBy?: FundingRateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingRate model
   */
  readonly fields: FundingRateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingRate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingRateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingRate model
   */ 
  interface FundingRateFieldRefs {
    readonly id: FieldRef<"FundingRate", 'String'>
    readonly instrumentId: FieldRef<"FundingRate", 'String'>
    readonly fundedAt: FieldRef<"FundingRate", 'DateTime'>
    readonly rate: FieldRef<"FundingRate", 'Float'>
    readonly intervalHours: FieldRef<"FundingRate", 'Int'>
    readonly createdAt: FieldRef<"FundingRate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FundingRate findUnique
   */
  export type FundingRateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * Filter, which FundingRate to fetch.
     */
    where: FundingRateWhereUniqueInput
  }

  /**
   * FundingRate findUniqueOrThrow
   */
  export type FundingRateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * Filter, which FundingRate to fetch.
     */
    where: FundingRateWhereUniqueInput
  }

  /**
   * FundingRate findFirst
   */
  export type FundingRateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * Filter, which FundingRate to fetch.
     */
    where?: FundingRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingRates to fetch.
     */
    orderBy?: FundingRateOrderByWithRelationInput | FundingRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingRates.
     */
    cursor?: FundingRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingRates.
     */
    distinct?: FundingRateScalarFieldEnum | FundingRateScalarFieldEnum[]
  }

  /**
   * FundingRate findFirstOrThrow
   */
  export type FundingRateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * Filter, which FundingRate to fetch.
     */
    where?: FundingRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingRates to fetch.
     */
    orderBy?: FundingRateOrderByWithRelationInput | FundingRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingRates.
     */
    cursor?: FundingRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingRates.
     */
    distinct?: FundingRateScalarFieldEnum | FundingRateScalarFieldEnum[]
  }

  /**
   * FundingRate findMany
   */
  export type FundingRateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * Filter, which FundingRates to fetch.
     */
    where?: FundingRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingRates to fetch.
     */
    orderBy?: FundingRateOrderByWithRelationInput | FundingRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingRates.
     */
    cursor?: FundingRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingRates.
     */
    skip?: number
    distinct?: FundingRateScalarFieldEnum | FundingRateScalarFieldEnum[]
  }

  /**
   * FundingRate create
   */
  export type FundingRateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * The data needed to create a FundingRate.
     */
    data: XOR<FundingRateCreateInput, FundingRateUncheckedCreateInput>
  }

  /**
   * FundingRate createMany
   */
  export type FundingRateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingRates.
     */
    data: FundingRateCreateManyInput | FundingRateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingRate createManyAndReturn
   */
  export type FundingRateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FundingRates.
     */
    data: FundingRateCreateManyInput | FundingRateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FundingRate update
   */
  export type FundingRateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * The data needed to update a FundingRate.
     */
    data: XOR<FundingRateUpdateInput, FundingRateUncheckedUpdateInput>
    /**
     * Choose, which FundingRate to update.
     */
    where: FundingRateWhereUniqueInput
  }

  /**
   * FundingRate updateMany
   */
  export type FundingRateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingRates.
     */
    data: XOR<FundingRateUpdateManyMutationInput, FundingRateUncheckedUpdateManyInput>
    /**
     * Filter which FundingRates to update
     */
    where?: FundingRateWhereInput
  }

  /**
   * FundingRate upsert
   */
  export type FundingRateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * The filter to search for the FundingRate to update in case it exists.
     */
    where: FundingRateWhereUniqueInput
    /**
     * In case the FundingRate found by the `where` argument doesn't exist, create a new FundingRate with this data.
     */
    create: XOR<FundingRateCreateInput, FundingRateUncheckedCreateInput>
    /**
     * In case the FundingRate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingRateUpdateInput, FundingRateUncheckedUpdateInput>
  }

  /**
   * FundingRate delete
   */
  export type FundingRateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
    /**
     * Filter which FundingRate to delete.
     */
    where: FundingRateWhereUniqueInput
  }

  /**
   * FundingRate deleteMany
   */
  export type FundingRateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingRates to delete
     */
    where?: FundingRateWhereInput
  }

  /**
   * FundingRate without action
   */
  export type FundingRateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingRate
     */
    select?: FundingRateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingRateInclude<ExtArgs> | null
  }


  /**
   * Model PortfolioSnapshot
   */

  export type AggregatePortfolioSnapshot = {
    _count: PortfolioSnapshotCountAggregateOutputType | null
    _avg: PortfolioSnapshotAvgAggregateOutputType | null
    _sum: PortfolioSnapshotSumAggregateOutputType | null
    _min: PortfolioSnapshotMinAggregateOutputType | null
    _max: PortfolioSnapshotMaxAggregateOutputType | null
  }

  export type PortfolioSnapshotAvgAggregateOutputType = {
    targetVol: number | null
  }

  export type PortfolioSnapshotSumAggregateOutputType = {
    targetVol: number | null
  }

  export type PortfolioSnapshotMinAggregateOutputType = {
    id: string | null
    takenAt: Date | null
    targetVol: number | null
    note: string | null
  }

  export type PortfolioSnapshotMaxAggregateOutputType = {
    id: string | null
    takenAt: Date | null
    targetVol: number | null
    note: string | null
  }

  export type PortfolioSnapshotCountAggregateOutputType = {
    id: number
    takenAt: number
    targetVol: number
    rows: number
    note: number
    _all: number
  }


  export type PortfolioSnapshotAvgAggregateInputType = {
    targetVol?: true
  }

  export type PortfolioSnapshotSumAggregateInputType = {
    targetVol?: true
  }

  export type PortfolioSnapshotMinAggregateInputType = {
    id?: true
    takenAt?: true
    targetVol?: true
    note?: true
  }

  export type PortfolioSnapshotMaxAggregateInputType = {
    id?: true
    takenAt?: true
    targetVol?: true
    note?: true
  }

  export type PortfolioSnapshotCountAggregateInputType = {
    id?: true
    takenAt?: true
    targetVol?: true
    rows?: true
    note?: true
    _all?: true
  }

  export type PortfolioSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioSnapshot to aggregate.
     */
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     */
    orderBy?: PortfolioSnapshotOrderByWithRelationInput | PortfolioSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortfolioSnapshots
    **/
    _count?: true | PortfolioSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioSnapshotMaxAggregateInputType
  }

  export type GetPortfolioSnapshotAggregateType<T extends PortfolioSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolioSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolioSnapshot[P]>
      : GetScalarType<T[P], AggregatePortfolioSnapshot[P]>
  }




  export type PortfolioSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioSnapshotWhereInput
    orderBy?: PortfolioSnapshotOrderByWithAggregationInput | PortfolioSnapshotOrderByWithAggregationInput[]
    by: PortfolioSnapshotScalarFieldEnum[] | PortfolioSnapshotScalarFieldEnum
    having?: PortfolioSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioSnapshotCountAggregateInputType | true
    _avg?: PortfolioSnapshotAvgAggregateInputType
    _sum?: PortfolioSnapshotSumAggregateInputType
    _min?: PortfolioSnapshotMinAggregateInputType
    _max?: PortfolioSnapshotMaxAggregateInputType
  }

  export type PortfolioSnapshotGroupByOutputType = {
    id: string
    takenAt: Date
    targetVol: number
    rows: JsonValue
    note: string | null
    _count: PortfolioSnapshotCountAggregateOutputType | null
    _avg: PortfolioSnapshotAvgAggregateOutputType | null
    _sum: PortfolioSnapshotSumAggregateOutputType | null
    _min: PortfolioSnapshotMinAggregateOutputType | null
    _max: PortfolioSnapshotMaxAggregateOutputType | null
  }

  type GetPortfolioSnapshotGroupByPayload<T extends PortfolioSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    takenAt?: boolean
    targetVol?: boolean
    rows?: boolean
    note?: boolean
  }, ExtArgs["result"]["portfolioSnapshot"]>

  export type PortfolioSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    takenAt?: boolean
    targetVol?: boolean
    rows?: boolean
    note?: boolean
  }, ExtArgs["result"]["portfolioSnapshot"]>

  export type PortfolioSnapshotSelectScalar = {
    id?: boolean
    takenAt?: boolean
    targetVol?: boolean
    rows?: boolean
    note?: boolean
  }


  export type $PortfolioSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortfolioSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      takenAt: Date
      targetVol: number
      rows: Prisma.JsonValue
      note: string | null
    }, ExtArgs["result"]["portfolioSnapshot"]>
    composites: {}
  }

  type PortfolioSnapshotGetPayload<S extends boolean | null | undefined | PortfolioSnapshotDefaultArgs> = $Result.GetResult<Prisma.$PortfolioSnapshotPayload, S>

  type PortfolioSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PortfolioSnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PortfolioSnapshotCountAggregateInputType | true
    }

  export interface PortfolioSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortfolioSnapshot'], meta: { name: 'PortfolioSnapshot' } }
    /**
     * Find zero or one PortfolioSnapshot that matches the filter.
     * @param {PortfolioSnapshotFindUniqueArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioSnapshotFindUniqueArgs>(args: SelectSubset<T, PortfolioSnapshotFindUniqueArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PortfolioSnapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PortfolioSnapshotFindUniqueOrThrowArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PortfolioSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotFindFirstArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioSnapshotFindFirstArgs>(args?: SelectSubset<T, PortfolioSnapshotFindFirstArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PortfolioSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotFindFirstOrThrowArgs} args - Arguments to find a PortfolioSnapshot
     * @example
     * // Get one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PortfolioSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortfolioSnapshots
     * const portfolioSnapshots = await prisma.portfolioSnapshot.findMany()
     * 
     * // Get first 10 PortfolioSnapshots
     * const portfolioSnapshots = await prisma.portfolioSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioSnapshotWithIdOnly = await prisma.portfolioSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioSnapshotFindManyArgs>(args?: SelectSubset<T, PortfolioSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PortfolioSnapshot.
     * @param {PortfolioSnapshotCreateArgs} args - Arguments to create a PortfolioSnapshot.
     * @example
     * // Create one PortfolioSnapshot
     * const PortfolioSnapshot = await prisma.portfolioSnapshot.create({
     *   data: {
     *     // ... data to create a PortfolioSnapshot
     *   }
     * })
     * 
     */
    create<T extends PortfolioSnapshotCreateArgs>(args: SelectSubset<T, PortfolioSnapshotCreateArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PortfolioSnapshots.
     * @param {PortfolioSnapshotCreateManyArgs} args - Arguments to create many PortfolioSnapshots.
     * @example
     * // Create many PortfolioSnapshots
     * const portfolioSnapshot = await prisma.portfolioSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioSnapshotCreateManyArgs>(args?: SelectSubset<T, PortfolioSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortfolioSnapshots and returns the data saved in the database.
     * @param {PortfolioSnapshotCreateManyAndReturnArgs} args - Arguments to create many PortfolioSnapshots.
     * @example
     * // Create many PortfolioSnapshots
     * const portfolioSnapshot = await prisma.portfolioSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortfolioSnapshots and only return the `id`
     * const portfolioSnapshotWithIdOnly = await prisma.portfolioSnapshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PortfolioSnapshot.
     * @param {PortfolioSnapshotDeleteArgs} args - Arguments to delete one PortfolioSnapshot.
     * @example
     * // Delete one PortfolioSnapshot
     * const PortfolioSnapshot = await prisma.portfolioSnapshot.delete({
     *   where: {
     *     // ... filter to delete one PortfolioSnapshot
     *   }
     * })
     * 
     */
    delete<T extends PortfolioSnapshotDeleteArgs>(args: SelectSubset<T, PortfolioSnapshotDeleteArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PortfolioSnapshot.
     * @param {PortfolioSnapshotUpdateArgs} args - Arguments to update one PortfolioSnapshot.
     * @example
     * // Update one PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioSnapshotUpdateArgs>(args: SelectSubset<T, PortfolioSnapshotUpdateArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PortfolioSnapshots.
     * @param {PortfolioSnapshotDeleteManyArgs} args - Arguments to filter PortfolioSnapshots to delete.
     * @example
     * // Delete a few PortfolioSnapshots
     * const { count } = await prisma.portfolioSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioSnapshotDeleteManyArgs>(args?: SelectSubset<T, PortfolioSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortfolioSnapshots
     * const portfolioSnapshot = await prisma.portfolioSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioSnapshotUpdateManyArgs>(args: SelectSubset<T, PortfolioSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PortfolioSnapshot.
     * @param {PortfolioSnapshotUpsertArgs} args - Arguments to update or create a PortfolioSnapshot.
     * @example
     * // Update or create a PortfolioSnapshot
     * const portfolioSnapshot = await prisma.portfolioSnapshot.upsert({
     *   create: {
     *     // ... data to create a PortfolioSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortfolioSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioSnapshotUpsertArgs>(args: SelectSubset<T, PortfolioSnapshotUpsertArgs<ExtArgs>>): Prisma__PortfolioSnapshotClient<$Result.GetResult<Prisma.$PortfolioSnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PortfolioSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotCountArgs} args - Arguments to filter PortfolioSnapshots to count.
     * @example
     * // Count the number of PortfolioSnapshots
     * const count = await prisma.portfolioSnapshot.count({
     *   where: {
     *     // ... the filter for the PortfolioSnapshots we want to count
     *   }
     * })
    **/
    count<T extends PortfolioSnapshotCountArgs>(
      args?: Subset<T, PortfolioSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortfolioSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioSnapshotAggregateArgs>(args: Subset<T, PortfolioSnapshotAggregateArgs>): Prisma.PrismaPromise<GetPortfolioSnapshotAggregateType<T>>

    /**
     * Group by PortfolioSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortfolioSnapshot model
   */
  readonly fields: PortfolioSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortfolioSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortfolioSnapshot model
   */ 
  interface PortfolioSnapshotFieldRefs {
    readonly id: FieldRef<"PortfolioSnapshot", 'String'>
    readonly takenAt: FieldRef<"PortfolioSnapshot", 'DateTime'>
    readonly targetVol: FieldRef<"PortfolioSnapshot", 'Float'>
    readonly rows: FieldRef<"PortfolioSnapshot", 'Json'>
    readonly note: FieldRef<"PortfolioSnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PortfolioSnapshot findUnique
   */
  export type PortfolioSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which PortfolioSnapshot to fetch.
     */
    where: PortfolioSnapshotWhereUniqueInput
  }

  /**
   * PortfolioSnapshot findUniqueOrThrow
   */
  export type PortfolioSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which PortfolioSnapshot to fetch.
     */
    where: PortfolioSnapshotWhereUniqueInput
  }

  /**
   * PortfolioSnapshot findFirst
   */
  export type PortfolioSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which PortfolioSnapshot to fetch.
     */
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     */
    orderBy?: PortfolioSnapshotOrderByWithRelationInput | PortfolioSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioSnapshots.
     */
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioSnapshots.
     */
    distinct?: PortfolioSnapshotScalarFieldEnum | PortfolioSnapshotScalarFieldEnum[]
  }

  /**
   * PortfolioSnapshot findFirstOrThrow
   */
  export type PortfolioSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which PortfolioSnapshot to fetch.
     */
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     */
    orderBy?: PortfolioSnapshotOrderByWithRelationInput | PortfolioSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioSnapshots.
     */
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioSnapshots.
     */
    distinct?: PortfolioSnapshotScalarFieldEnum | PortfolioSnapshotScalarFieldEnum[]
  }

  /**
   * PortfolioSnapshot findMany
   */
  export type PortfolioSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which PortfolioSnapshots to fetch.
     */
    where?: PortfolioSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioSnapshots to fetch.
     */
    orderBy?: PortfolioSnapshotOrderByWithRelationInput | PortfolioSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortfolioSnapshots.
     */
    cursor?: PortfolioSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioSnapshots.
     */
    skip?: number
    distinct?: PortfolioSnapshotScalarFieldEnum | PortfolioSnapshotScalarFieldEnum[]
  }

  /**
   * PortfolioSnapshot create
   */
  export type PortfolioSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to create a PortfolioSnapshot.
     */
    data: XOR<PortfolioSnapshotCreateInput, PortfolioSnapshotUncheckedCreateInput>
  }

  /**
   * PortfolioSnapshot createMany
   */
  export type PortfolioSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortfolioSnapshots.
     */
    data: PortfolioSnapshotCreateManyInput | PortfolioSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioSnapshot createManyAndReturn
   */
  export type PortfolioSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PortfolioSnapshots.
     */
    data: PortfolioSnapshotCreateManyInput | PortfolioSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioSnapshot update
   */
  export type PortfolioSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to update a PortfolioSnapshot.
     */
    data: XOR<PortfolioSnapshotUpdateInput, PortfolioSnapshotUncheckedUpdateInput>
    /**
     * Choose, which PortfolioSnapshot to update.
     */
    where: PortfolioSnapshotWhereUniqueInput
  }

  /**
   * PortfolioSnapshot updateMany
   */
  export type PortfolioSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortfolioSnapshots.
     */
    data: XOR<PortfolioSnapshotUpdateManyMutationInput, PortfolioSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioSnapshots to update
     */
    where?: PortfolioSnapshotWhereInput
  }

  /**
   * PortfolioSnapshot upsert
   */
  export type PortfolioSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * The filter to search for the PortfolioSnapshot to update in case it exists.
     */
    where: PortfolioSnapshotWhereUniqueInput
    /**
     * In case the PortfolioSnapshot found by the `where` argument doesn't exist, create a new PortfolioSnapshot with this data.
     */
    create: XOR<PortfolioSnapshotCreateInput, PortfolioSnapshotUncheckedCreateInput>
    /**
     * In case the PortfolioSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioSnapshotUpdateInput, PortfolioSnapshotUncheckedUpdateInput>
  }

  /**
   * PortfolioSnapshot delete
   */
  export type PortfolioSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
    /**
     * Filter which PortfolioSnapshot to delete.
     */
    where: PortfolioSnapshotWhereUniqueInput
  }

  /**
   * PortfolioSnapshot deleteMany
   */
  export type PortfolioSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioSnapshots to delete
     */
    where?: PortfolioSnapshotWhereInput
  }

  /**
   * PortfolioSnapshot without action
   */
  export type PortfolioSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioSnapshot
     */
    select?: PortfolioSnapshotSelect<ExtArgs> | null
  }


  /**
   * Model AppSetting
   */

  export type AggregateAppSetting = {
    _count: AppSettingCountAggregateOutputType | null
    _min: AppSettingMinAggregateOutputType | null
    _max: AppSettingMaxAggregateOutputType | null
  }

  export type AppSettingMinAggregateOutputType = {
    key: string | null
    value: string | null
    secret: boolean | null
    updatedAt: Date | null
  }

  export type AppSettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
    secret: boolean | null
    updatedAt: Date | null
  }

  export type AppSettingCountAggregateOutputType = {
    key: number
    value: number
    secret: number
    updatedAt: number
    _all: number
  }


  export type AppSettingMinAggregateInputType = {
    key?: true
    value?: true
    secret?: true
    updatedAt?: true
  }

  export type AppSettingMaxAggregateInputType = {
    key?: true
    value?: true
    secret?: true
    updatedAt?: true
  }

  export type AppSettingCountAggregateInputType = {
    key?: true
    value?: true
    secret?: true
    updatedAt?: true
    _all?: true
  }

  export type AppSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSetting to aggregate.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppSettings
    **/
    _count?: true | AppSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppSettingMaxAggregateInputType
  }

  export type GetAppSettingAggregateType<T extends AppSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateAppSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppSetting[P]>
      : GetScalarType<T[P], AggregateAppSetting[P]>
  }




  export type AppSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppSettingWhereInput
    orderBy?: AppSettingOrderByWithAggregationInput | AppSettingOrderByWithAggregationInput[]
    by: AppSettingScalarFieldEnum[] | AppSettingScalarFieldEnum
    having?: AppSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppSettingCountAggregateInputType | true
    _min?: AppSettingMinAggregateInputType
    _max?: AppSettingMaxAggregateInputType
  }

  export type AppSettingGroupByOutputType = {
    key: string
    value: string
    secret: boolean
    updatedAt: Date
    _count: AppSettingCountAggregateOutputType | null
    _min: AppSettingMinAggregateOutputType | null
    _max: AppSettingMaxAggregateOutputType | null
  }

  type GetAppSettingGroupByPayload<T extends AppSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppSettingGroupByOutputType[P]>
            : GetScalarType<T[P], AppSettingGroupByOutputType[P]>
        }
      >
    >


  export type AppSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    secret?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSetting"]>

  export type AppSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    secret?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appSetting"]>

  export type AppSettingSelectScalar = {
    key?: boolean
    value?: boolean
    secret?: boolean
    updatedAt?: boolean
  }


  export type $AppSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      secret: boolean
      updatedAt: Date
    }, ExtArgs["result"]["appSetting"]>
    composites: {}
  }

  type AppSettingGetPayload<S extends boolean | null | undefined | AppSettingDefaultArgs> = $Result.GetResult<Prisma.$AppSettingPayload, S>

  type AppSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppSettingCountAggregateInputType | true
    }

  export interface AppSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppSetting'], meta: { name: 'AppSetting' } }
    /**
     * Find zero or one AppSetting that matches the filter.
     * @param {AppSettingFindUniqueArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppSettingFindUniqueArgs>(args: SelectSubset<T, AppSettingFindUniqueArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppSetting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppSettingFindUniqueOrThrowArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, AppSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingFindFirstArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppSettingFindFirstArgs>(args?: SelectSubset<T, AppSettingFindFirstArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingFindFirstOrThrowArgs} args - Arguments to find a AppSetting
     * @example
     * // Get one AppSetting
     * const appSetting = await prisma.appSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, AppSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppSettings
     * const appSettings = await prisma.appSetting.findMany()
     * 
     * // Get first 10 AppSettings
     * const appSettings = await prisma.appSetting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const appSettingWithKeyOnly = await prisma.appSetting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends AppSettingFindManyArgs>(args?: SelectSubset<T, AppSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppSetting.
     * @param {AppSettingCreateArgs} args - Arguments to create a AppSetting.
     * @example
     * // Create one AppSetting
     * const AppSetting = await prisma.appSetting.create({
     *   data: {
     *     // ... data to create a AppSetting
     *   }
     * })
     * 
     */
    create<T extends AppSettingCreateArgs>(args: SelectSubset<T, AppSettingCreateArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppSettings.
     * @param {AppSettingCreateManyArgs} args - Arguments to create many AppSettings.
     * @example
     * // Create many AppSettings
     * const appSetting = await prisma.appSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppSettingCreateManyArgs>(args?: SelectSubset<T, AppSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppSettings and returns the data saved in the database.
     * @param {AppSettingCreateManyAndReturnArgs} args - Arguments to create many AppSettings.
     * @example
     * // Create many AppSettings
     * const appSetting = await prisma.appSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppSettings and only return the `key`
     * const appSettingWithKeyOnly = await prisma.appSetting.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, AppSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppSetting.
     * @param {AppSettingDeleteArgs} args - Arguments to delete one AppSetting.
     * @example
     * // Delete one AppSetting
     * const AppSetting = await prisma.appSetting.delete({
     *   where: {
     *     // ... filter to delete one AppSetting
     *   }
     * })
     * 
     */
    delete<T extends AppSettingDeleteArgs>(args: SelectSubset<T, AppSettingDeleteArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppSetting.
     * @param {AppSettingUpdateArgs} args - Arguments to update one AppSetting.
     * @example
     * // Update one AppSetting
     * const appSetting = await prisma.appSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppSettingUpdateArgs>(args: SelectSubset<T, AppSettingUpdateArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppSettings.
     * @param {AppSettingDeleteManyArgs} args - Arguments to filter AppSettings to delete.
     * @example
     * // Delete a few AppSettings
     * const { count } = await prisma.appSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppSettingDeleteManyArgs>(args?: SelectSubset<T, AppSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppSettings
     * const appSetting = await prisma.appSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppSettingUpdateManyArgs>(args: SelectSubset<T, AppSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppSetting.
     * @param {AppSettingUpsertArgs} args - Arguments to update or create a AppSetting.
     * @example
     * // Update or create a AppSetting
     * const appSetting = await prisma.appSetting.upsert({
     *   create: {
     *     // ... data to create a AppSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppSetting we want to update
     *   }
     * })
     */
    upsert<T extends AppSettingUpsertArgs>(args: SelectSubset<T, AppSettingUpsertArgs<ExtArgs>>): Prisma__AppSettingClient<$Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingCountArgs} args - Arguments to filter AppSettings to count.
     * @example
     * // Count the number of AppSettings
     * const count = await prisma.appSetting.count({
     *   where: {
     *     // ... the filter for the AppSettings we want to count
     *   }
     * })
    **/
    count<T extends AppSettingCountArgs>(
      args?: Subset<T, AppSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppSettingAggregateArgs>(args: Subset<T, AppSettingAggregateArgs>): Prisma.PrismaPromise<GetAppSettingAggregateType<T>>

    /**
     * Group by AppSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppSettingGroupByArgs['orderBy'] }
        : { orderBy?: AppSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppSetting model
   */
  readonly fields: AppSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppSetting model
   */ 
  interface AppSettingFieldRefs {
    readonly key: FieldRef<"AppSetting", 'String'>
    readonly value: FieldRef<"AppSetting", 'String'>
    readonly secret: FieldRef<"AppSetting", 'Boolean'>
    readonly updatedAt: FieldRef<"AppSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppSetting findUnique
   */
  export type AppSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting findUniqueOrThrow
   */
  export type AppSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting findFirst
   */
  export type AppSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingScalarFieldEnum | AppSettingScalarFieldEnum[]
  }

  /**
   * AppSetting findFirstOrThrow
   */
  export type AppSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Filter, which AppSetting to fetch.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppSettings.
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppSettings.
     */
    distinct?: AppSettingScalarFieldEnum | AppSettingScalarFieldEnum[]
  }

  /**
   * AppSetting findMany
   */
  export type AppSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Filter, which AppSettings to fetch.
     */
    where?: AppSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppSettings to fetch.
     */
    orderBy?: AppSettingOrderByWithRelationInput | AppSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppSettings.
     */
    cursor?: AppSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppSettings.
     */
    skip?: number
    distinct?: AppSettingScalarFieldEnum | AppSettingScalarFieldEnum[]
  }

  /**
   * AppSetting create
   */
  export type AppSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a AppSetting.
     */
    data: XOR<AppSettingCreateInput, AppSettingUncheckedCreateInput>
  }

  /**
   * AppSetting createMany
   */
  export type AppSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppSettings.
     */
    data: AppSettingCreateManyInput | AppSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSetting createManyAndReturn
   */
  export type AppSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppSettings.
     */
    data: AppSettingCreateManyInput | AppSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppSetting update
   */
  export type AppSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a AppSetting.
     */
    data: XOR<AppSettingUpdateInput, AppSettingUncheckedUpdateInput>
    /**
     * Choose, which AppSetting to update.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting updateMany
   */
  export type AppSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppSettings.
     */
    data: XOR<AppSettingUpdateManyMutationInput, AppSettingUncheckedUpdateManyInput>
    /**
     * Filter which AppSettings to update
     */
    where?: AppSettingWhereInput
  }

  /**
   * AppSetting upsert
   */
  export type AppSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the AppSetting to update in case it exists.
     */
    where: AppSettingWhereUniqueInput
    /**
     * In case the AppSetting found by the `where` argument doesn't exist, create a new AppSetting with this data.
     */
    create: XOR<AppSettingCreateInput, AppSettingUncheckedCreateInput>
    /**
     * In case the AppSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppSettingUpdateInput, AppSettingUncheckedUpdateInput>
  }

  /**
   * AppSetting delete
   */
  export type AppSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
    /**
     * Filter which AppSetting to delete.
     */
    where: AppSettingWhereUniqueInput
  }

  /**
   * AppSetting deleteMany
   */
  export type AppSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppSettings to delete
     */
    where?: AppSettingWhereInput
  }

  /**
   * AppSetting without action
   */
  export type AppSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppSetting
     */
    select?: AppSettingSelect<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: string | null
    job: string | null
    ok: boolean | null
    message: string | null
    startedAt: Date | null
    finishedAt: Date | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: string | null
    job: string | null
    ok: boolean | null
    message: string | null
    startedAt: Date | null
    finishedAt: Date | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    job: number
    ok: number
    message: number
    startedAt: number
    finishedAt: number
    _all: number
  }


  export type SyncLogMinAggregateInputType = {
    id?: true
    job?: true
    ok?: true
    message?: true
    startedAt?: true
    finishedAt?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    job?: true
    ok?: true
    message?: true
    startedAt?: true
    finishedAt?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    job?: true
    ok?: true
    message?: true
    startedAt?: true
    finishedAt?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: string
    job: string
    ok: boolean
    message: string
    startedAt: Date
    finishedAt: Date | null
    _count: SyncLogCountAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job?: boolean
    ok?: boolean
    message?: boolean
    startedAt?: boolean
    finishedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job?: boolean
    ok?: boolean
    message?: boolean
    startedAt?: boolean
    finishedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    job?: boolean
    ok?: boolean
    message?: boolean
    startedAt?: boolean
    finishedAt?: boolean
  }


  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      job: string
      ok: boolean
      message: string
      startedAt: Date
      finishedAt: Date | null
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */ 
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'String'>
    readonly job: FieldRef<"SyncLog", 'String'>
    readonly ok: FieldRef<"SyncLog", 'Boolean'>
    readonly message: FieldRef<"SyncLog", 'String'>
    readonly startedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly finishedAt: FieldRef<"SyncLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
  }


  /**
   * Model TokenScreen
   */

  export type AggregateTokenScreen = {
    _count: TokenScreenCountAggregateOutputType | null
    _avg: TokenScreenAvgAggregateOutputType | null
    _sum: TokenScreenSumAggregateOutputType | null
    _min: TokenScreenMinAggregateOutputType | null
    _max: TokenScreenMaxAggregateOutputType | null
  }

  export type TokenScreenAvgAggregateOutputType = {
    safety: number | null
    liquidityUsd: number | null
    fdvUsd: number | null
    liqAtSettle: number | null
  }

  export type TokenScreenSumAggregateOutputType = {
    safety: number | null
    liquidityUsd: number | null
    fdvUsd: number | null
    liqAtSettle: number | null
  }

  export type TokenScreenMinAggregateOutputType = {
    id: string | null
    chain: string | null
    mint: string | null
    symbol: string | null
    name: string | null
    screenedAt: Date | null
    grade: string | null
    safety: number | null
    liquidityUsd: number | null
    fdvUsd: number | null
    settledAt: Date | null
    survived: boolean | null
    liqAtSettle: number | null
    failureKind: string | null
  }

  export type TokenScreenMaxAggregateOutputType = {
    id: string | null
    chain: string | null
    mint: string | null
    symbol: string | null
    name: string | null
    screenedAt: Date | null
    grade: string | null
    safety: number | null
    liquidityUsd: number | null
    fdvUsd: number | null
    settledAt: Date | null
    survived: boolean | null
    liqAtSettle: number | null
    failureKind: string | null
  }

  export type TokenScreenCountAggregateOutputType = {
    id: number
    chain: number
    mint: number
    symbol: number
    name: number
    screenedAt: number
    grade: number
    safety: number
    checks: number
    snapshot: number
    errors: number
    liquidityUsd: number
    fdvUsd: number
    settledAt: number
    survived: number
    liqAtSettle: number
    failureKind: number
    _all: number
  }


  export type TokenScreenAvgAggregateInputType = {
    safety?: true
    liquidityUsd?: true
    fdvUsd?: true
    liqAtSettle?: true
  }

  export type TokenScreenSumAggregateInputType = {
    safety?: true
    liquidityUsd?: true
    fdvUsd?: true
    liqAtSettle?: true
  }

  export type TokenScreenMinAggregateInputType = {
    id?: true
    chain?: true
    mint?: true
    symbol?: true
    name?: true
    screenedAt?: true
    grade?: true
    safety?: true
    liquidityUsd?: true
    fdvUsd?: true
    settledAt?: true
    survived?: true
    liqAtSettle?: true
    failureKind?: true
  }

  export type TokenScreenMaxAggregateInputType = {
    id?: true
    chain?: true
    mint?: true
    symbol?: true
    name?: true
    screenedAt?: true
    grade?: true
    safety?: true
    liquidityUsd?: true
    fdvUsd?: true
    settledAt?: true
    survived?: true
    liqAtSettle?: true
    failureKind?: true
  }

  export type TokenScreenCountAggregateInputType = {
    id?: true
    chain?: true
    mint?: true
    symbol?: true
    name?: true
    screenedAt?: true
    grade?: true
    safety?: true
    checks?: true
    snapshot?: true
    errors?: true
    liquidityUsd?: true
    fdvUsd?: true
    settledAt?: true
    survived?: true
    liqAtSettle?: true
    failureKind?: true
    _all?: true
  }

  export type TokenScreenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenScreen to aggregate.
     */
    where?: TokenScreenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenScreens to fetch.
     */
    orderBy?: TokenScreenOrderByWithRelationInput | TokenScreenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenScreenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenScreens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenScreens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenScreens
    **/
    _count?: true | TokenScreenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenScreenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenScreenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenScreenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenScreenMaxAggregateInputType
  }

  export type GetTokenScreenAggregateType<T extends TokenScreenAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenScreen]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenScreen[P]>
      : GetScalarType<T[P], AggregateTokenScreen[P]>
  }




  export type TokenScreenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenScreenWhereInput
    orderBy?: TokenScreenOrderByWithAggregationInput | TokenScreenOrderByWithAggregationInput[]
    by: TokenScreenScalarFieldEnum[] | TokenScreenScalarFieldEnum
    having?: TokenScreenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenScreenCountAggregateInputType | true
    _avg?: TokenScreenAvgAggregateInputType
    _sum?: TokenScreenSumAggregateInputType
    _min?: TokenScreenMinAggregateInputType
    _max?: TokenScreenMaxAggregateInputType
  }

  export type TokenScreenGroupByOutputType = {
    id: string
    chain: string
    mint: string
    symbol: string | null
    name: string | null
    screenedAt: Date
    grade: string
    safety: number
    checks: JsonValue
    snapshot: JsonValue
    errors: JsonValue
    liquidityUsd: number | null
    fdvUsd: number | null
    settledAt: Date | null
    survived: boolean | null
    liqAtSettle: number | null
    failureKind: string | null
    _count: TokenScreenCountAggregateOutputType | null
    _avg: TokenScreenAvgAggregateOutputType | null
    _sum: TokenScreenSumAggregateOutputType | null
    _min: TokenScreenMinAggregateOutputType | null
    _max: TokenScreenMaxAggregateOutputType | null
  }

  type GetTokenScreenGroupByPayload<T extends TokenScreenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenScreenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenScreenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenScreenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenScreenGroupByOutputType[P]>
        }
      >
    >


  export type TokenScreenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    mint?: boolean
    symbol?: boolean
    name?: boolean
    screenedAt?: boolean
    grade?: boolean
    safety?: boolean
    checks?: boolean
    snapshot?: boolean
    errors?: boolean
    liquidityUsd?: boolean
    fdvUsd?: boolean
    settledAt?: boolean
    survived?: boolean
    liqAtSettle?: boolean
    failureKind?: boolean
  }, ExtArgs["result"]["tokenScreen"]>

  export type TokenScreenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    mint?: boolean
    symbol?: boolean
    name?: boolean
    screenedAt?: boolean
    grade?: boolean
    safety?: boolean
    checks?: boolean
    snapshot?: boolean
    errors?: boolean
    liquidityUsd?: boolean
    fdvUsd?: boolean
    settledAt?: boolean
    survived?: boolean
    liqAtSettle?: boolean
    failureKind?: boolean
  }, ExtArgs["result"]["tokenScreen"]>

  export type TokenScreenSelectScalar = {
    id?: boolean
    chain?: boolean
    mint?: boolean
    symbol?: boolean
    name?: boolean
    screenedAt?: boolean
    grade?: boolean
    safety?: boolean
    checks?: boolean
    snapshot?: boolean
    errors?: boolean
    liquidityUsd?: boolean
    fdvUsd?: boolean
    settledAt?: boolean
    survived?: boolean
    liqAtSettle?: boolean
    failureKind?: boolean
  }


  export type $TokenScreenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenScreen"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chain: string
      mint: string
      symbol: string | null
      name: string | null
      screenedAt: Date
      /**
       * avoid | unproven | caution | clear
       */
      grade: string
      safety: number
      /**
       * Every check with its verdict and detail, as shown at screen time.
       */
      checks: Prisma.JsonValue
      /**
       * The raw snapshot the checks were computed from, for re-scoring later without re-fetching.
       */
      snapshot: Prisma.JsonValue
      /**
       * Sources that failed, so a thin screen is never mistaken for a clean one.
       */
      errors: Prisma.JsonValue
      liquidityUsd: number | null
      fdvUsd: number | null
      /**
       * ---- outcome, written once the horizon has passed ----
       */
      settledAt: Date | null
      /**
       * True if liquidity was still present and a sale still quoted at the horizon.
       */
      survived: boolean | null
      /**
       * Liquidity at settle time, for the record.
       */
      liqAtSettle: number | null
      /**
       * Why it failed, when it did: rug | honeypot | drained | unknown
       */
      failureKind: string | null
    }, ExtArgs["result"]["tokenScreen"]>
    composites: {}
  }

  type TokenScreenGetPayload<S extends boolean | null | undefined | TokenScreenDefaultArgs> = $Result.GetResult<Prisma.$TokenScreenPayload, S>

  type TokenScreenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TokenScreenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TokenScreenCountAggregateInputType | true
    }

  export interface TokenScreenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenScreen'], meta: { name: 'TokenScreen' } }
    /**
     * Find zero or one TokenScreen that matches the filter.
     * @param {TokenScreenFindUniqueArgs} args - Arguments to find a TokenScreen
     * @example
     * // Get one TokenScreen
     * const tokenScreen = await prisma.tokenScreen.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenScreenFindUniqueArgs>(args: SelectSubset<T, TokenScreenFindUniqueArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TokenScreen that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TokenScreenFindUniqueOrThrowArgs} args - Arguments to find a TokenScreen
     * @example
     * // Get one TokenScreen
     * const tokenScreen = await prisma.tokenScreen.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenScreenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenScreenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TokenScreen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenFindFirstArgs} args - Arguments to find a TokenScreen
     * @example
     * // Get one TokenScreen
     * const tokenScreen = await prisma.tokenScreen.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenScreenFindFirstArgs>(args?: SelectSubset<T, TokenScreenFindFirstArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TokenScreen that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenFindFirstOrThrowArgs} args - Arguments to find a TokenScreen
     * @example
     * // Get one TokenScreen
     * const tokenScreen = await prisma.tokenScreen.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenScreenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenScreenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TokenScreens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenScreens
     * const tokenScreens = await prisma.tokenScreen.findMany()
     * 
     * // Get first 10 TokenScreens
     * const tokenScreens = await prisma.tokenScreen.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenScreenWithIdOnly = await prisma.tokenScreen.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenScreenFindManyArgs>(args?: SelectSubset<T, TokenScreenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TokenScreen.
     * @param {TokenScreenCreateArgs} args - Arguments to create a TokenScreen.
     * @example
     * // Create one TokenScreen
     * const TokenScreen = await prisma.tokenScreen.create({
     *   data: {
     *     // ... data to create a TokenScreen
     *   }
     * })
     * 
     */
    create<T extends TokenScreenCreateArgs>(args: SelectSubset<T, TokenScreenCreateArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TokenScreens.
     * @param {TokenScreenCreateManyArgs} args - Arguments to create many TokenScreens.
     * @example
     * // Create many TokenScreens
     * const tokenScreen = await prisma.tokenScreen.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenScreenCreateManyArgs>(args?: SelectSubset<T, TokenScreenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenScreens and returns the data saved in the database.
     * @param {TokenScreenCreateManyAndReturnArgs} args - Arguments to create many TokenScreens.
     * @example
     * // Create many TokenScreens
     * const tokenScreen = await prisma.tokenScreen.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenScreens and only return the `id`
     * const tokenScreenWithIdOnly = await prisma.tokenScreen.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenScreenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenScreenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TokenScreen.
     * @param {TokenScreenDeleteArgs} args - Arguments to delete one TokenScreen.
     * @example
     * // Delete one TokenScreen
     * const TokenScreen = await prisma.tokenScreen.delete({
     *   where: {
     *     // ... filter to delete one TokenScreen
     *   }
     * })
     * 
     */
    delete<T extends TokenScreenDeleteArgs>(args: SelectSubset<T, TokenScreenDeleteArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TokenScreen.
     * @param {TokenScreenUpdateArgs} args - Arguments to update one TokenScreen.
     * @example
     * // Update one TokenScreen
     * const tokenScreen = await prisma.tokenScreen.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenScreenUpdateArgs>(args: SelectSubset<T, TokenScreenUpdateArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TokenScreens.
     * @param {TokenScreenDeleteManyArgs} args - Arguments to filter TokenScreens to delete.
     * @example
     * // Delete a few TokenScreens
     * const { count } = await prisma.tokenScreen.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenScreenDeleteManyArgs>(args?: SelectSubset<T, TokenScreenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenScreens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenScreens
     * const tokenScreen = await prisma.tokenScreen.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenScreenUpdateManyArgs>(args: SelectSubset<T, TokenScreenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TokenScreen.
     * @param {TokenScreenUpsertArgs} args - Arguments to update or create a TokenScreen.
     * @example
     * // Update or create a TokenScreen
     * const tokenScreen = await prisma.tokenScreen.upsert({
     *   create: {
     *     // ... data to create a TokenScreen
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenScreen we want to update
     *   }
     * })
     */
    upsert<T extends TokenScreenUpsertArgs>(args: SelectSubset<T, TokenScreenUpsertArgs<ExtArgs>>): Prisma__TokenScreenClient<$Result.GetResult<Prisma.$TokenScreenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TokenScreens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenCountArgs} args - Arguments to filter TokenScreens to count.
     * @example
     * // Count the number of TokenScreens
     * const count = await prisma.tokenScreen.count({
     *   where: {
     *     // ... the filter for the TokenScreens we want to count
     *   }
     * })
    **/
    count<T extends TokenScreenCountArgs>(
      args?: Subset<T, TokenScreenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenScreenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenScreen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenScreenAggregateArgs>(args: Subset<T, TokenScreenAggregateArgs>): Prisma.PrismaPromise<GetTokenScreenAggregateType<T>>

    /**
     * Group by TokenScreen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenScreenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenScreenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenScreenGroupByArgs['orderBy'] }
        : { orderBy?: TokenScreenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenScreenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenScreenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenScreen model
   */
  readonly fields: TokenScreenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenScreen.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenScreenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenScreen model
   */ 
  interface TokenScreenFieldRefs {
    readonly id: FieldRef<"TokenScreen", 'String'>
    readonly chain: FieldRef<"TokenScreen", 'String'>
    readonly mint: FieldRef<"TokenScreen", 'String'>
    readonly symbol: FieldRef<"TokenScreen", 'String'>
    readonly name: FieldRef<"TokenScreen", 'String'>
    readonly screenedAt: FieldRef<"TokenScreen", 'DateTime'>
    readonly grade: FieldRef<"TokenScreen", 'String'>
    readonly safety: FieldRef<"TokenScreen", 'Int'>
    readonly checks: FieldRef<"TokenScreen", 'Json'>
    readonly snapshot: FieldRef<"TokenScreen", 'Json'>
    readonly errors: FieldRef<"TokenScreen", 'Json'>
    readonly liquidityUsd: FieldRef<"TokenScreen", 'Float'>
    readonly fdvUsd: FieldRef<"TokenScreen", 'Float'>
    readonly settledAt: FieldRef<"TokenScreen", 'DateTime'>
    readonly survived: FieldRef<"TokenScreen", 'Boolean'>
    readonly liqAtSettle: FieldRef<"TokenScreen", 'Float'>
    readonly failureKind: FieldRef<"TokenScreen", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TokenScreen findUnique
   */
  export type TokenScreenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * Filter, which TokenScreen to fetch.
     */
    where: TokenScreenWhereUniqueInput
  }

  /**
   * TokenScreen findUniqueOrThrow
   */
  export type TokenScreenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * Filter, which TokenScreen to fetch.
     */
    where: TokenScreenWhereUniqueInput
  }

  /**
   * TokenScreen findFirst
   */
  export type TokenScreenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * Filter, which TokenScreen to fetch.
     */
    where?: TokenScreenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenScreens to fetch.
     */
    orderBy?: TokenScreenOrderByWithRelationInput | TokenScreenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenScreens.
     */
    cursor?: TokenScreenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenScreens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenScreens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenScreens.
     */
    distinct?: TokenScreenScalarFieldEnum | TokenScreenScalarFieldEnum[]
  }

  /**
   * TokenScreen findFirstOrThrow
   */
  export type TokenScreenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * Filter, which TokenScreen to fetch.
     */
    where?: TokenScreenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenScreens to fetch.
     */
    orderBy?: TokenScreenOrderByWithRelationInput | TokenScreenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenScreens.
     */
    cursor?: TokenScreenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenScreens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenScreens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenScreens.
     */
    distinct?: TokenScreenScalarFieldEnum | TokenScreenScalarFieldEnum[]
  }

  /**
   * TokenScreen findMany
   */
  export type TokenScreenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * Filter, which TokenScreens to fetch.
     */
    where?: TokenScreenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenScreens to fetch.
     */
    orderBy?: TokenScreenOrderByWithRelationInput | TokenScreenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenScreens.
     */
    cursor?: TokenScreenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenScreens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenScreens.
     */
    skip?: number
    distinct?: TokenScreenScalarFieldEnum | TokenScreenScalarFieldEnum[]
  }

  /**
   * TokenScreen create
   */
  export type TokenScreenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * The data needed to create a TokenScreen.
     */
    data: XOR<TokenScreenCreateInput, TokenScreenUncheckedCreateInput>
  }

  /**
   * TokenScreen createMany
   */
  export type TokenScreenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenScreens.
     */
    data: TokenScreenCreateManyInput | TokenScreenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenScreen createManyAndReturn
   */
  export type TokenScreenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TokenScreens.
     */
    data: TokenScreenCreateManyInput | TokenScreenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenScreen update
   */
  export type TokenScreenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * The data needed to update a TokenScreen.
     */
    data: XOR<TokenScreenUpdateInput, TokenScreenUncheckedUpdateInput>
    /**
     * Choose, which TokenScreen to update.
     */
    where: TokenScreenWhereUniqueInput
  }

  /**
   * TokenScreen updateMany
   */
  export type TokenScreenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenScreens.
     */
    data: XOR<TokenScreenUpdateManyMutationInput, TokenScreenUncheckedUpdateManyInput>
    /**
     * Filter which TokenScreens to update
     */
    where?: TokenScreenWhereInput
  }

  /**
   * TokenScreen upsert
   */
  export type TokenScreenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * The filter to search for the TokenScreen to update in case it exists.
     */
    where: TokenScreenWhereUniqueInput
    /**
     * In case the TokenScreen found by the `where` argument doesn't exist, create a new TokenScreen with this data.
     */
    create: XOR<TokenScreenCreateInput, TokenScreenUncheckedCreateInput>
    /**
     * In case the TokenScreen was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenScreenUpdateInput, TokenScreenUncheckedUpdateInput>
  }

  /**
   * TokenScreen delete
   */
  export type TokenScreenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
    /**
     * Filter which TokenScreen to delete.
     */
    where: TokenScreenWhereUniqueInput
  }

  /**
   * TokenScreen deleteMany
   */
  export type TokenScreenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenScreens to delete
     */
    where?: TokenScreenWhereInput
  }

  /**
   * TokenScreen without action
   */
  export type TokenScreenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenScreen
     */
    select?: TokenScreenSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const InstrumentScalarFieldEnum: {
    id: 'id',
    market: 'market',
    venue: 'venue',
    symbol: 'symbol',
    display: 'display',
    tickSize: 'tickSize',
    feeBps: 'feeBps',
    slipBps: 'slipBps',
    enabled: 'enabled',
    lastSyncAt: 'lastSyncAt',
    createdAt: 'createdAt'
  };

  export type InstrumentScalarFieldEnum = (typeof InstrumentScalarFieldEnum)[keyof typeof InstrumentScalarFieldEnum]


  export const CandleScalarFieldEnum: {
    id: 'id',
    instrumentId: 'instrumentId',
    timeframe: 'timeframe',
    openTime: 'openTime',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    volume: 'volume'
  };

  export type CandleScalarFieldEnum = (typeof CandleScalarFieldEnum)[keyof typeof CandleScalarFieldEnum]


  export const SetupScalarFieldEnum: {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    timeframe: 'timeframe',
    side: 'side',
    atrTarget: 'atrTarget',
    entryStyle: 'entryStyle',
    manageMode: 'manageMode',
    atrStop: 'atrStop',
    horizonBars: 'horizonBars',
    enabled: 'enabled',
    autoDisabledAt: 'autoDisabledAt',
    reviewNote: 'reviewNote',
    createdAt: 'createdAt'
  };

  export type SetupScalarFieldEnum = (typeof SetupScalarFieldEnum)[keyof typeof SetupScalarFieldEnum]


  export const SignalScalarFieldEnum: {
    id: 'id',
    instrumentId: 'instrumentId',
    setupId: 'setupId',
    barTime: 'barTime',
    lockedAt: 'lockedAt',
    entry: 'entry',
    stop: 'stop',
    target: 'target',
    entryStyle: 'entryStyle',
    manageMode: 'manageMode',
    rr: 'rr',
    atr: 'atr',
    rawP: 'rawP',
    calP: 'calP',
    edge: 'edge',
    riskR: 'riskR',
    features: 'features',
    modelVersion: 'modelVersion',
    state: 'state',
    exitPrice: 'exitPrice',
    exitTime: 'exitTime',
    rMultiple: 'rMultiple',
    settledAt: 'settledAt',
    alertedAt: 'alertedAt',
    exitAlertedAt: 'exitAlertedAt',
    note: 'note'
  };

  export type SignalScalarFieldEnum = (typeof SignalScalarFieldEnum)[keyof typeof SignalScalarFieldEnum]


  export const ModelFitScalarFieldEnum: {
    id: 'id',
    setupId: 'setupId',
    modelVersion: 'modelVersion',
    coefficients: 'coefficients',
    calibration: 'calibration',
    n: 'n',
    fittedTo: 'fittedTo',
    brier: 'brier',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type ModelFitScalarFieldEnum = (typeof ModelFitScalarFieldEnum)[keyof typeof ModelFitScalarFieldEnum]


  export const BacktestRunScalarFieldEnum: {
    id: 'id',
    setupId: 'setupId',
    label: 'label',
    from: 'from',
    to: 'to',
    trades: 'trades',
    hitRate: 'hitRate',
    avgPredP: 'avgPredP',
    expectR: 'expectR',
    totalR: 'totalR',
    maxDdR: 'maxDdR',
    brier: 'brier',
    baseline: 'baseline',
    costsBps: 'costsBps',
    detail: 'detail',
    entryStyle: 'entryStyle',
    manageMode: 'manageMode',
    createdAt: 'createdAt'
  };

  export type BacktestRunScalarFieldEnum = (typeof BacktestRunScalarFieldEnum)[keyof typeof BacktestRunScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    instrumentId: 'instrumentId',
    signalId: 'signalId',
    side: 'side',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    entry: 'entry',
    stop: 'stop',
    target: 'target',
    exit: 'exit',
    sizeUnits: 'sizeUnits',
    riskAmount: 'riskAmount',
    rMultiple: 'rMultiple',
    followedPlan: 'followedPlan',
    reason: 'reason',
    mistakes: 'mistakes',
    createdAt: 'createdAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const RiskProfileScalarFieldEnum: {
    id: 'id',
    accountSize: 'accountSize',
    riskPctPerTrade: 'riskPctPerTrade',
    kellyFraction: 'kellyFraction',
    maxOpenRisk: 'maxOpenRisk',
    maxPerMarket: 'maxPerMarket',
    updatedAt: 'updatedAt'
  };

  export type RiskProfileScalarFieldEnum = (typeof RiskProfileScalarFieldEnum)[keyof typeof RiskProfileScalarFieldEnum]


  export const FundingRateScalarFieldEnum: {
    id: 'id',
    instrumentId: 'instrumentId',
    fundedAt: 'fundedAt',
    rate: 'rate',
    intervalHours: 'intervalHours',
    createdAt: 'createdAt'
  };

  export type FundingRateScalarFieldEnum = (typeof FundingRateScalarFieldEnum)[keyof typeof FundingRateScalarFieldEnum]


  export const PortfolioSnapshotScalarFieldEnum: {
    id: 'id',
    takenAt: 'takenAt',
    targetVol: 'targetVol',
    rows: 'rows',
    note: 'note'
  };

  export type PortfolioSnapshotScalarFieldEnum = (typeof PortfolioSnapshotScalarFieldEnum)[keyof typeof PortfolioSnapshotScalarFieldEnum]


  export const AppSettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    secret: 'secret',
    updatedAt: 'updatedAt'
  };

  export type AppSettingScalarFieldEnum = (typeof AppSettingScalarFieldEnum)[keyof typeof AppSettingScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    job: 'job',
    ok: 'ok',
    message: 'message',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const TokenScreenScalarFieldEnum: {
    id: 'id',
    chain: 'chain',
    mint: 'mint',
    symbol: 'symbol',
    name: 'name',
    screenedAt: 'screenedAt',
    grade: 'grade',
    safety: 'safety',
    checks: 'checks',
    snapshot: 'snapshot',
    errors: 'errors',
    liquidityUsd: 'liquidityUsd',
    fdvUsd: 'fdvUsd',
    settledAt: 'settledAt',
    survived: 'survived',
    liqAtSettle: 'liqAtSettle',
    failureKind: 'failureKind'
  };

  export type TokenScreenScalarFieldEnum = (typeof TokenScreenScalarFieldEnum)[keyof typeof TokenScreenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Market'
   */
  export type EnumMarketFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Market'>
    


  /**
   * Reference to a field of type 'Market[]'
   */
  export type ListEnumMarketFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Market[]'>
    


  /**
   * Reference to a field of type 'Venue'
   */
  export type EnumVenueFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Venue'>
    


  /**
   * Reference to a field of type 'Venue[]'
   */
  export type ListEnumVenueFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Venue[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Side'
   */
  export type EnumSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Side'>
    


  /**
   * Reference to a field of type 'Side[]'
   */
  export type ListEnumSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Side[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'SignalState'
   */
  export type EnumSignalStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignalState'>
    


  /**
   * Reference to a field of type 'SignalState[]'
   */
  export type ListEnumSignalStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignalState[]'>
    
  /**
   * Deep Input Types
   */


  export type InstrumentWhereInput = {
    AND?: InstrumentWhereInput | InstrumentWhereInput[]
    OR?: InstrumentWhereInput[]
    NOT?: InstrumentWhereInput | InstrumentWhereInput[]
    id?: StringFilter<"Instrument"> | string
    market?: EnumMarketFilter<"Instrument"> | $Enums.Market
    venue?: EnumVenueFilter<"Instrument"> | $Enums.Venue
    symbol?: StringFilter<"Instrument"> | string
    display?: StringFilter<"Instrument"> | string
    tickSize?: FloatFilter<"Instrument"> | number
    feeBps?: FloatFilter<"Instrument"> | number
    slipBps?: FloatFilter<"Instrument"> | number
    enabled?: BoolFilter<"Instrument"> | boolean
    lastSyncAt?: DateTimeNullableFilter<"Instrument"> | Date | string | null
    createdAt?: DateTimeFilter<"Instrument"> | Date | string
    candles?: CandleListRelationFilter
    signals?: SignalListRelationFilter
    trades?: TradeListRelationFilter
    funding?: FundingRateListRelationFilter
  }

  export type InstrumentOrderByWithRelationInput = {
    id?: SortOrder
    market?: SortOrder
    venue?: SortOrder
    symbol?: SortOrder
    display?: SortOrder
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
    enabled?: SortOrder
    lastSyncAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    candles?: CandleOrderByRelationAggregateInput
    signals?: SignalOrderByRelationAggregateInput
    trades?: TradeOrderByRelationAggregateInput
    funding?: FundingRateOrderByRelationAggregateInput
  }

  export type InstrumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    venue_symbol?: InstrumentVenueSymbolCompoundUniqueInput
    AND?: InstrumentWhereInput | InstrumentWhereInput[]
    OR?: InstrumentWhereInput[]
    NOT?: InstrumentWhereInput | InstrumentWhereInput[]
    market?: EnumMarketFilter<"Instrument"> | $Enums.Market
    venue?: EnumVenueFilter<"Instrument"> | $Enums.Venue
    symbol?: StringFilter<"Instrument"> | string
    display?: StringFilter<"Instrument"> | string
    tickSize?: FloatFilter<"Instrument"> | number
    feeBps?: FloatFilter<"Instrument"> | number
    slipBps?: FloatFilter<"Instrument"> | number
    enabled?: BoolFilter<"Instrument"> | boolean
    lastSyncAt?: DateTimeNullableFilter<"Instrument"> | Date | string | null
    createdAt?: DateTimeFilter<"Instrument"> | Date | string
    candles?: CandleListRelationFilter
    signals?: SignalListRelationFilter
    trades?: TradeListRelationFilter
    funding?: FundingRateListRelationFilter
  }, "id" | "venue_symbol">

  export type InstrumentOrderByWithAggregationInput = {
    id?: SortOrder
    market?: SortOrder
    venue?: SortOrder
    symbol?: SortOrder
    display?: SortOrder
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
    enabled?: SortOrder
    lastSyncAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InstrumentCountOrderByAggregateInput
    _avg?: InstrumentAvgOrderByAggregateInput
    _max?: InstrumentMaxOrderByAggregateInput
    _min?: InstrumentMinOrderByAggregateInput
    _sum?: InstrumentSumOrderByAggregateInput
  }

  export type InstrumentScalarWhereWithAggregatesInput = {
    AND?: InstrumentScalarWhereWithAggregatesInput | InstrumentScalarWhereWithAggregatesInput[]
    OR?: InstrumentScalarWhereWithAggregatesInput[]
    NOT?: InstrumentScalarWhereWithAggregatesInput | InstrumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Instrument"> | string
    market?: EnumMarketWithAggregatesFilter<"Instrument"> | $Enums.Market
    venue?: EnumVenueWithAggregatesFilter<"Instrument"> | $Enums.Venue
    symbol?: StringWithAggregatesFilter<"Instrument"> | string
    display?: StringWithAggregatesFilter<"Instrument"> | string
    tickSize?: FloatWithAggregatesFilter<"Instrument"> | number
    feeBps?: FloatWithAggregatesFilter<"Instrument"> | number
    slipBps?: FloatWithAggregatesFilter<"Instrument"> | number
    enabled?: BoolWithAggregatesFilter<"Instrument"> | boolean
    lastSyncAt?: DateTimeNullableWithAggregatesFilter<"Instrument"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Instrument"> | Date | string
  }

  export type CandleWhereInput = {
    AND?: CandleWhereInput | CandleWhereInput[]
    OR?: CandleWhereInput[]
    NOT?: CandleWhereInput | CandleWhereInput[]
    id?: StringFilter<"Candle"> | string
    instrumentId?: StringFilter<"Candle"> | string
    timeframe?: StringFilter<"Candle"> | string
    openTime?: DateTimeFilter<"Candle"> | Date | string
    open?: FloatFilter<"Candle"> | number
    high?: FloatFilter<"Candle"> | number
    low?: FloatFilter<"Candle"> | number
    close?: FloatFilter<"Candle"> | number
    volume?: FloatFilter<"Candle"> | number
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }

  export type CandleOrderByWithRelationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    timeframe?: SortOrder
    openTime?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type CandleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instrumentId_timeframe_openTime?: CandleInstrumentIdTimeframeOpenTimeCompoundUniqueInput
    AND?: CandleWhereInput | CandleWhereInput[]
    OR?: CandleWhereInput[]
    NOT?: CandleWhereInput | CandleWhereInput[]
    instrumentId?: StringFilter<"Candle"> | string
    timeframe?: StringFilter<"Candle"> | string
    openTime?: DateTimeFilter<"Candle"> | Date | string
    open?: FloatFilter<"Candle"> | number
    high?: FloatFilter<"Candle"> | number
    low?: FloatFilter<"Candle"> | number
    close?: FloatFilter<"Candle"> | number
    volume?: FloatFilter<"Candle"> | number
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }, "id" | "instrumentId_timeframe_openTime">

  export type CandleOrderByWithAggregationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    timeframe?: SortOrder
    openTime?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    _count?: CandleCountOrderByAggregateInput
    _avg?: CandleAvgOrderByAggregateInput
    _max?: CandleMaxOrderByAggregateInput
    _min?: CandleMinOrderByAggregateInput
    _sum?: CandleSumOrderByAggregateInput
  }

  export type CandleScalarWhereWithAggregatesInput = {
    AND?: CandleScalarWhereWithAggregatesInput | CandleScalarWhereWithAggregatesInput[]
    OR?: CandleScalarWhereWithAggregatesInput[]
    NOT?: CandleScalarWhereWithAggregatesInput | CandleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Candle"> | string
    instrumentId?: StringWithAggregatesFilter<"Candle"> | string
    timeframe?: StringWithAggregatesFilter<"Candle"> | string
    openTime?: DateTimeWithAggregatesFilter<"Candle"> | Date | string
    open?: FloatWithAggregatesFilter<"Candle"> | number
    high?: FloatWithAggregatesFilter<"Candle"> | number
    low?: FloatWithAggregatesFilter<"Candle"> | number
    close?: FloatWithAggregatesFilter<"Candle"> | number
    volume?: FloatWithAggregatesFilter<"Candle"> | number
  }

  export type SetupWhereInput = {
    AND?: SetupWhereInput | SetupWhereInput[]
    OR?: SetupWhereInput[]
    NOT?: SetupWhereInput | SetupWhereInput[]
    id?: StringFilter<"Setup"> | string
    key?: StringFilter<"Setup"> | string
    name?: StringFilter<"Setup"> | string
    description?: StringFilter<"Setup"> | string
    timeframe?: StringFilter<"Setup"> | string
    side?: EnumSideFilter<"Setup"> | $Enums.Side
    atrTarget?: FloatFilter<"Setup"> | number
    entryStyle?: StringFilter<"Setup"> | string
    manageMode?: StringFilter<"Setup"> | string
    atrStop?: FloatFilter<"Setup"> | number
    horizonBars?: IntFilter<"Setup"> | number
    enabled?: BoolFilter<"Setup"> | boolean
    autoDisabledAt?: DateTimeNullableFilter<"Setup"> | Date | string | null
    reviewNote?: StringNullableFilter<"Setup"> | string | null
    createdAt?: DateTimeFilter<"Setup"> | Date | string
    signals?: SignalListRelationFilter
    models?: ModelFitListRelationFilter
    runs?: BacktestRunListRelationFilter
  }

  export type SetupOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    timeframe?: SortOrder
    side?: SortOrder
    atrTarget?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
    enabled?: SortOrder
    autoDisabledAt?: SortOrderInput | SortOrder
    reviewNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    signals?: SignalOrderByRelationAggregateInput
    models?: ModelFitOrderByRelationAggregateInput
    runs?: BacktestRunOrderByRelationAggregateInput
  }

  export type SetupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SetupWhereInput | SetupWhereInput[]
    OR?: SetupWhereInput[]
    NOT?: SetupWhereInput | SetupWhereInput[]
    name?: StringFilter<"Setup"> | string
    description?: StringFilter<"Setup"> | string
    timeframe?: StringFilter<"Setup"> | string
    side?: EnumSideFilter<"Setup"> | $Enums.Side
    atrTarget?: FloatFilter<"Setup"> | number
    entryStyle?: StringFilter<"Setup"> | string
    manageMode?: StringFilter<"Setup"> | string
    atrStop?: FloatFilter<"Setup"> | number
    horizonBars?: IntFilter<"Setup"> | number
    enabled?: BoolFilter<"Setup"> | boolean
    autoDisabledAt?: DateTimeNullableFilter<"Setup"> | Date | string | null
    reviewNote?: StringNullableFilter<"Setup"> | string | null
    createdAt?: DateTimeFilter<"Setup"> | Date | string
    signals?: SignalListRelationFilter
    models?: ModelFitListRelationFilter
    runs?: BacktestRunListRelationFilter
  }, "id" | "key">

  export type SetupOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    timeframe?: SortOrder
    side?: SortOrder
    atrTarget?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
    enabled?: SortOrder
    autoDisabledAt?: SortOrderInput | SortOrder
    reviewNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SetupCountOrderByAggregateInput
    _avg?: SetupAvgOrderByAggregateInput
    _max?: SetupMaxOrderByAggregateInput
    _min?: SetupMinOrderByAggregateInput
    _sum?: SetupSumOrderByAggregateInput
  }

  export type SetupScalarWhereWithAggregatesInput = {
    AND?: SetupScalarWhereWithAggregatesInput | SetupScalarWhereWithAggregatesInput[]
    OR?: SetupScalarWhereWithAggregatesInput[]
    NOT?: SetupScalarWhereWithAggregatesInput | SetupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Setup"> | string
    key?: StringWithAggregatesFilter<"Setup"> | string
    name?: StringWithAggregatesFilter<"Setup"> | string
    description?: StringWithAggregatesFilter<"Setup"> | string
    timeframe?: StringWithAggregatesFilter<"Setup"> | string
    side?: EnumSideWithAggregatesFilter<"Setup"> | $Enums.Side
    atrTarget?: FloatWithAggregatesFilter<"Setup"> | number
    entryStyle?: StringWithAggregatesFilter<"Setup"> | string
    manageMode?: StringWithAggregatesFilter<"Setup"> | string
    atrStop?: FloatWithAggregatesFilter<"Setup"> | number
    horizonBars?: IntWithAggregatesFilter<"Setup"> | number
    enabled?: BoolWithAggregatesFilter<"Setup"> | boolean
    autoDisabledAt?: DateTimeNullableWithAggregatesFilter<"Setup"> | Date | string | null
    reviewNote?: StringNullableWithAggregatesFilter<"Setup"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Setup"> | Date | string
  }

  export type SignalWhereInput = {
    AND?: SignalWhereInput | SignalWhereInput[]
    OR?: SignalWhereInput[]
    NOT?: SignalWhereInput | SignalWhereInput[]
    id?: StringFilter<"Signal"> | string
    instrumentId?: StringFilter<"Signal"> | string
    setupId?: StringFilter<"Signal"> | string
    barTime?: DateTimeFilter<"Signal"> | Date | string
    lockedAt?: DateTimeFilter<"Signal"> | Date | string
    entry?: FloatFilter<"Signal"> | number
    stop?: FloatFilter<"Signal"> | number
    target?: FloatFilter<"Signal"> | number
    entryStyle?: StringFilter<"Signal"> | string
    manageMode?: StringFilter<"Signal"> | string
    rr?: FloatFilter<"Signal"> | number
    atr?: FloatFilter<"Signal"> | number
    rawP?: FloatFilter<"Signal"> | number
    calP?: FloatFilter<"Signal"> | number
    edge?: FloatFilter<"Signal"> | number
    riskR?: FloatFilter<"Signal"> | number
    features?: JsonFilter<"Signal">
    modelVersion?: StringFilter<"Signal"> | string
    state?: EnumSignalStateFilter<"Signal"> | $Enums.SignalState
    exitPrice?: FloatNullableFilter<"Signal"> | number | null
    exitTime?: DateTimeNullableFilter<"Signal"> | Date | string | null
    rMultiple?: FloatNullableFilter<"Signal"> | number | null
    settledAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    alertedAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    exitAlertedAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    note?: StringNullableFilter<"Signal"> | string | null
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
    setup?: XOR<SetupRelationFilter, SetupWhereInput>
  }

  export type SignalOrderByWithRelationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    setupId?: SortOrder
    barTime?: SortOrder
    lockedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    features?: SortOrder
    modelVersion?: SortOrder
    state?: SortOrder
    exitPrice?: SortOrderInput | SortOrder
    exitTime?: SortOrderInput | SortOrder
    rMultiple?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    alertedAt?: SortOrderInput | SortOrder
    exitAlertedAt?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    instrument?: InstrumentOrderByWithRelationInput
    setup?: SetupOrderByWithRelationInput
  }

  export type SignalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instrumentId_setupId_barTime?: SignalInstrumentIdSetupIdBarTimeCompoundUniqueInput
    AND?: SignalWhereInput | SignalWhereInput[]
    OR?: SignalWhereInput[]
    NOT?: SignalWhereInput | SignalWhereInput[]
    instrumentId?: StringFilter<"Signal"> | string
    setupId?: StringFilter<"Signal"> | string
    barTime?: DateTimeFilter<"Signal"> | Date | string
    lockedAt?: DateTimeFilter<"Signal"> | Date | string
    entry?: FloatFilter<"Signal"> | number
    stop?: FloatFilter<"Signal"> | number
    target?: FloatFilter<"Signal"> | number
    entryStyle?: StringFilter<"Signal"> | string
    manageMode?: StringFilter<"Signal"> | string
    rr?: FloatFilter<"Signal"> | number
    atr?: FloatFilter<"Signal"> | number
    rawP?: FloatFilter<"Signal"> | number
    calP?: FloatFilter<"Signal"> | number
    edge?: FloatFilter<"Signal"> | number
    riskR?: FloatFilter<"Signal"> | number
    features?: JsonFilter<"Signal">
    modelVersion?: StringFilter<"Signal"> | string
    state?: EnumSignalStateFilter<"Signal"> | $Enums.SignalState
    exitPrice?: FloatNullableFilter<"Signal"> | number | null
    exitTime?: DateTimeNullableFilter<"Signal"> | Date | string | null
    rMultiple?: FloatNullableFilter<"Signal"> | number | null
    settledAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    alertedAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    exitAlertedAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    note?: StringNullableFilter<"Signal"> | string | null
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
    setup?: XOR<SetupRelationFilter, SetupWhereInput>
  }, "id" | "instrumentId_setupId_barTime">

  export type SignalOrderByWithAggregationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    setupId?: SortOrder
    barTime?: SortOrder
    lockedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    features?: SortOrder
    modelVersion?: SortOrder
    state?: SortOrder
    exitPrice?: SortOrderInput | SortOrder
    exitTime?: SortOrderInput | SortOrder
    rMultiple?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    alertedAt?: SortOrderInput | SortOrder
    exitAlertedAt?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: SignalCountOrderByAggregateInput
    _avg?: SignalAvgOrderByAggregateInput
    _max?: SignalMaxOrderByAggregateInput
    _min?: SignalMinOrderByAggregateInput
    _sum?: SignalSumOrderByAggregateInput
  }

  export type SignalScalarWhereWithAggregatesInput = {
    AND?: SignalScalarWhereWithAggregatesInput | SignalScalarWhereWithAggregatesInput[]
    OR?: SignalScalarWhereWithAggregatesInput[]
    NOT?: SignalScalarWhereWithAggregatesInput | SignalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Signal"> | string
    instrumentId?: StringWithAggregatesFilter<"Signal"> | string
    setupId?: StringWithAggregatesFilter<"Signal"> | string
    barTime?: DateTimeWithAggregatesFilter<"Signal"> | Date | string
    lockedAt?: DateTimeWithAggregatesFilter<"Signal"> | Date | string
    entry?: FloatWithAggregatesFilter<"Signal"> | number
    stop?: FloatWithAggregatesFilter<"Signal"> | number
    target?: FloatWithAggregatesFilter<"Signal"> | number
    entryStyle?: StringWithAggregatesFilter<"Signal"> | string
    manageMode?: StringWithAggregatesFilter<"Signal"> | string
    rr?: FloatWithAggregatesFilter<"Signal"> | number
    atr?: FloatWithAggregatesFilter<"Signal"> | number
    rawP?: FloatWithAggregatesFilter<"Signal"> | number
    calP?: FloatWithAggregatesFilter<"Signal"> | number
    edge?: FloatWithAggregatesFilter<"Signal"> | number
    riskR?: FloatWithAggregatesFilter<"Signal"> | number
    features?: JsonWithAggregatesFilter<"Signal">
    modelVersion?: StringWithAggregatesFilter<"Signal"> | string
    state?: EnumSignalStateWithAggregatesFilter<"Signal"> | $Enums.SignalState
    exitPrice?: FloatNullableWithAggregatesFilter<"Signal"> | number | null
    exitTime?: DateTimeNullableWithAggregatesFilter<"Signal"> | Date | string | null
    rMultiple?: FloatNullableWithAggregatesFilter<"Signal"> | number | null
    settledAt?: DateTimeNullableWithAggregatesFilter<"Signal"> | Date | string | null
    alertedAt?: DateTimeNullableWithAggregatesFilter<"Signal"> | Date | string | null
    exitAlertedAt?: DateTimeNullableWithAggregatesFilter<"Signal"> | Date | string | null
    note?: StringNullableWithAggregatesFilter<"Signal"> | string | null
  }

  export type ModelFitWhereInput = {
    AND?: ModelFitWhereInput | ModelFitWhereInput[]
    OR?: ModelFitWhereInput[]
    NOT?: ModelFitWhereInput | ModelFitWhereInput[]
    id?: StringFilter<"ModelFit"> | string
    setupId?: StringFilter<"ModelFit"> | string
    modelVersion?: StringFilter<"ModelFit"> | string
    coefficients?: JsonFilter<"ModelFit">
    calibration?: JsonFilter<"ModelFit">
    n?: IntFilter<"ModelFit"> | number
    fittedTo?: DateTimeFilter<"ModelFit"> | Date | string
    brier?: FloatFilter<"ModelFit"> | number
    active?: BoolFilter<"ModelFit"> | boolean
    createdAt?: DateTimeFilter<"ModelFit"> | Date | string
    setup?: XOR<SetupRelationFilter, SetupWhereInput>
  }

  export type ModelFitOrderByWithRelationInput = {
    id?: SortOrder
    setupId?: SortOrder
    modelVersion?: SortOrder
    coefficients?: SortOrder
    calibration?: SortOrder
    n?: SortOrder
    fittedTo?: SortOrder
    brier?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    setup?: SetupOrderByWithRelationInput
  }

  export type ModelFitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ModelFitWhereInput | ModelFitWhereInput[]
    OR?: ModelFitWhereInput[]
    NOT?: ModelFitWhereInput | ModelFitWhereInput[]
    setupId?: StringFilter<"ModelFit"> | string
    modelVersion?: StringFilter<"ModelFit"> | string
    coefficients?: JsonFilter<"ModelFit">
    calibration?: JsonFilter<"ModelFit">
    n?: IntFilter<"ModelFit"> | number
    fittedTo?: DateTimeFilter<"ModelFit"> | Date | string
    brier?: FloatFilter<"ModelFit"> | number
    active?: BoolFilter<"ModelFit"> | boolean
    createdAt?: DateTimeFilter<"ModelFit"> | Date | string
    setup?: XOR<SetupRelationFilter, SetupWhereInput>
  }, "id">

  export type ModelFitOrderByWithAggregationInput = {
    id?: SortOrder
    setupId?: SortOrder
    modelVersion?: SortOrder
    coefficients?: SortOrder
    calibration?: SortOrder
    n?: SortOrder
    fittedTo?: SortOrder
    brier?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: ModelFitCountOrderByAggregateInput
    _avg?: ModelFitAvgOrderByAggregateInput
    _max?: ModelFitMaxOrderByAggregateInput
    _min?: ModelFitMinOrderByAggregateInput
    _sum?: ModelFitSumOrderByAggregateInput
  }

  export type ModelFitScalarWhereWithAggregatesInput = {
    AND?: ModelFitScalarWhereWithAggregatesInput | ModelFitScalarWhereWithAggregatesInput[]
    OR?: ModelFitScalarWhereWithAggregatesInput[]
    NOT?: ModelFitScalarWhereWithAggregatesInput | ModelFitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModelFit"> | string
    setupId?: StringWithAggregatesFilter<"ModelFit"> | string
    modelVersion?: StringWithAggregatesFilter<"ModelFit"> | string
    coefficients?: JsonWithAggregatesFilter<"ModelFit">
    calibration?: JsonWithAggregatesFilter<"ModelFit">
    n?: IntWithAggregatesFilter<"ModelFit"> | number
    fittedTo?: DateTimeWithAggregatesFilter<"ModelFit"> | Date | string
    brier?: FloatWithAggregatesFilter<"ModelFit"> | number
    active?: BoolWithAggregatesFilter<"ModelFit"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ModelFit"> | Date | string
  }

  export type BacktestRunWhereInput = {
    AND?: BacktestRunWhereInput | BacktestRunWhereInput[]
    OR?: BacktestRunWhereInput[]
    NOT?: BacktestRunWhereInput | BacktestRunWhereInput[]
    id?: StringFilter<"BacktestRun"> | string
    setupId?: StringFilter<"BacktestRun"> | string
    label?: StringFilter<"BacktestRun"> | string
    from?: DateTimeFilter<"BacktestRun"> | Date | string
    to?: DateTimeFilter<"BacktestRun"> | Date | string
    trades?: IntFilter<"BacktestRun"> | number
    hitRate?: FloatFilter<"BacktestRun"> | number
    avgPredP?: FloatFilter<"BacktestRun"> | number
    expectR?: FloatFilter<"BacktestRun"> | number
    totalR?: FloatFilter<"BacktestRun"> | number
    maxDdR?: FloatFilter<"BacktestRun"> | number
    brier?: FloatFilter<"BacktestRun"> | number
    baseline?: JsonFilter<"BacktestRun">
    costsBps?: FloatFilter<"BacktestRun"> | number
    detail?: JsonFilter<"BacktestRun">
    entryStyle?: StringFilter<"BacktestRun"> | string
    manageMode?: StringFilter<"BacktestRun"> | string
    createdAt?: DateTimeFilter<"BacktestRun"> | Date | string
    setup?: XOR<SetupRelationFilter, SetupWhereInput>
  }

  export type BacktestRunOrderByWithRelationInput = {
    id?: SortOrder
    setupId?: SortOrder
    label?: SortOrder
    from?: SortOrder
    to?: SortOrder
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    baseline?: SortOrder
    costsBps?: SortOrder
    detail?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    createdAt?: SortOrder
    setup?: SetupOrderByWithRelationInput
  }

  export type BacktestRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BacktestRunWhereInput | BacktestRunWhereInput[]
    OR?: BacktestRunWhereInput[]
    NOT?: BacktestRunWhereInput | BacktestRunWhereInput[]
    setupId?: StringFilter<"BacktestRun"> | string
    label?: StringFilter<"BacktestRun"> | string
    from?: DateTimeFilter<"BacktestRun"> | Date | string
    to?: DateTimeFilter<"BacktestRun"> | Date | string
    trades?: IntFilter<"BacktestRun"> | number
    hitRate?: FloatFilter<"BacktestRun"> | number
    avgPredP?: FloatFilter<"BacktestRun"> | number
    expectR?: FloatFilter<"BacktestRun"> | number
    totalR?: FloatFilter<"BacktestRun"> | number
    maxDdR?: FloatFilter<"BacktestRun"> | number
    brier?: FloatFilter<"BacktestRun"> | number
    baseline?: JsonFilter<"BacktestRun">
    costsBps?: FloatFilter<"BacktestRun"> | number
    detail?: JsonFilter<"BacktestRun">
    entryStyle?: StringFilter<"BacktestRun"> | string
    manageMode?: StringFilter<"BacktestRun"> | string
    createdAt?: DateTimeFilter<"BacktestRun"> | Date | string
    setup?: XOR<SetupRelationFilter, SetupWhereInput>
  }, "id">

  export type BacktestRunOrderByWithAggregationInput = {
    id?: SortOrder
    setupId?: SortOrder
    label?: SortOrder
    from?: SortOrder
    to?: SortOrder
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    baseline?: SortOrder
    costsBps?: SortOrder
    detail?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    createdAt?: SortOrder
    _count?: BacktestRunCountOrderByAggregateInput
    _avg?: BacktestRunAvgOrderByAggregateInput
    _max?: BacktestRunMaxOrderByAggregateInput
    _min?: BacktestRunMinOrderByAggregateInput
    _sum?: BacktestRunSumOrderByAggregateInput
  }

  export type BacktestRunScalarWhereWithAggregatesInput = {
    AND?: BacktestRunScalarWhereWithAggregatesInput | BacktestRunScalarWhereWithAggregatesInput[]
    OR?: BacktestRunScalarWhereWithAggregatesInput[]
    NOT?: BacktestRunScalarWhereWithAggregatesInput | BacktestRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BacktestRun"> | string
    setupId?: StringWithAggregatesFilter<"BacktestRun"> | string
    label?: StringWithAggregatesFilter<"BacktestRun"> | string
    from?: DateTimeWithAggregatesFilter<"BacktestRun"> | Date | string
    to?: DateTimeWithAggregatesFilter<"BacktestRun"> | Date | string
    trades?: IntWithAggregatesFilter<"BacktestRun"> | number
    hitRate?: FloatWithAggregatesFilter<"BacktestRun"> | number
    avgPredP?: FloatWithAggregatesFilter<"BacktestRun"> | number
    expectR?: FloatWithAggregatesFilter<"BacktestRun"> | number
    totalR?: FloatWithAggregatesFilter<"BacktestRun"> | number
    maxDdR?: FloatWithAggregatesFilter<"BacktestRun"> | number
    brier?: FloatWithAggregatesFilter<"BacktestRun"> | number
    baseline?: JsonWithAggregatesFilter<"BacktestRun">
    costsBps?: FloatWithAggregatesFilter<"BacktestRun"> | number
    detail?: JsonWithAggregatesFilter<"BacktestRun">
    entryStyle?: StringWithAggregatesFilter<"BacktestRun"> | string
    manageMode?: StringWithAggregatesFilter<"BacktestRun"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BacktestRun"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    instrumentId?: StringFilter<"Trade"> | string
    signalId?: StringNullableFilter<"Trade"> | string | null
    side?: EnumSideFilter<"Trade"> | $Enums.Side
    openedAt?: DateTimeFilter<"Trade"> | Date | string
    closedAt?: DateTimeNullableFilter<"Trade"> | Date | string | null
    entry?: FloatFilter<"Trade"> | number
    stop?: FloatFilter<"Trade"> | number
    target?: FloatNullableFilter<"Trade"> | number | null
    exit?: FloatNullableFilter<"Trade"> | number | null
    sizeUnits?: FloatFilter<"Trade"> | number
    riskAmount?: FloatFilter<"Trade"> | number
    rMultiple?: FloatNullableFilter<"Trade"> | number | null
    followedPlan?: BoolFilter<"Trade"> | boolean
    reason?: StringNullableFilter<"Trade"> | string | null
    mistakes?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    signalId?: SortOrderInput | SortOrder
    side?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrderInput | SortOrder
    exit?: SortOrderInput | SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrderInput | SortOrder
    followedPlan?: SortOrder
    reason?: SortOrderInput | SortOrder
    mistakes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    instrumentId?: StringFilter<"Trade"> | string
    signalId?: StringNullableFilter<"Trade"> | string | null
    side?: EnumSideFilter<"Trade"> | $Enums.Side
    openedAt?: DateTimeFilter<"Trade"> | Date | string
    closedAt?: DateTimeNullableFilter<"Trade"> | Date | string | null
    entry?: FloatFilter<"Trade"> | number
    stop?: FloatFilter<"Trade"> | number
    target?: FloatNullableFilter<"Trade"> | number | null
    exit?: FloatNullableFilter<"Trade"> | number | null
    sizeUnits?: FloatFilter<"Trade"> | number
    riskAmount?: FloatFilter<"Trade"> | number
    rMultiple?: FloatNullableFilter<"Trade"> | number | null
    followedPlan?: BoolFilter<"Trade"> | boolean
    reason?: StringNullableFilter<"Trade"> | string | null
    mistakes?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    signalId?: SortOrderInput | SortOrder
    side?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrderInput | SortOrder
    exit?: SortOrderInput | SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrderInput | SortOrder
    followedPlan?: SortOrder
    reason?: SortOrderInput | SortOrder
    mistakes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    instrumentId?: StringWithAggregatesFilter<"Trade"> | string
    signalId?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    side?: EnumSideWithAggregatesFilter<"Trade"> | $Enums.Side
    openedAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"Trade"> | Date | string | null
    entry?: FloatWithAggregatesFilter<"Trade"> | number
    stop?: FloatWithAggregatesFilter<"Trade"> | number
    target?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    exit?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    sizeUnits?: FloatWithAggregatesFilter<"Trade"> | number
    riskAmount?: FloatWithAggregatesFilter<"Trade"> | number
    rMultiple?: FloatNullableWithAggregatesFilter<"Trade"> | number | null
    followedPlan?: BoolWithAggregatesFilter<"Trade"> | boolean
    reason?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    mistakes?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type RiskProfileWhereInput = {
    AND?: RiskProfileWhereInput | RiskProfileWhereInput[]
    OR?: RiskProfileWhereInput[]
    NOT?: RiskProfileWhereInput | RiskProfileWhereInput[]
    id?: StringFilter<"RiskProfile"> | string
    accountSize?: FloatFilter<"RiskProfile"> | number
    riskPctPerTrade?: FloatFilter<"RiskProfile"> | number
    kellyFraction?: FloatFilter<"RiskProfile"> | number
    maxOpenRisk?: FloatFilter<"RiskProfile"> | number
    maxPerMarket?: IntFilter<"RiskProfile"> | number
    updatedAt?: DateTimeFilter<"RiskProfile"> | Date | string
  }

  export type RiskProfileOrderByWithRelationInput = {
    id?: SortOrder
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiskProfileWhereInput | RiskProfileWhereInput[]
    OR?: RiskProfileWhereInput[]
    NOT?: RiskProfileWhereInput | RiskProfileWhereInput[]
    accountSize?: FloatFilter<"RiskProfile"> | number
    riskPctPerTrade?: FloatFilter<"RiskProfile"> | number
    kellyFraction?: FloatFilter<"RiskProfile"> | number
    maxOpenRisk?: FloatFilter<"RiskProfile"> | number
    maxPerMarket?: IntFilter<"RiskProfile"> | number
    updatedAt?: DateTimeFilter<"RiskProfile"> | Date | string
  }, "id">

  export type RiskProfileOrderByWithAggregationInput = {
    id?: SortOrder
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
    updatedAt?: SortOrder
    _count?: RiskProfileCountOrderByAggregateInput
    _avg?: RiskProfileAvgOrderByAggregateInput
    _max?: RiskProfileMaxOrderByAggregateInput
    _min?: RiskProfileMinOrderByAggregateInput
    _sum?: RiskProfileSumOrderByAggregateInput
  }

  export type RiskProfileScalarWhereWithAggregatesInput = {
    AND?: RiskProfileScalarWhereWithAggregatesInput | RiskProfileScalarWhereWithAggregatesInput[]
    OR?: RiskProfileScalarWhereWithAggregatesInput[]
    NOT?: RiskProfileScalarWhereWithAggregatesInput | RiskProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiskProfile"> | string
    accountSize?: FloatWithAggregatesFilter<"RiskProfile"> | number
    riskPctPerTrade?: FloatWithAggregatesFilter<"RiskProfile"> | number
    kellyFraction?: FloatWithAggregatesFilter<"RiskProfile"> | number
    maxOpenRisk?: FloatWithAggregatesFilter<"RiskProfile"> | number
    maxPerMarket?: IntWithAggregatesFilter<"RiskProfile"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"RiskProfile"> | Date | string
  }

  export type FundingRateWhereInput = {
    AND?: FundingRateWhereInput | FundingRateWhereInput[]
    OR?: FundingRateWhereInput[]
    NOT?: FundingRateWhereInput | FundingRateWhereInput[]
    id?: StringFilter<"FundingRate"> | string
    instrumentId?: StringFilter<"FundingRate"> | string
    fundedAt?: DateTimeFilter<"FundingRate"> | Date | string
    rate?: FloatFilter<"FundingRate"> | number
    intervalHours?: IntFilter<"FundingRate"> | number
    createdAt?: DateTimeFilter<"FundingRate"> | Date | string
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }

  export type FundingRateOrderByWithRelationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    fundedAt?: SortOrder
    rate?: SortOrder
    intervalHours?: SortOrder
    createdAt?: SortOrder
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type FundingRateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instrumentId_fundedAt?: FundingRateInstrumentIdFundedAtCompoundUniqueInput
    AND?: FundingRateWhereInput | FundingRateWhereInput[]
    OR?: FundingRateWhereInput[]
    NOT?: FundingRateWhereInput | FundingRateWhereInput[]
    instrumentId?: StringFilter<"FundingRate"> | string
    fundedAt?: DateTimeFilter<"FundingRate"> | Date | string
    rate?: FloatFilter<"FundingRate"> | number
    intervalHours?: IntFilter<"FundingRate"> | number
    createdAt?: DateTimeFilter<"FundingRate"> | Date | string
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }, "id" | "instrumentId_fundedAt">

  export type FundingRateOrderByWithAggregationInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    fundedAt?: SortOrder
    rate?: SortOrder
    intervalHours?: SortOrder
    createdAt?: SortOrder
    _count?: FundingRateCountOrderByAggregateInput
    _avg?: FundingRateAvgOrderByAggregateInput
    _max?: FundingRateMaxOrderByAggregateInput
    _min?: FundingRateMinOrderByAggregateInput
    _sum?: FundingRateSumOrderByAggregateInput
  }

  export type FundingRateScalarWhereWithAggregatesInput = {
    AND?: FundingRateScalarWhereWithAggregatesInput | FundingRateScalarWhereWithAggregatesInput[]
    OR?: FundingRateScalarWhereWithAggregatesInput[]
    NOT?: FundingRateScalarWhereWithAggregatesInput | FundingRateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FundingRate"> | string
    instrumentId?: StringWithAggregatesFilter<"FundingRate"> | string
    fundedAt?: DateTimeWithAggregatesFilter<"FundingRate"> | Date | string
    rate?: FloatWithAggregatesFilter<"FundingRate"> | number
    intervalHours?: IntWithAggregatesFilter<"FundingRate"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FundingRate"> | Date | string
  }

  export type PortfolioSnapshotWhereInput = {
    AND?: PortfolioSnapshotWhereInput | PortfolioSnapshotWhereInput[]
    OR?: PortfolioSnapshotWhereInput[]
    NOT?: PortfolioSnapshotWhereInput | PortfolioSnapshotWhereInput[]
    id?: StringFilter<"PortfolioSnapshot"> | string
    takenAt?: DateTimeFilter<"PortfolioSnapshot"> | Date | string
    targetVol?: FloatFilter<"PortfolioSnapshot"> | number
    rows?: JsonFilter<"PortfolioSnapshot">
    note?: StringNullableFilter<"PortfolioSnapshot"> | string | null
  }

  export type PortfolioSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    takenAt?: SortOrder
    targetVol?: SortOrder
    rows?: SortOrder
    note?: SortOrderInput | SortOrder
  }

  export type PortfolioSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioSnapshotWhereInput | PortfolioSnapshotWhereInput[]
    OR?: PortfolioSnapshotWhereInput[]
    NOT?: PortfolioSnapshotWhereInput | PortfolioSnapshotWhereInput[]
    takenAt?: DateTimeFilter<"PortfolioSnapshot"> | Date | string
    targetVol?: FloatFilter<"PortfolioSnapshot"> | number
    rows?: JsonFilter<"PortfolioSnapshot">
    note?: StringNullableFilter<"PortfolioSnapshot"> | string | null
  }, "id">

  export type PortfolioSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    takenAt?: SortOrder
    targetVol?: SortOrder
    rows?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: PortfolioSnapshotCountOrderByAggregateInput
    _avg?: PortfolioSnapshotAvgOrderByAggregateInput
    _max?: PortfolioSnapshotMaxOrderByAggregateInput
    _min?: PortfolioSnapshotMinOrderByAggregateInput
    _sum?: PortfolioSnapshotSumOrderByAggregateInput
  }

  export type PortfolioSnapshotScalarWhereWithAggregatesInput = {
    AND?: PortfolioSnapshotScalarWhereWithAggregatesInput | PortfolioSnapshotScalarWhereWithAggregatesInput[]
    OR?: PortfolioSnapshotScalarWhereWithAggregatesInput[]
    NOT?: PortfolioSnapshotScalarWhereWithAggregatesInput | PortfolioSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortfolioSnapshot"> | string
    takenAt?: DateTimeWithAggregatesFilter<"PortfolioSnapshot"> | Date | string
    targetVol?: FloatWithAggregatesFilter<"PortfolioSnapshot"> | number
    rows?: JsonWithAggregatesFilter<"PortfolioSnapshot">
    note?: StringNullableWithAggregatesFilter<"PortfolioSnapshot"> | string | null
  }

  export type AppSettingWhereInput = {
    AND?: AppSettingWhereInput | AppSettingWhereInput[]
    OR?: AppSettingWhereInput[]
    NOT?: AppSettingWhereInput | AppSettingWhereInput[]
    key?: StringFilter<"AppSetting"> | string
    value?: StringFilter<"AppSetting"> | string
    secret?: BoolFilter<"AppSetting"> | boolean
    updatedAt?: DateTimeFilter<"AppSetting"> | Date | string
  }

  export type AppSettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    secret?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AppSettingWhereInput | AppSettingWhereInput[]
    OR?: AppSettingWhereInput[]
    NOT?: AppSettingWhereInput | AppSettingWhereInput[]
    value?: StringFilter<"AppSetting"> | string
    secret?: BoolFilter<"AppSetting"> | boolean
    updatedAt?: DateTimeFilter<"AppSetting"> | Date | string
  }, "key">

  export type AppSettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    secret?: SortOrder
    updatedAt?: SortOrder
    _count?: AppSettingCountOrderByAggregateInput
    _max?: AppSettingMaxOrderByAggregateInput
    _min?: AppSettingMinOrderByAggregateInput
  }

  export type AppSettingScalarWhereWithAggregatesInput = {
    AND?: AppSettingScalarWhereWithAggregatesInput | AppSettingScalarWhereWithAggregatesInput[]
    OR?: AppSettingScalarWhereWithAggregatesInput[]
    NOT?: AppSettingScalarWhereWithAggregatesInput | AppSettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"AppSetting"> | string
    value?: StringWithAggregatesFilter<"AppSetting"> | string
    secret?: BoolWithAggregatesFilter<"AppSetting"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"AppSetting"> | Date | string
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: StringFilter<"SyncLog"> | string
    job?: StringFilter<"SyncLog"> | string
    ok?: BoolFilter<"SyncLog"> | boolean
    message?: StringFilter<"SyncLog"> | string
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    finishedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    job?: SortOrder
    ok?: SortOrder
    message?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    job?: StringFilter<"SyncLog"> | string
    ok?: BoolFilter<"SyncLog"> | boolean
    message?: StringFilter<"SyncLog"> | string
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    finishedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    job?: SortOrder
    ok?: SortOrder
    message?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncLog"> | string
    job?: StringWithAggregatesFilter<"SyncLog"> | string
    ok?: BoolWithAggregatesFilter<"SyncLog"> | boolean
    message?: StringWithAggregatesFilter<"SyncLog"> | string
    startedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"SyncLog"> | Date | string | null
  }

  export type TokenScreenWhereInput = {
    AND?: TokenScreenWhereInput | TokenScreenWhereInput[]
    OR?: TokenScreenWhereInput[]
    NOT?: TokenScreenWhereInput | TokenScreenWhereInput[]
    id?: StringFilter<"TokenScreen"> | string
    chain?: StringFilter<"TokenScreen"> | string
    mint?: StringFilter<"TokenScreen"> | string
    symbol?: StringNullableFilter<"TokenScreen"> | string | null
    name?: StringNullableFilter<"TokenScreen"> | string | null
    screenedAt?: DateTimeFilter<"TokenScreen"> | Date | string
    grade?: StringFilter<"TokenScreen"> | string
    safety?: IntFilter<"TokenScreen"> | number
    checks?: JsonFilter<"TokenScreen">
    snapshot?: JsonFilter<"TokenScreen">
    errors?: JsonFilter<"TokenScreen">
    liquidityUsd?: FloatNullableFilter<"TokenScreen"> | number | null
    fdvUsd?: FloatNullableFilter<"TokenScreen"> | number | null
    settledAt?: DateTimeNullableFilter<"TokenScreen"> | Date | string | null
    survived?: BoolNullableFilter<"TokenScreen"> | boolean | null
    liqAtSettle?: FloatNullableFilter<"TokenScreen"> | number | null
    failureKind?: StringNullableFilter<"TokenScreen"> | string | null
  }

  export type TokenScreenOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    screenedAt?: SortOrder
    grade?: SortOrder
    safety?: SortOrder
    checks?: SortOrder
    snapshot?: SortOrder
    errors?: SortOrder
    liquidityUsd?: SortOrderInput | SortOrder
    fdvUsd?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    survived?: SortOrderInput | SortOrder
    liqAtSettle?: SortOrderInput | SortOrder
    failureKind?: SortOrderInput | SortOrder
  }

  export type TokenScreenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TokenScreenWhereInput | TokenScreenWhereInput[]
    OR?: TokenScreenWhereInput[]
    NOT?: TokenScreenWhereInput | TokenScreenWhereInput[]
    chain?: StringFilter<"TokenScreen"> | string
    mint?: StringFilter<"TokenScreen"> | string
    symbol?: StringNullableFilter<"TokenScreen"> | string | null
    name?: StringNullableFilter<"TokenScreen"> | string | null
    screenedAt?: DateTimeFilter<"TokenScreen"> | Date | string
    grade?: StringFilter<"TokenScreen"> | string
    safety?: IntFilter<"TokenScreen"> | number
    checks?: JsonFilter<"TokenScreen">
    snapshot?: JsonFilter<"TokenScreen">
    errors?: JsonFilter<"TokenScreen">
    liquidityUsd?: FloatNullableFilter<"TokenScreen"> | number | null
    fdvUsd?: FloatNullableFilter<"TokenScreen"> | number | null
    settledAt?: DateTimeNullableFilter<"TokenScreen"> | Date | string | null
    survived?: BoolNullableFilter<"TokenScreen"> | boolean | null
    liqAtSettle?: FloatNullableFilter<"TokenScreen"> | number | null
    failureKind?: StringNullableFilter<"TokenScreen"> | string | null
  }, "id">

  export type TokenScreenOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    screenedAt?: SortOrder
    grade?: SortOrder
    safety?: SortOrder
    checks?: SortOrder
    snapshot?: SortOrder
    errors?: SortOrder
    liquidityUsd?: SortOrderInput | SortOrder
    fdvUsd?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    survived?: SortOrderInput | SortOrder
    liqAtSettle?: SortOrderInput | SortOrder
    failureKind?: SortOrderInput | SortOrder
    _count?: TokenScreenCountOrderByAggregateInput
    _avg?: TokenScreenAvgOrderByAggregateInput
    _max?: TokenScreenMaxOrderByAggregateInput
    _min?: TokenScreenMinOrderByAggregateInput
    _sum?: TokenScreenSumOrderByAggregateInput
  }

  export type TokenScreenScalarWhereWithAggregatesInput = {
    AND?: TokenScreenScalarWhereWithAggregatesInput | TokenScreenScalarWhereWithAggregatesInput[]
    OR?: TokenScreenScalarWhereWithAggregatesInput[]
    NOT?: TokenScreenScalarWhereWithAggregatesInput | TokenScreenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenScreen"> | string
    chain?: StringWithAggregatesFilter<"TokenScreen"> | string
    mint?: StringWithAggregatesFilter<"TokenScreen"> | string
    symbol?: StringNullableWithAggregatesFilter<"TokenScreen"> | string | null
    name?: StringNullableWithAggregatesFilter<"TokenScreen"> | string | null
    screenedAt?: DateTimeWithAggregatesFilter<"TokenScreen"> | Date | string
    grade?: StringWithAggregatesFilter<"TokenScreen"> | string
    safety?: IntWithAggregatesFilter<"TokenScreen"> | number
    checks?: JsonWithAggregatesFilter<"TokenScreen">
    snapshot?: JsonWithAggregatesFilter<"TokenScreen">
    errors?: JsonWithAggregatesFilter<"TokenScreen">
    liquidityUsd?: FloatNullableWithAggregatesFilter<"TokenScreen"> | number | null
    fdvUsd?: FloatNullableWithAggregatesFilter<"TokenScreen"> | number | null
    settledAt?: DateTimeNullableWithAggregatesFilter<"TokenScreen"> | Date | string | null
    survived?: BoolNullableWithAggregatesFilter<"TokenScreen"> | boolean | null
    liqAtSettle?: FloatNullableWithAggregatesFilter<"TokenScreen"> | number | null
    failureKind?: StringNullableWithAggregatesFilter<"TokenScreen"> | string | null
  }

  export type InstrumentCreateInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleCreateNestedManyWithoutInstrumentInput
    signals?: SignalCreateNestedManyWithoutInstrumentInput
    trades?: TradeCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleUncheckedCreateNestedManyWithoutInstrumentInput
    signals?: SignalUncheckedCreateNestedManyWithoutInstrumentInput
    trades?: TradeUncheckedCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUpdateManyWithoutInstrumentNestedInput
    signals?: SignalUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUncheckedUpdateManyWithoutInstrumentNestedInput
    signals?: SignalUncheckedUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUncheckedUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentCreateManyInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
  }

  export type InstrumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstrumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandleCreateInput = {
    id?: string
    timeframe: string
    openTime: Date | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
    instrument: InstrumentCreateNestedOneWithoutCandlesInput
  }

  export type CandleUncheckedCreateInput = {
    id?: string
    instrumentId: string
    timeframe: string
    openTime: Date | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }

  export type CandleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    instrument?: InstrumentUpdateOneRequiredWithoutCandlesNestedInput
  }

  export type CandleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
  }

  export type CandleCreateManyInput = {
    id?: string
    instrumentId: string
    timeframe: string
    openTime: Date | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }

  export type CandleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
  }

  export type CandleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
  }

  export type SetupCreateInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    signals?: SignalCreateNestedManyWithoutSetupInput
    models?: ModelFitCreateNestedManyWithoutSetupInput
    runs?: BacktestRunCreateNestedManyWithoutSetupInput
  }

  export type SetupUncheckedCreateInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    signals?: SignalUncheckedCreateNestedManyWithoutSetupInput
    models?: ModelFitUncheckedCreateNestedManyWithoutSetupInput
    runs?: BacktestRunUncheckedCreateNestedManyWithoutSetupInput
  }

  export type SetupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUpdateManyWithoutSetupNestedInput
    models?: ModelFitUpdateManyWithoutSetupNestedInput
    runs?: BacktestRunUpdateManyWithoutSetupNestedInput
  }

  export type SetupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUncheckedUpdateManyWithoutSetupNestedInput
    models?: ModelFitUncheckedUpdateManyWithoutSetupNestedInput
    runs?: BacktestRunUncheckedUpdateManyWithoutSetupNestedInput
  }

  export type SetupCreateManyInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
  }

  export type SetupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalCreateInput = {
    id?: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
    instrument: InstrumentCreateNestedOneWithoutSignalsInput
    setup: SetupCreateNestedOneWithoutSignalsInput
  }

  export type SignalUncheckedCreateInput = {
    id?: string
    instrumentId: string
    setupId: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
  }

  export type SignalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    instrument?: InstrumentUpdateOneRequiredWithoutSignalsNestedInput
    setup?: SetupUpdateOneRequiredWithoutSignalsNestedInput
  }

  export type SignalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignalCreateManyInput = {
    id?: string
    instrumentId: string
    setupId: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
  }

  export type SignalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ModelFitCreateInput = {
    id?: string
    modelVersion: string
    coefficients: JsonNullValueInput | InputJsonValue
    calibration: JsonNullValueInput | InputJsonValue
    n: number
    fittedTo: Date | string
    brier: number
    active?: boolean
    createdAt?: Date | string
    setup: SetupCreateNestedOneWithoutModelsInput
  }

  export type ModelFitUncheckedCreateInput = {
    id?: string
    setupId: string
    modelVersion: string
    coefficients: JsonNullValueInput | InputJsonValue
    calibration: JsonNullValueInput | InputJsonValue
    n: number
    fittedTo: Date | string
    brier: number
    active?: boolean
    createdAt?: Date | string
  }

  export type ModelFitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    setup?: SetupUpdateOneRequiredWithoutModelsNestedInput
  }

  export type ModelFitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelFitCreateManyInput = {
    id?: string
    setupId: string
    modelVersion: string
    coefficients: JsonNullValueInput | InputJsonValue
    calibration: JsonNullValueInput | InputJsonValue
    n: number
    fittedTo: Date | string
    brier: number
    active?: boolean
    createdAt?: Date | string
  }

  export type ModelFitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelFitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BacktestRunCreateInput = {
    id?: string
    label: string
    from: Date | string
    to: Date | string
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonNullValueInput | InputJsonValue
    costsBps: number
    detail: JsonNullValueInput | InputJsonValue
    entryStyle?: string
    manageMode?: string
    createdAt?: Date | string
    setup: SetupCreateNestedOneWithoutRunsInput
  }

  export type BacktestRunUncheckedCreateInput = {
    id?: string
    setupId: string
    label: string
    from: Date | string
    to: Date | string
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonNullValueInput | InputJsonValue
    costsBps: number
    detail: JsonNullValueInput | InputJsonValue
    entryStyle?: string
    manageMode?: string
    createdAt?: Date | string
  }

  export type BacktestRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    setup?: SetupUpdateOneRequiredWithoutRunsNestedInput
  }

  export type BacktestRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BacktestRunCreateManyInput = {
    id?: string
    setupId: string
    label: string
    from: Date | string
    to: Date | string
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonNullValueInput | InputJsonValue
    costsBps: number
    detail: JsonNullValueInput | InputJsonValue
    entryStyle?: string
    manageMode?: string
    createdAt?: Date | string
  }

  export type BacktestRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BacktestRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    id?: string
    signalId?: string | null
    side: $Enums.Side
    openedAt: Date | string
    closedAt?: Date | string | null
    entry: number
    stop: number
    target?: number | null
    exit?: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple?: number | null
    followedPlan?: boolean
    reason?: string | null
    mistakes?: string | null
    createdAt?: Date | string
    instrument: InstrumentCreateNestedOneWithoutTradesInput
  }

  export type TradeUncheckedCreateInput = {
    id?: string
    instrumentId: string
    signalId?: string | null
    side: $Enums.Side
    openedAt: Date | string
    closedAt?: Date | string | null
    entry: number
    stop: number
    target?: number | null
    exit?: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple?: number | null
    followedPlan?: boolean
    reason?: string | null
    mistakes?: string | null
    createdAt?: Date | string
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instrument?: InstrumentUpdateOneRequiredWithoutTradesNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id?: string
    instrumentId: string
    signalId?: string | null
    side: $Enums.Side
    openedAt: Date | string
    closedAt?: Date | string | null
    entry: number
    stop: number
    target?: number | null
    exit?: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple?: number | null
    followedPlan?: boolean
    reason?: string | null
    mistakes?: string | null
    createdAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskProfileCreateInput = {
    id?: string
    accountSize?: number
    riskPctPerTrade?: number
    kellyFraction?: number
    maxOpenRisk?: number
    maxPerMarket?: number
    updatedAt?: Date | string
  }

  export type RiskProfileUncheckedCreateInput = {
    id?: string
    accountSize?: number
    riskPctPerTrade?: number
    kellyFraction?: number
    maxOpenRisk?: number
    maxPerMarket?: number
    updatedAt?: Date | string
  }

  export type RiskProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountSize?: FloatFieldUpdateOperationsInput | number
    riskPctPerTrade?: FloatFieldUpdateOperationsInput | number
    kellyFraction?: FloatFieldUpdateOperationsInput | number
    maxOpenRisk?: FloatFieldUpdateOperationsInput | number
    maxPerMarket?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountSize?: FloatFieldUpdateOperationsInput | number
    riskPctPerTrade?: FloatFieldUpdateOperationsInput | number
    kellyFraction?: FloatFieldUpdateOperationsInput | number
    maxOpenRisk?: FloatFieldUpdateOperationsInput | number
    maxPerMarket?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskProfileCreateManyInput = {
    id?: string
    accountSize?: number
    riskPctPerTrade?: number
    kellyFraction?: number
    maxOpenRisk?: number
    maxPerMarket?: number
    updatedAt?: Date | string
  }

  export type RiskProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountSize?: FloatFieldUpdateOperationsInput | number
    riskPctPerTrade?: FloatFieldUpdateOperationsInput | number
    kellyFraction?: FloatFieldUpdateOperationsInput | number
    maxOpenRisk?: FloatFieldUpdateOperationsInput | number
    maxPerMarket?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountSize?: FloatFieldUpdateOperationsInput | number
    riskPctPerTrade?: FloatFieldUpdateOperationsInput | number
    kellyFraction?: FloatFieldUpdateOperationsInput | number
    maxOpenRisk?: FloatFieldUpdateOperationsInput | number
    maxPerMarket?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingRateCreateInput = {
    id?: string
    fundedAt: Date | string
    rate: number
    intervalHours?: number
    createdAt?: Date | string
    instrument: InstrumentCreateNestedOneWithoutFundingInput
  }

  export type FundingRateUncheckedCreateInput = {
    id?: string
    instrumentId: string
    fundedAt: Date | string
    rate: number
    intervalHours?: number
    createdAt?: Date | string
  }

  export type FundingRateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instrument?: InstrumentUpdateOneRequiredWithoutFundingNestedInput
  }

  export type FundingRateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingRateCreateManyInput = {
    id?: string
    instrumentId: string
    fundedAt: Date | string
    rate: number
    intervalHours?: number
    createdAt?: Date | string
  }

  export type FundingRateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingRateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioSnapshotCreateInput = {
    id?: string
    takenAt?: Date | string
    targetVol: number
    rows: JsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type PortfolioSnapshotUncheckedCreateInput = {
    id?: string
    takenAt?: Date | string
    targetVol: number
    rows: JsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type PortfolioSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetVol?: FloatFieldUpdateOperationsInput | number
    rows?: JsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PortfolioSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetVol?: FloatFieldUpdateOperationsInput | number
    rows?: JsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PortfolioSnapshotCreateManyInput = {
    id?: string
    takenAt?: Date | string
    targetVol: number
    rows: JsonNullValueInput | InputJsonValue
    note?: string | null
  }

  export type PortfolioSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetVol?: FloatFieldUpdateOperationsInput | number
    rows?: JsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PortfolioSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetVol?: FloatFieldUpdateOperationsInput | number
    rows?: JsonNullValueInput | InputJsonValue
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AppSettingCreateInput = {
    key: string
    value: string
    secret?: boolean
    updatedAt?: Date | string
  }

  export type AppSettingUncheckedCreateInput = {
    key: string
    value: string
    secret?: boolean
    updatedAt?: Date | string
  }

  export type AppSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    secret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    secret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingCreateManyInput = {
    key: string
    value: string
    secret?: boolean
    updatedAt?: Date | string
  }

  export type AppSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    secret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppSettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    secret?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateInput = {
    id?: string
    job: string
    ok: boolean
    message: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncLogUncheckedCreateInput = {
    id?: string
    job: string
    ok: boolean
    message: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job?: StringFieldUpdateOperationsInput | string
    ok?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    job?: StringFieldUpdateOperationsInput | string
    ok?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncLogCreateManyInput = {
    id?: string
    job: string
    ok: boolean
    message: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
  }

  export type SyncLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    job?: StringFieldUpdateOperationsInput | string
    ok?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    job?: StringFieldUpdateOperationsInput | string
    ok?: BoolFieldUpdateOperationsInput | boolean
    message?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TokenScreenCreateInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    screenedAt?: Date | string
    grade: string
    safety: number
    checks: JsonNullValueInput | InputJsonValue
    snapshot: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: number | null
    fdvUsd?: number | null
    settledAt?: Date | string | null
    survived?: boolean | null
    liqAtSettle?: number | null
    failureKind?: string | null
  }

  export type TokenScreenUncheckedCreateInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    screenedAt?: Date | string
    grade: string
    safety: number
    checks: JsonNullValueInput | InputJsonValue
    snapshot: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: number | null
    fdvUsd?: number | null
    settledAt?: Date | string | null
    survived?: boolean | null
    liqAtSettle?: number | null
    failureKind?: string | null
  }

  export type TokenScreenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    screenedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: StringFieldUpdateOperationsInput | string
    safety?: IntFieldUpdateOperationsInput | number
    checks?: JsonNullValueInput | InputJsonValue
    snapshot?: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    fdvUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    survived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    liqAtSettle?: NullableFloatFieldUpdateOperationsInput | number | null
    failureKind?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenScreenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    screenedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: StringFieldUpdateOperationsInput | string
    safety?: IntFieldUpdateOperationsInput | number
    checks?: JsonNullValueInput | InputJsonValue
    snapshot?: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    fdvUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    survived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    liqAtSettle?: NullableFloatFieldUpdateOperationsInput | number | null
    failureKind?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenScreenCreateManyInput = {
    id?: string
    chain?: string
    mint: string
    symbol?: string | null
    name?: string | null
    screenedAt?: Date | string
    grade: string
    safety: number
    checks: JsonNullValueInput | InputJsonValue
    snapshot: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: number | null
    fdvUsd?: number | null
    settledAt?: Date | string | null
    survived?: boolean | null
    liqAtSettle?: number | null
    failureKind?: string | null
  }

  export type TokenScreenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    screenedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: StringFieldUpdateOperationsInput | string
    safety?: IntFieldUpdateOperationsInput | number
    checks?: JsonNullValueInput | InputJsonValue
    snapshot?: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    fdvUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    survived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    liqAtSettle?: NullableFloatFieldUpdateOperationsInput | number | null
    failureKind?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenScreenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    mint?: StringFieldUpdateOperationsInput | string
    symbol?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    screenedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grade?: StringFieldUpdateOperationsInput | string
    safety?: IntFieldUpdateOperationsInput | number
    checks?: JsonNullValueInput | InputJsonValue
    snapshot?: JsonNullValueInput | InputJsonValue
    errors?: JsonNullValueInput | InputJsonValue
    liquidityUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    fdvUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    survived?: NullableBoolFieldUpdateOperationsInput | boolean | null
    liqAtSettle?: NullableFloatFieldUpdateOperationsInput | number | null
    failureKind?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumMarketFilter<$PrismaModel = never> = {
    equals?: $Enums.Market | EnumMarketFieldRefInput<$PrismaModel>
    in?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    notIn?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    not?: NestedEnumMarketFilter<$PrismaModel> | $Enums.Market
  }

  export type EnumVenueFilter<$PrismaModel = never> = {
    equals?: $Enums.Venue | EnumVenueFieldRefInput<$PrismaModel>
    in?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    notIn?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    not?: NestedEnumVenueFilter<$PrismaModel> | $Enums.Venue
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CandleListRelationFilter = {
    every?: CandleWhereInput
    some?: CandleWhereInput
    none?: CandleWhereInput
  }

  export type SignalListRelationFilter = {
    every?: SignalWhereInput
    some?: SignalWhereInput
    none?: SignalWhereInput
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type FundingRateListRelationFilter = {
    every?: FundingRateWhereInput
    some?: FundingRateWhereInput
    none?: FundingRateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CandleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SignalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FundingRateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstrumentVenueSymbolCompoundUniqueInput = {
    venue: $Enums.Venue
    symbol: string
  }

  export type InstrumentCountOrderByAggregateInput = {
    id?: SortOrder
    market?: SortOrder
    venue?: SortOrder
    symbol?: SortOrder
    display?: SortOrder
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
    enabled?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
  }

  export type InstrumentAvgOrderByAggregateInput = {
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
  }

  export type InstrumentMaxOrderByAggregateInput = {
    id?: SortOrder
    market?: SortOrder
    venue?: SortOrder
    symbol?: SortOrder
    display?: SortOrder
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
    enabled?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
  }

  export type InstrumentMinOrderByAggregateInput = {
    id?: SortOrder
    market?: SortOrder
    venue?: SortOrder
    symbol?: SortOrder
    display?: SortOrder
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
    enabled?: SortOrder
    lastSyncAt?: SortOrder
    createdAt?: SortOrder
  }

  export type InstrumentSumOrderByAggregateInput = {
    tickSize?: SortOrder
    feeBps?: SortOrder
    slipBps?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumMarketWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Market | EnumMarketFieldRefInput<$PrismaModel>
    in?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    notIn?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    not?: NestedEnumMarketWithAggregatesFilter<$PrismaModel> | $Enums.Market
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMarketFilter<$PrismaModel>
    _max?: NestedEnumMarketFilter<$PrismaModel>
  }

  export type EnumVenueWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Venue | EnumVenueFieldRefInput<$PrismaModel>
    in?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    notIn?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    not?: NestedEnumVenueWithAggregatesFilter<$PrismaModel> | $Enums.Venue
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVenueFilter<$PrismaModel>
    _max?: NestedEnumVenueFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type InstrumentRelationFilter = {
    is?: InstrumentWhereInput
    isNot?: InstrumentWhereInput
  }

  export type CandleInstrumentIdTimeframeOpenTimeCompoundUniqueInput = {
    instrumentId: string
    timeframe: string
    openTime: Date | string
  }

  export type CandleCountOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    timeframe?: SortOrder
    openTime?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type CandleAvgOrderByAggregateInput = {
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type CandleMaxOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    timeframe?: SortOrder
    openTime?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type CandleMinOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    timeframe?: SortOrder
    openTime?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type CandleSumOrderByAggregateInput = {
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type EnumSideFilter<$PrismaModel = never> = {
    equals?: $Enums.Side | EnumSideFieldRefInput<$PrismaModel>
    in?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    not?: NestedEnumSideFilter<$PrismaModel> | $Enums.Side
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ModelFitListRelationFilter = {
    every?: ModelFitWhereInput
    some?: ModelFitWhereInput
    none?: ModelFitWhereInput
  }

  export type BacktestRunListRelationFilter = {
    every?: BacktestRunWhereInput
    some?: BacktestRunWhereInput
    none?: BacktestRunWhereInput
  }

  export type ModelFitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BacktestRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SetupCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    timeframe?: SortOrder
    side?: SortOrder
    atrTarget?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
    enabled?: SortOrder
    autoDisabledAt?: SortOrder
    reviewNote?: SortOrder
    createdAt?: SortOrder
  }

  export type SetupAvgOrderByAggregateInput = {
    atrTarget?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
  }

  export type SetupMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    timeframe?: SortOrder
    side?: SortOrder
    atrTarget?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
    enabled?: SortOrder
    autoDisabledAt?: SortOrder
    reviewNote?: SortOrder
    createdAt?: SortOrder
  }

  export type SetupMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    timeframe?: SortOrder
    side?: SortOrder
    atrTarget?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
    enabled?: SortOrder
    autoDisabledAt?: SortOrder
    reviewNote?: SortOrder
    createdAt?: SortOrder
  }

  export type SetupSumOrderByAggregateInput = {
    atrTarget?: SortOrder
    atrStop?: SortOrder
    horizonBars?: SortOrder
  }

  export type EnumSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Side | EnumSideFieldRefInput<$PrismaModel>
    in?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    not?: NestedEnumSideWithAggregatesFilter<$PrismaModel> | $Enums.Side
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSideFilter<$PrismaModel>
    _max?: NestedEnumSideFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumSignalStateFilter<$PrismaModel = never> = {
    equals?: $Enums.SignalState | EnumSignalStateFieldRefInput<$PrismaModel>
    in?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    not?: NestedEnumSignalStateFilter<$PrismaModel> | $Enums.SignalState
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SetupRelationFilter = {
    is?: SetupWhereInput
    isNot?: SetupWhereInput
  }

  export type SignalInstrumentIdSetupIdBarTimeCompoundUniqueInput = {
    instrumentId: string
    setupId: string
    barTime: Date | string
  }

  export type SignalCountOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    setupId?: SortOrder
    barTime?: SortOrder
    lockedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    features?: SortOrder
    modelVersion?: SortOrder
    state?: SortOrder
    exitPrice?: SortOrder
    exitTime?: SortOrder
    rMultiple?: SortOrder
    settledAt?: SortOrder
    alertedAt?: SortOrder
    exitAlertedAt?: SortOrder
    note?: SortOrder
  }

  export type SignalAvgOrderByAggregateInput = {
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    exitPrice?: SortOrder
    rMultiple?: SortOrder
  }

  export type SignalMaxOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    setupId?: SortOrder
    barTime?: SortOrder
    lockedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    modelVersion?: SortOrder
    state?: SortOrder
    exitPrice?: SortOrder
    exitTime?: SortOrder
    rMultiple?: SortOrder
    settledAt?: SortOrder
    alertedAt?: SortOrder
    exitAlertedAt?: SortOrder
    note?: SortOrder
  }

  export type SignalMinOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    setupId?: SortOrder
    barTime?: SortOrder
    lockedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    modelVersion?: SortOrder
    state?: SortOrder
    exitPrice?: SortOrder
    exitTime?: SortOrder
    rMultiple?: SortOrder
    settledAt?: SortOrder
    alertedAt?: SortOrder
    exitAlertedAt?: SortOrder
    note?: SortOrder
  }

  export type SignalSumOrderByAggregateInput = {
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    rr?: SortOrder
    atr?: SortOrder
    rawP?: SortOrder
    calP?: SortOrder
    edge?: SortOrder
    riskR?: SortOrder
    exitPrice?: SortOrder
    rMultiple?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumSignalStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignalState | EnumSignalStateFieldRefInput<$PrismaModel>
    in?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    not?: NestedEnumSignalStateWithAggregatesFilter<$PrismaModel> | $Enums.SignalState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignalStateFilter<$PrismaModel>
    _max?: NestedEnumSignalStateFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ModelFitCountOrderByAggregateInput = {
    id?: SortOrder
    setupId?: SortOrder
    modelVersion?: SortOrder
    coefficients?: SortOrder
    calibration?: SortOrder
    n?: SortOrder
    fittedTo?: SortOrder
    brier?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type ModelFitAvgOrderByAggregateInput = {
    n?: SortOrder
    brier?: SortOrder
  }

  export type ModelFitMaxOrderByAggregateInput = {
    id?: SortOrder
    setupId?: SortOrder
    modelVersion?: SortOrder
    n?: SortOrder
    fittedTo?: SortOrder
    brier?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type ModelFitMinOrderByAggregateInput = {
    id?: SortOrder
    setupId?: SortOrder
    modelVersion?: SortOrder
    n?: SortOrder
    fittedTo?: SortOrder
    brier?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type ModelFitSumOrderByAggregateInput = {
    n?: SortOrder
    brier?: SortOrder
  }

  export type BacktestRunCountOrderByAggregateInput = {
    id?: SortOrder
    setupId?: SortOrder
    label?: SortOrder
    from?: SortOrder
    to?: SortOrder
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    baseline?: SortOrder
    costsBps?: SortOrder
    detail?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    createdAt?: SortOrder
  }

  export type BacktestRunAvgOrderByAggregateInput = {
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    costsBps?: SortOrder
  }

  export type BacktestRunMaxOrderByAggregateInput = {
    id?: SortOrder
    setupId?: SortOrder
    label?: SortOrder
    from?: SortOrder
    to?: SortOrder
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    costsBps?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    createdAt?: SortOrder
  }

  export type BacktestRunMinOrderByAggregateInput = {
    id?: SortOrder
    setupId?: SortOrder
    label?: SortOrder
    from?: SortOrder
    to?: SortOrder
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    costsBps?: SortOrder
    entryStyle?: SortOrder
    manageMode?: SortOrder
    createdAt?: SortOrder
  }

  export type BacktestRunSumOrderByAggregateInput = {
    trades?: SortOrder
    hitRate?: SortOrder
    avgPredP?: SortOrder
    expectR?: SortOrder
    totalR?: SortOrder
    maxDdR?: SortOrder
    brier?: SortOrder
    costsBps?: SortOrder
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    signalId?: SortOrder
    side?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    exit?: SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrder
    followedPlan?: SortOrder
    reason?: SortOrder
    mistakes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    exit?: SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    signalId?: SortOrder
    side?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    exit?: SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrder
    followedPlan?: SortOrder
    reason?: SortOrder
    mistakes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    signalId?: SortOrder
    side?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    exit?: SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrder
    followedPlan?: SortOrder
    reason?: SortOrder
    mistakes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    entry?: SortOrder
    stop?: SortOrder
    target?: SortOrder
    exit?: SortOrder
    sizeUnits?: SortOrder
    riskAmount?: SortOrder
    rMultiple?: SortOrder
  }

  export type RiskProfileCountOrderByAggregateInput = {
    id?: SortOrder
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskProfileAvgOrderByAggregateInput = {
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
  }

  export type RiskProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskProfileMinOrderByAggregateInput = {
    id?: SortOrder
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskProfileSumOrderByAggregateInput = {
    accountSize?: SortOrder
    riskPctPerTrade?: SortOrder
    kellyFraction?: SortOrder
    maxOpenRisk?: SortOrder
    maxPerMarket?: SortOrder
  }

  export type FundingRateInstrumentIdFundedAtCompoundUniqueInput = {
    instrumentId: string
    fundedAt: Date | string
  }

  export type FundingRateCountOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    fundedAt?: SortOrder
    rate?: SortOrder
    intervalHours?: SortOrder
    createdAt?: SortOrder
  }

  export type FundingRateAvgOrderByAggregateInput = {
    rate?: SortOrder
    intervalHours?: SortOrder
  }

  export type FundingRateMaxOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    fundedAt?: SortOrder
    rate?: SortOrder
    intervalHours?: SortOrder
    createdAt?: SortOrder
  }

  export type FundingRateMinOrderByAggregateInput = {
    id?: SortOrder
    instrumentId?: SortOrder
    fundedAt?: SortOrder
    rate?: SortOrder
    intervalHours?: SortOrder
    createdAt?: SortOrder
  }

  export type FundingRateSumOrderByAggregateInput = {
    rate?: SortOrder
    intervalHours?: SortOrder
  }

  export type PortfolioSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    takenAt?: SortOrder
    targetVol?: SortOrder
    rows?: SortOrder
    note?: SortOrder
  }

  export type PortfolioSnapshotAvgOrderByAggregateInput = {
    targetVol?: SortOrder
  }

  export type PortfolioSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    takenAt?: SortOrder
    targetVol?: SortOrder
    note?: SortOrder
  }

  export type PortfolioSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    takenAt?: SortOrder
    targetVol?: SortOrder
    note?: SortOrder
  }

  export type PortfolioSnapshotSumOrderByAggregateInput = {
    targetVol?: SortOrder
  }

  export type AppSettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    secret?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    secret?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    secret?: SortOrder
    updatedAt?: SortOrder
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    job?: SortOrder
    ok?: SortOrder
    message?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    job?: SortOrder
    ok?: SortOrder
    message?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    job?: SortOrder
    ok?: SortOrder
    message?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type TokenScreenCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    screenedAt?: SortOrder
    grade?: SortOrder
    safety?: SortOrder
    checks?: SortOrder
    snapshot?: SortOrder
    errors?: SortOrder
    liquidityUsd?: SortOrder
    fdvUsd?: SortOrder
    settledAt?: SortOrder
    survived?: SortOrder
    liqAtSettle?: SortOrder
    failureKind?: SortOrder
  }

  export type TokenScreenAvgOrderByAggregateInput = {
    safety?: SortOrder
    liquidityUsd?: SortOrder
    fdvUsd?: SortOrder
    liqAtSettle?: SortOrder
  }

  export type TokenScreenMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    screenedAt?: SortOrder
    grade?: SortOrder
    safety?: SortOrder
    liquidityUsd?: SortOrder
    fdvUsd?: SortOrder
    settledAt?: SortOrder
    survived?: SortOrder
    liqAtSettle?: SortOrder
    failureKind?: SortOrder
  }

  export type TokenScreenMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    mint?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    screenedAt?: SortOrder
    grade?: SortOrder
    safety?: SortOrder
    liquidityUsd?: SortOrder
    fdvUsd?: SortOrder
    settledAt?: SortOrder
    survived?: SortOrder
    liqAtSettle?: SortOrder
    failureKind?: SortOrder
  }

  export type TokenScreenSumOrderByAggregateInput = {
    safety?: SortOrder
    liquidityUsd?: SortOrder
    fdvUsd?: SortOrder
    liqAtSettle?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type CandleCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<CandleCreateWithoutInstrumentInput, CandleUncheckedCreateWithoutInstrumentInput> | CandleCreateWithoutInstrumentInput[] | CandleUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CandleCreateOrConnectWithoutInstrumentInput | CandleCreateOrConnectWithoutInstrumentInput[]
    createMany?: CandleCreateManyInstrumentInputEnvelope
    connect?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
  }

  export type SignalCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<SignalCreateWithoutInstrumentInput, SignalUncheckedCreateWithoutInstrumentInput> | SignalCreateWithoutInstrumentInput[] | SignalUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutInstrumentInput | SignalCreateOrConnectWithoutInstrumentInput[]
    createMany?: SignalCreateManyInstrumentInputEnvelope
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<TradeCreateWithoutInstrumentInput, TradeUncheckedCreateWithoutInstrumentInput> | TradeCreateWithoutInstrumentInput[] | TradeUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutInstrumentInput | TradeCreateOrConnectWithoutInstrumentInput[]
    createMany?: TradeCreateManyInstrumentInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FundingRateCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<FundingRateCreateWithoutInstrumentInput, FundingRateUncheckedCreateWithoutInstrumentInput> | FundingRateCreateWithoutInstrumentInput[] | FundingRateUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: FundingRateCreateOrConnectWithoutInstrumentInput | FundingRateCreateOrConnectWithoutInstrumentInput[]
    createMany?: FundingRateCreateManyInstrumentInputEnvelope
    connect?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
  }

  export type CandleUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<CandleCreateWithoutInstrumentInput, CandleUncheckedCreateWithoutInstrumentInput> | CandleCreateWithoutInstrumentInput[] | CandleUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CandleCreateOrConnectWithoutInstrumentInput | CandleCreateOrConnectWithoutInstrumentInput[]
    createMany?: CandleCreateManyInstrumentInputEnvelope
    connect?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
  }

  export type SignalUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<SignalCreateWithoutInstrumentInput, SignalUncheckedCreateWithoutInstrumentInput> | SignalCreateWithoutInstrumentInput[] | SignalUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutInstrumentInput | SignalCreateOrConnectWithoutInstrumentInput[]
    createMany?: SignalCreateManyInstrumentInputEnvelope
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<TradeCreateWithoutInstrumentInput, TradeUncheckedCreateWithoutInstrumentInput> | TradeCreateWithoutInstrumentInput[] | TradeUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutInstrumentInput | TradeCreateOrConnectWithoutInstrumentInput[]
    createMany?: TradeCreateManyInstrumentInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FundingRateUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<FundingRateCreateWithoutInstrumentInput, FundingRateUncheckedCreateWithoutInstrumentInput> | FundingRateCreateWithoutInstrumentInput[] | FundingRateUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: FundingRateCreateOrConnectWithoutInstrumentInput | FundingRateCreateOrConnectWithoutInstrumentInput[]
    createMany?: FundingRateCreateManyInstrumentInputEnvelope
    connect?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumMarketFieldUpdateOperationsInput = {
    set?: $Enums.Market
  }

  export type EnumVenueFieldUpdateOperationsInput = {
    set?: $Enums.Venue
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CandleUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<CandleCreateWithoutInstrumentInput, CandleUncheckedCreateWithoutInstrumentInput> | CandleCreateWithoutInstrumentInput[] | CandleUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CandleCreateOrConnectWithoutInstrumentInput | CandleCreateOrConnectWithoutInstrumentInput[]
    upsert?: CandleUpsertWithWhereUniqueWithoutInstrumentInput | CandleUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: CandleCreateManyInstrumentInputEnvelope
    set?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    disconnect?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    delete?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    connect?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    update?: CandleUpdateWithWhereUniqueWithoutInstrumentInput | CandleUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: CandleUpdateManyWithWhereWithoutInstrumentInput | CandleUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: CandleScalarWhereInput | CandleScalarWhereInput[]
  }

  export type SignalUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<SignalCreateWithoutInstrumentInput, SignalUncheckedCreateWithoutInstrumentInput> | SignalCreateWithoutInstrumentInput[] | SignalUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutInstrumentInput | SignalCreateOrConnectWithoutInstrumentInput[]
    upsert?: SignalUpsertWithWhereUniqueWithoutInstrumentInput | SignalUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: SignalCreateManyInstrumentInputEnvelope
    set?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    disconnect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    delete?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    update?: SignalUpdateWithWhereUniqueWithoutInstrumentInput | SignalUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: SignalUpdateManyWithWhereWithoutInstrumentInput | SignalUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: SignalScalarWhereInput | SignalScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<TradeCreateWithoutInstrumentInput, TradeUncheckedCreateWithoutInstrumentInput> | TradeCreateWithoutInstrumentInput[] | TradeUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutInstrumentInput | TradeCreateOrConnectWithoutInstrumentInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutInstrumentInput | TradeUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: TradeCreateManyInstrumentInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutInstrumentInput | TradeUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutInstrumentInput | TradeUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FundingRateUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<FundingRateCreateWithoutInstrumentInput, FundingRateUncheckedCreateWithoutInstrumentInput> | FundingRateCreateWithoutInstrumentInput[] | FundingRateUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: FundingRateCreateOrConnectWithoutInstrumentInput | FundingRateCreateOrConnectWithoutInstrumentInput[]
    upsert?: FundingRateUpsertWithWhereUniqueWithoutInstrumentInput | FundingRateUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: FundingRateCreateManyInstrumentInputEnvelope
    set?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    disconnect?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    delete?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    connect?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    update?: FundingRateUpdateWithWhereUniqueWithoutInstrumentInput | FundingRateUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: FundingRateUpdateManyWithWhereWithoutInstrumentInput | FundingRateUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: FundingRateScalarWhereInput | FundingRateScalarWhereInput[]
  }

  export type CandleUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<CandleCreateWithoutInstrumentInput, CandleUncheckedCreateWithoutInstrumentInput> | CandleCreateWithoutInstrumentInput[] | CandleUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CandleCreateOrConnectWithoutInstrumentInput | CandleCreateOrConnectWithoutInstrumentInput[]
    upsert?: CandleUpsertWithWhereUniqueWithoutInstrumentInput | CandleUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: CandleCreateManyInstrumentInputEnvelope
    set?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    disconnect?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    delete?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    connect?: CandleWhereUniqueInput | CandleWhereUniqueInput[]
    update?: CandleUpdateWithWhereUniqueWithoutInstrumentInput | CandleUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: CandleUpdateManyWithWhereWithoutInstrumentInput | CandleUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: CandleScalarWhereInput | CandleScalarWhereInput[]
  }

  export type SignalUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<SignalCreateWithoutInstrumentInput, SignalUncheckedCreateWithoutInstrumentInput> | SignalCreateWithoutInstrumentInput[] | SignalUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutInstrumentInput | SignalCreateOrConnectWithoutInstrumentInput[]
    upsert?: SignalUpsertWithWhereUniqueWithoutInstrumentInput | SignalUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: SignalCreateManyInstrumentInputEnvelope
    set?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    disconnect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    delete?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    update?: SignalUpdateWithWhereUniqueWithoutInstrumentInput | SignalUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: SignalUpdateManyWithWhereWithoutInstrumentInput | SignalUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: SignalScalarWhereInput | SignalScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<TradeCreateWithoutInstrumentInput, TradeUncheckedCreateWithoutInstrumentInput> | TradeCreateWithoutInstrumentInput[] | TradeUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutInstrumentInput | TradeCreateOrConnectWithoutInstrumentInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutInstrumentInput | TradeUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: TradeCreateManyInstrumentInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutInstrumentInput | TradeUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutInstrumentInput | TradeUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FundingRateUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<FundingRateCreateWithoutInstrumentInput, FundingRateUncheckedCreateWithoutInstrumentInput> | FundingRateCreateWithoutInstrumentInput[] | FundingRateUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: FundingRateCreateOrConnectWithoutInstrumentInput | FundingRateCreateOrConnectWithoutInstrumentInput[]
    upsert?: FundingRateUpsertWithWhereUniqueWithoutInstrumentInput | FundingRateUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: FundingRateCreateManyInstrumentInputEnvelope
    set?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    disconnect?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    delete?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    connect?: FundingRateWhereUniqueInput | FundingRateWhereUniqueInput[]
    update?: FundingRateUpdateWithWhereUniqueWithoutInstrumentInput | FundingRateUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: FundingRateUpdateManyWithWhereWithoutInstrumentInput | FundingRateUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: FundingRateScalarWhereInput | FundingRateScalarWhereInput[]
  }

  export type InstrumentCreateNestedOneWithoutCandlesInput = {
    create?: XOR<InstrumentCreateWithoutCandlesInput, InstrumentUncheckedCreateWithoutCandlesInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutCandlesInput
    connect?: InstrumentWhereUniqueInput
  }

  export type InstrumentUpdateOneRequiredWithoutCandlesNestedInput = {
    create?: XOR<InstrumentCreateWithoutCandlesInput, InstrumentUncheckedCreateWithoutCandlesInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutCandlesInput
    upsert?: InstrumentUpsertWithoutCandlesInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutCandlesInput, InstrumentUpdateWithoutCandlesInput>, InstrumentUncheckedUpdateWithoutCandlesInput>
  }

  export type SignalCreateNestedManyWithoutSetupInput = {
    create?: XOR<SignalCreateWithoutSetupInput, SignalUncheckedCreateWithoutSetupInput> | SignalCreateWithoutSetupInput[] | SignalUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutSetupInput | SignalCreateOrConnectWithoutSetupInput[]
    createMany?: SignalCreateManySetupInputEnvelope
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
  }

  export type ModelFitCreateNestedManyWithoutSetupInput = {
    create?: XOR<ModelFitCreateWithoutSetupInput, ModelFitUncheckedCreateWithoutSetupInput> | ModelFitCreateWithoutSetupInput[] | ModelFitUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: ModelFitCreateOrConnectWithoutSetupInput | ModelFitCreateOrConnectWithoutSetupInput[]
    createMany?: ModelFitCreateManySetupInputEnvelope
    connect?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
  }

  export type BacktestRunCreateNestedManyWithoutSetupInput = {
    create?: XOR<BacktestRunCreateWithoutSetupInput, BacktestRunUncheckedCreateWithoutSetupInput> | BacktestRunCreateWithoutSetupInput[] | BacktestRunUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: BacktestRunCreateOrConnectWithoutSetupInput | BacktestRunCreateOrConnectWithoutSetupInput[]
    createMany?: BacktestRunCreateManySetupInputEnvelope
    connect?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
  }

  export type SignalUncheckedCreateNestedManyWithoutSetupInput = {
    create?: XOR<SignalCreateWithoutSetupInput, SignalUncheckedCreateWithoutSetupInput> | SignalCreateWithoutSetupInput[] | SignalUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutSetupInput | SignalCreateOrConnectWithoutSetupInput[]
    createMany?: SignalCreateManySetupInputEnvelope
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
  }

  export type ModelFitUncheckedCreateNestedManyWithoutSetupInput = {
    create?: XOR<ModelFitCreateWithoutSetupInput, ModelFitUncheckedCreateWithoutSetupInput> | ModelFitCreateWithoutSetupInput[] | ModelFitUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: ModelFitCreateOrConnectWithoutSetupInput | ModelFitCreateOrConnectWithoutSetupInput[]
    createMany?: ModelFitCreateManySetupInputEnvelope
    connect?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
  }

  export type BacktestRunUncheckedCreateNestedManyWithoutSetupInput = {
    create?: XOR<BacktestRunCreateWithoutSetupInput, BacktestRunUncheckedCreateWithoutSetupInput> | BacktestRunCreateWithoutSetupInput[] | BacktestRunUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: BacktestRunCreateOrConnectWithoutSetupInput | BacktestRunCreateOrConnectWithoutSetupInput[]
    createMany?: BacktestRunCreateManySetupInputEnvelope
    connect?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
  }

  export type EnumSideFieldUpdateOperationsInput = {
    set?: $Enums.Side
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SignalUpdateManyWithoutSetupNestedInput = {
    create?: XOR<SignalCreateWithoutSetupInput, SignalUncheckedCreateWithoutSetupInput> | SignalCreateWithoutSetupInput[] | SignalUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutSetupInput | SignalCreateOrConnectWithoutSetupInput[]
    upsert?: SignalUpsertWithWhereUniqueWithoutSetupInput | SignalUpsertWithWhereUniqueWithoutSetupInput[]
    createMany?: SignalCreateManySetupInputEnvelope
    set?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    disconnect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    delete?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    update?: SignalUpdateWithWhereUniqueWithoutSetupInput | SignalUpdateWithWhereUniqueWithoutSetupInput[]
    updateMany?: SignalUpdateManyWithWhereWithoutSetupInput | SignalUpdateManyWithWhereWithoutSetupInput[]
    deleteMany?: SignalScalarWhereInput | SignalScalarWhereInput[]
  }

  export type ModelFitUpdateManyWithoutSetupNestedInput = {
    create?: XOR<ModelFitCreateWithoutSetupInput, ModelFitUncheckedCreateWithoutSetupInput> | ModelFitCreateWithoutSetupInput[] | ModelFitUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: ModelFitCreateOrConnectWithoutSetupInput | ModelFitCreateOrConnectWithoutSetupInput[]
    upsert?: ModelFitUpsertWithWhereUniqueWithoutSetupInput | ModelFitUpsertWithWhereUniqueWithoutSetupInput[]
    createMany?: ModelFitCreateManySetupInputEnvelope
    set?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    disconnect?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    delete?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    connect?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    update?: ModelFitUpdateWithWhereUniqueWithoutSetupInput | ModelFitUpdateWithWhereUniqueWithoutSetupInput[]
    updateMany?: ModelFitUpdateManyWithWhereWithoutSetupInput | ModelFitUpdateManyWithWhereWithoutSetupInput[]
    deleteMany?: ModelFitScalarWhereInput | ModelFitScalarWhereInput[]
  }

  export type BacktestRunUpdateManyWithoutSetupNestedInput = {
    create?: XOR<BacktestRunCreateWithoutSetupInput, BacktestRunUncheckedCreateWithoutSetupInput> | BacktestRunCreateWithoutSetupInput[] | BacktestRunUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: BacktestRunCreateOrConnectWithoutSetupInput | BacktestRunCreateOrConnectWithoutSetupInput[]
    upsert?: BacktestRunUpsertWithWhereUniqueWithoutSetupInput | BacktestRunUpsertWithWhereUniqueWithoutSetupInput[]
    createMany?: BacktestRunCreateManySetupInputEnvelope
    set?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    disconnect?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    delete?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    connect?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    update?: BacktestRunUpdateWithWhereUniqueWithoutSetupInput | BacktestRunUpdateWithWhereUniqueWithoutSetupInput[]
    updateMany?: BacktestRunUpdateManyWithWhereWithoutSetupInput | BacktestRunUpdateManyWithWhereWithoutSetupInput[]
    deleteMany?: BacktestRunScalarWhereInput | BacktestRunScalarWhereInput[]
  }

  export type SignalUncheckedUpdateManyWithoutSetupNestedInput = {
    create?: XOR<SignalCreateWithoutSetupInput, SignalUncheckedCreateWithoutSetupInput> | SignalCreateWithoutSetupInput[] | SignalUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: SignalCreateOrConnectWithoutSetupInput | SignalCreateOrConnectWithoutSetupInput[]
    upsert?: SignalUpsertWithWhereUniqueWithoutSetupInput | SignalUpsertWithWhereUniqueWithoutSetupInput[]
    createMany?: SignalCreateManySetupInputEnvelope
    set?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    disconnect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    delete?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    connect?: SignalWhereUniqueInput | SignalWhereUniqueInput[]
    update?: SignalUpdateWithWhereUniqueWithoutSetupInput | SignalUpdateWithWhereUniqueWithoutSetupInput[]
    updateMany?: SignalUpdateManyWithWhereWithoutSetupInput | SignalUpdateManyWithWhereWithoutSetupInput[]
    deleteMany?: SignalScalarWhereInput | SignalScalarWhereInput[]
  }

  export type ModelFitUncheckedUpdateManyWithoutSetupNestedInput = {
    create?: XOR<ModelFitCreateWithoutSetupInput, ModelFitUncheckedCreateWithoutSetupInput> | ModelFitCreateWithoutSetupInput[] | ModelFitUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: ModelFitCreateOrConnectWithoutSetupInput | ModelFitCreateOrConnectWithoutSetupInput[]
    upsert?: ModelFitUpsertWithWhereUniqueWithoutSetupInput | ModelFitUpsertWithWhereUniqueWithoutSetupInput[]
    createMany?: ModelFitCreateManySetupInputEnvelope
    set?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    disconnect?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    delete?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    connect?: ModelFitWhereUniqueInput | ModelFitWhereUniqueInput[]
    update?: ModelFitUpdateWithWhereUniqueWithoutSetupInput | ModelFitUpdateWithWhereUniqueWithoutSetupInput[]
    updateMany?: ModelFitUpdateManyWithWhereWithoutSetupInput | ModelFitUpdateManyWithWhereWithoutSetupInput[]
    deleteMany?: ModelFitScalarWhereInput | ModelFitScalarWhereInput[]
  }

  export type BacktestRunUncheckedUpdateManyWithoutSetupNestedInput = {
    create?: XOR<BacktestRunCreateWithoutSetupInput, BacktestRunUncheckedCreateWithoutSetupInput> | BacktestRunCreateWithoutSetupInput[] | BacktestRunUncheckedCreateWithoutSetupInput[]
    connectOrCreate?: BacktestRunCreateOrConnectWithoutSetupInput | BacktestRunCreateOrConnectWithoutSetupInput[]
    upsert?: BacktestRunUpsertWithWhereUniqueWithoutSetupInput | BacktestRunUpsertWithWhereUniqueWithoutSetupInput[]
    createMany?: BacktestRunCreateManySetupInputEnvelope
    set?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    disconnect?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    delete?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    connect?: BacktestRunWhereUniqueInput | BacktestRunWhereUniqueInput[]
    update?: BacktestRunUpdateWithWhereUniqueWithoutSetupInput | BacktestRunUpdateWithWhereUniqueWithoutSetupInput[]
    updateMany?: BacktestRunUpdateManyWithWhereWithoutSetupInput | BacktestRunUpdateManyWithWhereWithoutSetupInput[]
    deleteMany?: BacktestRunScalarWhereInput | BacktestRunScalarWhereInput[]
  }

  export type InstrumentCreateNestedOneWithoutSignalsInput = {
    create?: XOR<InstrumentCreateWithoutSignalsInput, InstrumentUncheckedCreateWithoutSignalsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutSignalsInput
    connect?: InstrumentWhereUniqueInput
  }

  export type SetupCreateNestedOneWithoutSignalsInput = {
    create?: XOR<SetupCreateWithoutSignalsInput, SetupUncheckedCreateWithoutSignalsInput>
    connectOrCreate?: SetupCreateOrConnectWithoutSignalsInput
    connect?: SetupWhereUniqueInput
  }

  export type EnumSignalStateFieldUpdateOperationsInput = {
    set?: $Enums.SignalState
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InstrumentUpdateOneRequiredWithoutSignalsNestedInput = {
    create?: XOR<InstrumentCreateWithoutSignalsInput, InstrumentUncheckedCreateWithoutSignalsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutSignalsInput
    upsert?: InstrumentUpsertWithoutSignalsInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutSignalsInput, InstrumentUpdateWithoutSignalsInput>, InstrumentUncheckedUpdateWithoutSignalsInput>
  }

  export type SetupUpdateOneRequiredWithoutSignalsNestedInput = {
    create?: XOR<SetupCreateWithoutSignalsInput, SetupUncheckedCreateWithoutSignalsInput>
    connectOrCreate?: SetupCreateOrConnectWithoutSignalsInput
    upsert?: SetupUpsertWithoutSignalsInput
    connect?: SetupWhereUniqueInput
    update?: XOR<XOR<SetupUpdateToOneWithWhereWithoutSignalsInput, SetupUpdateWithoutSignalsInput>, SetupUncheckedUpdateWithoutSignalsInput>
  }

  export type SetupCreateNestedOneWithoutModelsInput = {
    create?: XOR<SetupCreateWithoutModelsInput, SetupUncheckedCreateWithoutModelsInput>
    connectOrCreate?: SetupCreateOrConnectWithoutModelsInput
    connect?: SetupWhereUniqueInput
  }

  export type SetupUpdateOneRequiredWithoutModelsNestedInput = {
    create?: XOR<SetupCreateWithoutModelsInput, SetupUncheckedCreateWithoutModelsInput>
    connectOrCreate?: SetupCreateOrConnectWithoutModelsInput
    upsert?: SetupUpsertWithoutModelsInput
    connect?: SetupWhereUniqueInput
    update?: XOR<XOR<SetupUpdateToOneWithWhereWithoutModelsInput, SetupUpdateWithoutModelsInput>, SetupUncheckedUpdateWithoutModelsInput>
  }

  export type SetupCreateNestedOneWithoutRunsInput = {
    create?: XOR<SetupCreateWithoutRunsInput, SetupUncheckedCreateWithoutRunsInput>
    connectOrCreate?: SetupCreateOrConnectWithoutRunsInput
    connect?: SetupWhereUniqueInput
  }

  export type SetupUpdateOneRequiredWithoutRunsNestedInput = {
    create?: XOR<SetupCreateWithoutRunsInput, SetupUncheckedCreateWithoutRunsInput>
    connectOrCreate?: SetupCreateOrConnectWithoutRunsInput
    upsert?: SetupUpsertWithoutRunsInput
    connect?: SetupWhereUniqueInput
    update?: XOR<XOR<SetupUpdateToOneWithWhereWithoutRunsInput, SetupUpdateWithoutRunsInput>, SetupUncheckedUpdateWithoutRunsInput>
  }

  export type InstrumentCreateNestedOneWithoutTradesInput = {
    create?: XOR<InstrumentCreateWithoutTradesInput, InstrumentUncheckedCreateWithoutTradesInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutTradesInput
    connect?: InstrumentWhereUniqueInput
  }

  export type InstrumentUpdateOneRequiredWithoutTradesNestedInput = {
    create?: XOR<InstrumentCreateWithoutTradesInput, InstrumentUncheckedCreateWithoutTradesInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutTradesInput
    upsert?: InstrumentUpsertWithoutTradesInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutTradesInput, InstrumentUpdateWithoutTradesInput>, InstrumentUncheckedUpdateWithoutTradesInput>
  }

  export type InstrumentCreateNestedOneWithoutFundingInput = {
    create?: XOR<InstrumentCreateWithoutFundingInput, InstrumentUncheckedCreateWithoutFundingInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutFundingInput
    connect?: InstrumentWhereUniqueInput
  }

  export type InstrumentUpdateOneRequiredWithoutFundingNestedInput = {
    create?: XOR<InstrumentCreateWithoutFundingInput, InstrumentUncheckedCreateWithoutFundingInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutFundingInput
    upsert?: InstrumentUpsertWithoutFundingInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutFundingInput, InstrumentUpdateWithoutFundingInput>, InstrumentUncheckedUpdateWithoutFundingInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumMarketFilter<$PrismaModel = never> = {
    equals?: $Enums.Market | EnumMarketFieldRefInput<$PrismaModel>
    in?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    notIn?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    not?: NestedEnumMarketFilter<$PrismaModel> | $Enums.Market
  }

  export type NestedEnumVenueFilter<$PrismaModel = never> = {
    equals?: $Enums.Venue | EnumVenueFieldRefInput<$PrismaModel>
    in?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    notIn?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    not?: NestedEnumVenueFilter<$PrismaModel> | $Enums.Venue
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumMarketWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Market | EnumMarketFieldRefInput<$PrismaModel>
    in?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    notIn?: $Enums.Market[] | ListEnumMarketFieldRefInput<$PrismaModel>
    not?: NestedEnumMarketWithAggregatesFilter<$PrismaModel> | $Enums.Market
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMarketFilter<$PrismaModel>
    _max?: NestedEnumMarketFilter<$PrismaModel>
  }

  export type NestedEnumVenueWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Venue | EnumVenueFieldRefInput<$PrismaModel>
    in?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    notIn?: $Enums.Venue[] | ListEnumVenueFieldRefInput<$PrismaModel>
    not?: NestedEnumVenueWithAggregatesFilter<$PrismaModel> | $Enums.Venue
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVenueFilter<$PrismaModel>
    _max?: NestedEnumVenueFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSideFilter<$PrismaModel = never> = {
    equals?: $Enums.Side | EnumSideFieldRefInput<$PrismaModel>
    in?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    not?: NestedEnumSideFilter<$PrismaModel> | $Enums.Side
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Side | EnumSideFieldRefInput<$PrismaModel>
    in?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.Side[] | ListEnumSideFieldRefInput<$PrismaModel>
    not?: NestedEnumSideWithAggregatesFilter<$PrismaModel> | $Enums.Side
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSideFilter<$PrismaModel>
    _max?: NestedEnumSideFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumSignalStateFilter<$PrismaModel = never> = {
    equals?: $Enums.SignalState | EnumSignalStateFieldRefInput<$PrismaModel>
    in?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    not?: NestedEnumSignalStateFilter<$PrismaModel> | $Enums.SignalState
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSignalStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignalState | EnumSignalStateFieldRefInput<$PrismaModel>
    in?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignalState[] | ListEnumSignalStateFieldRefInput<$PrismaModel>
    not?: NestedEnumSignalStateWithAggregatesFilter<$PrismaModel> | $Enums.SignalState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignalStateFilter<$PrismaModel>
    _max?: NestedEnumSignalStateFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type CandleCreateWithoutInstrumentInput = {
    id?: string
    timeframe: string
    openTime: Date | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }

  export type CandleUncheckedCreateWithoutInstrumentInput = {
    id?: string
    timeframe: string
    openTime: Date | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }

  export type CandleCreateOrConnectWithoutInstrumentInput = {
    where: CandleWhereUniqueInput
    create: XOR<CandleCreateWithoutInstrumentInput, CandleUncheckedCreateWithoutInstrumentInput>
  }

  export type CandleCreateManyInstrumentInputEnvelope = {
    data: CandleCreateManyInstrumentInput | CandleCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type SignalCreateWithoutInstrumentInput = {
    id?: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
    setup: SetupCreateNestedOneWithoutSignalsInput
  }

  export type SignalUncheckedCreateWithoutInstrumentInput = {
    id?: string
    setupId: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
  }

  export type SignalCreateOrConnectWithoutInstrumentInput = {
    where: SignalWhereUniqueInput
    create: XOR<SignalCreateWithoutInstrumentInput, SignalUncheckedCreateWithoutInstrumentInput>
  }

  export type SignalCreateManyInstrumentInputEnvelope = {
    data: SignalCreateManyInstrumentInput | SignalCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type TradeCreateWithoutInstrumentInput = {
    id?: string
    signalId?: string | null
    side: $Enums.Side
    openedAt: Date | string
    closedAt?: Date | string | null
    entry: number
    stop: number
    target?: number | null
    exit?: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple?: number | null
    followedPlan?: boolean
    reason?: string | null
    mistakes?: string | null
    createdAt?: Date | string
  }

  export type TradeUncheckedCreateWithoutInstrumentInput = {
    id?: string
    signalId?: string | null
    side: $Enums.Side
    openedAt: Date | string
    closedAt?: Date | string | null
    entry: number
    stop: number
    target?: number | null
    exit?: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple?: number | null
    followedPlan?: boolean
    reason?: string | null
    mistakes?: string | null
    createdAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutInstrumentInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutInstrumentInput, TradeUncheckedCreateWithoutInstrumentInput>
  }

  export type TradeCreateManyInstrumentInputEnvelope = {
    data: TradeCreateManyInstrumentInput | TradeCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type FundingRateCreateWithoutInstrumentInput = {
    id?: string
    fundedAt: Date | string
    rate: number
    intervalHours?: number
    createdAt?: Date | string
  }

  export type FundingRateUncheckedCreateWithoutInstrumentInput = {
    id?: string
    fundedAt: Date | string
    rate: number
    intervalHours?: number
    createdAt?: Date | string
  }

  export type FundingRateCreateOrConnectWithoutInstrumentInput = {
    where: FundingRateWhereUniqueInput
    create: XOR<FundingRateCreateWithoutInstrumentInput, FundingRateUncheckedCreateWithoutInstrumentInput>
  }

  export type FundingRateCreateManyInstrumentInputEnvelope = {
    data: FundingRateCreateManyInstrumentInput | FundingRateCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type CandleUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: CandleWhereUniqueInput
    update: XOR<CandleUpdateWithoutInstrumentInput, CandleUncheckedUpdateWithoutInstrumentInput>
    create: XOR<CandleCreateWithoutInstrumentInput, CandleUncheckedCreateWithoutInstrumentInput>
  }

  export type CandleUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: CandleWhereUniqueInput
    data: XOR<CandleUpdateWithoutInstrumentInput, CandleUncheckedUpdateWithoutInstrumentInput>
  }

  export type CandleUpdateManyWithWhereWithoutInstrumentInput = {
    where: CandleScalarWhereInput
    data: XOR<CandleUpdateManyMutationInput, CandleUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type CandleScalarWhereInput = {
    AND?: CandleScalarWhereInput | CandleScalarWhereInput[]
    OR?: CandleScalarWhereInput[]
    NOT?: CandleScalarWhereInput | CandleScalarWhereInput[]
    id?: StringFilter<"Candle"> | string
    instrumentId?: StringFilter<"Candle"> | string
    timeframe?: StringFilter<"Candle"> | string
    openTime?: DateTimeFilter<"Candle"> | Date | string
    open?: FloatFilter<"Candle"> | number
    high?: FloatFilter<"Candle"> | number
    low?: FloatFilter<"Candle"> | number
    close?: FloatFilter<"Candle"> | number
    volume?: FloatFilter<"Candle"> | number
  }

  export type SignalUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: SignalWhereUniqueInput
    update: XOR<SignalUpdateWithoutInstrumentInput, SignalUncheckedUpdateWithoutInstrumentInput>
    create: XOR<SignalCreateWithoutInstrumentInput, SignalUncheckedCreateWithoutInstrumentInput>
  }

  export type SignalUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: SignalWhereUniqueInput
    data: XOR<SignalUpdateWithoutInstrumentInput, SignalUncheckedUpdateWithoutInstrumentInput>
  }

  export type SignalUpdateManyWithWhereWithoutInstrumentInput = {
    where: SignalScalarWhereInput
    data: XOR<SignalUpdateManyMutationInput, SignalUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type SignalScalarWhereInput = {
    AND?: SignalScalarWhereInput | SignalScalarWhereInput[]
    OR?: SignalScalarWhereInput[]
    NOT?: SignalScalarWhereInput | SignalScalarWhereInput[]
    id?: StringFilter<"Signal"> | string
    instrumentId?: StringFilter<"Signal"> | string
    setupId?: StringFilter<"Signal"> | string
    barTime?: DateTimeFilter<"Signal"> | Date | string
    lockedAt?: DateTimeFilter<"Signal"> | Date | string
    entry?: FloatFilter<"Signal"> | number
    stop?: FloatFilter<"Signal"> | number
    target?: FloatFilter<"Signal"> | number
    entryStyle?: StringFilter<"Signal"> | string
    manageMode?: StringFilter<"Signal"> | string
    rr?: FloatFilter<"Signal"> | number
    atr?: FloatFilter<"Signal"> | number
    rawP?: FloatFilter<"Signal"> | number
    calP?: FloatFilter<"Signal"> | number
    edge?: FloatFilter<"Signal"> | number
    riskR?: FloatFilter<"Signal"> | number
    features?: JsonFilter<"Signal">
    modelVersion?: StringFilter<"Signal"> | string
    state?: EnumSignalStateFilter<"Signal"> | $Enums.SignalState
    exitPrice?: FloatNullableFilter<"Signal"> | number | null
    exitTime?: DateTimeNullableFilter<"Signal"> | Date | string | null
    rMultiple?: FloatNullableFilter<"Signal"> | number | null
    settledAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    alertedAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    exitAlertedAt?: DateTimeNullableFilter<"Signal"> | Date | string | null
    note?: StringNullableFilter<"Signal"> | string | null
  }

  export type TradeUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutInstrumentInput, TradeUncheckedUpdateWithoutInstrumentInput>
    create: XOR<TradeCreateWithoutInstrumentInput, TradeUncheckedCreateWithoutInstrumentInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutInstrumentInput, TradeUncheckedUpdateWithoutInstrumentInput>
  }

  export type TradeUpdateManyWithWhereWithoutInstrumentInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: StringFilter<"Trade"> | string
    instrumentId?: StringFilter<"Trade"> | string
    signalId?: StringNullableFilter<"Trade"> | string | null
    side?: EnumSideFilter<"Trade"> | $Enums.Side
    openedAt?: DateTimeFilter<"Trade"> | Date | string
    closedAt?: DateTimeNullableFilter<"Trade"> | Date | string | null
    entry?: FloatFilter<"Trade"> | number
    stop?: FloatFilter<"Trade"> | number
    target?: FloatNullableFilter<"Trade"> | number | null
    exit?: FloatNullableFilter<"Trade"> | number | null
    sizeUnits?: FloatFilter<"Trade"> | number
    riskAmount?: FloatFilter<"Trade"> | number
    rMultiple?: FloatNullableFilter<"Trade"> | number | null
    followedPlan?: BoolFilter<"Trade"> | boolean
    reason?: StringNullableFilter<"Trade"> | string | null
    mistakes?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type FundingRateUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: FundingRateWhereUniqueInput
    update: XOR<FundingRateUpdateWithoutInstrumentInput, FundingRateUncheckedUpdateWithoutInstrumentInput>
    create: XOR<FundingRateCreateWithoutInstrumentInput, FundingRateUncheckedCreateWithoutInstrumentInput>
  }

  export type FundingRateUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: FundingRateWhereUniqueInput
    data: XOR<FundingRateUpdateWithoutInstrumentInput, FundingRateUncheckedUpdateWithoutInstrumentInput>
  }

  export type FundingRateUpdateManyWithWhereWithoutInstrumentInput = {
    where: FundingRateScalarWhereInput
    data: XOR<FundingRateUpdateManyMutationInput, FundingRateUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type FundingRateScalarWhereInput = {
    AND?: FundingRateScalarWhereInput | FundingRateScalarWhereInput[]
    OR?: FundingRateScalarWhereInput[]
    NOT?: FundingRateScalarWhereInput | FundingRateScalarWhereInput[]
    id?: StringFilter<"FundingRate"> | string
    instrumentId?: StringFilter<"FundingRate"> | string
    fundedAt?: DateTimeFilter<"FundingRate"> | Date | string
    rate?: FloatFilter<"FundingRate"> | number
    intervalHours?: IntFilter<"FundingRate"> | number
    createdAt?: DateTimeFilter<"FundingRate"> | Date | string
  }

  export type InstrumentCreateWithoutCandlesInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    signals?: SignalCreateNestedManyWithoutInstrumentInput
    trades?: TradeCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutCandlesInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    signals?: SignalUncheckedCreateNestedManyWithoutInstrumentInput
    trades?: TradeUncheckedCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutCandlesInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutCandlesInput, InstrumentUncheckedCreateWithoutCandlesInput>
  }

  export type InstrumentUpsertWithoutCandlesInput = {
    update: XOR<InstrumentUpdateWithoutCandlesInput, InstrumentUncheckedUpdateWithoutCandlesInput>
    create: XOR<InstrumentCreateWithoutCandlesInput, InstrumentUncheckedCreateWithoutCandlesInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutCandlesInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutCandlesInput, InstrumentUncheckedUpdateWithoutCandlesInput>
  }

  export type InstrumentUpdateWithoutCandlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutCandlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUncheckedUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUncheckedUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type SignalCreateWithoutSetupInput = {
    id?: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
    instrument: InstrumentCreateNestedOneWithoutSignalsInput
  }

  export type SignalUncheckedCreateWithoutSetupInput = {
    id?: string
    instrumentId: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
  }

  export type SignalCreateOrConnectWithoutSetupInput = {
    where: SignalWhereUniqueInput
    create: XOR<SignalCreateWithoutSetupInput, SignalUncheckedCreateWithoutSetupInput>
  }

  export type SignalCreateManySetupInputEnvelope = {
    data: SignalCreateManySetupInput | SignalCreateManySetupInput[]
    skipDuplicates?: boolean
  }

  export type ModelFitCreateWithoutSetupInput = {
    id?: string
    modelVersion: string
    coefficients: JsonNullValueInput | InputJsonValue
    calibration: JsonNullValueInput | InputJsonValue
    n: number
    fittedTo: Date | string
    brier: number
    active?: boolean
    createdAt?: Date | string
  }

  export type ModelFitUncheckedCreateWithoutSetupInput = {
    id?: string
    modelVersion: string
    coefficients: JsonNullValueInput | InputJsonValue
    calibration: JsonNullValueInput | InputJsonValue
    n: number
    fittedTo: Date | string
    brier: number
    active?: boolean
    createdAt?: Date | string
  }

  export type ModelFitCreateOrConnectWithoutSetupInput = {
    where: ModelFitWhereUniqueInput
    create: XOR<ModelFitCreateWithoutSetupInput, ModelFitUncheckedCreateWithoutSetupInput>
  }

  export type ModelFitCreateManySetupInputEnvelope = {
    data: ModelFitCreateManySetupInput | ModelFitCreateManySetupInput[]
    skipDuplicates?: boolean
  }

  export type BacktestRunCreateWithoutSetupInput = {
    id?: string
    label: string
    from: Date | string
    to: Date | string
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonNullValueInput | InputJsonValue
    costsBps: number
    detail: JsonNullValueInput | InputJsonValue
    entryStyle?: string
    manageMode?: string
    createdAt?: Date | string
  }

  export type BacktestRunUncheckedCreateWithoutSetupInput = {
    id?: string
    label: string
    from: Date | string
    to: Date | string
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonNullValueInput | InputJsonValue
    costsBps: number
    detail: JsonNullValueInput | InputJsonValue
    entryStyle?: string
    manageMode?: string
    createdAt?: Date | string
  }

  export type BacktestRunCreateOrConnectWithoutSetupInput = {
    where: BacktestRunWhereUniqueInput
    create: XOR<BacktestRunCreateWithoutSetupInput, BacktestRunUncheckedCreateWithoutSetupInput>
  }

  export type BacktestRunCreateManySetupInputEnvelope = {
    data: BacktestRunCreateManySetupInput | BacktestRunCreateManySetupInput[]
    skipDuplicates?: boolean
  }

  export type SignalUpsertWithWhereUniqueWithoutSetupInput = {
    where: SignalWhereUniqueInput
    update: XOR<SignalUpdateWithoutSetupInput, SignalUncheckedUpdateWithoutSetupInput>
    create: XOR<SignalCreateWithoutSetupInput, SignalUncheckedCreateWithoutSetupInput>
  }

  export type SignalUpdateWithWhereUniqueWithoutSetupInput = {
    where: SignalWhereUniqueInput
    data: XOR<SignalUpdateWithoutSetupInput, SignalUncheckedUpdateWithoutSetupInput>
  }

  export type SignalUpdateManyWithWhereWithoutSetupInput = {
    where: SignalScalarWhereInput
    data: XOR<SignalUpdateManyMutationInput, SignalUncheckedUpdateManyWithoutSetupInput>
  }

  export type ModelFitUpsertWithWhereUniqueWithoutSetupInput = {
    where: ModelFitWhereUniqueInput
    update: XOR<ModelFitUpdateWithoutSetupInput, ModelFitUncheckedUpdateWithoutSetupInput>
    create: XOR<ModelFitCreateWithoutSetupInput, ModelFitUncheckedCreateWithoutSetupInput>
  }

  export type ModelFitUpdateWithWhereUniqueWithoutSetupInput = {
    where: ModelFitWhereUniqueInput
    data: XOR<ModelFitUpdateWithoutSetupInput, ModelFitUncheckedUpdateWithoutSetupInput>
  }

  export type ModelFitUpdateManyWithWhereWithoutSetupInput = {
    where: ModelFitScalarWhereInput
    data: XOR<ModelFitUpdateManyMutationInput, ModelFitUncheckedUpdateManyWithoutSetupInput>
  }

  export type ModelFitScalarWhereInput = {
    AND?: ModelFitScalarWhereInput | ModelFitScalarWhereInput[]
    OR?: ModelFitScalarWhereInput[]
    NOT?: ModelFitScalarWhereInput | ModelFitScalarWhereInput[]
    id?: StringFilter<"ModelFit"> | string
    setupId?: StringFilter<"ModelFit"> | string
    modelVersion?: StringFilter<"ModelFit"> | string
    coefficients?: JsonFilter<"ModelFit">
    calibration?: JsonFilter<"ModelFit">
    n?: IntFilter<"ModelFit"> | number
    fittedTo?: DateTimeFilter<"ModelFit"> | Date | string
    brier?: FloatFilter<"ModelFit"> | number
    active?: BoolFilter<"ModelFit"> | boolean
    createdAt?: DateTimeFilter<"ModelFit"> | Date | string
  }

  export type BacktestRunUpsertWithWhereUniqueWithoutSetupInput = {
    where: BacktestRunWhereUniqueInput
    update: XOR<BacktestRunUpdateWithoutSetupInput, BacktestRunUncheckedUpdateWithoutSetupInput>
    create: XOR<BacktestRunCreateWithoutSetupInput, BacktestRunUncheckedCreateWithoutSetupInput>
  }

  export type BacktestRunUpdateWithWhereUniqueWithoutSetupInput = {
    where: BacktestRunWhereUniqueInput
    data: XOR<BacktestRunUpdateWithoutSetupInput, BacktestRunUncheckedUpdateWithoutSetupInput>
  }

  export type BacktestRunUpdateManyWithWhereWithoutSetupInput = {
    where: BacktestRunScalarWhereInput
    data: XOR<BacktestRunUpdateManyMutationInput, BacktestRunUncheckedUpdateManyWithoutSetupInput>
  }

  export type BacktestRunScalarWhereInput = {
    AND?: BacktestRunScalarWhereInput | BacktestRunScalarWhereInput[]
    OR?: BacktestRunScalarWhereInput[]
    NOT?: BacktestRunScalarWhereInput | BacktestRunScalarWhereInput[]
    id?: StringFilter<"BacktestRun"> | string
    setupId?: StringFilter<"BacktestRun"> | string
    label?: StringFilter<"BacktestRun"> | string
    from?: DateTimeFilter<"BacktestRun"> | Date | string
    to?: DateTimeFilter<"BacktestRun"> | Date | string
    trades?: IntFilter<"BacktestRun"> | number
    hitRate?: FloatFilter<"BacktestRun"> | number
    avgPredP?: FloatFilter<"BacktestRun"> | number
    expectR?: FloatFilter<"BacktestRun"> | number
    totalR?: FloatFilter<"BacktestRun"> | number
    maxDdR?: FloatFilter<"BacktestRun"> | number
    brier?: FloatFilter<"BacktestRun"> | number
    baseline?: JsonFilter<"BacktestRun">
    costsBps?: FloatFilter<"BacktestRun"> | number
    detail?: JsonFilter<"BacktestRun">
    entryStyle?: StringFilter<"BacktestRun"> | string
    manageMode?: StringFilter<"BacktestRun"> | string
    createdAt?: DateTimeFilter<"BacktestRun"> | Date | string
  }

  export type InstrumentCreateWithoutSignalsInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleCreateNestedManyWithoutInstrumentInput
    trades?: TradeCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutSignalsInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleUncheckedCreateNestedManyWithoutInstrumentInput
    trades?: TradeUncheckedCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutSignalsInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutSignalsInput, InstrumentUncheckedCreateWithoutSignalsInput>
  }

  export type SetupCreateWithoutSignalsInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    models?: ModelFitCreateNestedManyWithoutSetupInput
    runs?: BacktestRunCreateNestedManyWithoutSetupInput
  }

  export type SetupUncheckedCreateWithoutSignalsInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    models?: ModelFitUncheckedCreateNestedManyWithoutSetupInput
    runs?: BacktestRunUncheckedCreateNestedManyWithoutSetupInput
  }

  export type SetupCreateOrConnectWithoutSignalsInput = {
    where: SetupWhereUniqueInput
    create: XOR<SetupCreateWithoutSignalsInput, SetupUncheckedCreateWithoutSignalsInput>
  }

  export type InstrumentUpsertWithoutSignalsInput = {
    update: XOR<InstrumentUpdateWithoutSignalsInput, InstrumentUncheckedUpdateWithoutSignalsInput>
    create: XOR<InstrumentCreateWithoutSignalsInput, InstrumentUncheckedCreateWithoutSignalsInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutSignalsInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutSignalsInput, InstrumentUncheckedUpdateWithoutSignalsInput>
  }

  export type InstrumentUpdateWithoutSignalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutSignalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUncheckedUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUncheckedUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type SetupUpsertWithoutSignalsInput = {
    update: XOR<SetupUpdateWithoutSignalsInput, SetupUncheckedUpdateWithoutSignalsInput>
    create: XOR<SetupCreateWithoutSignalsInput, SetupUncheckedCreateWithoutSignalsInput>
    where?: SetupWhereInput
  }

  export type SetupUpdateToOneWithWhereWithoutSignalsInput = {
    where?: SetupWhereInput
    data: XOR<SetupUpdateWithoutSignalsInput, SetupUncheckedUpdateWithoutSignalsInput>
  }

  export type SetupUpdateWithoutSignalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: ModelFitUpdateManyWithoutSetupNestedInput
    runs?: BacktestRunUpdateManyWithoutSetupNestedInput
  }

  export type SetupUncheckedUpdateWithoutSignalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: ModelFitUncheckedUpdateManyWithoutSetupNestedInput
    runs?: BacktestRunUncheckedUpdateManyWithoutSetupNestedInput
  }

  export type SetupCreateWithoutModelsInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    signals?: SignalCreateNestedManyWithoutSetupInput
    runs?: BacktestRunCreateNestedManyWithoutSetupInput
  }

  export type SetupUncheckedCreateWithoutModelsInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    signals?: SignalUncheckedCreateNestedManyWithoutSetupInput
    runs?: BacktestRunUncheckedCreateNestedManyWithoutSetupInput
  }

  export type SetupCreateOrConnectWithoutModelsInput = {
    where: SetupWhereUniqueInput
    create: XOR<SetupCreateWithoutModelsInput, SetupUncheckedCreateWithoutModelsInput>
  }

  export type SetupUpsertWithoutModelsInput = {
    update: XOR<SetupUpdateWithoutModelsInput, SetupUncheckedUpdateWithoutModelsInput>
    create: XOR<SetupCreateWithoutModelsInput, SetupUncheckedCreateWithoutModelsInput>
    where?: SetupWhereInput
  }

  export type SetupUpdateToOneWithWhereWithoutModelsInput = {
    where?: SetupWhereInput
    data: XOR<SetupUpdateWithoutModelsInput, SetupUncheckedUpdateWithoutModelsInput>
  }

  export type SetupUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUpdateManyWithoutSetupNestedInput
    runs?: BacktestRunUpdateManyWithoutSetupNestedInput
  }

  export type SetupUncheckedUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUncheckedUpdateManyWithoutSetupNestedInput
    runs?: BacktestRunUncheckedUpdateManyWithoutSetupNestedInput
  }

  export type SetupCreateWithoutRunsInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    signals?: SignalCreateNestedManyWithoutSetupInput
    models?: ModelFitCreateNestedManyWithoutSetupInput
  }

  export type SetupUncheckedCreateWithoutRunsInput = {
    id?: string
    key: string
    name: string
    description: string
    timeframe?: string
    side?: $Enums.Side
    atrTarget?: number
    entryStyle?: string
    manageMode?: string
    atrStop?: number
    horizonBars?: number
    enabled?: boolean
    autoDisabledAt?: Date | string | null
    reviewNote?: string | null
    createdAt?: Date | string
    signals?: SignalUncheckedCreateNestedManyWithoutSetupInput
    models?: ModelFitUncheckedCreateNestedManyWithoutSetupInput
  }

  export type SetupCreateOrConnectWithoutRunsInput = {
    where: SetupWhereUniqueInput
    create: XOR<SetupCreateWithoutRunsInput, SetupUncheckedCreateWithoutRunsInput>
  }

  export type SetupUpsertWithoutRunsInput = {
    update: XOR<SetupUpdateWithoutRunsInput, SetupUncheckedUpdateWithoutRunsInput>
    create: XOR<SetupCreateWithoutRunsInput, SetupUncheckedCreateWithoutRunsInput>
    where?: SetupWhereInput
  }

  export type SetupUpdateToOneWithWhereWithoutRunsInput = {
    where?: SetupWhereInput
    data: XOR<SetupUpdateWithoutRunsInput, SetupUncheckedUpdateWithoutRunsInput>
  }

  export type SetupUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUpdateManyWithoutSetupNestedInput
    models?: ModelFitUpdateManyWithoutSetupNestedInput
  }

  export type SetupUncheckedUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    atrTarget?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    atrStop?: FloatFieldUpdateOperationsInput | number
    horizonBars?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    autoDisabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: SignalUncheckedUpdateManyWithoutSetupNestedInput
    models?: ModelFitUncheckedUpdateManyWithoutSetupNestedInput
  }

  export type InstrumentCreateWithoutTradesInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleCreateNestedManyWithoutInstrumentInput
    signals?: SignalCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutTradesInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleUncheckedCreateNestedManyWithoutInstrumentInput
    signals?: SignalUncheckedCreateNestedManyWithoutInstrumentInput
    funding?: FundingRateUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutTradesInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutTradesInput, InstrumentUncheckedCreateWithoutTradesInput>
  }

  export type InstrumentUpsertWithoutTradesInput = {
    update: XOR<InstrumentUpdateWithoutTradesInput, InstrumentUncheckedUpdateWithoutTradesInput>
    create: XOR<InstrumentCreateWithoutTradesInput, InstrumentUncheckedCreateWithoutTradesInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutTradesInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutTradesInput, InstrumentUncheckedUpdateWithoutTradesInput>
  }

  export type InstrumentUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUpdateManyWithoutInstrumentNestedInput
    signals?: SignalUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUncheckedUpdateManyWithoutInstrumentNestedInput
    signals?: SignalUncheckedUpdateManyWithoutInstrumentNestedInput
    funding?: FundingRateUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentCreateWithoutFundingInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleCreateNestedManyWithoutInstrumentInput
    signals?: SignalCreateNestedManyWithoutInstrumentInput
    trades?: TradeCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutFundingInput = {
    id?: string
    market: $Enums.Market
    venue: $Enums.Venue
    symbol: string
    display: string
    tickSize?: number
    feeBps?: number
    slipBps?: number
    enabled?: boolean
    lastSyncAt?: Date | string | null
    createdAt?: Date | string
    candles?: CandleUncheckedCreateNestedManyWithoutInstrumentInput
    signals?: SignalUncheckedCreateNestedManyWithoutInstrumentInput
    trades?: TradeUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutFundingInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutFundingInput, InstrumentUncheckedCreateWithoutFundingInput>
  }

  export type InstrumentUpsertWithoutFundingInput = {
    update: XOR<InstrumentUpdateWithoutFundingInput, InstrumentUncheckedUpdateWithoutFundingInput>
    create: XOR<InstrumentCreateWithoutFundingInput, InstrumentUncheckedCreateWithoutFundingInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutFundingInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutFundingInput, InstrumentUncheckedUpdateWithoutFundingInput>
  }

  export type InstrumentUpdateWithoutFundingInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUpdateManyWithoutInstrumentNestedInput
    signals?: SignalUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutFundingInput = {
    id?: StringFieldUpdateOperationsInput | string
    market?: EnumMarketFieldUpdateOperationsInput | $Enums.Market
    venue?: EnumVenueFieldUpdateOperationsInput | $Enums.Venue
    symbol?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    tickSize?: FloatFieldUpdateOperationsInput | number
    feeBps?: FloatFieldUpdateOperationsInput | number
    slipBps?: FloatFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candles?: CandleUncheckedUpdateManyWithoutInstrumentNestedInput
    signals?: SignalUncheckedUpdateManyWithoutInstrumentNestedInput
    trades?: TradeUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type CandleCreateManyInstrumentInput = {
    id?: string
    timeframe: string
    openTime: Date | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }

  export type SignalCreateManyInstrumentInput = {
    id?: string
    setupId: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
  }

  export type TradeCreateManyInstrumentInput = {
    id?: string
    signalId?: string | null
    side: $Enums.Side
    openedAt: Date | string
    closedAt?: Date | string | null
    entry: number
    stop: number
    target?: number | null
    exit?: number | null
    sizeUnits: number
    riskAmount: number
    rMultiple?: number | null
    followedPlan?: boolean
    reason?: string | null
    mistakes?: string | null
    createdAt?: Date | string
  }

  export type FundingRateCreateManyInstrumentInput = {
    id?: string
    fundedAt: Date | string
    rate: number
    intervalHours?: number
    createdAt?: Date | string
  }

  export type CandleUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
  }

  export type CandleUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
  }

  export type CandleUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    openTime?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
  }

  export type SignalUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    setup?: SetupUpdateOneRequiredWithoutSignalsNestedInput
  }

  export type SignalUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignalUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    setupId?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TradeUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    side?: EnumSideFieldUpdateOperationsInput | $Enums.Side
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: NullableFloatFieldUpdateOperationsInput | number | null
    exit?: NullableFloatFieldUpdateOperationsInput | number | null
    sizeUnits?: FloatFieldUpdateOperationsInput | number
    riskAmount?: FloatFieldUpdateOperationsInput | number
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    followedPlan?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    mistakes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingRateUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingRateUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingRateUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    fundedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rate?: FloatFieldUpdateOperationsInput | number
    intervalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignalCreateManySetupInput = {
    id?: string
    instrumentId: string
    barTime: Date | string
    lockedAt?: Date | string
    entry: number
    stop: number
    target: number
    entryStyle?: string
    manageMode?: string
    rr?: number
    atr: number
    rawP: number
    calP: number
    edge: number
    riskR?: number
    features: JsonNullValueInput | InputJsonValue
    modelVersion: string
    state?: $Enums.SignalState
    exitPrice?: number | null
    exitTime?: Date | string | null
    rMultiple?: number | null
    settledAt?: Date | string | null
    alertedAt?: Date | string | null
    exitAlertedAt?: Date | string | null
    note?: string | null
  }

  export type ModelFitCreateManySetupInput = {
    id?: string
    modelVersion: string
    coefficients: JsonNullValueInput | InputJsonValue
    calibration: JsonNullValueInput | InputJsonValue
    n: number
    fittedTo: Date | string
    brier: number
    active?: boolean
    createdAt?: Date | string
  }

  export type BacktestRunCreateManySetupInput = {
    id?: string
    label: string
    from: Date | string
    to: Date | string
    trades: number
    hitRate: number
    avgPredP: number
    expectR: number
    totalR: number
    maxDdR: number
    brier: number
    baseline: JsonNullValueInput | InputJsonValue
    costsBps: number
    detail: JsonNullValueInput | InputJsonValue
    entryStyle?: string
    manageMode?: string
    createdAt?: Date | string
  }

  export type SignalUpdateWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    instrument?: InstrumentUpdateOneRequiredWithoutSignalsNestedInput
  }

  export type SignalUncheckedUpdateWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignalUncheckedUpdateManyWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    barTime?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FloatFieldUpdateOperationsInput | number
    stop?: FloatFieldUpdateOperationsInput | number
    target?: FloatFieldUpdateOperationsInput | number
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    rr?: FloatFieldUpdateOperationsInput | number
    atr?: FloatFieldUpdateOperationsInput | number
    rawP?: FloatFieldUpdateOperationsInput | number
    calP?: FloatFieldUpdateOperationsInput | number
    edge?: FloatFieldUpdateOperationsInput | number
    riskR?: FloatFieldUpdateOperationsInput | number
    features?: JsonNullValueInput | InputJsonValue
    modelVersion?: StringFieldUpdateOperationsInput | string
    state?: EnumSignalStateFieldUpdateOperationsInput | $Enums.SignalState
    exitPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    exitTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rMultiple?: NullableFloatFieldUpdateOperationsInput | number | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitAlertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ModelFitUpdateWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelFitUncheckedUpdateWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelFitUncheckedUpdateManyWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    coefficients?: JsonNullValueInput | InputJsonValue
    calibration?: JsonNullValueInput | InputJsonValue
    n?: IntFieldUpdateOperationsInput | number
    fittedTo?: DateTimeFieldUpdateOperationsInput | Date | string
    brier?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BacktestRunUpdateWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BacktestRunUncheckedUpdateWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BacktestRunUncheckedUpdateManyWithoutSetupInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    from?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: DateTimeFieldUpdateOperationsInput | Date | string
    trades?: IntFieldUpdateOperationsInput | number
    hitRate?: FloatFieldUpdateOperationsInput | number
    avgPredP?: FloatFieldUpdateOperationsInput | number
    expectR?: FloatFieldUpdateOperationsInput | number
    totalR?: FloatFieldUpdateOperationsInput | number
    maxDdR?: FloatFieldUpdateOperationsInput | number
    brier?: FloatFieldUpdateOperationsInput | number
    baseline?: JsonNullValueInput | InputJsonValue
    costsBps?: FloatFieldUpdateOperationsInput | number
    detail?: JsonNullValueInput | InputJsonValue
    entryStyle?: StringFieldUpdateOperationsInput | string
    manageMode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use InstrumentCountOutputTypeDefaultArgs instead
     */
    export type InstrumentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstrumentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SetupCountOutputTypeDefaultArgs instead
     */
    export type SetupCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SetupCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstrumentDefaultArgs instead
     */
    export type InstrumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstrumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CandleDefaultArgs instead
     */
    export type CandleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CandleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SetupDefaultArgs instead
     */
    export type SetupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SetupDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignalDefaultArgs instead
     */
    export type SignalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ModelFitDefaultArgs instead
     */
    export type ModelFitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ModelFitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BacktestRunDefaultArgs instead
     */
    export type BacktestRunArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BacktestRunDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradeDefaultArgs instead
     */
    export type TradeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiskProfileDefaultArgs instead
     */
    export type RiskProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiskProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FundingRateDefaultArgs instead
     */
    export type FundingRateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FundingRateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PortfolioSnapshotDefaultArgs instead
     */
    export type PortfolioSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PortfolioSnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppSettingDefaultArgs instead
     */
    export type AppSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SyncLogDefaultArgs instead
     */
    export type SyncLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SyncLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TokenScreenDefaultArgs instead
     */
    export type TokenScreenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TokenScreenDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}