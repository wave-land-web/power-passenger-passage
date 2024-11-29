/**
 * Handle UI messages based on submission state
 * @param {HTMLParagraphElement} responseElement - Element to display message
 * @param {String} state - 'loading', 'error', 'success'
 * @param {String} message - Message to display
 */
export function formValidationMessage(
  responseElement: HTMLParagraphElement,
  state: string,
  message: string
) {
  const errorClasses = ['text-red-900']
  const successClasses = ['text-green']

  // Reset styles
  responseElement.classList.remove('hidden')
  responseElement.classList.remove(...errorClasses)
  responseElement.classList.remove(...successClasses)

  // Set message text based on API response
  responseElement.textContent = message

  // Set message color based on state
  if (state === 'error') {
    responseElement.classList.add(...errorClasses)
  } else if (state === 'success') {
    responseElement.classList.add(...successClasses)
  }
}
