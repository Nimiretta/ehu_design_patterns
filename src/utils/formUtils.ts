export function clearInputs(fieldNameInput: HTMLInputElement, manualValueInput: HTMLInputElement): void {
  fieldNameInput.value = '';
  manualValueInput.value = '';
}

export function showErrors(errorList: HTMLElement, errors: string[]): void {
  errorList.innerHTML = '';
  errors.forEach((e) => {
    const li = document.createElement('li');
    li.textContent = e;
    errorList.appendChild(li);
  });
}
