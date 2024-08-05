import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import typography from "@tailwindcss/typography"
import autoprefixer from 'autoprefixer';

export type Plugins = {
  typography: boolean
}

export type Result = { success: false } | { success: true, css: string }

export const isValidTailwindClass = async (str: string, options?: { plugins?: Plugins, outputClass?: string }): Promise<Result> => {
  const css = options?.outputClass ? `.${options?.outputClass} {@apply ${str}}` : `.cls{@apply ${str}}`;
  const PLUGINS: any[] = []
  if (options?.plugins?.typography) PLUGINS.push(typography)

  const processor = postcss([
    tailwindcss({
      darkMode: "class",
      content: ["*"],
      theme: {
        extend: {},
      },
      plugins: PLUGINS
    }),
    autoprefixer,
  ]);

  try {
    const res = await processor.process(css, { from: undefined })
    return { success: true, css: res.css }
  } catch (error: any) {
    return { success: false }
  }
}
