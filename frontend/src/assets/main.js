(() => {

  const content = document.querySelector('div.content');
  const linkChangePage = document.querySelector('a.link__change-page');

  const bgPurple = document.querySelector('aside.container__purple')

  const title = document.querySelector('h1.header__title');
  const button = document.querySelector('button.form_button');
  const footer = document.querySelector('span.footer__text');

  const buttonSign = document.querySelector('button.form_button');

  const welcome = document.querySelector('section.welcome');
  const circle = document.querySelector('div.circle');
  const welcomeText = document.querySelector('h2.welcome__text');

  const email = document.querySelector('#input__email');
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#input__password');

  const messageEmail = document.querySelector('p.message__email');
  const messagePass = document.querySelector('p.message__password');


  const loaderHTML = `
    <div class="loader">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
    </div>
  `;

  const signupContent = () => {
    email.value = '';
    password.value = '';
    content.classList.remove('signup__theme')
    content.classList.add('signin__theme');
    title.innerText = 'Realizar Login';
    button.classList.toggle('action_signup');
    button.classList.toggle('action_signin');
    button.innerHTML = 'Entrar';
    footer.innerHTML = 'Ainda não possui conta?';
  }

  const signinContent = () => {
    email.value = '';
    password.value = '';
    content.classList.remove('signin__theme')
    content.classList.add('signup__theme');
    title.innerText = 'Realizar Cadastro';
    button.classList.toggle('action_signup');
    button.classList.toggle('action_signin');
    button.innerText = 'Registrar';
    footer.innerText = 'Já possui uma conta?';
  }

  linkChangePage.addEventListener('click', event => {
    event.preventDefault();

    bgPurple.classList.toggle('active');

    if (content.classList.value === 'content signin__theme')
      setTimeout(() => signinContent(), 200)

    else
      setTimeout(() => signupContent(), 200)

  });

  buttonSign.addEventListener('click', event => {
    event.preventDefault();

    const valueButton = buttonSign.classList.value;

    if (valueButton === 'form_button action_signin') {

      messageEmail.innerText = '';
      messagePass.innerText = '';

      if (email.value === "" || email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        messageEmail.innerText = '* Informe um email válido.';
        return;
      }
      if (password.value.length < 3) {
        messagePass.innerText = '* Informe uma senha válida.';
        return;
      }

      button.innerHTML = loaderHTML;

      setTimeout(() => {
        welcome.classList.toggle('active');
        circle.classList.toggle('active');

        setTimeout(() => welcomeText.classList.toggle('active'), 400)

      }, 2000);
    }

    else if (valueButton === 'form_button action_signup') {

      messageEmail.innerText = '';
      messagePass.innerText = '';

      if (email.value === "" || email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        messageEmail.innerText = '* Informe um email válido.';
        return;
      }
      if (password.value.length < 5) {
        messagePass.innerText = '* Informe uma senha com pelo menos 5 caracteres.';
        return;
      }

      button.innerHTML = loaderHTML;

      setTimeout(() => {

        bgPurple.classList.toggle('active');

        setTimeout(() => signupContent(), 200);

      }, 2000);
    }
  });

  togglePassword.addEventListener('click', function (e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

    password.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash');
  });

})();