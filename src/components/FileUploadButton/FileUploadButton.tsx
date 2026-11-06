import { useRef } from 'react';
import { checkFile, type FileRules } from '../../utils/files';
import { Button, type ButtonProps } from '../Button';
import type { RejectedFile } from '../FileDropzone';

export interface FileUploadButtonProps extends Omit<ButtonProps, 'onClick'>, FileRules {
  onFiles: (accepted: File[], rejected: RejectedFile[]) => void;
  multiple?: boolean;
}

/** A regular `<Button>` that opens the file picker and checks files against `accept` / `maxSize`. */
export function FileUploadButton({ onFiles, accept, maxSize, multiple = false, children = 'Upload file', ...props }: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button {...props} onClick={() => inputRef.current?.click()}>
        <span aria-hidden="true">⇪ </span>
        {children}
      </Button>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          const accepted: File[] = [];
          const rejected: RejectedFile[] = [];
          for (const file of files) {
            const reason = checkFile(file, { accept, maxSize });
            if (reason) rejected.push({ file, reason });
            else accepted.push(file);
          }
          onFiles(accepted, rejected);
          event.target.value = '';
        }}
      />
    </>
  );
}
