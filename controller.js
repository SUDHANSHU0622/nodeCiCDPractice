export const getFunction = (req, res) => {
    try {
        return res.status(200).json({ msg: "hello" })
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong." })
    }
}

export const postFunction = async (req, res) => {
    try {
        return res.status(200).json(req.body)
    } catch (err) {
        return res.status(500).json({ msg: err })
    }

}

