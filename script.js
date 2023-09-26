document.addEventListener('DOMContentLoaded', function() {

  //-------------Locators-------------------
  
  let leftPane = document.querySelector('.left-pane');
  let token = localStorage.getItem("token");
  

function verifyAuth(){
    

    if(token === null){
        showLoginPage();
    }else{
        showUserPage();
    }
}

verifyAuth();


 

function showLoginPage(){
    leftPane.innerHTML = `<div class="login-container">
    <h1 class="heading">Welcome back</h1>
    <h2 class="sub-heading">Welcome back! Please enter your details.</h2>
    <form id="loginForm">
        <h4 id="loginErr">Invalid login credentials.</h4>
        <div class="email-box">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email">
        </div>
        <div class="pass-box">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password">
        </div>
        <div class="remember-forgot">
            <div class="remember">
                <input type="checkbox" id="remember" name="remember" value="remember">
                <label for="remember">Remember for 30 days</label>
            </div>
            <a id="forgotBtn" href="#">Forgot Password</a>
        </div>
        <button class="sign-in-btn" type="submit">Sign in</button>
        <a class="google-sign-in" href="#"><img src="img/google.png" alt=""><span>Sign in with Google</span></a>
    </form>
    <p class="sign-up">Don't have an account? <a id="regBtn" href="#">Sign up</a></p>
</div>
<div class="register-container hidden">
    <h1 class="heading">Register an account</h1>
    <h2 class="sub-heading">Enter your details to create a new user account.</h2>
    <form id="reg-form">
        <h4 id="regErr">Invalid data. Review and try again.</h4>
        <div class="email-box">
            <label for="nameReg">Name</label>
            <input type="text" id="nameReg" name="nameReg" placeholder="Enter your name">
        </div>
        <div class="pass-box">
            <label for="passwordReg">Password</label>
            <input type="password" id="passwordReg" name="passwordReg" placeholder="Enter your password">
        </div>
        <div class="pass-box">
            <label for="passwordConfirmReg">Confirm Password</label>
            <input type="password" id="passwordConfirmReg" name="passwordConfirmReg" placeholder="Confirm your password">
        </div>
        <div class="email-box">
            <label for="emailReg">Email</label>
            <input type="email" id="emailReg" name="emailReg" placeholder="Enter your email">
        </div>
        <div class="pass-box">
            <label for="password">City</label>
            <input type="text" id="cityReg" name="password" placeholder="Enter your City">
        </div>
        <div class="pass-box">
            <label for="password">Country</label>
            <input type="text" id="countryReg" name="country" placeholder="Enter your Country">
        </div>
       
        <button id= "registerBtn" class="sign-in-btn" type="submit">Register</button>
        <a class="google-sign-in" id="back-to-login"href="#">Back to Login</a>
        
    </form>
</div>
    `
    let loginEmail = document.querySelector("#email");
  let loginPassword = document.querySelector("#password");
  let errorMsg = document.querySelector("#loginErr");
  let regErr = document.querySelector("#regErr");
  let regBtn = document.querySelector("#regBtn");
  let loginForm = document.querySelector("#loginForm");
  let loginContainter = document.querySelector('.login-container');
  let registerContainter = document.querySelector('.register-container');
  let emailReg = document.querySelector('#emailReg');
  let passwordReg = document.querySelector('#passwordReg');
  let nameReg = document.querySelector('#nameReg');
  let confirmPassReg = document.querySelector('#passwordConfirmReg');
  let cityReg = document.querySelector('#cityReg');
  let countryReg = document.querySelector('#countryReg');
  let regForm = document.querySelector('#reg-form');

  function displayPopup() {
    let popup = document.createElement("div");
    popup.classList.add('reg-success');
    popup.innerHTML = `
        <h1 class='heading'>Well done!</h1>
        
        <button id='back-to-login-success' class='sign-in-btn'>Close</button>
    `;
    leftPane.appendChild(popup);
    registerContainter.style.pointerEvents = ("none");

    let backToLoginBtn = document.querySelector('#back-to-login-success');
    backToLoginBtn.addEventListener('click', function() {
        closePopup();
        loginContainter.classList.remove('hide');
        registerContainter.classList.add('hidden');
    });
}

function closePopup() {
    loginContainter.classList.remove('hide');
    registerContainter.classList.add('hidden');
    let popup = document.querySelector('.reg-success');
    if (popup) {
        leftPane.removeChild(popup);
    }
    location.reload();
}

function clearFields() {
    emailReg.value = "";
    passwordReg.value = "";
    nameReg.value = "";
    cityReg.value = "";
    countryReg.value = "";
}

//------------Listeners to Actions---------------
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    login();
});

regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    register();
});

regBtn.addEventListener('click', function() {
    registerContainter.classList.remove('hidden');
    loginContainter.classList.add('hide');
});

function login() {
    const apiUrl = "http://127.0.0.1:3000";
    let data = {
        email: loginEmail.value,
        password: loginPassword.value
    };

    fetch(apiUrl + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        if (response.token) {
            let token = response.token;
            errorMsg.style.display = 'none';
            localStorage.setItem('token', token);
            localStorage.setItem("userName",response.name);
            location.reload();
            
            
        } else {
            console.error("Login failed:", response.message);
            errorMsg.style.display = 'block';
            errorMsg.textContent = response.message;
        }
        
    })
    
    .catch(error => {
        console.error("Request failed:", error);
    });
    
}

function register() {
    const apiUrl = "http://127.0.0.1:3000";

    if (passwordReg.value === confirmPassReg.value) {
        let data = {
            email: emailReg.value,
            password: passwordReg.value,
            name: nameReg.value,
            city: cityReg.value,
            country: countryReg.value
        };

        fetch(apiUrl + "/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if (response.id) {
                console.log('User created: ', response.id);
                regErr.style.display = 'none';
                displayPopup();
                clearFields();
            } else {
                console.error("Register failed:", response.message);
                regErr.style.display = 'block';
                regErr.textContent = response.message;
            }
        })
        .catch(error => {
            console.error("Request failed:", error);
        });
    } else {
        regErr.style.display = 'block';
        regErr.textContent = "Passwords do not match";
    }
}


}

function showUserPage(){

    leftPane.innerHTML=`
    <h1 class="heading">Welcome ${localStorage.getItem("userName")}</h1>
    <h2 class="sub-heading">You have sucessfully logged in!</h2>
    
    <form>
    <button class="sign-in-btn" id="logoutBtn" type="submit">Logout</button>
</form>`

}

let logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    console.log(token);
    location.reload();
})

  
});
