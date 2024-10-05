const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
form.addEventListener('submit',function(event){
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email.value)){
        document.getElementById('emailError').textContent = "invalid email format";
        return;
    }else{
        document.getElementById('emailError').textContent = ''
    }
    if (password.value.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        return;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    // If all inputs are valid, submit the form
    alert('Form submitted successfully!');
    form.reset();
})
