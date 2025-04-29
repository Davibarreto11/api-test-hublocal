export function formatCEP(value: string): string {
  return value
    .replace(/\D/g, "")
    .substring(0, 8)
    .replace(/(\d{5})(\d{1,3})/, "$1-$2");
}
