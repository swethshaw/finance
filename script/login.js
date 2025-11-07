function show() {
    var x = document.getElementById("Passin");
    var eyeIcon = document.querySelector(".imgb");
    if (x.type === "password") {
        x.type = "text";
        eyeIcon.src = "img/bulbl.png";
        eyeIcon.style.height = '42px';
        // document.getElementById('s').value='Hide';
    }
    else {
        x.type = "password";
        eyeIcon.src = "img/bulbo.png";
        eyeIcon.style.height = '50px';
        // document.getElementById('s').value='Show';
    }
}