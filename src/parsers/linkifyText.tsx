import { ReactNode } from "react";

function linkifyText(text: string): ReactNode {
  // Regular expression to detect URLs in text
  const urlRegex = /(\[.+\]\(https?:\/\/[^\s]+\))/g;

  // Replace URLs with hyperlinks
  const textPieces = text.split(urlRegex);

  console.log(textPieces);

  return (
    <>
    {
      textPieces.map((piece, index) => {
        if (piece.match(urlRegex)) {
          const url = piece.match(/\(https?:\/\/[^\s]+\)/g);
          const text = piece.match(/\[.+\]/g);
          if (url && text) {
            return (
              <a href={url[0].substring(1, url[0].length - 1)} target="_blank" rel="noreferrer" key={index}>
                {text[0].substring(1, text[0].length - 1)}
              </a>
            );
          }
          return null;
        }
        return <span key={index}>{piece}</span>;
      })
    }
    </>
  );
}

export default linkifyText;
