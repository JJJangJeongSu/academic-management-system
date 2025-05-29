import React from 'react';
import { Download, FileText, FileImage, Archive } from 'lucide-react';
import { Material } from '../data/mockData';

interface MaterialItemProps {
  material: Material;
}

const MaterialItem: React.FC<MaterialItemProps> = ({ material }) => {
  const getIcon = () => {
    switch (material.type) {
      case 'pdf':
        return <FileText size={20} className="text-red-500" />;
      case 'ppt':
        return <FileImage size={20} className="text-orange-500" />;
      case 'zip':
        return <Archive size={20} className="text-blue-500" />;
      default:
        return <FileText size={20} className="text-gray-500" />;
    }
  };

  const getFormatLabel = () => {
    switch (material.type) {
      case 'pdf':
        return 'PDF';
      case 'ppt':
        return 'PPT';
      case 'zip':
        return 'ZIP';
      default:
        return material.type.toUpperCase();
    }
  };

  return (
    <div className="card p-4 flex items-center justify-between transition-all hover:shadow-md mb-3">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-4">
          <h4 className="font-medium text-secondary-800">{material.title}</h4>
          <div className="flex items-center text-xs text-secondary-500 mt-1 space-x-2">
            <span>{getFormatLabel()}</span>
            <span>•</span>
            <span>{material.size}</span>
          </div>
        </div>
      </div>
      <button className="btn btn-secondary btn-sm flex items-center">
        <Download size={16} className="mr-1" />
        Download
      </button>
    </div>
  );
};

export default MaterialItem;