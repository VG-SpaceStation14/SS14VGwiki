import parse, { domToReact } from "html-react-parser";
import { Link } from "react-router-dom";

function normalizeLinkProps(attribs = {}) {
  const props = { ...attribs };

  if (props.class) {
    props.className = props.class;
    delete props.class;
  }

  delete props.style;

  return props;
}

const parseOptions = {
  replace(node) {
    if (node.type !== "tag") {
      return undefined;
    }

    if (node.name === "a" && node.attribs?.href?.startsWith("/")) {
      const { href, ...rest } = normalizeLinkProps(node.attribs);

      return (
        <Link {...rest} to={href}>
          {domToReact(node.children, parseOptions)}
        </Link>
      );
    }

    return undefined;
  },
};

export function RichContent({ html, className = "" }) {
  return <div className={`content-prose min-w-0 ${className}`.trim()}>{parse(html, parseOptions)}</div>;
}
