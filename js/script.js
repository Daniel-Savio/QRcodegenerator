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

	descInput.addEventListener("keyup",()=>{
		desc.innerText = descInput.value
	})
	border.addEventListener("click", ()=>{
		if(!border.checked){
			qrcode.querySelector("img").style.border = "none"
		}else{
			qrcode.querySelector("img").style.border = "solid"
			qrcode.querySelector("img").style.borderColor = "#008242"
			qrcode.querySelector("img").style.borderWidth = "5px"
		}
	
	})

	generateBtn.onclick = function (e) {
		const data = dataBox.value;
		if (data) {
			generateQRCode(data);
			if(inputGroup.classList.contains("hide")){
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
		html2canvas(qrcode).then((canvas)=>{
			const base64 = canvas.toDataURL("image/png",1)
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