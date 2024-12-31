export function getDaysInMonth(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the total number of days in the month
    const firstDay = new Date(year, month, 1).getDay(); // Get the day of the week for the 1st of the month
    const days = [];
  
    // Add null slots before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null); 
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
  
    return days;
}