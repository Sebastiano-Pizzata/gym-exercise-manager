import connection from "../data/db.js";

function index(req, res) {
    const sql = "SELECT * FROM exercises";

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                err: 500,
                message: "Error query index"
            })
        }
        res.json(results)
    })
}


function indexCategories(req, res) {
    const sql = "SELECT * FROM categories";

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                err: 500,
                message: "Error query index"
            })
        }
        res.json(results)
    })
}



function indexTypes(req, res) {
    const sql = "SELECT * FROM types";

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                err: 500,
                message: "Error query index"
            })
        }
        res.json(results)
    })
}



export {
    index,
    indexCategories,
    indexTypes
} 