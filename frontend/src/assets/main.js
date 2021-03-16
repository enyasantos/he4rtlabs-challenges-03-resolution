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
  const welcomeBtnClose = document.querySelector('button.btn__logout');

  const email = document.querySelector('#input__email');
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#input__password');

  const audio = document.querySelector('audio.audio');
  const alert = document.querySelector('div.alert');

  const loaderHTML = `
    <div class="loader">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
    </div>
  `;

  (() => {
    const token = window.localStorage.getItem('token');
    if (token)
      setTimeout(() => {
        welcome.classList.toggle('active');
        circle.classList.toggle('active');

        setTimeout(() => welcomeText.classList.toggle('active'), 400);
        setTimeout(() => {
          welcomeBtnClose.classList.toggle('active');
          closeWelcomeEvent();
        }, 1000);

      }, 500);
  })();

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

  const closeWelcomeEvent = () => {
    welcomeBtnClose.addEventListener('click', (e) => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('id');

      welcomeText.classList.remove('active');
      welcomeBtnClose.classList.remove('active');
      setTimeout(() => {
        welcome.classList.remove('active');
        circle.classList.remove('active');
      }, 500);

      button.innerHTML = 'Entrar';
    });
  }

  const addLoader = () => {
    button.innerHTML = loaderHTML;
  }

  const cleanMessageAlert = () => {
    alert.children[0].innerText = '';
    alert.classList.remove('active');
  }

  const btnCloseMessageAlert = () => {
    alert.children[1].addEventListener('click', event => {
      alert.classList.remove('active');
    });
  }

  const messageAlert = (message, type) => {
    alert.classList.remove('success');
    alert.classList.remove('error');
    alert.classList.remove('warning');

    alert.classList.add(type);

    alert.classList.add('active');

    alert.children[0].innerText = message;

    btnCloseMessageAlert();
  }

  async function signUp(email, password) {
    const rawResponse = await fetch('http://localhost:3008/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const content = await rawResponse.json();

    return content;
  }

  async function signIn(email, password) {
    const rawResponse = await fetch('http://localhost:3008/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const content = await rawResponse.json();

    return content;

  }

  linkChangePage.addEventListener('click', event => {
    event.preventDefault();

    cleanMessageAlert();

    audio.play();

    bgPurple.classList.toggle('active');

    if (content.classList.value === 'content signin__theme')
      setTimeout(() => signinContent(), 200)

    else
      setTimeout(() => signupContent(), 200)

  });

  buttonSign.addEventListener('click', async event => {
    event.preventDefault();

    const valueButton = buttonSign.classList.value;

    if (valueButton === 'form_button action_signin') {

      cleanMessageAlert();

      if (email.value === "" || email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        messageAlert('Informe um email válido.', 'warning');
        return;
      }
      if (password.value.length < 3) {
        messageAlert('Informe um senha válida.', 'warning');
        return;
      }

      const response = await signIn(email.value, password.value);

      !response && addLoader();

      if (response.ok !== undefined) {
        addLoader();

        setTimeout(() => {
          welcome.classList.toggle('active');
          circle.classList.toggle('active');

          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('id', response.id);

          email.value = '';
          password.value = '';

          setTimeout(() => welcomeText.classList.toggle('active'), 400);
          setTimeout(() => {
            welcomeBtnClose.classList.toggle('active');
            closeWelcomeEvent();
          }, 1000);

        }, 2000);
      }
      else if (response.message !== undefined)
        messageAlert(response.message, 'error');

    }

    else if (valueButton === 'form_button action_signup') {

      cleanMessageAlert();

      if (email.value === "" || email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        messageAlert('Informe um email válido.', 'warning');
        return;
      }
      if (password.value.length < 5) {
        messageAlert('Informe uma senha com pelo menos 5 caracteres.', 'warning');
        return;
      }

      const response = await signUp(email.value, password.value);

      if (response.ok !== undefined) {
        addLoader();

        setTimeout(() => {

          messageAlert('Conta cadastrada com sucesso.', 'success');

          bgPurple.classList.toggle('active');
          audio.play();

          email.value = '';
          password.value = '';

          setTimeout(() => signupContent(), 200);

        }, 2000);

        setTimeout(() => {
          cleanMessageAlert();
        }, 5000)
      }
      else if (response.message !== undefined)
        messageAlert(response.message, 'error');
    }
  });

  togglePassword.addEventListener('click', (e) => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

    password.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash');
  });

})();