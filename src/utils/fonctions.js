export const verifyEmail = (email)=> {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  }

  export const verifyAmount = (amount)=>{
    let amountRegex = /^\d+(\.\d{2})?$/;

    return amountRegex.test(amount)
  }

  
  export const verifyPhoneNumber = (number)=>{
    let phoneNumberRegex = /^(?:(?:\+|00)229|0)?([4-9][0-9]){1}(?:[0-9][\s.-]*){6}$/;
    //  /^(?:(?:\+|00)229|0)?(?:[1-9][\s.-]*){8}$/;
    return phoneNumberRegex.test(number)
    
  }


  export const modalMessage = (data) => {
    if (data === "username") {
      return "Modification de votre nom d'utilisateur";
    }
    else if(data==='email'){
      return "Modification de votre email"
    }
    else{
      return "Modification de votre mot de passe"
    }
  };

