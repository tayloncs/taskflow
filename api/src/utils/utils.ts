export function filterEmpty(data: Object): any {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  );
}
