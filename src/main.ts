import * as fs from 'fs';
import * as path from "path";
import { compileToTailwind } from "./compile";
import { tailcompile } from "./convret";



const write_html_and_css = (file_dir: string, file_name: string, html: string, css: string): void => {
  let html_path: string = `${file_dir}/${file_name}.html`
  let css_path: string = `${file_dir}/${file_name}.css`

  fs.writeFile(html_path, html, 'utf8', (err) => {
    if (err) {
      console.error("html err:", err);
    } else {
      console.log(`html sucess`);
    }
  })



  fs.writeFile(css_path, css, 'utf8', (err) => {
    if (err) {
      console.error("css err:", err);
    } else {
      console.log(`css sucess`);
    }
  })

}


const get_file_name = (file_path: string): string => {
  let full_file_name = file_path.split("/");
  let file_name = full_file_name[full_file_name.length - 1];
  let res = file_name.split(".");
  return res[0];
}

const main = () => {
  let args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("usage: tailcompile [.html] [dir]\nFirst give the html file and then the dir where it should be compiled to");
    return
  }
  // let file_name: string = "/home/masoomwahid/dev/tailcompile/widget.html";

  // console.log(args)


  // // let only_file_name = get_file_name(file_name)
  let only_file_name = get_file_name(args[0]);

  // // console.log(`only_file_name ${only_file_name}`)

  fs.readFile(args[0], 'utf8', async (err: any, data: string) => {
    if (err) {
      console.error(err);
    } else {
      const res = await tailcompile(data, only_file_name);
      write_html_and_css(
        args[1],
        only_file_name,
        res.html,
        res.css
      )
    }
  }
  )
}

main();
