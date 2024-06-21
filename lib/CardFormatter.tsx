import React from "react";

interface Props {
  text?: string;
}

export default function CardFormatter(props: Props) {
  return <div>{parseText(props.text)}</div>;
}

const parseText = (text?: string) => {
  if (!text) {
    return <>err card desc formatting</>;
  }

  // Split text into parts, handling both *bold* and {nl} for new lines
  const parts = text.split(/(\*[^*]+\*|\{nl\})/);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <strong key={index}>{part.slice(1, -1)}</strong>;
    } else if (part === "{nl}") {
      return <br key={index} />;
    }
    return <span key={index}>{part}</span>;
  });
};
