// https://gist.github.com/whitingx/3840905

function generateMetaRegex(name: string) {
  return new RegExp(`<meta\\s+(?:[^>]*?\\s+)?name=("|')${name}("|')(?:\\s+[^>]*)?(\\/)?>`);
}
function generateAbitraryMetaRegex(name: string) {
  return new RegExp(`<meta\\s+(?:[^>]*?\\s+)?${name}=("|').*("|')(?:\\s+[^>]*)?(\\/)?>`);
}

type InteractiveWidget = "resizes-visual" | "resizes-content" | "overlays-content";

type CharSet = "ASCII" | "ANSI" | "ISO-8859-1" | "UTF-8";

export type Meta = {
  title?: string;
  description?: string;
  keywords?: string[];
  charset?: CharSet;
  viewport?: {
    width?: number;
    height?: number;
    initialScale?: number;
    minimumScale?: number;
    maximumScale?: number;
    userScalable?: boolean;
    interactiveWidgets?: InteractiveWidget;
  };
  themeColor?: string;
  // stylesheets?: string[];
  // scripts?: { src: string; defer?: boolean; async?: boolean,  }[];
};

export function applyMetaTags(html: string, meta: Meta | undefined) {
  if (!html.includes("<head>") || !meta) return html;

  html = applyTitle(html, meta.title);
  html = applyDescription(html, meta.description);
  html = applyKeywords(html, meta.keywords);
  html = applyCharset(html, meta.charset);
  html = applyThemeColor(html, meta.themeColor);

  return html;
}

function applyTitle(html: string, title: Meta["title"]) {
  if (!title) return html;

  const titleRegex = /<title>.*<\/title>/;
  const ogTitleRegex = generateMetaRegex("og:title");

  if (titleRegex.test(html)) {
    html = html.replace(titleRegex, `<title>${title}</title>`);
  } else {
    html = html.replace("<head>", `<head><title>${title}</title>`);
  }

  if (ogTitleRegex.test(html)) {
    html = html.replace(ogTitleRegex, `<meta name="og:title" content="${title}">`);
  } else {
    html = html.replace("<head>", `<head><meta name="og:title" content="${title}">`);
  }

  return html;
}

function applyDescription(html: string, description: Meta["description"]) {
  if (!description) return html;

  const descriptionRegex = generateMetaRegex("description");
  const ogDescriptionRegex = generateMetaRegex("og:description");

  if (descriptionRegex.test(html)) {
    html = html.replace(descriptionRegex, `<meta name="description" content="${description}">`);
  } else {
    html = html.replace("<head>", `<head><meta name="description" content="${description}">`);
  }

  if (ogDescriptionRegex.test(html)) {
    html = html.replace(
      ogDescriptionRegex,
      `<meta name="og:description" content="${description}">`
    );
  } else {
    html = html.replace("<head>", `<head><meta name="og:description" content="${description}">`);
  }

  return html;
}

function applyKeywords(html: string, keywords: Meta["keywords"]) {
  if (!keywords) return html;

  const keywordsRegex = generateMetaRegex("keywords");

  if (keywordsRegex.test(html)) {
    html = html.replace(keywordsRegex, `<meta name="keywords" content="${keywords.join(", ")}">`);
  } else {
    html = html.replace("<head>", `<head><meta name="keywords" content="${keywords.join(", ")}">`);
  }

  return html;
}

function applyCharset(html: string, charset: Meta["charset"]) {
  if (!charset) return html;

  const charsetRegex = generateAbitraryMetaRegex("charset");

  if (charsetRegex.test(html)) {
    html = html.replace(charsetRegex, `<meta charset="${charset}">`);
  } else {
    html = html.replace("<head>", `<head><meta charset="${charset}">`);
  }

  return html;
}

function applyViewport(html: string, viewport: Meta["viewport"]) {}

function applyThemeColor(html: string, themeColor: Meta["themeColor"]) {
  if (!themeColor) return html;

  const themeColorRegex = generateMetaRegex("theme-color");

  if (themeColorRegex.test(html)) {
    html = html.replace(themeColorRegex, `<meta name="theme-color" content="${themeColor}">`);
  } else {
    html = html.replace("<head>", `<head><meta name="theme-color" content="${themeColor}">`);
  }

  return html;
}

// function applyStylesheets(html: string, stylesheets?: string[]) {
//   if (!stylesheets) return html;

//   stylesheets.forEach((stylesheet) => {
//     if (html.includes(`<link rel="stylesheet" href="${stylesheet}">`)) return;

//     html = html.replace("</head>", `<link rel="stylesheet" href="${stylesheet}"></head>`);
//   });

//   return html;
// }

// function applyScripts(html: string, scripts?: Meta["scripts"]) {
//   if (!scripts) return html;

//   scripts.forEach((script) => {
//     const defer = script.defer ? "defer" : "";
//     const async = script.async ? "async" : "";

//     html = html.replace("</head>", `<script src="${script.src}" ${defer} ${async}></script></head>`);
//   });

//   return html;
// }
