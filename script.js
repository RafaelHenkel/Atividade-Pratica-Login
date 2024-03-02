////////////////////////////////////////CRIAR CONTA////////////////////////////////////////

const createAccount = async (event) => {
  event.preventDefault();

  try {
    const mail = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const pass = document.getElementById("password").value;

    const data = {
      mail: mail,
      name: name,
      pass: pass,
    };

    localStorage.setItem("sendAccount", JSON.stringify(data));

    const dataSave = JSON.parse(localStorage.getItem("sendAccount"));

    const response = await api.post("signup", dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resSignup = document.getElementById("resSignup");

    localStorage.removeItem("sendAccount");
    resSignup.textContent = `a requisição fui bem sucedida ${response.data.message}`;
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};

////////////////////////////////////////LOGIN//////////////////////////////////////////////
const login = async (event) => {
  event.preventDefault();

  try {
    const mail = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const data = {
      mail: mail,
      pass: pass,
    };

    localStorage.setItem("sendLogin", JSON.stringify(data));

    const dataSave = JSON.parse(localStorage.getItem("sendLogin"));

    const response = await api.post("login", dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resLogin = document.getElementById("loginUser");
    resLogin.textContent = `a requisição fui bem sucedida ${response.data.message}`;

    localStorage.removeItem("sendLogin");
    localStorage.setItem("userMail", mail);
    window.location.href = "./recados.html";
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};
////////////////////////////////////////MOSTRAR USUARIOS///////////////////////////////////
const showUsers = async (event) => {
  event.preventDefault();
  try {
    const response = await api.get("users");
    const msg = response.data.data;
    const msgUsers = document.getElementById("showUsers");

    msg.forEach((message) => {
      const msgElement = document.createElement("div");
      msgElement.innerHTML = `<p> ID: ${message.id}</p><p> Name: ${message.name}</p><p> Email: ${message.mail}</p><p> Senha: ${message.pass}</p>`;

      msgUsers.appendChild(msgElement);
    });
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};

////////////////////////////////////////ADICIONAR RECADO////////////////////////////////////////

const addMsg = async (event) => {
  event.preventDefault();

  try {
    const mail = localStorage.getItem("userMail");
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;

    const data = {
      mail: mail,
      title: title,
      description: message,
    };

    localStorage.setItem("sendMessage", JSON.stringify(data));

    const dataSave = JSON.parse(localStorage.getItem("sendMessage"));

    const response = await api.post(`userMessage/${mail}`, dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resMessage = document.getElementById("resMessage");
    resMessage.textContent = `a requisição fui bem sucedida ${response.data.data}`;
    localStorage.removeItem("sendMessage");
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};

////////////////////////////////////////ATUALIZAR RECADO////////////////////////////////////////

const attMsg = async (event) => {
  event.preventDefault();

  try {
    const id = document.getElementById("id").value;
    const title = document.getElementById("newTitle").value;
    const message = document.getElementById("newMessage").value;

    const data = {
      title: title,
      description: message,
    };

    localStorage.setItem("newMessage", JSON.stringify(data));

    const dataSave = JSON.parse(localStorage.getItem("newMessage"));

    const response = await api.put(`userMessage/${id}`, dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resAttMessage = document.getElementById("resAttMessage");
    resAttMessage.textContent = `a requisição fui bem sucedida ${response.data.message}`;
    localStorage.removeItem("newMessage");
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};
////////////////////////////////////////REMOVER RECADO//////////////////////////////////////////

const remMsg = async (event) => {
  event.preventDefault();

  try {
    const id = document.getElementById("idRem").value;

    const data = {
      id: id,
    };

    localStorage.setItem("idRem", JSON.stringify(data));

    const dataSave = JSON.parse(localStorage.getItem("idRem"));

    const response = await api.delete(`userMessage/${id}`, dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resDelMessage = document.getElementById("resDelMessage");
    resDelMessage.textContent = `a requisição fui bem sucedida ${response.data.message}`;
    localStorage.removeItem("idRem");
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};

////////////////////////////////////////MOSTRAR RECADOS/////////////////////////////////////////

const showMsg = async (event) => {
  event.preventDefault();

  try {
    const response = await api.get("userMessage");
    const msg = response.data.data;
    const addMessage = document.getElementById("resAddMessage");

    msg.forEach((message) => {
      const msgElement = document.createElement("div");
      msgElement.innerHTML = `<p> Email: ${message.userMail}</p><p> ID: ${message.id}</p><p> Titulo: ${message.title}</p><p> Mensagem: ${message.description}</p>`;

      addMessage.appendChild(msgElement);
    });
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};

////////////////////////////////////////VERIFICAR LOGIN/////////////////////////////////////////

const verifyLogin = (event) => {
  event.preventDefault();

  try {
    const mail = localStorage.getItem("userMail");
    const addMessage = document.getElementById("userLogged");
    if (mail) {
      addMessage.textContent = `Você esta logado no email ${mail}`;
    } else {
      addMessage.textContent = "Você não esta logado";
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
  }
};
