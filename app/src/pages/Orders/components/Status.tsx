import { Text, View } from 'react-native';
import { StatusIcon } from '../../../components/icons/StatusIcon';

type StatusProps = {
  status: 'DONE' | 'IN_PRODUCTION' | 'WAITING' | 'FINISHED';
  date?: string;
}

export function Status({ status, date }: StatusProps) {
  const statusOptions = {
    WAITING: {
      label: 'Na Fila',
      background: 'rgba(215, 48, 48, 0.05)',
      color: {
        external: 'rgba(215, 48, 48, 0.12)',
        internal: 'rgba(215, 48, 48, 1)',
      }
    },
    'IN_PRODUCTION': {
      label: 'Entrou em produção',
      background: 'rgba(215, 108, 48, 0.05)',
      color: {
        external: 'rgba(215, 108, 48, 0.12)',
        internal: 'rgba(215, 108, 48, 1)',
      }
    },
    DONE: {
      label: 'Pronto',
      background: 'rgba(48, 215, 135, 0.05)',
      color: {
        external: 'rgba(48, 215, 135, 0.12)',
        internal: 'rgba(48, 215, 135, 1)',
      }
    },
    FINISHED: {
      label: `Finalizado em ${date}`,
      background: 'rgba(102, 102, 102, 0.05)',
      color: {
        external: 'rgba(102, 102, 102, 0.12)',
        internal: 'rgba(102, 102, 102, 1)',
      }
    },
  };

  return (
    <View style={{ backgroundColor: statusOptions[status].background }} className='flex-row items-center py-0.5 px-1.5 rounded'>
      <StatusIcon color={statusOptions[status].color} size={6}/>

      <Text style={{ color: statusOptions[status].color.internal }} className='ml-2 font-semibold'>{statusOptions[status].label}</Text>
    </View>
  );
}