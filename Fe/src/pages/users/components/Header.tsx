import { Button } from '../../../components/Button';

type HeaderProps = {
  length: number;
  onOpenModal: () => void;
}

export function Header({length, onOpenModal}: HeaderProps) {
  return (
    <header className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold">Usuários</h1>

        <span className="mt-0.5 rounded-md bg-gray-light/20 px-2 text-base font-semibold">
          {length}
        </span>
      </div>

      <Button style="cancel" onClick={onOpenModal}>
          Novo Usuário
      </Button>
    </header>
  );
}
