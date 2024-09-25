const conn = require('../mariadb');

export function query({ callBack, sql, values }) {
  conn.query(sql, values, (err, results) => {
    if (err) return callBack(err);
    callBack(null, results);
  });
}
