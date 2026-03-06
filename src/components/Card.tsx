type CardProps = {
  login: string;
  userName: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
};

function InfoContainer({
  title,
  value,
  className,
}: {
  title: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className || ''}`}>
      <p className="text-xs text-slate-400">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  )
}

export function Card({
  userName,
  avatar_url,
  login,
  public_repos,
  followers,
}: CardProps) {
  return (
    <div className="border shadow-md rounded-lg overflow-hidden w-87.5 sm:max-w-sm">
      <div className="relative bg-primary h-18 rounded-t-lg" />

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-white rounded-full p-1 shadow-md">
            <img
              src={avatar_url}
              alt={userName || login}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="pt-10" />

        <div className="flex justify-between px-4">
          <InfoContainer title="Repositórios" value={public_repos} />
          <InfoContainer title="Seguidores" value={followers} />
        </div>
      </div>

      <InfoContainer className="px-6 pb-4" title={userName} value={`@${login}`} />
    </div>
  );
}
