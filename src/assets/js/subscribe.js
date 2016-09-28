;(function() {
  document.getElementById("subscribe-footer").addEventListener("click", function() {
    fbq('track','CompleteRegistration');
  });

  var formHeader = document.querySelector('.subscribe-form-footer');
  formHeader.onsubmit = valid;

  function valid() {
    var isValid = !0,
        inputEmail = document.querySelector('.subscribe-email');
    
    isValid = checkEmail(inputEmail.value);
    
    if (!isValid) {
      inputEmail.classList.add('form-erro');
    }
    return isValid
  }

  function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

})();