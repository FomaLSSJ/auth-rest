class Handler {
    static index(req, res) {
        return res.json({ success: true });
    }
}

module.exports = Handler;