async function kakaoSearch() {
  const response = await fetch(`http://127.0.0.1:8080/board`);
  const json = await response.json();
  console.log(json);
}
kakaoSearch();
