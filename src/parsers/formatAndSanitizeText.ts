import  DOMPurify from "dompurify";
import { encode } from "html-entities";

function formatAndSanitizeText(text: string): string {
  // Use HTML entities to encode special characters

  const encodedText = encode(text);

  // Use DOMPurify to sanitize the HTML tags and ensure they are safe
  const sanitizedText = DOMPurify.sanitize(encodedText, {
    ADD_ATTR: ["target"],
    USE_PROFILES: { html: true },
  });

  return sanitizedText;
}

export default formatAndSanitizeText;
