import { Modal } from 'react-bootstrap'
import { Todo } from './TodoList';

type TodoModalProps = {
	show: boolean;
	onHide: () => void;
	todo: Todo;
}

const TodoModal: React.FC<TodoModalProps> = ({ show, todo, onHide }) => {
  return (
    <div>
      <Modal
        show={show}
				onHide={onHide}
				centered
      >
        <Modal.Header closeButton>
          <Modal.Title>투두 상세 정보</Modal.Title>
        </Modal.Header>
				<Modal.Body>
					{todo?.text}
				</Modal.Body>
      </Modal>
    </div>
  );
};
 
export default TodoModal;