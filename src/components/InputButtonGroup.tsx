import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AppDispatch } from "@/store";
import { fetchUserRequest } from "@/store/github/actions";
import { Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function InputButtonGroup() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(() => {
    if (username.trim()) {
      dispatch(fetchUserRequest(username.trim()));
      setTimeout(() => {
        setUsername("");
      }, 1000);
    }
  }, [username, dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClearSearch = () => {
    setUsername("");
  };

  return (
    <Field>
      <div className="flex justify-between items-center">
        <FieldLabel htmlFor="input-button-group" className="text-primary">
          Pesquisar usuário
        </FieldLabel>
      </div>

      <ButtonGroup>
        <div className="relative w-full">
          <Input
            id="input-button-group"
            placeholder="Digite o nome do usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Button
            onClick={handleClearSearch}
            className="absolute right-0 bg-transparent border-none hover:bg-violet-300 focus:ring-0"
          >
            <Trash2 className="text-primary" size={18} />
          </Button>
        </div>

        <Button
          variant="outline"
          className="text-primary font-bold"
          disabled={!username.trim()}
          onClick={handleSearch}
        >
          Pesquisar
        </Button>
      </ButtonGroup>
    </Field>
  );
}
