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
        const exercises = results.map(r => {
            return {
                ...r,
                image: req.imagePath + r.image
            }
        })
        res.json(exercises)
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
    const categorySql = 'SELECT * FROM categories WHERE id = ?';
    const typeSql = 'SELECT * FROM types WHERE id = ?';

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
        exercise.image = req.imagePath + exercise.image;

        const categoryId = exercise.category_id;
        const typeId = exercise.type_id;

        connection.query(categorySql, [categoryId], (categoryErr, categoryResult) => {
            if (categoryErr) {
                return res.status(500).json({
                    error: 500,
                    message: "Errore nella query category"
                });
            }

            connection.query(typeSql, [typeId], (typeErr, typeResult) => {
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



function related(req, res) {
    const categoryId = req.query.category_id;
    const currentId = req.query.id;

    if (!categoryId || !currentId) {
        return res.status(400).json({ error: "category_id o id esercizio mancante" })
    }

    const sql = `SELECT *
    FROM exercises
    WHERE category_id = ? AND id = ?
    ORDER BY RAND()
    LIMIT 4`;

    connection.query(sql, [categoryId, currentId], (err, response) => {
        if (err) {
            console.error("Errore query related:", err)
            return res.status(500).json({ error: "Error server related" })
        }
        if (response.length === 0) {
            return res.status(404).json({ error: "Related not found" });
        }
        const totalRes = response.map((i) => {
            return {
                ...i,
                image: req.imagePath + r.image
            }
        })

        return (totalRes)
    })
}




export {
    index,
    indexCategories,
    indexTypes,
    show,
    related
} 