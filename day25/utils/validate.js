export const validate = (req, res) => {
  const err = validationResult(req);

  if (err) {
    return res.status(400).json(err.array());
  } else {
    return next();
  }
};
