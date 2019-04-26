declare module '@ramda/pathor' {
  function pathOr<T>(fallback: any, path: (string | number)[], obj: any): T;
  export default pathOr;
}
