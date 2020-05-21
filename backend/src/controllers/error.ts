export const get404 = (req, res, next) => {
    res.status(404).end();
};

export const get500 = (req, res, next) => {
    console.log('get500');
    res.status(500).end();
};
