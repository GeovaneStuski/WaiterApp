type PagesHeaderProps = {
  icon: React.ElementType;
  page: string;
  description: string;
}

export function PagesHeader({ description, icon: Icon, page }:PagesHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex gap-2 mb-4">
        <Icon className="w-8"/>

        <h1 className="font-bold text-2xl">{page}</h1>
      </div>

      <span className="text-md font-semibold text-gray-main">{description}</span>
    </div>
  );
}
