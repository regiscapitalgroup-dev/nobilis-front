export function formatDateStr(dateString: string): string {

    if (!dateString) {
        return ""; 
      }

    const date = new Date(dateString);
  
    return new Intl.DateTimeFormat("en-US", {
      month: "long",  
      day: "numeric", 
      year: "numeric" 
    }).format(date);
  }
  
export function daysSince(dateString: string): number {
  const [year, month, day] = dateString.split("-").map(Number);

  // Crear fecha EXACTA en local sin desfase UTC
  const fecha = new Date(year, month - 1, day);
  const hoy = new Date();

  fecha.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);

  const diffMs = hoy.getTime() - fecha.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}