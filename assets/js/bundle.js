!function(){function e(){var e=!0,r=document.querySelector(".subscribe-email-header");return e=t(r.value),e||r.classList.add("form-erro"),e}function t(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}document.getElementById("subscribe-header").addEventListener("click",function(){fbq("track","CompleteRegistration")}),document.getElementById("subscribe-footer").addEventListener("click",function(){fbq("track","CompleteRegistration")});var r=document.querySelector(".subscribe-form-header");r.onsubmit=e}();