
export const addblogfaq = (fontFileName, fileFormat, description) => {
    const fontFamilyUrl = `url(${fontFileName}.${fileFormat})`;
  
    return `<html>
    <meta name="viewport" content="initial-scale=1, maximum-scale=0.5">
    <head>
      <style type="text/css">
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
        @font-face {
          font-family: ${fontFileName};
          src: ${fontFamilyUrl};
        }
        body {
          margin-left: 25px;
          margin-right: 25px;
          font-size: 35px;
          font-family: ${fontFileName};
        }
      </style>
    </head>
    ${description}
  </html>`;
  };
  
  export const addhtml_content = (fontFileName, fileFormat, description) => {
    const fontFamilyUrl = `url(${fontFileName}.${fileFormat})`;
  
    return `<html>
    <meta name="viewport" content="initial-scale=1, maximum-scale=0.5">
    <head>
      <style type="text/css">
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
        @font-face {
          font-family: ${fontFileName};
          src: ${fontFamilyUrl};
        }
        body {
          margin: 25px;
          font-size: 35px;
          font-family: ${fontFileName};
        }
      </style>
    </head>
    ${description}
  </html>`;
  };
  
  export const mealtextconfig = (fontFileName, fileFormat, description) => {
    const fontFamilyUrl = `url(${fontFileName}.${fileFormat})`;
  
    return `<html>
    <meta name="viewport" content="initial-scale=1, maximum-scale=0.5">
    <head>
      <style type="text/css">
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
        @font-face {
          font-family: ${fontFileName};
          src: ${fontFamilyUrl};
        }
        body {
          margin: 25px;
          font-size: 32px;
          font-family: ${fontFileName};
        }
      </style>
    </head>
    ${description}
  </html>`;
  };
  
  export const smallHtmlText = (fontFileName, fileFormat, description) => {
    const fontFamilyUrl = `url(${fontFileName}.${fileFormat})`;
  
    return `<html>
    <meta name="viewport" content="initial-scale=1, maximum-scale=0.5">
    <head>
      <style type="text/css">
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
        @font-face {
          font-family: ${fontFileName};
          src: ${fontFamilyUrl};
        }
        body {
          color: black;
          background-color: #fff;
          margin: 1px;
          font-size: 24px;
          font-family: ${fontFileName};
        }
      </style>
    </head>
    ${description}
  </html>`;
  };
  