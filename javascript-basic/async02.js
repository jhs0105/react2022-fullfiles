function delay() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, 1000);
  });
}

async function getUser() {
  await delay();
  return "jjang";
}

async function getUserPassword() {
  await delay();
  return "1234";
}

async function getInfo() {
  const id = await getUser();
  const pw = await getUserPassword();
  console.log(id, "===", pw);
}

getInfo();
