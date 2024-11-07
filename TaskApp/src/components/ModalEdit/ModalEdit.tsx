import { FiX } from 'react-icons/fi';
import * as styles from './ModalEdit.css'
import { useModalEdit } from '../../hooks/useModalEdit';
import { ITask } from '../../types';

const formData = [
  {
    label: '제목',
    name: 'taskName'
  },
  {
    label: '설명',
    name: 'taskDescription'
  },
  {
    label: '생성한 사람',
    name: 'taskOwner'
  }
]

const ModalEdit = () => {
  const { taskName, task, handleChange, handleClose, handleDelete, handleUpdate } = useModalEdit();

	return (
    <div className={styles.wrapper}>
      <div className={styles.modalWindow}>
        <div className={styles.header}>
          <div className={styles.title}>{taskName}</div>
          <FiX
            className={styles.closeButton}
            onClick={handleClose}
          />
        </div>
        {formData.map(form => (
          <>
            <div key={form.label} className={styles.title}>{form.label}</div>
            <input
              className={styles.input}
              name={form.name}
              value={task[form.name as keyof ITask]}
              onChange={handleChange}
            />
          </>
        ))}
        <div className={styles.buttonGroup}>
          <button
            className={styles.updateButton}
            onClick={handleUpdate}
          >
            할 일 수정
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            할 일 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;