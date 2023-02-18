// get University Names
async function getUniNames(conn) {
	const [rows, fields] = await conn.execute(
		`SELECT University FROM Universities`
	);
	if (rows.length > 0) {
        let uniNames = [];
        rows.forEach(uni => { uniNames.push(uni.University) });
		return {
            code: 200,
            resMessage: {
                message: uniNames,
                type: "success"
            }
        };
	} else {
        return {
            code: 400,
            resMessage: {
                message: [],
                type: "error"
            }
        };
    }
}


async function createUniversity(conn, uniName) {
    const [rows, fields] = await conn.execute(
        `INSERT INTO Universities (University) VALUES ('${uniName}')`
    );
    if (rows.affectedRows > 0) {
        return {
            code: 200,
            resMessage: {
                message: "University created",
                type: "success"
            }
        };
    } else {
        return {
            code: 400,
            resMessage: {
                message: "University not created",
                type: "error"
            }
        };
    }
}


module.exports = { 
    getUniNames,
    createUniversity
};