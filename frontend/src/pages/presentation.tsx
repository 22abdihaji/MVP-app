import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default function Presentation({ content }: { content: string }) {
  return (
    <div className="prose lg:prose-xl max-w-4xl mx-auto p-10">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "presentation-phase4.md");
  const content = fs.readFileSync(filePath, "utf8");
  return {
    props: { content },
  };
}
