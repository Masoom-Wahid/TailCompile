"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTailwindClass = void 0;
const tailwindcss_1 = __importDefault(require("tailwindcss"));
const postcss_1 = __importDefault(require("postcss"));
const typography_1 = __importDefault(require("@tailwindcss/typography"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const isValidTailwindClass = (str, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const css = (options === null || options === void 0 ? void 0 : options.outputClass) ? `.${options === null || options === void 0 ? void 0 : options.outputClass} {@apply ${str}}` : `.cls{@apply ${str}}`;
    const PLUGINS = [];
    if ((_a = options === null || options === void 0 ? void 0 : options.plugins) === null || _a === void 0 ? void 0 : _a.typography)
        PLUGINS.push(typography_1.default);
    const processor = (0, postcss_1.default)([
        (0, tailwindcss_1.default)({
            darkMode: "class",
            content: ["*"],
            theme: {
                extend: {},
            },
            plugins: PLUGINS
        }),
        autoprefixer_1.default,
    ]);
    try {
        const res = yield processor.process(css, { from: undefined });
        return { success: true, css: res.css };
    }
    catch (error) {
        return { success: false };
    }
});
exports.isValidTailwindClass = isValidTailwindClass;
//# sourceMappingURL=compile.js.map