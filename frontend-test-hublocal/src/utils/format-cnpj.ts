export function formatCNPJ(value: string): string {
  value = value.replace(/\D/g, "");

  value = value.substring(0, 14);
  if (value.length > 12) {
    value = value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/,
      "$1.$2.$3/$4-$5"
    );
  } else if (value.length > 8) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, "$1.$2.$3/$4");
  } else if (value.length > 5) {
    value = value.replace(/(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{1,3})/, "$1.$2");
  }

  return value;
}
