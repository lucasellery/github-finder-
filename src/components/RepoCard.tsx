import { Circle, ExternalLink, RotateCcw, Star } from "lucide-react";
import { formatDate } from "@/helpers/formatDate";
import { langColor } from "@/helpers/langColor";

type RepoCardProps = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

function ItemQuantity({ icon, value }: { icon: React.ReactNode; value: string | number }) {
  return (
    <p className="flex items-center justify-center gap-1">
      {icon} {value}
    </p>
  )
}

export function RepoCard({
  id,
  name,
  description,
  html_url,
  language,
  stargazers_count,
  updated_at,
}: RepoCardProps) {
  return (
    <div
      key={id}
      className="border p-2 rounded-md hover:bg-chart-50 hover:opacity-90 dark:hover:bg-primary transition-colors]"
    >
      <div className="flex flex-row md:items-center justify-between gap-2 mb-1">
        <a
          className="cursor-pointer font-medium text-blue-800 hover:underline flex items-center"
          href={html_url}
          target="_blank"
          rel="noreferrer"
        >
          {name}
          <ExternalLink className="ml-2 inline-block" size={16} />
        </a>
        {language && (
          <span
            className="flex items-center gap-2"
            style={{ color: langColor[language] ?? "#aaa" }}
          >
            <Circle className="" size={14} /> {language}
          </span>
        )}
      </div>

      {description && (
        <p className="py-2 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}

      <div className="flex flex-row items-center md:items-center justify-end gap-4 mt-4 text-zinc-700 dark:text-zinc-300">
        <ItemQuantity
          icon={<Star size={16} className="mb-1" />}
          value={stargazers_count}
        />
        <ItemQuantity
          icon={<RotateCcw size={16} className="mb-1" />}
          value={formatDate(updated_at)}
        />
      </div>
    </div>
  );
}
