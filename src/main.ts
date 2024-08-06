const fs = require('fs').promises;
import * as path from "path";
import { tailcompile } from "./convret";
import { exit } from 'process';
const arg = require("arg");
let chokidar = require('chokidar')

let args = arg({
  '--output': String,
  '--input': String,
  '--live': Boolean,
  '-o': '--output',
  '-i': '--input',
  '-l': '--live',
});

let output = args['_'][1] || args['--output']
let input = args['_'][0] || args['--input']
let watch = args['_'][2]



const write_html_and_css = (file_dir: string, file_name: string, html: string, css: string): void => {
  let html_path: string = `${file_dir}/${file_name}.html`
  let css_path: string = `${file_dir}/${file_name}.css`

  fs.writeFile(html_path, html, 'utf8', (err: any) => {
    if (err) {
      console.error("html err:", err);
    } else {
      console.log(`${html_path} Success`);
    }
  })



  fs.writeFile(css_path, css, 'utf8', (err: any) => {
    if (err) {
      console.error("css err:", err);
    } else {
      console.log(`css sucess`);
    }
  })

}


const read_html = async (file_path: string): Promise<string | null> => {
  try {
    const data = await fs.readFile(file_path, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}


const process = async (file: string) => {
  const file_data = await read_html(file);
  if (!file_data) {
    console.error(`Could not read ${file}`);
    return
  };
  const only_file_name = get_file_name(file);
  const res = await tailcompile(file_data, only_file_name);
  write_html_and_css(
    output,
    only_file_name,
    res.html,
    res.css
  )
}

async function processFiles(dirPath: string) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      await process(filePath);
    } else if (stats.isDirectory()) {
      await processFiles(filePath);
    }
  }
}
// const processFiles(input_path: string){

// }


const get_file_name = (file_path: string): string => {
  let full_file_name = file_path.split("/");
  let file_name = full_file_name[full_file_name.length - 1];
  let res = file_name.split(".");
  return res[0];
}

const main = async () => {
  if (!output || !input) {
    console.log("usage: tailcompile -i [.html] -o [dir]\nFirst give the html file and then the dir where it should be compiled to");
    return
  }

  if (watch) {
    chokidar.watch(input, { ignored: /[\/\\]\./ }).on('all', async (event: any, path: any, stats: any) => {
      if (stats.isDirectory()) return;
      const file_data_res = await read_html(path);
      let file_data: string = "";
      if (!file_data_res) {
        console.error(`Could not read ${input}`);
        return;
      }
      file_data = file_data_res;

      const only_file_name = get_file_name(path);
      const res = await tailcompile(file_data, only_file_name);
      write_html_and_css(
        output,
        only_file_name,
        res.html,
        res.css
      )
    }
    )
  } else {
    await processFiles(input);
  }
}

main()
