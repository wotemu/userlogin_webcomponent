const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="css/voimaLogin.css"/>

<form class="form" id="login">
    <h1 class="form__title">Welcome, Login to continue</h1>
    <div class="form__message form__message--error"></div>
    <div class="form__input-group">
        <input type="text" class="form__input" autofocus placeholder="Email">
        <div class="form__input-error-message"></div>
    </div>
    <div class="form__input-group">
        <input type="password" class="form__input" autofocus placeholder="Password" >
        <div class="form__input-error-message"></div>
    </div>
    <p class="form__text">
    <a href="#" class="form__link">Forgot your password?</a>
    </p>
    <button class="form__button" type="submit">Log in</button>
   
    <p class="form__text">
        <a class="form__link" href="./" id="signupLink">Don't have an account yet? Register first</a>
    </p>
</form>
<form class="form form--hidden" id="createAccount">
      <h1 class="form__title">Create Account</h1>
      <div class="form__message form__message--error"></div>
      <div class="form__input-group">
          <input type="text" id="signupUsername" class="form__input" autofocus placeholder="Username">
          <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
          <input type="text" class="form__input" autofocus placeholder="Email Address">
          <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
          <input type="password" class="form__input" autofocus placeholder="Password">
          <div class="form__input-error-message"></div>
      </div>
      <div class="form__input-group">
          <input type="password" class="form__input" autofocus placeholder="Confirm password">
          <div class="form__input-error-message"></div>
      </div>
      <button class="form__button" type="submit">Continue</button>
      <p class="form__text">
          <a class="form__link" href="./" id="loginLink">Already have an account? Sign in</a>
      </p>
</form>

`;

class VoimaLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove(
      "form__message--success",
      "form__message--error"
    );
    messageElement.classList.add(`form__message--${type}`);
  }

  setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(
      ".form__input-error-message"
    ).textContent = message;
  }

  clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(
      ".form__input-error-message"
    ).textContent = "";
  }

  connectedCallback() {
    const loginForm = this.shadowRoot.querySelector("#login");
    const signupForm = this.shadowRoot.querySelector("#createAccount");

    this.shadowRoot
      .querySelector("#signupLink")
      .addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        signupForm.classList.remove("form--hidden");
      });

    this.shadowRoot
      .querySelector("#loginLink")
      .addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        signupForm.classList.add("form--hidden");
      });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // perform Fetch
      if (e.target.value.length < 5) {
        this.setFormMessage(loginForm, "error", "Required!");
      }
      //redirect to upload page
      window.location.href = "/upload/upload.html";
    });

    this.shadowRoot.querySelectorAll(".form__input").forEach((inputElement) => {
      inputElement.addEventListener("blur", (e) => {
        if (e.target.id === "signupUsername" || e.target.value.length < 5) {
          this.setInputError(inputElement, "This field is required!");
        }
      });

      inputElement.addEventListener("input", (e) => {
        this.clearInputError(inputElement);
      });
    });
  }
}

window.customElements.define("voima-login", VoimaLogin);
