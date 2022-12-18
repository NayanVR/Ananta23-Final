function genParticipantID(email) {
    let emailName = email.split("@")[0];

    let firstChar = emailName[0];
    let middleChar = emailName[Math.floor(emailName.length / 2)];
    let lastChar = emailName[emailName.length - 1];

    let speacialChars = ["!", "@", "#", "$", "%", "&", "*", "?"];
    let randomSpeacialChar = speacialChars[Math.floor(Math.random() * speacialChars.length)];


    let randomNum = Math.floor(Math.random() * 10000);

    const id = "A23_" + firstChar + middleChar + lastChar + randomSpeacialChar + randomNum;
    return id;
}

module.exports = {
    genParticipantID
}