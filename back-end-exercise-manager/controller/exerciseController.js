import connection from "../data/db.js";


//index controllers

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



//show controller

function show(req, res) {
    const { id } = req.params;

    const exerciseSql = 'SELECT * FROM exercises WHERE id = ?';
    const categorySql = `SELECT * FROM exercises JOIN categories ON exercises.id = categories.id WHERE categories.id = ? `;
    const typeSql = `SELECT * FROM exercises JOIN types ON exercises.type_id = types.id WHERE types.id = ? `;

    //exercise query
    connection.query(exerciseSql, [id], (exerciseErr, exerciseResult) => {
        if (exerciseErr) {
            return res.status(500).json({
                error: 500,
                message: "Errore nella query exercise"
            });
        }
        if (exerciseResult.length === 0) {
            return res.status(404).json({ error: "Esercizio non trovato" });
        }

        const exercise = exerciseResult[0];

        // category query
        connection.query(categorySql, [id], (categoryErr, categoryResult) => {
            if (categoryErr) {
                return res.status(500).json({
                    error: 500,
                    message: "Errore nella query category"
                });
            }

            // type query
            connection.query(typeSql, [id], (typeErr, typeResult) => {
                if (typeErr) {
                    return res.status(500).json({
                        error: 500,
                        message: "Errore nella query type"
                    });
                }
                res.json({
                    exercise,
                    categories: categoryResult,
                    type: typeResult[0] || null
                });
            });
        });
    });
}



export {
    index,
    indexCategories,
    indexTypes,
    show
} 