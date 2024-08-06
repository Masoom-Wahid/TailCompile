import { nanoid } from "nanoid";
import { load } from "cheerio";
import { compileToTailwind } from "./compile";
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import typography from "@tailwindcss/typography"
import autoprefixer from 'autoprefixer';


export const tailcompile = async (
  input: string,
  file_name: string,
  prefix: string = "class"
) => {
  const $ = load(input);
  $("head").append(`<link rel="stylesheet" href="./${file_name}.css">`);

  let css = ``;
  let html = ``;

  let body = $("body *");

  const PLUGINS: any[] = []
  PLUGINS.push(typography)

  const processor = postcss([
    tailwindcss({
      darkMode: "class",
      content: ["*"],
      theme: {
        extend: {},
      },
      config: {
        mode: "jit",
      },
      plugins: PLUGINS
    }),
    autoprefixer,
  ]);



  for (let i = 0; i < body.length; i++) {
    // Loop Through Every Body Part
    const classes = $(body[i]).attr("class");
    if (classes) {
      const newClassName = `${prefix}${i}`;
      let generated = await compileToTailwind(processor, classes, newClassName);
      if (generated.success) css += generated.css + "\n";
      $(body[i]).attr("class", newClassName + " " + "");
    }
  }

  html = $.html();

  return {
    html,
    css,
  };
};
