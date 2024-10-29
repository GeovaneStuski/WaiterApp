import { Button } from '../../../../components/Button';

type HeaderProps = {
  length: number;
  onOpenModal: () => void;
}

export function Header({ length, onOpenModal }: HeaderProps) {
  return (
    <header className='flex justify-between items-center text-sm'>
      <div className='flex gap-2 items-center'>
        <h1 className='font-bold text-lg'>Produtos</h1>

        <span className='px-2 rounded-md text-base font-semibold bg-gray-light/20 mt-0.5'>{length}</span>
      </div>

      <Button style='cancel' onClick={onOpenModal}>Novo Produto</Button>
    </header>
  );
}
