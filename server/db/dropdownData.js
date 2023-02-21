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

async function getCoursesNames(conn) {
    const [rows, fields] = await conn.execute(
        `SELECT Course FROM Courses`
    );
    if (rows.length > 0) {
        let courseNames = [];
        rows.forEach(course => { courseNames.push(course.Course) });
        return {
            code: 200,
            resMessage: {
                message: courseNames,
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


async function createCourse(conn, courseName) {
    const [rows, fields] = await conn.execute(
        `INSERT INTO Courses (Course) VALUES ('${courseName}')`
    );
    if (rows.affectedRows > 0) {
        return {
            code: 200,
            resMessage: {
                message: "Course created",
                type: "success"
            }
        };
    } else {
        return {
            code: 400,
            resMessage: {
                message: "Course not created",
                type: "error"
            }
        };
    }
}



module.exports = {
    getUniNames,
    createUniversity,
    getCoursesNames,
    createCourse
};