
// Méthode 3 plus court
exports.success = (message, data) => {
    return {message,data};
};

// Méthode 2 on remplace const par exports.sucess
/*
  exports.success = (message,data) => {
    return {

       message : message,
       data : data

    }
  }
*/

  // Methode 1
/*const success = (message,data) => {

    return {

       message : message,
       data : data

    }
  }
*/