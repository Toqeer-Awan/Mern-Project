import React from 'react';
import { MdDelete, MdImage, MdPictureAsPdf, MdDescription, MdVideoLibrary, MdInsertDriveFile, MdCloud, MdStorage } from "react-icons/md";

// Function to get file icon based on type
const getFileIcon = (type) => {
  if (type.startsWith('image/')) return <MdImage className="text-blue-500 text-2xl" />;
  if (type === 'application/pdf') return <MdPictureAsPdf className="text-red-500 text-2xl" />;
  if (type.startsWith('video/')) return <MdVideoLibrary className="text-purple-500 text-2xl" />;
  if (type.includes('document') || type.includes('word') || type.includes('text')) 
    return <MdDescription className="text-green-500 text-2xl" />;
  return <MdInsertDriveFile className="text-gray-500 text-2xl" />;
};

// Function to get file extension/type for display
const getFileTypeDisplay = (type) => {
  if (type.startsWith('image/')) return 'Image';
  if (type === 'application/pdf') return 'PDF';
  if (type.startsWith('video/')) return 'Video';
  if (type.includes('document') || type.includes('word') || type.includes('text')) return 'Document';
  if (type.includes('spreadsheet') || type.includes('excel')) return 'Spreadsheet';
  if (type.includes('presentation') || type.includes('powerpoint')) return 'Presentation';
  if (type.includes('zip') || type.includes('compressed')) return 'Archive';
  return 'File';
};

const Filestable = ({ 
  files = [], 
  onRemoveFile, 
  uploadLocation = 'local',
  isUploading = false 
}) => {
  
  // Function to handle file removal
  const handleRemoveFile = (fileId) => {
    if (onRemoveFile) {
      onRemoveFile(fileId);
    } else {
      console.log('Remove file with id:', fileId);
      alert(`File ${fileId} would be removed`);
    }
  };

  // If no files, show empty state
  if (files.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <MdInsertDriveFile className="mx-auto text-5xl text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No files available</h3>
        <p className="text-gray-500">No files have been uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header - EXACT SAME as Upload page */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
        <div className="col-span-1">Preview</div>
        <div className="col-span-3">File Name</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Actions</div>
      </div>

      {/* Table Body - EXACT SAME as Upload page */}
      <div className="divide-y divide-gray-100">
        {files.map((file) => (
          <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
            {/* Preview Column */}
            <div className="col-span-1">
              {file.type && file.type.startsWith('image/') ? (
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img 
                    src={file.preview || file.url || ''} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `
                        <div class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
                          <MdImage className="text-blue-500 text-2xl" />
                        </div>
                      `;
                    }}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
                  {getFileIcon(file.type || 'file')}
                </div>
              )}
            </div>

            {/* File Name Column */}
            <div className="col-span-3">
              <p className="font-medium text-gray-800 truncate" title={file.name}>
                {file.name}
              </p>
              {uploadLocation && (
                <div className="flex items-center gap-1 mt-1">
                  {uploadLocation === 'local' ? (
                    <MdStorage className="text-xs text-blue-600" />
                  ) : (
                    <MdCloud className="text-xs text-green-600" />
                  )}
                  <p className="text-xs text-gray-500 truncate">
                    {uploadLocation === 'local' ? 'Local Server' : 'S3 Cloud'}
                  </p>
                </div>
              )}
            </div>

            {/* Type Column */}
            <div className="col-span-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {getFileTypeDisplay(file.type || 'file')}
              </span>
            </div>

            {/* Size Column */}
            <div className="col-span-2 text-gray-600">
              {typeof file.size === 'number' 
                ? `${file.size.toFixed(2)} MB`
                : file.size && file.size.includes('MB') 
                  ? file.size 
                  : `${file.size || '0.00'} MB`}
            </div>

            {/* Status Column */}
            <div className="col-span-2">
              {isUploading && file.uploadProgress !== undefined ? (
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(file.uploadProgress || 0, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {Math.min(file.uploadProgress || 0, 100)}% uploaded
                  </p>
                </div>
              ) : file.uploaded ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Uploaded</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Ready</span>
                </div>
              )}
            </div>

            {/* Actions Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (file.preview || file.url) {
                      window.open(file.preview || file.url, '_blank');
                    } else {
                      alert('No preview available for this file');
                    }
                  }}
                  disabled={isUploading}
                  className={`px-4 py-1.5 text-sm rounded transition-colors ${
                    isUploading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  View
                </button>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  disabled={isUploading}
                  className={`p-1.5 rounded-full transition-colors ${
                    isUploading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                  title="Remove file"
                >
                  <MdDelete className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filestable;