const fs = require("fs");
const QRCode = require("easyqrcodejs-nodejs");
const PDFDocument = require("pdfkit");

async function generate_pdf(
	data,
	participantID,
	email,
	fullname,
	passType,
	qr_code_url
) {
	let title = "";

	if (passType == "Combo" || passType == "Atmos" || passType == "Gold" || passType == "Silver" || passType == "Bronze" ) {
		title += "Pass Type :";
	} else {
		title += "Workshop :"
	}

	// Create a document
	const doc = new PDFDocument({ size: [595, 200] });

	doc.pipe(fs.createWriteStream(`assets/pdfs/${participantID}.pdf`));

	// Fonts of Document.
	doc.registerFont("link", "./assets/fonts/Staatliches-Regular.ttf");
	doc.registerFont("Medium", "./assets/fonts/SpaceGrotesk-Medium.ttf");
	doc.registerFont("Regular", "./assets/fonts/SpaceGrotesk-Regular.ttf");
	doc.registerFont("Bold", "./assets/fonts/SpaceGrotesk-Bold.ttf");
	doc.registerFont("Bold1", "./assets/fonts/AnekLatin-Bold.ttf");

	// Template
	doc.image("./assets/Templates/pass_template.png", 0, 0, {
		width: 595,
		height: 200,
	});

	doc.fontSize(12);

	doc.font("Bold1")
		.fontSize(17)
		.fillColor("white")
		.text(`Welcome To Ananta'23`, 226, 17, {
			width: 569,
			align: "left",
			color: "white",
		});

	// Name
	doc.fontSize(10);
	doc.font("Medium")
		.fillColor("white")
		.text(`Name :`, 226, 52, {
			width: 569.5,
			align: "left",
			color: "white",
		});
	doc.font("Regular").text(fullname, 264, 52, {
		width: 569.5,
		align: "left",
		color: "white",
	});

	// Participant ID
	doc.font("Medium")
		.fillColor("white")
		.text(`Participant ID : `, 226, 77, { width: 569.5, align: "left" });
	doc.font("Regular").text(participantID, 300, 77, {
		width: 569.5,
		align: "left",
	});

	// Email
	doc.font("Medium").text(`Email :`, 226, 64, {
		width: 569.5,
		align: "left",
	});
	doc.font("Regular").text(email, 260, 64, {
		width: 569.5,
		align: "left",
	});

	// Pass Type
	doc.font("Medium").text(title, 226, 89, {
		width: 569.5,
		align: "left",
	});
	doc.font("Regular").text(passType, 282, 89, {
		width: 569.5,
		align: "left",
	});
	
	// Date of Transaction
	doc.font("Medium").text("Date :", 226, 102, {
		width: 569.5,
		align: "left",
	});
	doc.font("Regular").text(data.body.txnDate, 260, 102, {
		width: 569.5,
		align: "left",
	});

	// Contact Link
	doc.fontSize(10)
		.font("Regular")
		.fillColor("#1C7690")
		.text("Contact Us", 537, 144)
		.link(
			524,
			144,
			doc.widthOfString("ANANTAGSFCU.IN"),
			doc.currentLineHeight(),
			"https://anantagsfcu.in/contact-us"
		);

	// Ananta Website Link
	doc.fontSize(10)
		.font("Regular")
		.fillColor("#1C7690")
		.text("Locate Us", 543, 156)

		.link(
			524,
			156,
			doc.widthOfString("ANANTAGSFCU.IN"),
			doc.currentLineHeight(),
			"https://goo.gl/maps/7n3bPjJNzENRBMu5A"
		);

	// Refund Policy Link
	doc.fontSize(10)
		.font("Regular")
		.fillColor("#1C7690")
		.text("Refund Policy", 524, 168)

		.link(
			508,
			168,
			doc.widthOfString("ANANTAGSFCU.IN"),
			doc.currentLineHeight(),
			"https://anantagsfcu.in/refund-policy"
		);

	doc.image(`${qr_code_url}`, 32, 32, { fit: [137, 137], align: "center" });

	doc.end();

	console.log("✔ Pass PDF Generated successfully.");

	console.log();
	return true;
}

async function buyPassMail(
	transporter,
	data,
	participantID,
	email,
	fullname,
	passType
) {
	let options = {
		text: participantID,
		width: 256,
		height: 256,
		colorDark: "#000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
		dotoptions: {
			color: "#012C3D",
			type : "rounded"
		},
		dotScale: 1,
		// logo: "./img/gsfcu_logo.png",
		logoBackgroundTransparent: true,
		logoWidth: 100,
		logoHeight: 100,
		quietZone: 4,
	};

	let qr_code = new QRCode(options);
	let qrURL = await qr_code.toDataURL();

	console.log("✔ QrCode generated successfully.");

	if (
		await generate_pdf(
			data,
			participantID,
			email,
			fullname,
			passType,
			qrURL
		)
	) {

		setTimeout(() => {
			console.log(`➾ Sending mail to ${email} ....`)
			transporter.sendMail(
				{
					from: "20bt04004@gsfcuniversity.ac.in",
					to: email,
					subject: "Payment Confirmation | Ananta'23",
					template: "PassSend",
					context: {
						fullname: fullname,
					},
					attachments: [
						{
							filename: `Events_Entry_Pass_${participantID}.pdf`,
							contentType: "application/pdf",
							path: `assets/pdfs/${participantID}.pdf`,
						},
					],
				},

				//this function is for delete pdf's which generated and sent successfully to participate
				(error, info) => {
					// fs.unlinkSync(`./../assets/pdfs/${participantID}.pdf`);
					// console.log("♻️ Pass PDF is Deleted from the Server...")
					if (info) {
						console.log(`✔ Mail sent to ${email}`);
						return true;
					} else {
						console.log(`✘ Failed to send mail to ${email}`);
						return false;
					}
				}
			);
		}, 5000);
		return true;
	} else {
		console.log("✘ Failed to generated Pass PDF")
	}
}

module.exports = {
	buyPassMail,
};
