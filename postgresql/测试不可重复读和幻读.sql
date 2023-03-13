/*BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  
	show transaction_isolation; 
	SELECT * FROM students;
	SELECT * FROM students WHERE id=1;
	SELECT pg_sleep(10);
	SELECT * FROM students;
	SELECT * FROM students WHERE id=1;
COMMIT;*/


/*幻读*/
/*
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  
	show transaction_isolation; 
	INSERT INTO students(Score) VALUES(99);
	SAVEPOINT s;
	SELECT * FROM students;
COMMIT;
*/

--ROLLBACK;

/*不可重复读*/
BEGIN;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  
	show transaction_isolation; 
	UPDATE students SET score=score+10 WHERE ID=1;
	--SAVEPOINT s;
	SELECT * FROM students WHERE id=1;
COMMIT;