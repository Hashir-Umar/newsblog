export const validateEmail = (email) => {
    const result = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    return result.test(email);
};

export const validatePassword = (password) => {
    const result = /^.{8,}$/gm;
    return result.test(password);
};

export const validatePhone = (phone) => {
    const regex_phone = /^(0092)\d{10}$/;
    return regex_phone.test(phone);
};

export const validateName = (name) => {
    const regex_name = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return regex_name.test(name);
};
