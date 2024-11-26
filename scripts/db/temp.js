const sqlStr = `SELECT
user.id, user.user_name, user.nickname, user.age,
order.price, order.amount,
log.*
FROM user
INNER JOIN order ON user.id = order.user_id
LEFT JOIN log ON user.id = log.user_id
WHERE user.age > 20
AND order.price >= 20;`