import { useEffect, useState } from 'react';
import { MontainIcon } from '../../../../../../components/Icons/MontainIcon';
import { PictureIcon } from '../../../../../../components/Icons/PictureIcon';
import { getImageByPath } from '../../../../../../utils/getImageByPath';

type ImageContainerProps = {
  image: File | string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageContainer({ image, onChange }: ImageContainerProps) {
  const [imageToBeRender, setImageToBeRender] = useState('');

  useEffect(() => {
    if(!image) return;
    if(typeof image === 'string') {
      setImageToBeRender(getImageByPath(image));
    } else {
      setImageToBeRender(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <div className='h-56 border border-gray-lighter rounded-md overflow-hidden flex flex-col'>
      <div className='h-full bg-gray-extralight flex items-center justify-center'>
        {!image && <MontainIcon className='w-7 text-gray-main'/>}
        {image && <img className='w-full h-[164px]' src={imageToBeRender}/>}
      </div>

      <div className='w-full h-20 bg-white flex justify-center items-center'>
        <label htmlFor='image-input' className='flex items-center gap-1 text-red-main font-bold text-base cursor-pointer'>
          <PictureIcon className='w-6'/>

          Alterar Imagem
        </label>

        <input
          id="image-input"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
