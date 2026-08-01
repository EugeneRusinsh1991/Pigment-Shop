/**
 * Triggers a file input dialog in the browser and reads the selected file.
 * Safe to import in React Native Web environments.
 *
 * @param {string} inputId - Unique ID for the temporary HTML input element.
 * @param {function(string, File=): void} onChange - Callback function that receives the file's data URL and raw File object.
 */
import { storageService } from '../services/storageService';

export function triggerFileInput(inputId, onChange) {
  if (typeof document === 'undefined') return;

  let input = document.getElementById(inputId);
  if (!input) {
    input = document.createElement('input');
    input.id = inputId;
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
  }
  input.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      onChange(evt.target.result, file);
    };
    reader.readAsDataURL(file);
    input.value = '';
  };
  input.click();
}

/**
 * Triggers a file input dialog, uploads the selected file via storageService, and returns the public URL.
 *
 * @param {string} inputId - Unique ID for the temporary HTML input element.
 * @param {function(string, Object=): void} onUploadSuccess - Callback receiving the uploaded image URL and metadata.
 * @param {import('../services/storage/providers/baseStorageProvider').StorageUploadOptions} [options]
 * @param {function(Error=): void} [onError]
 */
export function triggerFileUpload(inputId, onUploadSuccess, options = {}, onError = null) {
  if (typeof document === 'undefined') return;

  let input = document.getElementById(inputId);
  if (!input) {
    input = document.createElement('input');
    input.id = inputId;
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
  }
  input.onchange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const result = await storageService.uploadImage(file, options);
      if (result.success && result.data?.url) {
        onUploadSuccess(result.data.url, result.data);
      } else if (onError) {
        onError(new Error(result.error || 'Upload failed'));
      }
    } catch (err) {
      if (onError) onError(err);
    }
    input.value = '';
  };
  input.click();
}
