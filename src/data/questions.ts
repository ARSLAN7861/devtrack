import type { MCQQuestion, WrittenQuestion } from '../store/types'

// ─── EXAM 1 ─────────────────────────────────────────────────────────────────
export const exam1MCQ: MCQQuestion[] = [
  {
    id: 'e1m1', examCycle: 1, skill: 'sql',
    question: 'Which SQL clause filters rows BEFORE aggregation?',
    options: { a: 'HAVING', b: 'WHERE', c: 'GROUP BY', d: 'ORDER BY' },
    correct: 'b',
    explanation: 'WHERE filters individual rows before any grouping. HAVING filters groups after GROUP BY.',
  },
  {
    id: 'e1m2', examCycle: 1, skill: 'sql',
    question: 'What does SELECT * FROM orders WHERE customer_id IS NULL return?',
    options: { a: 'All orders', b: 'Orders with no customer assigned', c: 'An error', d: 'Zero rows always' },
    correct: 'b',
    explanation: 'IS NULL matches rows where the column has no value (NULL).',
  },
  {
    id: 'e1m3', examCycle: 1, skill: 'sql',
    question: 'Which data type should you use to store a price like 19.99 in PostgreSQL?',
    options: { a: 'FLOAT', b: 'INTEGER', c: 'NUMERIC(10,2)', d: 'TEXT' },
    correct: 'c',
    explanation: 'NUMERIC(10,2) stores exact decimal values. FLOAT has rounding issues for currency.',
  },
  {
    id: 'e1m4', examCycle: 1, skill: 'sql',
    question: 'What is the result of COALESCE(NULL, NULL, 5, 10)?',
    options: { a: 'NULL', b: '5', c: '10', d: '15' },
    correct: 'b',
    explanation: 'COALESCE returns the first non-NULL value in its argument list.',
  },
  {
    id: 'e1m5', examCycle: 1, skill: 'sql',
    question: 'Which ORDER BY clause sorts names alphabetically in reverse?',
    options: { a: 'ORDER BY name ASC', b: 'ORDER BY name DESC', c: 'ORDER BY name REVERSE', d: 'ORDER BY name -1' },
    correct: 'b',
    explanation: 'DESC sorts in descending order — Z to A for text, largest to smallest for numbers.',
  },
  {
    id: 'e1m6', examCycle: 1, skill: 'sql',
    question: 'What does LIMIT 5 OFFSET 10 return?',
    options: { a: 'Rows 1-5', b: 'Rows 6-10', c: 'Rows 11-15', d: 'Rows 10-15' },
    correct: 'c',
    explanation: 'OFFSET 10 skips the first 10 rows, then LIMIT 5 returns the next 5 (rows 11-15).',
  },
  {
    id: 'e1m7', examCycle: 1, skill: 'sql',
    question: 'Which function returns the current date and time in PostgreSQL?',
    options: { a: 'GETDATE()', b: 'NOW()', c: 'TODAY()', d: 'CURRENT()' },
    correct: 'b',
    explanation: 'NOW() returns the current timestamp. GETDATE() is SQL Server syntax.',
  },
  {
    id: 'e1m8', examCycle: 1, skill: 'linux',
    question: 'What does chmod 755 myfile.sh set?',
    options: {
      a: 'Owner: rwx, Group: r-x, Others: r-x',
      b: 'Owner: rwx, Group: rwx, Others: r-x',
      c: 'Owner: r-x, Group: r-x, Others: r-x',
      d: 'Owner: rwx, Group: r-x, Others: ---',
    },
    correct: 'a',
    explanation: '7=rwx, 5=r-x, 5=r-x. First digit is owner, second is group, third is others.',
  },
  {
    id: 'e1m9', examCycle: 1, skill: 'linux',
    question: 'Which directory stores system-wide configuration files in Linux?',
    options: { a: '/var', b: '/usr', c: '/etc', d: '/opt' },
    correct: 'c',
    explanation: '/etc contains system configuration files. /var has variable data, /usr has user programs.',
  },
  {
    id: 'e1m10', examCycle: 1, skill: 'linux',
    question: 'What command creates a new directory called "projects"?',
    options: { a: 'touch projects', b: 'mk projects', c: 'mkdir projects', d: 'create projects' },
    correct: 'c',
    explanation: 'mkdir (make directory) creates directories. touch creates empty files.',
  },
  {
    id: 'e1m11', examCycle: 1, skill: 'linux',
    question: 'What does ls -la show that ls -l does not?',
    options: { a: 'File sizes', b: 'Hidden files (dotfiles)', c: 'File permissions', d: 'Inode numbers' },
    correct: 'b',
    explanation: '-a includes hidden files (those starting with .). -l gives long format for both.',
  },
  {
    id: 'e1m12', examCycle: 1, skill: 'linux',
    question: 'Which command shows who owns /etc/passwd?',
    options: { a: 'chmod /etc/passwd', b: 'ls -l /etc/passwd', c: 'cat /etc/passwd', d: 'file /etc/passwd' },
    correct: 'b',
    explanation: 'ls -l shows the long format including owner, group, permissions, and size.',
  },
  {
    id: 'e1m13', examCycle: 1, skill: 'linux',
    question: 'What does sudo mean?',
    options: { a: 'Switch user do', b: 'Super user do', c: 'System user do', d: 'Secure user do' },
    correct: 'b',
    explanation: 'sudo (superuser do) runs commands with root privileges.',
  },
  {
    id: 'e1m14', examCycle: 1, skill: 'linux',
    question: 'Which command copies a file named report.txt to /tmp/?',
    options: { a: 'mv report.txt /tmp/', b: 'cp report.txt /tmp/', c: 'ln report.txt /tmp/', d: 'dd report.txt /tmp/' },
    correct: 'b',
    explanation: 'cp copies files. mv moves (renames) them. ln creates links.',
  },
  {
    id: 'e1m15', examCycle: 1, skill: 'k8s',
    question: 'What is the main difference between a container and a virtual machine?',
    options: {
      a: 'Containers have their own kernel; VMs share the host kernel',
      b: 'Containers share the host kernel; VMs have their own kernel',
      c: 'Containers are slower than VMs',
      d: 'Containers require more disk space than VMs',
    },
    correct: 'b',
    explanation: 'Containers share the host OS kernel, making them lightweight. VMs run a full OS with their own kernel.',
  },
  {
    id: 'e1m16', examCycle: 1, skill: 'k8s',
    question: 'Which command runs a Docker container from the "nginx" image?',
    options: { a: 'docker start nginx', b: 'docker run nginx', c: 'docker exec nginx', d: 'docker pull nginx' },
    correct: 'b',
    explanation: 'docker run downloads the image if needed and starts a container. docker pull only downloads.',
  },
  {
    id: 'e1m17', examCycle: 1, skill: 'k8s',
    question: 'What is the purpose of the EXPOSE instruction in a Dockerfile?',
    options: {
      a: 'It makes the port accessible from the host automatically',
      b: 'It documents which port the container listens on',
      c: 'It opens a firewall rule',
      d: 'It maps container port to host port',
    },
    correct: 'b',
    explanation: 'EXPOSE is documentation only. You still need -p host:container when running to actually publish ports.',
  },
  {
    id: 'e1m18', examCycle: 1, skill: 'k8s',
    question: 'What does docker ps show?',
    options: { a: 'All images on the system', b: 'Running containers only', c: 'Stopped containers only', d: 'Container logs' },
    correct: 'b',
    explanation: 'docker ps shows running containers. docker ps -a shows all containers including stopped ones.',
  },
  {
    id: 'e1m19', examCycle: 1, skill: 'k8s',
    question: 'Which Dockerfile instruction sets the working directory for subsequent instructions?',
    options: { a: 'RUN cd /app', b: 'ENV DIR=/app', c: 'WORKDIR /app', d: 'CD /app' },
    correct: 'c',
    explanation: 'WORKDIR sets the working directory. RUN cd only affects that single RUN instruction.',
  },
  {
    id: 'e1m20', examCycle: 1, skill: 'mixed',
    question: 'Which command finds all .log files in /var and its subdirectories?',
    options: { a: 'ls /var/*.log', b: 'grep .log /var', c: 'find /var -name "*.log"', d: 'locate *.log /var' },
    correct: 'c',
    explanation: 'find with -name searches recursively. ls only looks in one directory.',
  },
]

export const exam1Written: WrittenQuestion[] = [
  {
    id: 'e1b1', examCycle: 1, skill: 'sql', section: 'B', marks: 5,
    prompt: 'Explain the difference between WHERE and HAVING. Give an example query that uses both.',
    gradingRubric: 'WHERE filters rows before grouping (2pts). HAVING filters groups after GROUP BY (2pts). Valid example query using both (1pt).',
  },
  {
    id: 'e1b2', examCycle: 1, skill: 'sql', section: 'B', marks: 5,
    prompt: 'What is NULL in SQL and why is NULL != NULL? How do you correctly check for NULL values?',
    gradingRubric: 'NULL represents unknown/missing (2pts). NULL != NULL because unknown != unknown (1pt). Use IS NULL / IS NOT NULL (2pts).',
  },
  {
    id: 'e1b3', examCycle: 1, skill: 'linux', section: 'B', marks: 5,
    prompt: 'Explain the Linux permission system. What does -rwxr-xr-- mean for a file?',
    gradingRubric: 'Three groups: owner/group/others (1pt). r=read, w=write, x=execute (1pt). Correct interpretation of -rwxr-xr-- (3pts: owner rwx, group r-x, others r--).',
  },
  {
    id: 'e1b4', examCycle: 1, skill: 'linux', section: 'B', marks: 5,
    prompt: 'What is the difference between a process and a thread? Name 3 commands to view running processes.',
    gradingRubric: 'Process has own memory space, threads share (2pts). Any 3 of: ps, top, htop, pgrep, pstree (3pts).',
  },
  {
    id: 'e1b5', examCycle: 1, skill: 'k8s', section: 'B', marks: 5,
    prompt: 'What is Docker image layering and why does it matter for build performance?',
    gradingRubric: 'Each instruction creates a layer (2pts). Layers are cached (2pts). Put frequently changing layers last to maximize cache hits (1pt).',
  },
  {
    id: 'e1c1', examCycle: 1, skill: 'sql', section: 'C', marks: 5,
    prompt: 'Find the bug in this query and explain what is wrong:',
    codeSnippet: `SELECT department, AVG(salary)
FROM employees
WHERE AVG(salary) > 50000
GROUP BY department;`,
    gradingRubric: 'Bug: WHERE cannot use aggregate functions (2pts). Fix: replace WHERE with HAVING (2pts). Correct fixed query (1pt).',
  },
  {
    id: 'e1c2', examCycle: 1, skill: 'sql', section: 'C', marks: 5,
    prompt: 'Find the bug in this query:',
    codeSnippet: `SELECT name, salary
FROM employees
ORDER BY 3;`,
    gradingRubric: 'Bug: ORDER BY 3 references column position 3, but only 2 columns in SELECT (2pts). Fix: ORDER BY salary or ORDER BY 2 (3pts).',
  },
  {
    id: 'e1c3', examCycle: 1, skill: 'linux', section: 'C', marks: 5,
    prompt: 'What is wrong with this chmod command?',
    codeSnippet: `chmod 888 deploy.sh`,
    gradingRubric: 'Bug: 8 is not a valid octal digit (octal is 0-7) (3pts). Fix: Use valid octal like 755 or 777 (2pts).',
  },
  {
    id: 'e1c4', examCycle: 1, skill: 'linux', section: 'C', marks: 5,
    prompt: 'What is wrong with this command?',
    codeSnippet: `grep -r "error" /var/log > errors.txt 2> errors.txt`,
    gradingRubric: 'Bug: redirecting both stdout and stderr to same file with separate redirects causes file truncation race (3pts). Fix: use &> errors.txt or 2>&1 (2pts).',
  },
  {
    id: 'e1c5', examCycle: 1, skill: 'k8s', section: 'C', marks: 5,
    prompt: 'What is wrong with this Dockerfile?',
    codeSnippet: `FROM ubuntu:22.04
COPY . /app
RUN apt-get update
RUN apt-get install -y python3
WORKDIR /app
CMD ["python3", "app.py"]`,
    gradingRubric: 'COPY before apt-get wastes cache (1pt). RUN apt-get update and install should be in one RUN command (2pts). WORKDIR should come before COPY (1pt). Missing apt-get clean (1pt).',
  },
  {
    id: 'e1d1', examCycle: 1, skill: 'sql', section: 'D', marks: 10,
    prompt: 'Write a SQL query that finds all customers who have placed more than 3 orders, along with their total order count and total amount spent. Sort by total spent descending. Assume tables: customers(id, name, email) and orders(id, customer_id, amount, created_at).',
    gradingRubric: 'JOIN customers and orders (2pts). GROUP BY customer (2pts). COUNT > 3 using HAVING (2pts). SUM(amount) calculated (2pts). Correct ORDER BY (2pts).',
  },
  {
    id: 'e1d2', examCycle: 1, skill: 'linux', section: 'D', marks: 10,
    prompt: 'Write a bash command (one line using pipes) that: reads /var/log/auth.log, finds all lines containing "Failed password", extracts the IP addresses, counts occurrences of each IP, and shows the top 5 most frequent attackers.',
    gradingRubric: 'grep for "Failed password" (2pts). grep -oE for IP extraction (2pts). sort (2pts). uniq -c (2pts). sort -rn | head -5 (2pts).',
  },
  {
    id: 'e1e1', examCycle: 1, skill: 'mixed', section: 'E', marks: 10,
    prompt: 'You need to find which files in /var/log are owned by a specific user named "www-data" and are larger than 100MB. Walk through exactly how you would do this, including the specific commands you\'d run and what output to expect.',
    gradingRubric: 'Uses find command (3pts). -user www-data flag (2pts). -size +100M flag (2pts). Interprets output correctly (2pts). Mentions ls -lh for human-readable sizes (1pt).',
  },
]

// ─── EXAM 2 ─────────────────────────────────────────────────────────────────
export const exam2MCQ: MCQQuestion[] = [
  {
    id: 'e2m1', examCycle: 2, skill: 'sql',
    question: 'Which JOIN type returns ALL rows from the left table, with NULLs for non-matching right table columns?',
    options: { a: 'INNER JOIN', b: 'RIGHT JOIN', c: 'LEFT JOIN', d: 'CROSS JOIN' },
    correct: 'c',
    explanation: 'LEFT JOIN preserves all rows from the left table. Non-matching rows from the right get NULLs.',
  },
  {
    id: 'e2m2', examCycle: 2, skill: 'sql',
    question: 'What does COUNT(*) count?',
    options: { a: 'Non-NULL values only', b: 'All rows including NULLs', c: 'Distinct values only', d: 'Numeric columns only' },
    correct: 'b',
    explanation: 'COUNT(*) counts all rows. COUNT(column) counts non-NULL values in that column.',
  },
  {
    id: 'e2m3', examCycle: 2, skill: 'sql',
    question: 'You want to find departments with more than 10 employees. Which query is correct?',
    options: {
      a: 'SELECT dept FROM emp WHERE COUNT(*) > 10',
      b: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept WHERE COUNT(*) > 10',
      c: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 10',
      d: 'SELECT dept FROM emp HAVING COUNT(*) > 10',
    },
    correct: 'c',
    explanation: 'HAVING filters after GROUP BY. WHERE cannot reference aggregates.',
  },
  {
    id: 'e2m4', examCycle: 2, skill: 'sql',
    question: 'What is a self-join used for?',
    options: {
      a: 'Joining a table to a copy of itself to compare rows',
      b: 'Joining two tables with the same schema',
      c: 'Joining without ON clause',
      d: 'Joining tables from different databases',
    },
    correct: 'a',
    explanation: 'A self-join queries a table against itself using aliases, e.g., to find employees and their managers in the same table.',
  },
  {
    id: 'e2m5', examCycle: 2, skill: 'sql',
    question: 'What does a FULL OUTER JOIN return that a LEFT JOIN does not?',
    options: {
      a: 'Rows from the left table with no match',
      b: 'Rows from the right table with no match',
      c: 'Duplicate rows',
      d: 'Only matching rows',
    },
    correct: 'b',
    explanation: 'FULL OUTER JOIN returns all rows from both tables. LEFT JOIN only adds non-matching rows from the left.',
  },
  {
    id: 'e2m6', examCycle: 2, skill: 'sql',
    question: 'Which aggregate function returns the middle value in a sorted set?',
    options: { a: 'AVG()', b: 'MID()', c: 'MEDIAN()', d: 'PERCENTILE_CONT(0.5)' },
    correct: 'd',
    explanation: 'PostgreSQL uses PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY col) for median. There is no MEDIAN() function.',
  },
  {
    id: 'e2m7', examCycle: 2, skill: 'sql',
    question: 'When would you use EXISTS instead of IN for a subquery?',
    options: {
      a: 'EXISTS is always faster',
      b: 'EXISTS is better with correlated subqueries and large result sets',
      c: 'EXISTS only works with scalar subqueries',
      d: 'IN and EXISTS are always interchangeable',
    },
    correct: 'b',
    explanation: 'EXISTS short-circuits after finding the first match, making it efficient for correlated subqueries over large sets.',
  },
  {
    id: 'e2m8', examCycle: 2, skill: 'linux',
    question: 'What signal does kill -9 send?',
    options: { a: 'SIGTERM', b: 'SIGHUP', c: 'SIGKILL', d: 'SIGSTOP' },
    correct: 'c',
    explanation: 'kill -9 sends SIGKILL, which cannot be caught or ignored. kill without -9 sends SIGTERM (graceful shutdown).',
  },
  {
    id: 'e2m9', examCycle: 2, skill: 'linux',
    question: 'A process shows state "Z" in ps output. What does this mean?',
    options: { a: 'Sleeping', b: 'Running', c: 'Zombie — exited but not reaped by parent', d: 'Stopped by signal' },
    correct: 'c',
    explanation: 'A zombie process has finished but its parent hasn\'t called wait() to collect the exit status.',
  },
  {
    id: 'e2m10', examCycle: 2, skill: 'linux',
    question: 'What does grep -v "error" /var/log/app.log do?',
    options: {
      a: 'Finds lines containing "error"',
      b: 'Finds lines NOT containing "error"',
      c: 'Counts lines containing "error"',
      d: 'Shows verbose output',
    },
    correct: 'b',
    explanation: '-v (invert) shows lines that do NOT match the pattern.',
  },
  {
    id: 'e2m11', examCycle: 2, skill: 'linux',
    question: 'What does the awk command awk \'{print $2}\' do?',
    options: {
      a: 'Prints the second character of each line',
      b: 'Prints the second field (column) of each line',
      c: 'Prints the second line',
      d: 'Prints lines with 2 fields',
    },
    correct: 'b',
    explanation: 'In awk, $1, $2, $NF refer to fields (separated by whitespace by default).',
  },
  {
    id: 'e2m12', examCycle: 2, skill: 'linux',
    question: 'Which sed command replaces ALL occurrences of "foo" with "bar" in a line?',
    options: { a: 's/foo/bar/', b: 's/foo/bar/g', c: 'r/foo/bar/', d: 'g/foo/bar/' },
    correct: 'b',
    explanation: 'The g flag makes substitution global (all occurrences). Without g, only the first match is replaced.',
  },
  {
    id: 'e2m13', examCycle: 2, skill: 'k8s',
    question: 'What is the purpose of a Docker bridge network?',
    options: {
      a: 'Allows containers to communicate with each other on the same host',
      b: 'Connects the container directly to the host network',
      c: 'Provides no network access to the container',
      d: 'Connects containers across multiple hosts',
    },
    correct: 'a',
    explanation: 'Bridge is the default Docker network. Containers on the same bridge can communicate by name.',
  },
  {
    id: 'e2m14', examCycle: 2, skill: 'k8s',
    question: 'What does docker-compose up -d do?',
    options: {
      a: 'Stops all services',
      b: 'Starts all services in the foreground',
      c: 'Starts all services in detached (background) mode',
      d: 'Rebuilds all images',
    },
    correct: 'c',
    explanation: '-d means detached mode — containers run in the background and you get your terminal back.',
  },
  {
    id: 'e2m15', examCycle: 2, skill: 'k8s',
    question: 'In docker-compose.yml, what does "depends_on" configure?',
    options: {
      a: 'CPU and memory limits',
      b: 'Service startup order',
      c: 'Environment variable inheritance',
      d: 'Port mappings',
    },
    correct: 'b',
    explanation: 'depends_on controls start order but does NOT wait for services to be ready — use healthchecks for that.',
  },
  {
    id: 'e2m16', examCycle: 2, skill: 'k8s',
    question: 'Which command shows logs from a running container named "webserver"?',
    options: { a: 'docker inspect webserver', b: 'docker logs webserver', c: 'docker exec webserver logs', d: 'docker ps webserver' },
    correct: 'b',
    explanation: 'docker logs <container> shows stdout/stderr from the container.',
  },
  {
    id: 'e2m17', examCycle: 2, skill: 'k8s',
    question: 'What is the difference between CMD and ENTRYPOINT in a Dockerfile?',
    options: {
      a: 'CMD runs at build time, ENTRYPOINT runs at runtime',
      b: 'ENTRYPOINT is the main executable; CMD provides default arguments that can be overridden',
      c: 'They are identical',
      d: 'CMD cannot be overridden but ENTRYPOINT can',
    },
    correct: 'b',
    explanation: 'ENTRYPOINT sets the executable. CMD sets default args to ENTRYPOINT. CMD args are overridden by docker run arguments.',
  },
  {
    id: 'e2m18', examCycle: 2, skill: 'mixed',
    question: 'What does the pipe operator (|) do in Linux?',
    options: {
      a: 'Redirects output to a file',
      b: 'Sends the stdout of one command as stdin to the next',
      c: 'Runs commands in parallel',
      d: 'Appends output to a file',
    },
    correct: 'b',
    explanation: 'The pipe sends stdout of the left command as stdin to the right command.',
  },
  {
    id: 'e2m19', examCycle: 2, skill: 'sql',
    question: 'What is the maximum number of joins in a single SQL query?',
    options: { a: '5', b: '10', c: '32', d: 'No fixed limit — depends on the database' },
    correct: 'd',
    explanation: 'SQL has no fixed join limit. Performance degrades with many joins, but there is no hard syntax limit.',
  },
  {
    id: 'e2m20', examCycle: 2, skill: 'linux',
    question: 'What does "2>&1" mean in bash?',
    options: {
      a: 'Run with elevated privileges',
      b: 'Redirect stderr to stdout',
      c: 'Redirect stdout to stderr',
      d: 'Run in background',
    },
    correct: 'b',
    explanation: '2 is stderr file descriptor, 1 is stdout. 2>&1 means "send stderr to wherever stdout goes".',
  },
]

export const exam2Written: WrittenQuestion[] = [
  {
    id: 'e2b1', examCycle: 2, skill: 'sql', section: 'B', marks: 5,
    prompt: 'Explain what a correlated subquery is and when you would use one versus a JOIN.',
    gradingRubric: 'Correlated subquery references outer query (2pts). Runs once per row of outer query (1pt). Use when you need per-row context like "for each employee, find their dept avg" (2pts).',
  },
  {
    id: 'e2b2', examCycle: 2, skill: 'sql', section: 'B', marks: 5,
    prompt: 'Write a query to find the second highest salary from an employees table.',
    gradingRubric: 'Uses subquery or window function (2pts). Correct logic for second highest (2pts). Handles ties correctly (1pt). Sample: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)',
  },
  {
    id: 'e2b3', examCycle: 2, skill: 'linux', section: 'B', marks: 5,
    prompt: 'Explain the difference between a hard link and a symbolic link (symlink). When would you use each?',
    gradingRubric: 'Hard link: same inode, works only on same filesystem (2pts). Symlink: pointer to path, can cross filesystems (2pts). Use symlink for cross-filesystem or when you need to link to directories (1pt).',
  },
  {
    id: 'e2b4', examCycle: 2, skill: 'linux', section: 'B', marks: 5,
    prompt: 'What is a zombie process and how do you handle one? Can you kill a zombie process with kill -9?',
    gradingRubric: 'Zombie: child that exited but parent hasn\'t wait()ed (2pts). Kill -9 does NOT work (1pt). Fix: kill parent process or fix parent to call wait() (2pts).',
  },
  {
    id: 'e2b5', examCycle: 2, skill: 'k8s', section: 'B', marks: 5,
    prompt: 'Your Docker container exits immediately after starting. What are the most common causes and how would you debug it?',
    gradingRubric: 'Check docker logs <container> (2pts). Common causes: CMD not found, process exits immediately, missing env vars (2pts). Run with docker run -it to inspect interactively (1pt).',
  },
  {
    id: 'e2c1', examCycle: 2, skill: 'sql', section: 'C', marks: 5,
    prompt: 'Find the bug in this JOIN query:',
    codeSnippet: `SELECT o.id, c.name, o.amount
FROM orders o
JOIN customers c ON o.id = c.id
WHERE o.status = 'paid';`,
    gradingRubric: 'Bug: JOIN condition uses o.id = c.id but should be o.customer_id = c.id (3pts). This creates a cartesian product matching order IDs to customer IDs (2pts).',
  },
  {
    id: 'e2c2', examCycle: 2, skill: 'sql', section: 'C', marks: 5,
    prompt: 'Find the bugs in this aggregation query:',
    codeSnippet: `SELECT name, department, COUNT(*), SUM(salary)
FROM employees
GROUP BY department;`,
    gradingRubric: 'Bug: "name" in SELECT is not in GROUP BY and not an aggregate (3pts). Must either remove name, add to GROUP BY, or use an aggregate like MAX(name) (2pts).',
  },
  {
    id: 'e2c3', examCycle: 2, skill: 'linux', section: 'C', marks: 5,
    prompt: 'What is wrong with this bash script?',
    codeSnippet: `#!/bin/bash
if [ $1 == "" ]; then
  echo "No argument provided"
fi`,
    gradingRubric: 'Bug: $1 may be unset, causing "unary operator expected" error (2pts). Fix: quote variable: [ "$1" == "" ] or use [ -z "$1" ] (3pts).',
  },
  {
    id: 'e2c4', examCycle: 2, skill: 'linux', section: 'C', marks: 5,
    prompt: 'What is wrong with this process kill command?',
    codeSnippet: `ps aux | grep myapp
kill 1234 5678 9012`,
    gradingRubric: 'This might work, but grep myapp also matches the grep process itself (2pts). Better: pgrep myapp or ps aux | grep [m]yapp to exclude the grep process (3pts).',
  },
  {
    id: 'e2c5', examCycle: 2, skill: 'k8s', section: 'C', marks: 5,
    prompt: 'What is wrong with this docker-compose.yml?',
    codeSnippet: `version: '3'
services:
  db:
    image: postgres
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://db:5432/mydb`,
    gradingRubric: 'depends_on only controls start order, not readiness (2pts). Database may not be ready when web starts (1pt). Fix: use healthcheck or retry logic in app (2pts).',
  },
  {
    id: 'e2d1', examCycle: 2, skill: 'sql', section: 'D', marks: 10,
    prompt: 'Write a SQL query using a CTE that: (1) calculates total revenue per product category, (2) calculates the percentage of total revenue for each category, and (3) shows the top 3 categories by revenue. Tables: orders(id, total_amount), order_items(order_id, product_id, quantity, unit_price), products(id, name, category).',
    gradingRubric: 'CTE syntax correct (2pts). Revenue per category calculation (2pts). Percentage of total using subquery or second CTE (3pts). TOP 3 with ORDER BY + LIMIT (2pts). Correct JOIN logic (1pt).',
  },
  {
    id: 'e2d2', examCycle: 2, skill: 'linux', section: 'D', marks: 10,
    prompt: 'Write a bash script that: accepts a directory path as $1, finds all .txt files modified in the last 7 days, counts the total number of lines across all files, and prints a summary. Handle the case where the directory doesn\'t exist.',
    gradingRubric: 'Directory existence check (2pts). find with -mtime -7 and -name "*.txt" (3pts). wc -l or loop for line count (3pts). Summary output (1pt). Error handling for missing directory (1pt).',
  },
  {
    id: 'e2e1', examCycle: 2, skill: 'k8s', section: 'E', marks: 10,
    prompt: 'Your Docker container keeps exiting immediately after start. Walk through your complete debugging process — the exact commands you\'d run, what you\'d look for, and how you\'d fix the most common causes.',
    gradingRubric: 'docker logs <container> (2pts). docker run -it to get interactive shell (2pts). Check CMD/ENTRYPOINT in Dockerfile (2pts). Check for missing files, wrong paths, env vars (2pts). Explain how process must stay in foreground (2pts).',
  },
]

// ─── EXAM 3 ─────────────────────────────────────────────────────────────────
export const exam3MCQ: MCQQuestion[] = [
  {
    id: 'e3m1', examCycle: 3, skill: 'sql',
    question: 'What is the key advantage of a CTE over a subquery?',
    options: { a: 'CTEs are always faster', b: 'CTEs are named and reusable within the query', c: 'CTEs can use aggregate functions', d: 'CTEs automatically create indexes' },
    correct: 'b',
    explanation: 'CTEs are named expressions that can be referenced multiple times and improve readability.',
  },
  {
    id: 'e3m2', examCycle: 3, skill: 'sql',
    question: 'What does ROW_NUMBER() return when two rows have the same ORDER BY value?',
    options: { a: 'The same number for both', b: 'An error', c: 'Arbitrary but unique numbers', d: 'NULL for the second row' },
    correct: 'c',
    explanation: 'ROW_NUMBER() always assigns unique numbers even for ties. RANK() gives the same number and skips the next.',
  },
  {
    id: 'e3m3', examCycle: 3, skill: 'sql',
    question: 'What does LAG(salary, 1) OVER (ORDER BY hire_date) return for the first row?',
    options: { a: 'The salary itself', b: '0', c: 'NULL', d: 'An error' },
    correct: 'c',
    explanation: 'LAG returns the value from a previous row. For the first row, there is no previous row, so it returns NULL.',
  },
  {
    id: 'e3m4', examCycle: 3, skill: 'sql',
    question: 'What is PARTITION BY in a window function?',
    options: {
      a: 'Splits the query into multiple threads',
      b: 'Divides rows into groups for the window calculation',
      c: 'Creates a physical partition in the database',
      d: 'Limits the number of rows returned',
    },
    correct: 'b',
    explanation: 'PARTITION BY is like GROUP BY for window functions — it defines subsets of rows that each window function calculates over independently.',
  },
  {
    id: 'e3m5', examCycle: 3, skill: 'sql',
    question: 'Which window function calculates a running total?',
    options: { a: 'COUNT() OVER ()', b: 'SUM(amount) OVER (ORDER BY date)', c: 'RUNNING_SUM(amount)', d: 'ACCUMULATE(amount)' },
    correct: 'b',
    explanation: 'SUM() with ORDER BY in the OVER clause creates a running total (cumulative sum).',
  },
  {
    id: 'e3m6', examCycle: 3, skill: 'sql',
    question: 'A recursive CTE must have which two parts?',
    options: {
      a: 'SELECT and WHERE',
      b: 'Anchor member and recursive member combined with UNION ALL',
      c: 'FROM and JOIN',
      d: 'START WITH and CONNECT BY',
    },
    correct: 'b',
    explanation: 'Recursive CTEs need: (1) anchor member — the base case, (2) recursive member — references the CTE itself. Must use UNION ALL.',
  },
  {
    id: 'e3m7', examCycle: 3, skill: 'sql',
    question: 'What does DENSE_RANK() differ from RANK()?',
    options: {
      a: 'DENSE_RANK does not skip numbers after a tie',
      b: 'DENSE_RANK skips numbers after a tie',
      c: 'They are identical',
      d: 'DENSE_RANK only works with PARTITION BY',
    },
    correct: 'a',
    explanation: 'RANK: 1,1,3 (skips 2). DENSE_RANK: 1,1,2 (no skip). DENSE_RANK gives consecutive ranks even after ties.',
  },
  {
    id: 'e3m8', examCycle: 3, skill: 'linux',
    question: 'What does awk -F":" \'{print $1}\' /etc/passwd print?',
    options: { a: 'All user passwords', b: 'All usernames', c: 'All user IDs', d: 'The first line only' },
    correct: 'b',
    explanation: '-F":" sets colon as field separator. /etc/passwd format is username:password:uid:... so $1 is username.',
  },
  {
    id: 'e3m9', examCycle: 3, skill: 'linux',
    question: 'What does sort -u do?',
    options: { a: 'Sorts by unique fields only', b: 'Sorts and removes duplicates', c: 'Sorts in reverse', d: 'Sorts by file modification time' },
    correct: 'b',
    explanation: '-u means unique: equivalent to sort | uniq — outputs only the first of duplicate lines.',
  },
  {
    id: 'e3m10', examCycle: 3, skill: 'linux',
    question: 'Which command counts the number of lines in a file?',
    options: { a: 'count file.txt', b: 'wc -l file.txt', c: 'wc -w file.txt', d: 'lines file.txt' },
    correct: 'b',
    explanation: 'wc (word count) with -l counts lines. -w counts words, -c counts bytes.',
  },
  {
    id: 'e3m11', examCycle: 3, skill: 'linux',
    question: 'What does cut -d"," -f1,3 do?',
    options: {
      a: 'Cuts the file at lines 1 and 3',
      b: 'Extracts fields 1 and 3 from CSV-like input',
      c: 'Removes columns 1 and 3',
      d: 'Counts occurrences of commas',
    },
    correct: 'b',
    explanation: '-d"," sets comma as delimiter, -f1,3 selects fields 1 and 3.',
  },
  {
    id: 'e3m12', examCycle: 3, skill: 'k8s',
    question: 'What is a Kubernetes Pod?',
    options: {
      a: 'A virtual machine in Kubernetes',
      b: 'One or more containers sharing network and storage, the smallest deployable unit',
      c: 'A Docker image',
      d: 'A node in the cluster',
    },
    correct: 'b',
    explanation: 'A Pod is the smallest deployable unit. Containers in a Pod share network namespace (localhost) and volumes.',
  },
  {
    id: 'e3m13', examCycle: 3, skill: 'k8s',
    question: 'What is the purpose of a ReplicaSet?',
    options: {
      a: 'To create backups of data',
      b: 'To maintain a desired number of Pod replicas running at all times',
      c: 'To replicate data across nodes',
      d: 'To scale the cluster nodes',
    },
    correct: 'b',
    explanation: 'ReplicaSet ensures N pods matching a label selector are always running, restarting failed ones.',
  },
  {
    id: 'e3m14', examCycle: 3, skill: 'k8s',
    question: 'Which kubectl command shows a Deployment\'s rollout history?',
    options: { a: 'kubectl get deployment', b: 'kubectl describe deployment', c: 'kubectl rollout history deployment/name', d: 'kubectl logs deployment/name' },
    correct: 'c',
    explanation: 'kubectl rollout history shows the revision history of a Deployment.',
  },
  {
    id: 'e3m15', examCycle: 3, skill: 'k8s',
    question: 'What happens to a Deployment\'s pods when you run kubectl rollout undo?',
    options: {
      a: 'All pods are deleted',
      b: 'Pods are rolled back to the previous revision',
      c: 'Pods restart without changing image',
      d: 'Nothing — undo only clears history',
    },
    correct: 'b',
    explanation: 'kubectl rollout undo reverts the Deployment to the previous revision, triggering a rolling update back.',
  },
  {
    id: 'e3m16', examCycle: 3, skill: 'k8s',
    question: 'What is a label selector in Kubernetes?',
    options: {
      a: 'A way to name a pod',
      b: 'A query that matches objects by their labels',
      c: 'A RBAC permission',
      d: 'A DNS record',
    },
    correct: 'b',
    explanation: 'Label selectors match Kubernetes objects by key/value pairs on their labels. Used by Services and ReplicaSets to target pods.',
  },
  {
    id: 'e3m17', examCycle: 3, skill: 'sql',
    question: 'Which window function gives the row number within each PARTITION, restarting at 1 for each partition?',
    options: { a: 'COUNT() OVER (PARTITION BY dept)', b: 'ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary)', c: 'RANK() OVER (ORDER BY salary)', d: 'NTILE(1) OVER (PARTITION BY dept)' },
    correct: 'b',
    explanation: 'ROW_NUMBER() with PARTITION BY restarts numbering for each partition group.',
  },
  {
    id: 'e3m18', examCycle: 3, skill: 'linux',
    question: 'What does tee do in a pipeline?',
    options: {
      a: 'Splits the pipeline into two',
      b: 'Writes stdin to a file AND passes it to stdout',
      c: 'Terminates the pipeline',
      d: 'Reverses the pipeline direction',
    },
    correct: 'b',
    explanation: 'tee reads from stdin and writes to both stdout and a file. Useful for logging pipeline intermediate results.',
  },
  {
    id: 'e3m19', examCycle: 3, skill: 'k8s',
    question: 'What does kubectl apply -f deployment.yaml do?',
    options: {
      a: 'Only creates new resources — fails if they exist',
      b: 'Creates the resource if it doesn\'t exist, updates it if it does',
      c: 'Deletes and recreates the resource',
      d: 'Validates the YAML without applying',
    },
    correct: 'b',
    explanation: 'kubectl apply is declarative — it creates or updates. kubectl create fails if the resource already exists.',
  },
  {
    id: 'e3m20', examCycle: 3, skill: 'mixed',
    question: 'What does the bash command "source ~/.bashrc" do?',
    options: {
      a: 'Opens .bashrc for editing',
      b: 'Runs .bashrc in the current shell (same process)',
      c: 'Resets all environment variables',
      d: 'Installs the .bashrc file',
    },
    correct: 'b',
    explanation: 'source (or .) runs the script in the current shell, so any variable exports take effect immediately.',
  },
]

export const exam3Written: WrittenQuestion[] = [
  {
    id: 'e3b1', examCycle: 3, skill: 'sql', section: 'B', marks: 5,
    prompt: 'Explain the difference between RANK(), DENSE_RANK(), and ROW_NUMBER(). Show the output for scores [100, 100, 90, 80, 80] for each function.',
    gradingRubric: 'ROW_NUMBER: unique 1,2,3,4,5 (1pt). RANK: 1,1,3,4,4 (1pt). DENSE_RANK: 1,1,2,3,3 (1pt). Clear explanation of gap vs no gap (2pts).',
  },
  {
    id: 'e3b2', examCycle: 3, skill: 'sql', section: 'B', marks: 5,
    prompt: 'Write a query using a CTE to find employees whose salary is above the average salary of their department.',
    gradingRubric: 'CTE calculates dept averages (2pts). Main query joins employee table to CTE (2pts). Correct filter condition (1pt).',
  },
  {
    id: 'e3b3', examCycle: 3, skill: 'linux', section: 'B', marks: 5,
    prompt: 'Explain the difference between > and >> for file redirection. What happens to the file in each case?',
    gradingRubric: '>: overwrites the file (truncates to zero then writes) (2pts). >>: appends to the file (3pts).',
  },
  {
    id: 'e3b4', examCycle: 3, skill: 'linux', section: 'B', marks: 5,
    prompt: 'What is the difference between $@ and $* in bash? When does the difference matter?',
    gradingRubric: '$@: each arg is separate quoted string (2pts). $*: all args joined by IFS (2pts). Difference matters when quoted: "$@" preserves args with spaces (1pt).',
  },
  {
    id: 'e3b5', examCycle: 3, skill: 'k8s', section: 'B', marks: 5,
    prompt: 'Explain what happens when a Pod fails in a Kubernetes Deployment. What are CrashLoopBackOff and ImagePullBackOff?',
    gradingRubric: 'ReplicaSet restarts failed pods (2pts). CrashLoopBackOff: container keeps crashing, K8s backs off restart timing (2pts). ImagePullBackOff: cannot pull the image (1pt).',
  },
  {
    id: 'e3c1', examCycle: 3, skill: 'sql', section: 'C', marks: 5,
    prompt: 'Find the bug in this CTE:',
    codeSnippet: `WITH top_customers AS (
  SELECT customer_id, SUM(amount) as total
  FROM orders
  WHERE total > 1000
  GROUP BY customer_id
)
SELECT * FROM top_customers;`,
    gradingRubric: 'Bug: WHERE references "total" alias, but aliases from SELECT are not available in WHERE (3pts). Fix: move condition to HAVING (2pts).',
  },
  {
    id: 'e3c2', examCycle: 3, skill: 'sql', section: 'C', marks: 5,
    prompt: 'Find the bug in this window function query:',
    codeSnippet: `SELECT
  employee_id,
  salary,
  salary - LAG(salary) OVER (ORDER BY hire_date) AS salary_change
FROM employees
WHERE salary_change > 0;`,
    gradingRubric: 'Bug: window function alias cannot be used in WHERE (2pts). Fix: wrap in a subquery or CTE and filter on the outer query (3pts).',
  },
  {
    id: 'e3c3', examCycle: 3, skill: 'linux', section: 'C', marks: 5,
    prompt: 'Find the bug in this awk command:',
    codeSnippet: `cat access.log | awk '{print $1}' | sort | uniq -d | wc -l`,
    gradingRubric: 'Minor: useless cat (1pt). Main bug: uniq -d shows duplicates only, not unique lines (2pts). To count unique IPs: sort | uniq | wc -l or sort -u | wc -l (2pts).',
  },
  {
    id: 'e3c4', examCycle: 3, skill: 'k8s', section: 'C', marks: 5,
    prompt: 'Find the bug in this Kubernetes Deployment YAML:',
    codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: web
        image: nginx:latest`,
    gradingRubric: 'Bug: selector matchLabels (app: backend) doesn\'t match pod template labels (app: frontend) (3pts). ReplicaSet won\'t own the pods (2pts). Fix: make both labels match.',
  },
  {
    id: 'e3c5', examCycle: 3, skill: 'linux', section: 'C', marks: 5,
    prompt: 'Find the bug in this bash loop:',
    codeSnippet: `for file in $(ls /var/log/*.log); do
  echo "Processing $file"
  wc -l $file
done`,
    gradingRubric: 'Bug: parsing ls output fails for filenames with spaces (2pts). Fix: use glob directly: for file in /var/log/*.log (3pts).',
  },
  {
    id: 'e3d1', examCycle: 3, skill: 'sql', section: 'D', marks: 10,
    prompt: 'Write a query using window functions to: (1) rank employees by salary within each department, (2) show the salary difference from the department\'s highest earner, (3) show a running total of salary by hire date within each department.',
    gradingRubric: 'RANK() OVER PARTITION BY dept (3pts). salary diff using MAX() OVER PARTITION BY or FIRST_VALUE() (3pts). SUM() running total with ORDER BY hire_date (3pts). Clean query structure (1pt).',
  },
  {
    id: 'e3d2', examCycle: 3, skill: 'k8s', section: 'D', marks: 10,
    prompt: 'Write a complete Kubernetes Deployment manifest for an nginx web server with: 3 replicas, resource limits (100m CPU, 128Mi memory), a liveness probe on port 80, and a rolling update strategy with maxUnavailable: 1.',
    gradingRubric: 'Correct apiVersion/kind/metadata (1pt). replicas: 3 (1pt). resource requests/limits (2pts). livenessProbe httpGet port 80 (2pts). strategy RollingUpdate maxUnavailable (2pts). Valid YAML structure (2pts).',
  },
  {
    id: 'e3e1', examCycle: 3, skill: 'linux', section: 'E', marks: 10,
    prompt: 'Using only bash and standard Unix tools (no Python, no awk programs longer than one line), write a complete pipeline to: read a web server access log, extract all unique IP addresses, count how many requests each IP made, sort by request count descending, and show only IPs with more than 100 requests.',
    gradingRubric: 'grep/cut/awk for IP extraction (2pts). sort for grouping (2pts). uniq -c for counts (2pts). sort -rn for descending sort (2pts). awk/grep filter for >100 (2pts).',
  },
]

// ─── EXAM 4 ─────────────────────────────────────────────────────────────────
export const exam4MCQ: MCQQuestion[] = [
  { id: 'e4m1', examCycle: 4, skill: 'sql', question: 'A B-tree index on a column with low cardinality (e.g., gender: M/F) is likely to:', options: { a: 'Greatly speed up queries', b: 'Be ignored by the query planner', c: 'Cause errors', d: 'Reduce storage' }, correct: 'b', explanation: 'Low cardinality means the index has poor selectivity. A full table scan is faster when >~20% of rows match.' },
  { id: 'e4m2', examCycle: 4, skill: 'sql', question: 'What does ACID stand for?', options: { a: 'Atomicity, Consistency, Isolation, Durability', b: 'Availability, Consistency, Integrity, Distribution', c: 'Atomicity, Concurrency, Integrity, Durability', d: 'Availability, Correctness, Isolation, Delivery' }, correct: 'a', explanation: 'ACID ensures reliable database transactions: all-or-nothing, valid state, isolated from other transactions, and persisted.' },
  { id: 'e4m3', examCycle: 4, skill: 'sql', question: 'What is 1NF (First Normal Form)?', options: { a: 'No duplicate rows', b: 'Atomic values — no repeating groups or arrays in columns', c: 'Every non-key column depends on the full primary key', d: 'No transitive dependencies' }, correct: 'b', explanation: '1NF: each column holds atomic values, no sets or arrays. Each row is unique.' },
  { id: 'e4m4', examCycle: 4, skill: 'sql', question: 'What does a COVERING INDEX mean?', options: { a: 'An index that covers all tables', b: 'An index that contains all columns needed by a query, avoiding a table lookup', c: 'An index on a view', d: 'An index that automatically updates' }, correct: 'b', explanation: 'A covering index satisfies a query entirely from the index without accessing the heap (table), improving performance.' },
  { id: 'e4m5', examCycle: 4, skill: 'sql', question: 'What is a phantom read?', options: { a: 'Reading stale data due to no transaction', b: 'A row that appears in a re-read within a transaction that wasn\'t there before', c: 'Reading data from a dropped table', d: 'Duplicate rows in a join' }, correct: 'b', explanation: 'Phantom reads occur when a transaction re-reads a range and sees new rows inserted by another committed transaction.' },
  { id: 'e4m6', examCycle: 4, skill: 'sql', question: 'What isolation level prevents dirty reads but allows non-repeatable reads?', options: { a: 'SERIALIZABLE', b: 'READ UNCOMMITTED', c: 'READ COMMITTED', d: 'REPEATABLE READ' }, correct: 'c', explanation: 'READ COMMITTED prevents reading uncommitted data but allows another transaction to modify rows between reads.' },
  { id: 'e4m7', examCycle: 4, skill: 'sql', question: 'What does EXPLAIN ANALYZE show that EXPLAIN does not?', options: { a: 'The query plan', b: 'Actual execution time and row counts', c: 'Index definitions', d: 'Memory usage' }, correct: 'b', explanation: 'EXPLAIN shows estimated costs. ANALYZE runs the query and shows actual times and row counts for comparison.' },
  { id: 'e4m8', examCycle: 4, skill: 'linux', question: 'In a bash script, what does set -e do?', options: { a: 'Enables command echoing', b: 'Exits the script if any command returns non-zero', c: 'Sets environment variables', d: 'Enables extended globbing' }, correct: 'b', explanation: 'set -e makes the script exit immediately when any command fails (returns non-zero exit code).' },
  { id: 'e4m9', examCycle: 4, skill: 'linux', question: 'What is the correct way to check if a file exists in bash?', options: { a: 'if [ file.txt ]; then', b: 'if [ -f "file.txt" ]; then', c: 'if exists("file.txt"); then', d: 'if file.txt -exists; then' }, correct: 'b', explanation: '-f tests for regular file existence. -d tests for directory, -e tests for any file type.' },
  { id: 'e4m10', examCycle: 4, skill: 'linux', question: 'How do you pass all arguments from one script to another, preserving argument boundaries?', options: { a: 'script2 $*', b: 'script2 "$@"', c: 'script2 $1 $2 $3', d: 'script2 $(args)' }, correct: 'b', explanation: '"$@" preserves each argument as a separate quoted string, handling spaces in arguments correctly.' },
  { id: 'e4m11', examCycle: 4, skill: 'linux', question: 'What does SSH port forwarding (-L 8080:localhost:80) do?', options: { a: 'Opens port 80 on the remote server', b: 'Forwards local port 8080 to port 80 on the remote host', c: 'Blocks port 8080 locally', d: 'Creates a VPN tunnel' }, correct: 'b', explanation: '-L local:remote-host:remote-port forwards connections from local port to remote host:port through the SSH tunnel.' },
  { id: 'e4m12', examCycle: 4, skill: 'linux', question: 'What does rsync -avz do?', options: { a: 'Deletes destination files not in source', b: 'Syncs files with archive mode, verbose output, and compression', c: 'Runs rsync as root', d: 'Excludes hidden files' }, correct: 'b', explanation: '-a archive (preserve permissions/timestamps), -v verbose, -z compress during transfer.' },
  { id: 'e4m13', examCycle: 4, skill: 'k8s', question: 'What is a Kubernetes Service\'s ClusterIP?', options: { a: 'The IP of the node running the pod', b: 'A stable virtual IP that load-balances traffic to matching pods', c: 'The IP assigned to the pod directly', d: 'The external IP of the cluster' }, correct: 'b', explanation: 'ClusterIP is a virtual IP that stays stable even as pods are replaced. kube-proxy routes traffic to actual pod IPs.' },
  { id: 'e4m14', examCycle: 4, skill: 'k8s', question: 'What is the purpose of a Kubernetes Namespace?', options: { a: 'To separate cluster nodes', b: 'To logically partition cluster resources for isolation', c: 'To assign unique IPs to pods', d: 'To configure DNS' }, correct: 'b', explanation: 'Namespaces provide logical isolation: resource quotas, RBAC, and names can be scoped per namespace.' },
  { id: 'e4m15', examCycle: 4, skill: 'k8s', question: 'What does a Kubernetes Ingress do?', options: { a: 'Manages node-to-node communication', b: 'Routes external HTTP/HTTPS traffic to internal services based on rules', c: 'Provides persistent storage', d: 'Schedules pods to nodes' }, correct: 'b', explanation: 'Ingress is an API object that manages external access to services, typically HTTP, with routing rules.' },
  { id: 'e4m16', examCycle: 4, skill: 'k8s', question: 'A pod is in "Pending" state. What is the most likely cause?', options: { a: 'The container image is wrong', b: 'No node has sufficient resources or matching tolerations/nodeSelector', c: 'The pod has too many replicas', d: 'The service is not configured' }, correct: 'b', explanation: 'Pending means the pod can\'t be scheduled. Causes: insufficient CPU/memory, PVC not bound, node selector mismatch.' },
  { id: 'e4m17', examCycle: 4, skill: 'k8s', question: 'What is the difference between kubectl create and kubectl apply?', options: { a: 'They are identical', b: 'create fails if the resource exists; apply creates or updates', c: 'apply requires a file; create takes inline arguments only', d: 'create is for pods only; apply is for all resources' }, correct: 'b', explanation: 'apply is idempotent (safe to run multiple times). create is imperative and errors on existing resources.' },
  { id: 'e4m18', examCycle: 4, skill: 'mixed', question: 'What is a race condition?', options: { a: 'A performance optimization', b: 'When program behavior depends on unpredictable timing of concurrent operations', c: 'A type of database join', d: 'A Linux scheduling policy' }, correct: 'b', explanation: 'Race conditions occur when multiple threads/processes access shared state without proper synchronization.' },
  { id: 'e4m19', examCycle: 4, skill: 'sql', question: 'What is the difference between DELETE and TRUNCATE?', options: { a: 'DELETE removes all rows, TRUNCATE removes specific rows', b: 'TRUNCATE is faster and non-transactional; DELETE is logged row-by-row', c: 'They are identical', d: 'DELETE requires a WHERE clause; TRUNCATE does not' }, correct: 'b', explanation: 'TRUNCATE removes all rows much faster (deallocates pages) but cannot be rolled back in some databases. DELETE is fully logged.' },
  { id: 'e4m20', examCycle: 4, skill: 'k8s', question: 'What does "kubectl port-forward pod/mypod 8080:80" do?', options: { a: 'Exposes the pod externally on port 8080', b: 'Forwards local port 8080 to port 80 in the pod', c: 'Creates a Service on port 8080', d: 'Opens an SSH tunnel' }, correct: 'b', explanation: 'port-forward is for local development — it tunnels traffic from your machine to the pod, not for production use.' },
]

export const exam4Written: WrittenQuestion[] = [
  { id: 'e4b1', examCycle: 4, skill: 'sql', section: 'B', marks: 5, prompt: 'Explain what a covering index is and write an example where you\'d create one for this query: SELECT email, created_at FROM users WHERE status = \'active\' ORDER BY created_at DESC.', gradingRubric: 'Covering index includes all columns the query needs (2pts). Example: CREATE INDEX ON users(status, created_at, email) (2pts). Query satisfied from index without heap access (1pt).' },
  { id: 'e4b2', examCycle: 4, skill: 'sql', section: 'B', marks: 5, prompt: 'Explain the difference between REPEATABLE READ and SERIALIZABLE isolation levels.', gradingRubric: 'REPEATABLE READ prevents dirty and non-repeatable reads but allows phantoms (2pts). SERIALIZABLE prevents all anomalies including phantoms (2pts). SERIALIZABLE uses predicate locking or SSI (1pt).' },
  { id: 'e4b3', examCycle: 4, skill: 'linux', section: 'B', marks: 5, prompt: 'Explain what happens when you run a bash script with and without "set -euo pipefail". Why is this combination recommended?', gradingRubric: '-e: exit on error (1pt). -u: treat unset variables as error (2pts). -o pipefail: pipe fails if any command fails (2pts).' },
  { id: 'e4b4', examCycle: 4, skill: 'linux', section: 'B', marks: 5, prompt: 'What is the difference between authorized_keys and known_hosts in SSH?', gradingRubric: 'authorized_keys: list of public keys that can authenticate to this server (2pts). known_hosts: fingerprints of servers the client has connected to — prevents MITM (3pts).' },
  { id: 'e4b5', examCycle: 4, skill: 'k8s', section: 'B', marks: 5, prompt: 'What is the difference between a Kubernetes Service of type ClusterIP vs NodePort vs LoadBalancer?', gradingRubric: 'ClusterIP: internal only (1pt). NodePort: accessible on node IP + port (2pts). LoadBalancer: creates cloud provider load balancer with external IP (2pts).' },
  { id: 'e4c1', examCycle: 4, skill: 'sql', section: 'C', marks: 5, prompt: 'Identify the performance problem in this query:', codeSnippet: `SELECT * FROM orders
WHERE DATE(created_at) = '2024-01-15';`, gradingRubric: 'Bug: wrapping column in DATE() function prevents index use (3pts). Fix: WHERE created_at >= \'2024-01-15\' AND created_at < \'2024-01-16\' allows index scan (2pts).' },
  { id: 'e4c2', examCycle: 4, skill: 'sql', section: 'C', marks: 5, prompt: 'Find the bug in this index usage:', codeSnippet: `-- Index: CREATE INDEX ON orders(customer_id, status, amount)
-- Query:
SELECT * FROM orders WHERE status = 'paid' AND amount > 100;`, gradingRubric: 'Bug: query skips the leading column (customer_id), so the composite index cannot be used efficiently (3pts). Fix: include customer_id in WHERE or create a different index (2pts).' },
  { id: 'e4c3', examCycle: 4, skill: 'linux', section: 'C', marks: 5, prompt: 'Find the bug in this backup script:', codeSnippet: `#!/bin/bash
BACKUP_DIR=/backup
mkdir $BACKUP_DIR
tar -czf $BACKUP_DIR/backup.tar.gz /var/data
echo "Backup complete"`, gradingRubric: 'Missing set -e or error handling (1pt). mkdir fails if directory exists (2pts). Fix: mkdir -p or check with -d (2pts).' },
  { id: 'e4c4', examCycle: 4, skill: 'k8s', section: 'C', marks: 5, prompt: 'Find the bug in this Ingress resource:', codeSnippet: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port: 80`, gradingRubric: 'Bug: port should be an object with number field: port: {number: 80} (3pts). Missing ingressClassName annotation or spec.ingressClassName (2pts).' },
  { id: 'e4c5', examCycle: 4, skill: 'linux', section: 'C', marks: 5, prompt: 'Find the bug in this SSH config:', codeSnippet: `Host myserver
  HostName 192.168.1.100
  User admin
  IdentityFile ~/.ssh/id_rsa
  Port 22
  PasswordAuthentication yes`, gradingRubric: 'PasswordAuthentication yes in ssh_config is a client option and doesn\'t control server auth (1pt). To disable server password auth, edit sshd_config (2pts). Should also add StrictHostKeyChecking for security (2pts).' },
  { id: 'e4d1', examCycle: 4, skill: 'linux', section: 'D', marks: 10, prompt: 'Write a complete backup.sh script that: backs up /var/data to /backup/YYYY-MM-DD/, keeps only the last 7 backups (deletes older ones), logs success/failure to /var/log/backup.log, sends an exit code of 1 on failure, and is idempotent (safe to run multiple times per day).', gradingRubric: 'DATE variable for directory name (1pt). mkdir with date (1pt). tar with error check (2pts). Find + delete old backups (2pts). Logging to file (2pts). Exit code on failure (1pt). Idempotent handling (1pt).' },
  { id: 'e4d2', examCycle: 4, skill: 'k8s', section: 'D', marks: 10, prompt: 'Write a complete Kubernetes Service and Ingress manifest for a web application. The Service should expose port 3000, and the Ingress should route traffic from app.mycompany.com/api/* to this Service. Include TLS termination using a secret named tls-secret.', gradingRubric: 'Service kind/selector/port 3000 (2pts). Ingress kind/metadata (1pt). TLS section with secretName (2pts). rules with correct host (2pts). path /api/* with PathType Prefix (2pts). Backend service reference (1pt).' },
  { id: 'e4e1', examCycle: 4, skill: 'sql', section: 'E', marks: 10, prompt: 'A query that was running in 50ms last week is now taking 8 seconds. You have the EXPLAIN ANALYZE output showing a Seq Scan on orders (500k rows). Walk through your complete investigation and resolution process.', gradingRubric: 'Check EXPLAIN ANALYZE for missing index usage (2pts). Check if index exists: \\d orders (1pt). Check statistics: ANALYZE orders (2pts). Consider query structure (function on indexed column) (2pts). Create appropriate index (2pts). Verify improvement (1pt).' },
]

// ─── EXAM 5 ─────────────────────────────────────────────────────────────────
export const exam5MCQ: MCQQuestion[] = [
  { id: 'e5m1', examCycle: 5, skill: 'sql', question: 'What is the advantage of a VIEW over repeating a complex query?', options: { a: 'Views are always faster', b: 'Views encapsulate logic — change once and all consumers benefit', c: 'Views prevent concurrent access', d: 'Views automatically cache results' }, correct: 'b', explanation: 'Views act as named, reusable query definitions. Change the underlying query in one place.' },
  { id: 'e5m2', examCycle: 5, skill: 'sql', question: 'When is a MATERIALIZED VIEW more appropriate than a regular VIEW?', options: { a: 'When the underlying data changes frequently', b: 'When the query is expensive and data freshness can tolerate delay', c: 'When you need row-level security', d: 'When the view has many columns' }, correct: 'b', explanation: 'Materialized views store the result physically. Best for expensive queries where stale data is acceptable (e.g., hourly reports).' },
  { id: 'e5m3', examCycle: 5, skill: 'sql', question: 'What does a BEFORE trigger do?', options: { a: 'Runs after the operation completes', b: 'Runs before the operation, can modify NEW values or cancel the operation', c: 'Runs instead of the operation', d: 'Runs at a scheduled time before the query' }, correct: 'b', explanation: 'BEFORE triggers fire before the INSERT/UPDATE/DELETE. They can modify NEW.column or return NULL to abort the operation.' },
  { id: 'e5m4', examCycle: 5, skill: 'sql', question: 'What is the difference between a function and a procedure in PostgreSQL?', options: { a: 'Functions return values; procedures cannot return values but can use transaction control', b: 'They are identical', c: 'Procedures are faster', d: 'Functions are written in SQL only; procedures in PL/pgSQL' }, correct: 'a', explanation: 'PostgreSQL 11+: procedures can use COMMIT/ROLLBACK. Functions must return a value (or void) and cannot control transactions.' },
  { id: 'e5m5', examCycle: 5, skill: 'sql', question: 'In a trigger function, what does RETURN NULL do in a BEFORE trigger?', options: { a: 'Returns a null row', b: 'Cancels the triggering operation', c: 'Continues with a null NEW row', d: 'Raises an error' }, correct: 'b', explanation: 'In a BEFORE trigger, RETURN NULL cancels the insert/update/delete. RETURN NEW continues with the (possibly modified) row.' },
  { id: 'e5m6', examCycle: 5, skill: 'sql', question: 'What is PL/pgSQL?', options: { a: 'A lightweight SQL dialect', b: 'PostgreSQL\'s procedural language for writing functions and triggers', c: 'A query planning language', d: 'A PostgreSQL configuration language' }, correct: 'b', explanation: 'PL/pgSQL (Procedural Language/PostgreSQL) adds control structures, variables, and exception handling to SQL.' },
  { id: 'e5m7', examCycle: 5, skill: 'sql', question: 'What does RAISE EXCEPTION in PL/pgSQL do?', options: { a: 'Logs a warning', b: 'Terminates the function with an error, rolling back the transaction', c: 'Raises a notice to the client', d: 'Re-executes the failing query' }, correct: 'b', explanation: 'RAISE EXCEPTION throws an error that rolls back the current transaction unless caught with EXCEPTION handlers.' },
  { id: 'e5m8', examCycle: 5, skill: 'linux', question: 'What is the most effective way to prevent brute-force SSH attacks?', options: { a: 'Use a strong password', b: 'Disable password authentication and use key-based auth only', c: 'Change SSH port to non-standard', d: 'Enable verbose logging' }, correct: 'b', explanation: 'Disabling password auth eliminates the entire class of password brute-force attacks.' },
  { id: 'e5m9', examCycle: 5, skill: 'linux', question: 'In /etc/sudoers, what does "john ALL=(ALL) NOPASSWD:ALL" mean?', options: { a: 'john can use sudo on all hosts, as any user, without a password', b: 'john can only use sudo without a password for root commands', c: 'john cannot use sudo on any host', d: 'john needs a password for all sudo commands' }, correct: 'a', explanation: 'Format: user host=(runas) NOPASSWD:commands. ALL means unrestricted on each part.' },
  { id: 'e5m10', examCycle: 5, skill: 'linux', question: 'What does systemctl enable myservice do?', options: { a: 'Starts the service now', b: 'Creates symlinks to start the service automatically at boot', c: 'Runs the service once', d: 'Loads the service configuration' }, correct: 'b', explanation: 'enable creates symlinks in the appropriate runlevel target directory. start runs it now. enable + start to do both.' },
  { id: 'e5m11', examCycle: 5, skill: 'linux', question: 'What is journalctl -f equivalent to?', options: { a: 'tail -f on a log file', b: 'cat of all journal entries', c: 'Following the systemd journal in real-time', d: 'Filtering journal by facility' }, correct: 'c', explanation: '-f follows the journal in real-time (like tail -f but for the systemd journal).' },
  { id: 'e5m12', examCycle: 5, skill: 'linux', question: 'What does the Restart=on-failure directive in a .service file do?', options: { a: 'Restarts the service on every stop', b: 'Restarts the service only if it exits with a non-zero code', c: 'Never restarts the service', d: 'Restarts after 30 seconds always' }, correct: 'b', explanation: 'Restart=on-failure restarts the service only if it exits with a non-zero exit code (failure), not on clean exit.' },
  { id: 'e5m13', examCycle: 5, skill: 'k8s', question: 'What is a Kubernetes RBAC Role vs ClusterRole?', options: { a: 'Role is for admins; ClusterRole for regular users', b: 'Role is namespace-scoped; ClusterRole applies cluster-wide', c: 'ClusterRole is for pods; Role is for namespaces', d: 'They are identical except for name prefix' }, correct: 'b', explanation: 'Role grants permissions within a namespace. ClusterRole grants cluster-wide permissions or can be bound to namespaces.' },
  { id: 'e5m14', examCycle: 5, skill: 'k8s', question: 'What does a NetworkPolicy\'s podSelector: {} mean?', options: { a: 'No pods are selected', b: 'All pods in the namespace are selected', c: 'Only pods with no labels are selected', d: 'The policy is disabled' }, correct: 'b', explanation: 'An empty podSelector matches all pods in the namespace.' },
  { id: 'e5m15', examCycle: 5, skill: 'k8s', question: 'What is a ServiceAccount in Kubernetes?', options: { a: 'A billing account for cloud resources', b: 'An identity for processes running in pods to authenticate to the API server', c: 'A user account for kubectl access', d: 'An account for external services' }, correct: 'b', explanation: 'ServiceAccounts are pod identities used for RBAC. Pods use them to call the Kubernetes API.' },
  { id: 'e5m16', examCycle: 5, skill: 'k8s', question: 'What does a NetworkPolicy ingress rule with empty from: [] do?', options: { a: 'Allows traffic from all pods', b: 'Denies all ingress traffic', c: 'Allows traffic from the same namespace only', d: 'Allows traffic from all namespaces' }, correct: 'b', explanation: 'An empty from: [] with policyTypes: [Ingress] means no ingress is allowed — it\'s a deny-all ingress policy.' },
  { id: 'e5m17', examCycle: 5, skill: 'k8s', question: 'What is Helm in Kubernetes?', options: { a: 'A container runtime', b: 'A package manager for Kubernetes that manages collections of manifests as charts', c: 'A monitoring tool', d: 'A CI/CD pipeline' }, correct: 'b', explanation: 'Helm charts are templated Kubernetes manifests packaged for easy deployment and configuration.' },
  { id: 'e5m18', examCycle: 5, skill: 'mixed', question: 'What does idempotent mean in computing?', options: { a: 'An operation that runs only once', b: 'An operation that produces the same result regardless of how many times it\'s run', c: 'An operation that requires elevated privileges', d: 'An operation that modifies state permanently' }, correct: 'b', explanation: 'Idempotent operations are safe to repeat: mkdir -p, kubectl apply, and apt-get install are all idempotent.' },
  { id: 'e5m19', examCycle: 5, skill: 'sql', question: 'What is the purpose of VACUUM in PostgreSQL?', options: { a: 'Defragments disk storage', b: 'Reclaims space from dead rows created by updates/deletes', c: 'Rebuilds indexes', d: 'Clears query cache' }, correct: 'b', explanation: 'PostgreSQL uses MVCC — updates/deletes create dead rows. VACUUM reclaims that space for reuse.' },
  { id: 'e5m20', examCycle: 5, skill: 'k8s', question: 'What does kubectl describe pod mypod show that kubectl get pod mypod does not?', options: { a: 'The pod YAML', b: 'Events, conditions, container details, volumes — full diagnostic info', c: 'CPU usage in real-time', d: 'The pod\'s logs' }, correct: 'b', explanation: 'describe shows events (scheduling failures, image pull errors, etc.), conditions, environment vars, and volume mounts.' },
]

export const exam5Written: WrittenQuestion[] = [
  { id: 'e5b1', examCycle: 5, skill: 'sql', section: 'B', marks: 5, prompt: 'Write a trigger that automatically sets updated_at to NOW() whenever a row in the "products" table is updated.', gradingRubric: 'CREATE OR REPLACE FUNCTION (1pt). NEW.updated_at := NOW() (2pts). CREATE TRIGGER BEFORE UPDATE (1pt). Correct RETURN NEW (1pt).' },
  { id: 'e5b2', examCycle: 5, skill: 'sql', section: 'B', marks: 5, prompt: 'Explain what a materialized view is and write SQL to create one showing total revenue per product, then explain how you\'d refresh it.', gradingRubric: 'Definition: physically stored query result (1pt). CREATE MATERIALIZED VIEW syntax (2pts). REFRESH MATERIALIZED VIEW name (1pt). Note on CONCURRENTLY option (1pt).' },
  { id: 'e5b3', examCycle: 5, skill: 'linux', section: 'B', marks: 5, prompt: 'What is fail2ban and how does it work? What are the key configuration parameters you\'d set for SSH protection?', gradingRubric: 'Scans log files for failed authentication patterns (2pts). Bans IPs using iptables/nftables (1pt). Key params: bantime, findtime, maxretry (2pts).' },
  { id: 'e5b4', examCycle: 5, skill: 'linux', section: 'B', marks: 5, prompt: 'Explain the difference between systemctl start, enable, and enable --now. When would you use each?', gradingRubric: 'start: runs now only, won\'t survive reboot (2pts). enable: survives reboot but doesn\'t start now (2pts). enable --now: does both (1pt).' },
  { id: 'e5b5', examCycle: 5, skill: 'k8s', section: 'B', marks: 5, prompt: 'Explain the principle of least privilege in Kubernetes RBAC. How would you give a pod read-only access to ConfigMaps in its namespace?', gradingRubric: 'Least privilege: grant only what\'s needed (1pt). Create Role with get/list/watch on configmaps (2pts). Create ServiceAccount (1pt). RoleBinding to bind them (1pt).' },
  { id: 'e5c1', examCycle: 5, skill: 'sql', section: 'C', marks: 5, prompt: 'Find the bug in this trigger:', codeSnippet: `CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;`, gradingRubric: 'Bug: RETURN NULL in a BEFORE trigger cancels the operation (3pts). Fix: RETURN NEW to proceed with the modified row (2pts).' },
  { id: 'e5c2', examCycle: 5, skill: 'sql', section: 'C', marks: 5, prompt: 'Find the bug in this stored procedure:', codeSnippet: `CREATE OR REPLACE FUNCTION get_user_orders(user_id INT)
RETURNS TABLE(order_id INT, total NUMERIC) AS $$
BEGIN
  SELECT id, total FROM orders WHERE customer_id = user_id;
END;
$$ LANGUAGE plpgsql;`, gradingRubric: 'Bug: missing RETURN QUERY before SELECT (3pts). Without it, the function returns nothing. Fix: RETURN QUERY SELECT id, total... (2pts).' },
  { id: 'e5c3', examCycle: 5, skill: 'linux', section: 'C', marks: 5, prompt: 'Find the bug in this sudoers entry:', codeSnippet: `john ALL = (root) /usr/bin/systemctl restart *`, gradingRubric: 'Wildcard * in sudoers for commands is dangerous — allows "systemctl restart ../../../bin/bash" (2pts). Should specify exact service names (2pts). Use visudo to edit safely (1pt).' },
  { id: 'e5c4', examCycle: 5, skill: 'k8s', section: 'C', marks: 5, prompt: 'Find the bug in this RBAC manifest:', codeSnippet: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
- kind: ServiceAccount
  name: my-app
roleRef:
  kind: ClusterRole
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io`, gradingRubric: 'Bug: RoleBinding references roleRef kind: ClusterRole but pod-reader is a Role (3pts). Fix: change roleRef.kind to Role (2pts).' },
  { id: 'e5c5', examCycle: 5, skill: 'linux', section: 'C', marks: 5, prompt: 'Find the issues in this systemd service file:', codeSnippet: `[Unit]
Description=My Web App

[Service]
ExecStart=/usr/bin/node /opt/app/server.js
Restart=always

[Install]
WantedBy=multi-user.target`, gradingRubric: 'Missing User= directive (runs as root) (2pts). Missing WorkingDirectory (2pts). Missing After=network.target for web apps (1pt).' },
  { id: 'e5d1', examCycle: 5, skill: 'sql', section: 'D', marks: 10, prompt: 'Write a complete PL/pgSQL stored procedure called "process_order" that: accepts order_id and discount_percent, validates the order exists, calculates discounted total, updates the order total, creates a discount_log entry, and raises an exception if order_id is not found.', gradingRubric: 'CREATE PROCEDURE syntax (1pt). Input param validation with IF NOT FOUND (2pts). RAISE EXCEPTION (2pts). UPDATE order total (2pts). INSERT into discount_log (2pts). Correct PL/pgSQL structure (1pt).' },
  { id: 'e5d2', examCycle: 5, skill: 'k8s', section: 'D', marks: 10, prompt: 'Write a complete RBAC setup for this scenario: A ServiceAccount named "deploy-bot" should be able to create, update, and delete Deployments in the "staging" namespace, but only read (get/list) in the "production" namespace.', gradingRubric: 'ServiceAccount manifest (1pt). Role for staging with create/update/delete on deployments (3pts). RoleBinding in staging namespace (2pts). Role for prod read-only (2pts). RoleBinding in production (2pts).' },
  { id: 'e5e1', examCycle: 5, skill: 'k8s', section: 'E', marks: 10, prompt: 'Design an RBAC system for a 3-team Kubernetes cluster. Developers can deploy to staging namespace only. QA can read everything in staging. Ops can deploy to both staging and production. No team should access the kube-system namespace. Describe the exact Roles, ClusterRoles, and Bindings you\'d create.', gradingRubric: 'Developer Role in staging (2pts). QA read-only Role in staging (2pts). Ops Role in both namespaces (2pts). No kube-system access explanation (2pts). ServiceAccounts or Groups for each team (2pts).' },
]

// ─── EXAM 6 ─────────────────────────────────────────────────────────────────
export const exam6MCQ: MCQQuestion[] = [
  { id: 'e6m1', examCycle: 6, skill: 'sql', question: 'You have a query: SELECT * FROM a JOIN b ON a.id = b.a_id JOIN c ON b.id = c.b_id WHERE c.status = \'active\'. Which index would most benefit this query?', options: { a: 'Index on a.id', b: 'Index on c.status', c: 'Composite index on c(status, b_id)', d: 'Index on b.id' }, correct: 'c', explanation: 'The WHERE filters c.status and the join uses c.b_id. A composite index on both lets the planner find matching rows in one index scan.' },
  { id: 'e6m2', examCycle: 6, skill: 'sql', question: 'What does EXPLAIN show as "Hash Join" mean?', options: { a: 'Using a hash index', b: 'Building a hash table from one table then probing with the other', c: 'A JOIN with a HASH function', d: 'A parallel join operation' }, correct: 'b', explanation: 'Hash Join: build a hash table from the smaller relation, then probe it with each row from the larger.' },
  { id: 'e6m3', examCycle: 6, skill: 'sql', question: 'In PostgreSQL, what does ON CONFLICT DO NOTHING do?', options: { a: 'Raises an error on duplicate key', b: 'Silently ignores the insert if it violates a unique constraint', c: 'Updates the existing row', d: 'Logs the conflict' }, correct: 'b', explanation: 'ON CONFLICT DO NOTHING is an upsert variant that skips the insert without error on constraint violation.' },
  { id: 'e6m4', examCycle: 6, skill: 'sql', question: 'A query using a CTE is slow. You rewrite it as a JOIN and it\'s 10x faster. Why might this happen?', options: { a: 'CTEs are always slower', b: 'In some databases/versions, CTEs are optimization fences — they\'re always materialized', c: 'JOINs use indexes but CTEs do not', d: 'CTEs cannot use window functions' }, correct: 'b', explanation: 'In PostgreSQL before v12, CTEs were optimization fences: always materialized, preventing the planner from pushing conditions inside.' },
  { id: 'e6m5', examCycle: 6, skill: 'sql', question: 'What is the MVCC model in PostgreSQL?', options: { a: 'Multiple Virtual Cache Control', b: 'Multi-Version Concurrency Control: each transaction sees a snapshot of the database', c: 'A logging protocol for transactions', d: 'A backup strategy' }, correct: 'b', explanation: 'MVCC keeps multiple versions of rows. Readers don\'t block writers. Dead tuples accumulate and need VACUUM.' },
  { id: 'e6m6', examCycle: 6, skill: 'linux', question: 'Your server load average is 8.5 on a 4-core machine. What does this indicate?', options: { a: 'CPU is idle', b: 'The system is overloaded — more runnable processes than CPU cores', c: 'Memory is saturated', d: 'Load average is irrelevant without context' }, correct: 'b', explanation: 'Load average > number of CPUs means there are processes waiting for CPU time — the system is overloaded.' },
  { id: 'e6m7', examCycle: 6, skill: 'linux', question: 'What is the difference between soft and hard limits in /etc/security/limits.conf?', options: { a: 'Soft limits can be increased by the user up to the hard limit; hard limits require root to change', b: 'They are identical', c: 'Hard limits apply to root; soft limits to other users', d: 'Soft limits are for files; hard limits for processes' }, correct: 'a', explanation: 'Soft limits are defaults that users can raise (up to the hard limit). Hard limits require root to change.' },
  { id: 'e6m8', examCycle: 6, skill: 'linux', question: 'What does inode exhaustion mean and how would you detect it?', options: { a: 'Running out of inodes means you cannot create new files even if disk space is available', b: 'Inodes are CPU registers', c: 'Inode exhaustion causes data corruption', d: 'It only affects large files' }, correct: 'a', explanation: 'Each file needs an inode. df -i shows inode usage. You can have full inodes with free disk space (many small files).' },
  { id: 'e6m9', examCycle: 6, skill: 'linux', question: 'What is the purpose of a chroot jail?', options: { a: 'Prevents the process from using CPU', b: 'Restricts a process\'s view of the filesystem to a subtree', c: 'Creates a container', d: 'Limits memory usage' }, correct: 'b', explanation: 'chroot changes the apparent root directory for a process. A chrooted process cannot access files outside the jail.' },
  { id: 'e6m10', examCycle: 6, skill: 'k8s', question: 'What is the purpose of Kubernetes resource requests vs limits?', options: { a: 'Requests: maximum allowed; Limits: minimum guaranteed', b: 'Requests: minimum guaranteed for scheduling; Limits: maximum the container can use', c: 'They are identical', d: 'Requests are for CPU only; Limits are for memory only' }, correct: 'b', explanation: 'Requests are used for scheduling (node must have this much free). Limits are enforced at runtime (OOMKill/throttle if exceeded).' },
  { id: 'e6m11', examCycle: 6, skill: 'k8s', question: 'What triggers a Horizontal Pod Autoscaler to scale up?', options: { a: 'A cron schedule', b: 'CPU/memory metrics exceeding the target utilization threshold', c: 'Manual kubectl command only', d: 'Node failures' }, correct: 'b', explanation: 'HPA watches metrics (default: CPU utilization). If current > target%, it increases replicas.' },
  { id: 'e6m12', examCycle: 6, skill: 'k8s', question: 'What is a Kubernetes operator?', options: { a: 'A human operator managing the cluster', b: 'A custom controller that automates complex stateful application management', c: 'A kubectl plugin', d: 'A type of Service' }, correct: 'b', explanation: 'Operators encode operational knowledge as code — they watch custom resources and automate day-2 operations.' },
  { id: 'e6m13', examCycle: 6, skill: 'k8s', question: 'What is etcd in a Kubernetes cluster?', options: { a: 'A container registry', b: 'The distributed key-value store that holds all cluster state', c: 'The container runtime', d: 'The DNS server' }, correct: 'b', explanation: 'etcd stores all Kubernetes objects. Losing etcd without backup means losing the cluster state.' },
  { id: 'e6m14', examCycle: 6, skill: 'k8s', question: 'What does a PodDisruptionBudget protect against?', options: { a: 'Node failures', b: 'Too many pods being unavailable simultaneously during voluntary disruptions', c: 'Unauthorized pod creation', d: 'Pod memory leaks' }, correct: 'b', explanation: 'PDB sets minAvailable or maxUnavailable to ensure minimum pods are running during drains, upgrades, etc.' },
  { id: 'e6m15', examCycle: 6, skill: 'mixed', question: 'You need to debug a production issue at 2 AM. Which should you check FIRST?', options: { a: 'Source code', b: 'Application logs and monitoring dashboards', c: 'Database schema', d: 'CI/CD pipeline' }, correct: 'b', explanation: 'Logs and metrics give immediate evidence of what\'s happening. Code review comes after you know the symptom.' },
  { id: 'e6m16', examCycle: 6, skill: 'k8s', question: 'What does "kubectl drain node-1 --ignore-daemonsets" do?', options: { a: 'Shuts down node-1', b: 'Evicts all pods from node-1 (except DaemonSets) to prepare it for maintenance', c: 'Deletes all pods on node-1', d: 'Removes node-1 from the cluster permanently' }, correct: 'b', explanation: 'drain cordons the node (prevents new scheduling) and gracefully evicts pods, respecting PodDisruptionBudgets.' },
  { id: 'e6m17', examCycle: 6, skill: 'sql', question: 'What is a partial index and when would you use one?', options: { a: 'An index on part of a column value', b: 'An index with a WHERE clause that only indexes rows matching the condition', c: 'An index on the first half of the rows', d: 'A compressed index' }, correct: 'b', explanation: 'Partial indexes index only rows matching a condition, e.g., CREATE INDEX ON orders(customer_id) WHERE status = \'active\'. Smaller and faster when most queries include the filter.' },
  { id: 'e6m18', examCycle: 6, skill: 'linux', question: 'What is the output of: echo "2+3" | bc?', options: { a: '"2+3"', b: '5', c: 'An error', d: '23' }, correct: 'b', explanation: 'bc is a calculator. echo pipes the expression to it, and bc evaluates and outputs 5.' },
  { id: 'e6m19', examCycle: 6, skill: 'k8s', question: 'What Helm command upgrades a release with new values?', options: { a: 'helm install myapp --upgrade', b: 'helm upgrade myapp ./chart -f new-values.yaml', c: 'helm apply myapp', d: 'helm set myapp key=value' }, correct: 'b', explanation: 'helm upgrade <release-name> <chart> upgrades the release. Add -f for a values file or --set for individual values.' },
  { id: 'e6m20', examCycle: 6, skill: 'mixed', question: 'What is the "golden signal" rule for monitoring services?', options: { a: 'Monitor only CPU and memory', b: 'Track latency, traffic, errors, and saturation (the four golden signals)', c: 'Use only business metrics', d: 'Monitor at the network layer only' }, correct: 'b', explanation: 'Google SRE\'s four golden signals: Latency (response time), Traffic (req/s), Errors (error rate), Saturation (resource usage).' },
]

export const exam6Written: WrittenQuestion[] = [
  { id: 'e6b1', examCycle: 6, skill: 'sql', section: 'B', marks: 5, prompt: 'You have a slow query joining 4 tables. Write out the investigation steps you\'d take, the EXPLAIN output patterns you\'d look for, and how you\'d decide which index to create.', gradingRubric: 'Run EXPLAIN ANALYZE (1pt). Identify seq scans on large tables (1pt). Check join conditions for index coverage (1pt). Check filter selectivity (1pt). Create targeted index and verify improvement (1pt).' },
  { id: 'e6b2', examCycle: 6, skill: 'sql', section: 'B', marks: 5, prompt: 'Explain the PostgreSQL MVCC model. Why does it need VACUUM? What problems arise if VACUUM is not run?', gradingRubric: 'MVCC keeps old row versions for concurrent readers (2pts). Dead tuples accumulate from UPDATE/DELETE (1pt). VACUUM reclaims space (1pt). Without it: table bloat, transaction ID wraparound (1pt).' },
  { id: 'e6b3', examCycle: 6, skill: 'linux', section: 'B', marks: 5, prompt: 'Explain what happens at a kernel level when you run a shell command like "ls". Describe fork, exec, and wait.', gradingRubric: 'Shell calls fork() to create child process (2pts). Child calls exec() to replace with ls binary (2pts). Shell calls wait() to collect exit status (1pt).' },
  { id: 'e6b4', examCycle: 6, skill: 'k8s', section: 'B', marks: 5, prompt: 'Explain what happens when you run "kubectl apply -f deployment.yaml" — trace the path from your terminal to a running pod.', gradingRubric: 'kubectl sends to API server (1pt). API server writes to etcd (1pt). Controller manager creates ReplicaSet (1pt). Scheduler assigns pods to nodes (1pt). kubelet pulls image and starts container (1pt).' },
  { id: 'e6b5', examCycle: 6, skill: 'mixed', section: 'B', marks: 5, prompt: 'Your Kubernetes application is returning 503 errors but pods show as Running. List 5 specific things you would check and in what order.', gradingRubric: '1 point each for 5 valid steps: check Service selector matches pod labels, check Endpoints object has pods, check pod logs, check readinessProbe, check Ingress config, check NetworkPolicy, check if pods are actually healthy.' },
  { id: 'e6c1', examCycle: 6, skill: 'sql', section: 'C', marks: 5, prompt: 'This query is meant to find the top customer per country, but it returns wrong results. Find why:', codeSnippet: `SELECT country, customer_name, MAX(total_spent)
FROM customer_stats
GROUP BY country;`, gradingRubric: 'customer_name is not in GROUP BY and not aggregated — SQL picks an arbitrary name (3pts). Fix: use a subquery or CTE with ROW_NUMBER() OVER (PARTITION BY country ORDER BY total_spent DESC) (2pts).' },
  { id: 'e6c2', examCycle: 6, skill: 'k8s', section: 'C', marks: 5, prompt: 'This Helm values.yaml causes the deployment to crash. Find the issues:', codeSnippet: `replicaCount: "3"
image:
  repository: myapp
  tag: latest
resources:
  limits:
    cpu: 2000m
    memory: 512
  requests:
    cpu: 500m
    memory: 256`, gradingRubric: 'replicaCount should be integer not string (1pt). memory values need units: 512Mi not 512 (2pts). Using "latest" tag is bad practice (1pt). requests should be less than limits (1pt).' },
  { id: 'e6c3', examCycle: 6, skill: 'linux', section: 'C', marks: 5, prompt: 'This script should rotate logs but keeps breaking. Find ALL the issues:', codeSnippet: `#!/bin/bash
LOG=/var/log/app.log
ARCHIVE=/backup/logs

cp $LOG $ARCHIVE/app-$(date +%Y%m%d).log
echo "" > $LOG
gzip $ARCHIVE/app-$(date +%Y%m%d).log`, gradingRubric: 'Variables unquoted (spaces would break paths) (1pt). date called twice — could give different values at midnight (2pts). Fix: DATE=$(date +%Y%m%d) and reuse (1pt). Using echo "" > truncates but better: > $LOG (1pt).' },
  { id: 'e6c4', examCycle: 6, skill: 'k8s', section: 'C', marks: 5, prompt: 'This NetworkPolicy is supposed to allow only the frontend to reach the backend, but all traffic is blocked. Find the bug:', codeSnippet: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    - namespaceSelector: {}`, gradingRubric: 'The two selectors (podSelector and namespaceSelector) are separate OR conditions, not AND (3pts). To allow frontend pods specifically: put both selectors in the same list item without a new dash (2pts).' },
  { id: 'e6c5', examCycle: 6, skill: 'sql', section: 'C', marks: 5, prompt: 'This PL/pgSQL function has a subtle bug:', codeSnippet: `CREATE OR REPLACE FUNCTION calculate_bonus(emp_id INT)
RETURNS NUMERIC AS $$
DECLARE
  base_salary NUMERIC;
  bonus NUMERIC;
BEGIN
  SELECT salary INTO base_salary FROM employees WHERE id = emp_id;
  bonus := base_salary * 0.1;
  RETURN bonus;
END;
$$ LANGUAGE plpgsql;`, gradingRubric: 'No check if employee exists — if emp_id not found, base_salary is NULL and bonus returns NULL (3pts). Fix: IF NOT FOUND THEN RAISE EXCEPTION or check base_salary IS NULL (2pts).' },
  { id: 'e6d1', examCycle: 6, skill: 'sql', section: 'D', marks: 10, prompt: 'Write a complex SQL query involving 4 tables: customers, orders, order_items, and products. Find: the top 3 product categories by revenue in the last 30 days, along with the number of unique customers who bought from each category and the average order value for each category.', gradingRubric: 'Correct 4-table JOIN (2pts). Date filter on orders (1pt). Revenue calculation (2pts). COUNT(DISTINCT customers) (2pts). AVG order value (1pt). TOP 3 with ORDER BY + LIMIT (1pt). Clean query structure (1pt).' },
  { id: 'e6d2', examCycle: 6, skill: 'k8s', section: 'D', marks: 10, prompt: 'Write a complete 3-tier Kubernetes deployment manifest: frontend (nginx, 2 replicas), API (node:18, 3 replicas), and PostgreSQL (1 replica with PersistentVolumeClaim). Include Services for internal communication and a single Ingress routing / to frontend and /api to the API service.', gradingRubric: 'Frontend Deployment + Service (2pts). API Deployment + Service (2pts). PostgreSQL StatefulSet + Service (2pts). PVC for postgres (1pt). Ingress with path rules (2pts). Valid YAML throughout (1pt).' },
  { id: 'e6e1', examCycle: 6, skill: 'mixed', section: 'E', marks: 10, prompt: 'Your production Kubernetes application is returning 503 errors. Pod status shows Running. Walk through your COMPLETE debugging process from the moment you get paged to the moment you identify the root cause. Be specific about every command you run and what you look for in the output.', gradingRubric: 'kubectl get pods -n <ns> for pod status (1pt). kubectl describe pod for events/conditions (1pt). kubectl logs for app errors (1pt). kubectl get endpoints to check service routing (2pts). kubectl describe service for selector match (1pt). Check readinessProbe config (2pts). Check NetworkPolicy if applicable (1pt). Document root cause clearly (1pt).' },
]

// ─── Exports ─────────────────────────────────────────────────────────────────

export const allMCQ: MCQQuestion[] = [
  ...exam1MCQ, ...exam2MCQ, ...exam3MCQ, ...exam4MCQ, ...exam5MCQ, ...exam6MCQ,
]

export const allWritten: WrittenQuestion[] = [
  ...exam1Written, ...exam2Written, ...exam3Written, ...exam4Written, ...exam5Written, ...exam6Written,
]

export function getMCQForExam(cycle: number): MCQQuestion[] {
  return allMCQ.filter(q => q.examCycle === cycle)
}

export function getWrittenForExam(cycle: number, section: 'B' | 'C' | 'D' | 'E'): WrittenQuestion[] {
  return allWritten.filter(q => q.examCycle === cycle && q.section === section)
}
