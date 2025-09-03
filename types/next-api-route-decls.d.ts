// Ambient module declarations to let TypeScript accept Next's generated .next type imports
// These imports reference compiled .js files under app/api/.../route.js which don't exist
// in the source tree during tsc --noEmit, so declare a broad pattern to avoid errors.
declare module '*app/api/*/route.js' {
  const _default: any
  export default _default
}

declare module '*app/api/*/*/route.js' {
  const _default: any
  export default _default
}
