function validateLogin()
{
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    
    var email_res = validateEmail(email);
    var password_res = validatePassword(password);
    
    if(!email_res || !password_res) {
        return false;
    }
    
    return true;
}

function validateEmail(email) {
  var result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
  return result.test(email);
}

function validatePassword(password) {
    var result=  /^.{6,}$/gm;
    return result.test(password);
}

function validatePhone(phone)
{
    var regex_phone = /^(0092)\d{10}$/;
    if(phone.length < 4) {
        document.getElementById("phone").value = "0092";
    }
    
    return regex_phone.test(phone);    
}

function validateName(name)
{
    var regex_name = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return regex_name.test(name);    
}

function validateHostelName(name)
{
    var regex_hostel_name = /^[a-zA-Z]+(([',. -][a-zA-Z ]\d*\s?)?[a-zA-Z0-9^\s]*)*[^\s]$/;
    return regex_hostel_name.test(name);    
}

function handleChange(checkbox) {
    var div = document.getElementById("phone_div");
    var phn = document.getElementById("phone");
    var account_type = document.getElementById("user_account_type");

    if(checkbox.checked == true){
        phn.style.display = "block";
        div.style.display = "block";
        phn.value = "0092";
        account_type.value = '2';
    }
    else
    {
        phn.style.display = "none";
        div.style.display = "none"; 
        phn.value = "";

    }
}

function validateSignup() 
{
    var first_name = document.getElementById("signup-first-name");
    var last_name = document.getElementById("signup-last-name");
    var email = document.getElementById("signup-email");
    var phone = document.getElementById("signup-phone");
    var password = document.getElementById("signup-password");
    var confirm_password = document.getElementById("signup-confirm-spassword");

    var email_res = validateEmail(email.value);
    var password_res = validatePassword(password.value);
    var phone_res = validatePhone(phone);
    var first_name_res = validateName(first_name);
    var last_name_res = validateName(last_name);

    if(!email_res || !password_res || !phone_res || !first_name_res || !last_name_res || (password.value != confirm_password.value)) {
        return false;
    }
    
    return true;
}