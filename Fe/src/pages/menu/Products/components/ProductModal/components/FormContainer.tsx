import { FormGroup } from '../../../../../../components/FormGroup';
import { Input } from '../../../../../../components/Input';

export function Form() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <FormGroup>
        <Input
          label='Nome do Produto'
          value=''
          onChange={() => {}}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label='Descrição'
          value=''
          onChange={() => {}}
        />
      </FormGroup>

      <FormGroup>
        <Input
          label='Preço'
          value=''
          onChange={() => {}}
        />
      </FormGroup>
    </div>
  );
}
