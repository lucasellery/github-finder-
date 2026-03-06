import { InputButtonGroup } from "@/components/InputButtonGroup";
import { RepostList } from "@/components/RepostList";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/UserProfile";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { AppDispatch } from "@/store";
import { selectError, selectLoading } from "@/store/github/selectors";
import { GithubActionTypes } from "@/store/github/types";
import { Cat, CircleX, LoaderCircle, Moon, Sun, TriangleAlert } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function Home() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch<AppDispatch>();

  const clearUser = () => ({
    type: GithubActionTypes.CLEAR_USER,
  });

  return (
    <div className="relative dark:bg-background bg-background flex flex-col items-center justify-center py-20 px-8 transition-colors duration-200">
      <header className="space-y-10">
        <Button
          variant={"default"}
          onClick={toggleDarkMode}
          className="absolute top-5 right-5 flex place-self-end-safe dark:bg-foreground"
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>

        <h1 className="gap-4 text-4xl flex items-center self-center-safe font-bold text-center mb-8 text-primary dark:text-primary-light">
          <Cat className="" color="var(--primary)" size={32} />
          Github Finder
        </h1>
      </header>

      <main className="w-full md:w-1/3">
        <InputButtonGroup />

        <Button
          variant="ghost"
          className="text-primary flex place-self-end mt-2"
          onClick={() => dispatch(clearUser())}
        >
          <CircleX />
          Limpar
        </Button>

        {loading && (
          <div className="mt-10 flex items-center justify-center">
            <LoaderCircle className="transform animate-spin" size={32} />
          </div>
        )}

        {error && !loading && (
          <div className="error-box flex flex-col items-center gap-4 mt-10">
            <TriangleAlert className="text-red-500" size={32} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <UserProfile />
            <RepostList />
          </>
        )}
      </main>
    </div>
  );
}
