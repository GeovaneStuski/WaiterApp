import { ImageBackground, TouchableOpacity } from 'react-native';

import { CloseIcon } from '../../../../../components/icons/CloseIcon';

import { getImageByPath } from '../../../../../utils/getImageByPath';

type ImageProps = {
  image: string;
  onClose: () => void;
}

export function Image({ image, onClose }: ImageProps) {
  return (
    <ImageBackground className='h-52 items-end p-6' source={{uri: getImageByPath(image)}}>
      <TouchableOpacity onPress={onClose} className='w-8 h-8 bg-black/60 rounded-full'>
        <CloseIcon size={32} color='#fff'/>
      </TouchableOpacity>
    </ImageBackground>
  );
}