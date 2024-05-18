import { useParams, Navigate } from 'react-router-dom';

const VALID_BOARDS = ['free', 'qna', 'etc'];

function useBoardValidation(Component) {
  return function BoardValidationWrapper(props) {
    const { board } = useParams();

    if (!VALID_BOARDS.includes(board)) {
      return <Navigate to='/404' replace />;
    }

    return <Component {...props} />;
  };
}

export default useBoardValidation;
