// main.js

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

function openChatScreen() {
  if (isLoggedIn()) {
    displayChatScreen();
  } else {
    openRegisterScreen();
  }
}

function openSettingsScreen() {
  if (isLoggedIn()) {
    // 設定画面を開く処理
  } else {
    openRegisterScreen();
  }
}

function openRegisterScreen() {
  document.getElementById('home-screen').style.display = 'none';
  document.getElementById('chat-screen').style.display = 'none';
  document.getElementById('register-screen').style.display = 'block';
}

function checkLoginStatus() {
  const user = getUserFromStorage();
  if (user) {
    // ログイン状態ならばホーム画面を表示
    displayHomeScreen(user.username);
  } else {
    // ログインされていないならばアカウント登録画面を表示
    openRegisterScreen();
  }
}

function displayHomeScreen(username) {
  document.getElementById('home-screen').style.display = 'block';
  document.getElementById('chat-screen').style.display = 'none';
  document.getElementById('register-screen').style.display = 'none';

  // ログインユーザーの情報を表示
  document.getElementById('welcome-message').textContent = `ようこそ、${username}さん！`;
}

function isLoggedIn() {
  return !!getUserFromStorage();
}

function getUserFromStorage() {
  const storedUser = localStorage.getItem('chatAppUser');
  return storedUser ? JSON.parse(storedUser) : null;
}

function registerUser() {
  const usernameInput = document.getElementById('username-input');
  const avatarInput = document.getElementById('avatar-input');

  const newUser = {
    username: usernameInput.value,
    avatarURL: avatarInput.value
  };

  // ユーザー情報をlocalStorageに保存
  localStorage.setItem('chatAppUser', JSON.stringify(newUser));

  // ユーザー登録後、ログイン状態を確認してホーム画面を表示
  checkLoginStatus();
}
