/**
 * Triggers a file input dialog in the browser and reads the selected file as a data URL.
 * Safe to import in React Native Web environments.
 *
 * @param {string} inputId - Unique ID for the temporary HTML input element.
 * @param {function(string): void} onChange - Callback function that receives the file's data URL.
 */
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
      onChange(evt.target.result);
    };
    reader.readAsDataURL(file);
    input.value = '';
  };
  input.click();
}
