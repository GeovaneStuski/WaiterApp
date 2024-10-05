import { Button } from '../../../../../../components/Button';
import { MontainIcon } from '../../../../../../components/Icons/MontainIcon';
import { PictureIcon } from '../../../../../../components/Icons/PictureIcon';

export function ImageContainer() {
  return (
    <div className='w-full border border-gray-light/40 rounded-lg h-60 flex flex-col justify-between'>
      <div className='h-full flex justify-center items-center bg-gray-light/15'>
        <MontainIcon className='w-7 text-gray-main'/>
      </div>

      <div className='flex h-[84px] justify-center items-center'>
        <Button style='cancel'>
          <PictureIcon className='w-6'/>

                Alterar Imagem
        </Button>
      </div>
    </div>
  );
}
