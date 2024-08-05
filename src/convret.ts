import { nanoid } from "nanoid";
import { load } from "cheerio";
import { isValidTailwindClass } from "./compile";

export const tailcompile = async (
  input: string,
  file_name: string,
  prefix: string = ""
) => {
  const $ = load(input);
  $("head").append(`<link rel="stylesheet" href="./${file_name}.css">`);

  let css = ``;
  let html = ``;

  let body = $("body *");
  for (let i = 0; i < body.length; i++) {
    // Loop Through Every Body Part
    //console.log(`body[${i}] is ${$(body[i]).attr("class")}`);
    const classes = $(body[i]).attr("class");

    //console.log(classes)

    if (classes) {
      // const classList = classes.split(" ");
      // //console.log(`classList ${classList}`)
      // let tailwindClasses = "";
      // let customClasses = "";

      // for (let j = 0; j < classList.length; j++) {

      //   let current = classList[j], valid;
      //   //console.log(`current : ${current}`)
      //   let  = isValidTailwindClass(current);

      //   let special = current.includes(":");
      //   if (special) {
      //     let parts = current.split(":");
      //     valid = await isValidTailwindClass(parts[parts.length - 1]);
      //   } else {
      //     valid = await isValidTailwindClass(current);
      //   }
      //   if (valid.success) tailwindClasses += current + " ";
      //   else if (!special) customClasses += current + " ";
      // }

      const newClassName = `${prefix}${i}`;



      let generated = await isValidTailwindClass(classes, {
        outputClass: newClassName,
        plugins: {
          typography: true,
        },
      });
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
