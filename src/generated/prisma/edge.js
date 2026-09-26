
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.InstrumentScalarFieldEnum = {
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

exports.Prisma.CandleScalarFieldEnum = {
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

exports.Prisma.SetupScalarFieldEnum = {
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

exports.Prisma.SignalScalarFieldEnum = {
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

exports.Prisma.ModelFitScalarFieldEnum = {
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

exports.Prisma.BacktestRunScalarFieldEnum = {
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

exports.Prisma.TradeScalarFieldEnum = {
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

exports.Prisma.RiskProfileScalarFieldEnum = {
  id: 'id',
  accountSize: 'accountSize',
  riskPctPerTrade: 'riskPctPerTrade',
  kellyFraction: 'kellyFraction',
  maxOpenRisk: 'maxOpenRisk',
  maxPerMarket: 'maxPerMarket',
  updatedAt: 'updatedAt'
};

exports.Prisma.FundingRateScalarFieldEnum = {
  id: 'id',
  instrumentId: 'instrumentId',
  fundedAt: 'fundedAt',
  rate: 'rate',
  intervalHours: 'intervalHours',
  createdAt: 'createdAt'
};

exports.Prisma.PortfolioSnapshotScalarFieldEnum = {
  id: 'id',
  takenAt: 'takenAt',
  targetVol: 'targetVol',
  rows: 'rows',
  note: 'note'
};

exports.Prisma.AppSettingScalarFieldEnum = {
  key: 'key',
  value: 'value',
  secret: 'secret',
  updatedAt: 'updatedAt'
};

exports.Prisma.SyncLogScalarFieldEnum = {
  id: 'id',
  job: 'job',
  ok: 'ok',
  message: 'message',
  startedAt: 'startedAt',
  finishedAt: 'finishedAt'
};

exports.Prisma.TokenScreenScalarFieldEnum = {
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Market = exports.$Enums.Market = {
  CRYPTO: 'CRYPTO',
  FX: 'FX'
};

exports.Venue = exports.$Enums.Venue = {
  BINANCE: 'BINANCE',
  BYBIT: 'BYBIT',
  TWELVE_DATA: 'TWELVE_DATA',
  DEMO: 'DEMO'
};

exports.Side = exports.$Enums.Side = {
  LONG: 'LONG',
  SHORT: 'SHORT'
};

exports.SignalState = exports.$Enums.SignalState = {
  OPEN: 'OPEN',
  WON: 'WON',
  LOST: 'LOST',
  TIMEOUT: 'TIMEOUT',
  VOID: 'VOID'
};

exports.Prisma.ModelName = {
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
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\USER\\Downloads\\edge-repos\\EdgeQuant\\src\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\USER\\Downloads\\edge-repos\\EdgeQuant\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// EdgeQuant — a measurement-first trading lab: locked probability calls, honest settlement, walk-forward backtests.\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum Market {\n  CRYPTO\n  FX\n}\n\nenum Venue {\n  BINANCE\n  BYBIT\n  TWELVE_DATA\n  DEMO\n}\n\nenum SignalState {\n  OPEN // locked, outcome not yet known\n  WON // target hit first\n  LOST // stop hit first\n  TIMEOUT // neither barrier hit inside the horizon\n  VOID // data gap: not scored\n}\n\nenum Side {\n  LONG\n  SHORT\n}\n\nmodel Instrument {\n  id         String        @id @default(cuid())\n  market     Market\n  venue      Venue\n  symbol     String // BTCUSDT, EUR/USD\n  display    String\n  tickSize   Float         @default(0.01)\n  feeBps     Float         @default(6) // round-trip cost in basis points (fees + typical spread)\n  slipBps    Float         @default(2) // assumed slippage each way\n  enabled    Boolean       @default(true)\n  lastSyncAt DateTime?\n  candles    Candle[]\n  signals    Signal[]\n  trades     Trade[]\n  funding    FundingRate[]\n  createdAt  DateTime      @default(now())\n\n  @@unique([venue, symbol])\n}\n\n/// OHLCV, one row per closed bar. Only closed bars are stored: a live bar can repaint.\nmodel Candle {\n  id           String     @id @default(cuid())\n  instrumentId String\n  instrument   Instrument @relation(fields: [instrumentId], references: [id], onDelete: Cascade)\n  timeframe    String // 1h, 4h, 1d\n  openTime     DateTime\n  open         Float\n  high         Float\n  low          Float\n  close        Float\n  volume       Float      @default(0)\n\n  @@unique([instrumentId, timeframe, openTime])\n  @@index([instrumentId, timeframe, openTime])\n}\n\n/// A setup is one rule + one horizon + one barrier pair. Models are fitted per setup, never across setups.\nmodel Setup {\n  id             String        @id @default(cuid())\n  key            String        @unique\n  name           String\n  description    String\n  timeframe      String        @default(\"4h\")\n  side           Side          @default(LONG)\n  atrTarget      Float         @default(1.5) // target distance in ATR\n  entryStyle     String        @default(\"market\") // market | limit | stop\n  manageMode     String        @default(\"plain\") // plain | breakeven | partial | trail\n  atrStop        Float         @default(1) // stop distance in ATR\n  horizonBars    Int           @default(12) // time barrier\n  enabled        Boolean       @default(true)\n  autoDisabledAt DateTime?\n  reviewNote     String?\n  signals        Signal[]\n  models         ModelFit[]\n  runs           BacktestRun[]\n  createdAt      DateTime      @default(now())\n}\n\n/// A locked call: made at a bar close, never edited, settled later from the candles that followed.\nmodel Signal {\n  id            String      @id @default(cuid())\n  instrumentId  String\n  instrument    Instrument  @relation(fields: [instrumentId], references: [id], onDelete: Cascade)\n  setupId       String\n  setup         Setup       @relation(fields: [setupId], references: [id], onDelete: Cascade)\n  barTime       DateTime // the bar close this call was made on\n  lockedAt      DateTime    @default(now())\n  entry         Float // the price to trade at (market close, or the limit/stop order price)\n  stop          Float\n  target        Float\n  entryStyle    String      @default(\"market\")\n  manageMode    String      @default(\"plain\")\n  rr            Float       @default(1.5)\n  atr           Float\n  rawP          Float // model probability of hitting target first\n  calP          Float // after calibration\n  edge          Float // p × payoff − (1 − p), after costs, in R\n  riskR         Float       @default(1)\n  features      Json\n  modelVersion  String\n  state         SignalState @default(OPEN)\n  exitPrice     Float?\n  exitTime      DateTime?\n  rMultiple     Float? // realised, after costs\n  settledAt     DateTime?\n  alertedAt     DateTime?\n  exitAlertedAt DateTime?\n  note          String?\n\n  @@unique([instrumentId, setupId, barTime])\n  @@index([state, barTime])\n  @@index([setupId, barTime])\n}\n\n/// Walk-forward fit: coefficients plus the calibration map, with the window they were fitted on.\nmodel ModelFit {\n  id           String   @id @default(cuid())\n  setupId      String\n  setup        Setup    @relation(fields: [setupId], references: [id], onDelete: Cascade)\n  modelVersion String\n  coefficients Json\n  calibration  Json\n  n            Int\n  fittedTo     DateTime // last bar used: everything after this is out of sample\n  brier        Float\n  active       Boolean  @default(true)\n  createdAt    DateTime @default(now())\n\n  @@index([setupId, active])\n}\n\n/// A stored walk-forward backtest, so results can be compared over time instead of re-run from memory.\nmodel BacktestRun {\n  id         String   @id @default(cuid())\n  setupId    String\n  setup      Setup    @relation(fields: [setupId], references: [id], onDelete: Cascade)\n  label      String\n  from       DateTime\n  to         DateTime\n  trades     Int\n  hitRate    Float\n  avgPredP   Float\n  expectR    Float // expectancy per trade in R, after costs\n  totalR     Float\n  maxDdR     Float\n  brier      Float\n  baseline   Json // random-walk and buy-and-hold comparisons\n  costsBps   Float\n  detail     Json\n  entryStyle String   @default(\"market\")\n  manageMode String   @default(\"plain\")\n  createdAt  DateTime @default(now())\n\n  @@index([setupId, createdAt])\n}\n\n/// Your own trades. Logged by hand, compared with the plan: the discipline half of the app.\nmodel Trade {\n  id           String     @id @default(cuid())\n  instrumentId String\n  instrument   Instrument @relation(fields: [instrumentId], references: [id], onDelete: Cascade)\n  signalId     String?\n  side         Side\n  openedAt     DateTime\n  closedAt     DateTime?\n  entry        Float\n  stop         Float\n  target       Float?\n  exit         Float?\n  sizeUnits    Float\n  riskAmount   Float\n  rMultiple    Float?\n  followedPlan Boolean    @default(true)\n  reason       String?\n  mistakes     String?\n  createdAt    DateTime   @default(now())\n\n  @@index([openedAt])\n}\n\nmodel RiskProfile {\n  id              String   @id @default(\"default\")\n  accountSize     Float    @default(1000)\n  riskPctPerTrade Float    @default(1)\n  kellyFraction   Float    @default(0.25)\n  maxOpenRisk     Float    @default(3) // total % of account at risk at once\n  maxPerMarket    Int      @default(3) // correlated positions cap\n  updatedAt       DateTime @updatedAt\n}\n\n/// Perpetual funding: a mechanical cash flow, not a forecast. Positive funding means longs pay shorts.\nmodel FundingRate {\n  id            String     @id @default(cuid())\n  instrumentId  String\n  instrument    Instrument @relation(fields: [instrumentId], references: [id], onDelete: Cascade)\n  fundedAt      DateTime\n  rate          Float // per interval, e.g. 0.0001 = 1 bp per 8h\n  intervalHours Int        @default(8)\n  createdAt     DateTime   @default(now())\n\n  @@unique([instrumentId, fundedAt])\n  @@index([instrumentId, fundedAt])\n}\n\n/// A dated snapshot of the ranked universe and the weights it implies.\nmodel PortfolioSnapshot {\n  id        String   @id @default(cuid())\n  takenAt   DateTime @default(now())\n  targetVol Float\n  rows      Json // [{id, display, market, score, vol, rank, slot, weight, riskPct}]\n  note      String?\n\n  @@index([takenAt])\n}\n\nmodel AppSetting {\n  key       String   @id\n  value     String\n  secret    Boolean  @default(false)\n  updatedAt DateTime @updatedAt\n}\n\nmodel SyncLog {\n  id         String    @id @default(cuid())\n  job        String\n  ok         Boolean\n  message    String\n  startedAt  DateTime  @default(now())\n  finishedAt DateTime?\n}\n\n/// An append-only token screen. Never edited: a later screen is a new row, so the record of what was\n/// known at the time survives. Outcomes are written back onto the row that predicted them.\nmodel TokenScreen {\n  id           String   @id @default(cuid())\n  chain        String   @default(\"solana\")\n  mint         String\n  symbol       String?\n  name         String?\n  screenedAt   DateTime @default(now())\n  /// avoid | unproven | caution | clear\n  grade        String\n  safety       Int\n  /// Every check with its verdict and detail, as shown at screen time.\n  checks       Json\n  /// The raw snapshot the checks were computed from, for re-scoring later without re-fetching.\n  snapshot     Json\n  /// Sources that failed, so a thin screen is never mistaken for a clean one.\n  errors       Json     @default(\"[]\")\n  liquidityUsd Float?\n  fdvUsd       Float?\n\n  /// ---- outcome, written once the horizon has passed ----\n  settledAt   DateTime?\n  /// True if liquidity was still present and a sale still quoted at the horizon.\n  survived    Boolean?\n  /// Liquidity at settle time, for the record.\n  liqAtSettle Float?\n  /// Why it failed, when it did: rug | honeypot | drained | unknown\n  failureKind String?\n\n  @@index([mint, screenedAt])\n  @@index([screenedAt])\n  @@index([settledAt])\n}\n",
  "inlineSchemaHash": "cbebab6a5de1ca14eeaafebff48553593cc3ed5eb9059f6cdcdb3ef4258f887d",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Instrument\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"market\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Market\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"venue\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Venue\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"display\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tickSize\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0.01,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feeBps\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":6,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slipBps\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":2,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastSyncAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"candles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Candle\",\"relationName\":\"CandleToInstrument\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Signal\",\"relationName\":\"InstrumentToSignal\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trades\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trade\",\"relationName\":\"InstrumentToTrade\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"funding\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FundingRate\",\"relationName\":\"FundingRateToInstrument\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"venue\",\"symbol\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"venue\",\"symbol\"]}],\"isGenerated\":false},\"Candle\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrumentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrument\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Instrument\",\"relationName\":\"CandleToInstrument\",\"relationFromFields\":[\"instrumentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeframe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"openTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"open\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"high\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"low\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"close\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"volume\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"instrumentId\",\"timeframe\",\"openTime\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"instrumentId\",\"timeframe\",\"openTime\"]}],\"isGenerated\":false,\"documentation\":\"OHLCV, one row per closed bar. Only closed bars are stored: a live bar can repaint.\"},\"Setup\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeframe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"4h\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"side\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Side\",\"default\":\"LONG\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atrTarget\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1.5,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entryStyle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"market\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"manageMode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"plain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atrStop\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"horizonBars\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":12,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"autoDisabledAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reviewNote\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Signal\",\"relationName\":\"SetupToSignal\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"models\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ModelFit\",\"relationName\":\"ModelFitToSetup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"runs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BacktestRun\",\"relationName\":\"BacktestRunToSetup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A setup is one rule + one horizon + one barrier pair. Models are fitted per setup, never across setups.\"},\"Signal\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrumentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrument\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Instrument\",\"relationName\":\"InstrumentToSignal\",\"relationFromFields\":[\"instrumentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"setupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"setup\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Setup\",\"relationName\":\"SetupToSignal\",\"relationFromFields\":[\"setupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"barTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lockedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entry\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stop\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entryStyle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"market\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"manageMode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"plain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rr\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1.5,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"atr\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rawP\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calP\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"edge\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"riskR\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"features\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelVersion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SignalState\",\"default\":\"OPEN\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exitPrice\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exitTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rMultiple\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"settledAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alertedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exitAlertedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"instrumentId\",\"setupId\",\"barTime\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"instrumentId\",\"setupId\",\"barTime\"]}],\"isGenerated\":false,\"documentation\":\"A locked call: made at a bar close, never edited, settled later from the candles that followed.\"},\"ModelFit\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"setupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"setup\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Setup\",\"relationName\":\"ModelFitToSetup\",\"relationFromFields\":[\"setupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelVersion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coefficients\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calibration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"n\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fittedTo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Walk-forward fit: coefficients plus the calibration map, with the window they were fitted on.\"},\"BacktestRun\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"setupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"setup\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Setup\",\"relationName\":\"BacktestRunToSetup\",\"relationFromFields\":[\"setupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"to\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trades\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hitRate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgPredP\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expectR\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalR\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxDdR\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"baseline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"costsBps\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entryStyle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"market\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"manageMode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"plain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A stored walk-forward backtest, so results can be compared over time instead of re-run from memory.\"},\"Trade\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrumentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrument\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Instrument\",\"relationName\":\"InstrumentToTrade\",\"relationFromFields\":[\"instrumentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"side\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Side\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"openedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"closedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entry\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stop\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"target\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"exit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sizeUnits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"riskAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rMultiple\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"followedPlan\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mistakes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Your own trades. Logged by hand, compared with the plan: the discipline half of the app.\"},\"RiskProfile\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"default\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountSize\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1000,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"riskPctPerTrade\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kellyFraction\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0.25,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxOpenRisk\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":3,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxPerMarket\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":3,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FundingRate\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrumentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instrument\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Instrument\",\"relationName\":\"FundingRateToInstrument\",\"relationFromFields\":[\"instrumentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fundedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intervalHours\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":8,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"instrumentId\",\"fundedAt\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"instrumentId\",\"fundedAt\"]}],\"isGenerated\":false,\"documentation\":\"Perpetual funding: a mechanical cash flow, not a forecast. Positive funding means longs pay shorts.\"},\"PortfolioSnapshot\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"takenAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetVol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rows\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A dated snapshot of the ranked universe and the weights it implies.\"},\"AppSetting\":{\"dbName\":null,\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"secret\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SyncLog\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"job\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ok\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"finishedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TokenScreen\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"solana\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"symbol\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"screenedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grade\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"avoid | unproven | caution | clear\"},{\"name\":\"safety\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"checks\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Every check with its verdict and detail, as shown at screen time.\"},{\"name\":\"snapshot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"The raw snapshot the checks were computed from, for re-scoring later without re-fetching.\"},{\"name\":\"errors\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Sources that failed, so a thin screen is never mistaken for a clean one.\"},{\"name\":\"liquidityUsd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fdvUsd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"settledAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"---- outcome, written once the horizon has passed ----\"},{\"name\":\"survived\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"True if liquidity was still present and a sale still quoted at the horizon.\"},{\"name\":\"liqAtSettle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Liquidity at settle time, for the record.\"},{\"name\":\"failureKind\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Why it failed, when it did: rug | honeypot | drained | unknown\"}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"An append-only token screen. Never edited: a later screen is a new row, so the record of what was\\\\nknown at the time survives. Outcomes are written back onto the row that predicted them.\"}},\"enums\":{\"Market\":{\"values\":[{\"name\":\"CRYPTO\",\"dbName\":null},{\"name\":\"FX\",\"dbName\":null}],\"dbName\":null},\"Venue\":{\"values\":[{\"name\":\"BINANCE\",\"dbName\":null},{\"name\":\"BYBIT\",\"dbName\":null},{\"name\":\"TWELVE_DATA\",\"dbName\":null},{\"name\":\"DEMO\",\"dbName\":null}],\"dbName\":null},\"SignalState\":{\"values\":[{\"name\":\"OPEN\",\"dbName\":null},{\"name\":\"WON\",\"dbName\":null},{\"name\":\"LOST\",\"dbName\":null},{\"name\":\"TIMEOUT\",\"dbName\":null},{\"name\":\"VOID\",\"dbName\":null}],\"dbName\":null},\"Side\":{\"values\":[{\"name\":\"LONG\",\"dbName\":null},{\"name\":\"SHORT\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

