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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailcompile = void 0;
const nanoid_1 = require("nanoid");
const cheerio_1 = require("cheerio");
const compile_1 = require("./compile");
const tailcompile = (input_1, file_name_1, ...args_1) => __awaiter(void 0, [input_1, file_name_1, ...args_1], void 0, function* (input, file_name, prefix = "") {
    const $ = (0, cheerio_1.load)(input);
    $("head").append(`<link rel="stylesheet" href="./output.css">`);
    let css = ``;
    let html = ``;
    let body = $("body *");
    for (let i = 0; i < body.length; i++) {
        // Loop Through Every Body Part
        //console.log(`body[${i}] is ${$(body[i]).attr("class")}`);
        const classes = $(body[i]).attr("class");
        //console.log(classes)
        if (classes) {
            const classList = classes.split(" ");
            //console.log(`classList ${classList}`)
            let tailwindClasses = "";
            let customClasses = "";
            for (let j = 0; j < classList.length; j++) {
                let current = classList[j], valid;
                //console.log(`current : ${current}`)
                let special = current.includes(":");
                if (special) {
                    let parts = current.split(":");
                    valid = yield (0, compile_1.isValidTailwindClass)(parts[parts.length - 1]);
                }
                else {
                    valid = yield (0, compile_1.isValidTailwindClass)(current);
                }
                if (valid.success)
                    tailwindClasses += current + " ";
                else if (!special)
                    customClasses += current + " ";
            }
            const newClassName = prefix + (0, nanoid_1.nanoid)();
            let generated = yield (0, compile_1.isValidTailwindClass)(tailwindClasses, {
                outputClass: newClassName,
                plugins: {
                    typography: true,
                },
            });
            if (generated.success)
                css += generated.css + "\n";
            $(body[i]).attr("class", newClassName + " " + customClasses);
        }
    }
    html = $.html();
    return {
        html,
        css,
    };
});
exports.tailcompile = tailcompile;
//# sourceMappingURL=convret.js.map