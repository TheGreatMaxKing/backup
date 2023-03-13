/*更新丢失*/
/*BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  
	show transaction_isolation; 
	UPDATE students SET score=score+10 WHERE ID=1;
COMMIT;*/


BEGIN;
	SET TRANSACTION ISOLATION LEVEL SERIALIZABLE  ;  
	show transaction_isolation; 
	SELECT * FROM students WHERE id=1;
	UPDATE students SET score=score+30 WHERE ID=1;
	SELECT pg_sleep(10);
	SAVEPOINT s;
	SELECT * FROM students WHERE id=1;
COMMIT;

SELECT * FROM students WHERE id=1;