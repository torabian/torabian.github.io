SELECT u.id AS user_id,
    u.name AS user_name,
    field(u.email, 'string') AS user_email,
    o.id AS order_id,
    o.total AS order_total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
where filter() and restriction()