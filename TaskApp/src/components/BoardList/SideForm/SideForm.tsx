import { FC } from 'react';
import * as styles from './SideForm.css'
import { FiCheck } from 'react-icons/fi';
import { useSideForm } from '../../../hooks/useSideForm';

type TSideFormProps = {
	onClose: () => void;
}

const SideForm: FC<TSideFormProps> = ({ onClose }) => {
  const { inputText, handleChange, handleSubmit } = useSideForm(onClose);

	return (
    <div className={styles.sideForm}>
      <input
        autoFocus
        className={styles.input}
        placeholder='새로운 게시판 등록'
        value={inputText}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        <FiCheck className={styles.icon} />
      </button>
    </div>
  );
};

export default SideForm;