import { selectRepos } from "@/store/github/selectors";
import type { GithubRepo } from "@/store/github/types";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Star, TriangleAlert } from "lucide-react";

type SortKey = "updated" | "stars";

export function RepostList() {
  const repos = useSelector(selectRepos);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("updated");

  const filtered = useMemo(() => {
    return repos
      .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      });
  }, [repos, search, sortBy]);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const langColor: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Java: "#b07219",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Ruby: "#701516",
    Swift: "#ffac45",
  };

  if (repos.length === 0) return <></>;

  return (
    <div className="mt-6">
      <div className="">
        <div className="space-y-4">
          <Input
            type="text"
            className="repo-filter"
            placeholder="filter repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2 place-self-end">
            <Button
              variant={"secondary"}
              className={`sort-btn ${sortBy === "updated" ? "active" : ""}`}
              onClick={() => setSortBy("updated")}
            >
              Recent
            </Button>
            <Button
              variant={"secondary"}
              className={`sort-btn ${sortBy === "stars" ? "active" : ""}`}
              onClick={() => setSortBy("stars")}
            >
              <Star /> Stars
            </Button>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-primary border-b-2 pb-1 mb-4">
          Mostrando <strong>{filtered.length}</strong> de {repos.length}{" "}
          repositórios
        </p>

        <div className="grid gap-4 grid-cols-2 justify-between">
          {filtered.map((repo: GithubRepo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="border"
            >
              <div className="repo-card-top">
                <span className="repo-name">{repo.name}</span>
                {repo.language && (
                  <span
                    className="repo-lang"
                    style={{ color: langColor[repo.language] ?? "#aaa" }}
                  >
                    ● {repo.language}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="repo-desc">{repo.description}</p>
              )}

              <div className="repo-card-bottom">
                <span className="repo-stars">★ {repo.stargazers_count}</span>
                <span className="repo-date">
                  ↻ {formatDate(repo.updated_at)}
                </span>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex items-center flex-col gap-2 mt-10 text-chart-5 dark:text-alert">
            <TriangleAlert className="" />
            <span className="font-medium">Nenhum repositório combina com o seu filtro.</span>

            <Button variant="outline" className="border-alert dark:border-alert" onClick={() => setSearch("")}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
