const utils = {
  resetElementNode: (element) => {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  },

  formatDate: (dateString) => {
    if (!dateString) return null;

    // Format: HH:mm dd/MM/yyyy
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();

    return `${hour}:${minute} ${day}/${month}/${year}`;
  },
};

export default utils;
