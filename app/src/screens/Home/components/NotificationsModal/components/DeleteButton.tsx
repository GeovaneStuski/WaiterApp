import { TouchableOpacity } from 'react-native';
import { TrashIcon } from '../../../../../components/icons/TrashIcon';

type DeleteButtonProps = {
  onDeleteNotification: () => void;
}

export function DeleteButton({ onDeleteNotification}: DeleteButtonProps) {
  return (
    <TouchableOpacity onPress={onDeleteNotification}>
      <TrashIcon size={20} color='#D73035' />
    </TouchableOpacity>
  );
}