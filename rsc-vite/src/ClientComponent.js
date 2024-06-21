/*
 * All client components that are rendered by server components need to be
 * exported from this file.
 *
 * This makes it trivial to implement the `__webpack_require__` function in the
 * client runtime, but is a bit unfortunate because it is difficult to remember
 * that you need to export these components in this file.
 *
 */

export function ClientComponent() {
  return <div>Client Component</div>;
}