function main() {
	const generateBtn = document.getElementById("generateBtn");
	const dataBox = document.getElementById("dataBox");
	const downloadBtn = document.getElementById("downloadBtn");
	const qrcode = document.getElementById("qrcode");
	const qrdiv = document.getElementById("qrdiv");
	const descInput = document.getElementById("dataLabel")
	const desc = document.getElementById("desc");
	const inputGroup = document.getElementById("inputLabel")
	const border = document.getElementById("border")
	const logo_qr = document.getElementById("logo_qr");


	const errorClassName = "error";
	const shakeClassName = "shake";
	const dataBoxClassName = "dataBox";
	const toHideClassName = "hide";
	const qrdivClassName = "qrdiv";

	var QR_CODE = new QRCode("qrcode", {
		width: 260,
		height: 260,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
	});

	descInput.addEventListener("keyup", () => {
		desc.innerText = descInput.value
	})
	logo_qr.addEventListener("click", () => {
		if (!logo_qr.checked) {
			document.getElementsByClassName("QRlogo")[0].style.display = "none"
		} else {
			document.getElementsByClassName("QRlogo")[0].style.display = "flex"
		}
	})

	border.addEventListener("click", () => {
		if (logo_qr.checked) {
			if (!border.checked) {
				qrcode.querySelectorAll("img")[1].style.border = "none"
			} else {
				qrcode.querySelectorAll("img")[1].style.border = "solid"
				qrcode.querySelectorAll("img")[1].style.borderColor = "#008242"
				qrcode.querySelectorAll("img")[1].style.borderWidth = " 10px;"
			}
		} else {

			if (!border.checked) {
				qrcode.querySelectorAll("img")[1].style.border = "none"
			} else {
				qrcode.querySelectorAll("img")[1].style.border = "solid"
				qrcode.querySelectorAll("img")[1].style.borderColor = "#008242"
				qrcode.querySelectorAll("img")[1].style.borderWidth = "10px"
			}
		}


	})

	generateBtn.onclick = function (e) {
		const data = dataBox.value;
		if (data) {
			generateQRCode(data);
			const canvas = document.querySelector("canvas")
			console.log(canvas)
			let QRlogo = document.createElement("img")
			QRlogo.src = "./assets/Logo_Treetech.png.png"
			QRlogo.classList.add("QRlogo")
			//qrcode.appendChild(QRlogo)

			if (inputGroup.classList.contains("hide")) {
				inputGroup.classList.remove("hide")
			}


		} else {
			markDataBoxError();
		}
	};

	dataBox.onfocus = function (e) {
		const classList = dataBox.classList;

		if (classList.contains(errorClassName)) {
			// Removing error class
			dataBox.className = dataBoxClassName;
		}
	};

	downloadBtn.onclick = function (e) {
		html2canvas(qrcode).then((canvas) => {
			//document.getElementsByClassName("QRlogo")[0].style.boxShadow = "none"
			const base64 = canvas.toDataURL("image/png", 1)
			let link = document.createElement("a");
			link.href = base64;
			link.download = "code.png";
			link.click()
			link.remove();
		})
	};

	function markDataBoxError() {
		const prevClassName = dataBox.className;
		dataBox.setAttribute('placeholder', 'Preencha este campo')
		dataBox.className =
			prevClassName + " " + errorClassName + " " + shakeClassName;
		vibrate();
		setTimeout(() => {
			// Reset class
			dataBox.className = prevClassName + " " + errorClassName;
		}, 500);
	}

	function generateQRCode(data) {
		QR_CODE.clear();
		QR_CODE.makeCode(data);
		// Show QRCode div
		qrdiv.className = qrdivClassName;
	}

	function vibrate() {
		if (Boolean(window.navigator.vibrate)) {
			window.navigator.vibrate([100, 100, 100]);
		}
	}

}

main();