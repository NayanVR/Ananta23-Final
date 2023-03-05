async function updateCoins(conn, PID, amount, isAdd) {

    const [getCoinRows, getCoinFields] = await conn.execute('SELECT DigitalPoints FROM Participants WHERE ParticipantID = ?', [PID])

    if (getCoinRows.length > 0) {
        const currentCoins = getCoinRows[0].DigitalPoints
        const newCoins = isAdd ? currentCoins + amount : currentCoins - amount

        if (newCoins < 0) {
            return {
                code: 400,
                resMessage: {
                    message: 'Insufficient coins',
                    type: 'error'
                }
            }
        } else {
            const [rows, fields] = await conn.execute('UPDATE Participants SET DigitalPoints = ? WHERE ParticipantID = ?', [newCoins, PID])
            if (rows.affectedRows > 0) {
                return {
                    code: 200,
                    resMessage: {
                        message: 'Coins updated',
                        type: 'success'
                    }
                }
            } else {
                return {
                    code: 400,
                    resMessage: {
                        message: 'Error updating coins',
                        type: 'error'
                    }
                }
            }
        }

    } else {
        return {
            code: 400,
            resMessage: {
                message: 'Participant not found',
                type: 'error'
            }
        }
    }
}

module.exports = {
    updateCoins
}