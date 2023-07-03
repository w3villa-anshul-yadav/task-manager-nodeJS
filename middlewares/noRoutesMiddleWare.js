module.exports = (req, res) => {
    res.status(404);
    throw new Error("No Routes matches");
};
