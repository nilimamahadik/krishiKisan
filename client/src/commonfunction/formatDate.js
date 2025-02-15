
export const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(d.getFullYear()); // Get the last two digits of the year
   
    return `${day}-${month}-${year}`;
}
