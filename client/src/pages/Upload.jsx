import React, { useState } from 'react';
import { MdUpload, MdImage, MdPictureAsPdf, MdDescription, MdVideoLibrary,MdCloud, MdStorage } from "react-icons/md";
import Filestable from '../components/Filestable';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadLocation, setUploadLocation] = useState('local');
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection from input
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  // Add files to state
  const addFiles = (newFiles) => {
    const filesWithPreview = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
      type: file.type,
      preview: URL.createObjectURL(file),
      uploadProgress: 0,
      uploaded: false
    }));
    setFiles(prev => [...prev, ...filesWithPreview]);
  };

  // Remove a single file
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Simulate upload progress
  const simulateUploadProgress = (fileId) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        progress = Math.min(progress, 100);
        
        setFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, uploadProgress: progress } : file
        ));
        
        if (progress >= 100) {
          clearInterval(interval);
          // Mark as uploaded
          setFiles(prev => prev.map(file => 
            file.id === fileId ? { ...file, uploaded: true, uploadProgress: 100 } : file
          ));
          resolve();
        }
      }, 200);
    });
  };

  // Handle upload button click
  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files to upload first!');
      return;
    }

    setIsUploading(true);
    
    try {
      // Reset all files to not uploaded
      setFiles(prev => prev.map(file => ({ ...file, uploaded: false })));
      
      // Simulate file upload with progress for each file
      const uploadPromises = files.map(async (file) => {
        await simulateUploadProgress(file.id);
        
        // Here you would make actual API calls based on uploadLocation
        if (uploadLocation === 'local') {
          // Upload to local server API call
          console.log('Uploading to local server:', file.name);
          // await uploadToLocalServer(file.file);
        } else {
          // Upload to S3 API call
          console.log('Uploading to S3:', file.name);
          // await uploadToS3(file.file);
        }
      });

      await Promise.all(uploadPromises);
      
      alert(`Successfully uploaded ${files.length} file(s) to ${uploadLocation === 'local' ? 'Local Server' : 'S3 Cloud'}!`);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
    setIsUploading(false);
  };

  return (
    <>
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Supported File Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MdImage className="text-blue-500 text-xl" />
            <div>
              <p className="font-medium">Images</p>
              <p className="text-sm text-gray-500">JPG, PNG, GIF</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MdPictureAsPdf className="text-red-500 text-xl" />
            <div>
              <p className="font-medium">PDFs</p>
              <p className="text-sm text-gray-500">All PDF files</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MdDescription className="text-green-500 text-xl" />
            <div>
              <p className="font-medium">Documents</p>
              <p className="text-sm text-gray-500">DOC, DOCX, TXT</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MdVideoLibrary className="text-purple-500 text-xl" />
            <div>
              <p className="font-medium">Videos</p>
              <p className="text-sm text-gray-500">MP4, AVI, MOV</p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Files</h1>
            <p className="text-gray-600">Upload images, documents, videos, PDFs, and more</p>
          </div>

          {/* Upload Location Selection */}
          <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Select Upload Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Local Server Option */}
              <label className={`cursor-pointer border-2 rounded-lg p-5 transition-all ${uploadLocation === 'local' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="uploadLocation"
                    value="local"
                    checked={uploadLocation === 'local'}
                    onChange={(e) => setUploadLocation(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MdStorage className="text-2xl text-blue-600" />
                      <div>
                        <h3 className="font-medium text-gray-800">Local Server</h3>
                        <p className="text-sm text-gray-600">Store files on your own server</p>
                      </div>
                    </div>
                    {/* <ul className="text-sm text-gray-500 space-y-1 mt-3 ml-8">
                      <li>• Files stored on your server</li>
                      <li>• Full control over data</li>
                      <li>• No additional costs</li>
                      <li>• Limited by server storage</li>
                    </ul> */}
                  </div>
                </div>
              </label>

              {/* S3 Cloud Option */}
              <label className={`cursor-pointer border-2 rounded-lg p-5 transition-all ${uploadLocation === 's3' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="uploadLocation"
                    value="s3"
                    checked={uploadLocation === 's3'}
                    onChange={(e) => setUploadLocation(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MdCloud className="text-2xl text-green-600" />
                      <div>
                        <h3 className="font-medium text-gray-800">S3 Cloud Storage</h3>
                        <p className="text-sm text-gray-600">Store files on Amazon S3</p>
                      </div>
                    </div>
                    {/* <ul className="text-sm text-gray-500 space-y-1 mt-3 ml-8">
                      <li>• Scalable cloud storage</li>
                      <li>• High availability</li>
                      <li>• Pay-as-you-go pricing</li>
                      <li>• Automatic backups</li>
                    </ul> */}
                  </div>
                </div>
              </label>
            </div>
            
            {/* Current Selection Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {uploadLocation === 'local' ? (
                  <MdStorage className="text-xl text-blue-600" />
                ) : (
                  <MdCloud className="text-xl text-green-600" />
                )}
                <div>
                  <p className="text-gray-700">
                    Selected: <span className="font-medium">{uploadLocation === 'local' ? 'Local Server' : 'S3 Cloud Storage'}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {uploadLocation === 'local' 
                      ? 'Files will be uploaded to your local server storage' 
                      : 'Files will be uploaded to Amazon S3 cloud storage'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div 
            className={`mb-8 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <MdUpload className="mx-auto text-5xl text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag & drop files here
              </p>
              <p className="text-gray-500 mb-4">
                or click to browse files from your computer
              </p>
            </div>
            
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <MdUpload className="mr-2" />
              Browse Files
            </label>
            
            <p className="text-sm text-gray-500 mt-4">
              Supports: Images, PDFs, Documents, Videos (Max: 10MB per file)
            </p>
          </div>

          {/* File Count and Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-gray-700 font-medium">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
              </span>
              <span className="ml-4 text-sm text-gray-500">
                Uploading to: {uploadLocation === 'local' ? 'Local Server' : 'S3 Cloud'}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearAll}
                disabled={files.length === 0 || isUploading}
                className={`px-5 py-2 rounded-lg font-medium ${
                  files.length === 0 || isUploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Clear All
              </button>
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                  files.length === 0 || isUploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <MdUpload className="mr-2" />
                    Upload to {uploadLocation === 'local' ? 'Server' : 'S3'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Use Filestable Component */}
          <Filestable 
            files={files} 
            onRemoveFile={removeFile}
            uploadLocation={uploadLocation}
            isUploading={isUploading}
          />

          {/* Empty State - Shown inside Filestable component */}
        </div>
      </div>
    </>
  );
};

export default Upload;