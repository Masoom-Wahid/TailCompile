export type Result = { success: false } | { success: true, css: string }
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import typography from "@tailwindcss/typography"
import autoprefixer from 'autoprefixer';


export const compileToTailwind = async (processor: any, str: string, outputClass: string): Promise<Result> => {
  const css = `.${outputClass} {@apply ${str}}`;
  try {
    const res = await processor.process(css, { from: undefined })
    return { success: true, css: res.css }
  } catch (error: any) {
    return { success: false }
  }
}
