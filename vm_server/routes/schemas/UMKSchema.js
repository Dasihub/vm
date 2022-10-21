const { sql, poolPromise } = require("../DB.js");
const COOKIE = require("../cookies.js");


class UMKController {

    // Оброботчик запроса для получения данных
    async getData(req, res) {
        try {
            const pool = await poolPromise();
            const queryText = `
                EXEC GetRRNKPermiss @id_a_year=${req.body.year}`
            const result = await pool.query(queryText)
            const resList = await result.recordset
            resList.forEach(element => {
                
                const b = element.begDateStr.split(".").reverse().join("-")
                element.begDate = DCdmy(b)
                const f = element.endDateStr.split(".").reverse().join("-")
                element.endDate = DCdmy(f)
            });
            return res.json({ status: 300, message: `yearList OK`, result: resList });
        }
        catch (err) {
            console.log(err)
            return res.json({ status: 1, message: `Неправильный запрос ${err.message}`, result: false });
        }
    }

}


module.exports = new UMKController();