import { Argv } from "yargs";

export type RazzleOptions = {
    verbose?: boolean,
    debug?: boolean
}

export type RazzleConfigAtleastOne =
  'modifyRazzleContext' |
  'addCommands' |
  'options';

export type RazzlePaths =
    'dotenv' |
    'appPath' |
    'appNodeModules' |
    'appPackageJson' |
    'appRazzleConfig' |
    'nodePaths' |
    'ownPath' |
    'ownNodeModules';

export interface RazzleContext<U = RazzlePaths> {
    paths: Map<U, string>
}

export interface BaseRazzleConfig<
 T extends BaseRazzleConfig<T, U>,
 U extends RazzleContext = RazzleContext> {
    options?: RazzleOptions,
    modifyRazzleContext?: (
        razzleConfig: T,
        razzleContext: U) => Promise<U> | U,
    addCommands?: Map<string, (
        argv: Argv,
        razzleConfig: T,
        razzleContext: U) => Argv
    >
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]
    
export type RazzleConfigAlias = BaseRazzleConfig<RazzleConfigAlias>;

export type RazzleConfig = RequireAtLeastOne<RazzleConfigAlias>;

const tryit = <RazzleConfig>{
    addCommands: {
        'build': (argv, razzleConfig, razzleContext) => {
            return argv;
        }
    }
}