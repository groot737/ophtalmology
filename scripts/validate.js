document
  .getElementsByTagName("button")[0]
  .addEventListener("click", (event) => {
    event.preventDefault();

    let start = parseInt(document.getElementById("start").value);
    let end = parseInt(document.getElementById("end").value);
    let quantity = parseInt(document.getElementById('quantity').value)
    let isShuffle = document.getElementById('check').checked

    if (isNaN(start) || isNaN(end)) {
      alert("შეიყვანე მონაცემი")
    } else {
      if (start < 1 || start > 1022 || end < 1 || end > 1022) {
        alert("ბილეთები უნდა აარჩიეთ 1-1022 შუალედში");
      } else {
        if((end - start + 1) >= quantity){
          window.location.href = `/quiz?start=${start}&end=${end}&shuffle=${isShuffle}&quantity=${quantity}`;
        } else{
          alert("რაოდენობა აღემატება არჩეულ ბილეთებს")
        }
      }
    }
  });
