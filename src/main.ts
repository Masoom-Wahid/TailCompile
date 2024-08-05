import * as fs from 'fs';
import * as path from "path";
import { isValidTailwindClass } from "./compile";
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
  // let file_name: string = '';
  // let dir_path: string = '';
  // if (args.length >= 2) {
  //   let [file_name, dir_path] = args;
  // } else {
  //   console.log("usage: tailcompile [.html] [dir]\nFirst give the html file and then the dir where it should be compiled to");
  //   return
  // }
  let file_name: string = "/home/masoomwahid/dev/tailcompile/widget.html";


  // console.log(file_name);
  // console.log(dir_path)

  // let only_file_name = get_file_name(file_name)

  // console.log(`only_file_name ${only_file_name}`)

  fs.readFile(file_name, 'utf8', async (err: any, data: string) => {
    if (err) {
      console.error(err);
    } else {
      const res = await tailcompile(data, "index");
      // console.log(res);
      write_html_and_css(
        "/home/masoomwahid/dev/tailcompile/dummy",
        "output",
        res.html,
        res.css
      )
    }
  }
  )
}

main();
