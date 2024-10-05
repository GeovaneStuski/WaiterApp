import { EditIcon } from '../Icons/EditIcon';
import { TrashIcon } from '../Icons/TrashIcon';
import { motion } from 'framer-motion';

type TableProps<T> = {
  head: {
    name: string;
    style: string;
  }[];
  body: {
    id: string;
    item: T;
    items: {
      item: string | JSX.Element;
    }[];
  }[];
  onAction: (param: T) => void;
  onDelete: (param: T) => void;
  actionIcon?: React.ElementType;
};

export function Table<T>({ head, body, onAction, onDelete, actionIcon: ActionIcon }: TableProps<T>) {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-lg border border-gray-light/40">
      <table className="w-full text-gray-800 text-sm">
        <thead className="bg-gray-light/20">
          <tr>
            {head.map(({name, style}) => (
              <th className={`py-3 px-4 ${style}`} key={name}>{name}</th>
            ))}

            <th className="py-3 px-4 text-start w-40">Ações</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-light/40'>
          {body.map(({id, items, item}) => (
            <motion.tr
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              key={id}
            >
              {items.map(({item}, index) => <td key={typeof item !== 'string' ? Math.random() : item} className={`py-3 px-4 ${head[index].style}`}>{item}</td>)}

              <td className='py-3 px-4 text-start flex gap-4'>
                <button className='w-6 text-gray-main' onClick={() => onAction(item)}>
                  {ActionIcon ? <ActionIcon/> : <EditIcon/>}
                </button>

                <button className='w-6 text-red-main' onClick={() => onDelete(item)}>
                  <TrashIcon/>
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}