"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const convret_1 = require("./convret");
const write_html_and_css = (file_dir, file_name, html, css) => {
    let html_path = `${file_dir}/${file_name}.html`;
    let css_path = `${file_dir}/${file_name}.css`;
    fs.writeFile(html_path, html, 'utf8', (err) => {
        if (err) {
            console.error("html err:", err);
        }
        else {
            console.log(`html sucess`);
        }
    });
    fs.writeFile(css_path, css, 'utf8', (err) => {
        if (err) {
            console.error("css err:", err);
        }
        else {
            console.log(`css sucess`);
        }
    });
};
const get_file_name = (file_path) => {
    let full_file_name = file_path.split("/");
    let file_name = full_file_name[full_file_name.length - 1];
    let res = file_name.split(".");
    return res[0];
};
const main = () => {
    let args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("usage: tailcompile [.html] [dir]\nFirst give the html file and then the dir where it should be compiled to");
        return;
    }
    // let file_name: string = "/home/masoomwahid/dev/tailcompile/widget.html";
    // console.log(args)
    // // let only_file_name = get_file_name(file_name)
    let only_file_name = get_file_name(args[0]);
    // // console.log(`only_file_name ${only_file_name}`)
    fs.readFile(args[0], 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
        }
        else {
            const res = yield (0, convret_1.tailcompile)(data, only_file_name);
            write_html_and_css(args[1], only_file_name, res.html, res.css);
        }
    }));
};
main();
//# sourceMappingURL=main.js.map