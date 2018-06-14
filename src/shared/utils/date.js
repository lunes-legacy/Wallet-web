const timestampToDate = timestamp => {
    if (!timestamp) return null;
    let date = new Date(timestamp);
    let weekDay = date.getDay();
    switch (weekDay) {
      case 0:
        weekDay = "Segunda-feira";
        break;
      case 1:
        weekDay = "Terça-feira";
        break;
      case 2:
        weekDay = "Quarta-feira";
        break;
      case 3:
        weekDay = "Quinta-feira";
        break;
      case 4:
        weekDay = "Sexta-feira";
        break;
      case 5:
        weekDay = "Sabado";
        break;
      case 6:
        weekDay = "Domingo";
        break;
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getYear();
    return `${weekDay} ${day}/${month}/${year}`;
  }

  export {timestampToDate}