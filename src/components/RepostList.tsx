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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SortKey = "updated" | "stars";

const REPOS_PER_PAGE = 10;

export function RepostList() {
  const repos = useSelector(selectRepos);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("updated");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleSearch = (value:string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSort = (key: SortKey) => {
    setSortBy(key);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filtered.length / REPOS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * REPOS_PER_PAGE, currentPage * REPOS_PER_PAGE);

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
              onChange={(e) => handleSearch(e.target.value)}
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
              onClick={() => handleSort("updated")}
            >
              Recent
            </Button>
            <Button
              variant={"secondary"}
              className={`${sortBy === "stars" ? "active" : ""} ${selectedFilter === "stars" ? "bg-primary dark:text-background text-white" : ""}`}
              onClick={() => handleSort("stars")}
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
          {paginated.map((repo: GithubRepo) => (
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

      {totalPages > 1 && (
        <Pagination className="mt-5 text-primary">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage((p) => p - 1);
                }}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {(() => {
              const pages: (number | "ellipsis")[] = [];

              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                const left = Math.max(2, currentPage - 1);
                const right = Math.min(totalPages - 1, currentPage + 1);

                pages.push(1);
                if (left > 2) pages.push("ellipsis");

                for (let p = left; p <= right; p++) pages.push(p);

                if (right < totalPages - 1) pages.push("ellipsis");
                pages.push(totalPages);
              }

              return pages.map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`e-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === p}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(p as number);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              );
            })()}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                }}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
