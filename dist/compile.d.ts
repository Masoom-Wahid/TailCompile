export type Plugins = {
    typography: boolean;
};
export type Result = {
    success: false;
} | {
    success: true;
    css: string;
};
export declare const isValidTailwindClass: (str: string, options?: {
    plugins?: Plugins;
    outputClass?: string;
}) => Promise<Result>;
