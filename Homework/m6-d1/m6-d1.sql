SELECT  
	c.first_name customer_first_name, 
	c.last_name customer_last_name, 
	s.first_name staff_first_name, 
	s.last_name staff_last_name,
	SUM(p.amount) total_paid
FROM 
	customer c
INNER JOIN payment p
	ON p.customer_id=c.customer_id
INNER JOIN staff s
	ON p.staff_id=s.staff_id
GROUP BY c.customer_id, s.staff_id, p.payment_id
HAVING SUM(p.amount) > (SELECT AVG(amount) FROM payment)
ORDER BY total_paid DESC