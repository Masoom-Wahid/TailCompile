export type Result = { success: false } | { success: true, css: string }

export const compileToTailwind = async (processor: any, str: string, outputClass: string): Promise<Result> => {
  const css = `.${outputClass}`;
  try {
    const res = await processor.process(css, { from: undefined })
    return { success: true, css: res.css }
  } catch (error: any) {
    return { success: false }
  }
}
