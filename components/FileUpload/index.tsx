import React from 'react';

interface FileFieldProps {
  label?: string; 
  name: string; 
  onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  accept?: string; 
  maxSize?: number; 
  errorMessage?: string; 
  value?: any;
}

const FileField: React.FC<FileFieldProps> = ({
  label = 'Upload file',
  name,
  onChange,
  accept = 'image/*', 
  maxSize = 1024 * 1024 * 50, 
  errorMessage,
  value
}) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return; 

    // Validate file type
    if (!file.type.match(accept)) {
      console.error('Invalid file type. Please select a valid image.');
      return;
    }

    if (file.size > maxSize) {
      console.error('File size exceeds limit. Please select a file under 5MB.');
      return;
    }

    // Call the onChange handler if provided, passing the selected file
    onChange?.(event);
  };

  return (
    <div className="flex flex-col space-x-6 mb-[1.5rem]">
      <label
        htmlFor={name}
        className="flex flex-col gap-[1rem] "
      >
        <span className='mb-2 text-[1.25rem] font-bold text-gray-900 dark:text-white'>{label}:</span>
        <span className='sr-only'>{name}</span>

        <input
          className="block w-full text-md text-slate-500 file:mr-[1rem] file:py-[0.875rem] file:px-[1.25rem] file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          aria-describedby={`${name}_help`}
          id={name}
          name={name}
          // value={value}
          type="file"
          onChange={handleFileChange}
        />
      </label>

      {errorMessage && 
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      }
      <p className="mt-1 text-[0.75rem] text-slate-500" id={`${name}_help`}>
        Supported file types: {accept.replace(/\//g, ', ')} (MAX. {Math.floor(maxSize / (1024 * 1024))}MB).
      </p>
    </div>
  )
}

export default FileField;