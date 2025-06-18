import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { createCourseMaterial } from '../api/course';

interface CreateCourseMaterialFormProps {
  courseId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateCourseMaterialForm: React.FC<CreateCourseMaterialFormProps> = ({
  courseId,
  onSuccess,
  onCancel,
}) => {
  const [postName, setPostName] = useState('');
  const [postString, setPostString] = useState('');
  const [appendix, setAppendix] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createCourseMaterial(courseId, postName, postString, appendix || undefined);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : '강의자료 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-lg font-semibold text-secondary-900">강의자료 작성</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-secondary-500 hover:text-secondary-700"
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="postName" className="block text-sm font-medium text-secondary-700 mb-1">
          제목
        </label>
        <input
          type="text"
          id="postName"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="강의자료 제목을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="postString" className="block text-sm font-medium text-secondary-700 mb-1">
          내용
        </label>
        <textarea
          id="postString"
          value={postString}
          onChange={(e) => setPostString(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[200px] resize-y"
          placeholder="강의자료 내용을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="appendix" className="block text-sm font-medium text-secondary-700 mb-1">
          첨부파일
        </label>
        <div className="mt-1 flex items-center">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
            <span className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm">
              <Download size={16} className="mr-2" />
              파일 선택
            </span>
            <input
              type="file"
              id="appendix"
              onChange={(e) => setAppendix(e.target.files?.[0] || null)}
              className="sr-only"
            />
          </label>
          {appendix && (
            <span className="ml-3 text-sm text-secondary-600">
              {appendix.name}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              작성 중...
            </span>
          ) : (
            '강의자료 작성'
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateCourseMaterialForm; 