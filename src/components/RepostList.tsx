import { selectRepos } from "@/store/github/selectors";
import type { GithubRepo } from "@/store/github/types";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Star,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { RepoCard } from "./RepoCard";

type SortKey = "updated" | "stars";

export function RepostList() {
  const repos = useSelector(selectRepos);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("updated");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return repos
      .filter((repo: GithubRepo): boolean => repo.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a: GithubRepo, b: GithubRepo): number => {
      if (sortBy === "stars") {
        setSelectedFilter("stars");
        return b.stargazers_count - a.stargazers_count;
      }

      setSelectedFilter("updated");
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      });
  }, [repos, search, sortBy]);

  if (repos.length === 0) return <></>;

  return (
    <div className="mt-6">
      <div className="">
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              className="repo-filter"
              placeholder="filter repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={() => setSearch("")}
              className="absolute right-0 bg-transparent border-none hover:bg-violet-300 focus:ring-0"
            >
              <Trash2 className="text-primary" size={18} />
            </Button>
          </div>

          <div className="flex gap-2 place-self-end">
            <Button
              variant={"secondary"}
              className={` ${sortBy === "updated" ? "active" : ""} ${selectedFilter === "updated" ? "bg-primary dark:text-background text-white" : ""}`}
              onClick={() => setSortBy("updated")}
            >
              Recent
            </Button>
            <Button
              variant={"secondary"}
              className={`${sortBy === "stars" ? "active" : ""} ${selectedFilter === "stars" ? "bg-primary dark:text-background text-white" : ""}`}
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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 justify-between">
          {filtered.map((repo: GithubRepo) => (
            <RepoCard key={repo.id} {...repo} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex items-center flex-col gap-2 mt-10 text-chart-5 dark:text-alert">
            <TriangleAlert className="" />
            <span className="font-medium">
              Nenhum repositório combina com o seu filtro.
            </span>

            <Button
              variant="outline"
              className="border-alert dark:border-alert"
              onClick={() => setSearch("")}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
