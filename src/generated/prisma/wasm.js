
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
