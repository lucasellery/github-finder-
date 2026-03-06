import {
  selectUser,
} from "@/store/github/selectors";
import { useSelector } from "react-redux";
import { UserCard } from "./UserCard";

export function UserProfile() {
  const user = useSelector(selectUser);

  if (!user) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <h1 className="text-xl text-primary font-black brightness-150">
          Busque por um usuário do Github!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <div className="mt-6 flex items-center justify-center w-full">
        <UserCard
          userName={user.name || user.login}
          avatar_url={user.avatar_url}
          login={user.login}
          public_repos={user.public_repos}
          followers={user.followers}
        />
      </div>
    </div>
  );
}
