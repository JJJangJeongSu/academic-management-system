import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteNotice } from '../api/course';
import ConfirmDialog from './ConfirmDialog';

interface DeleteNoticeButtonProps {
  postId: number;
  onSuccess: () => void;
}

const DeleteNoticeButton: React.FC<DeleteNoticeButtonProps> = ({ postId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteNotice(postId);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : '공지사항 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (localStorage.getItem('userRole') !== '2') {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirmDialog(true)}
        disabled={isDeleting}
        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="공지사항 삭제"
      >
        {isDeleting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="공지사항 삭제"
        message="정말로 이 공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          setShowConfirmDialog(false);
          handleDelete();
        }}
        onCancel={() => setShowConfirmDialog(false)}
      />

      {error && (
        <div className="absolute right-0 mt-1 w-48 p-2 bg-red-50 text-red-600 text-sm rounded shadow-lg z-10">
          {error}
        </div>
      )}
    </div>
  );
};

export default DeleteNoticeButton; 